import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
nextEnv.loadEnvConfig(root, false, { info() {}, error() {} });
const database = `icon_migration_test_${randomUUID().replaceAll('-', '')}`;
assert.match(database, /^icon_migration_test_[a-f0-9]{32}$/);
assert.notEqual(database, process.env.DB_NAME);
const connection = await mysql.createConnection({
  host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  multipleStatements: true,
});
let created = false;
const run = (...args) => execFileSync(process.execPath, ['scripts/migrate-production.mjs', ...args], {
  cwd: root, env: { ...process.env, DB_NAME: database }, encoding: 'utf8', stdio: 'pipe',
});
try {
  await connection.query(`CREATE DATABASE \`${database}\``);
  created = true;
  await connection.changeUser({ database });
  let legacy = await readFile(new URL('../lib/db/schema.sql', import.meta.url), 'utf8');
  legacy = legacy.replace(/^  KEY idx_[^\n]+\n/gm, '')
    .replace(/,\n\) ENGINE/g, '\n) ENGINE')
    .replace(/^  status ENUM\('draft', 'published'\)[^\n]+\n/gm, '')
    .replace(/^  notify_enabled BOOLEAN[^\n]+\n/gm, '')
    .replace("name VARCHAR(300) NOT NULL DEFAULT ''", 'name VARCHAR(200) NULL');
  await connection.query(legacy);
  await connection.query('ALTER TABLE news DROP COLUMN sort_order');
  for (const table of ['home_inquiries', 'industry_service_inquiries', 'innovation_inquiries']) {
    await connection.query(`ALTER TABLE ${table} DROP COLUMN name, DROP COLUMN industry, DROP COLUMN phone_number, DROP COLUMN province, DROP COLUMN address, DROP COLUMN brief_about_company`);
    await connection.query(`INSERT INTO ${table} (organization, email) VALUES ('Existing company', 'existing@example.test')`);
  }
  await connection.query("INSERT INTO subscriber (name, email) VALUES ('Existing subscriber', 'existing@example.test')");
  await connection.query("INSERT INTO news (title, slug, category, excerpt, content, image, date) VALUES ('Existing news', 'existing', 'Research', 'Excerpt', '[\"Existing paragraph\"]', '/image.png', 'October 6, 2026')");
  await connection.query("INSERT INTO stories (name, tag, description, founder, funding, image) VALUES ('Existing story', 'Tag', 'Description', 'Founder', 'Funding', '/image.png')");
  await connection.query("INSERT INTO events (day, month, year, title, type, location, description) VALUES ('6', 'October', '2026', 'Existing event', 'Event', 'Location', 'Description')");
  await connection.query('DROP TABLE tech_place_stats');
  const preview = run();
  assert.match(preview, /read-only preview/);
  const [before] = await connection.query('SHOW COLUMNS FROM news');
  assert.ok(!before.some(row => row.Field === 'status'), 'Preview must not mutate the database');
  assert.match(run('--apply'), /Migration complete/);
  for (const table of ['news', 'stories', 'events']) {
    const [rows] = await connection.query(`SELECT * FROM ${table}`);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].status, 'published', 'Existing content must remain public');
    const [columns] = await connection.query(`SHOW COLUMNS FROM ${table}`);
    assert.equal(columns.find(column => column.Field === 'status').Default, 'draft');
  }
  const [[news]] = await connection.query('SELECT * FROM news');
  assert.equal(news.title, 'Existing news');
  assert.equal(news.sort_order, 0, 'Legacy news defaults to zero display order');
  assert.deepEqual(news.content, ['Existing paragraph']);
  const [[subscriber]] = await connection.query('SELECT * FROM subscriber');
  assert.equal(subscriber.name, 'Existing subscriber');
  assert.equal(subscriber.notify_enabled, 1);
  assert.match(run(), /0 pending statements/);
  assert.match(run('--apply'), /0 pending statements/);
  // Preflight duplicate detection must prevent even unrelated earlier steps.
  await connection.query('ALTER TABLE subscriber DROP INDEX uq_subscriber_email');
  await connection.query("INSERT INTO subscriber (email) VALUES ('existing@example.test')");
  await connection.query('ALTER TABLE news DROP INDEX idx_news_order');
  assert.throws(() => run('--apply'), error => /duplicate values/.test(error.stderr));
  const [indexes] = await connection.query('SHOW INDEX FROM news');
  assert.ok(!indexes.some(index => index.Key_name === 'idx_news_order'));
  await connection.query('DELETE FROM subscriber WHERE id = 2');
  assert.match(run('--apply'), /Migration complete/);
  assert.match(run(), /0 pending statements/);
  console.log('PASS: read-only preview, legacy upgrade, missing table creation, preserved content, published backfill/draft defaults, repeat runs, duplicate preflight, and resumable migration.');
} finally {
  if (created) await connection.query(`DROP DATABASE \`${database}\``);
  await connection.end();
}
