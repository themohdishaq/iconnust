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

console.log(`Schema applied to database "${DB_NAME}".`);
await connection.end();
