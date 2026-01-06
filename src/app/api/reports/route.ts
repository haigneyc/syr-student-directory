import { NextRequest, NextResponse } from 'next/server';

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
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return reports for admin view (in production, add authentication)
  return NextResponse.json({ reports, total: reports.length });
}
