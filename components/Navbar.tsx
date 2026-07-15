"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Innovation & Collaboration", href: "/innovation-collaboration" },
    { name: "Industry Services", href: "/industry-services" },
    { name: "Commercialization Pathways", href: "/commercialization" },
    { name: "News", href: "/news" },
    { name: "Team", href: "/team" },
  ];

  return (
    <div>
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : "auto",
          opacity: isScrolled ? 0 : 1,
          paddingTop: isScrolled ? 0 : 12,
          paddingBottom: isScrolled ? 0 : 12,
          overflow: "hidden",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#00558F] border-b text-white border-blue-100"
      >
        <div className="max-w-8xl mx-auto px-3 md:px-6 flex justify-between items-center">
          <div className="flex tahoma-font items-center border-transparent space-x-3.5 md:space-x-6 text-[10px] uppercase tracking-[0.2em] font-black">
            <Link href="/tto" className=" transition-colors">
              Tech Portfolio
            </Link>
            <Link href="/news#events" className=" transition-colors">
              Events
            </Link>
            <Link href="/team#contact" className=" transition-colors">
              Careers
            </Link>
            <Link href="/team" className="transition-colors">
              Partners
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Technology..."
                className="pl-8 pr-4 py-1 text-[11px] text-black bg-slate-50 border border-slate-200 rounded-full w-48 focus:border-blue-900 transition-all outline-none"
              />
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "#ffffff" : "rgba(255, 255, 255, 0.95)",
          boxShadow: isScrolled
            ? "0 8px 24px rgba(15, 23, 42, 0.08)"
            : "0 0 0 rgba(15, 23, 42, 0)",
          backdropFilter: isScrolled ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed w-full z-50 py-0 sm:py-2 mt-0"
      >
        <div className="max-w-8xl mx-auto px-6 flex justify-between items-center relative">
          <Link href="/" className="flex items-center">
            <Image src="/icon-logo.png" alt="ICON Logo" width={200} height={100} className="rounded-sm" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm uppercase tracking-widest font-black transition-colors py-4 block icon-brand-font"
              >
                {/* <span className="transition-colors group-hover:text-blue-900">{link.name}</span> */}
                <span className="absolute left-0 bottom-2 h-0.5 w-0 bg-blue-900 transition-all duration-300 group-hover:w-full" />
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden z-50"
            >
              <div className="p-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-black uppercase text-slate-900 py-4 border-b border-slate-100 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

export default Navbar;
