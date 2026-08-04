import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const steps = [
  ['Applying schema', 'apply-schema.mjs'],
  ['Seeding admin account', 'seed-admin.mjs'],
  ['Seeding news / events / stories / team', 'seed-content.mjs'],
  ['Seeding partners', 'seed-partners.mjs'],
  ['Seeding stats & impact data', 'seed-stats.mjs'],
];

for (const [label, file] of steps) {
  console.log(`\n▶ ${label} (${file})`);
  execFileSync(process.execPath, [path.join(__dirname, file)], { stdio: 'inherit', env: process.env });
}

console.log('\n✔ Database schema applied and all seed data loaded.');
