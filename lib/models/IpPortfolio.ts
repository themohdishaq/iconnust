import { randomUUID } from 'node:crypto';
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { query } from '@/lib/db';
import { IpPortfolioError, type IpPortfolioInput, type ManagedIpRecord } from '@/lib/ipPortfolioValidation';

export async function listIpPortfolio(includeDrafts = false): Promise<ManagedIpRecord[]> {
  const rows = await query<RowDataPacket[]>(`SELECT id, ip_title, ip_type, sector, description, application_no,
    DATE_FORMAT(award_date, '%Y-%m-%d') AS award_date, status FROM ip_portfolio_records
    ${includeDrafts ? '' : "WHERE status = 'published'"} ORDER BY created_at DESC, id`);
  return rows.map((row) => ({
    id: row.id, ip_title: row.ip_title, ip_type: row.ip_type, sector: row.sector || 'Unknown',
    description: row.description, application_no: row.application_no, award_date: row.award_date, status: row.status,
  }));
}

export async function countIpPortfolio() {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS total FROM ip_portfolio_records');
  return Number(rows[0].total);
}

export async function saveIpRecord(data: IpPortfolioInput, existingId?: string) {
  const id = existingId ?? randomUUID();
  const params = [data.ip_title, data.ip_type, data.sector, data.description, data.application_no, data.award_date, data.status, id];
  if (existingId) {
    const rows = await query<RowDataPacket[]>('SELECT id FROM ip_portfolio_records WHERE id = ?', [id]);
    if (!rows.length) throw new IpPortfolioError('IP record not found.', 404);
  }
  await query(existingId
    ? 'UPDATE ip_portfolio_records SET ip_title=?, ip_type=?, sector=?, description=?, application_no=?, award_date=?, status=? WHERE id=?'
    : 'INSERT INTO ip_portfolio_records (ip_title, ip_type, sector, description, application_no, award_date, status, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params);
  return id;
}

export async function deleteIpRecord(id: string) {
  const result = await query<ResultSetHeader>('DELETE FROM ip_portfolio_records WHERE id = ?', [id]);
  if (!result.affectedRows) throw new IpPortfolioError('IP record not found.', 404);
}
