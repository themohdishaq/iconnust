'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import Story from '@/lib/models/Story';
import { saveUploadedImage, deleteUploadedImage } from '@/lib/uploads';

export type FormState = { error?: string };

function buildDoc(formData: FormData) {
  return {
    name: String(formData.get('name') || '').trim(),
    tag: String(formData.get('tag') || '').trim(),
    desc: String(formData.get('desc') || '').trim(),
    founder: String(formData.get('founder') || '').trim(),
    funding: String(formData.get('funding') || '').trim(),
    order: Number(formData.get('order') || 0),
  };
}

export async function createStoryAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.tag || !doc.desc || !doc.founder || !doc.funding) {
    return { error: 'Please fill in all required fields.' };
  }
  if (!imageFile || imageFile.size === 0) {
    return { error: 'Please choose an image.' };
  }

  const image = await saveUploadedImage(imageFile, 'stories');
  await Story.create({ ...doc, image });

  revalidatePath('/admin/stories');
  revalidatePath('/news');
  redirect('/admin/stories');
}

export async function updateStoryAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.tag || !doc.desc || !doc.founder || !doc.funding) {
    return { error: 'Please fill in all required fields.' };
  }

  const existing = await Story.findById(id);
  if (!existing) {
    return { error: 'Success story not found.' };
  }

  const update: Partial<typeof doc & { image: string }> = { ...doc };

  if (imageFile && imageFile.size > 0) {
    update.image = await saveUploadedImage(imageFile, 'stories');
    await deleteUploadedImage(existing.image);
  }

  await Story.update(id, update);

  revalidatePath('/admin/stories');
  revalidatePath('/news');
  redirect('/admin/stories');
}

export async function deleteStoryAction(id: string) {
  await requireAdminSession();
  const existing = await Story.remove(id);
  if (existing) {
    await deleteUploadedImage(existing.image);
  }
  revalidatePath('/admin/stories');
  revalidatePath('/news');
}
