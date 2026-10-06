import PortfolioManager from '@/components/admin/innovation/PortfolioManager';
import { listInnovationPortfolio } from '@/lib/models/InnovationPortfolio';

export const dynamic = 'force-dynamic';

export default async function InnovationAdminPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-serif text-slate-900">Sectors & Projects</h1>
      <p className="mb-8 text-sm text-slate-500">Manage the innovation portfolio. Saved changes appear immediately on the commercialisation pages.</p>
      <PortfolioManager portfolio={await listInnovationPortfolio()} />
    </div>
  );
}
