import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--sync-data') {
  try {
    const { transferConfiguredDatabase } = await import('./db-scribe-mitigate.mjs');
    await transferConfiguredDatabase();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}
if (args.includes('--help')) {
  console.log(`Update existing MySQL tables using lib/db/schema.sql.

Usage:
  npm run db:scribe:mitigate
  node --env-file=.env.production.local scripts/migrate-production.mjs --dry-run
  node --env-file=.env.production.local scripts/migrate-production.mjs --apply

The npm command applies schema updates to the second database configured in
.env.production.local. It adds missing tables, safe columns and indexes while
preserving its existing records. It does not copy local data or run seed scripts.
The default schema-only mode is a read-only preview. --apply executes its statements.
Set DB_HOST, DB_PORT, DB_NAME, DB_USER and DB_PASSWORD for your existing database.
Use DB_SSL=true and optionally DB_SSL_CA_FILE for your provider's CA certificate.
Existing content and collations are preserved. Take a backup before applying.
MySQL DDL commits each statement separately; rerun after fixing an error to resume.
Optional separate data-transfer mode: node scripts/migrate-production.mjs --sync-data.
That mode replaces matching records with local values; it is not used by the npm command.`);
  process.exit(0);
}
if (args.some(arg => !['--apply', '--dry-run'].includes(arg)) || args.includes('--apply') && args.includes('--dry-run')) {
  throw new Error('Usage: node scripts/migrate-production.mjs [--sync-data | --dry-run | --apply | --help]');
}
const root = fileURLToPath(new URL('../', import.meta.url));
nextEnv.loadEnvConfig(root, false, { info() {}, error() {} });
const apply = args.includes('--apply');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) throw new Error('Missing DB_HOST / DB_USER / DB_NAME.');
const quote = value => `\`${value.replaceAll('`', '``')}\``;
const sql = await readFile(new URL('../lib/db/schema.sql', import.meta.url), 'utf8');
const definitions = [...sql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n\) ENGINE[^;]+;/g)];
if (definitions.length !== 21) throw new Error('Unexpected schema format; migration stopped.');
if (process.env.DB_SSL && !['true', 'false'].includes(process.env.DB_SSL)) {
  throw new Error('DB_SSL must be true or false.');
}
if (process.env.DB_SSL_CA_FILE && process.env.DB_SSL !== 'true') {
  throw new Error('DB_SSL_CA_FILE requires DB_SSL=true.');
}
const ssl = process.env.DB_SSL === 'true' ? {
  rejectUnauthorized: true,
  ...(process.env.DB_SSL_CA_FILE ? { ca: await readFile(process.env.DB_SSL_CA_FILE, 'utf8') } : {}),
} : undefined;
const connection = await mysql.createConnection({
  host: DB_HOST, port: Number(DB_PORT || 3306), user: DB_USER,
  password: DB_PASSWORD, database: DB_NAME, connectTimeout: 10000, ssl,
});
const lockName = `icon-schema-${createHash('sha256').update(DB_NAME).digest('hex').slice(0, 40)}`;
let locked = false;
try {
  if (apply) {
    const [[lock]] = await connection.execute('SELECT GET_LOCK(?, 10) AS acquired', [lockName]);
    if (Number(lock.acquired) !== 1) throw new Error('Another schema migration is running.');
    locked = true;
    await connection.query('SET SESSION lock_wait_timeout = 10');
  }
  const [tables] = await connection.execute(
    'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = ?',
    [DB_NAME, 'BASE TABLE'],
  );
  const existingTables = new Set(tables.map(row => row.TABLE_NAME));
  const steps = [];
  const blockers = [];
  for (const [statement, table, body] of definitions) {
    if (!existingTables.has(table)) {
      // Foreign keys on new tables must use compatible existing parent columns.
      for (const foreign of body.matchAll(/FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/g)) {
        const [, childColumn, parentTable, parentColumn] = foreign;
        if (!existingTables.has(parentTable)) continue;
        const [[column]] = await connection.execute(
          'SELECT COLUMN_TYPE, COLLATION_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?',
          [DB_NAME, parentTable, parentColumn],
        );
        const expected = body.match(new RegExp(`^  ${childColumn} (VARCHAR\\(\\d+\\))`, 'm'));
        if (!column || !expected || column.COLUMN_TYPE.toLowerCase() !== expected[1].toLowerCase()
            || column.COLLATION_NAME !== 'utf8mb4_unicode_ci') {
          blockers.push(`${table}.${childColumn}: existing parent ${parentTable}.${parentColumn} is incompatible with the new foreign key. Review its type/collation first.`);
        }
      }
      steps.push(statement);
      continue;
    }
    const [columns] = await connection.query(`SHOW FULL COLUMNS FROM ${quote(table)}`);
    const columnMap = new Map(columns.map(column => [column.Field, column]));
    const [indexes] = await connection.query(`SHOW INDEX FROM ${quote(table)}`);
    const indexMap = new Map();
    for (const index of indexes) {
      if (!indexMap.has(index.Key_name)) indexMap.set(index.Key_name, []);
      indexMap.get(index.Key_name).push(index);
    }
    for (const rows of indexMap.values()) rows.sort((a, b) => a.Seq_in_index - b.Seq_in_index);

    for (const line of body.split('\n')) {
      const match = line.match(/^  (\w+) ((?:VARCHAR|INT|TEXT|JSON|ENUM|DATETIME|BOOLEAN|DECIMAL)\b.*?)(?:,)?$/);
      if (!match || columnMap.has(match[1])) continue;
      const [, name, definition] = match;
      if (/PRIMARY KEY|AUTO_INCREMENT/.test(definition) || (!/DEFAULT|\bNULL\b/.test(definition))
          || (/NOT NULL/.test(definition) && !/DEFAULT/.test(definition))) {
        blockers.push(`${table}.${name}: missing required column needs an explicit backfill migration.`);
        continue;
      }
      // Legacy content was public before status existed. Preserve its visibility.
      const legacyStatus = name === 'status' && ['news', 'stories', 'events'].includes(table);
      steps.push(`ALTER TABLE ${quote(table)} ADD COLUMN ${quote(name)} ${legacyStatus ? definition.replace("DEFAULT 'draft'", "DEFAULT 'published'") : definition}`);
      if (legacyStatus) steps.push(`ALTER TABLE ${quote(table)} ALTER COLUMN ${quote(name)} SET DEFAULT 'draft'`);
    }
    if (['news', 'stories', 'events'].includes(table) && columnMap.has('status')
        && columnMap.get('status').Default !== 'draft') {
      steps.push(`ALTER TABLE ${quote(table)} ALTER COLUMN status SET DEFAULT 'draft'`);
    }
    if (table === 'subscriber' && columnMap.has('name')) {
      const name = columnMap.get('name');
      if (name.Type.toLowerCase() !== 'varchar(300)' || name.Null !== 'NO' || name.Default !== '') {
        const [[invalid]] = await connection.query(`SELECT COUNT(*) AS count FROM ${quote(table)} WHERE name IS NULL OR CHAR_LENGTH(name) > 300`);
        if (Number(invalid.count)) blockers.push('subscriber.name: NULL or overlength values require cleanup before changing the column.');
        else {
          if (!/^varchar\(\d+\)$/i.test(name.Type)) blockers.push('subscriber.name: unexpected type; requires a reviewed conversion.');
          else steps.push(`ALTER TABLE ${quote(table)} MODIFY COLUMN name VARCHAR(300) CHARACTER SET ${quote(name.Collation.split('_')[0])} COLLATE ${quote(name.Collation)} NOT NULL DEFAULT ''`);
        }
      }
    }
    for (const match of body.matchAll(/^  (UNIQUE )?KEY (\w+) \(([^)]+)\)/gm)) {
      const [, unique, name, fields] = match;
      const expected = fields.split(',').map(field => {
        const [column, direction] = field.trim().split(/\s+/);
        return { column, direction: direction === 'DESC' ? 'D' : 'A' };
      });
      const equivalent = rows => rows.length === expected.length
        && Number(rows[0].Non_unique) === (unique ? 0 : 1)
        && rows.every((row, i) => row.Column_name === expected[i].column && row.Collation === expected[i].direction && row.Sub_part == null);
      if ([...indexMap.values()].some(equivalent)) continue;
      const current = indexMap.get(name);
      if (current && (unique || Number(current[0].Non_unique) === 0)) {
        blockers.push(`${table}.${name}: existing unique index differs; manual review required.`);
        continue;
      }
      if (unique) {
        if (expected.some(field => !columnMap.has(field.column))) {
          blockers.push(`${table}.${name}: cannot preflight uniqueness until its columns exist.`);
          continue;
        }
        const names = expected.map(field => quote(field.column)).join(', ');
        const notNull = expected.map(field => `${quote(field.column)} IS NOT NULL`).join(' AND ');
        const [duplicates] = await connection.query(`SELECT 1 FROM ${quote(table)} WHERE ${notNull} GROUP BY ${names} HAVING COUNT(*) > 1 LIMIT 1`);
        if (duplicates.length) {
          blockers.push(`${table}.${name}: duplicate values must be resolved before adding the unique index.`);
          continue;
        }
      }
      steps.push(`ALTER TABLE ${quote(table)} ${current ? `DROP INDEX ${quote(name)}, ` : ''}ADD ${unique || ''}INDEX ${quote(name)} (${fields}), ALGORITHM=INPLACE, LOCK=NONE`);
    }
    // Existing foreign-key names may be generated by MySQL; retain them.
    const [foreignKeys] = await connection.execute(
      'SELECT k.COLUMN_NAME, k.REFERENCED_TABLE_NAME, k.REFERENCED_COLUMN_NAME, r.DELETE_RULE FROM information_schema.KEY_COLUMN_USAGE k JOIN information_schema.REFERENTIAL_CONSTRAINTS r ON r.CONSTRAINT_SCHEMA = k.CONSTRAINT_SCHEMA AND r.TABLE_NAME = k.TABLE_NAME AND r.CONSTRAINT_NAME = k.CONSTRAINT_NAME WHERE k.TABLE_SCHEMA = ? AND k.TABLE_NAME = ?',
      [DB_NAME, table],
    );
    for (const foreign of body.matchAll(/FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\) ON DELETE (CASCADE|RESTRICT)/g)) {
      const [, column, parent, parentColumn, deletion] = foreign;
      if (!foreignKeys.some(key => key.COLUMN_NAME === column && key.REFERENCED_TABLE_NAME === parent
          && key.REFERENCED_COLUMN_NAME === parentColumn && (key.DELETE_RULE === deletion || deletion === 'RESTRICT' && key.DELETE_RULE === 'NO ACTION'))) {
        blockers.push(`${table}.${column}: foreign key missing or incompatible; requires a reviewed migration with orphan-data checks.`);
      }
    }
    if (!indexMap.has('PRIMARY')) blockers.push(`${table}: primary key missing; requires manual review.`);
  }
  console.log(`Target: ${DB_HOST}:${DB_PORT || 3306} / ${DB_NAME}`);
  console.log(`Mode: ${apply ? 'apply' : 'read-only preview'}. ${steps.length} pending statements.`);
  for (const step of steps) console.log(`${step};\n`);
  if (blockers.length) throw new Error(`No changes applied. Resolve these preflight blockers:\n${blockers.join('\n')}`);
  if (!apply) {
    console.log('Preview complete. To execute this plan, rerun with --apply. Existing collations and content are preserved.');
  } else {
    for (const [index, step] of steps.entries()) {
      await connection.query(step);
      console.log(`Applied ${index + 1}/${steps.length}.`);
    }
    console.log('Migration complete. Rerun without --apply to verify that no changes remain.');
  }
} catch (error) {
  if (apply) console.error('MySQL DDL cannot be rolled back as a group. If execution started, completed steps remain applied; resolve the error and rerun to resume.');
  throw error;
} finally {
  if (locked) await connection.execute('SELECT RELEASE_LOCK(?)', [lockName]);
  await connection.end();
}
