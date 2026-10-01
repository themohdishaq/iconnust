import { NextResponse } from 'next/server';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const documentCategories = [
  { id: 'copyright', title: 'Copyright', directory: 'copyright', description: 'Copyright application forms and filing guidance.' },
  { id: 'patent', title: 'Patent', directory: 'patent', description: 'Patent forms, assignment deeds and filing instructions.' },
  { id: 'trademark', title: 'Trademark', directory: 'trademark', description: 'Trademark application forms and classification documents.' },
  { id: 'design', title: 'Industrial Design', directory: 'industrial design', description: 'Industrial design forms, classifications and filing guidance.' },
];

export async function GET() {
  try {
    const categories = await Promise.all(documentCategories.map(async (category) => {
      const directoryPath = path.join(process.cwd(), 'public', 'nipo', category.directory);
      const entries = await readdir(directoryPath, { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
        .map((entry) => ({
          name: entry.name,
          href: `/nipo/${category.directory.split(path.sep).map(encodeURIComponent).join('/')}/${encodeURIComponent(entry.name)}`,
        }))
        .sort((first, second) => first.name.localeCompare(second.name, undefined, { numeric: true, sensitivity: 'base' }));

      return { ...category, files };
    }));

    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: 'NIPO documents could not be loaded.' }, { status: 500 });
  }
}