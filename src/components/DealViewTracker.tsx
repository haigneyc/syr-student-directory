'use client';

import { useEffect } from 'react';
import { trackDealView } from '@/lib/analytics';

interface DealViewTrackerProps {
  dealSlug: string;
  dealTitle: string;
  businessName: string;
  categoryName: string;
}

/**
 * Client component that tracks deal page views in Google Analytics.
 * This is a hidden component that fires the tracking event on mount.
 */
export default function DealViewTracker({
  dealSlug,
  dealTitle,
  businessName,
  categoryName,
}: DealViewTrackerProps) {
  useEffect(() => {
    trackDealView(dealSlug, dealTitle, businessName, categoryName);
  }, [dealSlug, dealTitle, businessName, categoryName]);

  return null;
}
