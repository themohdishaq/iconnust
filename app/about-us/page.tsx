"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Activity,
  ArrowUpRight,
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
    tag: "CAC",
    name: "Corporate Advisory Council",
    description:
      "The Corporate Advisory Council is emerging as a pacemaker of Pakistan's micro-economy, forging alliances with large industrial giants, multinational companies, and SMEs alike. It continuously exchanges support with its industry partners, operating on a triple-helix model of Academia, Industry, and Government — engaging in advisory work, consultation, and joint R&D collaboration.",
    image: "#",
  },
  {
    tag: "NIPO",
    name: "NUST Intellectual Property Office",
    description:
      "Offering IP services since 2008 — initially dedicated to TIC incubatees — NIPO was formally established in February 2011 at NUST's Centre for Innovation and Entrepreneurship, H-12, Islamabad. The office evaluates inventions for commercial potential and facilitates the drafting and filing of intellectual property applications on behalf of NUST researchers.",
    image: "#",
  },
  {
    tag: "TTO",
    name: "Technology Transfer Office",
    description:
      "Being cognizant of the significant role that universities play in the knowledge economy, NUST established its Technology Transfer Office in 2011. The office is responsible for transferring knowledge and translating scientific results into real-world innovation — building entrepreneurial spirit, organising the transfer of new technological approaches, and arranging early-stage financing for transfer projects. It works to place NUST's own innovations into local industry, maintaining a clear path from research to commercial exploitation.",
    image: "/main-pic/TTO_team.jpg",
    link: "#",
  },
  {
    tag: "BDO",
    name: "Business Development Office",
    description:
      "The Business Development Office (BDO) was established at RIC NUST in 2021 as a focal point for providing guidance and support to NUST constituent institutions and faculty members in activities related to industrial and consultancy projects with industries through tender-based business opportunities. BDO identifies and tracks strategic tender opportunities, facilitates collaboration between industry and NUST faculty, evaluates proposals, coordinates joint ventures and consortia, and supports the approval, negotiation, and execution of agreements. The office also works to strengthen industrial linkages and create commercial opportunities for NUST professors, students, spinoffs, and startups.",
    image: "/main-pic/BDO_team.jpg",
    link: "#",
  },
]

function About() {
  return (
    <main className="relative overflow-hidden bg-white font-sans text-[#003B70]">
      <section className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#003B70] sm:min-h-[580px]">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 -z-20 bg-[url('/main-pic/BDO_team.jpg')] bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#003B70] via-[#003B70]/92 to-[#003B70]/55" />
        <div className="absolute -right-20 top-12 h-72 w-72 rounded-full border border-white/15 sm:h-96 sm:w-96" />
        <div className="absolute -right-4 top-28 h-48 w-48 rounded-full border border-[#FCAF17]/50 sm:h-64 sm:w-64" />

        <div className="relative z-10 mx-auto w-full max-w-8xl px-5 pb-8 sm:px-8">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">
              <span className="h-px w-10 bg-[#FCAF17]" />
              <Activity size={14} />
              <span>About ICON</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-tahoma-font text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Towards
              <span className="mt-2 block text-[#FCAF17]">a tech-driven future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              We connect researchers, industry leaders, and entrepreneurs to transform ideas into meaningful impact through partnerships, intellectual property support, and collaborative innovation.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#constituent-offices" className="group inline-flex w-full items-center justify-center gap-3 bg-[#FCAF17] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#003B70] shadow-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto">
                Explore Our Offices
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#FCAF17]" />
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUpView}>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">Overview</span>
              <h2 className="font-tahoma-font text-3xl font-bold leading-tight tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">
                Connecting research with opportunity
              </h2>
              <div className="mt-8 inline-flex items-end gap-4 border-l-4 border-[#FCAF17] bg-[#003B70] px-6 py-5 text-white shadow-xl">
                <span className="font-tahoma-font text-4xl font-bold text-[#FCAF17] sm:text-5xl">900+</span>
                <span className="pb-1 text-[10px] font-bold uppercase leading-5 tracking-[0.18em] text-white/70">Industry<br />partners</span>
              </div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUpView} className="border-t border-[#003B70]/15 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-base leading-8 text-[#003B70]/75 sm:text-lg">
                ICON brings NUST&apos;s research and innovation together and translates those strengths into practical value for industry. Our relationships span SMEs, multinational companies, major national firms, public-sector organisations, and non-profit partners.
              </p>
              <p className="mt-5 text-base leading-8 text-[#003B70]/75 sm:text-lg">
                Partners gain access to advanced research infrastructure, innovative ideas, world-class researchers, and talented students—creating shared value while supporting Pakistan&apos;s technological, social, and economic progress.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {['Research Access', 'Industry Partnerships', 'Commercial Impact'].map((item) => (
                  <div key={item} className="border border-[#003B70]/15 bg-[#003B70]/[0.035] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#003B70]">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="constituent-offices" className="scroll-mt-20 bg-[#003B70]/[0.035] py-8">
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 max-w-3xl sm:mb-14">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">The ICON Structure</span>
            <h2 className="font-tahoma-font text-3xl font-bold leading-tight tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">Constituent Offices</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#003B70]/70">
              Four specialist offices work together to connect industry, protect ideas, transfer technology, and develop commercial opportunities.
            </p>
          </motion.div>

          <div className="space-y-6 lg:space-y-8">
            {departments.map((department, index) => {
              const isAlternatingRight = index % 2 !== 0;

              return (
                <motion.article
                  key={department.tag}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="grid overflow-hidden border border-[#003B70]/15 bg-white shadow-[0_20px_60px_rgba(0,59,112,0.08)] transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(0,59,112,0.14)] md:grid-cols-2"
                >
                  <div className={`relative min-h-[260px] overflow-hidden bg-[#003B70] sm:min-h-[340px] lg:min-h-[430px] ${isAlternatingRight ? 'md:order-2' : 'md:order-1'}`}>
                      <Image
                        src={department.image}
                        alt={department.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003B70]/65 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 bg-[#FCAF17] px-5 py-3 font-tahoma-font text-sm font-bold text-[#003B70]">{String(index + 1).padStart(2, '0')}</div>
                  </div>

                  <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-12 ${isAlternatingRight ? 'md:order-1' : 'md:order-2'}`}>
                    <span className="mb-5 inline-flex w-fit items-center bg-[#003B70] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FCAF17]">
                      {department.tag}
                    </span>
                    <h3 className="font-tahoma-font text-2xl font-bold leading-snug tracking-tight text-[#003B70] sm:text-3xl">
                      {department.name}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-[#003B70]/70 sm:text-base">
                      {department.description}
                    </p>
                    {department.link !== '#' && (
                      <Link
                        href={department.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex w-fit items-center gap-2 border-b-2 border-[#FCAF17] pb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#003B70] transition-colors hover:text-[#003B70]/65"
                      >
                        Visit Office Website
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
