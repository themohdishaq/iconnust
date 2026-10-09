import IpoListing from '@/components/innovation-collaboration/IpoListing';
import { listIpPortfolio } from '@/lib/models/IpPortfolio';

export const dynamic = 'force-dynamic';

export default async function IpoListingPage() {
  return <IpoListing records={await listIpPortfolio()} />;
}
