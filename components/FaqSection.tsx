'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-4 sm:py-8 bg-[#F9F7F1]">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="mb-12 sm:mb-16 text-left">
          <span className="text-[#CA9F3B] font-bold text-xs uppercase tracking-[0.15em] mb-4 block">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif icon-brand-font mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-[#E5E0D5]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-[#E5E0D5]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center py-6 sm:py-8 text-left focus:outline-none group"
                >
                  <span className="font-semibold text-base text-[#084C70] pr-8 group-hover:text-[#0a5e8a] transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-[#CA9F3B] text-2xl font-light shrink-0 leading-none pb-1" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-slate-600 text-base leading-relaxed pr-8 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
