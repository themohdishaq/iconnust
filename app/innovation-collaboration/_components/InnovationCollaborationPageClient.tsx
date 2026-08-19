"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInquiryForm } from '@/lib/useInquiryForm';
import {
  ChevronRight,
  Activity,
  ArrowRight,
  Lightbulb,
  Search,
  ShieldCheck,
  Handshake,
  FileCheck2,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Link from 'next/link';
import Image from 'next/image';
import FaqSection, { type FaqItem } from '@/components/FaqSection';

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

type IpBreakdownEntry = { name: string; value: number; color: string };
type IpYearlyEntry = { year: string; industrialDesign: number; copyright: number; patents: number; trademark: number };
type StatTileEntry = { label: string; value: number };

const ttoStories = [
  {
    title: 'Invention Disclosure',
    category: 'Discover',
    description: 'Capture promising university inventions early through a confidential, structured review.',
    image: '/industry-services/rnd.jpg',
    icon: Lightbulb,
  },
  {
    title: 'Market & Prior-Art Review',
    category: 'Assess',
    description: 'Evaluate novelty, commercial relevance, and the strongest route to real-world adoption.',
    image: '/industry-services/consultancy.jpg',
    icon: Search,
  },
  {
    title: 'Intellectual Property Protection',
    category: 'Protect',
    description: 'Coordinate patents, designs, copyright, and trademark protection around the innovation.',
    image: '/industry-services/patentwall.jpg',
    icon: ShieldCheck,
  },
  {
    title: 'Industry Matchmaking',
    category: 'Connect',
    description: 'Position technologies for relevant companies, investors, and development partners.',
    image: '/industry-services/expertconsultancy.jpg',
    icon: Handshake,
  },
  {
    title: 'Licensing & Agreements',
    category: 'Transfer',
    description: 'Structure practical licensing terms that protect NUST, inventors, and industry partners.',
    image: '/industry-services/facultybuilding.jpg',
    icon: FileCheck2,
  },
  {
    title: 'Spin-off & Market Launch',
    category: 'Scale',
    description: 'Support venture formation and the transition from a validated technology to market impact.',
    image: '/industry-services/spinoffnust.jpg',
    icon: Rocket,
  },
];

// Precompute totals for the labels shown above each stacked bar
const withTotal = (rows: IpYearlyEntry[]) =>
  rows.map((d) => ({
    ...d,
    total: d.industrialDesign + d.copyright + d.patents + d.trademark,
  }));

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

const RndPortal = ({
  stats,
  ipBreakdown,
  ipsFiled,
  ipsAwarded,
  faqs,
}: {
  stats: StatTileEntry[];
  ipBreakdown: IpBreakdownEntry[];
  ipsFiled: IpYearlyEntry[];
  ipsAwarded: IpYearlyEntry[];
  faqs: FaqItem[];
}) => {
  const { values, setField, status, error, handleSubmit } = useInquiryForm('innovation-collaboration');

  const totalIPFiled = ipBreakdown.reduce((sum, d) => sum + d.value, 0);
  const ipsFiledDataWithTotal = withTotal(ipsFiled);
  const ipsAwardedDataWithTotal = withTotal(ipsAwarded);
  const totalIPAwarded = ipsAwardedDataWithTotal.reduce((sum, row) => sum + row.total, 0);
  const filedByYear = new Map(ipsFiledDataWithTotal.map((row) => [row.year, row.total]));
  const awardedByYear = new Map(ipsAwardedDataWithTotal.map((row) => [row.year, row.total]));
  const ttoTrend = Array.from(new Set([...filedByYear.keys(), ...awardedByYear.keys()]))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((year) => ({ year, filed: filedByYear.get(year) ?? 0, awarded: awardedByYear.get(year) ?? 0 }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative py-8  bg-slate-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('/industry-services/rnd.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-700 to-transparent" />

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] my-2">
              <Activity size={14} />
              <span>ICON Innovation & Collaboration</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-serif text-white my-4 leading-[1.1]">
              Transform Invention into <div className=" sm:py-4 text-[#C9962A]">Innovation</div>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-12 font-light">
              We help you legally protect your innovations. Drive breakthrough research through seamless IP filing,multi-disciplinary research clusters with industry partners to co-create solutions and maximizing your potential to change the world tomorrow.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="#propose-colloboration" className="bg-[#C9962A] text-[#0A2A40] px-8 py-4 font-black text-xs uppercase tracking-[0.2em]  transition-colors shadow-lg shadow-blue-900/50">
                Propose a Collaboration
              </Link>
              
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30 z-0" />
      </section>

      {/* TTO impact visualization: inspired by the supplied research-to-reality reference. */}
      <section id="our-impact" className="bg-[#003B70]/[0.035] py-8">
        <div className="mx-auto max-w-8xl px-5 ">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end"
          >
            <div className="max-w-3xl">
              <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">
                From Research to <span className="text-[#FCAF17]">Real-World Impact</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#003B70]/70">
                TTO helps university discoveries move through assessment, protection, industry connection, licensing, and venture creation in one coordinated pathway.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-3 border-l-2 border-[#FCAF17] bg-white px-5 py-4 text-sm font-semibold text-[#003B70] shadow-sm">
              <TrendingUp size={20} className="text-[#FCAF17]" />
              Current live metrics
            </div>
          </motion.div>

          {stats.length > 0 && (
            <div className={`mb-8 grid overflow-hidden border border-[#003B70]/15 bg-[#003B70]/80 ${stats.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="border-b border-white/15 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:p-7"
                >
                  <div className="font-tahoma-font text-3xl font-bold text-[#FCAF17] sm:text-4xl">{stat.value.toLocaleString('en-US')}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid gap-10 lg:gap-14">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FCAF17]">What TTO Moves Forward</span>
                  <h3 className="mt-2 font-tahoma-font text-2xl font-bold text-[#003B70]">A connected commercialization portfolio</h3>
                </div>
                <span className="hidden text-xs font-semibold text-[#003B70]/55 sm:block">Six coordinated services</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ttoStories.map((story, index) => {
                  const Icon = story.icon;
                  return (
                    <motion.article
                      key={story.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group relative min-h-[230px] overflow-hidden bg-[#003B70] shadow-lg"
                    >
                      <Image src={story.image} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003B70] via-[#003B70]/75 to-[#003B70]/15" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="bg-[#FCAF17] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#003B70]">{story.category}</span>
                          <Icon size={19} className="text-[#FCAF17]" />
                        </div>
                        <h4 className="font-tahoma-font text-base font-bold leading-snug text-white">{story.title}</h4>
                        <p className="mt-2 text-xs leading-5 text-white/70">{story.description}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="border border-[#003B70]/15 bg-white p-5 shadow-[0_24px_70px_rgba(0,59,112,0.12)] sm:p-7"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FCAF17]">TTO Performance</span>
              <h3 className="mt-2 font-tahoma-font text-2xl font-bold text-[#003B70]">Intellectual property progression</h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-[#003B70] p-5 text-white">
                  <div className="font-tahoma-font text-3xl font-bold text-[#FCAF17]">{totalIPFiled.toLocaleString('en-US')}</div>
                  <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">Total IP Filed</div>
                </div>
                <div className="border border-[#003B70]/20 bg-[#FCAF17] p-5 text-[#003B70]">
                  <div className="font-tahoma-font text-3xl font-bold">{totalIPAwarded.toLocaleString('en-US')}</div>
                  <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#003B70]/70">Total IP Awarded</div>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h4 className="font-tahoma-font text-sm font-bold text-[#003B70]">Year-on-year IP activity</h4>
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-[#003B70]/65">
                    <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 bg-[#003B70]" /> Filed</span>
                    <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 bg-[#FCAF17]" /> Awarded</span>
                  </div>
                </div>
                <div className="h-[285px] min-w-0">
                  <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 520, height: 285 }}>
                    <BarChart data={ttoTrend} margin={{ top: 10, right: 4, left: -24, bottom: 0 }} barGap={4}>
                      <CartesianGrid stroke="#003B70" strokeOpacity={0.1} vertical={false} />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#003B70', fontSize: 10, fontWeight: 600 }} />
                      <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fill: '#003B70', fontSize: 10 }} />
                      <Tooltip cursor={{ fill: '#003B70', opacity: 0.04 }} contentStyle={{ border: '1px solid rgba(0,59,112,.15)', boxShadow: '0 12px 30px rgba(0,59,112,.12)', color: '#003B70' }} />
                      <Bar dataKey="filed" name="IP Filed" fill="#003B70" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="awarded" name="IP Awarded" fill="#FCAF17" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {ipBreakdown.length > 0 && (
                <div className="mt-6 border-t border-[#003B70]/15 pt-5">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003B70]/60">Filed IP portfolio</div>
                  <div className="grid gap-2.5">
                    {ipBreakdown.map((entry) => {
                      const share = totalIPFiled > 0 ? (entry.value / totalIPFiled) * 100 : 0;
                      return (
                        <div key={entry.name}>
                          <div className="mb-1 flex justify-between gap-3 text-[11px] font-semibold text-[#003B70]">
                            <span>{entry.name}</span><span>{entry.value}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden bg-[#003B70]/10"><div className="h-full bg-[#FCAF17]" style={{ width: `${share}%` }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>

          <div className="mt-8 overflow-hidden bg-[#003B70] p-6 sm:p-8">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FCAF17]">The TTO Pathway</span>
                <h3 className="mt-2 font-tahoma-font text-2xl font-bold text-white">One clear route from idea to impact</h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/65">Each stage reduces uncertainty and prepares the technology for its next commercial decision.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {ttoStories.map((story, index) => (
                <motion.div key={story.category} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="relative border border-white/15 bg-white/[0.06] p-4">
                  <span className="font-tahoma-font text-xs font-bold text-[#FCAF17]">{String(index + 1).padStart(2, '0')}</span>
                  <div className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-white">{story.category}</div>
                  {index < ttoStories.length - 1 && <ArrowRight size={15} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-[#FCAF17] lg:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media & Video Hub */}
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

      {/* Engagement CTA */}
      <section id="propose-colloboration" className="py-16 bg-[#062539] text-white relative ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="max-w-8xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8  text-center md:text-left">
              {/* Left: heading */}
              <div>
                <h2 className="text-4xl  font-serif mb-4 md:mb-6 leading-tight">Ready to solve your industry bottleneck?</h2>
                <p className="text-md  text-blue-200 font-light mb-6 md:mb-12 max-w-xl mx-auto md:mx-0">
                  Initiate a sponsored research project today. Our dedicated program managers will match your challenge with the right faculty experts and laboratory infrastructure.
                </p>
              </div>

              {/* Right: form */}
              <div>
                <form onSubmit={handleSubmit} className=" md:p-8 rounded-none   text-left">
                  <input type="text" name="website" value={values.website} onChange={setField('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute w-px h-px overflow-hidden opacity-0" style={{ clip: 'rect(0,0,0,0)' }} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="company" className="text-[10px] font-black uppercase tracking-widest text-blue-300">Company Name</label>
                      <input id="company" name="company" type="text" required placeholder="Acme Corp" value={values.organization} onChange={setField('organization')} className="mt-2 bg-transparent text-white placeholder:text-blue-200 border-b border-white/30 py-2 focus:border-white outline-none transition-colors" />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-blue-300">Email</label>
                      <input id="email" name="email" type="email" required placeholder="name@company.com" value={values.email} onChange={setField('email')} className="mt-2 bg-transparent text-white placeholder:text-blue-200 border-b border-white/30 py-2 focus:border-white outline-none transition-colors" />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="domain" className="text-[10px] font-black uppercase tracking-widest text-blue-300">Technical Domain</label>
                      <select id="domain" name="domain" value={values.domain} onChange={setField('domain')} className="mt-2 bg-transparent text-white border-b border-white/30 py-2 focus:border-white outline-none transition-colors appearance-none">
                        <option value="" className="text-slate-900">Select Area of Interest...</option>
                        <option value="manufacturing" className="text-slate-900">Manufacturing & Automation</option>
                        <option value="materials" className="text-slate-900">Material Sciences</option>
                        <option value="software" className="text-slate-900">Software & AI</option>
                      </select>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="challenge" className="text-[10px] font-black uppercase tracking-widest text-blue-300">Brief Description of the Challenge</label>
                      <textarea id="challenge" name="challenge" rows={3} placeholder="Describe your challenge..." value={values.message} onChange={setField('message')} className="mt-2 bg-transparent text-white placeholder:text-blue-200 border-b border-white/30 py-2 focus:border-white outline-none transition-colors resize-none"></textarea>
                    </div>

                    <div className="md:col-span-2 pt-2 space-y-3">
                      {status === 'success' && (
                        <p className="text-emerald-400 text-sm font-medium">Thank you — your inquiry has been received. Our team will be in touch shortly.</p>
                      )}
                      {status === 'error' && (
                        <p className="text-red-400 text-sm font-medium">{error}</p>
                      )}
                      <button type="submit" disabled={status === 'submitting'} className="w-full py-3 bg-[#C9962A] text-[#0A2A40] md:py-4 font-black text-sm uppercase tracking-[0.12em] hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-60">
                        {status === 'submitting' ? 'Submitting…' : 'Submit Research Inquiry'} <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default RndPortal;
