'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import Partner from '@/lib/models/Partner';
import { saveUploadedImage, deleteUploadedImage } from '@/lib/uploads';

export type FormState = { error?: string };

function buildDoc(formData: FormData) {
  return {
    name: String(formData.get('name') || '').trim(),
    desc: String(formData.get('desc') || '').trim(),
    order: Number(formData.get('order') || 0),
  };
}

export async function createPartnerAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const logoFile = formData.get('logo') as File | null;

  if (!doc.name) {
    return { error: 'Please enter the partner name.' };
  }

  const logo = logoFile && logoFile.size > 0 ? await saveUploadedImage(logoFile, 'partners') : null;
  await Partner.create({ ...doc, logo });

  revalidatePath('/admin/partners');
  revalidatePath('/');
  redirect('/admin/partners');
}

export async function updatePartnerAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const logoFile = formData.get('logo') as File | null;

  if (!doc.name) {
    return { error: 'Please enter the partner name.' };
  }

  const existing = await Partner.findById(id);
  if (!existing) {
    return { error: 'Partner not found.' };
  }

  const update: Partial<typeof doc & { logo: string | null }> = { ...doc };

  if (logoFile && logoFile.size > 0) {
    update.logo = await saveUploadedImage(logoFile, 'partners');
    await deleteUploadedImage(existing.logo);
  }

  await Partner.update(id, update);

  revalidatePath('/admin/partners');
  revalidatePath('/');
  redirect('/admin/partners');
}

export async function deletePartnerAction(id: string) {
  await requireAdminSession();
  const existing = await Partner.remove(id);
  if (existing) {
    await deleteUploadedImage(existing.logo);
  }
  revalidatePath('/admin/partners');
  revalidatePath('/');
}
