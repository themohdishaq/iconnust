'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Admin from '@/lib/models/Admin';
import {
  createSession,
  createOtpPendingSession,
  getOtpPendingAdminId,
  clearOtpPendingSession,
} from '@/lib/auth';
import { generateOtpCode, hashOtpCode, OTP_TTL_MS, MAX_OTP_ATTEMPTS } from '@/lib/otp';
import { sendMail, renderKeyValueEmail } from '@/lib/mailer';
import { isRateLimited } from '@/lib/rateLimit';

export type LoginState = { error?: string; step: 'credentials' | 'otp'; email?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { step: 'credentials', error: 'Email and password are required.' };
  }

  if (isRateLimited(`admin-login:${email}`)) {
    return { step: 'credentials', error: 'Too many attempts. Please try again later.' };
  }

  await connectDB();
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return { step: 'credentials', error: 'Invalid email or password.' };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return { step: 'credentials', error: 'Invalid email or password.' };
  }

  const code = generateOtpCode();
  admin.otpCodeHash = hashOtpCode(code);
  admin.otpExpiresAt = new Date(Date.now() + OTP_TTL_MS);
  admin.otpAttempts = 0;
  await admin.save();

  try {
    await sendMail({
      to: admin.email,
      subject: 'Your ICON-NUST Admin Sign-In Code',
      html: renderKeyValueEmail('Admin Sign-In Verification Code', [
        ['Code', code],
        ['Expires in', '5 minutes'],
      ]),
    });
  } catch (err) {
    console.error('Failed to send admin OTP email:', err);
    return { step: 'credentials', error: 'Could not send a verification code. Please try again.' };
  }

  await createOtpPendingSession(admin._id.toString());
  return { step: 'otp', email: admin.email };
}

export async function verifyOtpAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const code = String(formData.get('otp') || '').trim();

  const adminId = await getOtpPendingAdminId();
  if (!adminId) {
    return { step: 'credentials', error: 'Your sign-in session expired. Please sign in again.' };
  }

  if (!code) {
    return { step: 'otp', error: 'Enter the verification code.' };
  }

  await connectDB();
  const admin = await Admin.findById(adminId);
  if (!admin || !admin.otpCodeHash || !admin.otpExpiresAt) {
    await clearOtpPendingSession();
    return { step: 'credentials', error: 'Your sign-in session expired. Please sign in again.' };
  }

  if (admin.otpExpiresAt.getTime() < Date.now()) {
    admin.otpCodeHash = undefined;
    admin.otpExpiresAt = undefined;
    admin.otpAttempts = 0;
    await admin.save();
    await clearOtpPendingSession();
    return { step: 'credentials', error: 'Code expired. Please sign in again.' };
  }

  if (admin.otpAttempts >= MAX_OTP_ATTEMPTS) {
    admin.otpCodeHash = undefined;
    admin.otpExpiresAt = undefined;
    admin.otpAttempts = 0;
    await admin.save();
    await clearOtpPendingSession();
    return { step: 'credentials', error: 'Too many incorrect attempts. Please sign in again.' };
  }

  if (hashOtpCode(code) !== admin.otpCodeHash) {
    admin.otpAttempts += 1;
    await admin.save();
    return { step: 'otp', error: 'Incorrect code. Please try again.', email: admin.email };
  }

  admin.otpCodeHash = undefined;
  admin.otpExpiresAt = undefined;
  admin.otpAttempts = 0;
  await admin.save();
  await clearOtpPendingSession();

  await createSession(admin._id.toString(), admin.email, admin.role);
  redirect('/admin');
}
