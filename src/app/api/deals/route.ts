import { NextRequest, NextResponse } from 'next/server';
import {
  getAllDealsCached,
  getDealsByCategoryCached,
  searchDealsCached,
  getFeaturedDealsCached,
} from '@/lib/cached-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

  try {
    let deals;

    if (featured === 'true') {
      deals = await getFeaturedDealsCached();
    } else if (category) {
      deals = await getDealsByCategoryCached(category);
    } else if (query) {
      deals = await searchDealsCached(query);
    } else {
      deals = await getAllDealsCached();
    }

    return NextResponse.json({ deals, count: deals.length });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}
