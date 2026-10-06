import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

nextEnv.loadEnvConfig(fileURLToPath(new URL('../', import.meta.url)), false, { info() {}, error() {} });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL, DB_SSL_CA_FILE } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) throw new Error('Missing DB_HOST / DB_USER / DB_NAME.');
const seed = JSON.parse(await readFile(new URL('../data/team-members.json', import.meta.url), 'utf8'));
const connection = await mysql.createConnection({
  host: DB_HOST, port: Number(DB_PORT || 3306), user: DB_USER,
  password: DB_PASSWORD, database: DB_NAME,
  ssl: DB_SSL === 'true' ? {
    rejectUnauthorized: true,
    ...(DB_SSL_CA_FILE ? { ca: await readFile(DB_SSL_CA_FILE, 'utf8') } : {}),
  } : undefined,
});
const migration = 'seed-admin-managed-team-v1';
let locked = false;
try {
  const [[lock]] = await connection.execute('SELECT GET_LOCK(?, 10) AS acquired', [migration]);
  if (Number(lock.acquired) !== 1) throw new Error('Another team import is running.');
  locked = true;
  await connection.beginTransaction();
  const [applied] = await connection.execute('SELECT migration_key FROM schema_migrations WHERE migration_key = ?', [migration]);
  if (applied.length) {
    console.log('Team import already completed; existing admin changes and deletions preserved.');
  } else {
    const [[count]] = await connection.query('SELECT COUNT(*) AS total FROM team_members');
    if (Number(count.total) === 0) {
      for (const member of seed) {
        await connection.execute(
          'INSERT INTO team_members (name, title, dept, bio, focus, image, email, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [member.name, member.title, member.dept, '', '[]', member.image, '', member.order],
        );
      }
      console.log(`Imported ${seed.length} current team members into ${DB_NAME}.`);
    } else {
      console.log('Team records already exist; keeping the admin-managed team.');
    }
    await connection.execute('INSERT INTO schema_migrations (migration_key) VALUES (?)', [migration]);
  }
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  if (locked) await connection.execute('SELECT RELEASE_LOCK(?)', [migration]);
  await connection.end();
}
