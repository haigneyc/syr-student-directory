'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

/**
 * Individual AdSense ad unit component
 * Use different slots for different ad placements
 */
export default function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!publisherId) return;
    if (process.env.NODE_ENV !== 'production') return;

    try {
      // Push the ad
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [publisherId]);

  // Don't render in development or if no publisher ID
  if (!publisherId || process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ minHeight: '100px' }}
      >
        Ad Space (Production Only)
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
