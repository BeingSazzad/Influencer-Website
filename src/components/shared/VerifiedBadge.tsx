import React from 'react';

interface VerifiedBadgeProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
}

export function VerifiedBadge({
  className = '',
  size = 'sm',
  title = 'Verified Creator',
}: VerifiedBadgeProps) {
  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const currentSizeClass = className.includes('w-') || className.includes('h-')
    ? className
    : `${sizeClasses[size]} ${className}`.trim();

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${currentSizeClass}`}
      title={title}
      aria-label={title}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xs"
      >
        <path
          d="M9.984 2.221a2.38 2.38 0 0 1 4.032 0l.442.75a2.38 2.38 0 0 0 2.45 1.066l.86-.143a2.38 2.38 0 0 1 2.76 2.76l-.143.86a2.38 2.38 0 0 0 1.066 2.45l.75.442a2.38 2.38 0 0 1 0 4.032l-.75.442a2.38 2.38 0 0 0-1.066 2.45l.143.86a2.38 2.38 0 0 1-2.76 2.76l-.86-.143a2.38 2.38 0 0 0-2.45 1.066l-.442.75a2.38 2.38 0 0 1-4.032 0l-.442-.75a2.38 2.38 0 0 0-2.45-1.066l-.86.143a2.38 2.38 0 0 1-2.76-2.76l.143-.86a2.38 2.38 0 0 0-1.066-2.45l-.75-.442a2.38 2.38 0 0 1 0-4.032l.75-.442a2.38 2.38 0 0 0 1.066-2.45l-.143-.86a2.38 2.38 0 0 1 2.76-2.76l.86.143a2.38 2.38 0 0 0 2.45-1.066l.442-.75z"
          fill="#3B82F6"
        />
        <path
          d="M8.2 12.2l2.6 2.6 5.2-5.4"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
export default VerifiedBadge;
