'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Creator, User } from '@/types';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Film,
  Package,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import { Button } from 'antd';

interface ProfileCompletionCardProps {
  creator: Creator;
  currentUser?: User | null;
  onQuickVerify?: () => void;
}

export function ProfileCompletionCard({
  creator,
  currentUser,
  onQuickVerify,
}: ProfileCompletionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Criteria scoring calculation
  const hasAvatar = Boolean(creator?.avatar && !creator.avatar.includes('placeholder'));
  const hasBioAndLocation = Boolean(creator?.bio && creator?.location);
  const hasCategories = Boolean(creator?.categories && creator.categories.length > 0);
  const hasSocials = Boolean(
    creator?.platforms?.instagram?.handle ||
    creator?.platforms?.tiktok?.handle ||
    creator?.platforms?.youtube?.handle
  );
  const hasPortfolio = Boolean(creator?.portfolio && creator.portfolio.length >= 2);
  const hasPackages = Boolean(creator?.packages && creator.packages.length >= 1 && creator?.startingPriceEur > 0);
  const isVerified = Boolean(creator?.verified);

  const checklist = [
    {
      id: 'basics',
      title: 'Profile identity & avatar',
      description: 'Photo, handle, and a 150-char creator bio',
      weight: 20,
      completed: hasAvatar && hasBioAndLocation,
      href: '/creator/profile',
      actionLabel: 'Edit Profile',
    },
    {
      id: 'categories',
      title: 'Creator niches & categories',
      description: 'Select up to 3 core industries for brand matchmaking',
      weight: 15,
      completed: hasCategories,
      href: '/creator/profile',
      actionLabel: 'Add Niches',
    },
    {
      id: 'socials',
      title: 'Connected social platforms',
      description: 'Handles and audience reach for Instagram, TikTok or YouTube',
      weight: 15,
      completed: hasSocials,
      href: '/creator/profile?tab=channels',
      actionLabel: 'Link Handles',
    },
    {
      id: 'portfolio',
      title: 'Showcase work samples (2+ items)',
      description: 'High-definition media samples demonstrating your visual style',
      weight: 20,
      completed: hasPortfolio,
      href: '/creator/portfolio',
      actionLabel: 'Upload Work',
    },
    {
      id: 'packages',
      title: 'Collaboration packages & rates',
      description: 'Set your transparent fixed EUR deliverables and base rate',
      weight: 15,
      completed: hasPackages,
      href: '/creator/packages',
      actionLabel: 'Set Rates',
    },
    {
      id: 'verification',
      title: 'Escrow verification check',
      description: 'Verify identity to unlock 100% upfront escrow protection',
      weight: 15,
      completed: isVerified,
      href: '#verify',
      actionLabel: 'Request Badge',
      onClick: onQuickVerify,
    },
  ];

  const totalCompletedWeight = checklist.reduce(
    (acc, item) => (item.completed ? acc + item.weight : acc),
    0
  );
  const completionPercentage = Math.min(100, totalCompletedWeight);

  // If 100% complete, show compact verified all-star banner
  if (completionPercentage === 100) {
    return (
      <div className="bg-[#0A0A0A] text-white rounded-3xl p-5 sm:p-6 border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-white tracking-tight">
                All-Star Creator Profile (100% Complete)
              </h4>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Max Visibility
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A3A39C] mt-0.5 font-medium">
              Your profile is optimized for top brand search placement and direct collaboration offers.
            </p>
          </div>
        </div>

        <Link
          href={`/creators/${creator.id}`}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#0A0A0A] text-xs font-bold transition-all shrink-0 self-start sm:self-auto flex items-center gap-1.5"
        >
          <span>View Public Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs overflow-hidden font-sans">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FAFAF8] via-white to-[#FAFAF8] border-b border-[#E7E7E2]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-black shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] tracking-tight">
                Complete Your Profile ({completionPercentage}% Complete)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#66665E] font-medium leading-relaxed max-w-2xl">
              Creators with fully completed profiles receive <strong className="text-[#0A0A0A]">4.8× more collaboration inquiries</strong> and higher escrow offer deposits from top brands.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {/* Completion Percentage Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#0A0A0A] text-white text-xs font-black shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-pulse" />
              <span>{completionPercentage}% Done</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white text-[#66665E] hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
              aria-label={isExpanded ? 'Collapse checklist' : 'Expand checklist'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-4 w-full h-2 rounded-full bg-[#EAEAE3] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0A0A0A] to-[#FF2D78] transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Expandable Actionable Checklist */}
      {isExpanded && (
        <div className="p-5 sm:p-6 divide-y divide-[#E7E7E2]/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pb-1">
            {checklist.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    item.completed
                      ? 'bg-[#FAFAF8]/60 border-[#E7E7E2] opacity-75'
                      : 'bg-white border-[#E7E7E2] hover:border-[#0A0A0A] shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#A3A39C]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-sm font-bold truncate ${
                            item.completed ? 'text-[#66665E] line-through' : 'text-[#0A0A0A]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-[#F4F4F0] text-[#66665E]">
                          +{item.weight}%
                        </span>
                      </div>
                      <p className="text-xs text-[#66665E] mt-0.5 line-clamp-1 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {!item.completed && (
                    <div className="shrink-0">
                      {item.onClick ? (
                        <button
                          type="button"
                          onClick={item.onClick}
                          className="px-3 py-1.5 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>{item.actionLabel}</span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="px-3 py-1.5 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                        >
                          <span>{item.actionLabel}</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
