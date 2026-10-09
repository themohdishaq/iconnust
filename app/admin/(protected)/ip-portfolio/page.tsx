import { requireAdminSession } from '@/lib/auth';
import { listIpPortfolio } from '@/lib/models/IpPortfolio';
import IpPortfolioManager from '@/components/admin/ip-portfolio/IpPortfolioManager';

export const dynamic = 'force-dynamic';

export default async function IpPortfolioAdminPage() {
  await requireAdminSession();
  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl text-slate-900">IP Portfolio</h1>
      <p className="mb-8 text-sm text-slate-500">Manage patents, copyrights and industrial designs. Published records appear in the public intellectual property portfolio.</p>
      <IpPortfolioManager records={await listIpPortfolio(true)} />
    </div>
  );
}
