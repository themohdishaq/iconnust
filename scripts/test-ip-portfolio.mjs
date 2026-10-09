// Run against a local development server. Only temporary test records are removed.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.IP_PORTFOLIO_TEST_URL || 'http://localhost:3000';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Use a local server for these tests.');
const token = await new SignJWT({ userId: 'integration-test', email: 'test@example.com', role: 'admin', expires: new Date(Date.now() + 600000).toISOString() })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
const otpToken = await new SignJWT({ adminId: 'test', purpose: 'admin-otp' })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
const testIds = new Set();
async function call(path = '', { method = 'GET', data, raw, authenticated = true, sessionToken = token, origin = new URL(base).origin } = {}) {
  const response = await fetch(`${base}/api/ip-portfolio${path}`, {
    method, headers: { Origin: origin, ...(authenticated ? { Cookie: `session_token=${sessionToken}` } : {}), ...(data || raw ? { 'Content-Type': 'application/json' } : {}) },
    ...(method !== 'GET' ? { body: raw ?? (data ? JSON.stringify(data) : undefined) } : {}),
  });
  return { status: response.status, data: await response.json() };
}
const input = { ip_title: `IP integration test ${randomUUID()}`, ip_type: 'Utility Patent', sector: 'Integration Test Field', description: 'First paragraph.\n\nSecond paragraph.', application_no: '', award_date: '', status: 'draft' };
try {
  const initial = await call('', { authenticated: false });
  assert.equal(initial.status, 200);
  assert.ok(initial.data.every(record => record.status === 'published'), 'Public API must exclude drafts.');
  for (const options of [{ authenticated: false }, { sessionToken: 'invalid' }, { sessionToken: otpToken }]) {
    assert.equal((await call('', { method: 'POST', data: input, ...options })).status, 401);
  }
  assert.equal((await call('', { method: 'POST', data: input, origin: 'https://other.example' })).status, 403);
  assert.equal((await call('', { method: 'POST', raw: '{broken' })).status, 400);
  for (const data of [null, [], 'text', {}, { ...input, ip_title: ' ' }, { ...input, ip_type: 'Trademark' }, { ...input, status: 'invalid' }, { ...input, sector: 5 }, { ...input, description: 'x'.repeat(15001) }, { ...input, award_date: '2025-02-30' }]) {
    assert.equal((await call('', { method: 'POST', raw: JSON.stringify(data) })).status, 400);
  }
  for (const ip_type of ['Utility Patent', 'Copyright', 'Industrial Design']) {
    const created = await call('', { method: 'POST', data: { ...input, ip_type } });
    assert.equal(created.status, 201);
    const id = created.data.id;
    testIds.add(id);
    assert.ok(!(await call()).data.some(record => record.id === id), 'Draft leaked into public API.');
    const updated = await call(`/${id}`, { method: 'PUT', data: { ...input, ip_type, status: 'published', sector: '', award_date: '2024-02-29' } });
    assert.equal(updated.status, 200);
    const record = (await call()).data.find(record => record.id === id);
    assert.equal(record.ip_type, ip_type);
    assert.equal(record.description, input.description);
    assert.equal(record.application_no, null);
    assert.equal(record.award_date, '2024-02-29');
    assert.equal(record.sector, 'Unknown');
    assert.equal((await call(`/${id}`, { method: 'PUT', data: { ...input, ip_type, status: 'published', sector: 'New Test Field', description: '' } })).status, 200);
    assert.equal((await call()).data.find(record => record.id === id).description, '');
    assert.equal((await call(`/${id}`, { method: 'DELETE', authenticated: false })).status, 401);
    assert.equal((await call(`/${id}`, { method: 'DELETE' })).status, 200);
    testIds.delete(id);
    assert.ok(!(await call()).data.some(record => record.id === id));
    assert.equal((await call(`/${id}`, { method: 'DELETE' })).status, 404);
  }
  assert.equal((await call('/invalid', { method: 'PUT', data: input })).status, 400);
  assert.equal((await call(`/${randomUUID()}`, { method: 'PUT', data: input })).status, 404);
  const publicPage = await fetch(`${base}/research-innovation/ipo-listing`);
  assert.equal(publicPage.status, 200);
  assert.ok((await publicPage.text()).includes('Fields of Invention'));
  const adminPage = await fetch(`${base}/admin/ip-portfolio`, { headers: { Cookie: `session_token=${token}` } });
  assert.equal(adminPage.status, 200);
  assert.ok((await adminPage.text()).includes('Add IP record'));
  const unauthed = await fetch(`${base}/admin/ip-portfolio`, { redirect: 'manual' });
  assert.equal(unauthed.status, 307);
  assert.ok(unauthed.headers.get('location').includes('/admin/login'));
  assert.equal((await call()).data.length, initial.data.length, 'Tests changed existing portfolio records.');
  console.log('IP portfolio tests passed: all three IP types, CRUD, drafts, descriptions, dates, validation, authentication, origin protection and rendered pages.');
} finally {
  for (const id of testIds) {
    const result = await call(`/${id}`, { method: 'DELETE' });
    assert.equal(result.status, 200, `Unable to remove temporary test record ${id}.`);
  }
}
