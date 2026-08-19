import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Building2, Mail, MapPin, MapPinned, Phone } from 'lucide-react';
import { SITE_NAME } from '@/lib/seo';

const title = 'Contact Us';
const description =
  'Contact the ICON offices at NUST for innovation, intellectual property, industry collaboration, and technology-transfer support.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: '/contact',
  },
};

export const contactOffices = [
 
  {
    id: 'cac',
    shortName: 'CAC',
    name: 'Corporate Advisory Council',
    summary: 'Industry engagement, corporate partnerships, expert connections, and collaborative R&D support.',
    phone: '+92-51-90856242/6243',
    email: 'gmcac@ric.nust.edu.pk',
    address: 'CIE Building, NUST Campus, H-12, Islamabad, Pakistan',
    image: '/main-pic/CAC_team.jpg',
  },
   {
    id: 'nipo',
    shortName: 'NIPO',
    name: 'National Innovation & Patent Office',
    summary: 'Intellectual property guidance, invention evaluation, patent filing, and protection support.',
    phone: '+92-51-90856235',
    email: 'gmipla@ric.nust.edu.pk',
    address: 'CIE Building, NUST Campus, H-12, Islamabad, Pakistan',
    image: '/main-pic/IPO.jpg',
  },
  {
    id: 'tto',
    shortName: 'TTO',
    name: 'Technology Transfer Office',
    summary: 'Technology licensing, commercialization pathways, spin-off support, and knowledge transfer.',
    phone: '+92-51-90856248',
    email: 'managertto@ric.nust.edu.pk',
    address: 'CIE Building, NUST Campus, H-12, Islamabad, Pakistan',
    image: '/main-pic/TTO_team.jpg',
  },
] as const;

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=CIE+Building+NUST+H-12+Islamabad';

export default function ContactPage() {
  return (
    <main className="bg-white text-[#003B70]">
      <section className="relative isolate overflow-hidden bg-[#003B70]">
       
        <div className="absolute inset-0 -z-10 bg-[#003B70]/90" />
        <div className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-gradient-to-l from-[#003B70]/20 to-[#003B70]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-[#FCAF17]/15" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#FCAF17]" />

        <div className="mx-auto flex min-h-[390px] max-w-8xl items-center px-6 py-8">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FCAF17]">
              <span className="h-px w-10 bg-[#FCAF17]" />
              Connect with ICON
            </div>
            <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Start a conversation.
              <span className="block text-[#FCAF17]">Create meaningful impact.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Reach the right ICON office for intellectual property, industry collaboration,
              or technology commercialization support at NUST.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-8xl gap-8 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FCAF17]">
              Constituent Offices
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#003B70] sm:text-4xl">
              Find the team best suited to your needs
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#003B70]/70 sm:text-base lg:justify-self-end">
            ICON brings NUST&apos;s innovation, industry engagement, and technology-transfer
            functions together. Contact any office below and our team will guide your enquiry
            to the appropriate specialist.
          </p>
        </div>
      </section>

      <section className="bg-[#003B70]/[0.04] pb-14 pt-2 sm:pb-20">
        <div className="mx-auto grid max-w-8xl gap-6 px-6 sm:px-8 lg:grid-cols-3">
          {contactOffices.map((office) => (
            <article
              key={office.id}
              className="group flex overflow-hidden border border-[#003B70]/10 bg-white shadow-[0_16px_45px_rgba(0,59,112,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,59,112,0.14)] lg:flex-col"
            >
              <div className="relative min-h-48 w-2/5 overflow-hidden lg:h-56 lg:w-full">
                <Image
                  src={office.image}
                  alt={office.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 40vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#003B70]/25" />
                <span className="absolute left-4 top-4 bg-[#FCAF17] px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#003B70]">
                  {office.shortName}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-5">
                  <h3 className="font-serif text-xl leading-snug text-[#003B70] sm:text-2xl">
                    {office.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#003B70]/65">{office.summary}</p>
                </div>

                <div className="mt-auto space-y-3 border-t border-[#003B70]/10 pt-5">
                  <a
                    href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-3 text-sm font-medium text-[#003B70] transition hover:text-[#FCAF17]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#003B70] text-white">
                      <Phone size={15} />
                    </span>
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex min-w-0 items-center gap-3 text-sm font-medium text-[#003B70] transition hover:text-[#FCAF17]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FCAF17] text-[#003B70]">
                      <Mail size={15} />
                    </span>
                    <span className="truncate">{office.email}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-6 sm:px-8">
          <div className="relative overflow-hidden bg-[#003B70] text-white">
            <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full border-[42px] border-[#FCAF17]/15" />
            <div className="relative grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
                <div className="flex items-start gap-5">
                 
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FCAF17]">
                      Visit ICON at NUST
                    </span>
                    <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Our Islamabad campus office</h2>
                    <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-white/80 sm:text-base">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-[#FCAF17]" />
                      CIE Building, NUST Campus, H-12, Islamabad, Pakistan
                    </div>
                  </div>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-fit items-center justify-center gap-3 bg-[#FCAF17] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#003B70] transition hover:bg-white"
                >
                  <MapPinned size={17} />
                  Get Directions
                  <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="relative min-h-[360px] border-t-4 border-[#FCAF17] bg-white lg:min-h-[440px] lg:border-l-4 lg:border-t-0">
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415.19614781481914!2d72.98269803610685!3d33.642410900000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df967223019f1d%3A0x1cd4ec000a1e752c!2sTechOne%20NUST%20Incubator!5e0!3m2!1sen!2s!4v1787170596975!5m2!1sen!2s"
                  title="Map showing the ICON office at NUST H-12 Islamabad"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
