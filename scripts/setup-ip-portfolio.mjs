import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { seedIpPortfolio } from './ip-portfolio-seed.mjs';

nextEnv.loadEnvConfig(fileURLToPath(new URL('../', import.meta.url)));
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL, DB_SSL_CA_FILE } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) throw new Error('Configure DB_HOST, DB_USER and DB_NAME before setting up the IP portfolio.');
if (DB_SSL && !['true', 'false'].includes(DB_SSL)) throw new Error('DB_SSL must be true or false.');
if (DB_SSL_CA_FILE && DB_SSL !== 'true') throw new Error('DB_SSL_CA_FILE requires DB_SSL=true.');
const connection = await mysql.createConnection({
  host: DB_HOST, port: Number(DB_PORT || 3306), user: DB_USER, password: DB_PASSWORD, database: DB_NAME,
  connectTimeout: 10000,
  ssl: DB_SSL === 'true' ? { rejectUnauthorized: true, ...(DB_SSL_CA_FILE ? { ca: await readFile(DB_SSL_CA_FILE, 'utf8') } : {}) } : undefined,
});
try {
  const schema = await readFile(new URL('../lib/db/schema.sql', import.meta.url), 'utf8');
  for (const table of ['schema_migrations', 'ip_portfolio_records']) {
    const statement = schema.match(new RegExp(`CREATE TABLE IF NOT EXISTS ${table} \\([\\s\\S]*?\\) ENGINE[^;]+;`))?.[0];
    if (!statement) throw new Error(`Missing schema for ${table}.`);
    await connection.query(statement);
  }
  const imported = await seedIpPortfolio(connection);
  console.log(`IP portfolio ready. Imported ${imported} records; existing admin changes preserved.`);
} finally { await connection.end(); }
