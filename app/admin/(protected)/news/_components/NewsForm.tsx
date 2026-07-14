'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import SubmitButton from '@/components/admin/SubmitButton';
import type { FormState } from '../actions';

const inputClass =
  'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2';

type Initial = {
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
};

export default function NewsForm({
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <input name="category" required defaultValue={initial?.category} className={inputClass} placeholder="Industry Collaboration" />
        </div>
        <div>
          <label className={labelClass}>Read Time</label>
          <input name="readTime" defaultValue={initial?.readTime ?? '3 min'} className={inputClass} placeholder="3 min" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date</label>
          <input name="date" required defaultValue={initial?.date} className={inputClass} placeholder="February 16, 2026" />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured} className="w-4 h-4" />
            Featured on News page
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt</label>
        <textarea name="excerpt" required defaultValue={initial?.excerpt} rows={3} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Body (separate paragraphs with a blank line)</label>
        <textarea
          name="content"
          required
          defaultValue={initial?.content?.join('\n\n')}
          rows={8}
          className={inputClass}
        />
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

      <SubmitButton label={initial ? 'Update Article' : 'Publish Article'} />
    </form>
  );
}
