"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { 
  AreaChart, Area
} from 'recharts';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// --- YouTube Video Data ---
// To update videos: Go to https://www.youtube.com/@Research_NUST
// Click on any video, copy the video ID from the URL (after 'v=')
// Example: https://www.youtube.com/watch?v=VIDEO_ID_HERE
const researchVideos = {
  featured: {
    videoId: "QtKVfRdgkJA", // Replace with actual featured video ID
    title: "Real Time Urban Microclimate Monitoring with AI & IoT",
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
// Patent domain breakdown (donut chart) — matches the reference exactly
const patentDomainData = [
  { name: "Biomedical, Healthcare & Life Sciences", value: 11, color: "#3b82f6" },
  { name: "Computer Science", value: 8, color: "#5eead4" },
  { name: "Mechanical, Manufacturing & Robotics", value: 6, color: "#bef264" },
  { name: "Energy, Environment & Sustainability", value: 5, color: "#fb923c" },
  { name: "Materials, Chemical & Nanotechnology", value: 5, color: "#fda4af" },
  { name: "Electrical, Electronics & Communications", value: 3, color: "#d8b4fe" },
  { name: "Aerospace & Defense", value: 2, color: "#a5b4fc" },
  { name: "Others", value: 3, color: "#bae6fd" },
];
 
const totalPatents = patentDomainData.reduce((sum, d) => sum + d.value, 0); // 43
 
// NIPO IP Rights Awarded Summary (2019–2025) — stacked bar chart
// Category colors match legend: Industrial Design (blue), Copyright (green), Patents (orange), Trademark (red)
const ipRightsData = [
  { year: "2019", industrialDesign: 38, copyright: 0, patents: 4, trademark: 4 },
  { year: "2020", industrialDesign: 25, copyright: 8, patents: 3, trademark: 3 },
  { year: "2021", industrialDesign: 8, copyright: 19, patents: 0, trademark: 0 },
  { year: "2022", industrialDesign: 7, copyright: 9, patents: 0, trademark: 0 },
  { year: "2023", industrialDesign: 12, copyright: 7, patents: 0, trademark: 0 },
  { year: "2024", industrialDesign: 8, copyright: 4, patents: 0, trademark: 0 },
  { year: "2025", industrialDesign: 2, copyright: 9, patents: 0, trademark: 0 },
];
 
// Precompute totals for the labels shown above each stacked bar
const ipRightsDataWithTotal = ipRightsData.map((d) => ({
  ...d,
  total: d.industrialDesign + d.copyright + d.patents + d.trademark,
}));
 
// const fadeUp = {
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };
 
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

const TotalLabel = ({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: string | number }) => {
  if (value == null) return null;
  return (
    <text
      x={x != null && width != null ? x + width / 2 : x}
      y={y != null ? y - 8 : 0}
      fill="#475569"
      textAnchor="middle"
      fontSize={12}
      fontWeight={600}
    >
      {value}
    </text>
  );
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const RndPortal = () => {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative py-20  bg-slate-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-700 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <Activity size={14} />
              <span>ICON Innovation & Collaboration</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]">
              Transform Your Invention into <span className="italic text-[#00558F]">Global Impact</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-300 leading-relaxed mb-12 font-light">
              We help you legally protect your innovations. Drive breakthrough research through seamless IP filing,multi-disciplinary research clusters with industry partners to co-create solutions and maximizing your potential to change the world tomorrow.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="bg-[#00558F] text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em]  transition-colors shadow-lg shadow-blue-900/50">
                Propose a Collaboration
              </button>
              
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30 z-0" />
      </section>

      {/* Analytics Dashboard (Charts & Graphs) */}
      
      <section id="our-impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
           <div className="mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-2">Innovation & Collaboration Metrics</h2>
            <p className="text-slate-500 text-sm">A snapshot of ICON's growing impact across collaborative projects, joint funding, and knowledge outputs.</p>
          </div>
 
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Stats + Donut */}
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            {/* Stat callouts */}
            <div className="flex flex-wrap gap-x-16 gap-y-6 mb-10">
              <div>
                <div className="text-5xl font-black text-red-600 leading-none mb-2">1,360+</div>
                <div className="text-sm font-semibold text-slate-800">IP Filings</div>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 leading-none mb-2">260</div>
                <div className="text-sm font-semibold text-slate-800">IPRs Awarded</div>
              </div>
            </div>
 
            {/* Donut chart + legend */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-[260px] h-[260px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patentDomainData}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={125}
                      paddingAngle={3}
                      cornerRadius={3}
                      dataKey="value"
                      stroke="#fff"
                      strokeWidth={3}
                      label={({ value }) => value}
                      labelLine={false}
                    >
                      {patentDomainData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any) => [String(value), String(name)]}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center total */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-slate-900">{totalPatents}</span>
                  <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">
                    Total Patents
                  </span>
                </div>
              </div>
 
              {/* Legend */}
              <div className="space-y-2">
                {patentDomainData.map((entry) => (
                  <div key={entry.name} className="flex items-center text-[13px] text-slate-700">
                    <span
                      className="w-3 h-3 rounded-full mr-2 shrink-0"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>
                      {entry.name} <span className="text-slate-500">({entry.value})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
 
          {/* RIGHT: Stacked Bar Chart */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white border border-slate-200 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-sm font-semibold text-slate-800 mb-2">
              NIPO - IP Rights Awarded Summary (2019-2025)
            </h3>
 
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ipRightsDataWithTotal} margin={{ top: 24, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "Year", position: "insideBottom", offset: -2, style: { fontSize: 11, fill: "#64748b" } }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{
                      value: "Number of IPs Awarded",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 11, fill: "#64748b", textAnchor: "middle" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    height={36}
                    iconType="square"
                    iconSize={10}
                    wrapperStyle={{ fontSize: 11, fontWeight: 600, color: "#475569" }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        industrialDesign: "Industrial Design",
                        copyright: "Copyright",
                        patents: "Patents",
                        trademark: "Trademark",
                      };
                      return labels[value] ?? value;
                    }}
                  />
                  <Bar dataKey="industrialDesign" stackId="ip" fill="#3b82f6" />
                  <Bar dataKey="copyright" stackId="ip" fill="#22c55e" />
                  <Bar dataKey="patents" stackId="ip" fill="#f97316" />
                  <Bar dataKey="trademark" stackId="ip" fill="#dc2626" radius={[3, 3, 0, 0]}>
                    <LabelList dataKey="total" content={<TotalLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Media & Video Hub */}
      <section id="media-hub" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Innovation Highlights</span>
              <h2 className="text-4xl font-serif text-slate-900">ICON in Action</h2>
            </div>
            <a href="https://www.youtube.com/@Research_NUST" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-widest hover:underline">
              <span>View All on YouTube</span> <ChevronRight size={16} />
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
                  {/* view full vides
                   */}
                  
                </motion.div>
              ))}

            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      {/* <section id="capabilities" className="py-24 bg-white">
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
      </section> */}

      {/* Engagement CTA */}
      <section id="initiate-project" className="py-16 bg-[#00558f] text-white relative overflow-hidden">
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
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-300">Email</label>
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