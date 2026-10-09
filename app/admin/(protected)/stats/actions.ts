'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth';
import StatTile, { type StatTilePage } from '@/lib/models/StatTile';
import IpBreakdown from '@/lib/models/IpBreakdown';
import IpYearlyStat, { type IpChartType } from '@/lib/models/IpYearlyStat';
import FinancialStat from '@/lib/models/FinancialStat';
import TechPlaceStat from '@/lib/models/TechPlaceStat';

export type FormState = { error?: string; success?: string };

function revalidateAll() {
  revalidatePath('/admin/stats');
  revalidatePath('/');
  revalidatePath('/innovation-collaboration');
  revalidatePath('/research-innovation');
  revalidatePath('/commercialisation');
}

function validateFields(formData: FormData) {
  const textLimits: Record<string, number> = { label: 200, name: 100, year: 30, title: 200, subtitle: 500 };
  for (const [key, limit] of Object.entries(textLimits)) {
    if (String(formData.get(key) || '').trim().length > limit) return `${key} must be ${limit} characters or fewer.`;
  }
  if (formData.has('industrialDesign') && String(formData.get('year') || '').trim().length > 10) return 'Year must be 10 characters or fewer.';
  for (const key of ['value', 'industrialDesign', 'copyright', 'patents', 'trademark', 'amount']) {
    if (!formData.has(key)) continue;
    const value = Number(formData.get(key) || 0);
    if (!Number.isFinite(value) || value < 0) return `${key} must be a nonnegative number.`;
    if (key === 'amount') {
      if (value > 99999999.99 || Math.abs(value * 100 - Math.round(value * 100)) > 0.00001) return 'Amount must have at most two decimal places and be less than 100,000,000.';
    } else if (!Number.isInteger(value) || value > 2147483647) return `${key} must be a whole number between 0 and 2,147,483,647.`;
  }
  if (formData.has('color') && !/^#[a-f0-9]{6}$/i.test(String(formData.get('color')))) return 'Choose a valid color.';
}

// ---- Stat Tiles (home / innovation impact numbers) ----

export async function createStatTileAction(page: StatTilePage, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const label = String(formData.get('label') || '').trim();
  const value = Number(formData.get('value') || 0);
  if (!label) return { error: 'Label is required.' };

  const existing = await StatTile.list(page);
  await StatTile.create({ page, label, value, order: existing.reduce((max, row) => Math.max(max, row.order), -1) + 1 });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function updateStatTileAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const label = String(formData.get('label') || '').trim();
  const value = Number(formData.get('value') || 0);
  if (!label) return { error: 'Label is required.' };

  await StatTile.update(id, { label, value });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function deleteStatTileAction(id: number): Promise<void> {
  await requireAdminSession();
  await StatTile.remove(id);
  revalidateAll();
}

// ---- IP Breakdown (donut chart) ----

export async function createIpBreakdownAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const name = String(formData.get('name') || '').trim();
  const value = Number(formData.get('value') || 0);
  const color = String(formData.get('color') || '#3B82C4').trim();
  if (!name) return { error: 'Name is required.' };

  const existing = await IpBreakdown.list();
  await IpBreakdown.create({ name, value, color, order: existing.reduce((max, row) => Math.max(max, row.order), -1) + 1 });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function updateIpBreakdownAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const name = String(formData.get('name') || '').trim();
  const value = Number(formData.get('value') || 0);
  const color = String(formData.get('color') || '#3B82C4').trim();
  if (!name) return { error: 'Name is required.' };

  await IpBreakdown.update(id, { name, value, color });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
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
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
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
    order: existing.reduce((max, row) => Math.max(max, row.order), -1) + 1,
  });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function updateIpYearlyStatAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
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
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function deleteIpYearlyStatAction(id: number): Promise<void> {
  await requireAdminSession();
  await IpYearlyStat.remove(id);
  revalidateAll();
}

// ---- Financial Stats (commercialization bar chart) ----

export async function createFinancialStatAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  const existing = await FinancialStat.list();
  await FinancialStat.create({
    year,
    amount: Number(formData.get('amount') || 0),
    isTotal: Boolean(formData.get('isTotal')),
    order: existing.reduce((max, row) => Math.max(max, row.order), -1) + 1,
  });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function updateFinancialStatAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const year = String(formData.get('year') || '').trim();
  if (!year) return { error: 'Year is required.' };

  await FinancialStat.update(id, {
    year,
    amount: Number(formData.get('amount') || 0),
    isTotal: Boolean(formData.get('isTotal')),
  });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function deleteFinancialStatAction(id: number): Promise<void> {
  await requireAdminSession();
  await FinancialStat.remove(id);
  revalidateAll();
}


export async function createTechPlaceAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const title = String(formData.get('title') || '').trim();
  const value = Number(formData.get('value') || 0);
  const subtitle = String(formData.get('subtitle') || '').trim();

  if (!title || !subtitle) return { error: 'Title and subtitle are required.' };

  const existing = await TechPlaceStat.list();
  await TechPlaceStat.create({
    title,
    value,
    subtitle,
    order: existing.reduce((max, row) => Math.max(max, row.order), -1) + 1,
  });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function updateTechPlaceAction(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const validationError = validateFields(formData);
  if (validationError) return { error: validationError };
  const title = String(formData.get('title') || '').trim();
  const subtitle = String(formData.get('subtitle') || '').trim();

  if (!title || !subtitle) return { error: 'Title and subtitle are required.' };

  await TechPlaceStat.update(id, {
    title,
    value: Number(formData.get('value') || 0),
    subtitle,
  });
  revalidateAll();
  return { success: 'Saved. Changes are now visible on the website.' };
}

export async function deleteTechPlaceAction(id: number): Promise<void> {
  await requireAdminSession();
  await TechPlaceStat.remove(id);
  revalidateAll();
}
