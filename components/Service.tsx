"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  FlaskConical,
  Users,
  Layers,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    id: 'rnd',
    title: 'R&D Support',
    tagline: 'Co-develop breakthrough solutions',
    desc: 'Custom research projects designed to solve specific industrial bottlenecks through applied science and engineering. From feasibility studies to full-scale applied research, ICON structures industry-funded projects with clear IP agreements.',
    icon: <FlaskConical size={22} />,
    img: '/industry-services/rnd.jpg',
    bullets: [
      'Joint research agreements with defined milestones',
      'Access to 447+ research, teaching, key lab  centers',
      'Dedicated faculty PI matched to your domain',
    ],
  },
  {
    id: 'consultancy',
    title: 'Expert Consultancy',
    tagline: 'Pakistan-based expertise on demand',
    desc: 'Strategic guidance from renowned faculty across multiple domains, from AI implementation to structural engineering. ICON facilitates short-term advisory engagements, technical audits, and regulatory support for industry clients.',
    icon: <Users size={22} />,
    img: '/industry-services/expertconsultancy.jpg',
    bullets: [
      'Engineering, science, Architecture and other domains covered',
      'Technical audits, feasibility reviews & expert testimony',
    ],
  },
   {
  id: 'faculty-placement',
  title: 'Upskilling and Capacity Building',
  tagline: 'Bridging academia with industry',
  desc: "Launched in 2018, the NUST Faculty Placement Program enables faculty members to work closely with industry, fostering collaborative R&D, innovation, process improvement, and technology transfer while strengthening academia-industry partnerships.",
  icon: <Users size={22} />, // or Briefcase, GraduationCap, Building2
  img: '/capacity_building.jpeg',
  bullets: [
    'Industry placements lasting from a few days to several weeks',
    'Promotes collaborative R&D, innovation, and process improvement',
    'Creates opportunities for student projects, internships, jobs, and professional training',
  ],
},
  {
    id: 'testing',
    title: 'Testing & Lab Services',
    tagline: 'Precision analysis, certified results',
    desc: "Access to NUST's ISO-certified infrastructure, high-end analytical tools, and material testing facilities.",
    icon: <Layers size={22} />,
    img: '/industry-services/labservices.jpg',
    stat: '300+ Advanced Labs',
    bullets: [
      'ISO/IEC 17025-accredited testing facilities',
      'Materials, chemical, environmental & structural analysis',
      'Rapid turnaround with detailed technical reports',
    ],
  },
];

// ── Individual service row ────────────────────────────────────────
function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <article className="relative py-4">
      <div className="relative mx-auto max-w-8xl ">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:gap-0">

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -56 : 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative px-1 sm:px-3 lg:px-10 ${isEven ? 'lg:order-1' : 'lg:order-3'}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center bg-[#FCAF17] text-[#003B70] lg:hidden">
                {service.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FCAF17] sm:text-[11px]">
                {service.tagline}
              </span>
            </div>

            <h3 className="font-tahoma-font text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {service.title}
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {service.desc}
            </p>

            <ul className="mt-6 space-y-3 border-l border-white/15 pl-4 sm:mt-7">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#FCAF17]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Center column — connector node ── */}
          <div className="hidden lg:flex flex-col items-center justify-center lg:order-2 relative z-20">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.25 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute h-16 w-16 rounded-full border border-[#FCAF17]/40"
              />
              <div className="absolute h-12 w-12 rounded-full border border-[#FCAF17]/60" />
              <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FCAF17] bg-[#003B70] text-[#FCAF17] shadow-[0_0_24px_rgba(252,175,23,0.45)]">
                {service.icon}
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-1/2 h-px w-full origin-center bg-gradient-to-r from-transparent via-[#FCAF17]/70 to-transparent"
            />
          </div>

          {/* ── Image side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 56 : -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`px-1 sm:px-3 lg:px-10 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}
          >
            <div className="group relative h-[240px] overflow-hidden border border-white/15 bg-white/5 shadow-2xl shadow-black/20 sm:h-[330px] lg:h-[400px] xl:h-[440px]">
              <Image
                src={service.img}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003B70]/80 via-transparent to-transparent" />
              <div
                className={`absolute inset-0 ${
                  isEven
                    ? 'bg-gradient-to-l from-transparent to-[#003B70]/25'
                    : 'bg-gradient-to-r from-transparent to-[#003B70]/25'
                }`}
              />
              <div className="absolute left-0 top-0 h-1.5 w-24 bg-[#FCAF17] transition-all duration-500 group-hover:w-full" />
              <div className="pointer-events-none absolute right-5 top-4 select-none font-tahoma-font text-[72px] font-bold leading-none text-white/15 sm:text-[100px]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="absolute bottom-0 left-0 bg-[#FCAF17] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#003B70]">
                ICON Industry Services
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────────
const IndustryServicesPortal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 15%'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const lineHeadY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative overflow-hidden bg-[#003B70] font-sans text-white ">
      <div
        className="pointer-events-none absolute inset-0 bg-fixed bg-cover opacity-[0.08]"
        style={{ backgroundImage: "url('/industrial_bg.png')" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[#001F3D] via-[#003B70]/90 to-transparent backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-14 left-1/2 z-[1] h-32 w-[85%] -translate-x-1/2 rounded-full bg-[#FCAF17]/10 blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full border border-white/10" />

      <div className="relative z-10 py-8 text-center sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-5 sm:px-8"
        >
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#FCAF17] sm:text-[11px]">
            <span className="h-px w-8 bg-[#FCAF17]" />
            Research to Industry
            <span className="h-px w-8 bg-[#FCAF17]" />
          </span>
          <h2 className="font-tahoma-font text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Industry Services
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
            Four key avenues designed to seamlessly integrate NUST&apos;s research
            excellence, faculty expertise, and infrastructure with your corporate R&D needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-7 h-px w-48 origin-center bg-gradient-to-r from-transparent via-[#FCAF17]/70 to-transparent"
        />
      </div>

      <div ref={containerRef} className="relative z-10">
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
          <motion.div
            className="w-full h-full origin-top"
            style={{
              scaleY,
              background: '#FCAF17',
            }}
          />
        </div>

        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FCAF17]"
            style={{
              top: lineHeadY,
              boxShadow: '0 0 14px 5px rgba(252,175,23,0.55)',
            }}
          />
        </div>

        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

    
    </section>
  );
};

export default IndustryServicesPortal;
