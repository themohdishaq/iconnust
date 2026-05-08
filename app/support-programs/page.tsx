"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, DollarSign, Network, ChevronRight, ArrowRight,
  Users, Target, Clock, Star, CheckCircle2, TrendingUp,
  Building2, GraduationCap, Lightbulb, Award, Globe,
  Mail, Phone, Send, BarChart3, ShieldCheck
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

// --- Data ---
const programs = [
  {
    id: 'incubator',
    name: 'Tech One Incubator',
    tagline: 'From Idea to Venture',
    icon: <Zap size={32} />,
    color: 'from-blue-600 to-blue-900',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    desc: 'NUST Tech One is a flagship incubation programme that nurtures deep-tech startups from concept to market-ready ventures. Resident companies gain access to lab infrastructure, mentorship, funding connections, and a thriving entrepreneurial community.',
    stats: [
      { val: '120+', lbl: 'Startups Incubated' },
      { val: '$40M+', lbl: 'Funding Raised' },
      { val: '85%', lbl: 'Survival Rate' },
    ],
    benefits: [
      'Dedicated co-working space and lab access within NUST H-12 campus',
      'Access to 500+ faculty mentors and domain specialists',
      'Prototype development support with advanced manufacturing tools',
      'Investor network connections and pitch preparation',
      'Legal, IP, and business development advisory services',
      'Participation in national and international innovation competitions',
    ],
    eligibility: [
      'NUST students, alumni, or faculty',
      'Technology-focused startup concept or early-stage product',
      'Commitment to full-time participation during incubation period',
      'Team of at least 2 co-founders recommended',
    ],
    process: [
      { step: '01', title: 'Online Application', desc: 'Submit team profile, idea brief, and prototype status via the ICON portal.' },
      { step: '02', title: 'Screening', desc: 'TTO review panel assesses technical merit, market potential, and team capability.' },
      { step: '03', title: 'Pitch Day', desc: 'Shortlisted applicants present to a jury of industry leaders and investors.' },
      { step: '04', title: 'Onboarding', desc: 'Accepted cohort begins structured 6-month incubation programme.' },
    ],
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80',
  },
  {
    id: 'funding',
    name: 'Incite Funding',
    tagline: 'Bridging the Valley of Death',
    icon: <DollarSign size={32} />,
    color: 'from-emerald-600 to-emerald-900',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    desc: 'Incite provides non-dilutive proof-of-concept funding to bridge the critical gap between academic research and investment-ready prototypes. Grants are awarded to NUST researchers and startups to validate technology readiness levels (TRL) before market entry.',
    stats: [
      { val: 'PKR 5M', lbl: 'Max Grant Amount' },
      { val: '200+', lbl: 'Projects Funded' },
      { val: 'TRL 4-7', lbl: 'Supported Range' },
    ],
    benefits: [
      'Non-dilutive grants from PKR 500K to PKR 5M per project',
      'Technical validation support from domain expert panel',
      'Progress-linked milestone-based disbursement',
      'Access to NUST laboratory facilities for prototyping',
      'Patent filing cost coverage up to PKR 200K',
      'Bridge to Series-A investment network post-completion',
    ],
    eligibility: [
      'NUST faculty, researcher, or affiliated startup',
      'Technology at TRL 3 or above with clear commercialization pathway',
      'Defined prototype or proof-of-concept deliverable',
      'No existing commercial product in same technology domain',
    ],
    process: [
      { step: '01', title: 'Expression of Interest', desc: 'Brief technical summary and projected deliverables submitted to ICON.' },
      { step: '02', title: 'Technical Review', desc: 'Expert panel assesses TRL, feasibility, and commercial potential.' },
      { step: '03', title: 'Grant Award', desc: 'Successful applicants receive initial tranche and project commencement.' },
      { step: '04', title: 'Milestone Reviews', desc: 'Quarterly check-ins and disbursement against verified milestones.' },
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80',
  },
  {
    id: 'bridge',
    name: 'Venture Bridge',
    tagline: 'Connecting Founders to the Ecosystem',
    icon: <Network size={32} />,
    color: 'from-violet-600 to-violet-900',
    borderColor: 'border-violet-200',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    desc: 'Venture Bridge is a structured mentorship and ecosystem connectivity programme that pairs NUST-based startups with serial entrepreneurs, C-suite executives, and international investors to accelerate growth from early stage to scale.',
    stats: [
      { val: '80+', lbl: 'Active Mentors' },
      { val: '150+', lbl: 'Startups Matched' },
      { val: '12', lbl: 'Countries Covered' },
    ],
    benefits: [
      '1-on-1 mentorship sessions with industry veterans and serial entrepreneurs',
      'Access to a curated network of 80+ angel investors and VCs',
      'Go-to-market strategy workshops and pitch refinement',
      'International market access via WIPO and partner hubs',
      'Introduction to corporate partners for pilot and PoC projects',
      'Participation in global accelerator programmes (Y Combinator, 500 Startups)',
    ],
    eligibility: [
      'Post-incubation stage startup (preferred)',
      'Revenue-generating or investment-seeking startup',
      'Clear growth roadmap for next 18 months',
      'Sector focus: deep tech, health tech, agri-tech, clean energy, fintech',
    ],
    process: [
      { step: '01', title: 'Profile Registration', desc: 'Startup completes ecosystem profile including traction, team, and roadmap.' },
      { step: '02', title: 'Mentor Matching', desc: "ICON's AI-powered matching algorithm identifies best-fit mentors." },
      { step: '03', title: 'Kick-off Session', desc: '90-minute introductory session to set goals and engagement cadence.' },
      { step: '04', title: 'Ongoing Engagement', desc: 'Monthly sessions with progress reviews and network introductions.' },
    ],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80',
  },
];

const cohortsData = [
  { year: '2020', incubator: 12, funded: 18, bridged: 22 },
  { year: '2021', incubator: 18, funded: 25, bridged: 35 },
  { year: '2022', incubator: 24, funded: 38, bridged: 48 },
  { year: '2023', incubator: 32, funded: 52, bridged: 65 },
  { year: '2024', incubator: 42, funded: 68, bridged: 84 },
];

const sectorData = [
  { name: 'Health Tech', value: 28, color: '#3b82f6' },
  { name: 'AgriTech', value: 18, color: '#10b981' },
  { name: 'AI & Robotics', value: 22, color: '#6366f1' },
  { name: 'Clean Energy', value: 16, color: '#f59e0b' },
  { name: 'FinTech', value: 10, color: '#ec4899' },
  { name: 'Others', value: 6, color: '#8b5cf6' },
];

const successStartups = [
  {
    name: 'Radwi Electronics',
    sector: 'AgriTech',
    desc: 'Smart irrigation controller startup that raised $1.2M and deployed across 500+ farms.',
    program: 'Tech One Incubator',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
  },
  {
    name: 'N-ovative Health',
    sector: 'MedTech',
    desc: 'AI-based dermatology diagnostic platform licensed to 12 hospitals across Pakistan.',
    program: 'Incite Funding',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80',
  },
  {
    name: 'GigaGrid Energy',
    sector: 'Clean Energy',
    desc: 'Solar microgrid optimizer that secured $3.5M Series-A from Dubai-based VC.',
    program: 'Venture Bridge',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function SupportProgramsPage() {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);
  const program = programs.find((p) => p.id === activeProgram)!;

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && programs.find((p) => p.id === hash)) setActiveProgram(hash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 25%, #6366f1 0%, transparent 50%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Target size={14} />
              <span>ICON Entrepreneurial Ecosystem</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              Support <span className="italic text-blue-400">Programs</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed font-light mb-12 max-w-2xl">
              Three interlocking programmes — incubation, funding, and mentorship — designed to take NUST innovations from lab bench to scalable, investment-ready ventures.
            </motion.p>

            {/* Horizontal Program Quick-Select */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {programs.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProgram(p.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                    activeProgram === p.id
                      ? 'bg-white text-slate-900 border-white shadow-lg'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="w-5 h-5">{p.icon}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programme Deep-Dive */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Horizontal Program Tabs */}
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 mb-12 overflow-x-auto">
            {programs.map((p) => (
              <button
                key={p.id}
                id={p.id}
                onClick={() => setActiveProgram(p.id)}
                className={`flex-1 min-w-[180px] flex items-center justify-center space-x-2 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  activeProgram === p.id
                    ? `bg-gradient-to-r ${p.color} text-white shadow-md`
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* Left: Info */}
                <div>
                  <div className={`inline-flex items-center space-x-3 ${program.bgColor} ${program.borderColor} border px-5 py-2 rounded-full mb-6`}>
                    <span className={program.textColor}>{program.icon}</span>
                    <span className={`font-black text-[10px] uppercase tracking-widest ${program.textColor}`}>{program.tagline}</span>
                  </div>
                  <h2 className="text-4xl font-serif text-slate-900 mb-4">{program.name}</h2>
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">{program.desc}</p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {program.stats.map((s, i) => (
                      <div key={i} className={`p-4 rounded-xl ${program.bgColor} border ${program.borderColor} text-center`}>
                        <div className={`text-2xl font-bold ${program.textColor} mb-1`}>{s.val}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{s.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <h3 className="text-lg font-bold text-slate-900 mb-4">What You Get</h3>
                  <ul className="space-y-3">
                    {program.benefits.map((b, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle2 size={16} className={`${program.textColor} shrink-0 mt-0.5`} />
                        <span className="text-slate-600 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Image + Process */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden h-64 mb-8">
                    <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                    <div className="absolute bottom-6 left-6">
                      <div className="text-white font-black text-[10px] uppercase tracking-widest opacity-80 mb-1">Programme Type</div>
                      <div className="text-white text-2xl font-serif">{program.tagline}</div>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                      <ShieldCheck size={18} className="mr-2 text-blue-700" /> Eligibility Criteria
                    </h3>
                    <ul className="space-y-2">
                      {program.eligibility.map((e, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Process (Horizontal Stepper) */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-2xl font-serif text-slate-900 mb-8 text-center">Application Process</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
                  <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100 z-0" />
                  {program.process.map((s, i) => (
                    <div key={i} className="flex-1 text-center relative z-10">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${program.color} text-white flex items-center justify-center font-black text-sm mx-auto mb-4 shadow-lg`}>
                        {s.step}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 text-sm">{s.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[160px] mx-auto">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button className={`bg-gradient-to-r ${program.color} text-white px-10 py-4 font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg inline-flex items-center space-x-2`}>
                    <Send size={16} />
                    <span>Apply to {program.name}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="text-blue-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Impact Dashboard</span>
              <h2 className="text-4xl font-serif text-slate-900">Programme Performance Metrics</h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cohort Growth Chart */}
              <motion.div variants={fadeUp} className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-100 p-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Annual Cohort Growth by Programme</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cohortsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={8} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="incubator" name="Tech One" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="funded" name="Incite" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="bridged" name="Venture Bridge" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Sector Distribution */}
              <motion.div variants={fadeUp} className="bg-slate-50 rounded-2xl border border-slate-100 p-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Startups by Sector</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sectorData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                        {sectorData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-y-2">
                  {sectorData.map((d) => (
                    <div key={d.name} className="flex items-center text-[10px] font-bold text-slate-600">
                      <div className="w-2 h-2 rounded-full mr-2 shrink-0" style={{ backgroundColor: d.color }} />
                      {d.name} ({d.value}%)
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Aggregate KPIs */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { val: '380+', lbl: 'Total Startups Supported', icon: <Building2 size={20} /> },
                { val: '$55M+', lbl: 'Venture Capital Raised', icon: <TrendingUp size={20} /> },
                { val: '1,200+', lbl: 'Jobs Created', icon: <Users size={20} /> },
                { val: '18', lbl: 'Active Export Clients', icon: <Globe size={20} /> },
              ].map((k, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center shrink-0">{k.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{k.val}</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-tight">{k.lbl}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Proven Impact</span>
              <h2 className="text-4xl font-serif text-white">Success Stories</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {successStartups.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="group rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {s.program}
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-sm">
                    <div className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-2">{s.sector}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{s.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Lightbulb size={36} />
            </div>
            <h2 className="text-4xl font-serif text-slate-900 mb-4">Ready to Build Something Extraordinary?</h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
              Applications to ICON support programmes are open year-round. Take the first step toward transforming your research or idea into a market-ready venture.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-left grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Programme of Interest</label>
                <select className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors appearance-none">
                  <option>Tech One Incubator</option>
                  <option>Incite Funding</option>
                  <option>Venture Bridge</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Current Stage</label>
                <select className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors appearance-none">
                  <option>Idea Stage</option>
                  <option>Prototype Ready</option>
                  <option>MVP Launched</option>
                  <option>Revenue Stage</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Brief Description of Your Innovation</label>
                <textarea rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-blue-900 text-white py-4 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center space-x-2">
                  <Send size={16} />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
