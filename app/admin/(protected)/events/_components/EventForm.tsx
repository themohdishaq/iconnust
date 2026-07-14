'use client';

import { useActionState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  day: string; month: string; year: string; title: string;
  type: string; location: string; desc: string; registered: number; order: number;
};

export default function EventForm({
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
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={initial?.title} className={inputClass} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Day</label>
          <input name="day" required defaultValue={initial?.day} className={inputClass} placeholder="15" />
        </div>
        <div>
          <label className={labelClass}>Month</label>
          <input name="month" required defaultValue={initial?.month} className={inputClass} placeholder="May" />
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input name="year" required defaultValue={initial?.year} className={inputClass} placeholder="2026" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Type</label>
          <input name="type" required defaultValue={initial?.type} className={inputClass} placeholder="Conference / Workshop / Webinar" />
        </div>
        <div>
          <label className={labelClass}>Registered</label>
          <input type="number" name="registered" min={0} defaultValue={initial?.registered ?? 0} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Location</label>
        <input name="location" required defaultValue={initial?.location} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="desc" required defaultValue={initial?.desc} rows={4} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>

      {state?.error && (
        <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton label={initial ? 'Update Event' : 'Create Event'} />
    </form>
  );
}
