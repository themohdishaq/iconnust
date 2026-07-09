"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ShieldCheck, Lightbulb, Briefcase,
  FlaskConical, Cpu, Building2, Globe,
  ArrowRight, ChevronRight, CheckCircle2,
  Plus, Minus, Users, Award, Network,
  Layers, Microscope, Zap, BookOpen,
  BarChart3, Factory, TestTube, Mail, X
} from 'lucide-react';
import OrgChartSection from '@/components/OrganStruct';
import FinancialChart from '@/components/BodStats';
import Image from 'next/image';

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
    img: '/industry-services/spinoffnust.jpg',
  },
  {
    id: 'ip',
    icon: <ShieldCheck size={28} />,
    title: 'Got an Idea? Patent and Protect',
    tagline: 'Secure your invention before commercialising',
    color: 'purple',
    description:
      'Before any commercialisation pathway can be pursued, ICON assists inventors in formally disclosing, evaluating, and protecting their intellectual property through national and international patent filings, design registrations, and trade secret strategies.',
    bullets: [
      'Invention Disclosure Form (IDF) submission and review',
      'Patentability assessment and prior art search',
      'National (IPO Pakistan) and international filings (PCT)',
      'Drafting and filling of patent, industrial design, copyright and trade mark applications',
    ],
    suitable: 'The essential first step for any researcher with a novel invention or process before disclosure or publication.',
    img: '/industry-services/patentwall.jpg',
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
    q: 'How to protect my innovaton through IP filling in Pak and how much at cost?',
    a: 'ICON manages the entire IP protection process, including patent drafting, filing, and prosecution in Pakistan (IPO Pakistan) and internationally (PCT). Costs vary based on the type of IP and jurisdictions; ICON provides a detailed cost estimate during the evaluation phase.',
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

// Standard fields for the Invention Disclosure Form modal.
// NOTE: swap these for the exact fields from ICON's official IDF
// document once available — this is a reasonable default set covering
// what most university tech-transfer offices ask for.
const emptyIdf = {
  inventionTitle: '',
  domain: '',
  inventorNames: '',
  department: '',
  studentOrEmployeeId: '',
  email: '',
  phone: '',
  conceptionDate: '',
  description: '',
  novelty: '',
  applications: '',
  fundingSource: '',
  priorDisclosure: 'no',
  priorDisclosureDetails: '',
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

  // ── IDF modal state ──
  const [idfModalOpen, setIdfModalOpen] = useState(false);
  const [idfData, setIdfData] = useState(emptyIdf);

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

  // Opens the IDF modal, pre-filling title/domain from the selected tech card.
  const openIdfModal = (tech: { title: string; domain: string }) => {
    setIdfData({ ...emptyIdf, inventionTitle: tech.title, domain: tech.domain });
    setIdfModalOpen(true);
  };

  const closeIdfModal = () => {
    setIdfModalOpen(false);
  };

  const handleIdfChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIdfData(prev => ({ ...prev, [name]: value }));
  };

  const handleIdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Invention Disclosure submitted:', idfData);
    alert('Thank you — your Invention Disclosure has been submitted. ICON will follow up by email.');
    setIdfModalOpen(false);
    setIdfData(emptyIdf);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')" }}
        />
        <div className="max-w-7xl  relative z-10 px-4">
          <div className="icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] mb-4 block">
            Commercialization Pathways
          </div>
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-7xl  mx-auto text-left flex flex-col items-left">
          
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl  font-serif text-slate-900 mb-5 leading-tight tracking-tight">
              From Research Bench to <div >Commercial Reality</div>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON maps every avenue available to NUST innovators — licensing, spin-off creation, sponsored research, and IP protection — backed by world-class infrastructure and a proven commercialisation team.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openIdfModal({ title: '', domain: '' })}
                className="bg-[#FCAF17] text-[#0A2A40] px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl transition-colors"
              >
                Submit an Invention Disclosure
              </button>
            
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      {/* <section className="bg-[#0a2342] p-4">
        <FinancialChart/>
      
      </section> */}

      {/* ── PATHWAYS ──────────────────────────────────────────────────── */}
      <section id="pathways" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left mb-10 sm:mb-14 lg:mb-16">
            <span className="text-[#C9962A] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Available Avenues</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-tahoma-font text-slate-900 mb-3">Commercialization Pathways</h2>
            <p className="text-slate-500 mt-3 max-w-7xl mx-auto text-sm sm:text-base">
              Following structured pathways, each suited to a different stage, goal, and type of innovation.
            </p>
          </div>

          {/* Tab switcher */}
          
          <div className="flex flex-wrap justify-items-start gap-4  border-b border-slate-200 mb-4 pb-4">
            {pathways.map((s) => (
              <button
                key={s.id}
                onClick={() => setActivePathway(s.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  activePathway === s.id
                    ? 'text-slate-900 border-b-2 border-amber-500'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePathway}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-0 items-stretch bg-white  overflow-hidden"
            >
              {/* Left: content */}
              <div className="p-5   flex flex-col justify-between">
                <div>
                  
                  <span className={`text-[10px] font-black uppercase text-[#FCAF17] tracking-[0.4em]  mb-3 block`}>{pathway.tagline}</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-tahoma-font text-slate-900 mb-3">{pathway.title}</h3>
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
                <Image height={1000} width={1000} src={pathway.img} alt={pathway.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    


      {/* ── TECH PORTFOLIO ────────────────────────────────────────────── */}
      <section id="licensing" className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-10 lg:mb-12">
            <div>
              <span className="text-[#FCAF17] font-bold text-[11px] uppercase tracking-[0.4em] mb-3 block">Technology Portfolio</span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900 mb-3">Available for Commercialization</h2>
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
                className="bg-white rounded-none border border-slate-100 shadow-sm p-7 hover:shadow-xl transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className=" icon-brand-font px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={11} /> {tech.status}
                    </span>
                   
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2  transition-colors leading-snug">{tech.title}</h4>
                  <p className="text-sm font-semibold text-[#FCAF17] flex items-center gap-1.5 mb-2">
                    <BookOpen size={13} /> {tech.domain}
                  </p>
                </div>
                <button
                  onClick={() => openIdfModal(tech)}
                  className="mt-6 w-full bg-slate-50 cursor-pointer text-slate-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors"
                >
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
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-tahoma-font text-white mb-3">Have an Innovation to Commercialise?</h2>
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
                className="w-full  bg-[#FCAF17] text-[#0A2A40] #FCAF17 px-8 py-4 font-black text-sm uppercase tracking-[0.2em] rounded-md shadow-xl transition-colors flex items-center justify-center gap-2"
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-tahoma-font text-slate-900">Frequently Asked Questions</h2>
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

      {/* ── INVENTION DISCLOSURE MODAL ───────────────────────────────── */}
      <AnimatePresence>
        {idfModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
            onClick={closeIdfModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-6 sm:my-10 overflow-hidden"
            >
              {/* Modal header */}
              <div className="bg-[#0a2342] px-6 sm:px-8 py-6 flex items-start justify-between">
                <div>
                  <span className="text-blue-300 font-bold text-[10px] uppercase tracking-[0.4em] mb-2 block">
                    ICON · Intellectual Property Office
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-tahoma-font text-white">Invention Disclosure Form</h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Confidential submission — reviewed only by the ICON commercialisation team.
                  </p>
                </div>
                <button
                  onClick={closeIdfModal}
                  aria-label="Close"
                  className="text-slate-300 hover:text-white transition-colors shrink-0 ml-4"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Modal form */}
              <form onSubmit={handleIdfSubmit} className="px-6 sm:px-8 py-6 sm:py-8 space-y-5 max-h-[70vh] overflow-y-auto">

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Invention Title *
                  </label>
                  <input
                    type="text" name="inventionTitle" required
                    value={idfData.inventionTitle} onChange={handleIdfChange}
                    placeholder="e.g. Graphene-based Water Filtration"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Technology Domain
                  </label>
                  <input
                    type="text" name="domain"
                    value={idfData.domain} onChange={handleIdfChange}
                    placeholder="e.g. Materials Science, AI & Robotics, Biotech"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Inventor Name(s) *
                    </label>
                    <input
                      type="text" name="inventorNames" required
                      value={idfData.inventorNames} onChange={handleIdfChange}
                      placeholder="Full name(s), comma separated"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Department / School *
                    </label>
                    <input
                      type="text" name="department" required
                      value={idfData.department} onChange={handleIdfChange}
                      placeholder="e.g. SEECS, SMME, S3H"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Student / Employee ID
                    </label>
                    <input
                      type="text" name="studentOrEmployeeId"
                      value={idfData.studentOrEmployeeId} onChange={handleIdfChange}
                      placeholder="Registration or employee number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Date of Conception
                    </label>
                    <input
                      type="date" name="conceptionDate"
                      value={idfData.conceptionDate} onChange={handleIdfChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email" name="email" required
                      value={idfData.email} onChange={handleIdfChange}
                      placeholder="you@nust.edu.pk"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel" name="phone"
                      value={idfData.phone} onChange={handleIdfChange}
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Description of the Invention *
                  </label>
                  <textarea
                    name="description" required rows={4}
                    value={idfData.description} onChange={handleIdfChange}
                    placeholder="What does it do, how does it work, and what stage is it at?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Novelty — What Makes It New?
                  </label>
                  <textarea
                    name="novelty" rows={3}
                    value={idfData.novelty} onChange={handleIdfChange}
                    placeholder="How is this different from existing solutions or products?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Potential Applications / Commercial Use
                  </label>
                  <textarea
                    name="applications" rows={3}
                    value={idfData.applications} onChange={handleIdfChange}
                    placeholder="Who would use this, and in what industry or market?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Funding Source
                  </label>
                  <select
                    name="fundingSource"
                    value={idfData.fundingSource} onChange={handleIdfChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:border-blue-600 focus:outline-none transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="self">Self-funded</option>
                    <option value="nust-internal">NUST Internal Grant</option>
                    <option value="govt">Government Grant</option>
                    <option value="industry">Industry Sponsored</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Has this invention been publicly disclosed?
                  </label>
                  <div className="flex gap-6 mb-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="radio" name="priorDisclosure" value="no"
                        checked={idfData.priorDisclosure === 'no'} onChange={handleIdfChange}
                      />
                      No
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="radio" name="priorDisclosure" value="yes"
                        checked={idfData.priorDisclosure === 'yes'} onChange={handleIdfChange}
                      />
                      Yes
                    </label>
                  </div>
                  {idfData.priorDisclosure === 'yes' && (
                    <textarea
                      name="priorDisclosureDetails" rows={2}
                      value={idfData.priorDisclosureDetails} onChange={handleIdfChange}
                      placeholder="Where and when (e.g. conference paper, publication, presentation, demo)?"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Submit Disclosure
                  </button>
                  <button
                    type="button"
                    onClick={closeIdfModal}
                    className="px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
