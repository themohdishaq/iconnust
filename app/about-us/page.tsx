"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  Users,
} from 'lucide-react'

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeUpView = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const departments = [
  {
    tag: "TTO",
    name: "Technology Transfer Office",
    description:
      "Being cognizant of the significant role that universities play in the knowledge economy, NUST established its Technology Transfer Office in 2011. The office is responsible for transferring knowledge and translating scientific results into real-world innovation — building entrepreneurial spirit, organising the transfer of new technological approaches, and arranging early-stage financing for transfer projects. It works to place NUST's own innovations into local industry, maintaining a clear path from research to commercial exploitation.",
    image: "/main-pic/niponust.jpg",
    link: "https://tto.nust.edu.pk/",
  },
  {
    tag: "CAC",
    name: "Corporate Advisory Council",
    description:
      "The Corporate Advisory Council is emerging as a pacemaker of Pakistan's micro-economy, forging alliances with large industrial giants, multinational companies, and SMEs alike. It continuously exchanges support with its industry partners, operating on a triple-helix model of Academia, Industry, and Government — engaging in advisory work, consultation, and joint R&D collaboration.",
    image: "/main-pic/cacnust.jpg",
    link: "https://cac.nust.edu.pk/",
  },
  {
    tag: "NIPO",
    name: "NUST Intellectual Property Office",
    description:
      "Offering IP services since 2008 — initially dedicated to TIC incubatees — NIPO was formally established in February 2011 at NUST's Centre for Innovation and Entrepreneurship, H-12, Islamabad. The office evaluates inventions for commercial potential and facilitates the drafting and filing of intellectual property applications on behalf of NUST researchers.",
    image: "/main-pic/niponust.jpg",
    link: "https://nipo.nust.edu.pk/",
  },
]

function About() {
  return (
    <main className="relative bg-slate-50">

      {/* Hero */}
      <section className="relative py-24 sm:py-28 bg-slate-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/inc-about.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-[#C9962A] font-bold text-[11px] uppercase tracking-[0.4em] mb-3">
              <Activity size={14} />
              <span>About ICON</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.08]">
              Driving innovation
              <span className="block text-[#C9962A]">for a better future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-300 leading-relaxed mt-6 max-w-xl font-light">
              We connect researchers, industry leaders, and entrepreneurs to transform ideas into meaningful impact — through partnerships, intellectual property support, and collaborative innovation that shape tomorrow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div >
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeUpView}
              className="lg:col-span-8"
            >
              <span className="text-[#0E5E97] font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
                Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-6 leading-tight">
                About the I&amp;C Directorate
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base">
                The role of the I&amp;C Directorate is to encapsulate NUST&rsquo;s research and intellectual
                property opportunities at the earliest stage, and to translate these benefits to industry.
                External relationships have grown into meaningful and lasting partnerships: more than 200+
                industry partners — SMEs, multinationals, large national firms, public-sector and non-profit
                organisations — work with our constituent offices on mutually beneficial initiatives. Our
                partners gain access to the university&rsquo;s state-of-the-art research infrastructure,
                innovative research, world-class researchers, and brilliant young students, creating value for
                the university and stakeholders alike, and impacting the technological, social, and economic
                progression of Pakistan.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base mt-4">
                The Directorate is also responsible for moving research results from the laboratory to the
                marketplace — staying closely attuned to university R&amp;D activity, R&amp;D disclosures, and
                market needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-16 max-w-2xl">
            <span className="text-[#0E5E97] font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
              Constituent Offices
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 leading-tight">
              Our Departments
            </h2>
          </div>

          <div className="space-y-8">
            {departments.map((department, index) => {
              const isAlternatingRight = index % 2 !== 0;

              return (
                <motion.div
                  key={department.tag}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUpView}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div className={`order-1 ${isAlternatingRight ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative ">
                      <img
                        src={department.image}
                        alt={department.name}
                        className="w-full h-full object-contain px-4"
                      />
                    </div>
                  </div>

                  <div className={`order-2 ${isAlternatingRight ? 'md:order-1' : 'md:order-2'}`}>
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-white bg-[#0A2D4A] px-3 py-1.5 mb-4">
                      {department.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-3 leading-snug">
                      {department.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                      {department.description}
                    </p>
                    <Link
                      href={department.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#0A2A40] hover:text-[#C9962A] font-bold text-xs uppercase tracking-widest mt-6 transition-colors group"
                    >
                      Visit Website
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  )
}

export default About