import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB_HOST / DB_USER / DB_NAME (run with: node --env-file=.env.local scripts/seed-content.mjs)');
}

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const newsSeed = [
  {
    category: 'Industry Collaboration',
    date: 'January 12, 2026',
    title: 'ICON-NUST Hosts Artistic Milliners for Industry-Academia Engagement Session',
    excerpt:
      "ICON-NUST, through its Corporate Advisory Council (CAC), hosted Artistic Milliners in collaboration with the Pakistan Business Council (PBC) to explore partnerships in Industry 4.0, digital transformation, sustainability, advanced manufacturing, data analytics, and applied research. The visit showcased NUST's innovation ecosystem and strengthened long-term industry-academia collaboration.",
    content: [
      "ICON-NUST, through its Corporate Advisory Council (CAC), hosted a delegation from Artistic Milliners in collaboration with the Pakistan Business Council (PBC) for an industry-academia engagement session held on NUST's campus.",
      "The session brought together senior representatives from Artistic Milliners with NUST faculty and researchers to explore potential areas of collaboration, including Industry 4.0 adoption, digital transformation, sustainability practices, advanced manufacturing techniques, data analytics, and applied research initiatives relevant to the textile and manufacturing sector.",
      "The visit gave the Artistic Milliners team a first-hand look at NUST's innovation ecosystem, including its research labs, incubation facilities, and technology transfer capabilities. Both sides expressed interest in building a long-term partnership that connects NUST's research strengths with industry-driven problem statements.",
      'ICON-NUST continues to facilitate these engagement sessions through its Corporate Advisory Council as part of its broader mandate to strengthen ties between academia and industry.',
    ],
    image: '/partner/news1.jpeg',
    readTime: '3 min',
    featured: false,
  },
  {
    category: 'MoU Signing',
    date: 'February 2, 2026',
    title: 'NUST and JW SEZ Group Partner to Advance Research and Innovation',
    excerpt:
      'NUST and JW SEZ Group - Pakistan signed an MoU to collaborate on research, innovation, commercialization, talent development, internships, industrial engagement, curriculum alignment, and capacity-building initiatives, strengthening industry-academia partnerships for sustainable growth.',
    content: [
      'NUST and JW SEZ Group - Pakistan have signed a Memorandum of Understanding (MoU) to formalise a collaborative partnership spanning research, innovation, and talent development.',
      'Under the agreement, both organisations will work together on joint research and innovation projects, technology commercialization efforts, and capacity-building initiatives. The MoU also covers talent development programmes, student internships, and closer industrial engagement between NUST and JW SEZ Group.',
      "As part of the partnership, the two sides will explore opportunities for curriculum alignment to ensure NUST's academic programmes remain closely tied to industry needs, alongside broader capacity-building initiatives aimed at supporting sustainable growth for both organisations.",
      "The signing reflects ICON-NUST's ongoing efforts to build strategic, long-term relationships with industry partners that translate academic research into real-world impact.",
    ],
    image: '/partner/image.png',
    readTime: '3 min',
    featured: false,
  },
  {
    category: 'Partnership',
    date: 'February 16, 2026',
    title: 'NUST and ZEUS Energy Sign DoU to Strengthen Industry-Academia Collaboration',
    excerpt:
      'NUST and ZEUS Energy successfully signed a Deed of Understanding (DoU) on 16th February 2026 at the RIC Secretariat. The collaboration aims to strengthen academia-industry linkages and foster joint initiatives in areas of mutual interest through strategic cooperation.',
    content: [
      'NUST and ZEUS Energy signed a Deed of Understanding (DoU) on 16th February 2026 at the RIC Secretariat, formalising a new collaboration aimed at strengthening industry-academia linkages.',
      'The agreement sets the stage for joint initiatives between NUST and ZEUS Energy in areas of mutual interest, with both organisations committing to explore opportunities for strategic cooperation going forward.',
      'The signing ceremony, held at the RIC Secretariat, was attended by representatives from both organisations, underscoring the shared commitment to deepening ties between academia and the energy sector.',
      "This DoU adds to ICON-NUST's growing portfolio of industry partnerships forged through the Research, Innovation & Commercialization (RIC) office.",
    ],
    image: '/partner/news3.jpeg',
    readTime: '2 min',
    featured: true,
  },
];


const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

for (const n of newsSeed) {
  const slug = slugify(n.title);
  await pool.execute(
    `INSERT INTO news (title, slug, category, excerpt, content, image, date, read_time, featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), excerpt = VALUES(excerpt),
       content = VALUES(content), image = VALUES(image), date = VALUES(date), read_time = VALUES(read_time),
       featured = VALUES(featured)`,
    [n.title, slug, n.category, n.excerpt, JSON.stringify(n.content), n.image, n.date, n.readTime, n.featured]
  );
}
console.log(`Seeded ${newsSeed.length} news articles.`);

const [[{ c: eventCount }]] = await pool.query('SELECT COUNT(*) AS c FROM events');
if (eventCount === 0) {
  for (const [i, e] of eventsSeed.entries()) {
    await pool.execute(
      'INSERT INTO events (day, month, year, title, type, location, description, registered, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [e.date.day, e.date.month, e.date.year, e.title, e.type, e.location, e.desc, e.registered, i]
    );
  }
  console.log(`Seeded ${eventsSeed.length} events.`);
} else {
  console.log('Events already exist — skipped.');
}

const [[{ c: storyCount }]] = await pool.query('SELECT COUNT(*) AS c FROM stories');
if (storyCount === 0) {
  for (const [i, s] of storiesSeed.entries()) {
    await pool.execute(
      'INSERT INTO stories (name, tag, description, founder, funding, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [s.name, s.tag, s.desc, s.founder, s.funding, s.img, i]
    );
  }
  console.log(`Seeded ${storiesSeed.length} success stories.`);
} else {
  console.log('Success stories already exist — skipped.');
}

const [[{ c: teamCount }]] = await pool.query('SELECT COUNT(*) AS c FROM team_members');
if (teamCount === 0) {
  for (const [i, t] of teamSeed.entries()) {
    await pool.execute(
      'INSERT INTO team_members (name, title, dept, bio, focus, image, email, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [t.name, t.title, t.dept, t.bio, JSON.stringify(t.focus), t.img, t.email, i]
    );
  }
  console.log(`Seeded ${teamSeed.length} team members.`);
} else {
  console.log('Team members already exist — skipped.');
}

await pool.end();
