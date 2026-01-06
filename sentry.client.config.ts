// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session Replay (optional - disabled by default to reduce bundle size)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Environment
    environment: process.env.NODE_ENV,

    // Filter out common non-actionable errors
    ignoreErrors: [
      // Browser extensions
      /^ResizeObserver loop/,
      /^Non-Error promise rejection/,
      // Network errors that aren't actionable
      'Failed to fetch',
      'Load failed',
      'NetworkError',
      // User-initiated navigation
      'AbortError',
    ],

    // Limit breadcrumbs to reduce payload size
    maxBreadcrumbs: 50,
  });
}
