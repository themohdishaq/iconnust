import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import mysql from 'mysql2/promise';

const config = parseEnv(await readFile('.env.local', 'utf8'));
assert.ok(['localhost', '127.0.0.1'].includes(config.DB_HOST), 'Use a local MySQL server.');
const database = `icon_team_update_test_${randomUUID().replaceAll('-', '')}`;
assert.match(database, /^icon_team_update_test_[a-f0-9]{32}$/);
assert.notEqual(database, config.DB_NAME);
const connection = await mysql.createConnection({ host: config.DB_HOST, port: Number(config.DB_PORT || 3306), user: config.DB_USER, password: config.DB_PASSWORD });
let created = false;
const run = () => execFileSync(process.execPath, ['scripts/update-team.mjs'], {
  env: { ...process.env, ...config, DB_NAME: database, DB_SSL: 'false', DB_SSL_CA_FILE: '' }, encoding: 'utf8', stdio: 'pipe',
});
try {
  await connection.query(`CREATE DATABASE \`${database}\``);
  created = true;
  await connection.changeUser({ database });
  const schema = await readFile('lib/db/schema.sql', 'utf8');
  await connection.query(schema.match(/CREATE TABLE IF NOT EXISTS team_members \([\s\S]*?\) ENGINE[^;]+;/)[0]);
  const members = JSON.parse(await readFile('data/team-members.json', 'utf8'));
  assert.match(run(), new RegExp(`${members.length} added`));
  await connection.query("UPDATE team_members SET title = 'Old title', bio = 'Keep bio', email = 'keep@example.test', focus = '[\"Keep focus\"]' WHERE id = 1");
  await connection.query("INSERT INTO team_members (name, title, dept, bio, focus, image, email) VALUES ('Database-only member', 'Title', 'Office', '', '[]', '/team/extra.jpg', '')");
  assert.match(run(), /0 added/);
  const [[first]] = await connection.query('SELECT * FROM team_members WHERE id = 1');
  assert.equal(first.title, members[0].title);
  assert.equal(first.bio, 'Keep bio');
  assert.equal(first.email, 'keep@example.test');
  assert.deepEqual(first.focus, ['Keep focus']);
  const [[total]] = await connection.query('SELECT COUNT(*) AS total FROM team_members');
  assert.equal(Number(total.total), members.length + 1);
  await connection.execute('INSERT INTO team_members (name, title, dept, bio, focus, image, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [members[1].name, 'Duplicate', 'Office', '', '[]', '/team/duplicate.jpg', '']);
  await connection.query("UPDATE team_members SET title = 'Must remain on rollback' WHERE id = 1");
  assert.throws(run, error => /duplicate names/.test(error.stderr));
  const [[afterFailure]] = await connection.query('SELECT title FROM team_members WHERE id = 1');
  assert.equal(afterFailure.title, 'Must remain on rollback');
  console.log('PASS: team-only insert/update, repeat runs, admin detail preservation, database-only members, and duplicate rollback.');
} finally {
  if (created) await connection.query(`DROP DATABASE \`${database}\``);
  await connection.end();
}
