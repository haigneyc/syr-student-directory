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
}

/**
 * External link component that tracks affiliate clicks
 * and adds affiliate parameters to supported URLs
 */
export default function AffiliateLink({
  href,
  dealSlug,
  businessName,
  children,
  className = '',
}: AffiliateLinkProps) {
  const affiliateUrl = addAffiliateParams(href);
  const isAffiliate = isAffiliateLink(href);

  const handleClick = () => {
    trackAffiliateClick(dealSlug, businessName, affiliateUrl);
  };

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
      {isAffiliate && (
        <span className="sr-only"> (affiliate link)</span>
      )}
    </a>
  );
}
