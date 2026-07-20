'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import Event from '@/lib/models/Event';

export type FormState = { error?: string };

function buildDoc(formData: FormData) {
  const day = String(formData.get('day') || '').trim();
  const month = String(formData.get('month') || '').trim();
  const year = String(formData.get('year') || '').trim();
  const title = String(formData.get('title') || '').trim();
  const type = String(formData.get('type') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const desc = String(formData.get('desc') || '').trim();
  const registered = Number(formData.get('registered') || 0);
  const order = Number(formData.get('order') || 0);
  return { day, month, year, title, type, location, desc, registered, order };
}

export async function createEventAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  if (!doc.day || !doc.month || !doc.year || !doc.title || !doc.type || !doc.location || !doc.desc) {
    return { error: 'Please fill in all required fields.' };
  }

  await Event.create(doc);

  revalidatePath('/admin/events');
  revalidatePath('/news');
  redirect('/admin/events');
}

export async function updateEventAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const doc = buildDoc(formData);
  if (!doc.day || !doc.month || !doc.year || !doc.title || !doc.type || !doc.location || !doc.desc) {
    return { error: 'Please fill in all required fields.' };
  }

  const updated = await Event.update(id, doc);
  if (!updated) {
    return { error: 'Event not found.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/news');
  redirect('/admin/events');
}

export async function deleteEventAction(id: string) {
  await requireAdminSession();
  await Event.remove(id);
  revalidatePath('/admin/events');
  revalidatePath('/news');
}
