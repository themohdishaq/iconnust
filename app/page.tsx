import type { Metadata } from "next";
import HomePageClient from "./_components/HomePageClient";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const title = "Home";
const description =
  "The Innovation & Commercialization Network (ICON) at NUST bridges academic research and global industrial impact through technology licensing, spin-offs, sponsored R&D, and industry-facing lab services.";

export const metadata: Metadata = {
  title,
  description,
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
  alternateName: "Industry Collaboration and Commercialization Office, NUST",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-logo.png`,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Scholar House, Sector H-12",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  email: "info@icon.nust.edu.pk",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
