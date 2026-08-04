import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IFinancialStat {
  id: number;
  year: string;
  amount: number;
  isTotal: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FinancialStatRow extends RowDataPacket {
  id: number;
  year: string;
  amount: string;
  is_total: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: FinancialStatRow): IFinancialStat {
  return {
    id: row.id,
    year: row.year,
    amount: Number(row.amount),
    isTotal: Boolean(row.is_total),
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewFinancialStat = Omit<IFinancialStat, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<IFinancialStat[]> {
  const rows = await query<FinancialStatRow[]>('SELECT * FROM financial_stats ORDER BY sort_order ASC, id ASC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IFinancialStat | null> {
  const rows = await query<FinancialStatRow[]>('SELECT * FROM financial_stats WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewFinancialStat): Promise<void> {
  await query('INSERT INTO financial_stats (year, amount, is_total, sort_order) VALUES (?, ?, ?, ?)', [
    data.year,
    data.amount,
    data.isTotal,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewFinancialStat>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    year: 'year',
    amount: 'amount',
    isTotal: 'is_total',
    order: 'sort_order',
  };
  for (const [key, column] of Object.entries(columnMap)) {
    const value = (data as Record<string, unknown>)[key];
    if (value !== undefined) {
      fields.push(`${column} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return true;
  values.push(id);
  const result = await query<ResultSetHeader>(`UPDATE financial_stats SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM financial_stats WHERE id = ?', [id]);
}

const FinancialStat = { list, findById, create, update, remove };

export default FinancialStat;
