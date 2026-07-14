'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import HomeInquiry from '@/lib/models/HomeInquiry';

export async function markReadAction(id: string) {
  await connectDB();
  await HomeInquiry.findByIdAndUpdate(id, { status: 'read' });
  revalidatePath('/admin/inquiries/home');
}

export async function deleteInquiryAction(id: string) {
  await connectDB();
  await HomeInquiry.findByIdAndDelete(id);
  revalidatePath('/admin/inquiries/home');
}
