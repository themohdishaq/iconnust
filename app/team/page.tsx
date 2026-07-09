"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, Phone, MapPin, Globe,
  Award, Target, TrendingUp, Building2, ChevronRight,
  ArrowRight, Send, Clock, ShieldCheck, Lightbulb,
  BookOpen, Star, MessageSquare, ExternalLink, GraduationCap
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';

// --- Data ---
const leadership = [
  {
    name: 'Dr Hassan Waqar Raja',
    title: 'Director, ICON — NUST',
    dept: 'Innovation & Commercialization Network',
    bio: 'Mr Hassan Waqar Raja leads ICON\'s strategic vision for transforming NUST\'s research output into economic value. With over two decades of experience in academia-industry collaboration, he has been instrumental in building NUST\'s commercialization infrastructure.',
    focus: ['Strategic Partnerships', 'Policy Development', 'Stakeholder Engagement'],
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    email: 'director.icon@nust.edu.pk',
  },
  {
    name: 'Mr Salam khan',
    title: 'Head, NIPO — Intellectual Property Office',
    dept: 'CIE Building, NUST H-12',
    bio: 'Associate Professor at NUST and CEO of N-ovative Health Technologies NHT Pvt Ltd. Dr. Murtaza leads NIPO with a systematic approach to IP management, ensuring researchers can protect and commercialize their innovations with ease.',
    focus: ['IP Management', 'Patent Strategy', 'TISC Services'],
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    email: 'nipo@nust.edu.pk',
  },
  {
    name: 'Ms. Amna Farooq',
    title: 'Manager, Technology Transfer Office',
    dept: 'TTO — Licensing & Commercialization',
    bio: 'Amna manages NUST\'s technology licensing portfolio and coordinates between industry partners and research groups. She has overseen 40+ licensing agreements and is a certified technology transfer professional (RTTP).',
    focus: ['Licensing', 'Industry Liaison', 'Spin-off Creation'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
    email: 'tto@nust.edu.pk',
  },
  {
    name: 'Dr. Naveed Qadir',
    title: 'Head, Research Directorate',
    dept: 'Sponsored Research & Industry Projects',
    bio: 'Dr. Naveed leads NUST\'s sponsored research function, connecting corporate partners with the right research groups. Under his leadership, annual sponsored research funding has grown from PKR 420M to PKR 1.8B.',
    focus: ['Sponsored R&D', 'Grant Management', 'Industry Projects'],
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80',
    email: 'research@nust.edu.pk',
  },
];

const programManagers = [
  { name: 'Eng. Zainab Khalid', domain: 'AI & Robotics', expertise: 'Machine Learning, Autonomous Systems', email: 'zainab.k@nust.edu.pk', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Dr. Faisal Rana', domain: 'Health & Biotech', expertise: 'Medical Devices, Drug Discovery', email: 'faisal.rana@nust.edu.pk', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { name: 'Ms. Sana Iqbal', domain: 'Clean Energy', expertise: 'Renewables, Smart Grids, Storage', email: 'sana.iqbal@nust.edu.pk', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { name: 'Eng. Ali Hassan', domain: 'Advanced Materials', expertise: 'Nanomaterials, Composites, Polymers', email: 'ali.hassan@nust.edu.pk', color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { name: 'Dr. Saira Maqbool', domain: 'AgriTech', expertise: 'Precision Agriculture, IoT Sensors', email: 'saira.m@nust.edu.pk', color: 'bg-green-50 border-green-200 text-green-700' },
  { name: 'Mr. Bilal Akram', domain: 'Defense & Security', expertise: 'Cybersecurity, Surveillance Tech', email: 'bilal.a@nust.edu.pk', color: 'bg-red-50 border-red-200 text-red-700' },
];

const coreValues = [
  { title: 'Integrity', desc: 'Transparent, ethical, and accountable in every commercialization decision.', icon: <ShieldCheck size={24} /> },
  { title: 'Innovation', desc: 'Relentlessly pursuing new models of academic-industry collaboration.', icon: <Lightbulb size={24} /> },
  { title: 'Impact', desc: 'Measuring success by economic value created and problems solved.', icon: <TrendingUp size={24} /> },
  { title: 'Inclusivity', desc: 'Supporting researchers, students, and startups across all disciplines.', icon: <Users size={24} /> },
];

const competencyData = [
  { subject: 'IP Management', value: 95 },
  { subject: 'Industry Liaison', value: 88 },
  { subject: 'R&D Facilitation', value: 92 },
  { subject: 'Legal & Policy', value: 80 },
  { subject: 'Startup Support', value: 85 },
  { subject: 'Training & PDC', value: 78 },
];

const teamDistribution = [
  { name: 'TTO & NIPO', value: 30, color: '#1e3a8a' },
  { name: 'R&D Directorate', value: 25, color: '#3b82f6' },
  { name: 'PDC Training', value: 20, color: '#60a5fa' },
  { name: 'Incubation', value: 15, color: '#93c5fd' },
  { name: 'Admin & Legal', value: 10, color: '#bfdbfe' },
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

export default function TeamPage() {
  const [selectedLeader, setSelectedLeader] = useState<typeof leadership[0] | null>(null);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative py-8 pt-20 bg-gradient-to-br from-slate-900 via-[#0a2342] to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full border border-blue-500/10" />
          <div className="absolute top-40 right-40 w-52 h-52 rounded-full border border-blue-500/10" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        </div>
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
              ICON — the Innovation &amp; Commercialization Network at NUST — is powered by a dedicated team of technologists, IP specialists, program managers, and industry liaisons working to transform research into real-world impact.
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
                  The Innovation &amp; Commercialization Network
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base lg:text-lg">
                  ICON serves as NUST's central hub for bridging the gap between world-class academic research and industrial application. We orchestrate the full technology transfer lifecycle — from invention disclosure and IP protection to licensing, spin-off creation, and market deployment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                  Operating through four interconnected pillars — the Technology Transfer Office (TTO), the Intellectual Property Office (NIPO), the Professional Development Centre (PDC), and the Research Directorate — ICON touches every dimension of NUST's commercial innovation agenda.
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
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">Meet out Team</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader, i) => (
                <motion.div key={i} variants={fadeUp}
                  onClick={() => setSelectedLeader(leader)}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold py-2 rounded-lg">
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">{leader.name}</h3>
                    <p className="text-blue-700 text-xs font-bold mb-2 leading-tight">{leader.title}</p>
                    <p className="text-slate-400 text-xs">{leader.dept}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {leader.focus.map((f, fi) => (
                        <span key={fi} className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Managers */}
      {/* <section id="managers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Programme Managers</span>
              <h2 className="text-4xl font-serif text-slate-900 mb-4">Domain-Specific Experts</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Each programme manager is a subject-matter expert dedicated to a specific technology domain, enabling precise matchmaking between industry challenges and NUST capabilities.</p>
            </motion.div> */}

            {/* Horizontal Domain Filter */}
            {/* <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center mb-10">
              <button onClick={() => setActiveDomain(null)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${!activeDomain ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                All Domains
              </button>
              {programManagers.map((pm) => (
                <button key={pm.domain} onClick={() => setActiveDomain(pm.domain === activeDomain ? null : pm.domain)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeDomain === pm.domain ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {pm.domain}
                </button>
              ))}
            </motion.div>

            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programManagers
                .filter((pm) => !activeDomain || pm.domain === activeDomain)
                .map((pm, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className={`border rounded-2xl p-6 ${pm.color} hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <GraduationCap size={22} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-70 bg-white/60 px-2 py-0.5 rounded-full">
                        Programme Manager
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{pm.name}</h4>
                    <p className="font-bold text-xs mb-1">{pm.domain}</p>
                    <p className="text-slate-500 text-xs mb-4">{pm.expertise}</p>
                    <a href={`mailto:${pm.email}`} className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors">
                      <Mail size={13} />
                      <span>{pm.email}</span>
                    </a>
                  </motion.div>
                ))}
            </motion.div> */}
          {/* </motion.div>
        </div>
      </section> */}

      

      {/* Leader Profile Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedLeader(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative h-56">
                <img src={selectedLeader.img} alt={selectedLeader.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <button onClick={() => setSelectedLeader(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                  ✕
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className="text-white font-bold text-xl mb-1">{selectedLeader.name}</div>
                  <div className="text-blue-300 text-sm font-bold">{selectedLeader.title}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed mb-6">{selectedLeader.bio}</p>
                <div className="mb-6">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Focus Areas</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLeader.focus.map((f, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
                <a href={`mailto:${selectedLeader.email}`}
                  className="flex items-center space-x-2 text-blue-700 font-bold text-sm border border-blue-200 rounded-xl px-4 py-3 hover:bg-blue-50 transition-colors">
                  <Mail size={16} />
                  <span>{selectedLeader.email}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
