'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import InnovationInquiry from '@/lib/models/InnovationInquiry';

export async function markReadAction(id: string) {
  await requireAdminSession();
  await InnovationInquiry.update(id, { status: 'read' });
  revalidatePath('/admin/inquiries/innovation-collaboration');
}

export async function deleteInquiryAction(id: string) {
  await requireAdminSession();
  await InnovationInquiry.remove(id);
  revalidatePath('/admin/inquiries/innovation-collaboration');
}
