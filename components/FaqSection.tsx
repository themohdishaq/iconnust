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
    <section id="faq" className="bg-[#003B70]/[0.035] py-8 font-sans ">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 ">
        <div className="mb-10 text-left sm:mb-12">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">
            Knowledge Base
          </span>
          <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-[#003B70]/15">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-[#003B70]/15">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="group flex w-full items-center justify-between py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FCAF17] focus-visible:ring-offset-4 sm:py-7"
                >
                  <span className="pr-6 font-tahoma-font text-base font-bold text-[#003B70] transition-colors group-hover:text-[#003B70]/70 sm:text-lg">
                    {faq.question}
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center border text-xl leading-none transition-colors ${isOpen ? 'border-[#003B70] bg-[#003B70] text-[#FCAF17]' : 'border-[#FCAF17] bg-[#FCAF17] text-[#003B70]'}`} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-4xl whitespace-pre-line pb-7 pr-10 text-sm leading-7 text-[#003B70]/70 sm:text-base">
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
