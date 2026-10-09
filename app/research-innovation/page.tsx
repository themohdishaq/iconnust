import { InnovationHero, InnovationImpact, CollaborationInquiry } from '@/components/innovation-collaboration/InnovationSections';
import NipoPortfolioIntro from '@/components/commercialisation/NipoPortfolioIntro';
import NipoDownloads from '@/components/commercialisation/NipoDownloads';
import FaqSection from '@/components/FaqSection';
import StatTile from "@/lib/models/StatTile";
import IpBreakdown from "@/lib/models/IpBreakdown";
import IpYearlyStat from "@/lib/models/IpYearlyStat";
import Faq from "@/lib/models/Faq";

export const dynamic = 'force-dynamic';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <InnovationHero />
      <InnovationImpact stats={stats} ipBreakdown={ipBreakdown} ipsFiled={ipsFiled} ipsAwarded={ipsAwarded} />
      <NipoPortfolioIntro />
      <NipoDownloads />
      
      <FaqSection faqs={faqs} />
      <CollaborationInquiry />
    </div>
  );
}
