import type { Metadata } from "next";
import InnovationCollaborationPageClient from "./_components/InnovationCollaborationPageClient";
import { SITE_NAME } from "@/lib/seo";

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

export default function Page() {
  return <InnovationCollaborationPageClient />;
}
