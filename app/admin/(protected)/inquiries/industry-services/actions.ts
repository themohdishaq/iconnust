'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';

export async function markReadAction(id: string) {
  await requireAdminSession();
  await IndustryServiceInquiry.update(id, { status: 'read' });
  revalidatePath('/admin/inquiries/industry-services');
}

export async function deleteInquiryAction(id: string) {
  await requireAdminSession();
  await IndustryServiceInquiry.remove(id);
  revalidatePath('/admin/inquiries/industry-services');
}
