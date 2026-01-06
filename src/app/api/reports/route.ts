import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  REPORT_RATE_LIMIT,
  ADMIN_RATE_LIMIT,
} from '@/lib/rate-limit';
import { logAdminAction } from '@/lib/admin-logger';

interface ReportPayload {
  deal_slug: string;
  business_name: string;
  issue_type: string;
  details?: string | null;
  reporter_email?: string | null;
}

// In-memory storage for reports (replace with Supabase in production)
const reports: (ReportPayload & { id: string; created_at: string })[] = [];

export async function POST(request: NextRequest) {
  // Rate limit check to prevent abuse
  const identifier = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(identifier, 'reports', REPORT_RATE_LIMIT);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many reports. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  try {
    const body: ReportPayload = await request.json();

    // Validate required fields
    if (!body.deal_slug || !body.business_name || !body.issue_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate issue type
    const validIssueTypes = [
      'expired',
      'incorrect_discount',
      'business_closed',
      'wrong_info',
      'other',
    ];
    if (!validIssueTypes.includes(body.issue_type)) {
      return NextResponse.json(
        { error: 'Invalid issue type' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (body.reporter_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.reporter_email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Create report
    const report = {
      id: crypto.randomUUID(),
      deal_slug: body.deal_slug,
      business_name: body.business_name,
      issue_type: body.issue_type,
      details: body.details || null,
      reporter_email: body.reporter_email || null,
      created_at: new Date().toISOString(),
    };

    // Store report (in production, save to Supabase)
    reports.push(report);

    // Log for monitoring
    console.log('New issue report:', {
      id: report.id,
      deal_slug: report.deal_slug,
      issue_type: report.issue_type,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Report submitted successfully',
        id: report.id,
      },
      {
        status: 201,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
  const rateLimitResult = checkRateLimit(identifier, 'reports/list', ADMIN_RATE_LIMIT);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  // Log admin view of reports
  logAdminAction({
    endpoint: '/api/reports',
    method: 'GET',
    ip: identifier,
    action: 'view_reports',
    details: { reportCount: reports.length },
    success: true,
    statusCode: 200,
  });

  return NextResponse.json(
    { reports, total: reports.length },
    {
      headers: createRateLimitHeaders(rateLimitResult),
    }
  );
}
