import mysql from 'mysql2/promise';
import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedIpPortfolio } from './ip-portfolio-seed.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { loadEnvConfig } = nextEnv;

// Load .env.local for local commands while preserving environment variables
// supplied directly by deployment platforms.
loadEnvConfig(path.join(__dirname, '..'));

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/apply-schema.mjs)');
}

const sql = await readFile(path.join(__dirname, '../lib/db/schema.sql'), 'utf8');

const connectionOptions = {
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
};

let connection;
try {
  connection = await mysql.createConnection(connectionOptions);
} catch (err) {
  if (err.code !== 'ER_BAD_DB_ERROR') throw err;

  // Local first-time setup may not have a database yet. Managed production
  // databases normally already exist and use the direct connection above.
  connection = await mysql.createConnection({
    ...connectionOptions,
    database: undefined,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.changeUser({ database: DB_NAME });
}

await connection.query(sql);

// MySQL (unlike MariaDB) doesn't support `ADD COLUMN/INDEX IF NOT EXISTS`, so
// upgrades to tables that pre-date a given column/index run here individually,
// tolerating "already exists" errors for databases that are already current.
const inquiryTables = [
  'home_inquiries',
  'industry_service_inquiries',
  'innovation_inquiries',
];
const inquiryColumns = [
  "name VARCHAR(200) NOT NULL DEFAULT ''",
  "industry VARCHAR(200) NOT NULL DEFAULT ''",
  "phone_number VARCHAR(50) NOT NULL DEFAULT ''",
  "province VARCHAR(200) NOT NULL DEFAULT ''",
  "address VARCHAR(300) NOT NULL DEFAULT ''",
  'brief_about_company TEXT NULL',
];

const migrations = [
  "ALTER TABLE subscriber MODIFY COLUMN name VARCHAR(300) NOT NULL DEFAULT ''",
  'ALTER TABLE subscriber ADD COLUMN notify_enabled BOOLEAN NOT NULL DEFAULT TRUE',
  'ALTER TABLE subscriber ADD UNIQUE INDEX uq_subscriber_email (email)',
  "ALTER TABLE news ADD COLUMN status ENUM('draft', 'published') NOT NULL DEFAULT 'published'",
  'ALTER TABLE news ADD COLUMN sort_order INT NOT NULL DEFAULT 0',
  'ALTER TABLE news ADD INDEX idx_news_status_order (status, sort_order, created_at DESC, id DESC)',
  'ALTER TABLE news ADD INDEX idx_news_order (sort_order, created_at DESC, id DESC)',
  "ALTER TABLE events ADD COLUMN status ENUM('draft', 'published') NOT NULL DEFAULT 'published'",
  "ALTER TABLE stories ADD COLUMN status ENUM('draft', 'published') NOT NULL DEFAULT 'published'",
  ...inquiryTables.flatMap((table) =>
    inquiryColumns.map((column) => `ALTER TABLE ${table} ADD COLUMN ${column}`),
  ),
];

for (const statement of migrations) {
  try {
    await connection.query(statement);
  } catch (err) {
    if (err.code !== 'ER_DUP_FIELDNAME' && err.code !== 'ER_DUP_KEYNAME') {
      throw err;
    }
  }
}

const faqSeedMigration = 'seed-dynamic-faqs-v1';
const [appliedFaqSeed] = await connection.query(
  'SELECT migration_key FROM schema_migrations WHERE migration_key = ? LIMIT 1',
  [faqSeedMigration],
);

if (appliedFaqSeed.length === 0) {
  const faqSeed = JSON.parse(
    await readFile(path.join(__dirname, '../data/faqs.json'), 'utf8'),
  );

  await connection.beginTransaction();
  try {
    for (const faq of faqSeed) {
      await connection.execute(
        'INSERT INTO faqs (page, question, answer, sort_order) VALUES (?, ?, ?, ?)',
        [faq.page, faq.question, faq.answer, faq.order],
      );
    }
    await connection.execute(
      'INSERT INTO schema_migrations (migration_key) VALUES (?)',
      [faqSeedMigration],
    );
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}

const portfolioMigration = 'seed-innovation-portfolio-v1';
const [portfolioApplied] = await connection.execute(
  'SELECT migration_key FROM schema_migrations WHERE migration_key = ?', [portfolioMigration],
);
if (portfolioApplied.length === 0) {
  const portfolio = JSON.parse(await readFile(path.join(__dirname, '../data/innovation-portfolio.json'), 'utf8'));
  await connection.beginTransaction();
  try {
    for (const [order, sector] of portfolio.sectors.entries()) {
      await connection.execute(
        'INSERT INTO innovation_sectors (slug, title, description, icon_key, hero_image, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        [sector.slug, sector.title, sector.description, sector.iconKey, sector.heroImage, order],
      );
    }
    for (const [order, project] of portfolio.projects.entries()) {
      await connection.execute(
        'INSERT INTO innovation_projects (id, title, type, description, image, status, highlight, category, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [project.id, project.title, project.type, project.description, project.image, project.status || '', project.highlight || '', project.category, order],
      );
      for (const slug of project.sectorSlugs) {
        await connection.execute('INSERT INTO innovation_project_sectors (project_id, sector_slug) VALUES (?, ?)', [project.id, slug]);
      }
    }
    await connection.execute('INSERT INTO schema_migrations (migration_key) VALUES (?)', [portfolioMigration]);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}

await seedIpPortfolio(connection);
console.log(`Schema applied to database "${DB_NAME}".`);
await connection.end();
