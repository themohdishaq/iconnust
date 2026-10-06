import mysql from 'mysql2/promise';
import { parseEnv } from 'node:util';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const quote = value => `\`${value.replaceAll('`', '``')}\``;

async function connect(config) {
  for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME']) {
    if (!config[key]) throw new Error(`Missing ${key} in connection configuration.`);
  }
  if (config.DB_SSL && !['true', 'false'].includes(config.DB_SSL)) throw new Error('DB_SSL must be true or false.');
  if (config.DB_SSL_CA_FILE && config.DB_SSL !== 'true') throw new Error('DB_SSL_CA_FILE requires DB_SSL=true.');
  return mysql.createConnection({
    host: config.DB_HOST, port: Number(config.DB_PORT || 3306),
    user: config.DB_USER, password: config.DB_PASSWORD, database: config.DB_NAME,
    connectTimeout: 10000, timezone: 'Z', dateStrings: true,
    supportBigNumbers: true, bigNumberStrings: true,
    ssl: config.DB_SSL === 'true' ? {
      rejectUnauthorized: true,
      ...(config.DB_SSL_CA_FILE ? { ca: await readFile(path.resolve(root, config.DB_SSL_CA_FILE), 'utf8') } : {}),
    } : undefined,
  });
}

function migrate(config) {
  // Explicitly isolate both configurations from the shell and Next's env loading.
  const env = { ...process.env };
  for (const key of ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_SSL', 'DB_SSL_CA_FILE']) env[key] = config[key] || '';
  execFileSync(process.execPath, [path.join(root, 'scripts/migrate-production.mjs'), '--apply'], { cwd: root, env, stdio: 'inherit' });
}

async function snapshot(connection, tables) {
  const result = {};
  await connection.query('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');
  await connection.query('START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY');
  try {
    for (const table of tables) {
      const [[metadata]] = await connection.execute('SELECT ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', [table]);
      if (!metadata) continue;
      if (metadata.ENGINE !== 'InnoDB') throw new Error(`${table}: InnoDB is required for a consistent, transactional transfer.`);
      const [rows] = await connection.query(`SELECT * FROM ${quote(table)}`);
      const [[ddl]] = await connection.query(`SHOW CREATE TABLE ${quote(table)}`);
      result[table] = { createSql: ddl['Create Table'], rows };
    }
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}

export async function transferDatabase(sourceConfig, targetConfig, backupDirectory = path.join(root, 'backups/db')) {
  const schema = await readFile(path.join(root, 'lib/db/schema.sql'), 'utf8');
  const tables = [...schema.matchAll(/^CREATE TABLE IF NOT EXISTS (\w+)/gm)].map(match => match[1]);
  if (!tables.length || new Set(tables).size !== tables.length) throw new Error('Invalid table definitions in schema.sql.');
  let source;
  let target;
  let locked = false;
  let transaction = false;
  const lock = `icon-transfer-${createHash('sha256').update(targetConfig.DB_NAME || '').digest('hex').slice(0, 40)}`;
  try {
    source = await connect(sourceConfig);
    target = await connect(targetConfig);
    const [[sourceIdentity]] = await source.query('SELECT @@server_uuid AS server, DATABASE() AS name');
    const [[targetIdentity]] = await target.query('SELECT @@server_uuid AS server, DATABASE() AS name');
    if (sourceIdentity.server === targetIdentity.server && sourceIdentity.name === targetIdentity.name) throw new Error('Source and destination are the same database; transfer stopped.');
    console.log(`Source: ${sourceConfig.DB_HOST}:${sourceConfig.DB_PORT || 3306} / ${sourceConfig.DB_NAME}`);
    console.log(`Destination: ${targetConfig.DB_HOST}:${targetConfig.DB_PORT || 3306} / ${targetConfig.DB_NAME}`);
    const [[acquired]] = await target.execute('SELECT GET_LOCK(?, 10) AS acquired', [lock]);
    if (Number(acquired.acquired) !== 1) throw new Error('Another data transfer is running.');
    locked = true;

    // Save the destination before schema changes or record updates. Contains
    // sensitive records, so keep the backup private and outside version control.
    const backup = await snapshot(target, tables);
    await mkdir(backupDirectory, { recursive: true });
    const backupFile = path.join(backupDirectory, `production-before-transfer-${Date.now()}.json`);
    await writeFile(backupFile, JSON.stringify({ version: 1, database: targetConfig.DB_NAME, createdAt: new Date().toISOString(), tables: backup }, null, 2), { flag: 'wx', mode: 0o600 });
    console.log(`Destination backup saved: ${backupFile}`);

    migrate(sourceConfig);
    migrate(targetConfig);
    const local = await snapshot(source, tables);
    await target.query('SET SESSION innodb_lock_wait_timeout = 10');
    await target.beginTransaction();
    transaction = true;
    let transferred = 0;
    for (const table of tables) {
      const [columns] = await target.query(`SHOW FULL COLUMNS FROM ${quote(table)}`);
      const [indexes] = await target.query(`SHOW INDEX FROM ${quote(table)}`);
      const primary = indexes.filter(index => index.Key_name === 'PRIMARY').sort((a, b) => a.Seq_in_index - b.Seq_in_index).map(index => index.Column_name);
      if (!primary.length) throw new Error(`${table}: primary key missing.`);
      const unique = new Map();
      for (const index of indexes.filter(index => Number(index.Non_unique) === 0 && index.Key_name !== 'PRIMARY')) {
        if (!unique.has(index.Key_name)) unique.set(index.Key_name, []);
        unique.get(index.Key_name).push(index);
      }
      const rows = local[table]?.rows || [];
      for (const row of rows) {
        // Never silently match a different cloud record by email/slug. Doing so
        // would break ID-based relationships or replace an unrelated record.
        if (table !== 'schema_migrations') for (const [name, keys] of unique) {
          keys.sort((a, b) => a.Seq_in_index - b.Seq_in_index);
          if (keys.some(key => row[key.Column_name] == null)) continue;
          const conditions = keys.map(key => key.Sub_part
            ? `LEFT(${quote(key.Column_name)}, ${Number(key.Sub_part)}) = LEFT(?, ${Number(key.Sub_part)})`
            : `${quote(key.Column_name)} = ?`).join(' AND ');
          const [matches] = await target.execute(`SELECT ${primary.map(quote).join(', ')} FROM ${quote(table)} WHERE ${conditions} FOR UPDATE`, keys.map(key => row[key.Column_name]));
          if (matches.some(match => primary.some(key => String(match[key]) !== String(row[key])))) throw new Error(`${table}.${name}: a local unique value belongs to a different cloud ID. No data transferred; resolve the conflict first.`);
        }
        const fields = columns.filter(column => Object.hasOwn(row, column.Field) && !/\b(?:VIRTUAL|STORED) GENERATED\b/.test(column.Extra));
        const values = fields.map(column => column.Type.toLowerCase() === 'json' && row[column.Field] !== null ? JSON.stringify(row[column.Field]) : row[column.Field]);
        const updates = fields.filter(column => !primary.includes(column.Field)).map(column => `${quote(column.Field)} = VALUES(${quote(column.Field)})`);
        await target.execute(`INSERT INTO ${quote(table)} (${fields.map(column => quote(column.Field)).join(', ')}) VALUES (${fields.map(() => '?').join(', ')}) ON DUPLICATE KEY UPDATE ${table === 'schema_migrations' || !updates.length ? `${quote(primary[0])} = ${quote(primary[0])}` : updates.join(', ')}`, values);
      }
      transferred += rows.length;
      console.log(`${table}: ${rows.length} local records synchronized.`);
    }
    await target.commit();
    transaction = false;
    console.log(`Complete: ${transferred} records synchronized across ${tables.length} tables. Cloud-only records preserved. No notification emails sent.`);
    console.log('Image paths were copied. Files under public/team and public/uploads must also be deployed to the cloud website.');
    return { transferred, backupFile };
  } catch (error) {
    if (transaction) await target.rollback();
    console.error('Transfer stopped. Record changes in this transfer are rolled back; completed schema changes remain.');
    throw error;
  } finally {
    if (locked) await target.execute('SELECT RELEASE_LOCK(?)', [lock]);
    if (source) await source.end();
    if (target) await target.end();
  }
}

export async function transferConfiguredDatabase() {
  const source = parseEnv(await readFile(path.join(root, '.env.local'), 'utf8'));
  let destination;
  try {
    destination = parseEnv(await readFile(path.join(root, '.env.production.local'), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error('Create .env.production.local with your cloud DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD and DB_SSL settings, then rerun npm run db:scribe:mitigate.');
    throw error;
  }
  return transferDatabase(source, destination);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await transferConfiguredDatabase();
  } catch (error) {
    // Print the reason without logging connection objects or row contents.
    console.error(error.message);
    process.exitCode = 1;
  }
}
