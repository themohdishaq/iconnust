import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IIpBreakdown {
  id: number;
  name: string;
  value: number;
  color: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IpBreakdownRow extends RowDataPacket {
  id: number;
  name: string;
  value: number;
  color: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: IpBreakdownRow): IIpBreakdown {
  return {
    id: row.id,
    name: row.name,
    value: row.value,
    color: row.color,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewIpBreakdown = Omit<IIpBreakdown, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<IIpBreakdown[]> {
  const rows = await query<IpBreakdownRow[]>('SELECT * FROM ip_breakdown ORDER BY sort_order ASC, id ASC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IIpBreakdown | null> {
  const rows = await query<IpBreakdownRow[]>('SELECT * FROM ip_breakdown WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewIpBreakdown): Promise<void> {
  await query('INSERT INTO ip_breakdown (name, value, color, sort_order) VALUES (?, ?, ?, ?)', [
    data.name,
    data.value,
    data.color,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewIpBreakdown>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    name: 'name',
    value: 'value',
    color: 'color',
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
  const result = await query<ResultSetHeader>(`UPDATE ip_breakdown SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM ip_breakdown WHERE id = ?', [id]);
}

const IpBreakdown = { list, findById, create, update, remove };

export default IpBreakdown;
