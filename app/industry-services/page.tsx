import type { Metadata } from "next";
import IndustryServicesPageClient from "./_components/IndustryServicesPageClient";
import { SITE_NAME } from "@/lib/seo";

const title = "Industry Services";
const description =
  "ICON bridges NUST's research capabilities with Pakistan's industries — offering R&D support, expert consultancy, workforce upskilling, and ISO-certified lab and testing services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/industry-services",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/industry-services",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function Page() {
  return <IndustryServicesPageClient />;
}
