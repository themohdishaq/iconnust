'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  name: string; tag: string; desc: string; founder: string; funding: string; image: string; order: number;
  status: 'draft' | 'published';
};

export default function StoryForm({
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
          <label className={labelClass}>Company / Product Name</label>
          <input name="name" required defaultValue={initial?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input name="tag" required defaultValue={initial?.tag} className={inputClass} placeholder="Health Tech" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Founder</label>
          <input name="founder" required defaultValue={initial?.founder} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Funding Raised</label>
          <input name="funding" required defaultValue={initial?.funding} className={inputClass} placeholder="$2.5M" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="desc" required defaultValue={initial?.desc} rows={4} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Display Order</label>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Image {initial ? '(leave empty to keep current)' : ''}</label>
        {initial?.image && (
          <div className="relative w-40 h-28 mb-3 rounded-lg overflow-hidden border border-slate-200">
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

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          name="status"
          value="draft"
          className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
        >
          {initial?.status === 'draft' ? 'Save Draft' : 'Save as Draft'}
        </button>

        <button
          type="submit"
          name="status"
          value="published"
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
        >
          {initial ? 'Publish Update' : 'Publish Story'}
        </button>
      </div>
    </form>
  );
}
