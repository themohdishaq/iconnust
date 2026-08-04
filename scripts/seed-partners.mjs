import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/seed-partners.mjs)');
}

// Preserves the partner list that was previously hardcoded in components/Partner.tsx,
// now that the home page reads partners from the database instead.
const partnersSeed = [
  { name: 'Toyota Indus Motor Company', logo: '/toyota.jpg' },
  { name: 'Attock Refinery Limited (ARL)', logo: '/Attock Refinery Limited (ARL).png' },
  { name: 'Pakistan Business Council (PBC)', logo: '/Pakistan Business Council (PBC).svg' },
  { name: 'Scotmann Pharmaceuticals', logo: '/Scotmann Pharmaceuticals.png' },
  { name: "Wilson's Pharmaceuticals", logo: "/Wilson's Pharmaceuticals logo.jpg" },
  { name: 'Fauji Fertilizer Company (FFC)', logo: '/Fauji Fertilizer Company (FFC).png' },
  { name: 'AGP Limited', logo: '/AGP Limited.jpg' },
  { name: 'Honda', logo: '/Honda.png' },
  { name: 'CTGI', logo: '/CTGI logo.jpg' },
  { name: 'Huawei Technologies', logo: '/Huawei Technologies.png' },
  { name: 'Interactive Group', logo: '/Interactive Group.jpg' },
  { name: 'Crescent Steel & Allied Products Limited', logo: '/Crescent Steel & Allied Products Limited.png' },
  { name: 'Graana.com', logo: '/Graana.png' },
  { name: 'Khushhali Microfinance Bank', logo: '/Khushhali Microfinance Bank.png' },
  { name: 'Pakistan Telecommunication Authority (PTA)', logo: '/Pakistan Telecommunication Authority (PTA).png' },
  { name: 'Allied Bank', logo: '/Allied Bank logo.png' },
  { name: 'Oracle', logo: '/Oracle.webp' },
  { name: 'Rastgar Engineering Company', logo: null },
  { name: 'Sustainable Development Policy Institute (SDPI)', logo: '/Sustainable Development Policy Institute (SDPI).webp' },
  { name: 'Nayatel', logo: '/Nayatel.jpg' },
  { name: 'Netsol Technologies', logo: '/Netsol Technologies.svg' },
  { name: 'NADRA', logo: '/NADRA.png' },
  { name: 'Serena Hotels', logo: '/Serena Hotels.png' },
  { name: 'Keystone', logo: null },
  { name: 'Moftak Solutions', logo: '/Moftak Solutions.jpg' },
  { name: 'PepsiCo', logo: '/PepsiCo.jpg' },
  { name: 'Askari Bank', logo: '/Askari Bank.jpg' },
  { name: 'National Bank of Pakistan (NBP)', logo: '/National Bank of Pakistan (NBP).jpg' },
  { name: 'Jazz', logo: '/Jazz.jpg' },
  { name: 'Habib Bank Limited (HBL)', logo: '/Habib Bank Limited (HBL).jpg' },
  { name: 'Pakistan Tobacco Company (PTC)', logo: '/Pakistan Tobacco Company (PTC).png' },
  { name: 'International Finance Corporation (IFC)', logo: '/International Finance Corporation (IFC).jpg' },
  { name: 'Islamabad Chamber of Commerce & Industry (ICCI)', logo: '/Islamabad Chamber of Commerce & Industry (ICCI).jpg' },
  { name: 'Pakistan Agricultural Research Council (PARC)', logo: '/Pakistan Agricultural Research Council (PARC).jpg' },
  { name: 'Pakistan Telecommunication Company Limited (PTCL)', logo: '/Pakistan Telecommunication Company Limited (PTCL).png' },
];

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const [[{ c: partnerCount }]] = await pool.query('SELECT COUNT(*) AS c FROM partners');
if (partnerCount === 0) {
  for (const [i, p] of partnersSeed.entries()) {
    await pool.execute(
      'INSERT INTO partners (name, description, logo, sort_order) VALUES (?, ?, ?, ?)',
      [p.name, '', p.logo, i]
    );
  }
  console.log(`Seeded ${partnersSeed.length} partners.`);
} else {
  console.log('Partners already exist — skipped.');
}

await pool.end();
