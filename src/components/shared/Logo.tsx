'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  withText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({
  className = '',
  isLight = false,
  withText = true,
  size = 'md',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* SVG Monogram matching client reference media_1789815697252.jpg */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}
      >
        {/* Solid Circle in top-left quadrant */}
        <circle
          cx="34"
          cy="36"
          r="13"
          fill={isLight ? '#FFFFFF' : '#0A0A0A'}
        />
        {/* Smooth rounded checkmark / angled pill */}
        <path
          d="M32 50 H52 L76 24 C80 20 86 20 90 24 C94 28 94 34 90 38 L58 74 C52 80 44 80 38 74 L24 60 C20 56 20 50 24 46 C28 42 32 46 32 50 Z"
          fill={isLight ? '#FFFFFF' : '#0A0A0A'}
        />
      </svg>

      {withText && (
        <span
          className={`font-black tracking-tight font-sans ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#0A0A0A]'
          }`}
          style={{ letterSpacing: '-0.04em' }}
        >
          Influverse
        </span>
      )}
    </div>
  );
}
