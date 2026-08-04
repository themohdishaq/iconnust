import { Mail, Trash2, Bell, BellOff } from 'lucide-react';

export type SubscriberListItem = {
  id: string;
  email: string;
  notifyEnabled: boolean;
  createdAt: string | Date;
};

export default function SubscriberList({
  items,
  setNotifyEnabledAction,
  deleteAction,
}: {
  items: SubscriberListItem[];
  setNotifyEnabledAction: (id: string, enabled: boolean) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400 text-sm">
        No subscribers yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {items.map((s) => (
          <li key={s.id} className="p-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-slate-900 font-bold truncate">
                <Mail size={14} className="text-slate-400 shrink-0" />
                {s.email}
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Subscribed {new Date(s.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form
                action={async () => {
                  'use server';
                  await setNotifyEnabledAction(s.id, !s.notifyEnabled);
                }}
              >
                <button
                  type="submit"
                  className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors ${
                    s.notifyEnabled
                      ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {s.notifyEnabled ? <Bell size={12} /> : <BellOff size={12} />}
                  {s.notifyEnabled ? 'Notifications On' : 'Notifications Off'}
                </button>
              </form>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
