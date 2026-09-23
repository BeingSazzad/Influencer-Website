'use client';

import React, { useState } from 'react';

interface BrandLogoProps {
  name: string;
  logoUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ name, logoUrl, className = '', size = 'md' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Size definitions
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  // Extract clean monogram (e.g., "Sephora Paris" -> "SP", "Dior Beauty" -> "DB", "Nike" -> "NK")
  const getInitials = (str: string) => {
    if (!str) return 'BR';
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  // Specific high-quality inline SVG marks for well-known brands
  const lower = name.toLowerCase();

  const renderBrandSvg = () => {
    if (lower.includes('aura')) {
      return (
        <div className="flex flex-col items-center justify-center text-center leading-none select-none">
          <span className="font-serif font-black tracking-widest text-sm text-[#0A0A0A] uppercase">
            AURA
          </span>
          <span className="text-[7.5px] font-sans font-extrabold tracking-widest text-[#73736A] uppercase mt-0.5">
            PARIS
          </span>
        </div>
      );
    }
    if (lower.includes('sephora')) {
      return (
        <span className="font-editorial font-black tracking-widest text-sm text-[#0A0A0A] uppercase">
          S
        </span>
      );
    }
    if (lower.includes('dior')) {
      return (
        <span className="font-serif font-black tracking-tighter text-sm text-[#0A0A0A] uppercase">
          DIOR
        </span>
      );
    }
    if (lower.includes('nike')) {
      return (
        <svg className="w-5 h-5 text-[#0A0A0A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.707 5.293c-.27-.27-.69-.32-.99-.12-4.11 2.76-7.85 5.86-11.45 9.07-1.42 1.27-2.88 2.54-4.43 3.65-1.57 1.13-3.08 1.45-3.83.69-.76-.77-.42-2.31.75-3.89 1.14-1.54 2.45-2.98 3.73-4.38L2.1 11.2c-.39.42-.43 1.05-.1 1.51 1.76 2.48 4.09 4.3 6.94 4.3 1.62 0 3.25-.6 4.88-1.78 3.42-2.47 7.07-5.74 10.42-8.52.41-.34.45-.96.09-1.37l-2.62-2.05z" />
        </svg>
      );
    }
    if (lower.includes('gymshark')) {
      return (
        <span className="font-sans font-black tracking-tighter text-sm text-[#0A0A0A] uppercase">
          GS
        </span>
      );
    }
    if (lower.includes('patagonia') || lower.includes('gopro')) {
      return (
        <span className="font-sans font-black text-sm text-[#0A0A0A] uppercase">
          {getInitials(name)}
        </span>
      );
    }
    return null;
  };

  const specificSvg = renderBrandSvg();

  if (specificSvg) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center font-extrabold text-[#0A0A0A] select-none shadow-2xs shrink-0 ${className}`}
        title={name}
      >
        {specificSvg}
      </div>
    );
  }

  if (logoUrl && !hasError && !logoUrl.includes('photo-1522337360788-8b13dee7a37e')) {
    return (
      <img
        src={logoUrl}
        alt={name}
        onError={() => setHasError(true)}
        className={`${sizeClasses[size]} object-cover rounded-2xl border border-[#E7E7E2] shadow-2xs shrink-0 ${className}`}
      />
    );
  }

  // Graceful, stylish fallback badge with crisp brand monogram
  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center font-extrabold text-[#0A0A0A] select-none shadow-2xs shrink-0 ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
