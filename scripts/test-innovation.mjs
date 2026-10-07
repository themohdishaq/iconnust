// Run against a local development server: node scripts/test-innovation.mjs
// Only temporary test entries are created; they are removed in finally.
import assert from 'node:assert/strict';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';
import { unlink } from 'node:fs/promises';
import path from 'node:path';

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.INNOVATION_TEST_URL || 'http://localhost:3000';
const expectedOrigin = process.env.NODE_ENV === 'production' ? 'https://icon.nust.edu.pk' : new URL(base).origin;
assert.ok(new URL(base).hostname === 'localhost' || new URL(base).hostname === '127.0.0.1', 'Run this test against a local server only.');
const token = await new SignJWT({ userId: 'integration-test', email: 'test@example.com', role: 'admin', expires: new Date(Date.now() + 600000).toISOString() })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m')
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));
const suffix = Date.now();
const slugs = [`portfolio-test-${suffix}-a`, `portfolio-test-${suffix}-b`];
const sector = { slug: slugs[0], title: 'Integration test sector', description: 'Temporary integration test data.', iconKey: 'settings', heroImage: '/project/ekko.png', order: 999 };
let projectId;
let uploadedImage;

async function call(url, { method = 'GET', data, body, authenticated = true, origin = expectedOrigin, sessionToken = token } = {}) {
  const headers = {};
  if (authenticated) headers.Cookie = `session_token=${sessionToken}`;
  if (data) headers['Content-Type'] = 'application/json';
  if (origin) headers.Origin = origin;
  const response = await fetch(`${base}/api/innovation/${url}`, { method, headers, body: body || (data ? JSON.stringify(data) : undefined) });
  return { status: response.status, data: await response.json() };
}

try {
  assert.equal((await call('sectors', { authenticated: false })).status, 200);
  assert.equal((await call('sectors', { method: 'POST', data: sector, authenticated: false })).status, 401);
  assert.equal((await call('sectors', { method: 'POST', data: sector, sessionToken: 'invalid-token' })).status, 401);
  const otpToken = await new SignJWT({ adminId: 'integration-test', purpose: 'admin-otp' })
    .setProtectedHeader({ alg: 'HS256' }).setExpirationTime('5m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
  assert.equal((await call('sectors', { method: 'POST', data: sector, sessionToken: otpToken })).status, 401);
  assert.equal((await call('sectors', { method: 'POST', data: sector, origin: 'https://other.example' })).status, 403);
  assert.equal((await call('sectors', { method: 'POST', data: { ...sector, slug: 'Bad URL' } })).status, 400);
  assert.equal((await call('sectors', { method: 'POST', data: { ...sector, slug: slugs[0] }, origin: expectedOrigin })).status, 201);
  assert.equal((await call('sectors', { method: 'POST', data: { ...sector, slug: slugs[1] } })).status, 201);
  assert.equal((await call('sectors', { method: 'POST', data: sector })).status, 409);

  const project = { title: 'Integration test project', type: 'project', category: 'Testing', description: 'Temporary test project.', image: '', sectorSlugs: slugs, order: 999 };
  assert.equal((await call('projects', { method: 'POST', data: { ...project, sectorSlugs: [] } })).status, 400);
  const created = await call('projects', { method: 'POST', data: project });
  assert.equal(created.status, 201); projectId = created.data.id;
  for (const slug of slugs) assert.equal((await call(`sectors/${slug}`)).data.projects, 1);
  assert.equal((await call(`projects?sector=${slugs[0]}`)).data.length, 1);
  assert.equal((await call(`sectors/${slugs[0]}`, { method: 'DELETE' })).status, 409);

  const invalidUpdate = await call(`projects/${projectId}`, { method: 'PUT', data: { ...project, sectorSlugs: ['missing-test-sector'] } });
  assert.equal(invalidUpdate.status, 400);
  assert.deepEqual((await call(`projects/${projectId}`)).data.sectorSlugs.sort(), [...slugs].sort());
  const edited = { ...project, type: 'spin-off', sectorSlugs: [slugs[1]] };
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', data: edited })).status, 200);
  assert.equal((await call(`sectors/${slugs[0]}`)).data.projects, 0);
  assert.equal((await call(`sectors/${slugs[1]}`)).data.spinOffs, 1);

  const invalidUpload = new FormData();
  invalidUpload.set('data', JSON.stringify(edited));
  invalidUpload.set('file', new Blob(['invalid'], { type: 'text/plain' }), 'invalid.txt');
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', body: invalidUpload })).status, 400);
  const upload = new FormData();
  upload.set('data', JSON.stringify(edited));
  const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
  upload.set('file', new Blob([pixel], { type: 'image/png' }), 'test.png');
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', body: upload })).status, 200);
  uploadedImage = (await call(`projects/${projectId}`)).data.image;
  assert.ok(uploadedImage.startsWith('/uploads/innovation/'));
  assert.equal((await fetch(`${base}${uploadedImage}`)).status, 200);

  assert.equal((await call(`sectors/${slugs[1]}`, { method: 'PUT', data: { ...sector, slug: slugs[1], title: 'Updated test sector', ipAssets: '4', industryPartners: 2 } })).status, 200);
  assert.equal((await call(`sectors/${slugs[1]}`)).data.title, 'Updated test sector');
  const publicPage = await fetch(`${base}/commercialisation/sectors/${slugs[1]}`);
  assert.equal(publicPage.status, 200);
  const html = await publicPage.text();
  assert.ok(html.includes('Updated test sector') && html.includes(project.title));
  const adminPage = await fetch(`${base}/admin/innovation`, { headers: { Cookie: `session_token=${token}` } });
  assert.equal(adminPage.status, 200);
  assert.ok((await adminPage.text()).includes('Add sector'));
  assert.equal((await call(`projects/${projectId}`, { method: 'DELETE' })).status, 200);
  assert.equal((await call(`projects/${projectId}`)).status, 404);
  projectId = undefined;
  console.log('Portfolio integration checks passed: authentication, validation, CRUD, multi-sector counts, rollback, uploads, and public/admin pages.');
} finally {
  if (projectId) await call(`projects/${projectId}`, { method: 'DELETE' });
  for (const slug of slugs) await call(`sectors/${slug}`, { method: 'DELETE' });
  if (uploadedImage && /^\/uploads\/innovation\/[\w.-]+$/.test(uploadedImage)) await unlink(path.join(process.cwd(), 'public', uploadedImage));
}
