import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const base = process.env.NEWS_TEST_URL || 'http://localhost:3000';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Use a local server.');
assert.ok(['localhost', '127.0.0.1'].includes(process.env.DB_HOST), 'Use a local database.');
const connection = await mysql.createConnection({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
const token = await new SignJWT({ userId: 'news-test', email: 'news-test@example.test', role: 'admin', expires: new Date(Date.now() + 600000).toISOString() })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
const prefix = `news-order-test-${Date.now()}`;
const rows = [];
const decode = text => text.replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&amp;', '&');
async function page(route, admin = false) {
  const response = await fetch(`${base}${route}`, { headers: admin ? { Cookie: `session_token=${token}` } : {}, redirect: 'manual' });
  assert.equal(response.status, 200, route);
  return response.text();
}
async function edit(row, order, authenticated = true) {
  const route = `/admin/news/${row.id}/edit`;
  const html = await page(route, true);
  const form = [...html.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/g)].find(match => match[1].includes('name="title"'))?.[1];
  assert.ok(form);
  assert.match(form, /name="order"/);
  const data = new FormData();
  for (const input of form.matchAll(/<input\b[^>]*>/g)) {
    const field = input[0].match(/\bname="([^"]+)"/)?.[1];
    if (field?.startsWith('$ACTION_')) data.append(decode(field), decode(input[0].match(/\bvalue="([^"]*)"/)?.[1] || ''));
  }
  for (const [key, value] of Object.entries({ title: row.title, category: 'Testing', excerpt: 'Temporary excerpt', content: 'Temporary paragraph', date: 'October 6, 2026', readTime: '3 min', status: 'published', order: String(order) })) data.set(key, value);
  return fetch(`${base}${route}`, { method: 'POST', headers: { Origin: new URL(base).origin, ...(authenticated ? { Cookie: `session_token=${token}` } : {}) }, body: data, redirect: 'manual' });
}
function ordered(html, titles) {
  const positions = titles.map(title => html.indexOf(title));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, positions.slice().sort((a, b) => a - b));
}
try {
  for (const [index, order, status] of [[0, -1000000000, 'published'], [1, -1000000001, 'published'], [2, -1000000000, 'published'], [3, -1000000002, 'draft']]) {
    const title = `${prefix} article ${index}`;
    const slug = `${prefix}-${index}`;
    const [result] = await connection.execute(
      'INSERT INTO news (title, slug, category, excerpt, content, image, date, status, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, 'Testing', 'Temporary excerpt', '["Temporary paragraph"]', '/partner/news1.jpeg', 'October 6, 2026', status, order, '2026-10-06 00:00:00'],
    );
    rows.push({ id: result.insertId, title, slug });
  }
  let expected = [rows[1].title, rows[2].title, rows[0].title];
  const api = await fetch(`${base}/api/news?limit=3`);
  assert.equal(api.status, 200);
  assert.deepEqual((await api.json()).map(row => row.title), expected);
  let html = await page('/news');
  ordered(html, expected);
  assert.ok(!html.includes(rows[3].title), 'Drafts are excluded');
  ordered(await page(`/news?q=${prefix}`), expected);
  ordered(await page(`/news/${rows[1].slug}`), [rows[2].title, rows[0].title]);
  const denied = await edit(rows[0], -1000000003, false);
  assert.ok([303, 307, 401, 403].includes(denied.status));
  for (const invalid of ['1.5', '2147483648', 'abc']) {
    const response = await edit(rows[0], invalid);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Display order must be a whole number/);
    const [[unchanged]] = await connection.execute('SELECT sort_order FROM news WHERE id = ?', [rows[0].id]);
    assert.equal(unchanged.sort_order, -1000000000);
  }
  assert.equal((await edit(rows[0], -1000000003)).status, 303);
  expected = [rows[0].title, rows[1].title, rows[2].title];
  ordered(await page('/news'), expected);
  ordered(await page('/admin/news', true), [rows[0].title, rows[3].title, rows[1].title, rows[2].title]);
  const apiAfter = await fetch(`${base}/api/news?limit=3`);
  assert.deepEqual((await apiAfter.json()).map(row => row.title), expected);
  console.log('PASS: authenticated order edits, unauthorized rejection, integer validation, public/admin/API/search/related sorting, deterministic ties, and draft filtering.');
} finally {
  for (const row of rows) await connection.execute('DELETE FROM news WHERE id = ?', [row.id]);
  await connection.end();
}
