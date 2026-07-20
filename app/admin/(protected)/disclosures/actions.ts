'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import InventionDisclosure from '@/lib/models/InventionDisclosure';

export type ApproveState = { error?: string };

export async function approveDisclosureAction(id: string, _prevState: ApproveState, formData: FormData): Promise<ApproveState> {
  await requireAdminSession();
  const displayStatus = String(formData.get('displayStatus') || '').trim();
  const trl = String(formData.get('trl') || '').trim();

  if (!displayStatus || !trl) {
    return { error: 'Please choose both a display status and a TRL before approving.' };
  }

  await InventionDisclosure.update(id, { status: 'approved', displayStatus, trl });

  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
  revalidatePath('/commercialization');
  redirect('/admin/disclosures');
}

export async function rejectDisclosureAction(id: string) {
  await requireAdminSession();
  await InventionDisclosure.update(id, { status: 'rejected' });
  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
}

export async function resetToPendingAction(id: string) {
  await requireAdminSession();
  await InventionDisclosure.update(id, { status: 'pending' });
  revalidatePath('/admin/disclosures');
  revalidatePath(`/admin/disclosures/${id}`);
  revalidatePath('/commercialization');
}

export async function deleteDisclosureAction(id: string) {
  await requireAdminSession();
  await InventionDisclosure.remove(id);
  revalidatePath('/admin/disclosures');
  revalidatePath('/commercialization');
}
