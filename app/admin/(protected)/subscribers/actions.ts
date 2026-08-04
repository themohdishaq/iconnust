'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import Subscriber from '@/lib/models/Subscriber';

export async function setNotifyEnabledAction(id: string, enabled: boolean) {
  await requireAdminSession();
  await Subscriber.setNotifyEnabled(id, enabled);
  revalidatePath('/admin/subscribers');
}

export async function deleteSubscriberAction(id: string) {
  await requireAdminSession();
  await Subscriber.remove(id);
  revalidatePath('/admin/subscribers');
}
