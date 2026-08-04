import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type IpChartType = 'filed' | 'awarded';

export interface IIpYearlyStat {
  id: number;
  chartType: IpChartType;
  year: string;
  industrialDesign: number;
  copyright: number;
  patents: number;
  trademark: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IpYearlyStatRow extends RowDataPacket {
  id: number;
  chart_type: IpChartType;
  year: string;
  industrial_design: number;
  copyright: number;
  patents: number;
  trademark: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

function mapRow(row: IpYearlyStatRow): IIpYearlyStat {
  return {
    id: row.id,
    chartType: row.chart_type,
    year: row.year,
    industrialDesign: row.industrial_design,
    copyright: row.copyright,
    patents: row.patents,
    trademark: row.trademark,
    order: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type NewIpYearlyStat = Omit<IIpYearlyStat, 'id' | 'createdAt' | 'updatedAt'>;

async function list(chartType: IpChartType): Promise<IIpYearlyStat[]> {
  const rows = await query<IpYearlyStatRow[]>(
    'SELECT * FROM ip_yearly_stats WHERE chart_type = ? ORDER BY sort_order ASC, id ASC',
    [chartType]
  );
  return rows.map(mapRow);
}

async function findById(id: string | number): Promise<IIpYearlyStat | null> {
  const rows = await query<IpYearlyStatRow[]>('SELECT * FROM ip_yearly_stats WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: NewIpYearlyStat): Promise<void> {
  await query(
    'INSERT INTO ip_yearly_stats (chart_type, year, industrial_design, copyright, patents, trademark, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.chartType, data.year, data.industrialDesign, data.copyright, data.patents, data.trademark, data.order]
  );
}

async function update(id: string | number, data: Partial<NewIpYearlyStat>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columnMap: Record<string, string> = {
    year: 'year',
    industrialDesign: 'industrial_design',
    copyright: 'copyright',
    patents: 'patents',
    trademark: 'trademark',
    order: 'sort_order',
  };
  for (const [key, column] of Object.entries(columnMap)) {
    const value = (data as Record<string, unknown>)[key];
    if (value !== undefined) {
      fields.push(`${column} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return true;
  values.push(id);
  const result = await query<ResultSetHeader>(`UPDATE ip_yearly_stats SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function remove(id: string | number): Promise<void> {
  await query('DELETE FROM ip_yearly_stats WHERE id = ?', [id]);
}

const IpYearlyStat = { list, findById, create, update, remove };

export default IpYearlyStat;
