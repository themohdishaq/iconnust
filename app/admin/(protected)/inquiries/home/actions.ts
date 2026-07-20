'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import HomeInquiry from '@/lib/models/HomeInquiry';

export async function markReadAction(id: string) {
  await requireAdminSession();
  await HomeInquiry.update(id, { status: 'read' });
  revalidatePath('/admin/inquiries/home');
}

export async function deleteInquiryAction(id: string) {
  await requireAdminSession();
  await HomeInquiry.remove(id);
  revalidatePath('/admin/inquiries/home');
}
