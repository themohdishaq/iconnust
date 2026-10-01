"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ShieldCheck, Lightbulb, Briefcase,
  FlaskConical, Cpu, Building2,
  ChevronRight, CheckCircle2,
  Users, Award, Network,
  Microscope, Zap, BookOpen,
  BarChart3, Factory, TestTube, Mail, X
} from 'lucide-react';
import OrgChartSection from '@/components/OrganStruct';
import FinancialChart from '@/components/BodStats';
import Image from 'next/image';
import FaqSection, { type FaqItem } from '@/components/FaqSection';
import InnovationSectorExplorer from '@/components/commercialisation/InnovationSectorExplorer';

// ── DATA ──────────────────────────────────────────────────────────────
const researchVideos = {
  featured: {
    videoId: "HW6izXNOeGY", // Replace with actual featured video ID
    title: "3D Concrete Printer, #NUST, Pakistan | Construction Made Easier Than Ever Before",
    description: "Discover how ICON bridges NUST's research capabilities with industry needs — from joint R&D projects and IP licensing to spin-off creation and workforce development."
  },
  sidebar: [
    {
      title: "Teleoperated Decontamination Robot",
      videoId: "4WcEz9jupYE", // Replace with actual video ID
      duration: "15:30",
      views: "2.1K views",
      date: "2 days ago"
    },
    {
      title: "Made in Pakistan diagnostic Scanner for Modern Vehicles",
      videoId: "ruZLF1HAp-Q", // Replace with actual video ID
      duration: "12:45",
      views: "1.8K views",
      date: "1 week ago"
    },
    {
      title: "All terrain Reconfigurable Tracked Vehicle ",
      videoId: "5rtz_ga-vMo", // Replace with actual video ID
      duration: "18:20",
      views: "3.2K views",
      date: "2 weeks ago"
    },
    {
      title: " Otoscope Reinvented: A Simple Tool Making a Big Difference!",
      videoId: "Z_sxB1NNqmA", // Replace with actual video ID
      duration: "22:15",
      views: "1.5K views",
      date: "3 weeks ago"
    },
  ]
};
const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};
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

type PublishedTech = {
  id: string;
  title: string;
  domain: string;
  status: string;
  trl: string;
  impact?: string; // Optional societal-impact / one-line pitch shown on the card
};
const nustShowcaseProducts: PublishedTech[] = [
  {
    id: 'nab-ai-portal',
    title: 'NAB AI Portal',
    domain: 'AI & Public Sector',
    status: 'Commercialized',
    trl: '9',
    impact:
      'Intelligent financial crime analysis platform that automates case review, detects anomalies, and speeds up investigation and decision-making.',
  },
  {
    id: 'infinitary-tactical-simulator',
    title: 'Infinitary Tactical Simulator',
    domain: 'Defense & VR Training',
    status: 'Commercialized',
    trl: '9',
    impact:
      'High-realism VR training platform for law-enforcement and military, reducing training cost and safety risk versus live-fire exercises.',
  },
  {
    id: 'safe-smart-cities',
    title: 'Safe Smart Cities',
    domain: 'AI & Urban Security',
    status: 'Commercialized',
    trl: '9',
    impact:
      'Real-time AI detection of vehicles, people, and abnormal activity, deployed in Lahore (PSCA) and Mardan (KPK) Safe City projects.',
  },
  {
    id: 'digital-human-project',
    title: 'Digital Human Project',
    domain: 'Healthcare AI',
    status: 'Commercialized',
    trl: '9',
    impact:
      'AI solutions for medical imaging, diagnostics, and surgical planning — Brain MRI, Pulmonary AI, Breast Cancer Detection, DICOM Viewer.',
  },
  {
    id: 'myo-prosthetic-upper-limb',
    title: 'Myo Prosthetic Upper Limb',
    domain: 'Biomedical Devices',
    status: 'Commercialized',
    trl: '9',
    impact:
      'Below-elbow prosthetic limb developed by NCRA NUST, already sold to patients and reducing Pakistan\'s import bill for assistive devices.',
  },
  {
    id: 'swarm-robotics-kits',
    title: 'Swarm Robotics Kits',
    domain: 'Robotics & STEM Education',
    status: 'Ready for Commercialisation',
    trl: '7–8',
    impact:
      'Indigenous multi-robot kits for universities, colleges, and schools, built to programme collective robot behaviour.',
  },
  {
    id: 'heritage-preservation-arvr',
    title: 'Heritage Preservation through AR/VR',
    domain: 'AR/VR & Cultural Heritage',
    status: 'Preparing for UNESCO Scale-up',
    trl: '6',
    impact:
      'AR/VR reconstructions of Pakistani heritage sites — 2 completed (Jandial Temple, Taxila, Dharmarajika), 3 more in development for UNESCO World Heritage Sites.',
  },
  {
    id: 'ai-smart-agriculture',
    title: 'AI Portal & App for Smart Agriculture',
    domain: 'AgriTech',
    status: 'Under Development — Deployment Phase',
    trl: '6',
    impact:
      'Web and mobile advisory platform for farmers and agri-officers, giving real-time crop, weather, irrigation, and pest-control guidance.',
  },
  {
    id: 'four-legged-robot',
    title: '4-Legged Robot',
    domain: 'Robotics & STEM Education',
    status: 'Under Development',
    trl: '4–5',
    impact:
      'Quadruped research robot platform for higher-level robotics research at universities and R&D organisations.',
  },
  {
    id: 'multi-dof-upper-limb-prosthesis',
    title: 'Multi DoF Upper Limb Prosthesis',
    domain: 'Biomedical Devices',
    status: 'Under Development',
    trl: '4–5',
    impact:
      'Multi-degree-of-freedom prosthetic arm with all fingers, including the thumb, mimicking natural hand movement — in final development.',
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

const emptyQuickForm = {
  inquiryType: 'disclosure',
  name: '',
  email: '',
  phone: '',
  title: '',
  description: '',
};

export default function CommercializationExperience({ faqs }: { faqs: FaqItem[] }) {
  const [activePathway, setActivePathway] = useState('licensing');
  const [activeTrl, setActiveTrl] = useState('3');
  const [formData, setFormData] = useState(emptyQuickForm);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const [idfModalOpen, setIdfModalOpen] = useState(false);
  const [idfData, setIdfData] = useState(emptyIdf);
  const [idfStatus, setIdfStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [idfError, setIdfError] = useState('');
  const [techPortfolio, setTechPortfolio] = useState<PublishedTech[]>(nustShowcaseProducts);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/invention-disclosures', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Unable to load invention disclosures');
        return res.json();
      })
      .then((data: PublishedTech[]) =>
        setTechPortfolio(Array.isArray(data) && data.length > 0 ? data : nustShowcaseProducts)
      )
      .catch(() => {
        if (!controller.signal.aborted) setTechPortfolio(nustShowcaseProducts);
      });
    return () => controller.abort();
  }, []);

  const pathway = pathways.find((p) => p.id === activePathway)!;
  const c       = colorMap[pathway.color];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');
    try {
      const res = await fetch('/api/invention-disclosures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'quick-form',
          inventionTitle: formData.title,
          contactEmail: formData.email,
          contactPhone: formData.phone,
          inventorNames: formData.name,
          description: formData.description,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setFormStatus('success');
      setFormData(emptyQuickForm);
    } catch (err) {
      setFormStatus('error');
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Opens the IDF modal, pre-filling title/domain from the selected tech card.
  const openIdfModal = (tech: { title: string; domain: string }) => {
    setIdfData({ ...emptyIdf, inventionTitle: tech.title, domain: tech.domain });
    setIdfStatus('idle');
    setIdfError('');
    setIdfModalOpen(true);
  };

  const closeIdfModal = () => {
    setIdfModalOpen(false);
    setIdfData(emptyIdf);
    setIdfStatus('idle');
    setIdfError('');
  };
const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
  const handleIdfChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIdfData(prev => ({ ...prev, [name]: value }));
  };

  const handleIdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdfStatus('submitting');
    setIdfError('');
    try {
      const res = await fetch('/api/invention-disclosures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'idf-modal',
          inventionTitle: idfData.inventionTitle,
          domain: idfData.domain,
          inventorNames: idfData.inventorNames,
          department: idfData.department,
          studentOrEmployeeId: idfData.studentOrEmployeeId,
          contactEmail: idfData.email,
          contactPhone: idfData.phone,
          conceptionDate: idfData.conceptionDate,
          description: idfData.description,
          novelty: idfData.novelty,
          applications: idfData.applications,
          fundingSource: idfData.fundingSource,
          priorDisclosure: idfData.priorDisclosure,
          priorDisclosureDetails: idfData.priorDisclosureDetails,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setIdfStatus('success');
    } catch (err) {
      setIdfStatus('error');
      setIdfError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative py-8 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')" }}
        />
        <div className="max-w-8xl  relative z-10 px-4">
          <div className="icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] mb-4 block">
            Commercialisation Pathways
          </div>
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-8xl  mx-auto text-left flex flex-col items-left">

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl  font-tahoma-font mb-5 text-[#003B70] leading-tight tracking-tight">
              From University-Driven <br/>
              Research to Market Impact
            
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
              ICON maps every avenue available to NUST innovators — licensing, spin-off creation, sponsored research, and IP protection — backed by world-class infrastructure and a proven commercialisation team.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openIdfModal({ title: '', domain: '' })}
                className="group relative inline-flex overflow-hidden rounded-sm border border-[#FCAF17] bg-[#FCAF17] px-8 py-4 font-black text-xs uppercase tracking-[0.2em] text-[#0A2A40] shadow-xl transition-all duration-500 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full -translate-y-full bg-[#003B70] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                <span className="absolute inset-0 rounded-[inherit] border border-[#003B70] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 text-[#0A2A40] transition-colors duration-300 group-hover:text-white">
                  Submit an Invention Disclosure
                </span>
              </button>

            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ── PATHWAYS ──────────────────────────────────────────────────── */}
      <section id="pathways" className="py-8 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="text-left mb-10 sm:mb-14 lg:mb-16">
            <span className="text-[#C9962A] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Available Avenues</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-tahoma-font text-[#003B70] mb-3">Commercialization Pathways</h2>
            <p className="text-slate-500 mt-3 mx-auto text-sm sm:text-base">
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
                {/* <button className={`mt-8 ${c.btn} text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm transition-colors self-start`}>
                  Start This Pathway
                </button> */}
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
      <InnovationSectorExplorer />
      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="bg-[#0a2342] py-10 sm:py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 relative z-10 grid sm:grid-cols-2 gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-tahoma-font text-white mb-3">Have an Innovation to Commercialise?</h2>
          <p className="text-slate-300  mx-auto mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
            Whether you are at the idea stage or have a tested prototype, ICON&apos;s commercialisation team will identify the right pathway and support you every step of the way.
          </p>
        </div>
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

              {formStatus === 'success' && (
                <p className="text-emerald-400 text-sm font-medium bg-emerald-400/10 border border-emerald-400/30 rounded-md px-4 py-3">
                  Thank you — your disclosure has been submitted for review. ICON will follow up by email.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-400 text-sm font-medium bg-red-400/10 border border-red-400/30 rounded-md px-4 py-3">{formError}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full  bg-[#FCAF17] text-[#0A2A40] #FCAF17 px-8 py-4 font-black text-sm uppercase tracking-[0.2em] rounded-md shadow-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Mail size={16} />
                {formStatus === 'submitting' ? 'Submitting…' : formData.inquiryType === 'disclosure' ? 'Submit Invention Disclosure' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

<section id="media-hub" className="py-4 bg-slate-50">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="icon-brand-font-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Innovation Highlights</span>
              <h2 className="text-4xl font-serif text-[#003B70]">NUST Innovation Stories</h2>
            </div>
            <a href="https://www.youtube.com/@Research_NUST" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-widest hover:underline">
              <span>View All on YouTube</span> <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Featured Video */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={slideInLeft} className="lg:col-span-8">
              <div className="relative rounded-md overflow-hidden shadow-2xl bg-black">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${researchVideos.featured.videoId}?si=research_nust`}
                  title={researchVideos.featured.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-[400px] lg:h-[500px]"
                ></iframe>
              </div>
             
            </motion.div>

            {/* Side Updates & Smaller Videos */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-4 flex flex-col gap-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              {researchVideos.sidebar.map((video, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex-shrink-0">
                  <div className="relative">
                    <iframe
                      width="100%"
                      height="180"
                      src={`https://www.youtube.com/embed/${video.videoId}?si=research_nust`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug mb-2 line-clamp-2">{video.title}</h4>
                    <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                      <span>{video.views}</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
 
      <FaqSection faqs={faqs} />

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
                  <h3 className="text-xl sm:text-2xl font-serif font-tahoma-font text-white">Invention Form</h3>
                  <p className="text-slate-300 text-xs mt-1">
                  Your form will reviewed only by the ICON commercialisation team.
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
              {idfStatus === 'success' ? (
                <div className="px-6 sm:px-8 py-10 text-center">
                  <CheckCircle2 size={40} className="mx-auto mb-4 text-emerald-600" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Disclosure Submitted</h4>
                  <p className="text-slate-500 text-sm mb-6">
                    Thank you — your Invention Disclosure has been submitted for review. ICON&apos;s commercialisation team will follow up by email.
                  </p>
                  <button
                    type="button"
                    onClick={closeIdfModal}
                    className="px-8 py-3 font-black text-xs uppercase tracking-[0.2em] rounded-sm bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
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


                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={idfStatus === 'submitting'}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Mail size={16} />
                    {idfStatus === 'submitting' ? 'Submitting…' : 'Submit Form'}
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
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
