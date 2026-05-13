"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ShieldCheck, Lightbulb, Briefcase,
  FlaskConical, Cpu, Building2, Globe,
  ArrowRight, ChevronRight, CheckCircle2,
  Plus, Minus, Users, Award, Network,
  Layers, Microscope, Zap, BookOpen,
  BarChart3, Factory, TestTube, Mail
} from 'lucide-react';

// ── DATA ──────────────────────────────────────────────────────────────

const pathways = [
  {
    id: 'licensing',
    icon: <FileText size={28} />,
    title: 'Technology Licensing',
    tagline: 'Monetise your IP without leaving academia',
    color: 'blue',
    description:
      'ICON negotiates and executes licensing agreements that allow industry partners to commercially exploit NUST-owned intellectual property. Inventors earn a share of royalties while retaining their academic roles.',
    bullets: [
      'Exclusive, non-exclusive, and field-of-use licensing models',
      'Upfront fees, milestone payments, and running royalties',
      'ICON handles all negotiation and contract drafting',
      'International licensing via WIPO and partner networks',
    ],
    suitable: 'Best for researchers with patented or patent-pending technologies seeking industry adoption without forming a company.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
  },
  {
    id: 'spinoffs',
    icon: <Zap size={28} />,
    title: 'Spin-off Creation',
    tagline: 'Build a company around your breakthrough',
    color: 'indigo',
    description:
      'ICON provides end-to-end support for researchers and students to incorporate technology-based spin-off companies, including IP licensing terms, company registration, seed capital introduction, and incubation placement.',
    bullets: [
      'IP licensing arrangements tailored for founder-led spin-offs',
      'Company incorporation and legal structuring support',
      'Bridge to ICON\'s incubation and seed funding network',
      'Dedicated workspace, mentorship, and go-to-market guidance',
    ],
    suitable: 'Ideal for innovators who want to directly commercialise their technology through an equity-based venture.',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80',
  },
  {
    id: 'industry-research',
    icon: <Briefcase size={28} />,
    title: 'Industry-Sponsored Research',
    tagline: 'Co-create solutions with guaranteed IP clarity',
    color: 'emerald',
    description:
      'Companies can commission applied research projects directly with NUST faculty through ICON. Sponsored research agreements define deliverables, timelines, IP ownership, and publication rights upfront, removing ambiguity.',
    bullets: [
      'Flexible IP terms — exclusive, shared, or sponsor-owned',
      'Milestone-based project management and reporting',
      'Access to NUST\'s full laboratory and compute infrastructure',
      'Option to co-file patents arising from the collaboration',
    ],
    suitable: 'Suitable for companies seeking custom R&D solutions with full IP control and academic rigour.',
    img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80',
  },
  {
    id: 'ip',
    icon: <ShieldCheck size={28} />,
    title: 'IP Protection & Filing',
    tagline: 'Secure your invention before commercialising',
    color: 'purple',
    description:
      'Before any commercialisation pathway can be pursued, ICON assists inventors in formally disclosing, evaluating, and protecting their intellectual property through national and international patent filings, design registrations, and trade secret strategies.',
    bullets: [
      'Invention Disclosure Form (IDF) submission and review',
      'Patentability assessment and freedom-to-operate analysis',
      'National (IPO Pakistan) and PCT/international filings',
      'Trade secret and copyright protection strategies',
    ],
    suitable: 'The essential first step for any researcher with a novel invention or process before disclosure or publication.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
  },
];

const infrastructure = [
  {
    icon: <Microscope size={24} />,
    title: 'Research Laboratories',
    count: '300+',
    desc: 'Specialised labs across biotech, materials science, electronics, environmental engineering, and more — accessible for prototype development and applied R&D.',
    color: 'blue',
  },
  {
    icon: <Cpu size={24} />,
    title: 'High-Performance Computing',
    count: '12 Clusters',
    desc: 'GPU-enabled HPC clusters and cloud-connected computing nodes for AI model training, simulation, and large-scale data analysis.',
    color: 'indigo',
  },
  {
    icon: <Factory size={24} />,
    title: 'Pilot Manufacturing Unit',
    count: '3 Units',
    desc: 'Small-batch production and fabrication facilities including CNC machining, 3D printing, PCB fabrication, and composite materials processing.',
    color: 'emerald',
  },
  {
    icon: <TestTube size={24} />,
    title: 'ISO-Accredited Testing',
    count: '18 Labs',
    desc: 'ISO/IEC 17025-accredited labs for materials testing, chemical analysis, environmental monitoring, EMC, and structural integrity assessments.',
    color: 'purple',
  },
  {
    icon: <Building2 size={24} />,
    title: 'Incubation Space',
    count: '40,000 sqft',
    desc: 'Dedicated co-working, private offices, and lab bays at NUST H-12 campus for spin-off companies and industry co-location projects.',
    color: 'orange',
  },
  {
    icon: <Network size={24} />,
    title: 'Industry Connectivity Hub',
    count: '230+ Partners',
    desc: 'A curated network of industrial partners, VCs, angels, and government bodies that ICON actively connects with commercialising inventors and spin-offs.',
    color: 'rose',
  },
];

const trlStages = [
  { trl: '1–2', label: 'Basic Research', desc: 'Fundamental principles observed and initial concept formulated.', phase: 'Research', color: 'bg-slate-200 text-slate-700' },
  { trl: '3', label: 'Proof of Concept', desc: 'Experimental evidence validates the core technology concept.', phase: 'Validation', color: 'bg-blue-100 text-blue-800' },
  { trl: '4–5', label: 'Lab Prototype', desc: 'Technology validated in lab environment; prototype assembled.', phase: 'Prototype', color: 'bg-indigo-100 text-indigo-800' },
  { trl: '6', label: 'Pilot Demonstration', desc: 'System demonstrated in relevant operational environment.', phase: 'Pilot', color: 'bg-violet-100 text-violet-800' },
  { trl: '7–8', label: 'System Qualified', desc: 'System complete and qualified for operational deployment.', phase: 'Pre-Market', color: 'bg-emerald-100 text-emerald-800' },
  { trl: '9', label: 'Market Ready', desc: 'Proven system operating in the actual commercial environment.', phase: 'Market', color: 'bg-green-100 text-green-800' },
];

const iconSupport: Record<string, string[]> = {
  '1–2': ['IP watch & prior art analysis'],
  '3':   ['IDF submission', 'Provisional patent filing', 'Incite proof-of-concept grant'],
  '4–5': ['Full patent filing', 'Lab infrastructure access', 'Industry partner introduction'],
  '6':   ['Spin-off formation support', 'Pilot manufacturing access', 'Licensing negotiation'],
  '7–8': ['Sponsored research agreement', 'Market validation support', 'Investor bridge'],
  '9':   ['License execution', 'Revenue sharing', 'Export & international licensing'],
};

const techPortfolio = [
  { title: 'Graphene-based Water Filtration', domain: 'Materials Science', status: 'Ready for Licensing', trl: 'TRL 7' },
  { title: 'Autonomous Swarm Navigation Algorithm', domain: 'AI & Robotics', status: 'Prototype Available', trl: 'TRL 5' },
  { title: 'Biodegradable Smart Polymers', domain: 'Biotech', status: 'Ready for Licensing', trl: 'TRL 8' },
  { title: 'Quantum Grid Load Optimizer', domain: 'Energy', status: 'Pilot Tested', trl: 'TRL 6' },
  { title: 'EMG-Controlled Prosthetic Gripper', domain: 'MedTech', status: 'Ready for Licensing', trl: 'TRL 7' },
  { title: 'AI Early-Crop Disease Detector', domain: 'AgriTech', status: 'Prototype Available', trl: 'TRL 5' },
];

const faqs = [
  {
    q: 'What is the first step to commercialise my research?',
    a: 'Submit an Invention Disclosure Form (IDF) to ICON. This confidential document describes your invention and triggers a patentability and commercial viability assessment by the ICON team — before any publication or external disclosure.',
  },
  {
    q: 'Can I choose how my IP is commercialised?',
    a: 'Yes. ICON works with inventors to understand their goals and recommends the most suitable pathway — licensing, spin-off, or sponsored research. The final approach is always agreed upon with the inventor.',
  },
  {
    q: 'How are royalties or revenues shared with inventors?',
    a: 'Under NUST\'s IP Policy, inventors typically receive 40–50% of net licensing revenues. For spin-offs, founders negotiate equity stakes. ICON ensures the framework is transparent and fair.',
  },
  {
    q: 'Can students commercialise technology developed during their studies?',
    a: 'Yes. Student inventors who develop technology using university resources are covered by the IP Policy. ICON actively encourages student-led spin-offs and provides dedicated support through the incubation programme.',
  },
  {
    q: 'How long does it take to license a technology?',
    a: 'Standard licensing negotiations take 4–10 weeks depending on complexity. ICON expedites this through standardised term sheets and a dedicated corporate licensing desk.',
  },
];

// ── ANIMATION ─────────────────────────────────────────────────────────

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };

const colorMap: Record<string, { bg: string; text: string; border: string; btn: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200',   btn: 'bg-blue-900 hover:bg-blue-800',   badge: 'bg-blue-100 text-blue-800' },
  indigo: { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200', btn: 'bg-indigo-900 hover:bg-indigo-800', badge: 'bg-indigo-100 text-indigo-800' },
  emerald:{ bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-200',btn: 'bg-emerald-800 hover:bg-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
  purple: { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200', btn: 'bg-purple-900 hover:bg-purple-800', badge: 'bg-purple-100 text-purple-800' },
  orange: { bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200', btn: 'bg-orange-700 hover:bg-orange-600', badge: 'bg-orange-100 text-orange-800' },
  rose:   { bg: 'bg-rose-50',    text: 'text-rose-700',   border: 'border-rose-200',   btn: 'bg-rose-800 hover:bg-rose-700',   badge: 'bg-rose-100 text-rose-800' },
};

// ── PAGE ──────────────────────────────────────────────────────────────

export default function CommercializationPathwaysPage() {
  const [activePathway, setActivePathway] = useState('licensing');
  const [activeTrl, setActiveTrl]         = useState('3');
  const [openFaq, setOpenFaq]             = useState<number | null>(null);
  const [formData, setFormData] = useState({
    inquiryType: 'disclosure',
    name: '',
    email: '',
    phone: '',
    title: '',
    description: ''
  });

  const pathway = pathways.find((p) => p.id === activePathway)!;
  const c       = colorMap[pathway.color];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      inquiryType: 'disclosure',
      name: '',
      email: '',
      phone: '',
      title: '',
      description: ''
    });
    alert('Thank you for your submission! We will get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-slate-900 mb-5 leading-tight tracking-tight">
              From Research Bench <br /> to <span className="italic text-blue-700">Commercial Reality</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON maps every avenue available to NUST innovators — licensing, spin-off creation, sponsored research, and IP protection — backed by world-class infrastructure and a proven commercialisation team.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-900 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-blue-800 transition-colors">
                Submit an Invention Disclosure
              </button>
              <button className="border border-slate-300 text-slate-700 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                Browse Tech Portfolio <ChevronRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#0a2342] py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-white text-center">
            {[
              { val: '500+', lbl: 'Patents Filed',       icon: <FileText size={20} /> },
              { val: '85+',  lbl: 'Technologies Licensed', icon: <Award size={20} /> },
              { val: '40+',  lbl: 'Spin-offs Created',   icon: <Zap size={20} /> },
              { val: '300+', lbl: 'Lab Facilities',       icon: <FlaskConical size={20} /> },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                <div className="text-blue-400 mb-2 sm:mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-1">{s.val}</div>
                <div className="text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold">{s.lbl}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHWAYS ──────────────────────────────────────────────────── */}
      <section id="pathways" className="py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Available Avenues</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900">Commercialization Pathways</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Four structured pathways, each suited to a different stage, goal, and type of innovation.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {pathways.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePathway(p.id)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  activePathway === p.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
               {React.cloneElement(p.icon as React.ReactElement<{ size: number }>, { size: 14 })}
                {p.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePathway}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
            >
              {/* Left: content */}
              <div className="p-5 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between">
                <div>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${c.bg} ${c.text} mb-6`}>
                    {pathway.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${c.text} mb-3 block`}>{pathway.tagline}</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-slate-900 mb-3">{pathway.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{pathway.description}</p>
                  <ul className="space-y-3 mb-6">
                    {pathway.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 size={16} className={`${c.text} mt-0.5 shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className={`${c.bg} ${c.border} border rounded-xl p-4 text-sm ${c.text} font-medium`}>
                    <span className="font-black uppercase text-[10px] tracking-widest block mb-1">Best Suited For</span>
                    {pathway.suitable}
                  </div>
                </div>
                <button className={`mt-8 ${c.btn} text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm transition-colors self-start`}>
                  Start This Pathway
                </button>
              </div>

              {/* Right: image */}
              <div className="relative min-h-[220px] sm:min-h-[300px] lg:min-h-[360px] overflow-hidden">
                <img src={pathway.img} alt={pathway.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ────────────────────────────────────────────── */}
      <section id="infrastructure" className="py-10 sm:py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Available Resources</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">NUST Commercialization Infrastructure</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Innovators and industry partners benefit from one of Pakistan's most comprehensive research and development ecosystems.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructure.map((item, i) => {
              const cc = colorMap[item.color];
              return (
                <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 lg:p-7 hover:shadow-lg transition-shadow">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${cc.bg} ${cc.text} mb-5`}>
                    {item.icon}
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold ${cc.text} mb-1`}>{item.count}</div>
                  <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* ── TECH PORTFOLIO ────────────────────────────────────────────── */}
      <section id="licensing" className="py-10 sm:py-14 lg:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-10 lg:mb-12">
            <div>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Technology Portfolio</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900">Available for Commercialization</h2>
            </div>
            <button className="text-blue-700 font-bold text-sm hover:underline mt-4 md:mt-0 flex items-center">
              View Full Portfolio <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techPortfolio.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:shadow-xl transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={11} /> {tech.status}
                    </span>
                   
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">{tech.title}</h4>
                  <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 mb-2">
                    <BookOpen size={13} /> {tech.domain}
                  </p>
                </div>
                <button className="mt-6 w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors">
                  Request Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="bg-[#0a2342] py-10 sm:py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Lightbulb size={40} className="mx-auto mb-5 text-blue-400" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-white mb-3">Have an Innovation to Commercialise?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
            Whether you are at the idea stage or have a tested prototype, ICON's commercialisation team will identify the right pathway and support you every step of the way.
          </p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              

              {/* Name and Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-md text-white placeholder-slate-300 focus:border-blue-400 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-md text-white placeholder-slate-300 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number (Optional)"
                className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-md text-white placeholder-slate-300 focus:border-blue-400 focus:outline-none transition-colors"
              />

              {/* Invention Title */}
              {formData.inquiryType === 'disclosure' && (
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Invention Title *"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-md text-white placeholder-slate-300 focus:border-blue-400 focus:outline-none transition-colors"
                />
              )}

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={formData.inquiryType === 'disclosure' ? "Brief Description of Your Invention *" : "How can we help you? *"}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-md text-white placeholder-slate-300 focus:border-blue-400 focus:outline-none transition-colors resize-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-black text-sm uppercase tracking-[0.2em] rounded-md shadow-xl transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                {formData.inquiryType === 'disclosure' ? 'Submit Invention Disclosure' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────── */}
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
