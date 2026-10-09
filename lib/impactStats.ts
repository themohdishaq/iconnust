type YearlyIpRow = { year: string; industrialDesign: number; copyright: number; patents: number; trademark: number };

export function buildIpTrend(filed: YearlyIpRow[], awarded: YearlyIpRow[]) {
  const rows = new Map<string, { year: string; filed: number; awarded: number }>();
  for (const [kind, entries] of [['filed', filed], ['awarded', awarded]] as const) {
    for (const entry of entries) {
      const row = rows.get(entry.year) ?? { year: entry.year, filed: 0, awarded: 0 };
      row[kind] += Number(entry.industrialDesign) + Number(entry.copyright) + Number(entry.patents) + Number(entry.trademark);
      rows.set(entry.year, row);
    }
  }
  return [...rows.values()].sort((a, b) => a.year.localeCompare(b.year, undefined, { numeric: true }));
}
