"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowRight,
  Users,
  Rocket,
  BadgeCheck,
  Globe,
  Mail,
  Send,
  Layers,
} from "lucide-react";
import IndustryServicesPortal from "@/components/Service";
import PartnersSection from "@/components/Partner";
import Link from "next/link";
import { useInquiryForm } from "@/lib/useInquiryForm";
import HomeHero from "@/components/HomeHero";

type HomeNewsItem = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

const AnimatedStatValue = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (current) =>
    Math.round(current).toLocaleString("en-US"),
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: "easeOut",
    });

    return controls.stop;
  }, [motionValue, value]);

  return <motion.span>{displayValue}</motion.span>;
};

type StatTileData = { label: string; value: number };
type TechPlaceCardData = { label: string; value: number; subtitle: string };
type PartnerData = { name: string; logo: string | null };
const partners: PartnerData[] = [
  { name: 'Toyota Indus Motor Company', logo: '/toyota.jpg' },
  { name: 'Attock Refinery Limited (ARL)', logo: '/Attock Refinery Limited (ARL).png' },
  { name: 'Pakistan Business Council (PBC)', logo: '/Pakistan Business Council (PBC).svg' },
  { name: 'Scotmann Pharmaceuticals', logo: '/Scotmann Pharmaceuticals.png' },
  { name: "Wilson's Pharmaceuticals", logo: "/Wilson's Pharmaceuticals logo.jpg" },
  { name: 'Fauji Fertilizer Company (FFC)', logo: '/Fauji Fertilizer Company (FFC).png' },
  { name: 'AGP Limited', logo: '/AGP Limited.jpg' },
  { name: 'Honda', logo: '/Honda.png' },
  { name: 'CTGI', logo: '/CTGI logo.jpg' },
  { name: 'Huawei Technologies', logo: '/Huawei Technologies.png' },
  { name: 'Interactive Group', logo: '/Interactive Group.jpg' },
  { name: 'Crescent Steel & Allied Products Limited', logo: '/Crescent Steel & Allied Products Limited.png' },
  { name: 'Graana.com', logo: '/Graana.png' },
  { name: 'Khushhali Microfinance Bank', logo: '/Khushhali Microfinance Bank.png' },
  { name: 'Pakistan Telecommunication Authority (PTA)', logo: '/Pakistan Telecommunication Authority (PTA).png' },
  { name: 'Allied Bank', logo: '/Allied Bank logo.png' },
  { name: 'Oracle', logo: '/Oracle.webp' },
  { name: 'Sustainable Development Policy Institute (SDPI)', logo: '/Sustainable Development Policy Institute (SDPI).webp' },
  { name: 'Nayatel', logo: '/Nayatel.jpg' },
  { name: 'Netsol Technologies', logo: '/Netsol Technologies.svg' },
  { name: 'NADRA', logo: '/NADRA.png' },
  { name: 'Serena Hotels', logo: '/Serena Hotels.png' },
  { name: 'Moftak Solutions', logo: '/Moftak Solutions.jpg' },
  { name: 'PepsiCo', logo: '/PepsiCo.jpg' },
  { name: 'Askari Bank', logo: '/Askari Bank.jpg' },
  { name: 'National Bank of Pakistan (NBP)', logo: '/National Bank of Pakistan (NBP).jpg' },
  { name: 'Jazz', logo: '/Jazz.jpg' },
  { name: 'Habib Bank Limited (HBL)', logo: '/Habib Bank Limited (HBL).jpg' },
  { name: 'Pakistan Tobacco Company (PTC)', logo: '/Pakistan Tobacco Company (PTC).png' },
  { name: 'International Finance Corporation (IFC)', logo: '/International Finance Corporation (IFC).jpg' },
  { name: 'Islamabad Chamber of Commerce & Industry (ICCI)', logo: '/Islamabad Chamber of Commerce & Industry (ICCI).jpg' },
  { name: 'Pakistan Agricultural Research Council (PARC)', logo: '/Pakistan Agricultural Research Council (PARC).jpg' },
  { name: 'Pakistan Telecommunication Company Limited (PTCL)', logo: '/Pakistan Telecommunication Company Limited (PTCL).png' },
  { name: 'DynaSys Networks Pvt Ltd', logo: '/dynasysnetworks_logo.jpg' },
  { name: 'JW SEZ Pvt Ltd', logo: '/JW SEZ Pvt Ltd.jpg' },
  { name: 'ZEUS Energy Pvt Ltd', logo: '/ZEUS Energy Pvt Ltd.jpg' },
  { name: 'Tayraak Retail Pvt Ltd', logo: '/Tayraak Retail Pvt Ltd.jpg' },
  { name: 'Adonis (Tayraak) Foot Wear', logo: '/Adonis (Tayraak) Foot Wear.jpg' },
  { name: 'Nayab Labs Islamabad', logo: '/Nayab Labs Islamabad.webp' },
  { name: 'Maroof Hospital International', logo: '/Maroof Hospital International.jpg' },
  { name: 'Eminent', logo: '/Eminent.png' },
  { name: 'Fast Cables Limited', logo: '/Fast Cables Limited.png' },
  { name: 'CIArb', logo: '/CIArb.png' },
  { name: 'Saman-e-Shifa Foundation', logo: '/Saman-e-Shifa Foundation.png' },
  { name: 'Indus Hospital & Health Network (Karachi)', logo: '/Indus Hospital & Health Network (Karachi).png' },
  { name: 'P@SHA', logo: '/P@SHA.png' },
  { name: 'Engineering Development Board (EDB)', logo: '/Engineering Development Board (EDB).jpg' },
  { name: 'Waseela Pakistan', logo: '/Waseela Pakistan.jpg' },
  { name: 'National Center for Physics', logo: '/National Center for Physics.jpg' },
  { name: 'SIMCOE IT', logo: '/SIMCOE IT.png' },
  { name: 'Artistic Milliners (Private) Limited', logo: '/Artistic Milliners.jpg'}
];
// const partners: PartnerData[] = [
//   { name: 'Toyota Indus Motor Company', logo: '/toyota.jpg' },
//   { name: 'Attock Refinery Limited (ARL)', logo: '/Attock Refinery Limited (ARL).png' },
//   { name: 'Pakistan Business Council (PBC)', logo: '/Pakistan Business Council (PBC).svg' },
//   { name: 'Scotmann Pharmaceuticals', logo: '/Scotmann Pharmaceuticals.png' },
//   { name: "Wilson's Pharmaceuticals", logo: "/Wilson's Pharmaceuticals logo.jpg" },
//   { name: 'Fauji Fertilizer Company (FFC)', logo: '/Fauji Fertilizer Company (FFC).png' },
//   { name: 'AGP Limited', logo: '/AGP Limited.jpg' },
//   { name: 'Honda', logo: '/Honda.png' },
//   { name: 'CTGI', logo: '/CTGI logo.jpg' },
//   { name: 'Huawei Technologies', logo: '/Huawei Technologies.png' },
//   { name: 'Interactive Group', logo: '/Interactive Group.jpg' },
//   { name: 'Crescent Steel & Allied Products Limited', logo: '/Crescent Steel & Allied Products Limited.png' },
//   { name: 'Graana.com', logo: '/Graana.png' },
//   { name: 'Khushhali Microfinance Bank', logo: '/Khushhali Microfinance Bank.png' },
//   { name: 'Pakistan Telecommunication Authority (PTA)', logo: '/Pakistan Telecommunication Authority (PTA).png' },
//   { name: 'Allied Bank', logo: '/Allied Bank logo.png' },
//   { name: 'Oracle', logo: '/Oracle.webp' },
//   { name: 'Rastgar Engineering Company', logo: null },
//   { name: 'Sustainable Development Policy Institute (SDPI)', logo: '/Sustainable Development Policy Institute (SDPI).webp' },
//   { name: 'Nayatel', logo: '/Nayatel.jpg' },
//   { name: 'Netsol Technologies', logo: '/Netsol Technologies.svg' },
//   { name: 'NADRA', logo: '/NADRA.png' },
//   { name: 'Serena Hotels', logo: '/Serena Hotels.png' },
//   { name: 'Keystone', logo: null },
//   { name: 'Moftak Solutions', logo: '/Moftak Solutions.jpg' },
//   { name: 'PepsiCo', logo: '/PepsiCo.jpg' },
//   { name: 'Askari Bank', logo: '/Askari Bank.jpg' },
//   { name: 'National Bank of Pakistan (NBP)', logo: '/National Bank of Pakistan (NBP).jpg' },
//   { name: 'Jazz', logo: '/Jazz.jpg' },
//   { name: 'Habib Bank Limited (HBL)', logo: '/Habib Bank Limited (HBL).jpg' },
//   { name: 'Pakistan Tobacco Company (PTC)', logo: '/Pakistan Tobacco Company (PTC).png' },
//   { name: 'International Finance Corporation (IFC)', logo: '/International Finance Corporation (IFC).jpg' },
//   { name: 'Islamabad Chamber of Commerce & Industry (ICCI)', logo: '/Islamabad Chamber of Commerce & Industry (ICCI).jpg' },
//   { name: 'Pakistan Agricultural Research Council (PARC)', logo: '/Pakistan Agricultural Research Council (PARC).jpg' },
//   { name: 'Pakistan Telecommunication Company Limited (PTCL)', logo: '/Pakistan Telecommunication Company Limited (PTCL).png' },
// ];
const homeImpactCardDefaults = [
  {
    label: "Licensed Tech",
    count: 52,
    icon: Layers,
    sub: "Technologies actively licensed to industry partners",
  },
  {
    label: "Spin-offs",
    count: 80,
    icon: Rocket,
    sub: "Ventures founded on NUST intellectual property",
  },
  {
    label: "Ready to License",
    count: 10,
    icon: BadgeCheck,
    sub: "Cutting-edge technologies awaiting commercialisation",
  },
] as const;

const App = ({
  stats,
  techPlaceCards,
}: {
  stats: StatTileData[];
  techPlaceCards: TechPlaceCardData[];
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsArticles, setNewsArticles] = useState<HomeNewsItem[]>([]);
  const { values, setField, status, error, handleSubmit } =
    useInquiryForm("home");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("submitting");
    setNewsletterError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterStatus("error");
      setNewsletterError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    fetch("/api/news?limit=3")
      .then((res) => res.json())
      .then((data: HomeNewsItem[]) => setNewsArticles(data))
      .catch(() => setNewsArticles([]));
  }, []);

  const heroSlides = [
    {
      tag: "Innovation",
      titleLine1: "Innovation",
      highlight: "Par Excellence",
      titleLine2: " ",
      desc: "The Innovation & Commercialisation Network at NUST bridge the gap between academic brilliance and global industrial impact.",
      img: "/main-pic/mainoffice.jpg",
    },
    {
      tag: "Industry Synergy",
      titleLine1: "Global",
      highlight: "Partnerships",
      titleLine2: "",
      desc: "Collaborate with faculty and leverage ISO-certified testing facilities to solve complex industrial bottlenecks.",
      img: "/main-pic/hero1.jpg",
    },
    {
      tag: "Commercialisation",
      titleLine1: "Seamless",
      highlight: "Technology",
      titleLine2: "Transformation",
      desc: "Navigate the journey from invention disclosure to strategic licensing with our dedicated technology transfer experts.",
      img: "/main-pic/lab.jpg",
    },
  ];

  return (
    <div className="min-h-screen  bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full">
      <HomeHero stats={stats}/>
      {/* Hero Section with Dynamic Slider and Integrated Live Dashboard */}
      

      <IndustryServicesPortal />

      <section className="py-4 max-w-8xl sm:py-8 lg:py-10 bg-white text-slate-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#FCAF17] font-bold text-[11px] uppercase tracking-[0.4em] mb-4">
                <Mail size={14} />
                <span>Knowledge Brief</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#003B70] font-tahoma mb-4">
                The Innovation Brief
              </h2>
              <p className="text-slate-700 text-xs  lg:text-[16px] opacity-90 max-w-md">
                Stay ahead of the market with monthly updates on NUST research,
                licensed tech, and industry roundtables.
              </p>
            </div>
            <div>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow bg-slate-50 border border-slate-300 px-2 py-2 sm:py-3 outline-none focus:bg-white focus:border-blue-500 transition-all rounded-sm placeholder:text-slate-400 text-slate-900 text-sm sm:text-base"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "submitting"}
                  className="bg-[#FCAF17] text-white] text-white px-5 py-2 font-black text-[12px] uppercase cursor-pointer tracking-widest hover:bg-[#00558F] border  border-[#00558F] transition-colors disabled:opacity-60"
                >
                  {newsletterStatus === "submitting"
                    ? "Subscribing…"
                    : "Subscribe"}
                </button>
              </form>
              {newsletterStatus === "success" && (
                <p className="text-emerald-700 text-xs sm:text-sm font-medium mt-3">
                  Thanks for subscribing — watch your inbox for updates.
                </p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-red-600 text-xs sm:text-sm font-medium mt-3">
                  {newsletterError}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Tech Place / Storefront */}
      <section className="py-8  bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 bg-fixed bg-cover" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 sm:mb-14 lg:mb-20 gap-6 lg:gap-10">
            <div className="max-w-xl">
              <span className="icon-brand-font-secondary text-[11px] font-black uppercase tracking-[0.4em] mb-3 block">
                Where innovation meets education
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif leading-tight mb-4">
                Powering the university of tomorrow
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg font-light">
                Explore 80+ spin-offs and market-ready intellectual property
                available for strategic licensing.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="https://www.linkedin.com/company/icon-nust"
                className="bg-white text-slate-900 px-6 py-3 font-black text-[12px] uppercase tracking-widest"
              >
                LinkedIn Feed
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {homeImpactCardDefaults.map((defaultCard, i) => {
              const adminCard = techPlaceCards[i] ?? {
                label: defaultCard.label,
                value: defaultCard.count,
                subtitle: defaultCard.sub,
              };
              const cardValue = Number.isFinite(Number(adminCard.value)) ? Number(adminCard.value) : defaultCard.count;
              const Icon = defaultCard.icon;

              return (
                <div
                  key={defaultCard.label}
                  className="bg-white/5 border border-white/10 p-6 sm:p-7 lg:p-8 rounded-sm hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-blue-400 mb-4 ">
                    <Icon size={28} />
                  </div>
                  <div className="text-4xl font-Inter mb-2">
                    {cardValue.toLocaleString("en-US")}
                  </div>
                  <div className="text-lg font-serif text-white mb-2">
                    {defaultCard.label}
                  </div>
                  <p className="text-white text-sm">{adminCard.subtitle || defaultCard.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-6 max-w-8xl  bg-slate-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="mb-8 ">
            <div className="inline-flex items-center space-x-2 text-[#FCAF17] font-bold text-[11px] uppercase tracking-[0.4em] mb-4">
              <div className="w-12 h-px bg-[#C9962A]" />
              <span>Latest Updates</span>
            </div>
            <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#003B70] mb-3">
                  News & Success Stories
                </h2>

                <p className="text-slate-500 text-sm sm:text-base ">
                  Discover the latest developments, success stories, and
                  upcoming events from ICON-NUST.
                </p>
              </div>
              <button className="bg-[#FCAF17] text-white font-black text-[12px] uppercase tracking-widest hover:bg-[#00558F] border border-[#00558F] transition-colors">
                <Link
                  href="/news"
                  className="flex items-center space-x-2 px-6 py-3 "
                >
                  View all news
                </Link>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {newsArticles.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48  overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-4 sm:p-6 lg:p-7 flex flex-col flex-1">
                  <div className=" text-[#FCAF17] text-[10px] font-black  py-1 uppercase tracking-widest ">
                    {news.category}
                  </div>
                  <h3 className="text-xl font-serif text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-7 mb-5">
                    {news.excerpt.length > 180
                      ? `${news.excerpt.substring(0, 180)}...`
                      : news.excerpt}
                  </p>

                  <span className="mt-auto flex items-center space-x-2 text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 group-hover:text-slate-900 group-hover:border-slate-900 transition-all w-fit">
                    <span>Read More</span>
                    <ArrowRight
                      size={14}
                      className="transition-all duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Initiate a Partnership (Contact Section) */}
      <section id="partner-with-us" className=" bg-white relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            <div className="py-4 lg:col-span-5">
              <div className="inline-flex items-center space-x-2 icon-brand-font-secondary font-bold text-[11px] uppercase tracking-[0.4em] mb-5 sm:mb-6 lg:mb-8">
                <div className="w-12 h-px bg-[#C9962A]" />
                <span>Initiate Engagement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl   font-serif text-[#003B70] mb-5 leading-tight">
                Partner with ICON
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                Our team experts dedicated to facilitating long-term strategic
                alliances.
              </p>

              <div className="space-y-5 sm:space-y-7 lg:space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-900 shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-1">
                      Scholar House
                    </h4>
                    <p className="text-slate-900 font-medium">
                      Sector H-12, Islamabad, Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-blue-900 shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-1">
                      Direct Outreach
                    </h4>
                    <a
                      href="mailto:info@icon.nust.edu.pk"
                      className="text-slate-900 font-medium hover:text-blue-900 transition-all"
                    >
                      info@icon.nust.edu.pk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-8 lg:p-12 xl:p-14 rounded-sm">
              <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
              >
                {" "}
                {/* Honeypot */}{" "}
                <input
                  type="text"
                  value={values.website}
                  onChange={setField("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute w-px h-px overflow-hidden opacity-0"
                  style={{ clip: "rect(0,0,0,0)" }}
                />{" "}
                {/* Name */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Name{" "}
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={values.name}
                    onChange={setField("name")}
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Company Name */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Company Name{" "}
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={values.organization}
                    onChange={setField("organization")}
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Industry / Sector */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Industry / Sector{" "}
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={values.industry}
                    onChange={setField("industry")}
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Phone Number */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Phone Number{" "}
                  </label>{" "}
                  <input
                    type="tel"
                    required
                    value={values.phoneNumber}
                    onChange={setField("phoneNumber")}
                    autoComplete="tel"
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Email */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Email{" "}
                  </label>{" "}
                  <input
                    type="email"
                    required
                    value={values.email}
                    onChange={setField("email")}
                    autoComplete="email"
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Province */}{" "}
                <div className="flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Province{" "}
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={values.province}
                    onChange={setField("province")}
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
                {/* Address */}{" "}
                <div className="sm:col-span-2 flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Address{" "}
                  </label>{" "}
                  <input
                    type="text"
                    required
                    value={values.address}
                    onChange={setField("address")}
                    autoComplete="street-address"
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none"
                  />{" "}
                </div>{" "}
               
                {/* Brief About Company */}{" "}
                <div className="sm:col-span-2 flex flex-col space-y-2 group">
                  {" "}
                  <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                    {" "}
                    Brief About Company{" "}
                  </label>{" "}
                  <textarea
                    rows={4}
                    value={values.briefAboutCompany}
                    onChange={setField("briefAboutCompany")}
                    className="bg-transparent border-b border-slate-300 py-3 focus:border-blue-900 transition-all outline-none resize-none"
                  ></textarea>{" "}
                </div>{" "}
              
                {status === "success" && (
                  <div className="sm:col-span-2 text-emerald-700 text-sm font-medium bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                    {" "}
                    Thank you — your inquiry has been received. Our team will be
                    in touch shortly.{" "}
                  </div>
                )}{" "}
                {status === "error" && (
                  <div className="sm:col-span-2 text-red-600 text-sm font-medium bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    {" "}
                    {error}{" "}
                  </div>
                )}{" "}
                <div className="sm:col-span-2 pt-4 sm:pt-6">
                  {" "}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-[#FCAF17] cursor-pointer text-[#0A2A40] py-4 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-4 shadow-xl shadow-blue-900/20 group disabled:opacity-60"
                  >
                    {" "}
                    <span>
                      {" "}
                      {status === "submitting"
                        ? "Submitting…"
                        : "Submit Engagement Request"}{" "}
                    </span>{" "}
                    <Send size={16} />{" "}
                  </button>{" "}
                </div>{" "}
              </form>
            </div>
          </div>
        </div>
        <PartnersSection partners={partners} />
      </section>
    </div>
  );
};

export default App;
