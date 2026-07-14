'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import InnovationInquiry from '@/lib/models/InnovationInquiry';

export async function markReadAction(id: string) {
  await connectDB();
  await InnovationInquiry.findByIdAndUpdate(id, { status: 'read' });
  revalidatePath('/admin/inquiries/innovation-collaboration');
}

export async function deleteInquiryAction(id: string) {
  await connectDB();
  await InnovationInquiry.findByIdAndDelete(id);
  revalidatePath('/admin/inquiries/innovation-collaboration');
}
