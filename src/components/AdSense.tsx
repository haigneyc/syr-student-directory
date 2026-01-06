'use client';

import { useEffect } from 'react';

/**
 * Google AdSense component that loads the AdSense script
 * and initializes ad units on the page
 */
export default function AdSense() {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!publisherId) return;

    // Only load in production
    if (process.env.NODE_ENV !== 'production') return;

    // Check if already loaded
    if (document.querySelector('script[src*="adsbygoogle"]')) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [publisherId]);

  return null;
}
