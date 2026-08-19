import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type NewsStatus = 'draft' | 'published';

export interface INews {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  status: NewsStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface NewsRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  read_time: string;
  featured: number;
  status: NewsStatus;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: NewsRow): INews {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content ?? [],
    image: row.image,
    date: row.date,
    readTime: row.read_time,
    featured: Boolean(row.featured),
    status: row.status === 'draft' ? 'draft' : 'published',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewNews = Omit<INews, 'id' | 'createdAt' | 'updatedAt'>;

async function list(options?: { limit?: number; status?: 'draft' | 'published' | 'all' }): Promise<INews[]> {
  const status = options?.status ?? 'published';
  const limitClause = options?.limit ? ` LIMIT ${Number(options.limit)}` : '';
  const whereClause = status === 'all' ? '' : ' WHERE status = ?';
  const params = status === 'all' ? [] : [status];

  const sql = `SELECT * FROM news${whereClause} ORDER BY created_at DESC${limitClause}`;
  const rows = await query<NewsRow[]>(sql, params);
  return rows.map(mapRow);
}

async function search(q: string): Promise<INews[]> {
  const like = `%${q}%`;
  const rows = await query<NewsRow[]>(
    'SELECT * FROM news WHERE status = ? AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?) ORDER BY created_at DESC',
    ['published', like, like, like]
  );
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<INews | null> {
  const rows = await query<NewsRow[]>('SELECT * FROM news WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function findBySlug(slug: string): Promise<INews | null> {
  const rows = await query<NewsRow[]>('SELECT * FROM news WHERE slug = ? AND status = ? LIMIT 1', [slug, 'published']);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function slugExists(slug: string, excludeId?: string | number): Promise<boolean> {
  const rows = excludeId
    ? await query<RowDataPacket[]>('SELECT id FROM news WHERE slug = ? AND id != ? LIMIT 1', [slug, excludeId])
    : await query<RowDataPacket[]>('SELECT id FROM news WHERE slug = ? LIMIT 1', [slug]);
  return rows.length > 0;
}

async function listOthers(excludeId: string | number, limit: number): Promise<INews[]> {
  const rows = await query<NewsRow[]>(
    `SELECT * FROM news WHERE id != ? AND status = ? ORDER BY created_at DESC LIMIT ${Number(limit)}`,
    [excludeId, 'published']
  );
  return rows.map(mapRow);
}

async function create(data: NewNews): Promise<void> {
  await query(
    'INSERT INTO news (title, slug, category, excerpt, content, image, date, read_time, featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      data.title,
      data.slug,
      data.category,
      data.excerpt,
      JSON.stringify(data.content),
      data.image,
      data.date,
      data.readTime,
      data.featured,
      data.status,
    ]
  );
}

async function update(id: string | number, data: Partial<NewNews>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    title: 'title',
    slug: 'slug',
    category: 'category',
    excerpt: 'excerpt',
    image: 'image',
    date: 'date',
    readTime: 'read_time',
    featured: 'featured',
    status: 'status',
  };
  for (const [key, column] of Object.entries(columnMap)) {
    const value = (data as Record<string, unknown>)[key];
    if (value !== undefined) {
      fields.push(`${column} = ?`);
      values.push(value);
    }
  }
  if (data.content !== undefined) {
    fields.push('content = ?');
    values.push(JSON.stringify(data.content));
  }
  if (fields.length === 0) return true;
  values.push(id);
  const result = await query<ResultSetHeader>(`UPDATE news SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<INews | null> {
  const existing = await findById(id);
  await query('DELETE FROM news WHERE id = ?', [id]);
  return existing;
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM news');
  return Number(rows[0].c);
}

const News = { list, search, findById, findBySlug, slugExists, listOthers, create, update, remove, count };

export default News;
