'use client';

import { ReactNode, useEffect, useState } from 'react';
import PullToRefresh from './PullToRefresh';

interface MobileRefreshWrapperProps {
  children: ReactNode;
}

export default function MobileRefreshWrapper({
  children,
}: MobileRefreshWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      setIsMobile(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 768
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only wrap with pull-to-refresh on mobile
  if (!isMobile) {
    return <>{children}</>;
  }

  return <PullToRefresh>{children}</PullToRefresh>;
}
