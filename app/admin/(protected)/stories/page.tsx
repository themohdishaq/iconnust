import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { connectDB } from '@/lib/db';
import Story from '@/lib/models/Story';
import { deleteStoryAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminStoriesListPage() {
  await connectDB();
  const stories = await Story.find().sort({ order: 1, createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Success Stories</h1>
          <p className="text-slate-500 text-sm">{stories.length} total</p>
        </div>
        <Link
          href="/admin/stories/new"
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors"
        >
          <Plus size={15} />
          New Story
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {stories.length === 0 ? (
          <p className="p-8 text-center text-slate-400 text-sm">No success stories yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stories.map((s) => (
              <li key={s._id.toString()} className="flex items-center gap-4 p-4">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <Image src={s.image} alt="" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{s.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{s.tag} · {s.founder} · {s.funding}</p>
                </div>
                <Link
                  href={`/admin/stories/${s._id.toString()}/edit`}
                  className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await deleteStoryAction(s._id.toString());
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
