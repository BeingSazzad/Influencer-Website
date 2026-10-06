import React from 'react';

export type BadgeVariant =
  | 'pink'
  | 'mint'
  | 'butter'
  | 'lavender'
  | 'blush'
  | 'neutral'
  | 'dark';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  pink: 'badge-pink',
  mint: 'badge-mint',
  butter: 'badge-butter',
  lavender: 'badge-lavender',
  blush: 'badge-blush',
  neutral: 'badge-neutral',
  dark: 'badge-dark',
};

const dotColors: Record<BadgeVariant, string> = {
  pink: 'bg-[#FF2D78]',
  mint: 'bg-[#23744D]',
  butter: 'bg-[#8C6819]',
  lavender: 'bg-[#6444A6]',
  blush: 'bg-[#FF2D78]',
  neutral: 'bg-[#66665E]',
  dark: 'bg-[#FAFAFA]',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon,
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={[
        'badge-base',
        size === 'sm' ? 'badge-sm' : 'badge-md',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
