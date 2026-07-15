import type { Metadata } from "next";
import CommercializationPageClient from "./_components/CommercializationPageClient";
import { SITE_NAME } from "@/lib/seo";

const title = "Commercialization";
const description =
  "Explore ICON's commercialization pathways at NUST — technology licensing, spin-off creation, sponsored R&D, and IP protection — turning research breakthroughs into market-ready ventures.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/commercialization",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/commercialization",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function Page() {
  return <CommercializationPageClient />;
}
