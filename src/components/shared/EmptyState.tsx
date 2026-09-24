'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export type EmptyStateVariant = 'card' | 'plain' | 'dashed';
export type EmptyStateColor = 'pink' | 'emerald' | 'purple' | 'amber' | 'neutral' | 'blue';

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export interface EmptyStateSuggestion {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  showIcon?: boolean;
  color?: EmptyStateColor;
  badge?: string;
  title: string;
  description: string | React.ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  suggestions?: EmptyStateSuggestion[];
  suggestionsLabel?: string;
  variant?: EmptyStateVariant;
  className?: string;
}

const colorStyles: Record<
  EmptyStateColor,
  { bg: string; text: string; border: string; badgeBg: string; badgeText: string }
> = {
  pink: {
    bg: 'bg-[#FFF0F5]',
    text: 'text-[#FF2D78]',
    border: 'border-[#FFE0EB]',
    badgeBg: 'bg-[#FFF0F5]',
    badgeText: 'text-[#FF2D78]',
  },
  emerald: {
    bg: 'bg-[#EEF7F2]',
    text: 'text-[#23744D]',
    border: 'border-[#D9EDE2]',
    badgeBg: 'bg-[#EEF7F2]',
    badgeText: 'text-[#23744D]',
  },
  purple: {
    bg: 'bg-[#F1EEF9]',
    text: 'text-[#6444A6]',
    border: 'border-[#E4DCF5]',
    badgeBg: 'bg-[#F1EEF9]',
    badgeText: 'text-[#6444A6]',
  },
  amber: {
    bg: 'bg-[#FAF6E8]',
    text: 'text-[#8C6819]',
    border: 'border-[#F3ECCF]',
    badgeBg: 'bg-[#FAF6E8]',
    badgeText: 'text-[#8C6819]',
  },
  neutral: {
    bg: 'bg-[#F4F4F0]',
    text: 'text-[#0A0A0A]',
    border: 'border-[#E7E7E2]',
    badgeBg: 'bg-[#F0F0EB]',
    badgeText: 'text-[#40403C]',
  },
  blue: {
    bg: 'bg-[#F0F5FF]',
    text: 'text-[#2463EB]',
    border: 'border-[#DBEAFE]',
    badgeBg: 'bg-[#F0F5FF]',
    badgeText: 'text-[#2463EB]',
  },
};

export function EmptyState({
  icon,
  showIcon = true,
  color = 'pink',
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  suggestions,
  suggestionsLabel = 'Suggested filters:',
  variant = 'card',
  className = '',
}: EmptyStateProps) {
  const palette = colorStyles[color];

  const defaultIcon = (
    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      <Sparkles className="w-full h-full" />
    </div>
  );

  const containerStyles = {
    card: 'bg-white rounded-3xl border border-[#E7E7E2] p-8 sm:p-12 shadow-xs text-center',
    plain: 'p-6 sm:p-10 text-center',
    dashed: 'bg-[#FAFAF8] rounded-3xl border-2 border-dashed border-[#E7E7E2] p-8 sm:p-12 text-center',
  }[variant];

  return (
    <div className={`${containerStyles} space-y-6 max-w-2xl mx-auto font-sans ${className}`}>
      {/* Icon & Optional Badge */}
      {(badge || showIcon) && (
      <div className="flex flex-col items-center justify-center space-y-3">
        {badge && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${palette.badgeBg} ${palette.badgeText}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        )}

        {showIcon && (
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl ${palette.bg} ${palette.text} border ${palette.border} flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-105`}
          >
            {icon || defaultIcon}
          </div>
        )}
      </div>
      )}

      {/* Title & Description */}
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight leading-snug">
          {title}
        </h3>
        {typeof description === 'string' ? (
          <p className="text-sm text-[#73736A] leading-relaxed font-medium">{description}</p>
        ) : (
          <div className="text-sm text-[#73736A] leading-relaxed font-medium">{description}</div>
        )}
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {primaryAction &&
            (primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
              >
                {primaryAction.icon}
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
              >
                {primaryAction.icon}
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}

          {secondaryAction &&
            (secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2] text-sm font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                {secondaryAction.icon}
                <span>{secondaryAction.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2] text-sm font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                {secondaryAction.icon}
                <span>{secondaryAction.label}</span>
              </button>
            ))}
        </div>
      )}

      {/* Suggested Quick Chips */}
      {suggestions && suggestions.length > 0 && (
        <div className="pt-4 border-t border-[#E7E7E2]/70 space-y-2">
          <p className="text-sm font-bold text-[#73736A] uppercase tracking-wider">
            {suggestionsLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className="px-3.5 py-1.5 rounded-full bg-[#FAFAF8] hover:bg-[#F0F0EB] text-[#0A0A0A] border border-[#E7E7E2] text-sm font-semibold transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
