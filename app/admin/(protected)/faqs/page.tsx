import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import Faq, { FAQ_PAGES, isFaqPage, type FaqPage } from '@/lib/models/Faq';
import FaqForm from './_components/FaqForm';
import { createFaqAction, deleteFaqAction } from './actions';

export const dynamic = 'force-dynamic';

const sectionLabels: Record<FaqPage, string> = {
  'innovation-collaboration': 'Innovation & Collaboration',
  'industry-services': 'Industry Services',
  commercialization: 'Commercialization',
};

const filterOptions: Array<{ value: 'all' | FaqPage; label: string }> = [
  { value: 'all', label: 'All Sections' },
  ...FAQ_PAGES.map((page) => ({ value: page, label: sectionLabels[page] })),
];

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const selectedSection: 'all' | FaqPage = isFaqPage(section) ? section : 'all';
  const faqs = await Faq.list();
  const visiblePages = selectedSection === 'all' ? FAQ_PAGES : [selectedSection];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-slate-900 mb-1">Frequently Asked Questions</h1>
        <p className="text-slate-500 text-sm">
          Add or remove FAQs for each public page. Changes are published immediately.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        {filterOptions.map((filter) => {
          const active = selectedSection === filter.value;
          const href = filter.value === 'all' ? '/admin/faqs' : `/admin/faqs?section=${filter.value}`;
          return (
            <Link
              key={filter.value}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                active
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-10">
        {visiblePages.map((page) => {
          const sectionFaqs = faqs.filter((faq) => faq.page === page);
          return (
            <section id={page} key={page} className="scroll-mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
              <div className="mb-5">
                <h2 className="text-xl font-serif text-slate-900">{sectionLabels[page]}</h2>
                <p className="text-xs text-slate-400 mt-1">{sectionFaqs.length} FAQs</p>
              </div>

              <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.65fr)] gap-6 items-start">
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  {sectionFaqs.length === 0 ? (
                    <p className="p-6 text-center text-slate-400 text-sm">No FAQs in this section yet.</p>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {sectionFaqs.map((faq) => (
                        <li key={faq.id} className="flex gap-4 p-4 items-start">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                                {faq.order}
                              </span>
                              <h3 className="font-bold text-sm text-slate-900">{faq.question}</h3>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed mt-2 line-clamp-3">{faq.answer}</p>
                          </div>
                          <Link
                            href={`/admin/faqs/${faq.id}/edit`}
                            aria-label={`Edit ${faq.question}`}
                            className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil size={16} />
                          </Link>
                          <form
                            action={async () => {
                              'use server';
                              await deleteFaqAction(faq.id.toString(), page);
                            }}
                          >
                            <button
                              type="submit"
                              aria-label={`Delete ${faq.question}`}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <FaqForm page={page} action={createFaqAction} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
