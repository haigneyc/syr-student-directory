'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Google AdSense component that loads the AdSense script
 * Delays loading until user interaction to:
 * 1. Improve initial page load performance
 * 2. Future-proof for cookie consent requirements
 * 3. Reduce impact on Core Web Vitals
 */
export default function AdSense() {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const loadedRef = useRef(false);

  const loadAdSense = useCallback(() => {
    if (!publisherId) return;
    if (loadedRef.current) return;
    if (process.env.NODE_ENV !== 'production') return;
    if (document.querySelector('script[src*="adsbygoogle"]')) return;

    loadedRef.current = true;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [publisherId]);

  useEffect(() => {
    if (!publisherId) return;
    if (process.env.NODE_ENV !== 'production') return;

    // User interaction events that trigger ad loading
    const interactionEvents = ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'];

    // Load after a delay even if no interaction (for users who don't interact)
    const fallbackTimer = setTimeout(() => {
      loadAdSense();
    }, 5000); // 5 second fallback

    // Handler for user interaction
    const handleInteraction = () => {
      loadAdSense();
      // Remove all listeners once loaded
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleInteraction, { capture: true });
      });
      clearTimeout(fallbackTimer);
    };

    // Add passive listeners for all interaction types
    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true, once: true });
    });

    return () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleInteraction, { capture: true });
      });
      clearTimeout(fallbackTimer);
    };
  }, [publisherId, loadAdSense]);

  return null;
}
