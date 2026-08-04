import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IPartner {
  id: number;
  name: string;
  desc: string;
  logo: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface PartnerRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: PartnerRow): IPartner {
  return {
    id: row.id,
    name: row.name,
    desc: row.description,
    logo: row.logo,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewPartner = Omit<IPartner, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<IPartner[]> {
  const rows = await query<PartnerRow[]>('SELECT * FROM partners ORDER BY sort_order ASC, created_at DESC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IPartner | null> {
  const rows = await query<PartnerRow[]>('SELECT * FROM partners WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewPartner): Promise<void> {
  await query('INSERT INTO partners (name, description, logo, sort_order) VALUES (?, ?, ?, ?)', [
    data.name,
    data.desc,
    data.logo,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewPartner>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    name: 'name',
    desc: 'description',
    logo: 'logo',
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
  const result = await query<ResultSetHeader>(`UPDATE partners SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<IPartner | null> {
  const existing = await findById(id);
  await query('DELETE FROM partners WHERE id = ?', [id]);
  return existing;
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM partners');
  return Number(rows[0].c);
}

const Partner = { list, findById, create, update, remove, count };

export default Partner;
