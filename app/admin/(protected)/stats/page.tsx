import StatTile from '@/lib/models/StatTile';
import IpBreakdown from '@/lib/models/IpBreakdown';
import IpYearlyStat from '@/lib/models/IpYearlyStat';
import FinancialStat from '@/lib/models/FinancialStat';
import TechPlaceStat from '@/lib/models/TechPlaceStat';
import StatTable from './_components/StatTable';
import StatsSectionSelector from './_components/StatsSectionSelector';
import {
  createStatTileAction,
  updateStatTileAction,
  deleteStatTileAction,
  createIpBreakdownAction,
  updateIpBreakdownAction,
  deleteIpBreakdownAction,
  createIpYearlyStatAction,
  updateIpYearlyStatAction,
  deleteIpYearlyStatAction,
  createFinancialStatAction,
  updateFinancialStatAction,
  deleteFinancialStatAction,
  createTechPlaceAction,
  updateTechPlaceAction,
  deleteTechPlaceAction,
} from './actions';

export const dynamic = 'force-dynamic';

const tileColumns = [
  { key: 'label', label: 'Label', type: 'text' as const },
  { key: 'value', label: 'Value', type: 'number' as const },
];

const ipBreakdownColumns = [
  { key: 'name', label: 'Name', type: 'text' as const },
  { key: 'value', label: 'Value', type: 'number' as const },
  { key: 'color', label: 'Color', type: 'color' as const },
];

const ipYearlyColumns = [
  { key: 'year', label: 'Year', type: 'text' as const },
  { key: 'industrialDesign', label: 'Industrial Design', type: 'number' as const },
  { key: 'copyright', label: 'Copyright', type: 'number' as const },
  { key: 'patents', label: 'Patents', type: 'number' as const },
  { key: 'trademark', label: 'Trademark', type: 'number' as const },
];

const financialColumns = [
  { key: 'year', label: 'Year', type: 'text' as const },
  { key: 'amount', label: 'Amount (PKR Million)', type: 'number' as const, step: '0.01' },
  { key: 'isTotal', label: 'Total row', type: 'checkbox' as const },
];

const techPlaceColumns = [
  { key: 'title', label: 'Card Title', type: 'text' as const },
  { key: 'value', label: 'Count', type: 'number' as const },
  { key: 'subtitle', label: 'Subtitle', type: 'text' as const },
];

export default async function AdminStatsPage() {
  const [homeTiles, innovationTiles, ipBreakdown, ipsFiled, ipsAwarded, financialStats, techPlaceStats] = await Promise.all([
    StatTile.list('home'),
    StatTile.list('innovation'),
    IpBreakdown.list(),
    IpYearlyStat.list('filed'),
    IpYearlyStat.list('awarded'),
    FinancialStat.list(),
    TechPlaceStat.list(),
  ]);

  return (
    <div>
      <StatsSectionSelector />

      <h1 className="text-2xl font-serif text-slate-900 mb-1">Stats & Impact</h1>
      <p className="text-slate-500 text-sm mb-8">
        Manage the numbers and chart data shown on the Home, Innovation &amp; Collaboration, and Commercialisation pages.
      </p>

      <div className="space-y-6">
        <StatTable
          id="home-page-live-impact-engine"
          title="Home Page — Live Impact Engine"
          description="The stat tiles shown in the homepage hero banner."
          columns={tileColumns}
          rows={homeTiles}
          createAction={createStatTileAction.bind(null, 'home')}
          updateAction={updateStatTileAction}
          deleteAction={deleteStatTileAction}
        />

        <StatTable
          id="innovation-impact-tiles"
          title="Innovation & Collaboration — Impact Tiles"
          description="The 3 stat tiles above the IP charts on the Innovation & Collaboration page."
          columns={tileColumns}
          rows={innovationTiles}
          createAction={createStatTileAction.bind(null, 'innovation')}
          updateAction={updateStatTileAction}
          deleteAction={deleteStatTileAction}
        />

        <StatTable
          id="ip-area-breakdown"
          title="IP Area Breakdown (Donut Chart)"
          description="Categories shown in the 'Total IP Filed' donut chart on the Innovation & Collaboration page."
          columns={ipBreakdownColumns}
          rows={ipBreakdown}
          createAction={createIpBreakdownAction}
          updateAction={updateIpBreakdownAction}
          deleteAction={deleteIpBreakdownAction}
        />

        <StatTable
          id="ips-filed-by-year"
          title="IPs Filed by Year (2020–2026)"
          description="Stacked bar chart data on the Innovation & Collaboration page."
          columns={ipYearlyColumns}
          rows={ipsFiled}
          createAction={createIpYearlyStatAction.bind(null, 'filed')}
          updateAction={updateIpYearlyStatAction}
          deleteAction={deleteIpYearlyStatAction}
        />

        <StatTable
          id="ips-awarded-by-year"
          title="IPs Awarded by Year (2020–2026)"
          description="Stacked bar chart data on the Innovation & Collaboration page."
          columns={ipYearlyColumns}
          rows={ipsAwarded}
          createAction={createIpYearlyStatAction.bind(null, 'awarded')}
          updateAction={updateIpYearlyStatAction}
          deleteAction={deleteIpYearlyStatAction}
        />

        <StatTable
          id="financial-chart"
          title="Financial Chart (Commercialization Page)"
          description="Currently not displayed on the public site — the chart is temporarily hidden, but its data stays editable here."
          columns={financialColumns}
          rows={financialStats}
          createAction={createFinancialStatAction}
          updateAction={updateFinancialStatAction}
          deleteAction={deleteFinancialStatAction}
        />

        <StatTable
          id="homepage-tech-place-cards"
          title="Homepage Tech Place Cards (Fixed Titles / Editable Values & Text)"
          description="These public card titles are locked on the homepage. Update the count and subtitle here to change the displayed numbers and descriptions."
          columns={techPlaceColumns}
          rows={techPlaceStats}
          createAction={createTechPlaceAction}
          updateAction={updateTechPlaceAction}
          deleteAction={deleteTechPlaceAction}
        />
      </div>
    </div>
  );
}
