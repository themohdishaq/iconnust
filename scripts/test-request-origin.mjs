import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Load the real TypeScript helper without Next.js, a database, or another test dependency.
const asModule = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText).toString('base64')}`;
const seoModule = asModule(await readFile(new URL('../lib/seo.ts', import.meta.url), 'utf8'));
const source = (await readFile(new URL('../lib/requestOrigin.ts', import.meta.url), 'utf8')).replace("'@/lib/seo'", JSON.stringify(seoModule));
const { isValidRequestOrigin } = await import(asModule(source));
const savedEnv = { NODE_ENV: process.env.NODE_ENV, API_ALLOWED_ORIGINS: process.env.API_ALLOWED_ORIGINS };
const check = (origin, headers = {}, url = 'http://localhost:3000/api/innovation/projects') => isValidRequestOrigin(new Request(url, { method: 'POST', headers: { ...(origin === undefined ? {} : { origin }), ...headers } }));

try {
  process.env.NODE_ENV = 'production';
  delete process.env.API_ALLOWED_ORIGINS;
  assert.equal(check('https://icon.nust.edu.pk'), true);
  assert.equal(check('https://ICON.NUST.EDU.PK:443'), true);
  assert.equal(check('https://www.icon.nust.edu.pk', { host: 'www.icon.nust.edu.pk' }), true);
  assert.equal(check('https://preview.example:8443', { 'x-forwarded-host': 'preview.example:8443', 'x-forwarded-proto': 'https', host: 'localhost:3000' }), true);
  assert.equal(check('https://preview.example', { 'x-forwarded-host': 'preview.example, internal:3000', 'x-forwarded-proto': 'https, http' }), true);
  assert.equal(check('http://localhost:3000'), false);
  assert.equal(check('http://localhost:3000', { 'x-forwarded-proto': 'http' }), true);
  for (const origin of ['https://other.example', 'https://icon.nust.edu.pk.evil.example', 'null', '', 'garbage', 'https://icon.nust.edu.pk/path', 'https://user@icon.nust.edu.pk']) {
    assert.equal(check(origin), false, `Unexpectedly accepted ${origin}`);
  }
  assert.equal(check(undefined), true);
  process.env.API_ALLOWED_ORIGINS = 'https://admin.example/, https://another.example:8443';
  assert.equal(check('https://admin.example'), true);
  assert.equal(check('https://another.example:8443'), true);
  assert.equal(check('https://another.example'), false);
  process.env.NODE_ENV = 'development';
  assert.equal(check('http://localhost:3000'), true);
  assert.equal(check('http://localhost:3001'), false);
  console.log('Request origin checks passed: production, proxies, ports, configured origins, development, and rejected foreign/malformed origins.');
} finally {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
