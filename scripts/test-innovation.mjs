// Run against a local development server: node scripts/test-innovation.mjs
// Only temporary test entries are created; they are removed in finally.
import assert from 'node:assert/strict';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';
import { readFile, unlink } from 'node:fs/promises';
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
const uploadedImages = new Set();

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
  const edited = { ...project, title: 'Updated integration spin-off', description: 'Updated description.\nSecond paragraph.', category: 'Updated category', status: 'Patent granted', highlight: 'TRL 7', order: -10, type: 'spin-off', sectorSlugs: [slugs[1]] };
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', data: edited })).status, 200);
  const savedProject = (await call(`projects/${projectId}`)).data;
  for (const field of ['title', 'description', 'category', 'status', 'highlight', 'order', 'type', 'image']) assert.equal(savedProject[field], edited[field], `${field} did not update`);
  assert.deepEqual(savedProject.sectorSlugs, edited.sectorSlugs);
  assert.equal((await call(`sectors/${slugs[0]}`)).data.projects, 0);
  assert.equal((await call(`sectors/${slugs[1]}`)).data.spinOffs, 1);

  const invalidUpload = new FormData();
  invalidUpload.set('data', JSON.stringify(edited));
  invalidUpload.set('file', new Blob(['invalid'], { type: 'text/plain' }), 'invalid.txt');
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', body: invalidUpload })).status, 400);
  const upload = new FormData();
  upload.set('data', JSON.stringify(edited));
  const pixel = await readFile(path.join(process.cwd(), 'public/project/ekko.png'));
  upload.set('file', new Blob([pixel], { type: 'image/png' }), 'test.png');
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', body: upload })).status, 200);
  uploadedImage = (await call(`projects/${projectId}`)).data.image;
  uploadedImages.add(uploadedImage);
  assert.ok(uploadedImage.startsWith('/uploads/innovation/'));
  assert.equal((await fetch(`${base}${uploadedImage}`)).status, 200);
  const optimizedImage = await fetch(`${base}/_next/image?url=${encodeURIComponent(uploadedImage)}&w=640&q=75`);
  assert.equal(optimizedImage.status, 200, 'The uploaded image must load through the website image optimizer');
  assert.ok(optimizedImage.headers.get('content-type').startsWith('image/'));

  // Replacing a photo must save a fresh URL; editing text alone must preserve it.
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', body: upload })).status, 200);
  const replacedProject = (await call(`projects/${projectId}`)).data;
  uploadedImages.add(replacedProject.image);
  assert.notEqual(replacedProject.image, uploadedImage);
  uploadedImage = replacedProject.image;
  assert.equal((await fetch(`${base}${uploadedImage}`)).status, 200);
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', data: { ...edited, image: uploadedImage } })).status, 200);
  assert.equal((await call(`projects/${projectId}`)).data.image, uploadedImage);

  const sectorEdit = { ...sector, slug: slugs[1], title: 'Updated test sector', description: 'Updated sector description', iconKey: 'brainCircuit', ipAssets: '4', industryPartners: 2, order: -20 };
  const sectorUpload = new FormData();
  sectorUpload.set('data', JSON.stringify(sectorEdit));
  sectorUpload.set('file', new Blob([pixel], { type: 'image/png' }), 'hero.png');
  assert.equal((await call(`sectors/${slugs[1]}`, { method: 'PUT', body: sectorUpload })).status, 200);
  const savedSector = (await call(`sectors/${slugs[1]}`)).data;
  uploadedImages.add(savedSector.heroImage);
  for (const field of ['title', 'description', 'iconKey', 'ipAssets', 'industryPartners', 'order']) assert.equal(savedSector[field], sectorEdit[field], `${field} did not update`);
  assert.ok(savedSector.heroImage.startsWith('/uploads/innovation/'));
  assert.equal((await fetch(`${base}${savedSector.heroImage}`)).status, 200);
  const publicPage = await fetch(`${base}/commercialisation/sectors/${slugs[1]}`);
  assert.equal(publicPage.status, 200);
  const html = await publicPage.text();
  for (const value of [sectorEdit.title, sectorEdit.description, edited.title, edited.category, edited.status, edited.highlight, uploadedImage, savedSector.heroImage]) assert.ok(html.includes(value), `Website is missing ${value}`);
  assert.ok(html.includes('Second paragraph.'));
  const landingPage = await fetch(`${base}/commercialisation`);
  assert.equal(landingPage.status, 200);
  assert.ok((await landingPage.text()).includes(sectorEdit.title));
  const adminPage = await fetch(`${base}/admin/innovation`, { headers: { Cookie: `session_token=${token}` } });
  assert.equal(adminPage.status, 200);
  assert.ok((await adminPage.text()).includes('Add sector'));
  // Blank optional fields and image removal must also persist.
  assert.equal((await call(`projects/${projectId}`, { method: 'PUT', data: { ...edited, image: '', status: '', highlight: '', type: 'project' } })).status, 200);
  const cleared = (await call(`projects/${projectId}`)).data;
  for (const field of ['image', 'status', 'highlight']) assert.equal(cleared[field], '');
  assert.equal(cleared.type, 'project');
  assert.equal((await call(`projects/${projectId}`, { method: 'DELETE' })).status, 200);
  assert.equal((await call(`projects/${projectId}`)).status, 404);
  projectId = undefined;
  console.log('Portfolio integration checks passed: all project/sector fields, authentication, validation, CRUD, multi-sector counts, rollback, image uploads/replacements/optimization, optional field removal and public/admin pages.');
} finally {
  if (projectId) await call(`projects/${projectId}`, { method: 'DELETE' });
  for (const slug of slugs) await call(`sectors/${slug}`, { method: 'DELETE' });
  for (const image of uploadedImages) if (/^\/uploads\/innovation\/[\w.-]+$/.test(image)) await unlink(path.join(process.cwd(), 'public', image));
}
