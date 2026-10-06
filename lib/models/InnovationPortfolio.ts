import { randomUUID } from 'node:crypto';
import type { RowDataPacket } from 'mysql2/promise';
import { getPool, query } from '@/lib/db';
import type { InnovationPortfolio, InnovationProject, InnovationSector, ProjectInput, SectorInput } from '@/lib/innovationSectors';
import { PortfolioError } from '@/lib/innovationValidation';

export async function listInnovationPortfolio(): Promise<InnovationPortfolio> {
  const [sectorRows, projectRows, links] = await Promise.all([
    query<RowDataPacket[]>('SELECT * FROM innovation_sectors ORDER BY sort_order, title'),
    query<RowDataPacket[]>('SELECT * FROM innovation_projects ORDER BY sort_order, title'),
    query<RowDataPacket[]>('SELECT project_id, sector_slug FROM innovation_project_sectors'),
  ]);
  const projects: InnovationProject[] = projectRows.map(p => ({
    id: p.id, title: p.title, type: p.type, description: p.description, image: p.image,
    status: p.status, highlight: p.highlight, category: p.category, order: p.sort_order,
    sectorSlugs: links.filter(l => l.project_id === p.id).map(l => l.sector_slug),
  }));
  const sectors: InnovationSector[] = sectorRows.map(s => ({
    slug: s.slug, title: s.title, description: s.description, iconKey: s.icon_key,
    heroImage: s.hero_image, ipAssets: s.ip_assets ?? undefined,
    industryPartners: s.industry_partners ?? undefined, order: s.sort_order,
    projects: projects.filter(p => p.type === 'project' && p.sectorSlugs.includes(s.slug)).length,
    spinOffs: projects.filter(p => p.type === 'spin-off' && p.sectorSlugs.includes(s.slug)).length,
  }));
  return { sectors, projects };
}

export async function saveSector(data: SectorInput, slug?: string) {
  if (slug && slug !== data.slug) throw new PortfolioError('The sector URL cannot be changed after creation.');
  const params = [data.title, data.description, data.iconKey, data.heroImage, data.ipAssets ?? null, data.industryPartners ?? null, data.order];
  if (slug) {
    const existing = await query<RowDataPacket[]>('SELECT slug FROM innovation_sectors WHERE slug = ?', [slug]);
    if (!existing.length) throw new PortfolioError('Sector not found.', 404);
    await query('UPDATE innovation_sectors SET title=?, description=?, icon_key=?, hero_image=?, ip_assets=?, industry_partners=?, sort_order=? WHERE slug=?', [...params, slug]);
  } else {
    await query('INSERT INTO innovation_sectors (title, description, icon_key, hero_image, ip_assets, industry_partners, sort_order, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [...params, data.slug]);
  }
  return data.slug;
}

export async function saveProject(data: ProjectInput, existingId?: string) {
  const connection = await getPool().getConnection();
  const id = existingId ?? randomUUID();
  try {
    await connection.beginTransaction();
    if (existingId) {
      const [rows] = await connection.execute<RowDataPacket[]>('SELECT id FROM innovation_projects WHERE id=? FOR UPDATE', [id]);
      if (!rows.length) throw new PortfolioError('Project not found.', 404);
    }
    const [sectors] = await connection.query<RowDataPacket[]>(
      `SELECT slug FROM innovation_sectors WHERE slug IN (${data.sectorSlugs.map(() => '?').join(',')}) LOCK IN SHARE MODE`, data.sectorSlugs,
    );
    if (sectors.length !== data.sectorSlugs.length) throw new PortfolioError('One or more selected sectors no longer exist.');
    const params = [data.title, data.type, data.description, data.image, data.status || '', data.highlight || '', data.category, data.order, id];
    await connection.execute(existingId
      ? 'UPDATE innovation_projects SET title=?, type=?, description=?, image=?, status=?, highlight=?, category=?, sort_order=? WHERE id=?'
      : 'INSERT INTO innovation_projects (title, type, description, image, status, highlight, category, sort_order, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
    await connection.execute('DELETE FROM innovation_project_sectors WHERE project_id=?', [id]);
    for (const slug of data.sectorSlugs) await connection.execute('INSERT INTO innovation_project_sectors (project_id, sector_slug) VALUES (?, ?)', [id, slug]);
    await connection.commit();
    return id;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally { connection.release(); }
}

export async function removePortfolioEntry(kind: 'sectors' | 'projects', id: string) {
  const result = await query<import('mysql2/promise').ResultSetHeader>(
    kind === 'sectors' ? 'DELETE FROM innovation_sectors WHERE slug=?' : 'DELETE FROM innovation_projects WHERE id=?', [id],
  );
  if (!result.affectedRows) throw new PortfolioError('Entry not found.', 404);
}
