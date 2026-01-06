import { NextRequest, NextResponse } from 'next/server';
import { getAllDealsCached } from '@/lib/cached-data';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  ADMIN_RATE_LIMIT,
} from '@/lib/rate-limit';
import { logAdminAction } from '@/lib/admin-logger';

/**
 * Export all deals as JSON or CSV
 * GET /api/deals/export?format=json|csv
 *
 * Requires admin API key for authentication
 */
export async function GET(request: NextRequest) {
  // Check for admin authorization header
  const authHeader = request.headers.get('x-admin-key');
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey || authHeader !== adminKey) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin API key required.' },
      { status: 401 }
    );
  }

  // Rate limit check
  const identifier = authHeader || getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(identifier, 'deals/export', ADMIN_RATE_LIMIT);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

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

      // Log CSV export
      logAdminAction({
        endpoint: '/api/deals/export',
        method: 'GET',
        ip: identifier,
        action: 'export_csv',
        details: { dealCount: deals.length },
        success: true,
        statusCode: 200,
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="deals-export.csv"',
          ...createRateLimitHeaders(rateLimitResult),
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

    // Log JSON export
    logAdminAction({
      endpoint: '/api/deals/export',
      method: 'GET',
      ip: identifier,
      action: 'export_json',
      details: { dealCount: exportData.length },
      success: true,
      statusCode: 200,
    });

    return NextResponse.json(
      { deals: exportData, count: exportData.length, exportedAt: new Date().toISOString() },
      {
        headers: {
          'Content-Disposition': 'attachment; filename="deals-export.json"',
          ...createRateLimitHeaders(rateLimitResult),
        },
      }
    );
  } catch (error) {
    // Log failed export
    logAdminAction({
      endpoint: '/api/deals/export',
      method: 'GET',
      ip: identifier,
      action: 'export',
      details: { error: String(error) },
      success: false,
      statusCode: 500,
    });

    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export deals' }, { status: 500 });
  }
}
