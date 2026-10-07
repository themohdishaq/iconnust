// Exercise real route handlers with isolated persistence/mail dependencies.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as jose from 'jose';

const require = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const loadedModule = { exports: {} };
  new Function('require', 'module', 'exports', compiled)(name => Object.hasOwn(dependencies, name) ? dependencies[name] : require(name), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

const savedSecret = process.env.JWT_SECRET;
const savedMode = process.env.NODE_ENV;
process.env.JWT_SECRET = 'api-validation-test-secret-with-32-characters';
process.env.NODE_ENV = 'production';
try {
  const server = { NextResponse: { json: (body, init) => Response.json(body, init) } };
  const origin = load('lib/requestOrigin.ts', { '@/lib/seo': load('lib/seo.ts') });
  const validation = load('lib/apiValidation.ts');
  const auth = load('lib/auth.ts', { jose, 'next/headers': {} });
  const session = { userId: 'test', email: 'test@example.com', role: 'admin', expires: new Date(Date.now() + 60000) };
  const token = await auth.encrypt(session);
  let writes = 0;
  const model = { create: async () => { writes++; }, listApproved: async () => [] };
  const dependencies = {
    'next/server': server, '@/lib/auth': auth, '@/lib/requestOrigin': origin,
    '@/lib/apiValidation': validation, '@/lib/rateLimit': { isRateLimited: () => false },
    '@/lib/departments': { notifyDepartment: async () => {} },
    '@/lib/models/Subscriber': model, '@/lib/models/HomeInquiry': model,
    '@/lib/models/IndustryServiceInquiry': model, '@/lib/models/InnovationInquiry': model,
    '@/lib/models/InventionDisclosure': model, '@/lib/mailer': { sendMail: async () => { writes++; } },
  };
  const request = (body, options = {}) => {
    const req = new Request(options.url || 'http://localhost:3000/api/test', {
      method: options.method || 'POST',
      headers: { origin: options.origin || 'https://icon.nust.edu.pk', 'content-type': 'application/json' },
      ...(options.method === 'GET' ? {} : { body: options.raw ?? JSON.stringify(body) }),
    });
    req.cookies = { get: () => options.token === null ? undefined : { value: options.token || token } };
    req.nextUrl = new URL(req.url);
    return req;
  };
  const expectStatus = async (handler, body, status, options) => {
    const before = writes;
    const response = await handler(request(body, options));
    assert.equal(response.status, status, JSON.stringify(await response.json()));
    if (status >= 400) assert.equal(writes, before, 'Rejected input must not reach persistence or mail');
  };
  const subscription = load('app/api/subscribe/route.ts', dependencies);
  const inquiry = load('app/api/inquiries/route.ts', dependencies);
  const disclosure = load('app/api/invention-disclosures/route.ts', dependencies);
  const mail = load('app/api/sendMail/route.ts', dependencies);
  for (const route of [subscription, inquiry, disclosure, mail]) {
    for (const body of [null, [], 'text', 5]) await expectStatus(route.POST, body, 400);
    await expectStatus(route.POST, {}, 400, { raw: '{bad json' });
    await expectStatus(route.POST, {}, 403, { origin: 'https://other.example' });
  }
  await expectStatus(subscription.POST, { email: ' TEST@example.com ' }, 201);
  for (const email of ['invalid', 'a,b@example.com', 'x'.repeat(301) + '@example.com', 5]) await expectStatus(subscription.POST, { email }, 400);
  const inquiryData = { source: 'home', organization: 'Test', email: 'test@example.com' };
  await expectStatus(inquiry.POST, inquiryData, 201);
  for (const patch of [{ source: '__proto__' }, { source: 'bad' }, { organization: ' ' }, { message: 'x'.repeat(4001) }, { phoneNumber: 5 }]) await expectStatus(inquiry.POST, { ...inquiryData, ...patch }, 400);
  const disclosureData = { source: 'quick-form', inventionTitle: 'Test', contactEmail: 'test@example.com', description: 'Description' };
  await expectStatus(disclosure.POST, disclosureData, 201);
  await expectStatus(disclosure.POST, { ...disclosureData, source: 'idf-modal', conceptionDate: '2024-02-29', priorDisclosure: 'yes' }, 201);
  for (const patch of [{ source: 'bad' }, { conceptionDate: '2025-02-29' }, { conceptionDate: 'bad' }, { priorDisclosure: 'maybe' }, { domain: 123 }, { inventionTitle: 'x'.repeat(301) }, { contactEmail: 'x'.repeat(201) + '@example.com' }]) await expectStatus(disclosure.POST, { ...disclosureData, ...patch }, 400);
  const mailData = { to: 'test@example.com', subject: 'Test', html: '<p>Test</p>' };
  await expectStatus(mail.POST, mailData, 200);
  for (const patch of [{ to: 'a,b@example.com' }, { subject: 'x'.repeat(301) }, { subject: 'Test\r\nInjected' }, { html: 'x'.repeat(100001) }]) await expectStatus(mail.POST, { ...mailData, ...patch }, 400);
  const otpToken = await new jose.SignJWT({ adminId: 'test', purpose: 'admin-otp' }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('5m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
  for (const badToken of [null, 'invalid', otpToken, await auth.encrypt({ ...session, expires: 'invalid' }), await auth.encrypt({ ...session, expires: new Date(0) })]) await expectStatus(mail.POST, mailData, 401, { token: badToken });

  const portfolioValidation = load('lib/innovationValidation.ts', { './innovationSectors': load('lib/innovationSectors.ts') });
  const portfolio = load('lib/innovationApi.ts', {
    ...dependencies, 'next/cache': { revalidatePath: () => {} },
    '@/lib/innovationValidation': portfolioValidation,
    '@/lib/uploads': { saveUploadedImage: async () => '/uploads/test.png', deleteUploadedImage: async () => {} },
    '@/lib/models/InnovationPortfolio': {
      listInnovationPortfolio: async () => ({ sectors: [], projects: [] }),
      saveSector: async () => { writes++; return 'test'; }, saveProject: async () => { writes++; return 'test'; },
      removePortfolioEntry: async () => { writes++; },
    },
  });
  const sectorData = { slug: 'test', title: 'Test', description: 'Description', iconKey: 'settings', heroImage: '/test.png' };
  const projectData = { title: 'Test', description: 'Description', type: 'spin-off', category: 'Test', sectorSlugs: ['test'] };
  for (const [kind, data] of [['sectors', sectorData], ['projects', projectData]]) {
    await expectStatus(req => portfolio.mutatePortfolio(req, kind), data, 201);
    await expectStatus(req => portfolio.mutatePortfolio(req, kind, 'test'), data, 200, { method: 'PUT' });
    await expectStatus(req => portfolio.mutatePortfolio(req, kind, 'test'), undefined, 200, { method: 'DELETE' });
    await expectStatus(req => portfolio.mutatePortfolio(req, kind), data, 401, { token: otpToken });
    await expectStatus(req => portfolio.mutatePortfolio(req, kind), data, 403, { origin: 'https://other.example' });
    await expectStatus(req => portfolio.mutatePortfolio(req, kind, '../invalid'), data, 400, { method: 'PUT' });
    await expectStatus(req => portfolio.mutatePortfolio(req, kind), [], 400);
  }
  for (const patch of [{ type: 'bad' }, { category: '' }, { sectorSlugs: [''] }, { sectorSlugs: ['Bad Slug'] }, { order: 1.5 }, { image: 'https://other.example/image.png' }, { image: 'https://user@images.unsplash.com/image.png' }, { image: 'https://images.unsplash.com:8443/image.png' }, { image: '/%2e%2e/secret.png' }]) await expectStatus(req => portfolio.mutatePortfolio(req, 'projects'), { ...projectData, ...patch }, 400);
  await expectStatus(req => portfolio.readPortfolio(req, 'projects'), undefined, 400, { method: 'GET', url: 'https://icon.nust.edu.pk/api/innovation/projects?sector=Bad' });

  let selectedLimit;
  const news = load('app/api/news/route.ts', { 'next/server': server, '@/lib/models/News': { list: async ({ limit }) => { selectedLimit = limit; return []; } } });
  for (const limit of ['-1', '0', '1.5', 'abc', '']) await expectStatus(news.GET, undefined, 400, { method: 'GET', url: `https://icon.nust.edu.pk/api/news?limit=${limit}` });
  await expectStatus(news.GET, undefined, 200, { method: 'GET', url: 'https://icon.nust.edu.pk/api/news' });
  assert.equal(selectedLimit, 3);
  await expectStatus(news.GET, undefined, 200, { method: 'GET', url: 'https://icon.nust.edu.pk/api/news?limit=100' });
  assert.equal(selectedLimit, 20);
  const documents = load('app/api/nipo-documents/route.ts', { 'next/server': server, 'node:fs/promises': { readdir: async () => [] } });
  assert.equal((await documents.GET()).status, 200);
  assert.equal((await disclosure.GET()).status, 200);
  const uploads = load('lib/uploads.ts');
  await assert.rejects(uploads.saveUploadedImage(new File(['not an image'], 'fake.png', { type: 'image/png' }), 'innovation'), /content does not match/);
  console.log('API validation checks passed: public forms, admin mail/auth, portfolio writes, news queries, public reads, and fake image rejection. No database or mail service was used.');
} finally {
  if (savedSecret === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = savedSecret;
  if (savedMode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = savedMode;
}
