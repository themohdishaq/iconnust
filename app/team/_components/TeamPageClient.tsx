"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, ShieldCheck, Lightbulb, TrendingUp,
} from 'lucide-react';

export type Leader = {
  id: string;
  name: string;
  title: string;
  dept: string;
  img: string;
  // email: string;
};

const leadership: Leader[] = [
  {
    id: '1',
    name: 'Dr. Hassan Waqar Rana',
    title: 'Director',
    dept: 'ICON NUST',
    img: '/team/waqar.jpeg',
  },
  {
    id: '2',
    name: 'Dr. Nasser Jallal',
    title: 'General Manager',
    dept: 'Technology Transfer Office',
    img: '/team/nasser.jpg',
  },
  {
    id: '3',
    name: 'Sundas Imran',
    title: 'Senior Manager',
    dept: 'CAC NUST',
    img: '/team/sundas.jpg',
  },
  {
    id: '4',
    name: 'Fawad kashan',
    title: 'Senior Manager',
    dept: 'CAC NUST',
    img: '/team/fawad.jpg',
  },
  {
    id: '5',
    name: 'Abid Hussain',
    title: 'Assistant Manager',
    dept: 'CAC NUST',
    img: '/team/abid.jpg',
  },
  {
    id: '6',
    name: 'Ambreen Munir',
    title: 'Manager',
    dept: 'TTO NUST',
    img: '/team/ambreen.jpeg',
  },
  {
    id: '7',
    name: 'Eram Zaidi',
    title: 'Consultant',
    dept: 'IP&LA NUST',
    img: '/team/eram.jpg',
  },
  {
    id: '8',
    name: 'Muhammad Salman Khan',
    title: 'Assistant Manager',
    dept: 'IP&LA NUST',
    img: '/team/salman.jpg',
  },
  {
    id: '9',
    name: 'Aasia',
    title: 'Assistant Manager',
    dept: 'IP&LA NUST',
    img: '/team/asiya.jpg',
  },
  {
    id: '10',
    name: 'Mr. Waseem Ahmed Mirza',
    title: 'Senior General Manager',
    dept: 'Business Development Office NUST',
    img: '/team/waseem.png',
  },
  {
    id: '11',
    name: 'Muhammad Junaid',
    title: 'Assistant Manager',
    dept: 'Business Development Office NUST',
    img: '/team/junaid.jpg',
  },
  {
    id: '12',
    name: 'Zaid Muneer',
    title: 'Deputy Manager',
    dept: 'Business Development Office NUST',
    img: '/team/zaid.jpg',
  },
];

const coreValues = [
  { title: 'Integrity', desc: 'Transparent, ethical, and accountable in every Commercialisation decision.', icon: <ShieldCheck size={24} /> },
  { title: 'Innovation', desc: 'Relentlessly pursuing new models of academic-industry collaboration.', icon: <Lightbulb size={24} /> },
  { title: 'Impact', desc: 'Measuring success by economic value created and problems solved.', icon: <TrendingUp size={24} /> },
  { title: 'Inclusivity', desc: 'Supporting researchers, students, and startups across all disciplines.', icon: <Users size={24} /> },
];

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

export default function TeamPageClient() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative py-8 pt-20 bg-gradient-to-br from-slate-900 via-[#0a2342] to-slate-800 mt-16 overflow-hidden">
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
              ICON — the Innovation &amp; Commercialisation Office NUST — is powered by a dedicated team of technologists, IP specialists, program managers, and industry liaisons working to transform research into real-world impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About ICON */}
      <section className="py-10  bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
              <motion.div variants={slideLeft}>
                <div className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                  <div className="w-8 h-px bg-blue-700" />
                  <span>Who We Are</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 mb-4 sm:mb-5">
                  Innovation &amp; Commercialisation Office
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base lg:text-lg">
                  ICON serves as NUST&apos;s central hub for bridging the gap between world-class academic research and industrial application. We orchestrate the full technology transfer lifecycle — from invention disclosure and IP protection to licensing, spin-off creation, and market deployment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                  Operating through four interconnected pillars — the Technology Transfer Office (TTO), the Intellectual Property Office (NIPO), the Professional Development Centre (PDC), and the Research Directorate — ICON touches every dimension of NUST&apos;s commercial innovation agenda.
                </p>
              </motion.div>

              {/* Core Values */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                {coreValues.map((v, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-900 text-blue-700 group-hover:text-white rounded-xl flex items-center justify-center mb-4 transition-all">
                      {v.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{v.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-10 sm:py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10 lg:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">Our Team</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader) => (
                <motion.div key={leader.id} variants={fadeUp}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative h-56 overflow-hidden ">
                    <img src={leader.img} alt={leader.name} className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">{leader.name}</h3>
                    <p className="text-blue-700 text-xs font-bold mb-2 leading-tight">{leader.title}</p>
                    <p className="text-slate-400 text-xs">{leader.dept}</p>
                  
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
