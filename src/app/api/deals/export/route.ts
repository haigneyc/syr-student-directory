import { NextResponse } from 'next/server';
import { getAllDealsCached } from '@/lib/cached-data';

/**
 * Export all deals as JSON or CSV
 * GET /api/deals/export?format=json|csv
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';

  try {
    const deals = await getAllDealsCached();

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'id',
        'title',
        'slug',
        'description',
        'discount_type',
        'discount_value',
        'conditions',
        'redemption_method',
        'code',
        'is_verified',
        'is_featured',
        'expires_at',
        'business_name',
        'business_address',
        'business_website',
        'category_name',
        'category_slug',
      ];

      const csvRows = [headers.join(',')];

      for (const deal of deals) {
        const row = [
          deal.id,
          `"${(deal.title || '').replace(/"/g, '""')}"`,
          deal.slug,
          `"${(deal.description || '').replace(/"/g, '""')}"`,
          deal.discount_type,
          deal.discount_value,
          `"${(deal.conditions || '').replace(/"/g, '""')}"`,
          deal.redemption_method,
          deal.code || '',
          deal.is_verified,
          deal.is_featured,
          deal.expires_at || '',
          `"${(deal.business?.name || '').replace(/"/g, '""')}"`,
          `"${(deal.business?.address || '').replace(/"/g, '""')}"`,
          deal.business?.website || '',
          deal.category?.name || '',
          deal.category?.slug || '',
        ];
        csvRows.push(row.join(','));
      }

      const csv = csvRows.join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="deals-export.csv"',
        },
      });
    }

    // Default: JSON format
    const exportData = deals.map((deal) => ({
      id: deal.id,
      title: deal.title,
      slug: deal.slug,
      description: deal.description,
      discount_type: deal.discount_type,
      discount_value: deal.discount_value,
      conditions: deal.conditions,
      redemption_method: deal.redemption_method,
      code: deal.code,
      is_verified: deal.is_verified,
      is_featured: deal.is_featured,
      expires_at: deal.expires_at,
      business: {
        name: deal.business?.name,
        slug: deal.business?.slug,
        address: deal.business?.address,
        phone: deal.business?.phone,
        website: deal.business?.website,
        latitude: deal.business?.latitude,
        longitude: deal.business?.longitude,
      },
      category: {
        name: deal.category?.name,
        slug: deal.category?.slug,
        icon: deal.category?.icon,
      },
    }));

    return NextResponse.json(
      { deals: exportData, count: exportData.length, exportedAt: new Date().toISOString() },
      {
        headers: {
          'Content-Disposition': 'attachment; filename="deals-export.json"',
        },
      }
    );
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export deals' }, { status: 500 });
  }
}
