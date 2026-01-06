import { NextRequest, NextResponse } from 'next/server';
import { getAllDeals, getDealsByCategory, searchDeals, getFeaturedDeals } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

  try {
    let deals;

    if (featured === 'true') {
      deals = getFeaturedDeals();
    } else if (category) {
      deals = getDealsByCategory(category);
    } else if (query) {
      deals = searchDeals(query);
    } else {
      deals = getAllDeals();
    }

    return NextResponse.json({ deals, count: deals.length });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}
