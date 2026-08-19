"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Link2,
  Mail,
  Menu,
  Search,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleSearch = () => {
    const value = query.trim();

    if (!value) return;

    router.push(`/news?q=${encodeURIComponent(value)}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    {
      name: "Innovation & Collaboration",
      href: "/innovation-collaboration",
    },
    { name: "Industry Services", href: "/industry-services" },
    {
      name: "Commercialisation Pathways",
      href: "/commercialization",
    },
    { name: "News", href: "/news" },
  ];

  return (
    <>
      {/* =========================================================
          TOP UTILITY BAR
      ========================================================== */}
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : "auto",
          opacity: isScrolled ? 0 : 1,
          paddingTop: isScrolled ? 0 : 12,
          paddingBottom: isScrolled ? 0 : 12,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative z-[60] overflow-hidden bg-[#003B70] text-white"
      >
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-5 md:px-8 lg:px-14">
          {/* Left */}
          <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-[0.14em] md:gap-6">
            <Link
              href="/news#events"
              className="transition-opacity hover:opacity-70"
            >
              Events
            </Link>

            <span className="h-4 w-px bg-white/40" />

            <Link
              href="/team"
              className="transition-opacity hover:opacity-70"
            >
              Team
            </Link>
          </div>

          {/* Right */}
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-6 text-[11px] font-medium">
              <Link
                href="/careers"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <BriefcaseBusiness size={14} />
                Careers
              </Link>

              <Link
                href="/news"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Link2 size={14} />
                Media
              </Link>

              <Link
                href="/contact-us"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Mail size={14} />
                Contact Us
              </Link>
            </div>

            {/* Search */}
            <div className="relative w-[300px]">
              <Search
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
              />

              <input
                type="text"
                value={query}
                maxLength={50}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search news, stories, insights..."
                className="
                  h-9 w-full rounded-full
                  border border-white/30
                  bg-white/5
                  pl-11 pr-12
                  text-[12px] text-white
                  outline-none
                  placeholder:text-white/65
                  transition
                  focus:border-white/60
                  focus:bg-white/10
                "
              />

              <button
                onClick={handleSearch}
                aria-label="Search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-white/10"
              >
                <Search size={15} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          MAIN NAVBAR
      ========================================================== */}
      <motion.nav
        initial={false}
        animate={{
          boxShadow: isScrolled
            ? "0px 8px 30px rgba(15,23,42,0.10)"
            : "0px 0px 0px rgba(15,23,42,0)",
        }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 z-50 w-full bg-white"
      >
        <div
          className="
            mx-auto flex
            
            w-full max-w-[1800px]
            items-center justify-between
            px-5 md:px-8 lg:px-14
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative flex shrink-0 items-center "
          >
            <Image
              src="/icon-logo.png"
              alt="Innovation & Commercialisation Office"
              width={300}
              height={80}
              priority
              className="
                h-auto
                
                object-contain
                sm:w-[200px]
                xl:w-[220px]
              "
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-7 xl:flex 2xl:gap-10">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    group relative
                    whitespace-nowrap
                    py-7
                    text-[14px]
                    font-semibold
                    uppercase
                    tracking-[0.02em]
                    text-[#00558F]
                    transition
                    hover:text-[#003B70]
                    2xl:text-[15px]
                  "
                >
                  {link.name}

                  <span
                    className={`
                      absolute bottom-[16px] left-0 h-[3px]
                      rounded-full bg-[#FCAF17]
                      transition-all duration-300
                      ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full text-[#00558F]
              transition hover:bg-slate-100
              xl:hidden
            "
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="absolute left-0 top-full w-full overflow-hidden border-t border-slate-100 bg-white shadow-xl xl:hidden"
            >
              <div className="space-y-1 p-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      block rounded-xl
                      px-4 py-4
                      text-sm font-bold uppercase
                      text-[#00558F]
                      transition
                      hover:bg-[#00558F]/5
                    "
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="relative mt-4">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Search news, stories..."
                    className="
                      h-12 w-full rounded-full
                      border border-slate-200
                      pl-11 pr-5
                      text-sm
                      outline-none
                      focus:border-[#00558F]
                    "
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}