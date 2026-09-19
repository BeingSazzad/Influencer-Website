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
      {/* SVG Monogram from client reference */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}
      >
        {/* Dot / Circle element */}
        <circle
          cx="32"
          cy="32"
          r="16"
          fill={isLight ? '#FFFFFF' : '#151515'}
        />
        {/* Angled 'V' / checkmark pill element */}
        <path
          d="M32 50 L56 74 C60 78 66 78 70 74 L84 48 C88 40 82 32 74 32 C70 32 66 34 64 38 L48 60 L32 50 Z"
          fill={isLight ? '#FFFFFF' : '#151515'}
        />
      </svg>

      {withText && (
        <span
          className={`font-extrabold tracking-tight font-sans ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#151515]'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Influverse
        </span>
      )}
    </div>
  );
}
