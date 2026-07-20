'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import News from '@/lib/models/News';
import { saveUploadedImage, deleteUploadedImage } from '@/lib/uploads';
import { slugify } from '@/lib/slugify';

export type FormState = { error?: string };

function parseContent(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

async function uniqueSlug(title: string, ignoreId?: string) {
  const base = slugify(title);
  let slug = base;
  let n = 1;
  while (await News.slugExists(slug, ignoreId)) {
    slug = `${base}-${++n}`;
  }
  return slug;
}

export async function createNewsAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const content = parseContent(String(formData.get('content') || ''));
  const date = String(formData.get('date') || '').trim();
  const readTime = String(formData.get('readTime') || '3 min').trim();
  const featured = formData.get('featured') === 'on';
  const imageFile = formData.get('image') as File | null;

  if (!title || !category || !excerpt || content.length === 0 || !date) {
    return { error: 'Please fill in all required fields.' };
  }
  if (!imageFile || imageFile.size === 0) {
    return { error: 'Please choose an image.' };
  }

  const image = await saveUploadedImage(imageFile, 'news');
  const slug = await uniqueSlug(title);

  await News.create({ title, slug, category, excerpt, content, image, date, readTime, featured });

  revalidatePath('/admin/news');
  revalidatePath('/news');
  redirect('/admin/news');
}

export async function updateNewsAction(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const content = parseContent(String(formData.get('content') || ''));
  const date = String(formData.get('date') || '').trim();
  const readTime = String(formData.get('readTime') || '3 min').trim();
  const featured = formData.get('featured') === 'on';
  const imageFile = formData.get('image') as File | null;

  if (!title || !category || !excerpt || content.length === 0 || !date) {
    return { error: 'Please fill in all required fields.' };
  }

  const existing = await News.findById(id);
  if (!existing) {
    return { error: 'News article not found.' };
  }

  const update: Partial<{
    title: string; slug: string; category: string; excerpt: string;
    content: string[]; date: string; readTime: string; featured: boolean; image: string;
  }> = { title, category, excerpt, content, date, readTime, featured };

  if (title !== existing.title) {
    update.slug = await uniqueSlug(title, id);
  }

  if (imageFile && imageFile.size > 0) {
    update.image = await saveUploadedImage(imageFile, 'news');
    await deleteUploadedImage(existing.image);
  }

  await News.update(id, update);

  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath(`/news/${update.slug ?? existing.slug}`);
  redirect('/admin/news');
}

export async function deleteNewsAction(id: string) {
  await requireAdminSession();
  const existing = await News.remove(id);
  if (existing) {
    await deleteUploadedImage(existing.image);
  }
  revalidatePath('/admin/news');
  revalidatePath('/news');
}
