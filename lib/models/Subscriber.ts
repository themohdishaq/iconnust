import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface ISubscriber {
  id: number;
  name: string;
  email: string;
  notifyEnabled: boolean;
  createdAt: Date;
}

interface SubscriberRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  notify_enabled: number;
  created_at: Date;
}

function mapRow(row: SubscriberRow): ISubscriber {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    notifyEnabled: Boolean(row.notify_enabled),
    createdAt: row.created_at,
  };
}

async function list(): Promise<ISubscriber[]> {
  const rows = await query<SubscriberRow[]>('SELECT * FROM subscriber ORDER BY created_at DESC');
  return rows.map(mapRow);
}

async function listNotifiable(): Promise<ISubscriber[]> {
  const rows = await query<SubscriberRow[]>(
    'SELECT * FROM subscriber WHERE notify_enabled = TRUE ORDER BY created_at DESC'
  );
  return rows.map(mapRow);
}

/**
 * Subscribing again with the same email re-enables notifications instead of
 * erroring, so someone who previously disabled/unsubscribed can opt back in.
 */
async function create(data: { email: string; name?: string }): Promise<void> {
  await query(
    'INSERT INTO subscriber (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE notify_enabled = TRUE',
    [data.name?.trim() || '', data.email]
  );
}

async function setNotifyEnabled(id: string | number, enabled: boolean): Promise<void> {
  await query('UPDATE subscriber SET notify_enabled = ? WHERE id = ?', [enabled, id]);
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM subscriber WHERE id = ?', [id]);
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM subscriber');
  return Number(rows[0].c);
}

const Subscriber = { list, listNotifiable, create, setNotifyEnabled, remove, count };

export default Subscriber;
