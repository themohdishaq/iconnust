import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IStory {
  id: number;
  name: string;
  tag: string;
  desc: string;
  founder: string;
  funding: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StoryRow extends RowDataPacket {
  id: number;
  name: string;
  tag: string;
  description: string;
  founder: string;
  funding: string;
  image: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: StoryRow): IStory {
  return {
    id: row.id,
    name: row.name,
    tag: row.tag,
    desc: row.description,
    founder: row.founder,
    funding: row.funding,
    image: row.image,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewStory = Omit<IStory, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<IStory[]> {
  const rows = await query<StoryRow[]>('SELECT * FROM stories ORDER BY sort_order ASC, created_at DESC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IStory | null> {
  const rows = await query<StoryRow[]>('SELECT * FROM stories WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewStory): Promise<void> {
  await query('INSERT INTO stories (name, tag, description, founder, funding, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    data.name,
    data.tag,
    data.desc,
    data.founder,
    data.funding,
    data.image,
    data.order,
  ]);
}

async function update(id: string | number, data: Partial<NewStory>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    name: 'name',
    tag: 'tag',
    desc: 'description',
    founder: 'founder',
    funding: 'funding',
    image: 'image',
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
  const result = await query<ResultSetHeader>(`UPDATE stories SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<IStory | null> {
  const existing = await findById(id);
  await query('DELETE FROM stories WHERE id = ?', [id]);
  return existing;
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM stories');
  return Number(rows[0].c);
}

const Story = { list, findById, create, update, remove, count };

export default Story;
