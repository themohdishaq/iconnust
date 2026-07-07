export interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  readTime: string;
  featured?: boolean;
}

// NOTE: dates for items without a confirmed date in source copy are
// placeholders (chronologically ordered) — update once real dates are known.
export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    category: 'Industry Collaboration',
    date: 'January 12, 2026',
    title:
      'ICON-NUST Hosts Artistic Milliners for Industry-Academia Engagement Session',
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
    id: '2',
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
    id: '3',
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

export function getNewsById(id: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.id === id);
}
