// Exercise Stats & Impact through the real admin forms and public pages.
// Creates and removes only its own temporary rows.
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { SignJWT } from 'jose';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { encodeReply } = require('next/dist/compiled/react-server-dom-webpack/client.node');

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const base = process.env.STATS_TEST_URL || 'http://localhost:3000';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Use a local server.');
assert.ok(['localhost', '127.0.0.1'].includes(process.env.DB_HOST), 'Use a local database.');
const db = await mysql.createConnection({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
const token = await new SignJWT({ userId: 'stats-test', email: 'stats-test@example.test', role: 'admin', expires: new Date(Date.now() + 600000).toISOString() })
  .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('10m').sign(new TextEncoder().encode(process.env.JWT_SECRET));
const suffix = Date.now().toString().slice(-7);
const title = `Temporary stats test ${suffix}`;
const year = `T${suffix}`;
const created = [];
const decode = text => text.replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
async function adminHtml() {
  const response = await fetch(`${base}/admin/stats`, { headers: { Cookie: `session_token=${token}` }, signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200);
  return response.text();
}
function formFor(html, sectionId, marker, deleteId) {
  const start = html.indexOf(`id="${sectionId}"`);
  assert.ok(start >= 0, `Missing stats section ${sectionId}`);
  const end = html.indexOf('<div id=', start + sectionId.length + 5);
  const section = html.slice(start, end < 0 ? undefined : end);
  const forms = [...section.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/g)].map(match => match[0]);
  const form = forms.find(body => deleteId ? body.includes(`aria-label="Delete row ${deleteId}"`) : marker ? body.includes(`value="${marker}"`) : body.includes('Add Row'));
  assert.ok(form, `Missing ${marker ? 'edit' : 'add'} form in ${sectionId}`);
  const data = new FormData();
  for (const match of form.matchAll(/<input\b[^>]*>/g)) {
    const input = match[0];
    const name = input.match(/\bname="([^"]+)"/)?.[1];
    if (name?.startsWith('$ACTION_')) data.append(decode(name), decode(input.match(/\bvalue="([^"]*)"/)?.[1] || ''));
  }
  assert.ok([...data.keys()].some(key => /^\$ACTION_(REF|ID)_/.test(key)), 'Missing server action marker');
  return { data, form };
}
async function submit(data) {
  // Send the hydrated browser's Server Action protocol, avoiding a full-page postback.
  const reference = [...data.keys()].find(key => key.startsWith('$ACTION_REF_'));
  assert.ok(reference, 'Missing bound action reference');
  const prefix = reference.slice('$ACTION_REF_'.length);
  const metadata = JSON.parse(data.get(`$ACTION_${prefix}:0`));
  const boundIndex = metadata.bound.replace('$@', '');
  const bound = JSON.parse(data.get(`$ACTION_${prefix}:${boundIndex}`));
  const fields = new FormData();
  for (const [key, value] of data.entries()) if (!key.startsWith('$ACTION_')) fields.append(key, value);
  const body = await encodeReply([...bound, fields]);
  const response = await fetch(`${base}/admin/stats`, { method: 'POST', headers: { Cookie: `session_token=${token}`, Origin: new URL(base).origin, 'Next-Action': metadata.id }, body, redirect: 'manual', signal: AbortSignal.timeout(30000) });
  if (![200, 303].includes(response.status)) assert.fail(await response.text());
  await response.text();
}
async function publicHtml(route) {
  const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200);
  return response.text();
}
const scenarios = [
  { section: 'home-page-live-impact-engine', table: 'stat_tiles', key: 'label', route: '/', data: { label: `${title} home`, value: '76543' }, update: { label: `${title} home edited`, value: '76544' } },
  { section: 'innovation-impact-tiles', table: 'stat_tiles', key: 'label', route: '/research-innovation', data: { label: `${title} innovation`, value: '23456' }, update: { label: `${title} innovation edited`, value: '23457' } },
  { section: 'ip-area-breakdown', table: 'ip_breakdown', key: 'name', route: '/research-innovation', data: { name: `${title} breakdown`, value: '1234', color: '#123456' }, update: { name: `${title} breakdown edited`, value: '1235', color: '#654321' } },
  { section: 'ips-filed-by-year', table: 'ip_yearly_stats', key: 'year', kind: 'filed', route: '/research-innovation', data: { year, industrialDesign: '1', copyright: '2', patents: '3', trademark: '4' }, update: { year, industrialDesign: '5', copyright: '6', patents: '7', trademark: '8' } },
  { section: 'ips-awarded-by-year', table: 'ip_yearly_stats', key: 'year', kind: 'awarded', route: '/research-innovation', data: { year, industrialDesign: '11', copyright: '12', patents: '13', trademark: '14' }, update: { year, industrialDesign: '15', copyright: '16', patents: '17', trademark: '18' } },
  { section: 'financial-chart', table: 'financial_stats', key: 'year', route: null, data: { year, amount: '12.34' }, update: { year, amount: '56.78', isTotal: 'on' } },
  { section: 'homepage-tech-place-cards', table: 'tech_place_stats', key: 'title', route: '/', data: { title: `${title} tech`, value: '8910', subtitle: 'Temporary added card subtitle' }, update: { title: `${title} tech edited`, value: '8911', subtitle: 'Temporary edited card subtitle' } },
];
try {
  // Repeated rows for one year must contribute to the total rather than overwrite it.
  const compiled = ts.transpileModule(readFileSync('lib/impactStats.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const loaded = { exports: {} };
  new Function('module', 'exports', compiled)(loaded, loaded.exports);
  const ipRow = (year, patents) => ({ year, industrialDesign: 0, copyright: 0, patents, trademark: 0 });
  assert.deepEqual(loaded.exports.buildIpTrend([ipRow('2027', 2), ipRow('2027', 3), ipRow('2026', 1)], [ipRow('2027', 4)]), [{ year: '2026', filed: 1, awarded: 0 }, { year: '2027', filed: 5, awarded: 4 }]);
  for (const scenario of scenarios) {
    console.log(`Checking ${scenario.section}...`);
    const add = formFor(await adminHtml(), scenario.section);
    for (const [key, value] of Object.entries(scenario.data)) add.data.set(key, value);
    await submit(add.data);
    const [rows] = await db.execute(`SELECT * FROM ${scenario.table} WHERE ${scenario.key} = ?${scenario.kind ? ' AND chart_type = ?' : ''}`, [scenario.data[scenario.key], ...(scenario.kind ? [scenario.kind] : [])]);
    assert.equal(rows.length, 1, `${scenario.section} creation failed`);
    const id = rows[0].id;
    created.push({ table: scenario.table, id });
    if (scenario.route) assert.ok((await publicHtml(scenario.route)).includes(scenario.data[scenario.key]), `Added row missing from ${scenario.route}`);
    const edit = formFor(await adminHtml(), scenario.section, scenario.data[scenario.key]);
    for (const [key, value] of Object.entries(scenario.update)) edit.data.set(key, value);
    await submit(edit.data);
    const [[saved]] = await db.execute(`SELECT * FROM ${scenario.table} WHERE id = ?`, [id]);
    assert.equal(saved[scenario.key], scenario.update[scenario.key]);
    if (scenario.update.value) assert.equal(Number(saved.value), Number(scenario.update.value));
    if (scenario.update.amount) { assert.equal(Number(saved.amount), 56.78); assert.equal(Number(saved.is_total), 1); }
    if (scenario.update.patents) assert.equal(Number(saved.patents), Number(scenario.update.patents));
    if (scenario.route) assert.ok((await publicHtml(scenario.route)).includes(scenario.update[scenario.key]), `Edited row missing from ${scenario.route}`);
    const deletion = formFor(await adminHtml(), scenario.section, undefined, id);
    await submit(deletion.data);
    const [remaining] = await db.execute(`SELECT id FROM ${scenario.table} WHERE id = ?`, [id]);
    assert.equal(remaining.length, 0, `${scenario.section} deletion failed`);
    if (scenario.route && !scenario.kind) assert.ok(!(await publicHtml(scenario.route)).includes(scenario.update[scenario.key]), 'Deleted row is still displayed');
  }
  const invalid = formFor(await adminHtml(), 'home-page-live-impact-engine');
  invalid.data.set('label', `${title} invalid`); invalid.data.set('value', '-1');
  await submit(invalid.data);
  const [[rejected]] = await db.execute('SELECT COUNT(*) AS total FROM stat_tiles WHERE label = ?', [`${title} invalid`]);
  assert.equal(Number(rejected.total), 0);
  console.log('PASS: real Stats & Impact forms create/edit/delete all seven sections; added and edited rows appear on public pages; negative counts rejected; duplicate-year totals preserved.');
} finally {
  for (const { table, id } of created) await db.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
  await db.end();
}
