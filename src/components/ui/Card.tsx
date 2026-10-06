import React from 'react';

export type CardVariant = 'default' | 'interactive' | 'subtle' | 'dark';
export type CardRadius = 'container' | 'card' | 'input';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: CardRadius;
  padding?: CardPadding;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'app-card',
  interactive: 'app-card-interactive',
  subtle: 'app-card-subtle',
  dark: 'app-panel-dark',
};

const radiusClasses: Record<CardRadius, string> = {
  container: 'rounded-3xl',
  card: 'rounded-3xl',
  input: 'rounded-xl',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-8 sm:p-12',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      radius = 'card',
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          variantClasses[variant],
          radiusClasses[radius],
          paddingClasses[padding],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
