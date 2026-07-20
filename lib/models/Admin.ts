import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface IAdmin {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  otpCodeHash: string | null;
  otpExpiresAt: Date | null;
  otpAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AdminRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  otp_code_hash: string | null;
  otp_expires_at: Date | null;
  otp_attempts: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: AdminRow): IAdmin {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    otpCodeHash: row.otp_code_hash,
    otpExpiresAt: row.otp_expires_at,
    otpAttempts: row.otp_attempts,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function findByEmail(email: string): Promise<IAdmin | null> {
  const rows = await query<AdminRow[]>('SELECT * FROM admins WHERE email = ? LIMIT 1', [email]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function findById(id: string | number): Promise<IAdmin | null> {
  const rows = await query<AdminRow[]>('SELECT * FROM admins WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function updateOtp(
  id: string | number,
  data: { otpCodeHash: string; otpExpiresAt: Date; otpAttempts: number }
): Promise<void> {
  await query('UPDATE admins SET otp_code_hash = ?, otp_expires_at = ?, otp_attempts = ? WHERE id = ?', [
    data.otpCodeHash,
    data.otpExpiresAt,
    data.otpAttempts,
    id,
  ]);
}

async function incrementOtpAttempts(id: string | number): Promise<void> {
  await query('UPDATE admins SET otp_attempts = otp_attempts + 1 WHERE id = ?', [id]);
}

async function clearOtp(id: string | number): Promise<void> {
  await query('UPDATE admins SET otp_code_hash = NULL, otp_expires_at = NULL, otp_attempts = 0 WHERE id = ?', [id]);
}

async function updateCredentials(
  id: string | number,
  data: { email: string; passwordHash?: string }
): Promise<void> {
  if (data.passwordHash) {
    await query('UPDATE admins SET email = ?, password_hash = ? WHERE id = ?', [data.email, data.passwordHash, id]);
  } else {
    await query('UPDATE admins SET email = ? WHERE id = ?', [data.email, id]);
  }
}

const Admin = { findByEmail, findById, updateOtp, incrementOtpAttempts, clearOtp, updateCredentials };

export default Admin;
