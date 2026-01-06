'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BusinessLogoProps {
  src: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 40, height: 40, textSize: 'text-lg' },
  md: { width: 56, height: 56, textSize: 'text-xl' },
  lg: { width: 80, height: 80, textSize: 'text-3xl' },
};

export default function BusinessLogo({
  src,
  alt,
  size = 'md',
  className = '',
}: BusinessLogoProps) {
  const [hasError, setHasError] = useState(false);
  const { width, height, textSize } = sizeMap[size];

  // Generate initials from business name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on the business name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-orange-100 text-orange-700',
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-amber-100 text-amber-700',
      'bg-teal-100 text-teal-700',
      'bg-indigo-100 text-indigo-700',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Show placeholder if no image or error loading
  if (!src || hasError) {
    const initials = getInitials(alt);
    const colorClass = getBackgroundColor(alt);

    return (
      <div
        className={`flex items-center justify-center rounded-lg font-semibold ${colorClass} ${textSize} ${className}`}
        style={{ width, height }}
        aria-label={`${alt} logo`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-100 ${className}`}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={`${alt} logo`}
        fill
        sizes={`${width}px`}
        className="object-cover"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}
