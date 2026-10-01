import { IndustryHero, ServiceExplorer, EngagementSteps, IndustrySectors, IndustryInquiry } from '@/components/industry-services/IndustrySections';
import FaqSection from '@/components/FaqSection';
import Faq from "@/lib/models/Faq";

export default async function Page() {
  const faqs = await Faq.list('industry-services');
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#003B70]">
      <IndustryHero />
      <ServiceExplorer />
      <EngagementSteps />
      <IndustrySectors />
      <IndustryInquiry />
      <FaqSection faqs={faqs} />
    </div>
  );
}
