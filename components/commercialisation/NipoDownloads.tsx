'use client';

import { useEffect, useState } from 'react';
import { Copyright, Download, FileText, Fingerprint, Ruler, ShieldCheck } from 'lucide-react';

type NipoFile = {
  name: string;
  href: string;
};

type NipoCategory = {
  id: string;
  title: string;
  description: string;
  files: NipoFile[];
};

const categoryIcons = {
  copyright: Copyright,
  patent: ShieldCheck,
  trademark: Fingerprint,
  design: Ruler,
};

export default function NipoDownloads() {
  const [categories, setCategories] = useState<NipoCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/nipo-documents', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load documents');
        return response.json() as Promise<{ categories: NipoCategory[] }>;
      })
      .then(({ categories: nextCategories }) => setCategories(nextCategories))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;
        setHasError(true);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const selectedCategory = categories.find((category) => category.id === activeCategory);

  return (
    <section id="nipo-documents" aria-labelledby="nipo-downloads-heading" className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mb-7 max-w-3xl">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#B17A00]">NIPO Resources</span>
          <h2 id="nipo-downloads-heading" className="font-tahoma-font text-2xl font-bold text-[#003B70] sm:text-3xl">Download IP filling documents</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Click Download on a category to see its filing forms and guidance, then select a document to download.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons] ?? FileText;
            const isActive = activeCategory === category.id;

            return (
              <article
                key={category.id}
                className={`flex min-h-36 flex-col items-start border p-5 text-left transition-all duration-200 ${isActive ? 'border-[#003B70] bg-[#003B70] text-white shadow-lg shadow-[#003B70]/15' : 'border-slate-200 bg-white text-[#003B70] hover:border-[#FCAF17] hover:shadow-md'}`}
              >
                <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center ${isActive ? 'bg-white/10 text-[#FCAF17]' : 'bg-[#FFF4D8] text-[#B97800]'}`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="font-tahoma-font text-lg font-bold">{category.title}</span>
                <span className={`mt-1 text-xs leading-5 ${isActive ? 'text-white/75' : 'text-slate-500'}`}>{category.description}</span>
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    aria-label={`Download ${category.title} filing documents`}
                    aria-expanded={isActive}
                    aria-controls="nipo-file-list"
                    onClick={() => setActiveCategory(isActive ? null : category.id)}
                    className="inline-flex cursor-pointer items-center gap-2 bg-[#FCAF17] px-4 py-2.5 text-xs font-bold text-[#003B70] transition-colors hover:bg-[#ffd16b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B97800]"
                  >
                    <Download size={16} aria-hidden="true" />
                    Download
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {isLoading && <p role="status" className="mt-5 text-sm text-slate-500">Loading filing documents...</p>}

        {hasError && (
          <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Document files could not be loaded. Please try again later.
          </p>
        )}

        {selectedCategory && (
          <div id="nipo-file-list" className="mt-5 border border-slate-200 bg-white p-4 sm:p-6">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-tahoma-font text-lg font-bold text-[#003B70]">{selectedCategory.title} files</h3>
                <p className="mt-1 text-xs text-slate-500">Select a file to download it.</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">{selectedCategory.files.length} files</span>
            </div>

            {selectedCategory.files.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {selectedCategory.files.map((file) => (
                  <li key={file.href}>
                    <a href={file.href} download={file.name} className="group flex min-h-14 items-center justify-between gap-3 border border-slate-200 px-3 py-2.5 text-sm text-slate-700 transition-colors hover:border-[#FCAF17] hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70]">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <FileText size={17} className="shrink-0 text-[#003B70]" aria-hidden="true" />
                        <span className="break-words">{file.name}</span>
                      </span>
                      <Download size={16} className="shrink-0 text-[#B97800] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-sm text-slate-500">No files are currently available in this category.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
