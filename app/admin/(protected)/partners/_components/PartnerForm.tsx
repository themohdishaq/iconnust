'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  name: string;
  desc: string;
  logo: string | null;
  order: number;
};

export default function PartnerForm({
  action,
  initial,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: Initial;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div>
        <label className={labelClass}>Partner Name</label>
        <input name="name" required defaultValue={initial?.name} className={inputClass} />
        <p className="text-slate-400 text-xs mt-1.5">Shown on the home page alongside the logo.</p>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="desc" defaultValue={initial?.desc} rows={3} className={inputClass} />
        <p className="text-slate-400 text-xs mt-1.5">Internal reference only — not displayed on the home page.</p>
      </div>

      <div>
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Logo {initial ? '(leave empty to keep current)' : '(optional)'}</label>
        {initial?.logo && (
          <div className="relative w-32 h-20 mb-3 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <Image src={initial.logo} alt="" fill className="object-contain p-2" />
          </div>
        )}
        <input type="file" name="logo" accept="image/*" className={inputClass} />
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton label={initial ? 'Update Partner' : 'Add Partner'} />
    </form>
  );
}
