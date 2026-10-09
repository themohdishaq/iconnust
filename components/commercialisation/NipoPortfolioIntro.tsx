'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Globe, Layers, ShieldCheck, X } from 'lucide-react';

export type IPOPortfolioItem = {
  title: string;
  description: string;
  characteristics?: string[];
};

export type IPOPortfolio = {
  patent: IPOPortfolioItem;
  design: IPOPortfolioItem;
  integratedCircuit: IPOPortfolioItem;
  copyright: IPOPortfolioItem;
  trademark: IPOPortfolioItem;
};

export const IPO_PORTFOLIO: IPOPortfolio = {
  patent: {
    title: "Patents",
    description:
      "A patent is a grant of exclusive rights for an invention to make, use and sell the invention for a limited period of 20 years.",
    characteristics: [
      "The invention should be a process or product.",
      "The invention should be novel or new globally.",
      "It should involve an inventive step.",
      "It should be capable of industrial application."
    ]
  },

  design: {
    title: "Designs",
    description:
      "A design is the ornamental or aesthetic aspect of an article.",
    characteristics: [
      "Technical and medical instruments.",
      "Watches, jewellery and other luxury items.",
      "From house wares and electrical appliances to vehicles and architectural structures.",
      "From textile designs to leisure goods.",
      "An industrial design does not relate to the technical features of an article."
    ]
  },

  integratedCircuit: {
    title: "Layout of Integrated Circuits",
    description:
      "Integrated Circuit means a product, in its final form or an intermediate form, in which the elements and interconnections are integrally formed in and/or on a piece of material and intended to perform an electronic function."
  },

  copyright: {
    title: "Copyright",
    description:
      "Copyright is a legal instrument that provides the creator of a work the right to control how the work is used.",
    characteristics: [
      "Literary works including computer programmes/software, books, magazines, journals, lectures, dramas, novels and compilation of data.",
      "Artistic works including paintings, maps, photographs, drawings, charts, calligraphies, sculptures, architectural works, label designs, logos and monograms.",
      "Cinematographic works including movies, audio-visual works and documentaries.",
      "Record works including sound recordings and musical works."
    ]
  },

  trademark: {
    title: "Trademarks",
    description:
      "A Trademark is a word, phrase, symbol, and/or design that identifies and distinguishes the source of the goods of one party from those of others."
  }
};

export default function NipoPortfolioIntro() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<IPOPortfolioItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selectedPortfolio) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [selectedPortfolio]);

  const portfolioLinks = [
    { item: IPO_PORTFOLIO.patent, subtitle: 'Legal protection for a technical invention', icon: ShieldCheck },
    { item: IPO_PORTFOLIO.copyright, subtitle: 'Creative, literary and software works', icon: FileText },
    { item: IPO_PORTFOLIO.design, subtitle: 'Protection of aesthetic and ornamental features', icon: Layers },
    { item: IPO_PORTFOLIO.trademark, subtitle: 'Protection of brand names, marks and slogan', icon: Globe },
  ];

  return (
    <section aria-labelledby="nipo-portfolio-heading" className="border-y border-[#003B70]/10 bg-[#F3F6F9]">
      <div className="mx-auto grid max-w-8xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#34689A]">
            <span className="h-0.5 w-10 bg-[#FCAF17]" /> National IP Office
          </div>
          <h2 id="nipo-portfolio-heading" className="font-tahoma-font text-3xl font-bold leading-tight text-[#003B70] sm:text-4xl">
            NUST Intellectual <span className="text-[#B97800]">Property Portfolio</span>
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            The NUST Intellectual Property Office (NIPO) supports the university's researchers, faculty members, students and innovators in protecting intellectual property generated through research and innovation. We work directly with inventors to draft and file their applications with IPO Pakistan, while also hosting workshops, webinars, and training sessions to spread awareness about how IP works.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Patents, copyrights, industrial designs and trademarks help safeguard your ideas and create pathways to recognition, commercialization and wider societal impact. Our goal is to build a strong culture of innovation across NUST and help put Pakistan on the map in the global IP community.
          </p>
        <Link
          href="/research-innovation/ipo-listing"
          className="animated-border mt-6 cursor-pointer inline-flex items-center gap-3 bg-[#FCAF17] px-5 py-3 text-xs font-bold text-[#171717] transition-colors hover:bg-[#F29C00] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#003B70]"
        >
          View NUST IP portfolio
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        </div>

        <aside className="border-l-4 border-[#FCAF17] bg-white px-5 py-6 shadow-[0_12px_34px_rgba(0,59,112,0.08)] sm:px-7">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B97800]">Protection &amp; practice</span>
          <h3 className="mt-2 font-tahoma-font text-xl font-bold text-[#003B70]">Four ways to protect innovation</h3>
          <ul className="mt-5 divide-y divide-slate-200">
            {portfolioLinks.map(({ item, subtitle, icon: Icon }, index) => (
              <li key={item.title} className={`border-t border-slate-200 py-3 ${index === 0 ? 'first:border-t-0 first:pt-0' : ''} last:pb-0`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF4D8] text-[#B97800]"><Icon size={17} aria-hidden="true" /></span>
                  <span><span className="block text-sm font-semibold text-[#173A68]">{item.title === 'Designs' ? 'Industrial Design' : item.title}</span><span className="mt-0.5 block text-xs text-slate-500">{subtitle}</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPortfolio(item)}
                    className="detail-border-pulse cursor-pointer shrink-0 border px-3 py-1.5 text-xs font-bold text-[#003B70] transition-colors duration-300 hover:bg-[#FFF4D8] hover:text-[#B97800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B70]"
                  >
                    Detail
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="nipo-detail-title"
        onClose={() => setSelectedPortfolio(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-auto max-h-[min(90vh,42rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-0 bg-white p-0 shadow-2xl backdrop:bg-slate-900/60"
      >
        {selectedPortfolio && (
          <div>
            <div className="flex items-start justify-between gap-6 bg-[#003B70] px-6 py-5 sm:px-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCAF17]">Intellectual property protection</span>
                <h3 id="nipo-detail-title" className="mt-2 font-tahoma-font text-2xl font-bold text-white">{selectedPortfolio.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close details"
                className="shrink-0 p-1 text-white transition-colors hover:text-[#FCAF17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="px-6 py-6 sm:px-8">
              <p className="text-sm leading-7 text-slate-600">{selectedPortfolio.description}</p>
              {selectedPortfolio.characteristics && (
                <ul className="mt-5 space-y-3">
                  {selectedPortfolio.characteristics.map((characteristic) => (
                    <li key={characteristic} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#B97800]" aria-hidden="true" />
                      <span>{characteristic}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}