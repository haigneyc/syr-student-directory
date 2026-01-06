// Admin API usage logger
// Logs admin actions for auditing purposes
// In production, consider using a persistent store (database, log aggregator)

interface AdminLogEntry {
  timestamp: string;
  endpoint: string;
  method: string;
  ip: string;
  action: string;
  details?: Record<string, unknown>;
  success: boolean;
  statusCode: number;
}

// In-memory log store (most recent 1000 entries)
const adminLogs: AdminLogEntry[] = [];
const MAX_LOG_ENTRIES = 1000;

/**
 * Log an admin API action
 */
export function logAdminAction(entry: Omit<AdminLogEntry, 'timestamp'>): void {
  const logEntry: AdminLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // Add to in-memory store
  adminLogs.unshift(logEntry);

  // Keep only the most recent entries
  if (adminLogs.length > MAX_LOG_ENTRIES) {
    adminLogs.pop();
  }

  // Also log to console for server-side logging/aggregation
  console.log('[ADMIN_API]', JSON.stringify(logEntry));
}

/**
 * Get recent admin logs
 * @param limit Number of entries to return (default 100)
 */
export function getAdminLogs(limit: number = 100): AdminLogEntry[] {
  return adminLogs.slice(0, limit);
}

/**
 * Get admin logs filtered by endpoint
 */
export function getAdminLogsByEndpoint(endpoint: string, limit: number = 100): AdminLogEntry[] {
  return adminLogs
    .filter((log) => log.endpoint === endpoint)
    .slice(0, limit);
}

/**
 * Get admin logs filtered by time range
 */
export function getAdminLogsByTimeRange(
  startTime: Date,
  endTime: Date = new Date()
): AdminLogEntry[] {
  return adminLogs.filter((log) => {
    const logTime = new Date(log.timestamp);
    return logTime >= startTime && logTime <= endTime;
  });
}

/**
 * Get admin activity summary for the last N hours
 */
export function getAdminActivitySummary(hours: number = 24): {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  byEndpoint: Record<string, number>;
  byIp: Record<string, number>;
} {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  const recentLogs = adminLogs.filter((log) => new Date(log.timestamp) >= cutoff);

  const summary = {
    totalRequests: recentLogs.length,
    successfulRequests: recentLogs.filter((log) => log.success).length,
    failedRequests: recentLogs.filter((log) => !log.success).length,
    byEndpoint: {} as Record<string, number>,
    byIp: {} as Record<string, number>,
  };

  for (const log of recentLogs) {
    summary.byEndpoint[log.endpoint] = (summary.byEndpoint[log.endpoint] || 0) + 1;
    summary.byIp[log.ip] = (summary.byIp[log.ip] || 0) + 1;
  }

  return summary;
}
