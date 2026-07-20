import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME environment variables');
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
