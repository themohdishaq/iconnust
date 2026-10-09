import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

// One-time import: reruns preserve admin edits and deletions.
export async function seedIpPortfolio(connection) {
  const migration = 'seed-ip-portfolio-v1';
  const [lock] = await connection.execute('SELECT GET_LOCK(?, 10) AS acquired', ['icon-seed-ip-portfolio']);
  if (Number(lock[0].acquired) !== 1) throw new Error('Could not acquire the IP portfolio import lock.');
  try {
    await connection.beginTransaction();
    const [applied] = await connection.execute('SELECT migration_key FROM schema_migrations WHERE migration_key = ?', [migration]);
    if (applied.length) { await connection.commit(); return 0; }
    const [[existing]] = await connection.execute('SELECT COUNT(*) AS total FROM ip_portfolio_records');
    if (Number(existing.total) > 0) throw new Error('IP portfolio contains records without an import marker. Review the existing data before importing the JSON to avoid duplicates.');
    const data = JSON.parse(await readFile(new URL('../data/nipo_top20_ip_records.json', import.meta.url), 'utf8'));
    const records = Object.values(data).flat();
    for (const record of records) {
      await connection.execute('INSERT INTO ip_portfolio_records (id, ip_title, ip_type, sector, description, application_no, award_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
        randomUUID(), record.ip_title, record.ip_type, record.sector?.trim() || 'Unknown',
        record.description || '', record.application_no || null, record.award_date || null, 'published',
      ]);
    }
    await connection.execute('INSERT INTO schema_migrations (migration_key) VALUES (?)', [migration]);
    await connection.commit();
    return records.length;
  } catch (error) { await connection.rollback(); throw error; }
  finally { await connection.execute('SELECT RELEASE_LOCK(?)', ['icon-seed-ip-portfolio']); }
}
