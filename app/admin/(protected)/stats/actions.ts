'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import StatTile, { type StatTilePage } from '@/lib/models/StatTile';
import IpBreakdown from '@/lib/models/IpBreakdown';
import IpYearlyStat, { type IpChartType } from '@/lib/models/IpYearlyStat';
import FinancialStat from '@/lib/models/FinancialStat';
import TechPlaceStat from '@/lib/models/TechPlaceStat';

export type FormState = { error?: string };

function revalidateAll() {
  revalidatePath('/admin/stats');
  revalidatePath('/');
  revalidatePath('/innovation-collaboration');
  revalidatePath('/commercialisation');
}

// ---- Stat Tiles (home / innovation impact numbers) ----

export async function createStatTileAction(page: StatTilePage, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const label = String(formData.get('label') || '').trim();
  const value = Number(formData.get('value') || 0);
  if (!label) return { error: 'Label is required.' };

  const existing = await StatTile.list(page);
  await StatTile.create({ page, label, value, order: existing.length });
  revalidateAll();
  return {};
}

export async function updateStatTileAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const label = String(formData.get('label') || '').trim();
  const value = Number(formData.get('value') || 0);
  if (!label) return { error: 'Label is required.' };

  await StatTile.update(id, { label, value });
  revalidateAll();
  return {};
}

export async function deleteStatTileAction(id: number): Promise<void> {
  await requireAdminSession();
  await StatTile.remove(id);
  revalidateAll();
}

// ---- IP Breakdown (donut chart) ----

export async function createIpBreakdownAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const name = String(formData.get('name') || '').trim();
  const value = Number(formData.get('value') || 0);
  const color = String(formData.get('color') || '#3B82C4').trim();
  if (!name) return { error: 'Name is required.' };

  const existing = await IpBreakdown.list();
  await IpBreakdown.create({ name, value, color, order: existing.length });
  revalidateAll();
  return {};
}

export async function updateIpBreakdownAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const name = String(formData.get('name') || '').trim();
  const value = Number(formData.get('value') || 0);
  const color = String(formData.get('color') || '#3B82C4').trim();
  if (!name) return { error: 'Name is required.' };

  await IpBreakdown.update(id, { name, value, color });
  revalidateAll();
  return {};
}

export async function deleteIpBreakdownAction(id: number): Promise<void> {
  await requireAdminSession();
  await IpBreakdown.remove(id);
  revalidateAll();
}

// ---- IP Yearly Stats (stacked bar charts: filed / awarded) ----

export async function createIpYearlyStatAction(
  chartType: IpChartType,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdminSession();
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  const existing = await IpYearlyStat.list(chartType);
  await IpYearlyStat.create({
    chartType,
    year,
    industrialDesign: Number(formData.get('industrialDesign') || 0),
    copyright: Number(formData.get('copyright') || 0),
    patents: Number(formData.get('patents') || 0),
    trademark: Number(formData.get('trademark') || 0),
    order: existing.length,
  });
  revalidateAll();
  return {};
}

export async function updateIpYearlyStatAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  await IpYearlyStat.update(id, {
    year,
    industrialDesign: Number(formData.get('industrialDesign') || 0),
    copyright: Number(formData.get('copyright') || 0),
    patents: Number(formData.get('patents') || 0),
    trademark: Number(formData.get('trademark') || 0),
  });
  revalidateAll();
  return {};
}

export async function deleteIpYearlyStatAction(id: number): Promise<void> {
  await requireAdminSession();
  await IpYearlyStat.remove(id);
  revalidateAll();
}

// ---- Financial Stats (commercialization bar chart) ----

export async function createFinancialStatAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  const existing = await FinancialStat.list();
  await FinancialStat.create({
    year,
    amount: Number(formData.get('amount') || 0),
    isTotal: Boolean(formData.get('isTotal')),
    order: existing.length,
  });
  revalidateAll();
  return {};
}

export async function updateFinancialStatAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  await FinancialStat.update(id, {
    year,
    amount: Number(formData.get('amount') || 0),
    isTotal: Boolean(formData.get('isTotal')),
  });
  revalidateAll();
  return {};
}

export async function deleteFinancialStatAction(id: number): Promise<void> {
  await requireAdminSession();
  await FinancialStat.remove(id);
  revalidateAll();
}


export async function createTechPlaceAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const title = String(formData.get('title') || '').trim();
  const value = Number(formData.get('value') || 0);
  const subtitle = String(formData.get('subtitle') || '').trim();

  if (!title || !subtitle) return { error: 'Title and subtitle are required.' };

  const existing = await TechPlaceStat.list();
  await TechPlaceStat.create({
    title,
    value,
    subtitle,
    order: existing.length,
  });
  revalidateAll();
  return {};
}

export async function updateTechPlaceAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const title = String(formData.get('title') || '').trim();
  const subtitle = String(formData.get('subtitle') || '').trim();

  if (!title || !subtitle) return { error: 'Title and subtitle are required.' };

  await TechPlaceStat.update(id, {
    title,
    value: Number(formData.get('value') || 0),
    subtitle,
  });
  revalidateAll();
  return {};
}

export async function deleteTechPlaceAction(id: number): Promise<void> {
  await requireAdminSession();
  await TechPlaceStat.remove(id);
  revalidateAll();
}