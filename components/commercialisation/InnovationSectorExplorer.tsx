'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  CarFront,
  FileText,
  Settings,
  Shield,
  Sprout,
  Stethoscope,
  Users,
  Wind,
} from 'lucide-react';
import type { InnovationSector } from '@/lib/innovationSectors';

const sectorIcons = {
  stethoscope: Stethoscope,
  brainCircuit: BrainCircuit,
  sprout: Sprout,
  wind: Wind,
  car: CarFront,
  shield: Shield,
  settings: Settings,
};

export default function InnovationSectorExplorer({ sectors }: { sectors: InnovationSector[] }) {
  return (
    <section id="sector-explorer" className="bg-[#F3F6F9] py-10 sm:py-14">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#34689A]">
              <span className="h-0.5 w-10 bg-[#FCAF17]" /> Innovation Portfolio
            </div>
            <h2 className="font-tahoma-font text-3xl font-bold leading-tight text-[#07182F] sm:text-4xl">
              Explore Innovations <span className="text-[#B97800]">by Sector</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#315E8D] sm:text-base">
              Discover NUST projects and spin-offs across strategic sectors.
            </p>
          </div>
          <div className="hidden border-l-2 border-[#FCAF17] py-1 pl-5 text-sm leading-5 text-[#315E8D] sm:block">
            Research.<br />Innovation.<br />Real-World Impact.
            <div className="mt-3 h-[3px] w-10 bg-[#FCAF17]" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {!sectors.length && <p className="text-sm text-[#456F9C]">No sectors are currently listed. Please check back soon.</p>}
          {sectors.map((sector, index) => {
            const Icon = sectorIcons[sector.iconKey];
            return (
              <Link
                key={sector.slug}
                href={`/commercialisation/sectors/${sector.slug}`}
                aria-label={`Explore ${sector.title}`}
                className="block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003B70]"
              >
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group relative min-h-[256px] overflow-hidden rounded-lg border border-[#003B70]/10 bg-gradient-to-br from-white via-white to-[#DCEAF6] p-6 shadow-[0_5px_18px_rgba(0,59,112,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(0,59,112,0.14)]"
                >
                  <Icon aria-hidden="true" size={120} strokeWidth={1.1} className="pointer-events-none absolute -right-3 top-5 text-[#003B70]/[0.07] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                  <div className="relative z-10 flex h-full flex-col items-start">
                    <span className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4D8] text-[#D98100]">
                      <Icon aria-hidden="true" size={27} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-tahoma-font text-xl font-bold leading-tight text-[#07182F]">{sector.title}</h3>
                    <p className="mt-1.5 max-w-[19rem] text-sm leading-5 text-[#456F9C]">{sector.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-medium text-[#174B7E]">
                      <span className="inline-flex items-center gap-2"><FileText size={17} className="text-[#F19A00]" />{sector.projects} Projects</span>
                      <span aria-hidden="true" className="h-5 w-px bg-[#174B7E]/30" />
                      <span className="inline-flex items-center gap-2"><Users size={18} className="text-[#F19A00]" />{sector.spinOffs} {sector.spinOffs === 1 ? 'Spin-off' : 'Spin-offs'}</span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-3 rounded-md bg-[#FCAF17] px-4 py-2 text-xs font-semibold text-[#171717] transition-all duration-300 group-hover:gap-4 group-hover:bg-[#F29C00]">
                      Explore Sector <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
