import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = "Home";

const description =
  "Innovation & Commercialisation Office (ICON) at NUST bridges academic research and global industrial impact through technology licensing, spin-offs, sponsored R&D, and industry-facing lab services.";
const keywords = [
  "NUST ICON",
  "NUST Innovation and Commercialisation Office",
  "Innovation and Commercialization Office",
  "technology licensing Pakistan",
  "technology transfer office Pakistan",
  "university spin-offs Pakistan",
  "NUST IPO",
  "NUST INTELLECTUAL PROPERTY OFFICE",
  "sponsored research and development",
  "industry lab services",
  "NUST research commercialization",
  "academia industry collaboration Pakistan",
  "NUST Islamabad",
];
export const metadata: Metadata = {
  title,
  description,
  keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: SITE_URL,
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Innovation & Commercialisation Office, NUST",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-logo.png`,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "CIE Building, NUST Campus, Sector H-12",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  email: "info@icon.nust.edu.pk",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      {children}
    </>
  );
}
