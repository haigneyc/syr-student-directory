// Simple in-memory rate limiter for API routes
// For production with multiple instances, consider using Redis or Upstash

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

// In-memory store for rate limit tracking
// Key format: `${identifier}:${endpoint}`
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically (every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address or API key)
 * @param endpoint - The endpoint being accessed
 * @param options - Rate limit configuration
 * @returns Object with allowed status and rate limit info
 */
export function checkRateLimit(
  identifier: string,
  endpoint: string,
  options: RateLimitOptions
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  limit: number;
} {
  cleanupExpiredEntries();

  const key = `${identifier}:${endpoint}`;
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;

  let entry = rateLimitStore.get(key);

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: options.limit - 1,
      resetTime: entry.resetTime,
      limit: options.limit,
    };
  }

  // Increment count and check limit
  entry.count++;

  if (entry.count > options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      limit: options.limit,
    };
  }

  return {
    allowed: true,
    remaining: options.limit - entry.count,
    resetTime: entry.resetTime,
    limit: options.limit,
  };
}

/**
 * Get client identifier from request (IP address)
 * Works with common proxies and Vercel
 */
export function getClientIdentifier(request: Request): string {
  // Check common proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in the chain (original client)
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Vercel-specific
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  // Fallback
  return 'unknown';
}

// Pre-configured rate limiters for different use cases

/** Admin endpoints: 10 requests per minute */
export const ADMIN_RATE_LIMIT: RateLimitOptions = {
  limit: 10,
  windowSeconds: 60,
};

/** Public API endpoints: 30 requests per minute */
export const PUBLIC_API_RATE_LIMIT: RateLimitOptions = {
  limit: 30,
  windowSeconds: 60,
};

/** Form submissions: 5 per 10 minutes (prevent spam) */
export const SUBMISSION_RATE_LIMIT: RateLimitOptions = {
  limit: 5,
  windowSeconds: 600,
};

/** Report submissions: 10 per hour */
export const REPORT_RATE_LIMIT: RateLimitOptions = {
  limit: 10,
  windowSeconds: 3600,
};

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: {
  remaining: number;
  resetTime: number;
  limit: number;
}): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}
