"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, FlaskConical, Briefcase, ChevronRight, 
  Lightbulb, FileText, ShieldCheck, Download, Plus, Minus,Mail,
  ExternalLink, Network, Award, Cpu, Globe, Users, ArrowRight, CheckCircle2, Play
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// --- MOCK DATA ---
const spinoffSectors = [
  { name: 'Health Tech', value: 35, color: '#3b82f6' },
  { name: 'AgriTech', value: 25, color: '#10b981' },
  { name: 'AI & Robotics', value: 20, color: '#6366f1' },
  { name: 'Energy', value: 15, color: '#f59e0b' },
  { name: 'Materials', value: 5, color: '#8b5cf6' },
];

const ipGrowthData = [
  { year: '2021', filed: 45, granted: 12 },
  { year: '2022', filed: 60, granted: 25 },
  { year: '2023', filed: 85, granted: 40 },
  { year: '2024', filed: 120, granted: 65 },
  { year: '2025', filed: 150, granted: 90 },
];

const successStories = [
  {
    title: "EKKO",
    tag: "Health Tech",
    desc: "A therapeutic wave device designed for the neuro-rehabilitation of patients suffering from cerebral palsy, autism, and speech disorders.",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80"
  },
  {
    title: "DermaVision",
    tag: "AI Diagnostics",
    desc: "An AI-powered diagnostic tool capable of detecting early-stage skin diseases and melanomas with over 94% accuracy using smartphone imagery.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
  },
  {
    title: "Myobionics Gripper",
    tag: "Prosthetics",
    desc: "An advanced, affordable upper-limb prosthetic gripper controlled via electromyography (EMG) signals, restoring mobility to amputees.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  }
];

const availableIPs = [
  { id: 1, title: 'Graphene-based Water Filtration', pi: 'Dr. Salman Raza', desc: 'A scalable nano-filter capable of removing heavy metals with 99.9% efficiency.', status: 'Ready for Licensing' },
  { id: 2, title: 'Autonomous Swarm Drones', pi: 'Dr. Aisha Khan', desc: 'GPS-denied navigation algorithms for agricultural monitoring and mapping.', status: 'Prototype Available' },
  { id: 3, title: 'Biodegradable Smart Polymers', pi: 'Dr. Omer Tariq', desc: 'Packaging materials that decompose in 60 days while retaining structural integrity.', status: 'Ready for Licensing' },
  { id: 4, title: 'Quantum Grid Optimizer', pi: 'Dr. Fatima Ali', desc: 'AI algorithm to predict and stabilize renewable energy microgrids.', status: 'Pilot Tested' },
];

const faqs = [
  { q: "Who owns the IP generated at NUST?", a: "As per the NUST IP Policy, the university generally retains ownership of IP created by employees using university resources, though generous revenue-sharing models are in place for inventors." },
  { q: "How long does the licensing process take?", a: "Standard licensing agreements typically take between 4 to 8 weeks to negotiate and finalize, depending on the complexity of the technology." },
  { q: "Can a student start a spin-off?", a: "Absolutely. NUST strongly encourages student entrepreneurship and provides incubation support via the Tech One Incubator and TTO." },
  { q: "What is an Invention Disclosure Form (IDF)?", a: "An IDF is the first formal step in the commercialization process. It is a confidential document describing your invention to the TTO for evaluation." }
];

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const TTOPortal = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('inventors'); // 'inventors' or 'industry'
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      
      

      {/* Hero Section */}
      <section id="ecosystem" className="relative py-20 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')"
          }} />
          
          {/* Overlay Gradients */}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-100 px-6 py-2 rounded-full mb-8 shadow-sm text-blue-800">
              <Network size={14} />
              <span className="font-bold text-[10px] uppercase tracking-[0.4em]">Technology Transfer Ecosystem</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-slate-900 mb-6 leading-tight tracking-tight">
              From Laboratory Bench <br/> to <span className="italic text-blue-700">Global Market</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-slate-600 leading-relaxed font-light mb-12 max-w-2xl">
              The NUST TTO is the nexus where groundbreaking academic research meets industrial application. We protect intellectual property, foster spin-offs, and execute high-impact commercial licenses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Visual Analytics / Charts Section */}
      <section className="py-16 bg-white relative z-20 -mt-10 lg:-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">IP Portfolio Growth</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ipGrowthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="filed" name="Patents Filed" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar dataKey="granted" name="Patents Granted" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex flex-col items-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-16">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6 w-full text-left">Active Spin-offs by Sector</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={spinoffSectors} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {spinoffSectors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {spinoffSectors.map((s) => (
                    <div key={s.name} className="flex items-center text-[10px] font-bold text-slate-600">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dual Audience Segment (Tabs) */}
      <section className="py-20 bg-slate-50 relative" id="inventors">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-2 rounded-full shadow-md border border-slate-200 inline-flex">
              <button 
                onClick={() => setActiveTab('inventors')}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center ${activeTab === 'inventors' ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Lightbulb size={16} className="mr-2" /> For Inventors
              </button>
              <button 
                onClick={() => setActiveTab('industry')}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center ${activeTab === 'industry' ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Briefcase size={16} className="mr-2" /> For Industry
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* ===================== INVENTORS VIEW ===================== */}
            {activeTab === 'inventors' && (
              <motion.div 
                key="inventors"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}
              >
                {/* 1. TTO Process */}
                <div className="mb-24">
                  <h2 className="text-3xl font-serif text-slate-900 mb-12 text-center">The Technology Transfer Journey</h2>
                  <div className="grid md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                    {[
                      { step: 1, title: 'Invention Disclosure', desc: 'Submit the formal IDF detailing your research.', icon: <FileText /> },
                      { step: 2, title: 'Evaluation', desc: 'TTO assesses commercial potential and patentability.', icon: <Search /> },
                      { step: 3, title: 'IP Protection', desc: 'Filing national or international patents.', icon: <ShieldCheck /> },
                      
                    ].map((item, idx) => (
                      <div key={idx} className="relative z-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                          {React.cloneElement(item.icon, { size: 20 })}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Step 0{item.step}</div>
                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-12">
                    <button className="bg-blue-900 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-blue-800 transition-colors">
                      Submit Your Invention (IDF)
                    </button>
                  </div>
                </div>

                {/* 2. Spinoffs Collage */}
                <div className="mb-24 bg-white p-10 lg:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                      <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Startup Ecosystem</span>
                      <h2 className="text-4xl font-serif text-slate-900">NUST Spinoffs</h2>
                    </div>
                    <button className="text-blue-700 font-bold text-sm hover:underline mt-4 md:mt-0 flex items-center">
                      View All Founders <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Large feature block */}
                    <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                      <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" alt="Founders" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-blue-600 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded mb-2 inline-block">AgriTech</span>
                        <h4 className="text-white text-xl font-bold mb-1">Radwi Electronics</h4>
                        <p className="text-slate-300 text-xs">Pioneering smart irrigation controllers for local farmers.</p>
                      </div>
                    </div>
                    {/* Smaller blocks */}
                    {[
                      { name: 'N-ovative', sector: 'MedTech', img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80' },
                      { name: 'AeroSync', sector: 'Drones', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80' },
                      { name: 'BioCure', sector: 'Biotech', img: 'https://images.unsplash.com/photo-1532187875605-186c7131ef50?auto=format&fit=crop&q=80' },
                      { name: 'GigaGrid', sector: 'Energy', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80' }
                    ].map((spinoff, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden h-40 group cursor-pointer">
                        <img src={spinoff.img} alt={spinoff.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h5 className="text-white font-bold text-sm">{spinoff.name}</h5>
                          <span className="text-blue-300 text-[9px] uppercase tracking-widest">{spinoff.sector}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Resources & Policies */}
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center"><FileText className="mr-3 text-blue-700" /> Resources & Forms</h3>
                    <ul className="space-y-4">
                      {['Invention Disclosure Form (IDF)', 'Non-Disclosure Agreement (NDA)', 'Material Transfer Agreement (MTA)', 'Revenue Sharing Framework'].map((item, i) => (
                        <li key={i} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:border-blue-400 transition-colors cursor-pointer group">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-800">{item}</span>
                          <Download size={16} className="text-slate-400 group-hover:text-blue-600" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center"><ShieldCheck className="mr-3 text-blue-700" /> TTO Policies</h3>
                    <ul className="space-y-4">
                      {['NUST Intellectual Property Policy', 'Spin-off Creation Guidelines', 'Consultancy & Industrial Project Directives'].map((item, i) => (
                        <li key={i} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:border-blue-400 transition-colors cursor-pointer group">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-800">{item}</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===================== INDUSTRY VIEW ===================== */}
            {activeTab === 'industry' && (
              <motion.div 
                key="industry" id="industry"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
              >
                {/* 1. Licensing Process */}
                <div className="mb-24">
                  <h2 className="text-3xl font-serif text-slate-900 mb-12 text-center">Streamlined Corporate Licensing</h2>
                  <div className="grid md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                    {[
                      { step: 1, title: 'Explore Portfolio', desc: 'Browse available NUST patents and technologies.', icon: <Search /> },
                      { step: 2, title: 'Engage & NDA', desc: 'Sign confidentiality agreements to review deep tech details.', icon: <ShieldCheck /> },
                      { step: 3, title: 'Negotiation', desc: 'Discuss licensing terms and commercial rights.', icon: <Briefcase /> },
                      { step: 4, title: 'Agreement Signed', desc: 'Execute the license and begin tech transfer.', icon: <Award /> }
                    ].map((item, idx) => (
                      <div key={idx} className="relative z-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-sm">
                          {React.cloneElement(item.icon, { size: 20 })}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phase 0{item.step}</div>
                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Available IPs Grid */}
                <div className="mb-24">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                      <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">Tech Portfolio</span>
                      <h2 className="text-4xl font-serif text-slate-900">Available for Commercialization</h2>
                    </div>
                    <button className="text-indigo-700 font-bold text-sm hover:underline mt-4 md:mt-0 flex items-center">
                      Explore All Technologies <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {availableIPs.map((ip) => (
                      <div key={ip.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                              <CheckCircle2 size={12} className="mr-1" /> {ip.status}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">{ip.title}</h4>
                          <p className="text-sm font-semibold text-indigo-600 mb-4 flex items-center">
                            <Users size={14} className="mr-2" /> PI: {ip.pi}
                          </p>
                          <p className="text-slate-500 text-sm leading-relaxed mb-8">{ip.desc}</p>
                        </div>
                        <button className="w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors">
                          Request Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Industry Resources CTA */}
                <div className="bg-indigo-900 rounded-3xl p-10 lg:p-16 text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <Briefcase size={48} className="mx-auto mb-6 text-indigo-300" />
                  <h3 className="text-4xl font-serif mb-4">Interested in Licensing?</h3>
                  <p className="text-indigo-200 max-w-2xl mx-auto mb-10 text-lg">
                    Whether you are an SME looking for a specific technological edge or a multinational corporation seeking strategic IP acquisitions, our TTO office is ready to facilitate.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-indigo-900 px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-md shadow-xl hover:bg-slate-50 transition-colors">
                      Contact Corporate Desk
                    </button>
                    <button className="bg-transparent border border-indigo-400 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] rounded-md hover:bg-white/10 transition-colors flex items-center justify-center">
                      Download Sample NDA <Download size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Proven Impact</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900">Success Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div 
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                key={i} className="group cursor-pointer rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900">
                    {story.tag}
                  </div>
                </div>
                <div className="p-8 bg-white">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{story.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{story.desc}</p>
                  <div className="flex items-center text-blue-700 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    <Play size={14} className="mr-2" /> Watch Video
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & FAQs Section */}
      <section id="news" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* News */}
            <div>
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Latest Updates</span>
              <h2 className="text-4xl font-serif text-slate-900 mb-10">TTO News</h2>
              <div className="space-y-6">
                {[
                  { date: "Oct 15, 2025", title: "NUST signs historic licensing agreement with Global Pharma Corp." },
                  { date: "Sep 28, 2025", title: "Tech One Incubator announces new cohort of deep-tech startups." },
                  { date: "Sep 10, 2025", title: "Revised IP Policy introduces better revenue sharing for inventors." }
                ].map((news, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="text-blue-700 font-black text-xs uppercase tracking-widest w-24 shrink-0 mt-1">{news.date}</div>
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">{news.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Knowledge Base</span>
              <h2 className="text-4xl font-serif text-slate-900 mb-10">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    >
                      <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                      {openFaq === i ? <Minus size={18} className="text-blue-600 shrink-0" /> : <Plus size={18} className="text-slate-400 shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
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
          </div>
        </div>
      </section>

    


    </div>
  );
};

export default TTOPortal;