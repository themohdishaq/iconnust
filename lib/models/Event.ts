import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IEvent {
  id: number;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  location: string;
  desc: string;
  registered: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EventRow extends RowDataPacket {
  id: number;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  location: string;
  description: string;
  registered: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: EventRow): IEvent {
  return {
    id: row.id,
    day: row.day,
    month: row.month,
    year: row.year,
    title: row.title,
    type: row.type,
    location: row.location,
    desc: row.description,
    registered: row.registered,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewEvent = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<IEvent[]> {
  const rows = await query<EventRow[]>('SELECT * FROM events ORDER BY sort_order ASC, created_at DESC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IEvent | null> {
  const rows = await query<EventRow[]>('SELECT * FROM events WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewEvent): Promise<void> {
  await query(
    'INSERT INTO events (day, month, year, title, type, location, description, registered, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [data.day, data.month, data.year, data.title, data.type, data.location, data.desc, data.registered, data.order]
  );
}

async function update(id: string | number, data: Partial<NewEvent>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    day: 'day',
    month: 'month',
    year: 'year',
    title: 'title',
    type: 'type',
    location: 'location',
    desc: 'description',
    registered: 'registered',
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
  const result = await query<ResultSetHeader>(`UPDATE events SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM events WHERE id = ?', [id]);
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM events');
  return Number(rows[0].c);
}

const Event = { list, findById, create, update, remove, count };

export default Event;
