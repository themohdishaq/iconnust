import type { Metadata } from "next";
import CommercializationPageClient from "./_components/CommercializationPageClient";
import { SITE_NAME } from "@/lib/seo";
import Faq from "@/lib/models/Faq";

const title = "Commercialisation";
const description =
  "Explore ICON's commercialisation pathways at NUST — technology licensing, spin-off creation, sponsored R&D, and IP protection — turning research breakthroughs into market-ready ventures.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/commercialisation",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/commercialisation",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function Page() {
  const faqs = await Faq.list('commercialization');
  return <CommercializationPageClient faqs={faqs} />;
}
