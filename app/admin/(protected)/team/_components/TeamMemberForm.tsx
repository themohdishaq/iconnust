'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  name: string; title: string; dept: string; bio: string; email: string; focus: string[]; image: string; order: number;
};

export default function TeamMemberForm({
  action,
  initial,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: Initial;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required defaultValue={initial?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" name="email" required defaultValue={initial?.email} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={initial?.title} className={inputClass} placeholder="Director, ICON — NUST" />
      </div>

      <div>
        <label className={labelClass}>Department / Location</label>
        <input name="dept" required defaultValue={initial?.dept} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Bio</label>
        <textarea name="bio" required defaultValue={initial?.bio} rows={4} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Focus Areas (comma separated)</label>
        <input name="focus" defaultValue={initial?.focus?.join(', ')} className={inputClass} placeholder="IP Management, Patent Strategy" />
      </div>

      <div>
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Photo {initial ? '(leave empty to keep current)' : ''}</label>
        {initial?.image && (
          <div className="relative w-28 h-28 mb-3 rounded-lg overflow-hidden border border-slate-200">
            <Image src={initial.image} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="image" accept="image/*" required={!initial} className={inputClass} />
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton label={initial ? 'Update Member' : 'Add Member'} />
    </form>
  );
}
