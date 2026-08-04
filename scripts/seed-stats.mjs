import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/seed-stats.mjs)');
}

const homeTilesSeed = [
  { label: 'Industry Partners', value: 900 },
  { label: 'IP filings', value: 1418 },
  { label: 'IPRS Awarded', value: 310 },
  { label: 'Spin-off Ventures', value: 80 },
  { label: 'IPRS licensed to Industry', value: 446 },
];

const innovationTilesSeed = [
  { label: 'IP Filings', value: 1418 },
  { label: 'IPRs Awarded', value: 310 },
  { label: 'Total Patents', value: 43 },
];

const ipBreakdownSeed = [
  { name: 'Designs', value: 673, color: '#3B82C4' },
  { name: 'Patents', value: 446, color: '#C3D62E' },
  { name: 'Copyrights', value: 245, color: '#98DF8A' },
  { name: 'Trademarks', value: 54, color: '#8E44AD' },
];

const ipsFiledSeed = [
  { year: '2020', industrialDesign: 89, copyright: 33, patents: 92, trademark: 19 },
  { year: '2021', industrialDesign: 66, copyright: 43, patents: 65, trademark: 27 },
  { year: '2022', industrialDesign: 59, copyright: 23, patents: 30, trademark: 0 },
  { year: '2023', industrialDesign: 112, copyright: 30, patents: 24, trademark: 2 },
  { year: '2024', industrialDesign: 8, copyright: 27, patents: 8, trademark: 12 },
  { year: '2025', industrialDesign: 76, copyright: 44, patents: 9, trademark: 0 },
  { year: '2026', industrialDesign: 35, copyright: 15, patents: 28, trademark: 0 },
];

const ipsAwardedSeed = [
  { year: '2020', industrialDesign: 11, copyright: 1, patents: 4, trademark: 0 },
  { year: '2021', industrialDesign: 30, copyright: 0, patents: 2, trademark: 0 },
  { year: '2022', industrialDesign: 32, copyright: 19, patents: 1, trademark: 3 },
  { year: '2023', industrialDesign: 6, copyright: 6, patents: 0, trademark: 1 },
  { year: '2024', industrialDesign: 1, copyright: 21, patents: 0, trademark: 0 },
  { year: '2025', industrialDesign: 12, copyright: 1, patents: 0, trademark: 1 },
  { year: '2026', industrialDesign: 39, copyright: 16, patents: 3, trademark: 0 },
];

const financialStatsSeed = [
  { year: '2022-23', amount: 125.41, isTotal: false },
  { year: '2024-25', amount: 228.44, isTotal: false },
  { year: '2026 (To-date)', amount: 94.54, isTotal: false },
  { year: 'Total', amount: 448.4, isTotal: true },
];

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

async function seedIfEmpty(table, whereClause, whereParams, rows, insert) {
  const [[{ c }]] = await pool.query(`SELECT COUNT(*) AS c FROM ${table} ${whereClause}`, whereParams);
  if (c > 0) {
    console.log(`${table}${whereClause ? ' ' + whereClause : ''} already seeded — skipped.`);
    return;
  }
  for (const [i, row] of rows.entries()) {
    await insert(row, i);
  }
  console.log(`Seeded ${rows.length} rows into ${table}${whereClause ? ' ' + whereClause : ''}.`);
}

await seedIfEmpty(
  'stat_tiles',
  "WHERE page = 'home'",
  [],
  homeTilesSeed,
  (row, i) => pool.execute('INSERT INTO stat_tiles (page, label, value, sort_order) VALUES (?, ?, ?, ?)', ['home', row.label, row.value, i])
);

await seedIfEmpty(
  'stat_tiles',
  "WHERE page = 'innovation'",
  [],
  innovationTilesSeed,
  (row, i) => pool.execute('INSERT INTO stat_tiles (page, label, value, sort_order) VALUES (?, ?, ?, ?)', ['innovation', row.label, row.value, i])
);

await seedIfEmpty(
  'ip_breakdown',
  '',
  [],
  ipBreakdownSeed,
  (row, i) => pool.execute('INSERT INTO ip_breakdown (name, value, color, sort_order) VALUES (?, ?, ?, ?)', [row.name, row.value, row.color, i])
);

await seedIfEmpty(
  'ip_yearly_stats',
  "WHERE chart_type = 'filed'",
  [],
  ipsFiledSeed,
  (row, i) => pool.execute(
    'INSERT INTO ip_yearly_stats (chart_type, year, industrial_design, copyright, patents, trademark, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['filed', row.year, row.industrialDesign, row.copyright, row.patents, row.trademark, i]
  )
);

await seedIfEmpty(
  'ip_yearly_stats',
  "WHERE chart_type = 'awarded'",
  [],
  ipsAwardedSeed,
  (row, i) => pool.execute(
    'INSERT INTO ip_yearly_stats (chart_type, year, industrial_design, copyright, patents, trademark, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['awarded', row.year, row.industrialDesign, row.copyright, row.patents, row.trademark, i]
  )
);

await seedIfEmpty(
  'financial_stats',
  '',
  [],
  financialStatsSeed,
  (row, i) => pool.execute('INSERT INTO financial_stats (year, amount, is_total, sort_order) VALUES (?, ?, ?, ?)', [row.year, row.amount, row.isTotal, i])
);

await pool.end();
