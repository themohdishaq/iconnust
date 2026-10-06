// Run with a local development server. Only temporary team records are removed.
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';
import { readFile, unlink } from 'node:fs/promises';
import path from 'node:path';

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const base = process.env.TEAM_TEST_URL || 'http://localhost:3000';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Use a local development server.');
assert.ok(['localhost', '127.0.0.1'].includes(process.env.DB_HOST), 'Use a local database.');
const connection = await mysql.createConnection({
  host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
});
const token = await new SignJWT({ userId: 'team-test', email: 'team-test@example.test', role: 'admin', expires: new Date(Date.now() + 600000).toISOString() })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m')
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));
const name = `Temporary team test ${Date.now()}`;
let id;
const uploads = new Set();
const decode = text => text.replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
async function page(route, authenticated = true) {
  const response = await fetch(`${base}${route}`, { headers: authenticated ? { Cookie: `session_token=${token}` } : {}, redirect: 'manual' });
  return { response, html: await response.text() };
}
function actionForm(html, memberId) {
  const forms = [...html.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/g)].map(match => match[1]);
  const form = memberId ? forms.find(body => body.includes(`Delete ${name}`)) : forms.find(body => body.includes('name="name"'));
  assert.ok(form, 'Team action form exists');
  const data = new FormData();
  for (const input of form.matchAll(/<input\b[^>]*>/g)) {
    const field = input[0].match(/\bname="([^"]+)"/);
    if (!field || !field[1].startsWith('$ACTION_')) continue;
    data.append(decode(field[1]), decode(input[0].match(/\bvalue="([^"]*)"/)?.[1] || ''));
  }
  assert.ok([...data.keys()].some(key => key.startsWith('$ACTION_')), 'Server action fields exist');
  return data;
}
async function submit(route, body, authenticated = true) {
  return fetch(`${base}${route}`, {
    method: 'POST', headers: { Origin: new URL(base).origin, ...(authenticated ? { Cookie: `session_token=${token}` } : {}) }, body, redirect: 'manual',
  });
}
function fields(data, title) {
  data.set('name', name);
  data.set('title', title);
  data.set('dept', 'Temporary department');
  data.set('bio', '');
  data.set('email', '');
  data.set('focus', '');
  data.set('order', '-999');
  return data;
}
try {
  const anonymous = await page('/admin/team', false);
  assert.ok([303, 307].includes(anonymous.response.status));
  assert.match(anonymous.response.headers.get('location'), /\/admin\/login/);
  const createPage = await page('/admin/team/new');
  assert.equal(createPage.response.status, 200);
  const createForm = fields(actionForm(createPage.html), 'Temporary original title');
  createForm.set('image', new Blob([await readFile('public/team/sundasimran.jpg')], { type: 'image/jpeg' }), 'team-test.jpg');
  const denied = await submit('/admin/team/new', createForm, false);
  assert.ok([303, 307, 401, 403].includes(denied.status));
  const [[unauthorized]] = await connection.execute('SELECT COUNT(*) AS count FROM team_members WHERE name = ?', [name]);
  assert.equal(Number(unauthorized.count), 0);
  const created = await submit('/admin/team/new', createForm);
  assert.equal(created.status, 303, await created.text());
  const [[member]] = await connection.execute('SELECT * FROM team_members WHERE name = ?', [name]);
  assert.ok(member);
  id = member.id;
  uploads.add(member.image);
  let publicPage = await page('/team', false);
  assert.equal(publicPage.response.status, 200);
  assert.ok(publicPage.html.includes(name));
  assert.ok(publicPage.html.includes('Temporary original title'));
  assert.equal(decode(publicPage.html.match(/<h3\b[^>]*>([^<]*)<\/h3>/)?.[1] || ''), name, 'Display order is respected');
  const editPage = await page(`/admin/team/${id}/edit`);
  const editForm = fields(actionForm(editPage.html), 'Temporary updated title');
  assert.equal((await submit(`/admin/team/${id}/edit`, editForm)).status, 303);
  publicPage = await page('/team', false);
  assert.ok(publicPage.html.includes('Temporary updated title'));
  assert.ok(!publicPage.html.includes('Temporary original title'));
  const [[edited]] = await connection.execute('SELECT image FROM team_members WHERE id = ?', [id]);
  assert.equal(edited.image, member.image, 'Editing without a photo preserves the image');
  const listing = await page('/admin/team');
  const deletion = await submit('/admin/team', actionForm(listing.html, id));
  assert.ok([200, 303].includes(deletion.status), await deletion.text());
  const [[remaining]] = await connection.execute('SELECT COUNT(*) AS count FROM team_members WHERE id = ?', [id]);
  assert.equal(Number(remaining.count), 0);
  assert.ok(!(await page('/team', false)).html.includes(name));
  console.log('PASS: authenticated admin create/edit/delete, anonymous write rejection, uploaded photo, optional bio/email, display order, and public-page updates.');
} finally {
  await connection.execute('DELETE FROM team_members WHERE name = ?', [name]);
  for (const upload of uploads) {
    if (upload.startsWith('/uploads/team/')) await unlink(path.join(process.cwd(), 'public', upload)).catch(() => {});
  }
  await connection.end();
}
