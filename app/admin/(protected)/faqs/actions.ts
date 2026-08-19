'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import Faq, { isFaqPage, type FaqPage } from '@/lib/models/Faq';

export type FormState = { error?: string };

const publicPaths: Record<FaqPage, string> = {
  'innovation-collaboration': '/innovation-collaboration',
  'industry-services': '/industry-services',
  commercialization: '/commercialization',
};

function revalidateFaqPaths(page?: FaqPage) {
  revalidatePath('/admin/faqs');
  if (page) revalidatePath(publicPaths[page]);
}

export async function createFaqAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();

  const page = formData.get('page');
  const question = String(formData.get('question') || '').trim();
  const answer = String(formData.get('answer') || '').trim();
  const order = Number(formData.get('order') || 0);

  if (!isFaqPage(page)) return { error: 'Please choose a valid FAQ section.' };
  if (!question || !answer) return { error: 'Question and answer are required.' };
  if (question.length > 500) return { error: 'Question must be 500 characters or fewer.' };
  if (!Number.isFinite(order)) return { error: 'Display order must be a number.' };

  await Faq.create({ page, question, answer, order });
  revalidateFaqPaths(page);
  redirect(`/admin/faqs#${page}`);
}

export async function updateFaqAction(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdminSession();

  const page = formData.get('page');
  const question = String(formData.get('question') || '').trim();
  const answer = String(formData.get('answer') || '').trim();
  const order = Number(formData.get('order') || 0);

  if (!isFaqPage(page)) return { error: 'Please choose a valid FAQ section.' };
  if (!question || !answer) return { error: 'Question and answer are required.' };
  if (question.length > 500) return { error: 'Question must be 500 characters or fewer.' };
  if (!Number.isFinite(order)) return { error: 'Display order must be a number.' };

  const updated = await Faq.update(id, { page, question, answer, order });
  if (!updated) return { error: 'FAQ not found.' };

  revalidateFaqPaths(page);
  redirect(`/admin/faqs?section=${page}#${page}`);
}

export async function deleteFaqAction(id: string, page: FaqPage) {
  await requireAdminSession();
  if (!isFaqPage(page)) return;
  await Faq.remove(id);
  revalidateFaqPaths(page);
}
