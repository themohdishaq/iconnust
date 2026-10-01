"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInquiryForm } from '@/lib/useInquiryForm';
import {
  ChevronRight,
  Activity,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Link from 'next/link';

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


export function InnovationHero() {
  return (
<section className="relative py-8  overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('/industry-services/rnd.jpg')] bg-contain bg-no-repeat bg-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-transparent" />

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] my-2">
              <Activity size={14} />
              <span>ICON Innovation & Collaboration</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-serif text-white my-4 leading-[1.1]">
              Transform Invention into <div className=" sm:py-4 text-[#FCAF17]">Innovation</div>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-12 font-light">
              We help you legally protect your innovations. Drive breakthrough research through seamless IP filing,multi-disciplinary research clusters with industry partners to co-create solutions and maximizing your potential to change the world tomorrow.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="#propose-colloboration" className="bg-[#FCAF17] text-[#0A2A40] px-8 py-4 font-black text-xs uppercase tracking-[0.2em]  transition-colors shadow-lg shadow-blue-900/50">
                Propose a Collaboration
              </Link>
              
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30 z-0" />
      </section>
  );
}

export function InnovationImpact({ stats, ipBreakdown, ipsFiled, ipsAwarded }: { stats: StatTileEntry[]; ipBreakdown: IpBreakdownEntry[]; ipsFiled: IpYearlyEntry[]; ipsAwarded: IpYearlyEntry[] }) {
  const pieGradientId = React.useId();
  const [chartsInView, setChartsInView] = React.useState(false);
  const totalIPFiled = ipBreakdown.reduce((sum, d) => sum + d.value, 0);
  const ipsFiledDataWithTotal = withTotal(ipsFiled);
  const ipsAwardedDataWithTotal = withTotal(ipsAwarded);
  const filedByYear = new Map(ipsFiledDataWithTotal.map((row) => [row.year, row.total]));
  const awardedByYear = new Map(ipsAwardedDataWithTotal.map((row) => [row.year, row.total]));
  const ttoTrend = Array.from(new Set([...filedByYear.keys(), ...awardedByYear.keys()]))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((year) => ({ year, filed: filedByYear.get(year) ?? 0, awarded: awardedByYear.get(year) ?? 0 }));


  return (
<section id="our-impact" className="bg-[#003B70]/[0.035] py-8">
        <div className="mx-auto max-w-8xl px-5 ">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end"
          >
            <div className="max-w-8xl">
              <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">
                From Research to <span className="text-[#FCAF17]">Real-World Impact</span>
              </h2>
              <p className="mt-5 max-w-8xl text-base leading-7 text-[#003B70]">
                Before any commercialisation pathway can be pursued, ICON assists inventors in formally disclosing, evaluating, and protecting their intellectual property through national and international patent filings, design registrations, and trade secret strategies.
              </p>
              <ul className="mt-4 max-w-8xl list-disc space-y-2 pl-5 text-sm leading-6 text-[#003B70] marker:text-[#FCAF17]">
                <li>Invention Disclosure Form (IDF) submission and review</li>
                <li>Patentability assessment and prior art search</li>
                <li>National (IPO Pakistan) and international filings (PCT)</li>
                <li>Drafting and filing of patent, industrial design, copyright and trade mark applications</li>
              </ul>
            </div>
            
          </motion.div>

          <h3 className="mb-5 font-tahoma-font text-2xl font-bold text-[#003B70] sm:text-3xl">Intellectual property progression</h3>

          {stats.length > 0 && (
            <div className="mb-8 grid grid-cols-2 overflow-hidden border border-[#003B70]/15 bg-[#003B70] sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="border-b border-white/15 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:p-6"
                >
                  <div className="font-tahoma-font text-3xl font-bold text-[#FCAF17] sm:text-4xl">{stat.value.toLocaleString('en-US')}</div>
                  <div className="mt-2 text-[10px] font-bold  tracking-[0.18em] text-white">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid gap-10 lg:gap-14">
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              onViewportEnter={() => setChartsInView(true)}
              className="border border-[#003B70]/15 bg-white p-5 shadow-[0_24px_70px_rgba(0,59,112,0.12)] sm:p-7"
            >
              <div className="mt-7 grid gap-7 border-t border-[#003B70]/15 pt-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-8">
                {ipBreakdown.length > 0 && (
                  <section aria-labelledby="filed-ip-chart-heading" className="min-w-0">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#003B70]/55">Portfolio mix</span>
                        <h4 id="filed-ip-chart-heading" className="mt-1 font-tahoma-font text-sm font-bold text-[#003B70]">Filed IP portfolio</h4>
                      </div>
                      <span className="text-xs font-semibold text-[#003B70]/65">{totalIPFiled.toLocaleString('en-US')} total</span>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(128px,0.85fr)] sm:gap-3">
                      <div className="h-[210px] min-w-0 sm:h-[240px]">
                        {chartsInView && (
                          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 360, height: 240 }}>
                            <PieChart>
                              <defs>
                                {ipBreakdown.map((entry, index) => (
                                  <linearGradient key={entry.name} id={`${pieGradientId}-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={entry.color || '#003B70'} stopOpacity={0.7} />
                                    <stop offset="55%" stopColor={entry.color || '#003B70'} />
                                    <stop offset="100%" stopColor={entry.color || '#003B70'} />
                                  </linearGradient>
                                ))}
                              </defs>
                              <Tooltip contentStyle={{ border: '1px solid rgba(0,59,112,.15)', boxShadow: '0 12px 30px rgba(0,59,112,.12)', color: '#003B70' }} />
                              <Pie
                                data={ipBreakdown}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="52%"
                                outerRadius="78%"
                                paddingAngle={5}
                                cornerRadius={3}
                                stroke="#fff"
                                strokeWidth={3}
                                tooltipType="none"
                                rootTabIndex={-1}
                                style={{ pointerEvents: 'none', filter: 'drop-shadow(0 7px 5px rgba(0,59,112,0.18))' }}
                                isAnimationActive
                                animationBegin={120}
                                animationDuration={950}
                                animationEasing="ease-out"
                              >
                                {ipBreakdown.map((entry) => <Cell key={`depth-${entry.name}`} fill={entry.color || '#003B70'} style={{ filter: 'brightness(0.65)' }} />)}
                              </Pie>
                              <Pie
                                data={ipBreakdown}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="46%"
                                outerRadius="78%"
                                paddingAngle={5}
                                cornerRadius={3}
                                stroke="#fff"
                                strokeWidth={4}
                                isAnimationActive
                                animationBegin={120}
                                animationDuration={950}
                                animationEasing="ease-out"
                              >
                                {ipBreakdown.map((entry, index) => <Cell key={entry.name} fill={`url(#${pieGradientId}-${index})`} />)}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                      <div className="grid grid-cols-1 content-center gap-x-3 gap-y-2 sm:pl-1">
                      {ipBreakdown.map((entry) => (
                        <div key={entry.name} className="flex min-w-0 items-center gap-2 text-[10px] text-[#385572]">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color || '#003B70' }} />
                          <span className="truncate">{entry.name}</span>
                          <span className="ml-auto font-semibold tabular-nums text-[#003B70]">{entry.value.toLocaleString('en-US')}</span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </section>
                )}

                <section aria-labelledby="ip-activity-chart-heading" className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#003B70]/55">Yearly trend</span>
                      <h4 id="ip-activity-chart-heading" className="mt-1 font-tahoma-font text-sm font-bold text-[#003B70]">IP filing activity</h4>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-[#003B70]/65">
                      <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#003B70]" /> Filed</span>
                      <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#FCAF17]" /> Awarded</span>
                    </div>
                  </div>
                  <div className="h-[250px] min-w-0 sm:h-[285px]">
                    {chartsInView && (
                      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 520, height: 285 }}>
                        <BarChart data={ttoTrend} margin={{ top: 12, right: 12, left: -18, bottom: 0 }} barGap={4}>
                          <CartesianGrid stroke="#003B70" strokeOpacity={0.1} vertical={false} />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#003B70', fontSize: 10, fontWeight: 600 }} />
                          <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fill: '#003B70', fontSize: 10 }} />
                          <Tooltip contentStyle={{ border: '1px solid rgba(0,59,112,.15)', boxShadow: '0 12px 30px rgba(0,59,112,.12)', color: '#003B70' }} />
                          <Bar dataKey="filed" name="IP Filed" fill="#003B70" radius={[4, 4, 0, 0]} isAnimationActive animationBegin={180} animationDuration={1000} animationEasing="ease-out" />
                          <Bar dataKey="awarded" name="IP Awarded" fill="#FCAF17" radius={[4, 4, 0, 0]} isAnimationActive animationBegin={260} animationDuration={1000} animationEasing="ease-out" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </section>
              </div>
            </motion.aside>
          </div>


        </div>
      </section>
  );
}



export function CollaborationInquiry() {
  const { values, setField, status, error, handleSubmit } = useInquiryForm('innovation-collaboration');
  return (
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
  );
}
