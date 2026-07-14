'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import IndustryServiceInquiry from '@/lib/models/IndustryServiceInquiry';

export async function markReadAction(id: string) {
  await connectDB();
  await IndustryServiceInquiry.findByIdAndUpdate(id, { status: 'read' });
  revalidatePath('/admin/inquiries/industry-services');
}

export async function deleteInquiryAction(id: string) {
  await connectDB();
  await IndustryServiceInquiry.findByIdAndDelete(id);
  revalidatePath('/admin/inquiries/industry-services');
}
