import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ITeamMember {
  id: number;
  name: string;
  title: string;
  dept: string;
  bio: string;
  focus: string[];
  image: string;
  email: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMemberRow extends RowDataPacket {
  id: number;
  name: string;
  title: string;
  dept: string;
  bio: string;
  focus: string[];
  image: string;
  email: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: TeamMemberRow): ITeamMember {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    dept: row.dept,
    bio: row.bio,
    focus: row.focus ?? [],
    image: row.image,
    email: row.email,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewTeamMember = Omit<ITeamMember, 'id' | 'createdAt' | 'updatedAt'>;

async function list(): Promise<ITeamMember[]> {
  const rows = await query<TeamMemberRow[]>('SELECT * FROM team_members ORDER BY sort_order ASC, created_at DESC');
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<ITeamMember | null> {
  const rows = await query<TeamMemberRow[]>('SELECT * FROM team_members WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewTeamMember): Promise<void> {
  await query(
    'INSERT INTO team_members (name, title, dept, bio, focus, image, email, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [data.name, data.title, data.dept, data.bio, JSON.stringify(data.focus), data.image, data.email, data.order]
  );
}

async function update(id: string | number, data: Partial<NewTeamMember>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    name: 'name',
    title: 'title',
    dept: 'dept',
    bio: 'bio',
    image: 'image',
    email: 'email',
    order: 'sort_order',
  };
  for (const [key, column] of Object.entries(columnMap)) {
    const value = (data as Record<string, unknown>)[key];
    if (value !== undefined) {
      fields.push(`${column} = ?`);
      values.push(value);
    }
  }
  if (data.focus !== undefined) {
    fields.push('focus = ?');
    values.push(JSON.stringify(data.focus));
  }
  if (fields.length === 0) return true;
  values.push(id);
  const result = await query<ResultSetHeader>(`UPDATE team_members SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<ITeamMember | null> {
  const existing = await findById(id);
  await query('DELETE FROM team_members WHERE id = ?', [id]);
  return existing;
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM team_members');
  return Number(rows[0].c);
}

const TeamMember = { list, findById, create, update, remove, count };

export default TeamMember;
