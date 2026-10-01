import Link from 'next/link';
import { ArrowRight, FileText, Globe, Layers, ShieldCheck } from 'lucide-react';

export default function NipoPortfolioIntro() {
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
            NUST Intellectual Property Office (NIPO) supports the university&apos;s researchers, faculty, students and innovators in protecting intellectual property generated through research and innovation. NIPO assists inventors with drafting and filing applications with IPO Pakistan, while building awareness through seminars, webinars and capacity-building activities.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Patents, copyrights, industrial designs and trademarks help safeguard ideas and create pathways to recognition, commercialisation and wider societal impact. NIPO works to strengthen IP culture across NUST and contribute to Pakistan&apos;s global intellectual property presence.
          </p>
          <Link href="/innovation-collaboration/ipo-listing" className="mt-6 inline-flex items-center gap-3 bg-[#FCAF17] px-5 py-3 text-xs font-bold text-[#171717] transition-colors hover:bg-[#F29C00] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#003B70]">
            View NUST IP portfolio <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <aside className="border-l-4 border-[#FCAF17] bg-white px-5 py-6 shadow-[0_12px_34px_rgba(0,59,112,0.08)] sm:px-7">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B97800]">Protection &amp; practice</span>
          <h3 className="mt-2 font-tahoma-font text-xl font-bold text-[#003B70]">Four ways to protect innovation</h3>
          <ul className="mt-5 divide-y divide-slate-200">
            <li className="flex items-center gap-3 border-t border-slate-200 py-3 first:border-t-0 first:pt-0 last:pb-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF4D8] text-[#B97800]"><ShieldCheck size={17} aria-hidden="true" /></span>
              <span><span className="block text-sm font-semibold text-[#173A68]">Patents</span><span className="mt-0.5 block text-xs text-slate-500">Inventions and technical solutions</span></span>
            </li>
            <li className="flex items-center gap-3 border-t border-slate-200 py-3 last:pb-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF4D8] text-[#B97800]"><FileText size={17} aria-hidden="true" /></span>
              <span><span className="block text-sm font-semibold text-[#173A68]">Copyright</span><span className="mt-0.5 block text-xs text-slate-500">Creative, literary and software works</span></span>
            </li>
            <li className="flex items-center gap-3 border-t border-slate-200 py-3 last:pb-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF4D8] text-[#B97800]"><Layers size={17} aria-hidden="true" /></span>
              <span><span className="block text-sm font-semibold text-[#173A68]">Industrial Design</span><span className="mt-0.5 block text-xs text-slate-500">Product appearance and visual form</span></span>
            </li>
            <li className="flex items-center gap-3 border-t border-slate-200 py-3 last:pb-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF4D8] text-[#B97800]"><Globe size={17} aria-hidden="true" /></span>
              <span><span className="block text-sm font-semibold text-[#173A68]">Trademarks</span><span className="mt-0.5 block text-xs text-slate-500">Names, marks and product identity</span></span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}