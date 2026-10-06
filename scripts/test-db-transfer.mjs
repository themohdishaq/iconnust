import assert from 'node:assert/strict';
import { parseEnv } from 'node:util';
import { readFile, mkdtemp, readdir, unlink, rmdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { tmpdir } from 'node:os';
import mysql from 'mysql2/promise';
import { transferDatabase } from './db-scribe-mitigate.mjs';

const config = parseEnv(await readFile('.env.local', 'utf8'));
assert.ok(['localhost', '127.0.0.1'].includes(config.DB_HOST), 'Use a local database server.');
const suffix = randomUUID().replaceAll('-', '');
const sourceName = `icon_transfer_source_${suffix}`;
const targetName = `icon_transfer_target_${suffix}`;
const backupDirectory = await mkdtemp(path.join(tmpdir(), 'icon-transfer-test-'));
const connection = await mysql.createConnection({ host: config.DB_HOST, port: Number(config.DB_PORT || 3306), user: config.DB_USER, password: config.DB_PASSWORD, multipleStatements: true });
const created = [];
try {
  const schema = await readFile('lib/db/schema.sql', 'utf8');
  for (const name of [sourceName, targetName]) {
    assert.match(name, /^icon_transfer_(source|target)_[a-f0-9]{32}$/);
    assert.notEqual(name, config.DB_NAME);
    await connection.query(`CREATE DATABASE \`${name}\``);
    created.push(name);
    await connection.changeUser({ database: name });
    await connection.query(schema);
  }
  await connection.query('ALTER TABLE news DROP INDEX idx_news_status_order, DROP INDEX idx_news_order, DROP COLUMN sort_order');
  await connection.query("INSERT INTO team_members (id, name, title, dept, bio, focus, image, email) VALUES (1, 'Old cloud member', 'Old title', 'Office', '', '[]', '/team/old.jpg', '')");
  await connection.query("INSERT INTO team_members (id, name, title, dept, bio, focus, image, email) VALUES (900, 'Cloud-only member', 'Title', 'Office', '', '[]', '/team/cloud.jpg', '')");
  await connection.changeUser({ database: sourceName });
  await connection.query("INSERT INTO team_members (id, name, title, dept, bio, focus, image, email, sort_order, created_at, updated_at) VALUES (1, 'Local member 🧪', 'New title', 'Office', 'Bio', '[\"Research\"]', '/uploads/team/test.png', 'local@example.test', 5, '2024-01-02 03:04:05', '2024-02-03 04:05:06')");
  await connection.query("INSERT INTO news (id, title, slug, category, excerpt, content, image, date, status, sort_order) VALUES (1, 'Local news', 'local-news', 'Research', 'Excerpt', '[\"Paragraph\"]', '/news.jpg', 'October 6, 2026', 'published', 7)");
  await connection.query("INSERT INTO innovation_sectors (slug, title, description, hero_image) VALUES ('test-sector', 'Sector', 'Description', '/sector.jpg')");
  await connection.query("INSERT INTO innovation_projects (id, title, type, description, category) VALUES ('test-project', 'Project', 'project', 'Description', 'Research')");
  await connection.query("INSERT INTO innovation_project_sectors VALUES ('test-project', 'test-sector')");
  const sourceConfig = { ...config, DB_NAME: sourceName };
  const targetConfig = { ...config, DB_NAME: targetName };
  await assert.rejects(transferDatabase(sourceConfig, sourceConfig, backupDirectory), /same database/);
  const result = await transferDatabase(sourceConfig, targetConfig, backupDirectory);
  const backup = JSON.parse(await readFile(result.backupFile, 'utf8'));
  assert.equal(backup.tables.team_members.rows[0].name, 'Old cloud member');
  await connection.changeUser({ database: targetName });
  const [[team]] = await connection.query("SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS original_date FROM team_members WHERE id = 1");
  assert.equal(team.name, 'Local member 🧪');
  assert.equal(team.image, '/uploads/team/test.png');
  assert.equal(team.original_date, '2024-01-02 03:04:05');
  assert.deepEqual(team.focus, ['Research']);
  const [[count]] = await connection.query('SELECT COUNT(*) AS count FROM team_members');
  assert.equal(Number(count.count), 2);
  const [[news]] = await connection.query('SELECT * FROM news WHERE id = 1');
  assert.equal(news.sort_order, 7);
  const [[link]] = await connection.query('SELECT * FROM innovation_project_sectors');
  assert.equal(link.project_id, 'test-project');
  await transferDatabase(sourceConfig, targetConfig, backupDirectory);
  const [[repeat]] = await connection.query('SELECT COUNT(*) AS count FROM team_members');
  assert.equal(Number(repeat.count), 2);
  // A later unique-key conflict must roll back earlier team updates too.
  await connection.query("UPDATE news SET id = 99 WHERE id = 1");
  await connection.changeUser({ database: sourceName });
  await connection.query("UPDATE team_members SET title = 'Should roll back' WHERE id = 1");
  await assert.rejects(transferDatabase(sourceConfig, targetConfig, backupDirectory), /different cloud ID/);
  await connection.changeUser({ database: targetName });
  const [[afterFailure]] = await connection.query('SELECT title FROM team_members WHERE id = 1');
  assert.equal(afterFailure.title, 'New title');
  console.log('PASS: destination backup, schema upgrade, local overwrite, cloud-only preservation, JSON/Unicode/timestamps/photos, foreign-key links, repeat transfer, same-database refusal, and conflict rollback.');
} finally {
  for (const name of created) await connection.query(`DROP DATABASE \`${name}\``);
  await connection.end();
  for (const filename of await readdir(backupDirectory)) await unlink(path.join(backupDirectory, filename));
  await rmdir(backupDirectory);
}
