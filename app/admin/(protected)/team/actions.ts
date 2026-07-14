'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
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
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.title || !doc.dept || !doc.bio || !doc.email) {
    return { error: 'Please fill in all required fields.' };
  }
  if (!imageFile || imageFile.size === 0) {
    return { error: 'Please choose a photo.' };
  }

  await connectDB();
  const image = await saveUploadedImage(imageFile, 'team');
  await TeamMember.create({ ...doc, image });

  revalidatePath('/admin/team');
  revalidatePath('/team');
  redirect('/admin/team');
}

export async function updateTeamMemberAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  const doc = buildDoc(formData);
  const imageFile = formData.get('image') as File | null;

  if (!doc.name || !doc.title || !doc.dept || !doc.bio || !doc.email) {
    return { error: 'Please fill in all required fields.' };
  }

  await connectDB();
  const existing = await TeamMember.findById(id);
  if (!existing) {
    return { error: 'Team member not found.' };
  }

  const update: Partial<typeof doc & { image: string }> = { ...doc };

  if (imageFile && imageFile.size > 0) {
    update.image = await saveUploadedImage(imageFile, 'team');
    await deleteUploadedImage(existing.image);
  }

  await TeamMember.findByIdAndUpdate(id, update);

  revalidatePath('/admin/team');
  revalidatePath('/team');
  redirect('/admin/team');
}

export async function deleteTeamMemberAction(id: string) {
  await connectDB();
  const existing = await TeamMember.findByIdAndDelete(id);
  if (existing) {
    await deleteUploadedImage(existing.image);
  }
  revalidatePath('/admin/team');
  revalidatePath('/team');
}
