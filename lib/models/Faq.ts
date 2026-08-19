import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export const FAQ_PAGES = [
  'innovation-collaboration',
  'industry-services',
  'commercialization',
] as const;

export type FaqPage = (typeof FAQ_PAGES)[number];

export interface IFaq {
  id: number;
  page: FaqPage;
  question: string;
  answer: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FaqRow extends RowDataPacket {
  id: number;
  page: FaqPage;
  question: string;
  answer: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: FaqRow): IFaq {
  return {
    id: row.id,
    page: row.page,
    question: row.question,
    answer: row.answer,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function isFaqPage(value: unknown): value is FaqPage {
  return typeof value === 'string' && FAQ_PAGES.includes(value as FaqPage);
}

async function list(page?: FaqPage): Promise<IFaq[]> {
  const rows = page
    ? await query<FaqRow[]>(
        'SELECT * FROM faqs WHERE page = ? ORDER BY sort_order ASC, created_at ASC',
        [page],
      )
    : await query<FaqRow[]>('SELECT * FROM faqs ORDER BY page ASC, sort_order ASC, created_at ASC');
  return rows.map(mapRow);
}

async function create(data: Pick<IFaq, 'page' | 'question' | 'answer' | 'order'>): Promise<number> {
  const result = await query<ResultSetHeader>(
    'INSERT INTO faqs (page, question, answer, sort_order) VALUES (?, ?, ?, ?)',
    [data.page, data.question, data.answer, data.order],
  );
  return result.insertId;
}

async function findById(id: string | number): Promise<IFaq | null> {
  const rows = await query<FaqRow[]>('SELECT * FROM faqs WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function update(
  id: string | number,
  data: Pick<IFaq, 'page' | 'question' | 'answer' | 'order'>,
): Promise<boolean> {
  const result = await query<ResultSetHeader>(
    'UPDATE faqs SET page = ?, question = ?, answer = ?, sort_order = ? WHERE id = ?',
    [data.page, data.question, data.answer, data.order, id],
  );
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<boolean> {
  const result = await query<ResultSetHeader>('DELETE FROM faqs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM faqs');
  return Number(rows[0].c);
}

const Faq = { list, findById, create, update, remove, count };

export default Faq;
