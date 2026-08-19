'use client';

import { useActionState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FaqPage } from '@/lib/models/Faq';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

export default function FaqForm({
  page,
  action,
  initial,
}: {
  page: FaqPage;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: { question: string; answer: string; order: number };
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <input type="hidden" name="page" value={page} />
      <div>
        <label className={labelClass}>Question</label>
        <input name="question" required maxLength={500} defaultValue={initial?.question} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Answer</label>
        <textarea name="answer" required rows={6} defaultValue={initial?.answer} className={inputClass} />
      </div>
      <div className="max-w-40">
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>
      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <SubmitButton
        label={initial ? 'Update FAQ' : 'Add FAQ'}
        pendingLabel={initial ? 'Updating…' : 'Adding…'}
      />
    </form>
  );
}
