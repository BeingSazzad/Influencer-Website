'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Creator, User } from '@/types';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  DollarSign,
  Film,
  Instagram,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface ProfileCompletionCardProps {
  creator: Creator;
  currentUser?: User | null;
  onQuickVerify?: () => void;
}

export function ProfileCompletionCard({
  creator,
}: ProfileCompletionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Status checks based on real creator features in the platform
  const hasMultipleRates = Boolean(
    creator?.packages && creator.packages.length >= 1
  );
  const hasExtendedPortfolio = Boolean(
    creator?.portfolio && creator.portfolio.length >= 3
  );
  const hasMultiplePlatforms = Boolean(
    [
      creator?.platforms?.instagram?.handle,
      creator?.platforms?.tiktok?.handle,
      creator?.platforms?.youtube?.handle,
    ].filter(Boolean).length >= 2
  );
  const hasPhotoGallery = Boolean(
    creator?.photos && creator.photos.length >= 2
  );

  // Mandatory onboarding steps provide 50% base strength
  const baseStrength = 50;

  // Real, actionable profile completion items
  const profileItems = [
    {
      id: 'rates',
      title: 'Deliverable Packages & Rates',
      description: 'Set pricing for Posts, Stories, or Reels to receive brand bookings.',
      weight: 15,
      completed: hasMultipleRates,
      href: '/creator/packages',
      actionLabel: 'Set Rates',
      icon: DollarSign,
    },
    {
      id: 'portfolio',
      title: 'Showcase Portfolio Media',
      description: 'Upload 3 or more video clips or image examples of your past work.',
      weight: 15,
      completed: hasExtendedPortfolio,
      href: '/creator/portfolio',
      actionLabel: 'Add Work',
      icon: Film,
    },
    {
      id: 'socials',
      title: 'Connect Secondary Social Channels',
      description: 'Link your TikTok or YouTube channels alongside your primary account.',
      weight: 10,
      completed: hasMultiplePlatforms,
      href: '/creator/profile?tab=channels',
      actionLabel: 'Connect Channels',
      icon: Instagram,
    },
    {
      id: 'gallery',
      title: 'Profile Photo Gallery',
      description: 'Add high-resolution photos to your visual creator lookbook.',
      weight: 10,
      completed: hasPhotoGallery,
      href: '/creator/profile?tab=gallery',
      actionLabel: 'Upload Photos',
      icon: ImageIcon,
    },
  ];

  const completedWeight = profileItems.reduce(
    (acc, item) => (item.completed ? acc + item.weight : acc),
    0
  );

  const totalStrength = Math.min(100, baseStrength + completedWeight);
  const incompleteItems = profileItems.filter((item) => !item.completed);
  const completedItems = profileItems.filter((item) => item.completed);

  // All 100% complete state
  if (totalStrength === 100) {
    return (
      <div className="bg-[#0A0A0A] text-white rounded-3xl p-5 sm:p-6 border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-white tracking-tight">
                Profile 100% Complete
              </h4>
              <span className="text-xs uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                All-Star
              </span>
            </div>
            <p className="text-sm text-[#A3A39C] mt-0.5 font-medium">
              Your profile is fully completed and optimized for maximum brand discovery.
            </p>
          </div>
        </div>

        <Link
          href={`/creators/${creator?.id || ''}`}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-[#0A0A0A] text-sm font-bold transition-all shrink-0 self-start sm:self-auto flex items-center gap-2 shadow-sm"
        >
          <span>View Public Profile</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] tracking-tight">
                Profile Completion: {totalStrength}%
              </h3>
            </div>
            <p className="text-sm text-[#66665E] font-medium">
              {incompleteItems.length > 0
                ? `${incompleteItems.length} item${incompleteItems.length > 1 ? 's' : ''} left to complete your profile.`
                : 'Your creator profile is fully complete.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {/* Strength Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A0A0A] text-white text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF2D78]" />
              <span>{totalStrength}% Complete</span>
            </div>

            {/* Toggle Incomplete List Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3.5 py-1.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-white text-sm font-bold text-[#0A0A0A] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>{isExpanded ? 'Hide' : `Incomplete (${incompleteItems.length})`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-2 rounded-full bg-[#EAEAE3] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#FF2D78] to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${totalStrength}%` }}
          />
        </div>
      </div>

      {/* Expandable Incomplete Items List */}
      {isExpanded && (
        <div className="p-5 sm:p-6 border-t border-[#E7E7E2] bg-[#FAFAF8]/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#66665E]">
            <span>Incomplete Tasks ({incompleteItems.length})</span>
            {completedItems.length > 0 && (
              <span className="text-emerald-700 font-bold lowercase tracking-normal flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completedItems.length} already completed</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            {incompleteItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] flex items-center justify-center shrink-0 border border-[#E7E7E2]">
                      <IconComponent className="w-5 h-5 text-[#0A0A0A]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                          {item.title}
                        </span>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#F4F4F0] text-[#66665E]">
                          +{item.weight}%
                        </span>
                      </div>
                      <p className="text-sm text-[#66665E] mt-0.5 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto flex items-center gap-1.5"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
