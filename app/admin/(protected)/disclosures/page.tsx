import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import InventionDisclosure from '@/lib/models/InventionDisclosure';

export const dynamic = 'force-dynamic';

const statusBadge: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

const sourceLabels: Record<string, string> = {
  'idf-modal': 'Full IDF',
  'quick-form': 'Quick Form',
};

export default async function AdminDisclosuresPage() {
  const disclosures = await InventionDisclosure.listAll();

  const pendingCount = disclosures.filter((d) => d.status === 'pending').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Invention Disclosures</h1>
        <p className="text-slate-500 text-sm">
          {disclosures.length} total · {pendingCount} awaiting review
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {disclosures.length === 0 ? (
          <p className="p-8 text-center text-slate-400 text-sm">No disclosures submitted yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {disclosures.map((d) => (
              <li key={d.id.toString()}>
                <Link
                  href={`/admin/disclosures/${d.id.toString()}`}
                  className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 truncate">{d.inventionTitle}</h3>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusBadge[d.status]}`}>
                        {d.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      {d.inventorNames || d.contactEmail} · {sourceLabels[d.source]} · {new Date(d.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
