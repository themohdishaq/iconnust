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
      'Access to 300+ specialized labs and research centers',
      'Dedicated faculty PI matched to your domain',
      'Confidential project management end-to-end',
    ],
    color: 'blue',
    img: 'https://media.istockphoto.com/id/2234793362/photo/research-and-development-technology-concept-with-business-innovation-icons-on-digital-screen.jpg',
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
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  },
  {
    id: 'training',
    icon: <GraduationCap size={28} />,
    title: 'Training & Upskilling',
    tagline: 'Future-ready workforce development',
    description:
      'ICON delivers tailored workforce development programs designed in partnership with industry. From technical bootcamps to executive leadership courses, our programs are grounded in real-world application and academic rigor.',
    bullets: [
      'Custom curriculum co-designed with your HR team',
      'On-site, hybrid, and online delivery formats',
      'Certified programs in emerging technologies',
      'Dedicated corporate training portal',
    ],
    color: 'emerald',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
  },
  {
    id: 'testing',
    icon: <TestTube size={28} />,
    title: 'Testing & Lab Services',
    tagline: 'Precision analysis, certified results',
    description:
      'Leverage NUST\'s ISO-certified laboratories for materials testing, product analysis, environmental monitoring, and calibration services. ICON acts as the single point of contact for all analytical and testing requirements.',
    bullets: [
      'ISO/IEC 17025-accredited testing facilities',
      'Materials, chemical, environmental & structural analysis',
      'Rapid turnaround with detailed technical reports',
      'Confidential testing under strict NDA protocols',
    ],
    color: 'purple',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
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

const partners = [
  { name: 'Engro Corporation', sector: 'Manufacturing', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' },
  { name: 'Pak Suzuki', sector: 'Automotive R&D', img: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&q=80' },
  { name: 'National Power', sector: 'Energy Solutions', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80' },
  { name: 'MedTech Alliance', sector: 'Healthcare Tech', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80' },
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

export default function IndustryServicesPage() {
  const [activeService, setActiveService] = useState<string>('rd');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const active = services.find((s) => s.id === activeService) ?? services[0];
  const c = colorMap[active.color];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-slate-900 mb-6 leading-tight tracking-tight">
              Powering Industry <br /> Through <span className="italic text-blue-700">Academic Excellence</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-slate-600 leading-relaxed font-light mb-12 max-w-2xl">
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
      <section className="bg-[#0a2342] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-blue-400 mb-3">{s.icon}</div>
                <div className="text-4xl font-serif font-bold mb-1">{s.value}</div>
                <div className="text-slate-400 text-[11px] uppercase tracking-widest font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">What We Offer</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900">Our Industry Services</h2>
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
              <div className="p-10 lg:p-14">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${c.bg} ${c.text} mb-6`}>
                  {active.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${c.text} mb-3 block`}>{active.tagline}</span>
                <h3 className="text-3xl font-serif text-slate-900 mb-4">{active.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{active.description}</p>
                <ul className="space-y-3 mb-10">
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

              <div className="relative h-72 lg:h-full min-h-[380px] overflow-hidden">
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
      <section id="engage" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Simple Process</span>
            <h2 className="text-4xl font-serif text-slate-900">How to Engage ICON</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              From your first enquiry to project delivery, ICON manages the entire process so you can focus on your business.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
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
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Industries We Serve</span>
              <h2 className="text-3xl font-serif text-slate-900">Sector-Agnostic, Expertise-Rich</h2>
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
      <section id="partners" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Proven Partnerships</span>
            <h2 className="text-4xl font-serif text-slate-900">Who We Work With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden h-52 cursor-pointer"
              >
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h5 className="text-white font-bold text-sm leading-snug">{p.name}</h5>
                  <span className="text-blue-300 text-[9px] uppercase tracking-widest">{p.sector}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
        <section id="initiate-project" className="py-32 bg-blue-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" />
              <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <h2 className="text-5xl font-serif mb-6 leading-tight">Ready to solve your industry bottleneck?</h2>
                  <p className="text-xl text-blue-200 font-light mb-12 max-w-2xl mx-auto">
                    Initiate a sponsored research project today. Our dedicated program managers will match your challenge with the right faculty experts and laboratory infrastructure.
                  </p>
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-left grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-300">Company Name</label>
                      <input type="text" className="bg-transparent border-b border-white/30 py-2 focus:border-white outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-300">Technical Domain</label>
                      <select className="bg-transparent border-b border-white/30 py-2 focus:border-white outline-none transition-colors appearance-none text-white">
                        <option className="text-slate-900">Select Area of Interest...</option>
                        <option className="text-slate-900">Manufacturing & Automation</option>
                        <option className="text-slate-900">Material Sciences</option>
                        <option className="text-slate-900">Software & AI</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex flex-col space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-300">Brief Description of the Challenge</label>
                      <textarea rows={3} className="bg-transparent border-b border-white/30 py-2 focus:border-white outline-none transition-colors resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button className="w-full bg-white text-blue-900 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-50 transition-colors flex items-center justify-center">
                        Submit Research Inquiry <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Knowledge Base</span>
            <h2 className="text-4xl font-serif text-slate-900">Frequently Asked Questions</h2>
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
