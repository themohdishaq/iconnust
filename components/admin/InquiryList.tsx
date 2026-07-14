import { Mail, Trash2, CheckCircle2, Circle } from 'lucide-react';

export type InquiryListItem = {
  id: string;
  organization: string;
  email: string;
  domain: string;
  message: string;
  status: 'new' | 'read';
  createdAt: string | Date;
};

export default function InquiryList({
  items,
  markReadAction,
  deleteAction,
}: {
  items: InquiryListItem[];
  markReadAction: (id: string) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 text-sm">
        No submissions yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {items.map((s) => (
          <li key={s.id} className={`p-5 ${s.status === 'new' ? 'bg-blue-50/40' : ''}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {s.status === 'new' ? (
                    <Circle size={9} className="text-blue-600 shrink-0" fill="currentColor" />
                  ) : (
                    <CheckCircle2 size={12} className="text-slate-300 shrink-0" />
                  )}
                  <h3 className="font-bold text-slate-900 truncate">{s.organization}</h3>
                </div>
                <p className="text-slate-400 text-xs">{new Date(s.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {s.status === 'new' && (
                  <form
                    action={async () => {
                      'use server';
                      await markReadAction(s.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-[10px] font-black uppercase tracking-widest text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Mark Read
                    </button>
                  </form>
                )}
                <form
                  action={async () => {
                    'use server';
                    await deleteAction(s.id);
                  }}
                >
                  <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-2">
              <a href={`mailto:${s.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-700 transition-colors">
                <Mail size={13} />
                {s.email}
              </a>
              {s.domain && <div className="text-slate-500">{s.domain}</div>}
            </div>

            {s.message && <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-lg p-3">{s.message}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
