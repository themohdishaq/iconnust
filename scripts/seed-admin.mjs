import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const email = (process.env.SEED_ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD || '';

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/seed-admin.mjs)');
}
if (!email || !password) throw new Error('Missing SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local');

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const passwordHash = await bcrypt.hash(password, 10);

await pool.execute(
  `INSERT INTO admins (email, password_hash, name, role)
   VALUES (?, ?, 'Admin', 'admin')
   ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
  [email, passwordHash]
);

console.log(`Admin account ready: ${email}`);
console.log('Sign in at /admin/login with the email/password from .env.local, then change the password.');

await pool.end();
