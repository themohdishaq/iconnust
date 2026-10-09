import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import { seedIpPortfolio } from './ip-portfolio-seed.mjs';

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log(`Update production tables without replacing existing content.

Usage:
  npm run db:update:production
  npm run db:update:production -- --apply
  npm run db:update:production -- --import-ip
  npm run db:update:production -- --apply --import-ip

Default: read-only schema preview. --apply executes the schema updates.
--import-ip also previews/imports the bundled IP portfolio once.
Existing admin changes and deletions are preserved on subsequent runs.

Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME in the production environment.
Optional: DB_PORT, DB_SSL=true, DB_SSL_CA_FILE.
This entry point does not load local environment files or copy local database data.
For an explicit environment file, use Node's --env-file option.
MySQL schema changes commit individually; the existing migration preflights
changes and can be rerun after an interrupted execution.`);
  process.exit(0);
}
if (args.some(arg => !['--dry-run', '--apply', '--import-ip'].includes(arg)) || args.includes('--dry-run') && args.includes('--apply')) {
  throw new Error('Use --dry-run or --apply, optionally with --import-ip.');
}
for (const name of ['DB_HOST', 'DB_USER', 'DB_NAME']) {
  if (!process.env[name]?.trim()) throw new Error(`Set ${name} in the production environment. Local environment files are not loaded.`);
}
if (process.env.DB_PASSWORD === undefined) throw new Error('Set DB_PASSWORD in the production environment (an explicitly empty value is allowed).');
if (process.env.DB_PORT && (!/^\d+$/.test(process.env.DB_PORT) || Number(process.env.DB_PORT) < 1 || Number(process.env.DB_PORT) > 65535)) throw new Error('DB_PORT must be between 1 and 65535.');
if (process.env.DB_SSL && !['true', 'false'].includes(process.env.DB_SSL)) throw new Error('DB_SSL must be true or false.');
if (process.env.DB_SSL_CA_FILE && process.env.DB_SSL !== 'true') throw new Error('DB_SSL_CA_FILE requires DB_SSL=true.');

const apply = args.includes('--apply');
const importIp = args.includes('--import-ip');
let connection;
let ipAlreadyImported = false;
try {
  if (importIp) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
      connectTimeout: 10000,
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: true,
        ...(process.env.DB_SSL_CA_FILE ? { ca: await readFile(process.env.DB_SSL_CA_FILE, 'utf8') } : {}),
      } : undefined,
    });
    // Check import safety before applying any schema statements.
    const [tables] = await connection.execute('SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?', [process.env.DB_NAME]);
    const names = new Set(tables.map(row => row.TABLE_NAME));
    if (names.has('schema_migrations')) {
      const [marker] = await connection.execute('SELECT migration_key FROM schema_migrations WHERE migration_key = ?', ['seed-ip-portfolio-v1']);
      ipAlreadyImported = marker.length > 0;
    }
    if (!ipAlreadyImported && names.has('ip_portfolio_records')) {
      const [[row]] = await connection.execute('SELECT COUNT(*) AS total FROM ip_portfolio_records');
      if (Number(row.total) > 0) throw new Error('IP portfolio already contains records but has no import marker. No changes applied. Review those records before importing the bundled JSON.');
    }
    if (!ipAlreadyImported) {
      const data = JSON.parse(await readFile(new URL('../data/nipo_top20_ip_records.json', import.meta.url), 'utf8'));
      console.log(`IP portfolio import planned: ${Object.values(data).flat().length} records.`);
    } else console.log('IP portfolio was already imported; existing edits and deletions will be preserved.');
  }
  const migration = fileURLToPath(new URL('./migrate-production.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [migration, apply ? '--apply' : '--dry-run'], { env: process.env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Schema migration failed. Resolve the reported blockers before rerunning.');
  if (apply && importIp) console.log(`IP portfolio import complete: ${await seedIpPortfolio(connection)} records added.`);
  if (!apply) console.log('Preview only. Rerun with --apply to execute the update.');
} finally {
  if (connection) await connection.end();
}
