import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface VerificationBadgeProps {
  isVerified: boolean;
  verifiedAt: string | null;
  size?: 'sm' | 'md';
  showLink?: boolean;
}

export default function VerificationBadge({
  isVerified,
  verifiedAt,
  size = 'sm',
  showLink = false,
}: VerificationBadgeProps) {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  if (!isVerified) {
    return (
      <span className={`inline-flex items-center gap-1 ${textSize} text-gray-400`}>
        <svg
          className={iconSize}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Unverified
      </span>
    );
  }

  const content = (
    <>
      <svg
        className={iconSize}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        <span className="font-medium">Verified</span>{' '}
        {formatDate(verifiedAt)}
      </span>
    </>
  );

  if (showLink) {
    return (
      <Link
        href="/how-we-verify"
        className={`inline-flex items-center gap-1.5 ${textSize} text-green-600 hover:text-green-700 transition-colors`}
        title="Learn how we verify deals"
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${textSize} text-green-600`}>
      {content}
    </span>
  );
}
