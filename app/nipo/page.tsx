"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, FileText, Globe, Users, Download, ExternalLink,
  ChevronRight, Award, Lightbulb, BookOpen, ArrowRight, Mail,
  Phone, MapPin, Clock, CheckCircle2, Cpu, FlaskConical, Search,
  Building2, Target, Star, Lock, Scale, Eye, AlertCircle
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area
} from 'recharts';
import Link from 'next/link';

// --- Data ---
const ipTypeData = [
  { name: 'Patents', value: 45, color: '#1e3a8a', count: 234 },
  { name: 'Copyrights', value: 30, color: '#3b82f6', count: 156 },
  { name: 'Trademarks', value: 15, color: '#60a5fa', count: 78 },
  { name: 'Design Rights', value: 10, color: '#93c5fd', count: 52 },
];

const filingTrendData = [
  { year: '2019', filed: 28, granted: 8 },
  { year: '2020', filed: 35, granted: 14 },
  { year: '2021', filed: 52, granted: 22 },
  { year: '2022', filed: 71, granted: 38 },
  { year: '2023', filed: 98, granted: 55 },
  { year: '2024', filed: 134, granted: 82 },
];

const tiscServices = [
  {
    title: 'Patent Search & Analysis',
    desc: 'Comprehensive prior-art searches, freedom-to-operate analyses, and patentability assessments using global patent databases.',
    icon: <Search size={24} />,
  },
  {
    title: 'IP Filing Assistance',
    desc: 'End-to-end guidance on drafting and filing patent applications with IPO Pakistan, PCT, and EPO offices.',
    icon: <FileText size={24} />,
  },
  {
    title: 'Technology Watch',
    desc: 'Continuous monitoring of technology landscapes to identify emerging IP trends and competitor activities.',
    icon: <Eye size={24} />,
  },
  {
    title: 'IP Strategy Consulting',
    desc: 'Customized IP strategy sessions for researchers and departments to maximize the commercial value of innovations.',
    icon: <Target size={24} />,
  },
];

const ipServices = [
  {
    title: 'IP Management',
    desc: 'Systematic evaluation, protection, and management of intellectual property generated within NUST.',
    icon: <Lock size={24} />,
    color: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    title: 'Commercial Potential Assessment',
    desc: 'Rigorous market and technical analysis to identify the commercialization pathway for each invention.',
    icon: <Target size={24} />,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
  {
    title: 'IP Application Drafting & Filing',
    desc: 'Professional drafting of patent specifications and coordination with patent attorneys for national and international filings.',
    icon: <FileText size={24} />,
    color: 'bg-violet-50 text-violet-700 border-violet-100',
  },
  {
    title: 'Researcher Guidance & Training',
    desc: 'IP awareness workshops, inventor clinics, and one-on-one guidance for NUST faculty, researchers, and students.',
    icon: <Users size={24} />,
    color: 'bg-sky-50 text-sky-700 border-sky-100',
  },
];

const downloadItems = [
  { name: 'Invention Disclosure Form (IDF)', type: 'PDF', size: '124 KB' },
  { name: 'Non-Disclosure Agreement Template', type: 'DOCX', size: '88 KB' },
  { name: 'Material Transfer Agreement (MTA)', type: 'PDF', size: '156 KB' },
  { name: 'IP Policy – NUST', type: 'PDF', size: '340 KB' },
  { name: 'TISC Services Guide', type: 'PDF', size: '210 KB' },
  { name: 'Revenue Sharing Framework', type: 'PDF', size: '98 KB' },
];

const sections = ['about', 'ip-services', 'tisc', 'analytics', 'resources', 'contact'];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export default function NIPOPage() {
  const [activeSection, setActiveSection] = useState('about');
  const [activeTisc, setActiveTisc] = useState<'about' | 'services' | 'resources'>('about');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sidebarLinks = [
    { id: 'about', label: 'About NIPO' },
    { id: 'ip-services', label: 'IP Services' },
    { id: 'tisc', label: 'TISC' },
    { id: 'analytics', label: 'IP Analytics' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-[#0a1628] via-[#0c2044] to-[#0a2342] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 rounded-full border border-blue-400/30" />
          <div className="absolute top-32 right-40 w-64 h-64 rounded-full border border-blue-400/20" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 bg-blue-900/40 border border-blue-500/30 px-5 py-2 rounded-full mb-8">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-blue-300 font-bold text-[10px] uppercase tracking-[0.4em]">NUST Intellectual Property Office</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              Protecting <span className="italic text-blue-400">NUST's</span><br />Innovation Heritage
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed font-light mb-12 max-w-2xl">
              Established in 2008, NIPO provides comprehensive intellectual property management services — from evaluation and filing to commercialization guidance — for NUST's research ecosystem.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('ip-services')} className="bg-blue-600 text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-colors">
                Our Services
              </button>
              <button onClick={() => scrollTo('contact')} className="bg-white/10 text-white px-8 py-4 font-black text-xs uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-colors">
                Submit Disclosure
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-0 right-0 lg:bottom-8 lg:right-8 grid grid-cols-2 gap-4 p-6 lg:p-0">
          {[
            { val: '520+', lbl: 'IP Rights Managed' },
            { val: '2008', lbl: 'Year Established' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{s.val}</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest">{s.lbl}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Body: Sticky Sidebar + Scrollable Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex gap-16">

        {/* ── Vertical Sticky Sidebar ── */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-28 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 pl-4">Sections</p>
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center space-x-3 ${
                  activeSection === link.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeSection === link.id ? 'bg-blue-400' : 'bg-slate-300'}`} />
                <span>{link.label}</span>
              </button>
            ))}

            {/* Quick contact */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest mb-3">Quick Contact</p>
              <p className="text-xs text-slate-600 leading-relaxed">nipo@nust.edu.pk</p>
              <p className="text-xs text-slate-600">+92-51-9085-1000</p>
            </div>
          </div>
        </aside>

        {/* ── Main Scrollable Content ── */}
        <main className="flex-1 min-w-0 space-y-24">

          {/* About Section */}
          <section id="about">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>About NIPO</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-6">
                NUST Intellectual Property Office
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
                The NUST Intellectual Property Office (NIPO) was established in <strong>2008</strong> to serve as the institutional backbone for all intellectual property management at the National University of Sciences &amp; Technology. In February <strong>2011</strong>, NIPO was relocated to the Centre for Innovation and Entrepreneurship (CIE), further strengthening its role in driving NUST's commercialization agenda.
              </motion.p>

              {/* Mission Statement */}
              <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 text-white mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-700/30 rounded-xl flex items-center justify-center shrink-0">
                    <Star size={24} className="text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Leadership Perspective</h3>
                    <blockquote className="text-blue-100 text-lg italic leading-relaxed">
                      "NIPO is detail oriented and works systematically which makes everything very simple and convenient for the researchers."
                    </blockquote>
                    <p className="mt-4 text-slate-400 text-sm font-bold">
                      Dr. Murtaza Najabat Ali — Associate Professor, NUST &amp; CEO, N-ovative Health Technologies NHT Pvt Ltd
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={fadeUp} className="relative">
                <h3 className="text-2xl font-serif text-slate-900 mb-8">History &amp; Milestones</h3>
                <div className="space-y-0">
                  {[
                    { year: '2008', title: 'NIPO Established', desc: 'NUST Intellectual Property Office formally constituted to manage and protect university IP.' },
                    { year: '2011', title: 'Relocation to CIE', desc: 'NIPO relocated to Centre for Innovation &amp; Entrepreneurship, deepening commercialization integration.' },
                    { year: '2015', title: 'TISC Partnership', desc: 'Technology &amp; Innovation Support Centre (TISC) activated under WIPO framework for enhanced IP services.' },
                    { year: '2020', title: '400+ IP Rights', desc: 'NIPO surpassed 400 managed intellectual property rights across patents, copyrights, and trademarks.' },
                    { year: '2024', title: '520+ IP Rights', desc: 'Continued portfolio expansion with international PCT filings and industry licensing agreements.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-8 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0 z-10">
                          {item.year.slice(2)}
                        </div>
                        {idx < 4 && <div className="w-0.5 h-12 bg-slate-200 -mt-1" />}
                      </div>
                      <div className="pb-8">
                        <div className="text-[11px] font-black text-blue-700 uppercase tracking-widest mb-1">{item.year}</div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm" dangerouslySetInnerHTML={{ __html: item.desc }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* IP Services Section */}
          <section id="ip-services">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>Core Services</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-4">Intellectual Property Services</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 mb-12 max-w-2xl">
                NIPO provides a full spectrum of IP services to NUST researchers, faculty, and industry partners — ensuring that every innovation is properly protected and commercially leveraged.
              </motion.p>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
                {ipServices.map((svc, idx) => (
                  <motion.div key={idx} variants={fadeUp}
                    className={`p-8 rounded-2xl border ${svc.color} hover:shadow-lg transition-all duration-300 group`}>
                    <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {svc.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{svc.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Process Flow */}
              <motion.div variants={fadeUp} className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-2xl font-serif text-slate-900 mb-8 text-center">IP Protection Process Flow</h3>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  {[
                    { step: '01', title: 'Disclosure', desc: 'Submit IDF to NIPO', icon: <Lightbulb size={20} /> },
                    { step: '02', title: 'Evaluation', desc: 'Patentability check', icon: <Search size={20} /> },
                    { step: '03', title: 'IP Filing', desc: 'National & int\'l filing', icon: <FileText size={20} /> },
                    { step: '04', title: 'Protection', desc: 'Grant & maintenance', icon: <ShieldCheck size={20} /> },
                    { step: '05', title: 'Licensing', desc: 'Commercial transfer', icon: <ArrowRight size={20} /> },
                  ].map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mb-3 shadow-lg">
                          {s.icon}
                        </div>
                        <div className="text-[10px] font-black text-slate-400 tracking-widest">{s.step}</div>
                        <div className="font-bold text-slate-900 text-sm">{s.title}</div>
                        <div className="text-xs text-slate-500">{s.desc}</div>
                      </div>
                      {i < 4 && <ChevronRight size={24} className="text-slate-300 shrink-0 hidden lg:block" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* TISC Section */}
          <section id="tisc">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>TISC</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-4">
                Technology &amp; Innovation Support Centre
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 mb-8 max-w-2xl">
                TISC operates under the WIPO framework and provides specialised access to patent information, technology databases, and IP training resources for researchers and innovators.
              </motion.p>

              {/* TISC Tabs */}
              <motion.div variants={fadeUp}>
                <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8 max-w-md">
                  {(['about', 'services', 'resources'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTisc(tab)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                        activeTisc === tab ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTisc === 'about' && (
                    <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                            <Globe size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">WIPO Partnership</h3>
                          <p className="text-slate-600 leading-relaxed mb-4">
                            NUST TISC is a member of the WIPO TISC (Technology and Innovation Support Center) network — a global programme that provides innovators in developing countries with access to high-quality technology information and related services.
                          </p>
                          <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm">
                            <ExternalLink size={14} />
                            <span>Visit WIPO TISC Portal</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6">
                            <Building2 size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">IPO Pakistan</h3>
                          <p className="text-slate-600 leading-relaxed mb-4">
                            NIPO works in close collaboration with the Intellectual Property Organization of Pakistan (IPO Pakistan) to facilitate domestic patent filings, trademark registrations, and copyright protections for NUST innovations.
                          </p>
                          <div className="flex items-center space-x-2 text-indigo-700 font-bold text-sm">
                            <ExternalLink size={14} />
                            <span>Visit IPO Pakistan</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTisc === 'services' && (
                    <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <div className="grid md:grid-cols-2 gap-6">
                        {tiscServices.map((svc, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                              {svc.icon}
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">{svc.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTisc === 'resources' && (
                    <motion.div key="resources" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: 'Espacenet Patent Database', desc: 'Free access to over 130 million patent documents.', icon: <Search size={18} /> },
                          { name: 'WIPO PATENTSCOPE', desc: 'International PCT applications and patent data.', icon: <Globe size={18} /> },
                          { name: 'IP Learning Center', desc: 'Online IP courses for NUST researchers and students.', icon: <BookOpen size={18} /> },
                          { name: 'Technology Transfer Guide', desc: 'Step-by-step guide to commercializing your research.', icon: <FileText size={18} /> },
                        ].map((r, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start space-x-4 hover:border-blue-300 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-slate-50 group-hover:bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                              {r.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-900 transition-colors">{r.name}</h4>
                              <p className="text-slate-500 text-xs">{r.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </section>

          {/* IP Analytics */}
          <section id="analytics">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>IP Analytics</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-12">
                IP Portfolio Intelligence
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Portfolio Distribution */}
                <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Portfolio Breakdown</h3>
                  <div className="flex items-center gap-6">
                    <div className="h-[220px] flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={ipTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                            {ipTypeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {ipTypeData.map((d) => (
                        <div key={d.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                          <div>
                            <div className="text-xs font-bold text-slate-700">{d.name}</div>
                            <div className="text-xs text-slate-400">{d.count} rights · {d.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Filing Trends */}
                <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Filing &amp; Grant Trends</h3>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filingTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        <Bar dataKey="filed" name="Filed" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={16} />
                        <Bar dataKey="granted" name="Granted" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* KPI Row */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { val: '520+', lbl: 'Total IP Rights', delta: '+18%' },
                  { val: '134', lbl: 'Filings in 2024', delta: '+37%' },
                  { val: '82', lbl: 'Grants in 2024', delta: '+49%' },
                  { val: '48', lbl: 'Licenses Executed', delta: '+22%' },
                ].map((k, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-1">{k.val}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{k.lbl}</div>
                    <div className="inline-flex items-center space-x-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
                      <span>{k.delta} YoY</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Resources & Downloads */}
          <section id="resources">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>Downloads</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-4">Resources &amp; Forms</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 mb-8">Access NIPO's official documents, templates, and policy guides.</motion.p>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-4">
                {downloadItems.map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp}
                    className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.type} · {item.size}</p>
                      </div>
                    </div>
                    <Download size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Contact */}
          <section id="contact">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                <div className="w-8 h-px bg-blue-700" />
                <span>Contact NIPO</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl font-serif text-slate-900 mb-10">Get in Touch</motion.h2>

              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div variants={slideLeft} className="space-y-6">
                  {[
                    { icon: <MapPin size={20} />, label: 'Office Location', val: 'CIE Building, NUST H-12 Campus, Islamabad, Pakistan' },
                    { icon: <Mail size={20} />, label: 'Email', val: 'nipo@nust.edu.pk' },
                    { icon: <Phone size={20} />, label: 'Phone', val: '+92-51-9085-1000' },
                    { icon: <Clock size={20} />, label: 'Office Hours', val: 'Monday – Friday: 9:00 AM – 5:00 PM' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-11 h-11 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center shrink-0">{c.icon}</div>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{c.label}</div>
                        <div className="font-medium text-slate-900">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Submit an Inquiry</h3>
                  <form className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                        <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                        <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Inquiry Type</label>
                      <select className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors appearance-none">
                        <option>Invention Disclosure</option>
                        <option>Patent Filing Query</option>
                        <option>TISC Services</option>
                        <option>IP Policy Clarification</option>
                        <option>Licensing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
                      <textarea rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
                    </div>
                    <button type="button" className="w-full bg-blue-900 text-white py-4 font-black text-xs uppercase tracking-widest rounded-lg hover:bg-slate-900 transition-colors">
                      Submit Inquiry
                    </button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </section>

        </main>
      </div>
    </div>
  );
}
