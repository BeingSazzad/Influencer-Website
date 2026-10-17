'use client';

import React from 'react';
import Image from 'next/image';

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
  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const radiusClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
  };

  const dim = pixelSizes[size] || 40;

  return (
    <div className={`inline-flex items-center gap-2 group select-none shrink-0 ${className}`}>
      {/* Local Logo Image with suitable height and subtle border radius */}
      <div
        className={`relative overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconSizes[size]} ${radiusClasses[size]} ${
          isLight ? '' : 'ring-1 ring-black/10 shadow-sm'
        }`}
        style={{
          width: `${dim}px`,
          height: `${dim}px`,
          minWidth: `${dim}px`,
          minHeight: `${dim}px`,
        }}
      >
        <Image
          src="/images/logo.jpeg"
          alt="Influverse Logo"
          width={dim}
          height={dim}
          priority
          className="w-full h-full object-cover"
        />
      </div>

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

