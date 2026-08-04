import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/apply-schema.mjs)');
}

const sql = await readFile(path.join(__dirname, '../lib/db/schema.sql'), 'utf8');

const connection = await mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
});

await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
await connection.changeUser({ database: DB_NAME });
await connection.query(sql);

// MySQL (unlike MariaDB) doesn't support `ADD COLUMN/INDEX IF NOT EXISTS`, so
// upgrades to tables that pre-date a given column/index run here individually,
// tolerating "already exists" errors for databases that are already current.
const migrations = [
  "ALTER TABLE subscriber MODIFY COLUMN name VARCHAR(300) NOT NULL DEFAULT ''",
  'ALTER TABLE subscriber ADD COLUMN notify_enabled BOOLEAN NOT NULL DEFAULT TRUE',
  'ALTER TABLE subscriber ADD UNIQUE INDEX uq_subscriber_email (email)',
];

for (const statement of migrations) {
  try {
    await connection.query(statement);
  } catch (err) {
    if (err.code !== 'ER_DUP_FIELDNAME' && err.code !== 'ER_DUP_KEYNAME') {
      throw err;
    }
  }
}

console.log(`Schema applied to database "${DB_NAME}".`);
await connection.end();
