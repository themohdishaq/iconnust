"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Users, Mail,
} from 'lucide-react';

export type PublicTeamMember = {
  id: number;
  name: string;
  title: string;
  dept: string;
  image: string;
  email: string;
};



const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function TeamPageContent({ members }: { members: PublicTeamMember[] }) {


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative py-52 bg-gradient-to-br from-slate-900 via-[#0a2342] to-slate-800  overflow-hidden">
       <motion.div
                 initial={{ scale: 1.08, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.35 }}
                 transition={{ duration: 1.8, ease: "easeOut" }}
                 className="absolute inset-0 bg-[url('/main-pic/ICON_team.jpg')] bg-cover pt-12 bg-no-repeat bg-center"
               />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 icon-brand-font-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Users size={14} />
              <span>ICON Team &amp; Organization</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl  font-serif text-white mb-5 leading-tight">
              The People Behind <span className=" text-blue-400">ICON</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base  text-slate-300 font-light leading-relaxed mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON the Innovation &amp; Commercialisation Office NUST is powered by a dedicated team of technologists, IP specialists, program managers, and industry liaisons working to transform research into real-world impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About ICON */}
      <section className="py-10  bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <div className="items-center">
              <motion.div variants={slideLeft}>
                <div className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                  <div className="w-8 h-px bg-blue-700" />
                  <span>Who We Are</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 mb-4 sm:mb-5">
                  Innovation &amp; Commercialisation Office
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base lg:text-lg">
                  ICON serves as NUST&apos;s central hub for bridging the gap between world-class academic research and industrial application. We orchestrate the full technology transfer lifecycle from invention disclosure and IP protection to licensing, spin-off creation, and market deployment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                  Operating through four constituent offices the Corporate Advisory Council (CAC), NUST Intellectual Property Office (NIPO), Technology Transfer Office (TTO) and Business Development Office (BDO) ICON touches every dimension of NUST&apos;s commercial innovation agenda.
                </p>
              </motion.div>

             
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-10  bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10 lg:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">Our Team</h2>
            </motion.div>

            {members.length === 0 && (
              <p className="text-center text-slate-500">Team information will be available soon.</p>
            )}

            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((leader) => (
                <motion.div key={leader.id} variants={fadeUp}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative h-96 overflow-hidden ">
                    <Image key={leader.image} src={leader.image} alt={leader.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">{leader.name}</h3>
                    <p className="text-blue-700 text-xs font-bold mb-2 leading-tight">{leader.title}</p>
                    <p className="text-slate-400 text-xs">{leader.dept}</p>
                    {leader.email?.trim() && (
                      <a href={`mailto:${leader.email.trim()}`} className="mt-3 inline-flex max-w-full items-start gap-2 text-xs text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900">
                        <Mail size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span className="break-all">{leader.email.trim()}</span>
                      </a>
                    )}

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
