'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ label = 'Save', pendingLabel = 'Saving…' }: { label?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
