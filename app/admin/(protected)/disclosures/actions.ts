'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import InventionDisclosure from '@/lib/models/InventionDisclosure';

export type ApproveState = { error?: string };

export async function approveDisclosureAction(id: string, _prevState: ApproveState, formData: FormData): Promise<ApproveState> {
  const displayStatus = String(formData.get('displayStatus') || '').trim();
  const trl = String(formData.get('trl') || '').trim();

  if (!displayStatus || !trl) {
    return { error: 'Please choose both a display status and a TRL before approving.' };
  }

  await connectDB();
  await InventionDisclosure.findByIdAndUpdate(id, { status: 'approved', displayStatus, trl });

  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
  revalidatePath('/commercialization');
  redirect('/admin/disclosures');
}

export async function rejectDisclosureAction(id: string) {
  await connectDB();
  await InventionDisclosure.findByIdAndUpdate(id, { status: 'rejected' });
  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
}

export async function resetToPendingAction(id: string) {
  await connectDB();
  await InventionDisclosure.findByIdAndUpdate(id, { status: 'pending' });
  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
  revalidatePath('/commercialization');
}

export async function deleteDisclosureAction(id: string) {
  await connectDB();
  await InventionDisclosure.findByIdAndDelete(id);
  revalidatePath('/admin/disclosures');
  revalidatePath('/commercialization');
}
