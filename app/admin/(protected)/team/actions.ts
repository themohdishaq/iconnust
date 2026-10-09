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

function validateDoc(doc: ReturnType<typeof buildDoc>) {
  if (!doc.name || !doc.title || !doc.dept) return 'Please fill in all required fields.';
  if ([doc.name, doc.title, doc.dept, doc.email].some(value => value.length > 200)) return 'Name, title, department and email must be 200 characters or fewer.';
  if (doc.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(doc.email)) return 'Please enter a valid email address or leave it blank.';
  if (!Number.isInteger(doc.order) || doc.order < -2147483648 || doc.order > 2147483647) return 'Display order must be a valid whole number.';
}

export async function createTeamMemberAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  const validationError = validateDoc(doc);
  if (validationError) return { error: validationError };
  if (!imageFile || imageFile.size === 0) {
    return { error: 'Please choose a photo.' };
  }

  let image: string;
  try {
    image = await saveUploadedImage(imageFile, 'team');
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to upload the photo.' };
  }
  try { await TeamMember.create({ ...doc, image }); }
  catch (error) {
    await deleteUploadedImage(image);
    console.error('Unable to create team member:', error);
    return { error: 'Unable to save the team member. Please try again.' };
  }

  revalidatePath('/admin/team');
  revalidatePath('/team');
  redirect('/admin/team');
}

export async function updateTeamMemberAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  const validationError = validateDoc(doc);
  if (validationError) return { error: validationError };

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

  try {
    const saved = await TeamMember.update(id, update);
    if (!saved) {
      if (update.image) await deleteUploadedImage(update.image);
      return { error: 'Team member could not be updated. Refresh the page and try again.' };
    }
  } catch (error) {
    if (update.image) await deleteUploadedImage(update.image);
    console.error('Unable to update team member:', error);
    return { error: 'Unable to save the team member. Please try again.' };
  }
  if (update.image) await deleteUploadedImage(existing.image);

  revalidatePath('/admin/team');
  revalidatePath('/admin/team/[id]/edit', 'page');
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
