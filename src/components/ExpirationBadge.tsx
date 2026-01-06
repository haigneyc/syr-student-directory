'use client';

import {
  isDealExpired,
  isDealExpiringSoon,
  formatExpirationDate,
  getTimeUntilExpiration,
} from '@/lib/expiration';

interface ExpirationBadgeProps {
  expiresAt: string | null;
  className?: string;
}

export default function ExpirationBadge({
  expiresAt,
  className = '',
}: ExpirationBadgeProps) {
  if (!expiresAt) {
    return null;
  }

  // Check if expired
  if (isDealExpired(expiresAt)) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full ${className}`}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        Expired
      </span>
    );
  }

  // Check if expiring soon (within 7 days)
  if (isDealExpiringSoon(expiresAt)) {
    const timeLeft = getTimeUntilExpiration(expiresAt);
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full ${className}`}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        Expires in {timeLeft}
      </span>
    );
  }

  // Has expiration but not soon
  const formattedDate = formatExpirationDate(expiresAt);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full ${className}`}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
      Until {formattedDate}
    </span>
  );
}
