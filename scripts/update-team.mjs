import mysql from 'mysql2/promise';
import { parseEnv } from 'node:util';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Plesk environment variables take precedence. No production env file needed.
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  for (const filename of ['.env.local', '.env']) {
    try {
      const config = parseEnv(await readFile(new URL(`../${filename}`, import.meta.url), 'utf8'));
      for (const [key, value] of Object.entries(config)) {
        if (key.startsWith('DB_') && process.env[key] === undefined) process.env[key] = value;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_SSL, DB_SSL_CA_FILE } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) throw new Error('Configure DB_HOST, DB_USER and DB_NAME in Plesk or .env.local / .env.');
if (DB_SSL && !['true', 'false'].includes(DB_SSL)) throw new Error('DB_SSL must be true or false.');
if (DB_SSL_CA_FILE && DB_SSL !== 'true') throw new Error('DB_SSL_CA_FILE requires DB_SSL=true.');
const members = JSON.parse(await readFile(new URL('../data/team-members.json', import.meta.url), 'utf8'));
if (!Array.isArray(members)) throw new Error('data/team-members.json must contain an array.');
const names = new Set();
for (const member of members) {
  for (const [field, max] of [['name', 200], ['title', 200], ['dept', 200], ['image', 500]]) {
    if (typeof member[field] !== 'string' || !member[field].trim() || member[field].length > max) throw new Error(`Invalid team ${field} in data/team-members.json.`);
  }
  const name = member.name.trim().toLowerCase();
  if (names.has(name)) throw new Error('Duplicate member names in data/team-members.json.');
  names.add(name);
  if (!Number.isInteger(member.order) || member.order < -2147483648 || member.order > 2147483647) throw new Error('Team order must be a valid integer.');
}
const connection = await mysql.createConnection({
  host: DB_HOST, port: Number(DB_PORT || 3306), database: DB_NAME,
  user: DB_USER, password: DB_PASSWORD, connectTimeout: 10000,
  ssl: DB_SSL === 'true' ? {
    rejectUnauthorized: true,
    ...(DB_SSL_CA_FILE ? { ca: await readFile(DB_SSL_CA_FILE, 'utf8') } : {}),
  } : undefined,
});
const lock = `icon-team-${createHash('sha256').update(DB_NAME).digest('hex').slice(0, 40)}`;
let locked = false;
let transaction = false;
try {
  console.log(`Updating team in ${DB_HOST}:${DB_PORT || 3306} / ${DB_NAME}`);
  const [[metadata]] = await connection.execute('SELECT ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', ['team_members']);
  if (!metadata) throw new Error('team_members does not exist. Run the schema migration first.');
  if (metadata.ENGINE !== 'InnoDB') throw new Error('team_members must use InnoDB for a transactional update.');
  const [[acquired]] = await connection.execute('SELECT GET_LOCK(?, 10) AS acquired', [lock]);
  if (Number(acquired.acquired) !== 1) throw new Error('Another team update is running.');
  locked = true;
  await connection.query('SET SESSION innodb_lock_wait_timeout = 10');
  await connection.beginTransaction();
  transaction = true;
  let added = 0;
  let updated = 0;
  for (const member of members) {
    const [existing] = await connection.execute('SELECT id FROM team_members WHERE name = ? FOR UPDATE', [member.name.trim()]);
    if (existing.length > 1) throw new Error(`Multiple database members match "${member.name}". Resolve the duplicate names first.`);
    if (existing.length) {
      // Preserve admin-entered bio, email and focus, absent from the local file.
      await connection.execute('UPDATE team_members SET title = ?, dept = ?, image = ?, sort_order = ? WHERE id = ?', [member.title, member.dept, member.image, member.order, existing[0].id]);
      updated++;
    } else {
      await connection.execute('INSERT INTO team_members (name, title, dept, bio, focus, image, email, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [member.name.trim(), member.title, member.dept, '', '[]', member.image, '', member.order]);
      added++;
    }
  }
  await connection.commit();
  transaction = false;
  console.log(`Team updated: ${added} added, ${updated} matched members updated. Other members and tables preserved.`);
  console.log('Photo paths are saved; deploy the referenced public/team files with your website.');
} catch (error) {
  if (transaction) await connection.rollback();
  console.error(`Team update stopped: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (locked) await connection.execute('SELECT RELEASE_LOCK(?)', [lock]);
  await connection.end();
}
