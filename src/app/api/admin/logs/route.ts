import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  ADMIN_RATE_LIMIT,
} from '@/lib/rate-limit';
import {
  getAdminLogs,
  getAdminActivitySummary,
  logAdminAction,
} from '@/lib/admin-logger';

/**
 * Get admin API logs
 * GET /api/admin/logs?limit=100&summary=true
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
  const rateLimitResult = checkRateLimit(identifier, 'admin/logs', ADMIN_RATE_LIMIT);

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
  const limit = parseInt(searchParams.get('limit') || '100', 10);
  const includeSummary = searchParams.get('summary') === 'true';
  const summaryHours = parseInt(searchParams.get('hours') || '24', 10);

  // Log this admin action
  logAdminAction({
    endpoint: '/api/admin/logs',
    method: 'GET',
    ip: identifier,
    action: 'view_logs',
    details: { limit, includeSummary, summaryHours },
    success: true,
    statusCode: 200,
  });

  const logs = getAdminLogs(limit);
  const response: {
    logs: typeof logs;
    count: number;
    summary?: ReturnType<typeof getAdminActivitySummary>;
  } = {
    logs,
    count: logs.length,
  };

  if (includeSummary) {
    response.summary = getAdminActivitySummary(summaryHours);
  }

  return NextResponse.json(response, {
    headers: createRateLimitHeaders(rateLimitResult),
  });
}
