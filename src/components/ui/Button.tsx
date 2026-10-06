import React from 'react';
import Link from 'next/link';

export type ButtonVariant =
  | 'primary'
  | 'pink'
  | 'secondary'
  | 'ghost'
  | 'white'
  | 'dark-outline'
  | 'danger';

export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonShape = 'pill' | 'rounded';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  href?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  pink: 'btn-pink',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  white: 'btn-white',
  'dark-outline': 'btn-dark-outline',
  danger: 'btn-danger',
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'btn-lg',
  md: 'btn-md',
  sm: 'btn-sm',
};

const shapeStyles: Record<ButtonShape, string> = {
  pill: '',
  rounded: 'btn-rounded',
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'pill',
      href,
      icon,
      iconRight,
      loading = false,
      fullWidth = false,
      disabled,
      className = '',
      children,
      target,
      rel,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      'btn-base',
      sizeStyles[size],
      variantStyles[variant],
      shapeStyles[shape],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classNames}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        className={classNames}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
