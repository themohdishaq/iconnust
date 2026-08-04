import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

const title = "About ICON NUST";
const description =
  "Learn about the Innovation and Commercialization Office (ICON) at NUST. Discover our mission, constituent offices, technology transfer initiatives, intellectual property services, corporate partnerships, and commitment to transforming research into real-world innovation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "About ICON NUST",
    "Innovation and Commercialization Office",
    "ICON NUST",
    "NUST",
    "National University of Sciences and Technology",
    "Technology Transfer Office",
    "TTO NUST",
    "NUST Intellectual Property Office",
    "NIPO NUST",
    "Corporate Advisory Council",
    "CAC NUST",
    "Technology Transfer Pakistan",
    "Research Commercialization",
    "University Innovation",
    "Intellectual Property",
    "Patent Support Pakistan",
    "Industry Academia Collaboration",
    "Sponsored Research",
    "University Research",
    "Innovation Ecosystem Pakistan",
    "Commercialization of Research",
    "University Spin-offs",
    "Research Partnerships",
    "Innovation Office Pakistan",
    "Technology Licensing",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "About ICON NUST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}