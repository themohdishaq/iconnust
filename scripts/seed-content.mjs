import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI (run with: node --env-file=.env.local scripts/seed-content.mjs)');

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const NewsSchema = new mongoose.Schema(
  {
    title: String, slug: { type: String, unique: true }, category: String, excerpt: String,
    content: [String], image: String, date: String, readTime: String, featured: Boolean,
  },
  { timestamps: true }
);
const EventSchema = new mongoose.Schema(
  { day: String, month: String, year: String, title: String, type: String, location: String, desc: String, registered: Number, order: Number },
  { timestamps: true }
);
const StorySchema = new mongoose.Schema(
  { name: String, tag: String, desc: String, founder: String, funding: String, image: String, order: Number },
  { timestamps: true }
);
const TeamMemberSchema = new mongoose.Schema(
  { name: String, title: String, dept: String, bio: String, focus: [String], image: String, email: String, order: Number },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model('News', NewsSchema);
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

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

const eventsSeed = [
  { date: { day: '15', month: 'May', year: '2026' }, title: 'NUST Innovation Summit 2026', type: 'Conference', location: 'NUST H-12 Auditorium, Islamabad', desc: 'Annual flagship event bringing together entrepreneurs, investors, industry leaders, and researchers. Keynotes, startup exhibitions, and live pitch competitions.', registered: 850 },
  { date: { day: '22', month: 'May', year: '2026' }, title: 'IP Commercialization Masterclass', type: 'Workshop', location: 'CIE Building, NUST', desc: 'A one-day intensive workshop on patent strategy, licensing negotiations, and IP monetization for researchers and innovators.', registered: 120 },
  { date: { day: '05', month: 'Jun', year: '2026' }, title: 'Industry Connect Forum — AI & Robotics', type: 'Webinar', location: 'Online (Zoom)', desc: 'Industry leaders from the AI and robotics sector meet NUST researchers for matchmaking and sponsored R&D discussions.', registered: 340 },
  { date: { day: '18', month: 'Jun', year: '2026' }, title: 'Startup Pitch Day — Incite Cohort 6', type: 'Pitch Event', location: 'NUST Tech One Incubator', desc: 'Six funded teams present their proof-of-concept results to a panel of investors and corporate partners.', registered: 200 },
];

const storiesSeed = [
  { name: 'EKKO', tag: 'Health Tech', desc: 'A therapeutic wave device for neuro-rehabilitation of patients with cerebral palsy, autism, and speech disorders — now deployed in 8 hospitals.', founder: 'Dr. Ahmed Khan', funding: '$2.5M', img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80' },
  { name: 'DermaVision', tag: 'AI Diagnostics', desc: 'AI-powered dermatological imaging with 94% accuracy for early skin cancer detection, licensed to 12 hospitals across Pakistan.', founder: 'Dr. Sara Ahmed', funding: '$1.8M', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80' },
  { name: 'Myobionics', tag: 'Medical Devices', desc: 'EMG-controlled prosthetic gripper restoring mobility to upper-limb amputees at a fraction of global market cost.', founder: 'Dr. Faisal Mehmood', funding: '$3.2M', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80' },
  { name: 'Radwi Electronics', tag: 'AgriTech', desc: 'Smart irrigation controller deployed across 500+ farms, reducing water consumption by 35% and increasing yield by 22%.', founder: 'Eng. Zubair Ahmed', funding: '$1.2M', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
];

const teamSeed = [
  { name: 'Dr Hassan Waqar Raja', title: 'Director, ICON — NUST', dept: 'Innovation & Commercialization Network', bio: "Mr Hassan Waqar Raja leads ICON's strategic vision for transforming NUST's research output into economic value. With over two decades of experience in academia-industry collaboration, he has been instrumental in building NUST's commercialization infrastructure.", focus: ['Strategic Partnerships', 'Policy Development', 'Stakeholder Engagement'], img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80', email: 'director.icon@nust.edu.pk' },
  { name: 'Mr Salam khan', title: 'Head, NIPO — Intellectual Property Office', dept: 'CIE Building, NUST H-12', bio: "Associate Professor at NUST and CEO of N-ovative Health Technologies NHT Pvt Ltd. Dr. Murtaza leads NIPO with a systematic approach to IP management, ensuring researchers can protect and commercialize their innovations with ease.", focus: ['IP Management', 'Patent Strategy', 'TISC Services'], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80', email: 'nipo@nust.edu.pk' },
  { name: 'Ms. Amna Farooq', title: 'Manager, Technology Transfer Office', dept: 'TTO — Licensing & Commercialization', bio: "Amna manages NUST's technology licensing portfolio and coordinates between industry partners and research groups. She has overseen 40+ licensing agreements and is a certified technology transfer professional (RTTP).", focus: ['Licensing', 'Industry Liaison', 'Spin-off Creation'], img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80', email: 'tto@nust.edu.pk' },
  { name: 'Dr. Naveed Qadir', title: 'Head, Research Directorate', dept: 'Sponsored Research & Industry Projects', bio: "Dr. Naveed leads NUST's sponsored research function, connecting corporate partners with the right research groups. Under his leadership, annual sponsored research funding has grown from PKR 420M to PKR 1.8B.", focus: ['Sponsored R&D', 'Grant Management', 'Industry Projects'], img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80', email: 'research@nust.edu.pk' },
];

await mongoose.connect(MONGODB_URI);

for (const n of newsSeed) {
  const slug = slugify(n.title);
  await News.findOneAndUpdate({ slug }, { ...n, slug }, { upsert: true, returnDocument: 'after' });
}
console.log(`Seeded ${newsSeed.length} news articles.`);

if ((await Event.countDocuments()) === 0) {
  await Event.insertMany(
    eventsSeed.map((e, i) => ({
      day: e.date.day, month: e.date.month, year: e.date.year,
      title: e.title, type: e.type, location: e.location, desc: e.desc,
      registered: e.registered, order: i,
    }))
  );
  console.log(`Seeded ${eventsSeed.length} events.`);
} else {
  console.log('Events already exist — skipped.');
}

if ((await Story.countDocuments()) === 0) {
  await Story.insertMany(
    storiesSeed.map((s, i) => ({
      name: s.name, tag: s.tag, desc: s.desc, founder: s.founder, funding: s.funding, image: s.img, order: i,
    }))
  );
  console.log(`Seeded ${storiesSeed.length} success stories.`);
} else {
  console.log('Success stories already exist — skipped.');
}

if ((await TeamMember.countDocuments()) === 0) {
  await TeamMember.insertMany(
    teamSeed.map((t, i) => ({
      name: t.name, title: t.title, dept: t.dept, bio: t.bio, focus: t.focus, image: t.img, email: t.email, order: i,
    }))
  );
  console.log(`Seeded ${teamSeed.length} team members.`);
} else {
  console.log('Team members already exist — skipped.');
}

await mongoose.disconnect();
