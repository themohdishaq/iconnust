import type { Metadata } from "next";
import InnovationCollaborationPageClient from "./_components/InnovationCollaborationPageClient";
import { SITE_NAME } from "@/lib/seo";
import StatTile from "@/lib/models/StatTile";
import IpBreakdown from "@/lib/models/IpBreakdown";
import IpYearlyStat from "@/lib/models/IpYearlyStat";
import Faq from "@/lib/models/Faq";

const title = "Innovation & Collaboration";
const description =
  "Transform your invention into global impact with ICON's IP filing support, multi-disciplinary research clusters, and industry co-creation programs at NUST.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/innovation-collaboration",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/innovation-collaboration",
  },
  twitter: {
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function Page() {
  const [tiles, ipBreakdown, ipsFiled, ipsAwarded, faqs] = await Promise.all([
    StatTile.list('innovation'),
    IpBreakdown.list(),
    IpYearlyStat.list('filed'),
    IpYearlyStat.list('awarded'),
    Faq.list('innovation-collaboration'),
  ]);

  const stats = tiles.map((t) => ({ label: t.label, value: t.value }));

  return (
    <InnovationCollaborationPageClient
      stats={stats}
      ipBreakdown={ipBreakdown}
      ipsFiled={ipsFiled}
      ipsAwarded={ipsAwarded}
      faqs={faqs}
    />
  );
}
