"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical, Briefcase, ChevronRight,
  Lightbulb, ShieldCheck, Users, ArrowRight,
  CheckCircle2, Plus, Minus, Building2, Cpu,
  GraduationCap, TestTube, Globe, Handshake,
  BarChart3, Clock, Award, Mail, Phone
} from 'lucide-react';

// --- DATA ---
const services = [
  {
    id: 'rd',
    icon: <FlaskConical size={28} />,
    title: 'R&D Support',
    tagline: 'Co-develop breakthrough solutions',
    description:
      'Collaborate with NUST faculty and research teams on mission-critical technology challenges. From feasibility studies to full-scale applied research, ICON structures industry-funded projects with clear IP agreements and deliverables.',
    bullets: [
      'Joint research agreements with defined milestones',
      'Access to 447+ specialized labs and research centers',
      'Dedicated faculty PI matched to your domain',
      'Confidential project management end-to-end',
    ],
    color: 'blue',
    img: '/industry-services/rnd.jpg',
  },
  {
    id: 'consultancy',
    icon: <Briefcase size={28} />,
    title: 'Expert Consultancy',
    tagline: 'World-class expertise on demand',
    description:
      'Tap into NUST\'s network of 3,000+ faculty across 50+ engineering, science, and business disciplines. ICON facilitates short-term advisory engagements, technical audits, and regulatory support for industry clients.',
    bullets: [
      '50+ engineering & science domains covered',
      'Short-term and retainer-based engagement models',
      'Technical audits, feasibility reviews, and expert testimony',
      'Fast turnaround with NDA protection',
    ],
    color: 'indigo',
    img: '/industry-services/consultancy.jpg',
  },
  {
    id: 'training',
    icon: <GraduationCap size={28} />,
    title: 'Upskilling and Capacity Building',
    tagline: 'Future-ready workforce development',
    description:
      'Launched in 2018, the NUST Faculty Placement Program enables faculty members to work closely with industry, fostering collaborative R&D, innovation, process improvement, and technology transfer while strengthening academia-industry partnerships.',
    bullets: [
      'Industry placements lasting from a few days to several weeks',
      'Creates opportunities for student projects, internships, jobs, and professional training',
      'Promotes collaborative R&D, innovation, and process improvement',
    ],
    color: 'emerald',
    img: '/industry-services/lectures.jpg',
  },
  {
    id: 'testing',
    icon: <TestTube size={28} />,
    title: 'Testing & Lab Services',
    tagline: 'Precision analysis, certified results',
    description:
      'Leverage NUST\'s ISO-certified laboratories for materials testing, product analysis, environmental monitoring, and calibration services. ',
    bullets: [
      'ISO/IEC 17025-accredited testing facilities',
      'Materials, chemical, environmental & structural analysis',
      'Rapid turnaround with detailed technical reports',
      'Confidential testing under strict NDA protocols',
    ],
    color: 'purple',
    img: '/industry-services/labservices.jpg',
  },
];

const stats = [
  { value: '200+', label: 'Industry Partners', icon: <Building2 size={20} /> },
  { value: '50+', label: 'Research Domains', icon: <Cpu size={20} /> },
  { value: '300+', label: 'Lab Facilities', icon: <FlaskConical size={20} /> },
  { value: '500+', label: 'Projects Delivered', icon: <Award size={20} /> },
];

const sectors = [
  'Manufacturing', 'Healthcare & Pharma', 'Energy & Utilities',
  'Agriculture & Food', 'Defense & Aerospace', 'IT & Software',
  'Construction & Infrastructure', 'Telecommunications',
];

const engagementSteps = [
  { step: 1, title: 'Submit a Brief', desc: 'Describe your technical challenge, timeline, and budget via our online form or by contacting our Industry Desk.', icon: <Mail size={20} /> },
  { step: 2, title: 'Expert Matching', desc: 'ICON identifies the most suitable faculty leads, labs, or programs within 48 hours.', icon: <Users size={20} /> },
  { step: 3, title: 'Scope & Agreement', desc: 'Co-develop a project plan with clear deliverables, IP terms, and timelines.', icon: <ShieldCheck size={20} /> },
  { step: 4, title: 'Execute & Deliver', desc: 'ICON manages the project end-to-end and ensures timely, quality delivery.', icon: <CheckCircle2 size={20} /> },
];

const partnersRowA = [
  { name: 'Engro Corporation',   sector: 'Petrochemicals & Fertilizers', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', size: 'lg' as const },
  { name: 'Pak Suzuki',          sector: 'Automotive R&D',               img: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'National Grid',       sector: 'Energy & Utilities',           img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'MedTech Alliance',    sector: 'Healthcare Technology',        img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80', size: 'lg' as const },
  { name: 'Huawei Pakistan',     sector: 'Telecommunications',           img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'Atlas Honda',         sector: 'Automotive Manufacturing',     img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80', size: 'lg' as const },
  { name: 'Millat Tractors',     sector: 'Agri-Machinery',               img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80', size: 'sm' as const },
];

const partnersRowB = [
  { name: 'Systems Ltd',         sector: 'Information Technology',       img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'SUPARCO',             sector: 'Aerospace & Defense',          img: 'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&q=80', size: 'lg' as const },
  { name: 'Fauji Foundation',    sector: 'Diversified Conglomerate',     img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'Netsol Technologies', sector: 'Fintech & Software',           img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'Indus Hospital',      sector: 'Healthcare Infrastructure',    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80', size: 'lg' as const },
  { name: 'PTCL',                sector: 'Telecom Infrastructure',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80', size: 'sm' as const },
  { name: 'Turkish Aerospace',   sector: 'Defense & Aviation',           img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80', size: 'lg' as const },
];

const faqs = [
  {
    q: 'How quickly can ICON respond to an industry brief?',
    a: 'Our Industry Desk acknowledges all enquiries within 24 hours. Expert matching and an initial consultation call are typically arranged within 48–72 hours of receiving a brief.',
  },
  {
    q: 'Who owns the IP generated in a collaborative R&D project?',
    a: 'IP ownership is negotiated on a project-by-project basis. Industry sponsors can obtain exclusive or non-exclusive licenses. ICON ensures transparent agreements that protect both parties from the outset.',
  },
  {
    q: 'Can we request a custom training program for our team?',
    a: 'Yes. ICON\'s Training & Upskilling team works directly with corporate HR and technical leads to design bespoke curricula, from one-day workshops to semester-long certification programs.',
  },
  {
    q: 'Are testing services available on a one-off basis?',
    a: 'Absolutely. Clients can request individual tests or subscribe to a testing retainer for regular analytical needs. All services are covered by confidentiality agreements.',
  },
  {
    q: 'What sectors does ICON currently serve?',
    a: 'ICON has active partnerships across manufacturing, healthcare, energy, agriculture, defense, IT, construction, and telecommunications — with growing capacity in emerging sectors.',
  },
];

// --- ANIMATION VARIANTS ---
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const colorMap: Record<string, { bg: string; text: string; border: string; btn: string }> = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    btn: 'bg-blue-900 hover:bg-blue-800' },
  indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200',  btn: 'bg-indigo-900 hover:bg-indigo-800' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', btn: 'bg-emerald-800 hover:bg-emerald-700' },
  purple:  { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200',  btn: 'bg-purple-900 hover:bg-purple-800' },
};

function PartnerCard({ name, sector, img, size }: { name: string; sector: string; img: string; size: 'lg' | 'sm' }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.025 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer group ${
        size === 'lg' ? 'w-[420px] h-80' : 'w-64 h-80'
      }`}
    >
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
      <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-colors duration-300" />
      <div className="absolute bottom-5 left-4 right-4">
        <h5 className="text-white font-bold text-sm leading-snug mb-1">{name}</h5>
        <span className="text-blue-300 text-[9px] uppercase tracking-widest font-bold">{sector}</span>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ArrowRight size={12} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function IndustryServicesPage() {
  const [activeService, setActiveService] = useState<string>('rd');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const active = services.find((s) => s.id === activeService) ?? services[0];
  const c = colorMap[active.color];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-10 sm:py-14 lg:py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-slate-900 mb-5 leading-tight tracking-tight">
              Powering Industry <br /> Through <span className="italic text-[#00558F]">Academic Excellence</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON bridges the gap between NUST's world-class research capabilities and the evolving needs of Pakistan's industries — delivering R&D support, expert consultancy, workforce training, and precision lab services under one roof.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-900 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-blue-800 transition-colors">
                Submit an Industry Brief
              </button>
              <button className="border border-slate-300 text-slate-700 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-slate-100 transition-colors flex items-center justify-center">
                Download Service Catalogue <ChevronRight size={14} className="ml-2" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      {/* <section className="bg-[#0a2342] py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-white text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-blue-400 mb-2 sm:mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-1">{s.value}</div>
                <div className="text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-10 sm:py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">What We Offer</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900">Our Industry Services</h2>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  activeService === s.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
                {React.cloneElement(s.icon as React.ReactElement<{ size: number }>, { size: 14 })}
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="p-5 sm:p-8 lg:p-10 xl:p-14">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${c.bg} ${c.text} mb-5`}>
                  {active.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${c.text} mb-2 block`}>{active.tagline}</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-slate-900 mb-3">{active.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 lg:mb-8">{active.description}</p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 lg:mb-10">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 size={16} className={`${c.text} mt-0.5 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <button className={`${c.btn} text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm transition-colors`}>
                  Enquire About {active.title}
                </button>
              </div>

              <div className="relative h-48 sm:h-64 lg:h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden">
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── HOW TO ENGAGE ─────────────────────────────────────────────────── */}
      <section id="engage" className="py-10 sm:py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">How to Engage ICON</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              From your first enquiry to project delivery, ICON manages the entire process so you can focus on your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 relative">
            <div className="hidden md:block absolute top-[3.5rem] left-0 w-full h-0.5 bg-slate-200 z-0" />
            {engagementSteps.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: item.step * 0.1 }}
                className="relative z-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Step 0{item.step}</div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-md">
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Industries We Serve</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-900">Sector-Agnostic, Expertise-Rich</h2>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                ICON's faculty network spans virtually every major industrial sector, ensuring that no challenge is too niche or too broad.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 max-w-xl">
              {sectors.map((sec, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-colors cursor-default"
                >
                  {sec}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PARTNERS ─────────────────────────────────────────────── */}
     

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
       <section
  id="initiate-project"
  className="py-12 sm:py-16 lg:py-24 bg-[#00558F] text-white relative overflow-hidden"
>
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" />

  <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-4 leading-tight">
        Ready to solve your industry bottleneck?
      </h2>
      {/* Description */}
      <p className="text-sm sm:text-base lg:text-xl text-blue-200 font-light mb-10 max-w-2xl mx-auto">
        Initiate a sponsored research project today. Our dedicated program
        managers will match your challenge with the right faculty experts and
        laboratory infrastructure.
      </p>

      {/* Form */}
      <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/20 grid md:grid-cols-2 gap-6">

        {/* Company Name */}
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
            Company Name
          </label>

          <input
            type="text"
            placeholder="Enter company name"
            className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-center placeholder:text-gray-300 focus:border-white focus:ring-0 outline-none transition"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
            Professional Email 
          </label>

          <input
            type="text"
            placeholder="Enter your professional email"
            className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-center placeholder:text-gray-300 focus:border-white focus:ring-0 outline-none transition"
          />
        </div>
        {/* Technical Domain */}
        <div className="flex flex-col items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
            Technical Domain
          </label>

          <select className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-center text-white focus:border-white outline-none appearance-none">
            <option className="text-gray-900">
              Select Area of Interest...
            </option>
            <option className="text-gray-900">
              Manufacturing & Automation
            </option>
            <option className="text-gray-900">
              Material Sciences
            </option>
            <option className="text-gray-900">
              Software & AI
            </option>
          </select>
        </div>

        {/* Challenge Description */}
        <div className="md:col-span-2 flex flex-col items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
            Brief Description of the Challenge
          </label>

          <textarea
            rows={4}
            placeholder="Describe your research challenge..."
            className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-center placeholder:text-gray-300 resize-none focus:border-white outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center pt-2">
          <button className="bg-white text-blue-900 px-10 py-4 rounded-lg font-bold uppercase tracking-[0.2em] hover:bg-blue-50 transition flex items-center">
            Submit Research Inquiry
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</section>
      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-10 sm:py-14 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Knowledge Base</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <Minus size={18} className="text-blue-600 shrink-0" />
                    : <Plus size={18} className="text-slate-400 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
