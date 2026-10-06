import CommercializationExperience from "@/components/commercialisation/CommercializationExperience";
import Faq from "@/lib/models/Faq";
import { listInnovationPortfolio } from '@/lib/models/InnovationPortfolio';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const [faqs, { sectors }] = await Promise.all([Faq.list('commercialization'), listInnovationPortfolio()]);
  return <CommercializationExperience faqs={faqs} sectors={sectors} />;
}
