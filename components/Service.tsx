"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  FlaskConical,
  Users,
  GraduationCap,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const services = [
  {
    id: 'rnd',
    title: 'R&D Support',
    tagline: 'Co-develop breakthrough solutions',
    desc: 'Custom research projects designed to solve specific industrial bottlenecks through applied science and engineering. From feasibility studies to full-scale applied research, ICON structures industry-funded projects with clear IP agreements.',
    icon: <FlaskConical size={22} />,
    img: '/industry-services/rnd.jpg',
    stat: '150+ Active Projects',
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
    desc: 'Strategic guidance from world-renowned faculty across multiple domains, from AI implementation to structural engineering. ICON facilitates short-term advisory engagements, technical audits, and regulatory support for industry clients.',
    icon: <Users size={22} />,
    img: '/industry-services/consultancy.jpg',
    stat: '500+ Faculty Experts',
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
  img: '/industry-services/lectures.jpg',
  stat: '100+ Faculty Placements',
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
    <div className="relative py-4  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-[1fr_80px_1fr] gap-4 lg:gap-0 items-center">

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -56 : 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`px-2 sm:px-4 lg:px-10 ${isEven ? 'lg:order-1' : 'lg:order-3'}`}
          >
            {/* overline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.35em]">
                {service.tagline}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl  font-serif text-white mb-4 leading-tight tracking-tight">
              {service.title}
            </h3>

            <p className="text-white text-sm  leading-relaxed mb-6 sm:mb-8 max-w-md">
              {service.desc}
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 lg:mb-10">
              {service.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white">
                  <CheckCircle2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                  {b}
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
              {/* outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-14 h-14 rounded-full border border-blue-400/30"
              />
              {/* mid ring */}
              <div className="absolute w-10 h-10 rounded-full border border-blue-500/40" />
              {/* inner node */}
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-400 flex items-center justify-center text-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.5)] z-10">
                {service.icon}
              </div>
            </motion.div>

            {/* horizontal connector arms */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent origin-center top-1/2"
            />
          </div>

          {/* ── Image side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 56 : -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`px-2 sm:px-4 lg:px-10 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}
          >
            <div className="relative overflow-hidden rounded-md h-[220px] sm:h-[300px] lg:h-[380px] xl:h-[440px] group">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div
                className={`absolute inset-0 ${
                  isEven
                    ? 'bg-gradient-to-l from-transparent to-slate-900/20'
                    : 'bg-gradient-to-r from-transparent to-slate-900/20'
                }`}
              />

              {/* stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {service.stat}
                </span>
              </motion.div>

              {/* watermark index */}
              <div className="absolute top-4 right-5 text-white/[0.07] font-serif text-[110px] leading-none select-none pointer-events-none font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
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
    <div className="bg-slate-900 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 bg-fixed bg-cover pointer-events-none"
        style={{ backgroundImage: "url('/industrial_bg.png')" }}
      />

      {/* ── Section header ── */}
      <div className="relative z-10 pt-8 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6"
        >
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl   text-white mb-5 leading-tight tracking-tight">
            Industrial Services
          </h2>
          <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            Four key avenues designed to seamlessly integrate NUST's world-class research
            excellence, faculty expertise, and infrastructure with your corporate R&D needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-10 h-px w-48 origin-center bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />
      </div>

      {/* ── Rows with scroll-driven vertical line ── */}
      <div ref={containerRef} className="relative z-10">

        {/* ── Vertical track (faint, always visible) ── */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

        {/* ── Animated fill line ── */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
          <motion.div
            className="w-full h-full origin-top"
            style={{
              scaleY,
              background: '#00558f',
            }}
          />
        </div>

        {/* ── Traveling glow dot ── */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300"
            style={{
              top: lineHeadY,
              boxShadow: '0 0 12px 4px rgba(103,232,249,0.7)',
            }}
          />
        </div>

        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* bottom fade to white
      <div className="h-16 bg-gradient-to-b from-transparent to-slate-50 relative z-10" /> */}
    </div>
  );
};

export default IndustryServicesPortal;
