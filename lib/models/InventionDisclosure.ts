import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type DisclosureStatus = 'pending' | 'approved' | 'rejected';
export type DisclosureSource = 'idf-modal' | 'quick-form';

export interface IInventionDisclosure {
  id: number;
  source: DisclosureSource;
  inventionTitle: string;
  domain: string;
  inventorNames: string;
  department: string;
  studentOrEmployeeId: string;
  contactEmail: string;
  contactPhone: string;
  conceptionDate: string;
  description: string;
  novelty: string;
  applications: string;
  fundingSource: string;
  priorDisclosure: 'yes' | 'no';
  priorDisclosureDetails: string;
  status: DisclosureStatus;
  displayStatus: string;
  trl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DisclosureRow extends RowDataPacket {
  id: number;
  source: DisclosureSource;
  invention_title: string;
  domain: string;
  inventor_names: string;
  department: string;
  student_or_employee_id: string;
  contact_email: string;
  contact_phone: string;
  conception_date: string;
  description: string;
  novelty: string | null;
  applications: string | null;
  funding_source: string;
  prior_disclosure: 'yes' | 'no';
  prior_disclosure_details: string | null;
  status: DisclosureStatus;
  display_status: string;
  trl: string;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: DisclosureRow): IInventionDisclosure {
  return {
    id: row.id,
    source: row.source,
    inventionTitle: row.invention_title,
    domain: row.domain,
    inventorNames: row.inventor_names,
    department: row.department,
    studentOrEmployeeId: row.student_or_employee_id,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    conceptionDate: row.conception_date,
    description: row.description,
    novelty: row.novelty ?? '',
    applications: row.applications ?? '',
    fundingSource: row.funding_source,
    priorDisclosure: row.prior_disclosure,
    priorDisclosureDetails: row.prior_disclosure_details ?? '',
    status: row.status,
    displayStatus: row.display_status,
    trl: row.trl,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewDisclosure = Omit<IInventionDisclosure, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'displayStatus' | 'trl'>;

async function create(data: NewDisclosure): Promise<void> {
  await query(
    `INSERT INTO invention_disclosures
      (source, invention_title, domain, inventor_names, department, student_or_employee_id,
       contact_email, contact_phone, conception_date, description, novelty, applications,
       funding_source, prior_disclosure, prior_disclosure_details)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.source,
      data.inventionTitle,
      data.domain,
      data.inventorNames,
      data.department,
      data.studentOrEmployeeId,
      data.contactEmail,
      data.contactPhone,
      data.conceptionDate,
      data.description,
      data.novelty,
      data.applications,
      data.fundingSource,
      data.priorDisclosure,
      data.priorDisclosureDetails,
    ]
  );
}

async function findById(id: string | number): Promise<IInventionDisclosure | null> {
  const rows = await query<DisclosureRow[]>('SELECT * FROM invention_disclosures WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function listAll(): Promise<IInventionDisclosure[]> {
  const rows = await query<DisclosureRow[]>('SELECT * FROM invention_disclosures ORDER BY status ASC, created_at DESC');
  return rows.map(mapRow);
}

async function listApproved(): Promise<IInventionDisclosure[]> {
  const rows = await query<DisclosureRow[]>(
    "SELECT * FROM invention_disclosures WHERE status = 'approved' ORDER BY updated_at DESC"
  );
  return rows.map(mapRow);
}

async function update(
  id: string | number,
  data: Partial<{ status: DisclosureStatus; displayStatus: string; trl: string }>
): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  if (data.status !== undefined) {
    fields.push('status = ?');
    values.push(data.status);
  }
  if (data.displayStatus !== undefined) {
    fields.push('display_status = ?');
    values.push(data.displayStatus);
  }
  if (data.trl !== undefined) {
    fields.push('trl = ?');
    values.push(data.trl);
  }
  if (fields.length === 0) return true;
  values.push(id);
  const result = await query<ResultSetHeader>(`UPDATE invention_disclosures SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM invention_disclosures WHERE id = ?', [id]);
}

async function count(): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM invention_disclosures');
  return Number(rows[0].c);
}

async function countByStatus(status: DisclosureStatus): Promise<number> {
  const rows = await query<RowDataPacket[]>('SELECT COUNT(*) AS c FROM invention_disclosures WHERE status = ?', [status]);
  return Number(rows[0].c);
}

const InventionDisclosure = { create, findById, listAll, listApproved, update, remove, count, countByStatus };

export default InventionDisclosure;
