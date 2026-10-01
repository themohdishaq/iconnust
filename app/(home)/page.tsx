import HomeHero from '@/components/HomeHero';
import IndustryServicesPortal from '@/components/Service';
import { NewsletterSignup, TechPlace, LatestNews, PartnershipInquiry } from '@/components/home/HomeSections';
import StatTile from "@/lib/models/StatTile";
import TechPlaceStat from "@/lib/models/TechPlaceStat";

export default async function Page() {
  const [tiles, techPlaceStats] = await Promise.all([
    StatTile.list("home"),
    TechPlaceStat.list(),
  ]);

  const stats = tiles.map((tile) => ({
    label: String(tile.label ?? ""),
    value: Number(tile.value ?? 0),
  }));

  const techPlaceCards = techPlaceStats.slice(0, 3).map((item) => ({
    label: item.title,
    value: Number(item.value ?? 0),
    subtitle: item.subtitle,
  }));

  return (
    <div className="min-h-screen  bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full">
      <HomeHero stats={stats} />
      <IndustryServicesPortal />
      <NewsletterSignup />
      <TechPlace techPlaceCards={techPlaceCards} />
      <LatestNews />
      <PartnershipInquiry />
    </div>
  );
}
