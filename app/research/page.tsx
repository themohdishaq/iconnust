"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  FlaskConical, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  ChevronRight,
  Download,
  Calendar,
  FileText,
  Activity,
  ArrowRight,
  Award,
  Microscope
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

// --- YouTube Video Data ---
// To update videos: Go to https://www.youtube.com/@Research_NUST
// Click on any video, copy the video ID from the URL (after 'v=')
// Example: https://www.youtube.com/watch?v=VIDEO_ID_HERE
const researchVideos = {
  featured: {
    videoId: "dQw4w9WgXcQ", // Replace with actual featured video ID
    title: "NUST Research Breakthroughs & Innovations",
    description: "Explore cutting-edge research projects and technological advancements from NUST's Research Directorate."
  },
  sidebar: [
    {
      title: "AI Research at NUST",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "15:30",
      views: "2.1K views",
      date: "2 days ago"
    },
    {
      title: "Biotechnology Lab Tour",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "12:45",
      views: "1.8K views",
      date: "1 week ago"
    },
    {
      title: "Sustainable Energy Solutions",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "18:20",
      views: "3.2K views",
      date: "2 weeks ago"
    },
    {
      title: "Advanced Materials Research",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "22:15",
      views: "1.5K views",
      date: "3 weeks ago"
    },
    {
      title: "NUST Innovation Showcase",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "25:40",
      views: "4.2K views",
      date: "1 month ago"
    },
    {
      title: "Research Collaboration Highlights",
      videoId: "dQw4w9WgXcQ", // Replace with actual video ID
      duration: "14:55",
      views: "2.8K views",
      date: "6 weeks ago"
    }
  ]
};
const fundingData = [
  { year: '2020', funding: 420, projects: 120 },
  { year: '2021', funding: 580, projects: 155 },
  { year: '2022', funding: 750, projects: 198 },
  { year: '2023', funding: 980, projects: 250 },
  { year: '2024', funding: 1350, projects: 310 },
  { year: '2025', funding: 1800, projects: 405 },
];

const domainData = [
  { name: 'AI & Robotics', value: 35 },
  { name: 'Energy & Environment', value: 25 },
  { name: 'Health & Biotech', value: 20 },
  { name: 'Advanced Materials', value: 15 },
  { name: 'Defense Systems', value: 5 },
];
const COLORS = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#1e40af'];

const publicationData = [
  { name: 'Q1', papers: 320, citations: 1200 },
  { name: 'Q2', papers: 450, citations: 1800 },
  { name: 'Q3', papers: 510, citations: 2400 },
  { name: 'Q4', papers: 680, citations: 3100 },
];

// --- Animation Variants ---
const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const RndPortal = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
    

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.4 }} 
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Activity size={14} />
              <span>Research Directorate</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]">
              Custom R&D to Solve <span className="italic text-blue-400">Industrial Bottlenecks</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed mb-12 font-light">
              We align NUST's world-class faculty, 300+ advanced laboratories, and multi-disciplinary research clusters with the immediate technical challenges of our corporate partners.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">
                Submit a Challenge
              </button>
              <button className="bg-white/10 text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center">
                <Play size={14} className="mr-2" /> Watch Capabilities
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30 z-0" />
      </section>

      {/* Analytics Dashboard (Charts & Graphs) */}
      <section id="analytics" className="py-24 bg-white relative -mt-16 z-20 rounded-t-3xl shadow-2xl mx-4 lg:mx-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-2">Research Impact Metrics</h2>
            <p className="text-slate-500 text-sm">Real-time data visualization of NUST R&D throughput and funding trajectories.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Chart 1: Funding Growth (Area Chart) */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6">Sponsored Research Funding Growth (Million PKR)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="funding" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorFunding)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 2: Research Domains (Donut Chart) */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6">Active Projects by Domain</h3>
              <div className="h-[250px] w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={domainData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {domainData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div className="mt-4 grid grid-cols-2 gap-y-2">
                {domainData.map((entry, index) => (
                  <div key={index} className="flex items-center text-[10px] font-bold text-slate-600">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    {entry.name} ({entry.value}%)
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Chart 3: Mini Bar Chart for Publications */}
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mt-12">
            <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
               <div className="mb-6 md:mb-0 md:mr-12">
                 <h3 className="text-2xl font-serif text-white mb-2">High-Impact Publications</h3>
                 <p className="text-slate-400 text-sm max-w-sm">Quarterly breakdown of Q1-tier academic papers and global citations stemming from sponsored research.</p>
               </div>
               <div className="h-[150px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={publicationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#fff', borderRadius: '4px' }} />
                    <Bar dataKey="papers" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media & Video Hub */}
      <section id="media-hub" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Research Videos</span>
              <h2 className="text-4xl font-serif text-slate-900">Latest from Research_NUST</h2>
            </div>
            <a href="https://www.youtube.com/@Research_NUST" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-widest hover:underline">
              <span>Visit YouTube Channel</span> <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Featured Video */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={slideInLeft} className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
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
              <div className="mt-6">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Featured</span>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">{researchVideos.featured.title}</h3>
                <p className="text-slate-600 text-sm">{researchVideos.featured.description}</p>
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

      {/* Areas of Expertise */}
      <section id="capabilities" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">Core Research Strengths</h2>
            <p className="text-slate-500">Multidisciplinary clusters designed to tackle the 21st century's most pressing industrial and societal challenges.</p>
          </div>

          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI & Autonomous Systems', icon: <Cpu />, desc: 'Machine learning, swarm robotics, and predictive modeling for manufacturing.' },
              { title: 'Health & Biotechnology', icon: <Microscope />, desc: 'Genomics, bioinformatics, and advanced medical diagnostics development.' },
              { title: 'Energy & Sustainability', icon: <Globe />, desc: 'Renewable microgrids, water purification tech, and climate modeling.' },
              { title: 'Advanced Materials', icon: <ShieldCheck />, desc: 'Nanotechnology, smart polymers, and aerospace-grade structural composites.' }
            ].map((area, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:bg-blue-900 hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-800 group-hover:text-white transition-colors">
                  {React.cloneElement(area.icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-serif mb-3 font-medium text-slate-900 group-hover:text-white">{area.title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 leading-relaxed mb-6">
                  {area.desc}
                </p>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:text-blue-300 flex items-center mt-auto">
                  View Labs & Projects <ArrowRight size={12} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engagement CTA */}
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

    
    </div>
  );
};

export default RndPortal;