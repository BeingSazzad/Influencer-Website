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
  DollarSign,
  Users,
  Instagram,
  FileCheck,
  Calendar,
  Briefcase,
  Clock,
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

  // Status checks for optional profile completion items
  const hasMultiplePlatforms = Boolean(
    [creator?.platforms?.instagram?.handle, creator?.platforms?.tiktok?.handle, creator?.platforms?.youtube?.handle].filter(Boolean).length > 1
  );
  const hasMultipleRates = Boolean(
    creator?.packages && creator.packages.length >= 2
  );
  const hasAudienceDemographics = Boolean(
    creator?.audience?.topCountries && creator.audience.topCountries.length >= 2
  );
  const hasExtendedPortfolio = Boolean(
    creator?.portfolio && creator.portfolio.length >= 4
  );
  const hasPastCollaborations = Boolean(
    (creator?.reviews && creator.reviews.length >= 1) || creator?.totalCollaborations > 0
  );
  const isVerified = Boolean(creator?.verified);

  // Mandatory items are already completed during onboarding:
  // (Basic Info, Location & Languages, Niches, Primary Social, 2+ Portfolio samples, Collab preferences)
  const baseOnboardingWeight = 50; // 50% base strength from mandatory onboarding

  // Profile completion items (Can be completed later as Profile Completion)
  const optionalChecklist = [
    {
      id: 'rates',
      title: 'Different Rates for Post, Story, Reel, Video (€)',
      description: 'Set custom pricing for each deliverable format to receive instant brand checkout',
      weight: 15,
      completed: hasMultipleRates,
      href: '/creator/packages',
      actionLabel: 'Set Deliverable Rates',
      icon: DollarSign,
    },
    {
      id: 'audience',
      title: 'Audience Demographics (Location, Age & Gender)',
      description: 'Provide verified audience data to match with high-budget enterprise campaigns',
      weight: 10,
      completed: hasAudienceDemographics,
      href: '/creator/profile?tab=audience',
      actionLabel: 'Add Demographics',
      icon: Users,
    },
    {
      id: 'socials',
      title: 'Additional Social Media Platforms',
      description: 'Connect secondary channels (Instagram, TikTok, YouTube) to showcase total reach',
      weight: 10,
      completed: hasMultiplePlatforms,
      href: '/creator/profile?tab=channels',
      actionLabel: 'Connect Channels',
      icon: Instagram,
    },
    {
      id: 'portfolio',
      title: 'More Portfolio / Video Deliverables (4+ pieces)',
      description: 'Add more client work examples, 4K video clips, and lookbook cases',
      weight: 10,
      completed: hasExtendedPortfolio,
      href: '/creator/portfolio',
      actionLabel: 'Add Work',
      icon: Film,
    },
    {
      id: 'collaborations',
      title: 'Past Brand Collaborations & Client Reviews',
      description: 'Feature previous sponsor campaigns, client feedback, and brand partner logos',
      weight: 10,
      completed: hasPastCollaborations,
      href: '/creator/profile',
      actionLabel: 'Add Partners',
      icon: Briefcase,
    },
    {
      id: 'verification',
      title: 'Influverse Escrow Verification Seal',
      description: 'Verify identity to activate 100% upfront escrow deposits on all orders',
      weight: 5,
      completed: isVerified,
      href: '#verify',
      actionLabel: 'Request Badge',
      onClick: onQuickVerify,
      icon: ShieldCheck,
    },
  ];

  const completedOptionalWeight = optionalChecklist.reduce(
    (acc, item) => (item.completed ? acc + item.weight : acc),
    0
  );

  const totalStrength = Math.min(100, baseOnboardingWeight + completedOptionalWeight);

  // If 100% complete
  if (totalStrength === 100) {
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
                Max Discovery
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A3A39C] mt-0.5 font-medium">
              Your profile has full marketplace score: rates, demographics, multi-platform channels, and portfolio showcase.
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
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mandatory Onboarding Complete</span>
              </span>
              <span className="text-xs text-[#66665E] font-semibold hidden sm:inline">•</span>
              <span className="text-xs text-[#66665E] font-medium">
                {creator?.approvalStatus === 'approved' ? 'Approved for Marketplace' : 'Status: Under Curation Review ⏳'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A] tracking-tight">
              Profile Completion Strength: {totalStrength}%
            </h3>
            <p className="text-xs sm:text-sm text-[#66665E] font-medium leading-relaxed max-w-2xl">
              You're already onboarded! Completing these optional items unlocks higher search ranking and <strong className="text-[#0A0A0A]">3.5× more brand collaboration offers</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {/* Completion Percentage Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#0A0A0A] text-white text-xs font-black shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-pulse" />
              <span>{totalStrength}% Strength</span>
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
            className="h-full rounded-full bg-gradient-to-r from-[#0A0A0A] via-[#FF2D78] to-emerald-500 transition-all duration-500 ease-out shadow-xs"
            style={{ width: `${totalStrength}%` }}
          />
        </div>
      </div>

      {/* Expandable Actionable Checklist: Items that Can be Completed Later */}
      {isExpanded && (
        <div className="p-5 sm:p-6 divide-y divide-[#E7E7E2]/60">
          <div className="pb-3 text-xs font-black uppercase tracking-wider text-[#66665E]">
            Optional Enhancements (Complete anytime to boost brand bookings):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-3">
            {optionalChecklist.map((item) => {
              const IconComponent = item.icon;
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
                          className={`text-xs font-bold truncate ${
                            item.completed ? 'text-[#66665E] line-through' : 'text-[#0A0A0A]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-[#F4F4F0] text-[#66665E]">
                          +{item.weight}%
                        </span>
                      </div>
                      <p className="text-[11px] text-[#66665E] mt-0.5 line-clamp-2 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {!item.completed && (
                    <div className="shrink-0 self-center">
                      {item.onClick ? (
                        <button
                          type="button"
                          onClick={item.onClick}
                          className="px-2.5 py-1 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <span>{item.actionLabel}</span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="px-2.5 py-1 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 whitespace-nowrap"
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
