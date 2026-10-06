'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import TeamMember from '@/lib/models/TeamMember';
import { saveUploadedImage, deleteUploadedImage } from '@/lib/uploads';

export type FormState = { error?: string };

function buildDoc(formData: FormData) {
  const focusRaw = String(formData.get('focus') || '');
  return {
    name: String(formData.get('name') || '').trim(),
    title: String(formData.get('title') || '').trim(),
    dept: String(formData.get('dept') || '').trim(),
    bio: String(formData.get('bio') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    focus: focusRaw.split(',').map((f) => f.trim()).filter(Boolean),
    order: Number(formData.get('order') || 0),
  };
}

export async function createTeamMemberAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.title || !doc.dept) {
    return { error: 'Please fill in all required fields.' };
  }
  if (!imageFile || imageFile.size === 0) {
    return { error: 'Please choose a photo.' };
  }

  let image: string;
  try {
    image = await saveUploadedImage(imageFile, 'team');
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to upload the photo.' };
  }
  await TeamMember.create({ ...doc, image });

  revalidatePath('/admin/team');
  revalidatePath('/team');
  redirect('/admin/team');
}

export async function updateTeamMemberAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.title || !doc.dept) {
    return { error: 'Please fill in all required fields.' };
  }

  const existing = await TeamMember.findById(id);
  if (!existing) {
    return { error: 'Team member not found.' };
  }

  const update: Partial<typeof doc & { image: string }> = { ...doc };

  if (imageFile && imageFile.size > 0) {
    try {
      update.image = await saveUploadedImage(imageFile, 'team');
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unable to upload the photo.' };
    }
  }

  await TeamMember.update(id, update);
  if (update.image) await deleteUploadedImage(existing.image);

  revalidatePath('/admin/team');
  revalidatePath('/team');
  redirect('/admin/team');
}

export async function deleteTeamMemberAction(id: string) {
  await requireAdminSession();
  const existing = await TeamMember.remove(id);
  if (existing) {
    await deleteUploadedImage(existing.image);
  }
  revalidatePath('/admin/team');
  revalidatePath('/team');
}
