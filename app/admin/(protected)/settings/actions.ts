'use server';

import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import Admin from '@/lib/models/Admin';
import { getSession } from '@/lib/auth';

export type FormState = { error?: string; success?: string };

export async function updateCredentialsAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) return { error: 'Not signed in.' };

  const currentPassword = String(formData.get('currentPassword') || '');
  const newEmail = String(formData.get('email') || '').trim().toLowerCase();
  const newPassword = String(formData.get('newPassword') || '');

  if (!currentPassword || !newEmail) {
    return { error: 'Current password and email are required.' };
  }

  await connectDB();
  const admin = await Admin.findById(session.userId);
  if (!admin) return { error: 'Account not found.' };

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) return { error: 'Current password is incorrect.' };

  admin.email = newEmail;
  if (newPassword) {
    if (newPassword.length < 8) {
      return { error: 'New password must be at least 8 characters.' };
    }
    admin.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  await admin.save();

  return { success: 'Credentials updated. Use the new email/password next time you sign in.' };
}
