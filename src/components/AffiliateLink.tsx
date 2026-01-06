'use client';

import { ReactNode } from 'react';
import {
  addAffiliateParams,
  trackAffiliateClick,
  isAffiliateLink,
} from '@/lib/affiliate';

interface AffiliateLinkProps {
  href: string;
  dealSlug: string;
  businessName: string;
  children: ReactNode;
  className?: string;
  showDisclosure?: boolean;
}

/**
 * External link component that tracks affiliate clicks
 * and adds affiliate parameters to supported URLs.
 *
 * FTC Compliance: When showDisclosure is true (default for affiliate links),
 * displays an inline disclosure that we may earn a commission.
 */
export default function AffiliateLink({
  href,
  dealSlug,
  businessName,
  children,
  className = '',
  showDisclosure = true,
}: AffiliateLinkProps) {
  const affiliateUrl = addAffiliateParams(href);
  const isAffiliate = isAffiliateLink(href);

  const handleClick = () => {
    trackAffiliateClick(dealSlug, businessName, affiliateUrl);
  };

  return (
    <span className="inline">
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
      {isAffiliate && showDisclosure && (
        <span
          className="ml-1 text-xs text-gray-400 inline-flex items-center"
          title="This is an affiliate link. We may earn a small commission at no extra cost to you."
        >
          <svg
            className="w-3 h-3 mr-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="sr-only">Affiliate link - </span>
          ad
        </span>
      )}
    </span>
  );
}
