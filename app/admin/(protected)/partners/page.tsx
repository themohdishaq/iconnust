import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import Partner from '@/lib/models/Partner';
import { deletePartnerAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPartnersListPage() {
  const partners = await Partner.list();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-slate-900 mb-1">Partners</h1>
          <p className="text-slate-500 text-sm">{partners.length} total · logo &amp; name shown on the home page</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors"
        >
          <Plus size={15} />
          New Partner
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {partners.length === 0 ? (
          <p className="p-8 text-center text-slate-400 text-sm">No partners yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {partners.map((p) => (
              <li key={p.id.toString()} className="flex items-center gap-4 p-4">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                  {p.logo ? (
                    <Image src={p.logo} alt="" fill className="object-contain p-1" />
                  ) : (
                    <Building2 size={22} className="text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{p.name}</h3>
                  {p.desc && <p className="text-slate-400 text-xs mt-0.5 truncate">{p.desc}</p>}
                </div>
                <Link
                  href={`/admin/partners/${p.id.toString()}/edit`}
                  className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await deletePartnerAction(p.id.toString());
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
