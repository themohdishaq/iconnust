export const SECTOR_ICONS = ['stethoscope', 'brainCircuit', 'sprout', 'wind', 'car', 'shield', 'settings'] as const;
export type InnovationProject = {
  id: string;
  title: string;
  type: 'project' | 'spin-off';
  description: string;
  image: string;
  status?: string;
  highlight?: string;
  category: string;
  sectorSlugs: string[];
  order: number;
};
export type InnovationSector = {
  slug: string;
  title: string;
  description: string;
  projects: number;
  spinOffs: number;
  iconKey: typeof SECTOR_ICONS[number];
  heroImage: string;
  ipAssets?: string;
  industryPartners?: number;
  order: number;
};
export type SectorInput = Omit<InnovationSector, 'projects' | 'spinOffs'>;
export type ProjectInput = Omit<InnovationProject, 'id'>;
export type InnovationPortfolio = { sectors: InnovationSector[]; projects: InnovationProject[] };
