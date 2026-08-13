const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'team', '_components', 'TeamPageClient.tsx');
const publicDir = path.join(__dirname, '..', 'public');

const content = fs.readFileSync(file, 'utf8');
const regex = /['\"](\/team\/[\w\-\.]+)['\"]/g;
let m;
const missing = [];
const found = new Set();
while ((m = regex.exec(content))) {
  const rel = m[1];
  if (found.has(rel)) continue;
  found.add(rel);
  const p = path.join(publicDir, rel.replace(/^\//, ''));
  if (!fs.existsSync(p)) missing.push({ path: rel, checked: p });
}

if (missing.length === 0) {
  console.log('All referenced /team images exist in public/team.');
  process.exit(0);
}

console.log('Missing images:');
missing.forEach((x) => console.log(`  ${x.path} -> checked ${x.checked}`));
process.exit(2);
