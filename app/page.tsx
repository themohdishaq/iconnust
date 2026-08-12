import type { Metadata } from "next";
import HomePageClient from "./_components/HomePageClient";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import StatTile from "@/lib/models/StatTile";

const title = "Home";
const description =
  "Innovation & Commercialization Office (ICON) at NUST bridges academic research and global industrial impact through technology licensing, spin-offs, sponsored R&D, and industry-facing lab services.";

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
  alternateName: "Innovation Collaboration and Commercialization Office, NUST",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-logo.png`,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "National University of Sciences and Technology",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "CIE Building, NUST Campus, sector H-12",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  email: "info@icon.nust.edu.pk",
};

export default async function Page() {
  const tiles = await StatTile.list('home');
  const stats = tiles.map((t) => ({ label: t.label, value: t.value }));


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePageClient stats={stats}  />
    </>
  );
}
