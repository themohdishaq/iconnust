export type InnovationProject = {
  id: string;
  title: string;
  type: 'project' | 'spin-off';
  description: string;
  image: string;
  status?: string;
  highlight?: string;
  category: string;
};

export type InnovationSector = {
  slug: string;
  title: string;
  description: string;
  projects: number;
  spinOffs: number;
  iconKey: 'stethoscope' | 'brainCircuit' | 'sprout' | 'wind' | 'car' | 'shield' | 'settings';
  heroImage: string;
  ipAssets?: number | string;
  industryPartners?: number;
};

const sectorDefinitions: Omit<InnovationSector, "projects" | "spinOffs">[] = [
  {
    slug: 'digital-ai-intelligent-systems',
    title: 'Digital, AI & Intelligent Systems',
    description: 'Transforming industries and society through artificial intelligence, data-driven digital services, and intelligent systems.',
    iconKey: 'brainCircuit',
    heroImage: '/industry-services/labservices.jpg',
  },
  {
    slug: 'energy-water-climate-sustainability',
    title: 'Energy, Water, Climate & Sustainability',
    iconKey: 'wind',
    heroImage: '/project/EnergEyer.png',
    description: 'Innovative solutions for clean energy, water resilience, climate action, and sustainable resource management.',
  },
  {
    slug: 'health-pharma-biomedical-systems',
    title: 'Health, Pharma & Biomedical Systems',
    description: 'Advancing healthcare through biomedical devices, diagnostics, rehabilitation systems and AI-enabled medical technologies.',
    iconKey: 'stethoscope',
    heroImage: '/industry-services/rnd.jpg',
  },
  {
    slug: 'agriculture-food-systems',
    title: 'Agriculture & Food Systems',
    description: 'Driving food security through sustainable agriculture, smart farming, bio-based solutions and innovative agri-technologies.',
    iconKey: 'sprout',
    heroImage: '/project/smartagriculture.png',
  },
  {
    slug: 'mobility-automotive-systems',
    title: 'Mobility & Automotive Systems',
    description: 'Advancing smart, safe and sustainable mobility through innovative automotive technologies, intelligent systems and next-generation transportation solutions.',
    iconKey: 'car',
    heroImage: '/industry-services/icon-industry.jpg',
  },
  {
    slug: 'defence-strategic-technologies',
    title: 'Defence & Strategic Technologies',
    description: 'Developing dual-use technologies and advanced solutions to support national security, strategic capabilities and resilient infrastructure.',
    iconKey: 'shield',
    heroImage: '/project/smartagriculture.png',
  },
  {
    slug: 'manufacturing-industrial-technologies',
    title: 'Manufacturing & Industrial Technologies',
    description: 'Industrial systems, robotics, advanced manufacturing, and engineering-driven productivity solutions.',
    iconKey: 'settings',
    heroImage: '/project/project1.png',
  },
  {
    slug: 'creative-industries-media-tourism',
    title: 'Creative Industries, Media & Tourism',
    description: 'Creative and culture-driven innovation through digital media, experience design and tourism-focused technology.',
    iconKey: 'settings',
    heroImage: '/industry-services/rnd.jpg',
  },
];

const sectorSlugAliases: Record<string, string[]> = {
  'digital-ai-intelligent-systems': ['ai-intelligent-systems', 'software-platforms'],
  'energy-water-climate-sustainability': ['energy-climate'],
  'health-pharma-biomedical-systems': ['health-pharma'],
  'agriculture-food-systems': ['agriculture-food'],
  'mobility-automotive-systems': ['mobility-automotive'],
  'defence-strategic-technologies': ['defence-strategic'],
  'manufacturing-industrial-technologies': ['advanced-engineering'],
  'creative-industries-media-tourism': [],
};

// Source records: List of Projects for Website (2).docx (13 projects)
// and SpinOff for ICON Website.xlsx (7 spin-offs). Keep each record unique;
// multi-sector spin-offs are included in every explicitly listed sector.
type PortfolioEntry = InnovationProject & { sectorSlugs: string[] };

export const innovationPortfolio: PortfolioEntry[] = [
  {
    "id": "ekko-therapy-device",
    "title": "EKKO Therapy Device",
    "type": "project",
    "description": "Vibration-based cerebral palsy therapy proven across hundreds of children; portable home version enables parent-led therapy—no indigenous competitor.\nRehab & therapy centers",
    "image": "/project/ekko.png",
    "category": "Healthcare & Rehabilitation",
    "sectorSlugs": [
      "health-pharma"
    ],
    "status": "Protected Nationally and Internationally",
    "highlight": "TRL 9 ? International Recognition"
  },
  {
    "id": "myo-prosthetic-upper-limb",
    "title": "Myo prosthetic upper limb",
    "type": "project",
    "description": "Low-cost EMG-controlled prosthetic, locally manufacturable; multi-DOF successor extends the product line. AFIRM is one of the clients using this NUST product successfully",
    "image": "/project/Prosthetic.png",
    "category": "Healthcare & Rehabilitation",
    "sectorSlugs": [
      "health-pharma"
    ],
    "status": "5 IPR-protected Nationally",
    "highlight": "TRL 6"
  },
  {
    "id": "hesschart",
    "title": "Hesschart",
    "type": "project",
    "description": "Automated strabismus measurement & reporting; works alongside the manual workflow. Looking for a partnership for the commercialization activities for this project",
    "image": "",
    "category": "Medical Imaging & AI Diagnostics",
    "sectorSlugs": [
      "health-pharma"
    ],
    "status": "IP protected nationally",
    "highlight": "TRL 6"
  },
  {
    "id": "dermavision",
    "title": "DermaVision",
    "type": "project",
    "description": "AI-powered digital pathology platform for skin tissue analysis that brings lab-grade insight to the screen. Using deep learning and generative AI, it can enhance histopathology workflows by producing high-resolution, stain-like visualizations and supporting automated tissue interpretation to help clinicians and researchers review slides faster and more consistently",
    "image": "",
    "category": "Medical Imaging & AI Diagnostics",
    "sectorSlugs": [
      "health-pharma"
    ],
    "status": "IP protected nationally ? 1st Runner-Up at the Health Systems Innovation Lab at Harvard University Venture Building Program",
    "highlight": "TRL 6"
  },
  {
    "id": "automated-meter-reading",
    "title": "Automated Meter Reading (AMR)",
    "type": "project",
    "description": "Gas metering rigorously tested at SSGC sites; SSGC & SNGPL are named buyers—the fastest path to recurring revenue in the portfolio of NUST",
    "image": "",
    "category": "Advanced Engineering & Industrial (covering smart utilities, advanced materials, robotics and energy systems)",
    "sectorSlugs": [
      "advanced-engineering"
    ],
    "status": "UTILITY-TESTED ? 7 IPR protected",
    "highlight": "TRL 7"
  },
  {
    "id": "piezoelectric-devices",
    "title": "Piezoelectric Devices",
    "type": "project",
    "description": "Piezoelectric devices are imported into Pakistan. Piezoelectric Sensors and Actuators are used in a wide variety of devices and have application-specific dimensions. We have a facility for manufacturing macro-scale piezoelectric sensors and actuators for industrial, Automotive and Robotics Sensors and Actuators",
    "image": "",
    "category": "Advanced Engineering & Industrial (covering smart utilities, advanced materials, robotics and energy systems)",
    "sectorSlugs": [
      "advanced-engineering"
    ],
    "status": "2IPR protected nationally",
    "highlight": "TRL 6"
  },
  {
    "id": "biochar-soil-health",
    "title": "Biochar for Building Soil Health",
    "type": "project",
    "description": "Sustainable Management of Crop Residues (rice straw & maize stalk) by converting to biochar\nEnhancing biochar properties before agricultural soil application\nImproving soil organic carbon, microbial activity, resource use efficiency, and thereby crop yield\nCommercialized to PEPSICO. Ready to commercialize to more industries\nBiochar application resulted in a 29.21% increase in crop yield",
    "image": "/project/biochar.png",
    "category": "Agriculture, Water & Sustainability",
    "sectorSlugs": [
      "agriculture-food"
    ],
    "status": "SERVICES"
  },
  {
    "id": "smart-agriculture-portal",
    "title": "AI Portal & App for Smart Agriculture - Data-Driven Farming",
    "type": "project",
    "description": "AI-based web portal and mobile app for farmers and agri-officers\nProvides crop, weather, and advisory insights in real time\nProduct development completed; currently in deployment phase\nSocietal impact \nHelps farmers improve yield and reduce input costs\nSupports timely decisions on irrigation, fertiliser, and pest control\nContributes to food security through smarter, climate-aware agriculture",
    "image": "/project/smartagriculture.png",
    "category": "Agriculture, Water & Sustainability",
    "sectorSlugs": [
      "agriculture-food"
    ],
    "status": "Services"
  },
  {
    "id": "smart-helmets-field-technicians",
    "title": "Smart Helmets for Safety of Field Technicians",
    "type": "project",
    "description": "Researchers have developed a compact and efficient system for bikers that will ensure the rider is wearing a helmet even before the bike starts and continues to wear it throughout the journey.\nDesigned for Dawlance",
    "image": "",
    "category": "Mobility & Automotive",
    "sectorSlugs": [
      "mobility-automotive"
    ],
    "status": "IP protected",
    "highlight": "TRL 6"
  },
  {
    "id": "safer-fodder-cutting-machines",
    "title": "Developed Safer Fodder/Chaff Cutting Machines",
    "type": "project",
    "description": "NUST, in collaboration with FFC, is undertaking the development of safer and improved chaff cutting machines (Tokka) for agricultural use in Pakistan. The project focuses on developing and validating enhanced safety features and engineering solutions to subsequently develop retrofit kits for existing machines. This initiative represents NUST’s efforts to translate engineering expertise and innovation into practical solutions with potential for nationwide adoption and improved safety in the agricultural sector.",
    "image": "",
    "category": "Agriculture, Water & Sustainability",
    "sectorSlugs": [
      "agriculture-food"
    ],
    "status": "IPR protected",
    "highlight": "TRL 8"
  },
  {
    "id": "bbq-grill-product-family",
    "title": "BBQ Grill Product Family",
    "type": "project",
    "description": "Barbecue grill for outdoor cooking designed for consumer product range at SADA NUST",
    "image": "",
    "category": "Consumer Products & Design Pipeline",
    "sectorSlugs": [
      "consumer-products-design"
    ],
    "status": "IP protected",
    "highlight": "TRL 6"
  },
  {
    "id": "hamsafar",
    "title": "HAMSAFAR",
    "type": "project",
    "description": "Hamsafar MIS is an integrated digital platform developed by NUST to modernize and streamline transportation operations. It brings together passenger services, fleet and logistics management, maintenance, digital transactions, and real-time management analytics on a unified platform, enabling organizations to improve operational efficiency, service delivery, and decision-making.",
    "image": "",
    "category": "Software",
    "sectorSlugs": [
      "mobility-automotive-systems"
    ],
    "status": "IP protected",
    "highlight": "TRL 8"
  },
  {
    "id": "energeyer-energy-ai",
    "title": "EnergEyer energy-AI",
    "type": "project",
    "description": "EnergEyer, is an intelligent energy monitoring and management system that empowers industries to see, understand, and optimize how they consume energy. It helps industries transition toward smarter, data-driven manufacturing systems by enabling real-time monitoring, predictive maintenance, and connected operations. The platform also helps companies meet international energy management standards by providing the data needed to track, measure, and continuously improve energy performance.",
    "image": "/project/EnergEyer.png",
    "category": "Advanced Engineering & Industrial",
    "sectorSlugs": [
      "energy-water-climate-sustainability"
    ],
    "status": "IP protected",
    "highlight": "TRL 6"
  },
  {
    "id": "dxvision",
    "title": "DxVision",
    "type": "spin-off",
    "description": "AI-powered healthcare and health-tech solutions, including DermaVision, an AI-based platform for virtual staining, skin disease detection, classification, and tissue segmentation to support faster and standardized diagnosis.",
    "image": "",
    "category": "Health",
    "sectorSlugs": [
      "health-pharma"
    ]
  },
  {
    "id": "ekko-rise-tech",
    "title": "EKKO/RISE TECH",
    "type": "spin-off",
    "description": "Neuro-rehabilitation therapy device for supporting the treatment of speech, motor, cognitive, and related neurological disorders, available in portable home-use and clinical versions.",
    "image": "/project/ekko.png",
    "category": "Health",
    "sectorSlugs": [
      "health-pharma"
    ]
  },
  {
    "id": "nexus-construction-technologies",
    "title": "NEXUS Construction Technologies",
    "type": "spin-off",
    "description": "3D concrete printing and advanced construction solutions aimed at improving construction efficiency, reducing costs and timelines, and enabling sustainable and resilient building practices.",
    "image": "",
    "category": "Smart Technologies",
    "sectorSlugs": [
      "advanced-engineering"
    ]
  },
  {
    "id": "robomak",
    "title": "RoboMak",
    "type": "spin-off",
    "description": "Advanced design, prototyping, and manufacturing services for hardware solutions, including PCB and embedded systems, 3D printing, CNC machining, engineering design, molding, and composite manufacturing for industry, startups, and academia.",
    "image": "",
    "category": "Smart Technologies",
    "sectorSlugs": [
      "advanced-engineering"
    ]
  },
  {
    "id": "robotiqs",
    "title": "RobotIQs",
    "type": "spin-off",
    "description": "Robotics and advanced hardware solutions developed across Health, Agriculture, Automotive, Defence, and Smart Technologies, including biomedical devices, agricultural drones and sensing systems, vehicle diagnostic platforms, and unmanned ground vehicles.",
    "image": "",
    "category": "Health | Agriculture | Automotive | Defence | Smart Technologies",
    "sectorSlugs": [
      "health-pharma",
      "agriculture-food",
      "mobility-automotive",
      "defence-strategic",
      "advanced-engineering"
    ]
  },
  {
    "id": "voxel-consulting",
    "title": "Voxel Consulting",
    "type": "spin-off",
    "description": "TPV for Punjab Energy Efficiency and Conservation Agency",
    "image": "",
    "category": "Energy",
    "sectorSlugs": [
      "energy-climate"
    ]
  },
  {
    "id": "innovative-nano-engineering-consulting-engineer",
    "title": "Innovative Nano Engineering Consulting Engineer",
    "type": "spin-off",
    "description": "Structural Engineering Solutions and Design services",
    "image": "",
    "category": "Smart Technologies",
    "sectorSlugs": [
      "advanced-engineering"
    ]
  }
];

export const sectorProjects: Record<string, InnovationProject[]> = Object.fromEntries(
  sectorDefinitions.map((sector) => {
    const aliases = sectorSlugAliases[sector.slug] ?? [sector.slug];
    const matches = innovationPortfolio.filter((entry) =>
      entry.sectorSlugs.some((slug) => slug === sector.slug || aliases.includes(slug)),
    );

    return [sector.slug, matches];
  }),
);

export const innovationSectors: InnovationSector[] = sectorDefinitions
  .map((sector) => {
    const entries = sectorProjects[sector.slug];
    return {
      ...sector,
      projects: entries.filter((entry) => entry.type === 'project').length,
      spinOffs: entries.filter((entry) => entry.type === 'spin-off').length,
    };
  })
  .filter((sector) => sector.projects + sector.spinOffs > 0);

export function getSectorProjects(slug: string): InnovationProject[] {
  return sectorProjects[slug] ?? [];
}

export function getInnovationSector(slug: string): InnovationSector | undefined {
  return innovationSectors.find((sector) => sector.slug === slug);
}
