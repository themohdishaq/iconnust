import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Globe2, Mail, MapPin, Phone } from 'lucide-react';

const ecosystemLinks = [
  { label: 'Innovation & Collaboration', href: '/innovation-collaboration' },
  { label: 'Industry Services', href: '/industry-services' },
  { label: 'Commercialisation Pathways', href: '/commercialization' },
];

const organisationLinks = [
  { label: 'About ICON', href: '/about-us' },
  { label: 'News & Insights', href: '/news' },
  { label: 'Events', href: '/news#events' },
  { label: 'Our Team', href: '/team' },
  { label: 'Contact Us', href: '/contact-us' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/icon-nust',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'ICON Website',
    href: 'https://icon.nust.edu.pk',
    icon: <Globe2 size={18} aria-hidden="true" />,
  },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[#FCAF17]">
      <span className="h-px w-0 bg-[#FCAF17] transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-[6px] border-[#FCAF17] bg-[#003B70] font-sans text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#FCAF17]/25" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
    

        <div className="grid gap-10 py-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.7fr_1.05fr] lg:gap-12 ">
          <div>
            <Link href="/" aria-label="ICON home" className="inline-flex">
              <Image src="/footer-icon.png" alt="ICON — Innovation and Commercialisation Office" width={220} height={110} className="h-auto w-[180px] object-contain sm:w-[210px]" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Transforming NUST research into commercial reality through intellectual property, industry collaboration, and technology transfer.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FCAF17] hover:bg-[#FCAF17] hover:text-[#003B70]">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer ecosystem navigation">
            <h2 className="mb-5 font-tahoma-font text-sm font-bold uppercase tracking-[0.16em] text-white">Ecosystem</h2>
            <div className="flex flex-col gap-3.5">
              {ecosystemLinks.map((link) => <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>)}
            </div>
          </nav>

          <nav aria-label="Footer organisation navigation">
            <h2 className="mb-5 font-tahoma-font text-sm font-bold uppercase tracking-[0.16em] text-white">Explore</h2>
            <div className="flex flex-col gap-3.5">
              {organisationLinks.map((link) => <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>)}
            </div>
          </nav>

          <div>
            <h2 className="mb-5 font-tahoma-font text-sm font-bold uppercase tracking-[0.16em] text-white">Contact ICON</h2>
            <address className="space-y-4 not-italic">
              <a href="mailto:director@icon.nust.edu.pk" className="group flex items-start gap-3 text-sm leading-6 text-white/70 transition-colors hover:text-[#FCAF17]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 text-[#FCAF17] transition-colors group-hover:bg-[#FCAF17] group-hover:text-[#003B70]"><Mail size={15} /></span>
                <span className="break-all pt-1.5">director@icon.nust.edu.pk</span>
              </a>
              <a href="tel:+925190856230" className="group flex items-start gap-3 text-sm leading-6 text-white/70 transition-colors hover:text-[#FCAF17]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 text-[#FCAF17] transition-colors group-hover:bg-[#FCAF17] group-hover:text-[#003B70]"><Phone size={15} /></span>
                <span className="pt-1.5">+92-51-90856230</span>
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=CIE+Building+NUST+H-12+Islamabad" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-sm leading-6 text-white/70 transition-colors hover:text-[#FCAF17]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 text-[#FCAF17] transition-colors group-hover:bg-[#FCAF17] group-hover:text-[#003B70]"><MapPin size={15} /></span>
                <span className="pt-1.5">CIE Building, NUST H-12 Campus, Islamabad, Pakistan</span>
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} National University of Sciences &amp; Technology</span>
          <span>Innovation &amp; Commercialisation Office</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
