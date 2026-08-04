import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type StatTilePage = 'home' | 'innovation';

export interface IStatTile {
  id: number;
  page: StatTilePage;
  label: string;
  value: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StatTileRow extends RowDataPacket {
  id: number;
  page: StatTilePage;
  label: string;
  value: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: StatTileRow): IStatTile {
  return {
    id: row.id,
    page: row.page,
    label: row.label,
    value: row.value,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewStatTile = Omit<IStatTile, 'id' | 'createdAt' | 'updatedAt'>;

async function list(page: StatTilePage): Promise<IStatTile[]> {
  const rows = await query<StatTileRow[]>(
    'SELECT * FROM stat_tiles WHERE page = ? ORDER BY sort_order ASC, id ASC',
    [page]
  );
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IStatTile | null> {
  const rows = await query<StatTileRow[]>('SELECT * FROM stat_tiles WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewStatTile): Promise<void> {
  await query('INSERT INTO stat_tiles (page, label, value, sort_order) VALUES (?, ?, ?, ?)', [
    data.page,
    data.label,
    data.value,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewStatTile>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    label: 'label',
    value: 'value',
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
  const result = await query<ResultSetHeader>(`UPDATE stat_tiles SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM stat_tiles WHERE id = ?', [id]);
}

const StatTile = { list, findById, create, update, remove };

export default StatTile;
