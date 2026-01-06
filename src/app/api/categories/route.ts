import { NextResponse } from 'next/server';
import { getAllCategoriesCached } from '@/lib/cached-data';

export async function GET() {
  try {
    const categories = await getAllCategoriesCached();
    return NextResponse.json({ categories, count: categories.length });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
