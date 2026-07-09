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
import Image from 'next/image';

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
    tagline: 'Pakistan-based expertise on demand',
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
  { step: 1, title: 'Submit a Brief', desc: 'Describe your technical challenge, timeline, and budget via our online form or by contacting our Industry Desk.', icon: <Mail size={20} />, color: 'bg-[#084C70]',},
  { step: 2, title: 'Expert Matching', desc: 'ICON identifies the most suitable faculty leads, labs, or programs within 48 hours.', icon: <Users size={20} />, color: 'bg-[#084C70]', },
  { step: 3, title: 'Scope & Agreement', desc: 'Co-develop a project plan with clear deliverables, IP terms, and timelines.', icon: <ShieldCheck size={20} />, color: 'bg-[#084C70]', },
  { step: 4, title: 'Execute & Deliver', desc: 'ICON manages the project end-to-end and ensures timely, quality delivery.', icon: <CheckCircle2 size={20} />,     color: 'bg-[#CA9F3B]', },
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
          style={{ backgroundImage: "url('/industry-services/consultancy.jpg')" }}
        />
        <div className="max-w-7xl  px-6 relative z-10">
          <div className="icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] my-2 block">
            Industry Services
          </div>
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="w-full mx-auto text-left flex flex-col items-left justify-items-start"
          >
            

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl  font-serif text-slate-900 mb-5 leading-tight tracking-tight">
              Powering Industry Through <div>Academic Excellence</div>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-xl text-slate-800 leading-relaxed font-normal mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON bridges the gap between NUST's research capabilities and the evolving needs of Pakistan's industries — delivering R&D support, expert consultancy, workforce training, and precision lab services under one roof.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-items-start items-start ">
              <button className="bg-[#FCAF17] text-[#0A2A40] px-8 py-4 font-semibold text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl cursor-pointer transition-colors">
                Submit an Industry Brief
              </button>
              {/* <button className="border border-slate-300 text-slate-700 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-slate-100 transition-colors flex items-center justify-center">
                Download Service Catalogue <ChevronRight size={14} className="ml-2" />
              </button> */}
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
      <section id="services" className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left mb-8 sm:mb-12 lg:mb-16">
            <span className="text-[#FCAF17] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">What We Offer</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900">Our Industry Services</h2>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-items-start gap-4 mb-12 border-b border-slate-200 pb-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  activeService === s.id
                    ? 'text-slate-900 border-b-2 border-[#FCAF17]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-3 items-center"
            >
              <div className=" bg-transparent">
                <span className="text-[#FCAF17] font-bold text-[11px] uppercase tracking-[0.35em] mb-4 inline-block">Co-develop breakthrough solutions</span>
                <h3 className="text-3xl sm:text-4xl font-serif icon-brand-font mb-6 tracking-tight">{active.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
                  {active.description}
                </p>
                <div className="grid mb-4">
                  {active.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-2">
                      <div className={`${c.bg} ${c.text} rounded-full p-2 shrink-0`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
                <button className={`${c.btn} text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm transition-colors`}>
                  Enquire About {active.title}
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden border border-slate-200 w-full h-full bg-slate-100 "
              >
                <Image
                  width={1000}
                  height={1000}
                  src={active.img}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
 <section id="engage" className="py-8 bg-[#F3EFE6] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Header Section */}
        <div className="mb-8 text-left">
          <span className="text-[#FCAF17]  text-[11px] uppercase tracking-[0.15em] mb-4 block">
            Simple Process
          </span>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900 mb-3">
            How to Engage ICON
          </h2>
          <p className=" max-w-2xl text-base leading-relaxed">
            From your first enquiry to project delivery, ICON manages the entire process so you can focus on your business.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10 relative">
          {/* Connecting Line: 
            Uses left/right 12.5% to align perfectly with the centers of the 1st and 4th columns in a 4-col grid.
            top-6 aligns it with the vertical center of the w-12 h-12 (48px) circles.
          */}
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-[1px] bg-[#d5d0c5] z-0" />

          {/* Steps */}
          {engagementSteps.map((item) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.step * 0.1 }}
              className="relative z-10 flex flex-col text-left"
            >
              {/* Number Circle */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-base mb-6 md:mb-8 ${item.color}`}
              >
                {item.step.toString().padStart(2, '0')}
              </div>
              
              {/* Text Content */}
              <h4 className="font-serif font-bold text-lg text-[#084C70] mb-3">
                {item.title}
              </h4>
              <p className="text-[15px] text-slate-600 leading-relaxed pr-4">
                {item.desc}
              </p>
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
      className="py-8 sm:py-12 bg-[#062539] text-white flex items-center min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Column: Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-lg"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif mb-6 leading-[1.2] text-white">
            Ready to solve your industry bottleneck?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Initiate a sponsored research project today. Our dedicated program
            managers will match your challenge with the right faculty experts and
            laboratory infrastructure.
          </p>
        </motion.div>

        {/* Right Column: Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          {/* Company Name */}
          <input
            type="text"
            placeholder="Company Name"
            className="w-full bg-transparent border border-[#1c3e56] px-5 py-4 text-slate-300 placeholder:text-[#6B8394] focus:border-[#427b9e] focus:ring-0 outline-none transition"
          />

          {/* Professional Email */}
          <input
            type="email"
            placeholder="Professional Email"
            className="w-full bg-transparent border border-[#1c3e56] px-5 py-4 text-slate-300 placeholder:text-[#6B8394] focus:border-[#427b9e] focus:ring-0 outline-none transition"
          />

          {/* Technical Domain / Area of Interest */}
          <div className="relative">
            <select 
              defaultValue=""
              className="w-full bg-transparent border border-[#1c3e56] px-5 py-4 text-[#6B8394] focus:border-[#427b9e] outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled hidden>
                Select Area of Interest...
              </option>
              <option value="manufacturing" className="text-slate-900">Manufacturing & Automation</option>
              <option value="materials" className="text-slate-900">Material Sciences</option>
              <option value="software" className="text-slate-900">Software & AI</option>
            </select>
            {/* Custom Chevron to match design */}
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B8394" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Challenge Description */}
          <textarea
            rows={4}
            placeholder="Brief Description of the Challenge"
            className="w-full bg-transparent border border-[#1c3e56] px-5 py-4 text-slate-300 placeholder:text-[#6B8394] resize-none focus:border-[#427b9e] outline-none transition"
          ></textarea>

          {/* Submit Button */}
          <button className="w-full bg-[#D7A33B] text-[#062539] py-4 mt-2 font-bold hover:bg-[#c49231] transition flex items-center justify-center">
            Submit Research Inquiry
          </button>
        </motion.div>

      </div>
    </section>
      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
     <section id="faq" className="py-4 sm:py-8 bg-[#F9F7F1]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-left">
          <span className="text-[#CA9F3B] font-bold text-xs uppercase tracking-[0.15em] mb-4 block">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif icon-brand-font mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="border-t border-[#E5E0D5]">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#E5E0D5]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-6 sm:py-8 text-left focus:outline-none group"
              >
                <span className="font-semibold text-base text-[#084C70] pr-8 group-hover:text-[#0a5e8a] transition-colors">
                  {faq.q}
                </span>
                <span className="text-[#CA9F3B] text-2xl font-light shrink-0 leading-none pb-1">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-slate-600 text-base leading-relaxed pr-8">
                      {faq.a}
                    </div>
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
