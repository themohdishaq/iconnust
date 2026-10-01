import CommercializationExperience from "@/components/commercialisation/CommercializationExperience";
import Faq from "@/lib/models/Faq";

export default async function Page() {
  const faqs = await Faq.list('commercialization');
  return <CommercializationExperience faqs={faqs} />;
}
