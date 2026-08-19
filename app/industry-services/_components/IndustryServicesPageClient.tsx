"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical, Briefcase, ShieldCheck, Users, ArrowRight,
  CheckCircle2, GraduationCap, TestTube, Mail
} from 'lucide-react';
import Image from 'next/image';
import { useInquiryForm } from '@/lib/useInquiryForm';
import Link from 'next/link';
import FaqSection, { type FaqItem } from '@/components/FaqSection';

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
      'Access to 447+ specialized labs and research centers',
      'Dedicated faculty PI matched to your domain',
      'Confidential project management end-to-end',
    ],
    img: '/industry-services/rnd.jpg',
  },
  {
    id: 'consultancy',
    icon: <Briefcase size={28} />,
    title: 'Expert Consultancy',
    tagline: 'Pakistan-based expertise on demand',
    description:
      'The ICON NUST facilitates short-term advisory engagements, technical audits, and regulatory support for industry clients.',
    bullets: [
      'Engineering & science domains covered',
      'Short-term and retainer-based engagement models',
      'Technical audits, feasibility reviews, and expert testimony',
      'Fast turnaround with NDA protection',
    ],
    img: '/industry-services/expertconsultancy.jpg',
  },
  {
    id: 'training',
    icon: <GraduationCap size={28} />,
    title: 'Upskilling and Capacity Building',
    tagline: 'Future-ready workforce development',
    description:
      'Launched in 2018, the NUST Faculty Placement Program enables faculty members to work closely with industry, fostering collaborative R&D, innovation, process improvement, and technology transfer while strengthening academia-industry partnerships.',
    bullets: [
      'Industry placements lasting from a few days to several weeks',
      'Creates opportunities for student projects, internships, jobs, and professional training',
      'Promotes collaborative R&D, innovation, and process improvement',
    ],
    img: '/capacity_building.jpeg',
  },
  {
    id: 'testing',
    icon: <TestTube size={28} />,
    title: 'Testing & Lab Services',
    tagline: 'Precision analysis, certified results',
    description:
      'Leverage NUST\'s ISO-certified laboratories for materials testing, product analysis, environmental monitoring, and calibration services. ',
    bullets: [
      'ISO/IEC 17025-accredited testing facilities',
      'Materials, chemical, environmental & structural analysis',
      'Rapid turnaround with detailed technical reports',
      'Confidential testing under strict NDA protocols',
    ],
    img: '/industry-services/labservices.jpg',
  },
];

const sectors = [
  'Digital, AI & Intelligent Systems',
  'Energy, Climate & Sustainability',
  'Health, Pharma & Biomedical Systems',
  'Agriculture & Food Systems',
  'Mobility & Automotive Systems',
  'Defence & Strategic Technologies',
  'Finance & Digital Economy',
  'Smart Infrastructure & Urban Systems',
  'Education, Society & Human Development',
  'Manufacturing & Industrial Technologies',
  'Chemicals & Advanced Materials',
  'Media, Creative & Digital Industries',
  'Tourism & Hospitality',
];

const engagementSteps = [
  { step: 1, title: 'Submit a Brief', desc: 'Describe your technical challenge, timeline, and budget via our online form or by contacting our Industry Desk.', icon: <Mail size={20} /> },
  { step: 2, title: 'Expert Matching', desc: 'ICON identifies the most suitable faculty leads, labs, or programs within 48 hours.', icon: <Users size={20} /> },
  { step: 3, title: 'Scope & Agreement', desc: 'Co-develop a project plan with clear deliverables, IP terms, and timelines.', icon: <ShieldCheck size={20} /> },
  { step: 4, title: 'Execute & Deliver', desc: 'ICON manages the project end-to-end and ensures timely, quality delivery.', icon: <CheckCircle2 size={20} /> },
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

export default function IndustryServicesPage({ faqs }: { faqs: FaqItem[] }) {
  const [activeService, setActiveService] = useState<string>('rd');
  const { values, setField, status, error, handleSubmit } = useInquiryForm('industry-services');

  const active = services.find((s) => s.id === activeService) ?? services[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#003B70]">
      <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#003B70] sm:min-h-[600px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/industry-services/icon-industry.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#003B70] via-[#003B70]/90 to-[#003B70]/45" />
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-white/15 sm:h-96 sm:w-96" />
        <div className="absolute -right-8 top-32 h-48 w-48 rounded-full border border-[#FCAF17]/50 sm:h-64 sm:w-64" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative mx-auto w-full max-w-8xl px-5  sm:px-8 lg:px-12 "
        >
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">
            <span className="h-px w-10 bg-[#FCAF17]" />
            Industry Services
          </motion.div>
          <motion.h1 variants={fadeUp} className="max-w-4xl font-tahoma-font text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Powering Industry Through
            <span className="mt-2 block text-[#FCAF17]">Academic Excellence</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            ICON bridges NUST&apos;s research capabilities with the evolving needs of Pakistan&apos;s industries through R&amp;D, expert consultancy, workforce training, and precision lab services.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#industry-brief"
              className="group inline-flex w-full items-center justify-center gap-3 bg-[#FCAF17] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#003B70] shadow-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
            >
              Submit an Industry Brief
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#services"
              className="inline-flex w-full items-center justify-center border border-white/50 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:border-[#FCAF17] hover:text-[#FCAF17] sm:w-auto"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#FCAF17]" />
      </section>

      <section id="services" className="scroll-mt-24 bg-white py-8 ">
        <div className="mx-auto max-w-8xl px-5 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 max-w-3xl lg:mb-14"
          >
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">What We Offer</span>
            <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-[#003B70] sm:text-4xl lg:text-5xl">Industry Services</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#003B70]/70">
              Practical routes into NUST expertise, facilities, and research teams, tailored to the scope of your organisation&apos;s challenge.
            </p>
          </motion.div>

          <div className="mb-7 flex gap-2 overflow-x-auto border-b border-[#003B70]/15 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Industry services">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={activeService === service.id}
                onClick={() => setActiveService(service.id)}
                className={`inline-flex shrink-0 items-center gap-2.5 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 sm:px-5 ${
                  activeService === service.id
                    ? 'bg-[#003B70] text-white shadow-lg shadow-[#003B70]/15'
                    : 'bg-[#003B70]/[0.04] text-[#003B70] hover:bg-[#FCAF17]'
                }`}
              >
                <span className={activeService === service.id ? 'text-[#FCAF17]' : 'text-[#003B70]'}>{service.icon}</span>
                {service.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid overflow-hidden border border-[#003B70]/15 bg-white shadow-[0_24px_70px_rgba(0,59,112,0.10)] lg:grid-cols-2"
            >
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-[#FCAF17] text-[#003B70]">{active.icon}</div>
                <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FCAF17]">{active.tagline}</span>
                <h3 className="font-tahoma-font text-2xl font-bold tracking-tight text-[#003B70] sm:text-3xl lg:text-4xl">{active.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#003B70]/70 sm:text-base">{active.description}</p>
                <div className="mt-7 grid gap-3">
                  {active.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 border-l-2 border-[#FCAF17] bg-[#003B70]/[0.035] px-4 py-3">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#FCAF17]" />
                      <p className="text-sm leading-6 text-[#003B70]/80">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden bg-[#003B70] sm:min-h-[420px] lg:min-h-[560px]">
                <Image src={active.img} alt={active.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B70]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 border-t border-r border-white/30 bg-[#003B70]/90 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                  NUST Industry Gateway
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="engage" className="relative overflow-hidden bg-[#003B70] py-8">
        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="mb-12 max-w-3xl lg:mb-16">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">Simple Process</span>
            <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">How to Engage ICON</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
              From your first enquiry to project delivery, ICON manages the process so your team can stay focused on the business outcome.
            </p>
          </div>

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-[#FCAF17]/50 lg:block" />
            {engagementSteps.map((item) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: item.step * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative z-10 border border-white/15 bg-white p-6 shadow-xl shadow-black/10 transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center bg-[#FCAF17] text-[#003B70]">{item.icon}</div>
                  <span className="font-tahoma-font text-sm font-bold text-[#003B70]/35">{item.step.toString().padStart(2, '0')}</span>
                </div>
                <h3 className="font-tahoma-font text-lg font-bold text-[#003B70]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#003B70]/70">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-8xl px-5 ">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">Industries We Serve</span>
              <h2 className="font-tahoma-font text-3xl font-bold tracking-tight text-[#003B70] sm:text-4xl">Sector-Agnostic.<br />Expertise-Rich.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#003B70]/70">
                ICON&apos;s faculty network spans every major industrial sector, ensuring that no challenge is too specialised or too broad.
              </p>
            </motion.div>
            <div className="flex flex-wrap content-start gap-2.5">
              {sectors.map((sector, index) => (
                <motion.span
                  key={sector}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.035 }}
                  className="border border-[#003B70]/20 bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#003B70] transition-colors duration-300 hover:border-[#003B70] hover:bg-[#003B70] hover:text-[#FCAF17]"
                >
                  {sector}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="industry-brief" className="scroll-mt-20 border-t-[6px] border-[#FCAF17] bg-[#003B70] py-8">
        <div className="mx-auto grid max-w-8xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 ">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-xl lg:sticky lg:top-28">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">Start a Conversation</span>
            <h2 className="font-tahoma-font text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Ready to solve your industry bottleneck?</h2>
            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
              Share your challenge and our program managers will connect you with the right faculty experts and laboratory infrastructure.
            </p>
            <div className="mt-8 flex items-center gap-3 border-l-2 border-[#FCAF17] pl-4 text-sm leading-6 text-white/80">
              <CheckCircle2 size={19} className="shrink-0 text-[#FCAF17]" />
              Your submission is routed directly to the ICON Industry Desk.
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid gap-5 bg-white p-5 shadow-2xl shadow-black/20 sm:p-8"
          >
            <input type="text" name="website" value={values.website} onChange={setField('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ clip: 'rect(0,0,0,0)' }} />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#003B70]">
                Company Name <span className="sr-only">required</span>
                <input type="text" required placeholder="Your organisation" value={values.organization} onChange={setField('organization')} className="w-full border border-[#003B70]/20 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#003B70] outline-none transition placeholder:text-[#003B70]/40 focus:border-[#FCAF17] focus:ring-2 focus:ring-[#FCAF17]/20" />
              </label>
              <label className="grid gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#003B70]">
                Professional Email <span className="sr-only">required</span>
                <input type="email" required placeholder="name@company.com" value={values.email} onChange={setField('email')} className="w-full border border-[#003B70]/20 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-[#003B70] outline-none transition placeholder:text-[#003B70]/40 focus:border-[#FCAF17] focus:ring-2 focus:ring-[#FCAF17]/20" />
              </label>
            </div>

            <label className="grid gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#003B70]">
              Area of Interest
              <div className="relative">
                <select value={values.domain} onChange={setField('domain')} className="w-full appearance-none border border-[#003B70]/20 bg-white px-4 py-3.5 pr-12 text-sm font-normal normal-case tracking-normal text-[#003B70] outline-none transition focus:border-[#FCAF17] focus:ring-2 focus:ring-[#FCAF17]/20">
                  <option value="" disabled>Select an area of interest</option>
                  {sectors.map((sector) => <option key={sector} value={sector}>{sector}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#003B70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </label>

            <label className="grid gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#003B70]">
              Challenge Description
              <textarea rows={5} placeholder="Tell us about the challenge, expected outcome, and timeline" value={values.message} onChange={setField('message')} className="w-full resize-none border border-[#003B70]/20 bg-white px-4 py-3.5 text-sm font-normal normal-case leading-6 tracking-normal text-[#003B70] outline-none transition placeholder:text-[#003B70]/40 focus:border-[#FCAF17] focus:ring-2 focus:ring-[#FCAF17]/20" />
            </label>

            {status === 'success' && <p role="status" className="border-l-4 border-[#FCAF17] bg-[#FCAF17]/15 px-4 py-3 text-sm font-medium text-[#003B70]">Thank you — your inquiry has been received. Our team will be in touch shortly.</p>}
            {status === 'error' && <p role="alert" className="border-l-4 border-[#FCAF17] bg-[#003B70]/[0.06] px-4 py-3 text-sm font-medium text-[#003B70]">{error}</p>}

            <button type="submit" disabled={status === 'submitting'} className="group inline-flex w-full items-center justify-center gap-3 bg-[#FCAF17] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#003B70] transition duration-300 hover:bg-[#003B70] hover:text-white disabled:cursor-not-allowed disabled:opacity-60">
              {status === 'submitting' ? 'Submitting…' : 'Submit Research Inquiry'}
              {status !== 'submitting' && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
            </button>
          </motion.form>
        </div>
      </section>

      <FaqSection faqs={faqs} />
    </div>
  );
}
