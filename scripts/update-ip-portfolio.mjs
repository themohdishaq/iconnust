import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log(`Import the IP portfolio JSON into the production database.

Usage:
  npm run db:update:ip-portfolio
  npm run db:update:ip-portfolio -- --apply

Default: preview only. --apply updates the schema and imports the portfolio.
Source: data/nipo_top20_ip_records.json (patents, copyrights and designs).
The initial import publishes all records, including their descriptions.
Repeated runs preserve existing admin edits and deletions.
An existing portfolio without an import marker stops for review.

Configure production DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.
Optional: DB_PORT, DB_SSL and DB_SSL_CA_FILE.
Local environment files are not loaded automatically.
Explicit configuration: node --env-file=.env.production scripts/update-ip-portfolio.mjs --apply`);
  process.exit(0);
}
if (args.some(arg => !['--dry-run', '--apply'].includes(arg)) || args.includes('--dry-run') && args.includes('--apply')) {
  throw new Error('Use --dry-run or --apply.');
}

// Reuse the production preflight, schema migration and transactional import.
const script = fileURLToPath(new URL('./update-production-tables.mjs', import.meta.url));
const result = spawnSync(process.execPath, [script, '--import-ip', ...args], {
  env: process.env,
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
