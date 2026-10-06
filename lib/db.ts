import mysql from 'mysql2/promise';
import { readFileSync } from 'node:fs';

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_SSL = process.env.DB_SSL;
const DB_SSL_CA_FILE = process.env.DB_SSL_CA_FILE;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME environment variables');
}

if (DB_SSL && DB_SSL !== 'true' && DB_SSL !== 'false') {
  throw new Error('DB_SSL must be true or false');
}
if (DB_SSL_CA_FILE && DB_SSL !== 'true') {
  throw new Error('DB_SSL_CA_FILE requires DB_SSL=true');
}

// Cached on `global` so hot-reload in dev doesn't spawn a new pool per request.
const globalForMysql = global as unknown as { mysqlPool?: mysql.Pool };

export function getPool(): mysql.Pool {
  if (!globalForMysql.mysqlPool) {
    globalForMysql.mysqlPool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT ? Number(DB_PORT) : 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      ssl: DB_SSL === 'true' ? {
        rejectUnauthorized: true,
        ...(DB_SSL_CA_FILE ? { ca: readFileSync(DB_SSL_CA_FILE, 'utf8') } : {}),
      } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      timezone: 'Z',
    });
  }
  return globalForMysql.mysqlPool;
}

export async function query<T = mysql.RowDataPacket[]>(sql: string, params?: unknown[]): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows] = await getPool().execute(sql, params as any[]);
  return rows as T;
}
