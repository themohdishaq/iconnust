import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface IInquiry {
  id: number;
  organization: string;
  email: string;
  domain: string;
  message: string;
  status: 'new' | 'read';
  createdAt: Date;
  updatedAt: Date;
}

interface InquiryRow extends RowDataPacket {
  id: number;
  organization: string;
  email: string;
  domain: string;
  message: string | null;
  status: 'new' | 'read';
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: InquiryRow): IInquiry {
  return {
    id: row.id,
    organization: row.organization,
    email: row.email,
    domain: row.domain,
    message: row.message ?? '',
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewInquiry = { organization: string; email: string; domain: string; message: string };

/**
 * Each inquiry form (Home / Industry Services / Innovation & Collaboration)
 * gets its own dedicated MySQL table rather than a shared, source-tagged one.
 */
export function getInquiryModel(tableName: string) {
  async function create(data: NewInquiry): Promise<void> {
    await query(`INSERT INTO ${tableName} (organization, email, domain, message) VALUES (?, ?, ?, ?)`, [
      data.organization,
      data.email,
      data.domain,
      data.message,
    ]);
  }

  async function list(): Promise<IInquiry[]> {
    const rows = await query<InquiryRow[]>(`SELECT * FROM ${tableName} ORDER BY status ASC, created_at DESC`);
    return rows.map(mapRow);
  }

  async function update(id: string | number, data: Partial<{ status: 'new' | 'read' }>): Promise<void> {
    if (data.status === undefined) return;
    await query(`UPDATE ${tableName} SET status = ? WHERE id = ?`, [data.status, id]);
  }

  async function remove(id: string | number): Promise<void> {
    await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
  }

  async function count(): Promise<number> {
    const rows = await query<RowDataPacket[]>(`SELECT COUNT(*) AS c FROM ${tableName}`);
    return Number(rows[0].c);
  }

  async function countUnread(): Promise<number> {
    const rows = await query<RowDataPacket[]>(`SELECT COUNT(*) AS c FROM ${tableName} WHERE status = 'new'`);
    return Number(rows[0].c);
  }

  return { create, list, update, remove, count, countUnread };
}

export type InquiryModel = ReturnType<typeof getInquiryModel>;
