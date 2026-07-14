import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { connectDB } from '@/lib/db';
import Event from '@/lib/models/Event';
import { deleteEventAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminEventsListPage() {
  await connectDB();
  const events = await Event.find().sort({ order: 1, createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Upcoming Events</h1>
          <p className="text-slate-500 text-sm">{events.length} total</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors"
        >
          <Plus size={15} />
          New Event
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {events.length === 0 ? (
          <p className="p-8 text-center text-slate-400 text-sm">No events yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {events.map((e) => (
              <li key={e._id.toString()} className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-900 flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg font-black leading-none">{e.day}</span>
                  <span className="text-[9px] font-bold uppercase">{e.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{e.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{e.type} · {e.location} · {e.registered} registered</p>
                </div>
                <Link
                  href={`/admin/events/${e._id.toString()}/edit`}
                  className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await deleteEventAction(e._id.toString());
                  }}
                >
                  <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
