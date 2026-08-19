import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ITechPlaceStat {
  id: number;
  title: string;
  value: number;
  subtitle: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TechPlaceStatRow extends RowDataPacket {
  id: number;
  title: string;
  value: number;
  subtitle: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: TechPlaceStatRow): ITechPlaceStat {
  return {
    id: row.id,
    title: row.title,
    value: Number(row.value),
    subtitle: row.subtitle,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewTechPlaceStat = Omit<ITechPlaceStat, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<ITechPlaceStat[]> {
  try {
    const rows = await query<TechPlaceStatRow[]>(
      'SELECT * FROM tech_place_stats ORDER BY sort_order ASC, id ASC',
    );
    return rows.map(mapRow);
  } catch (error) {
    if ((error as { code?: string })?.code === 'ER_NO_SUCH_TABLE') {
      return [];
    }
    throw error;
  }
}

async function findById(id: string | number): Promise<ITechPlaceStat | null> {
  const rows = await query<TechPlaceStatRow[]>('SELECT * FROM tech_place_stats WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewTechPlaceStat): Promise<void> {
  await query('INSERT INTO tech_place_stats (title, value, subtitle, sort_order) VALUES (?, ?, ?, ?)', [
    data.title,
    data.value,
    data.subtitle,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewTechPlaceStat>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    title: 'title',
    value: 'value',
    subtitle: 'subtitle',
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
  const result = await query<ResultSetHeader>(
    `UPDATE tech_place_stats SET ${fields.join(', ')} WHERE id = ?`,
    values,
  );
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM tech_place_stats WHERE id = ?', [id]);
}

const TechPlaceStat = { list, findById, create, update, remove };

export default TechPlaceStat;
