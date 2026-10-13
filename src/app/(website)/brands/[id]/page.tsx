'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getBrandProfile, MOCK_BRANDS } from '@/data/mockBrands';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { BrandCampaignBrief } from '@/types';
import {
  MapPin,
  Globe,
  ExternalLink,
  ShieldCheck,
  Star,
  Users,
  Building2,
  Briefcase,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronRight,
  Share2,
  Bookmark,
  ArrowRight,
  Award,
  Lock,
  Layers,
  Banknote,
  Check,
  X,
  FileText,
} from 'lucide-react';
import { message, Modal, Input } from 'antd';

export default function BrandProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);

  const brandId = (params?.id as string) || 'user_brand_01';
  const brand = getBrandProfile(brandId, currentUser);

  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'reviews'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Application / Pitch Modal State
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<BrandCampaignBrief | null>(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [isSubmittingPitch, setIsSubmittingPitch] = useState(false);

  const handleOpenPitch = (campaign?: BrandCampaignBrief) => {
    setSelectedCampaign(campaign || null);
    setProposedRate(campaign ? `${campaign.budgetEur}` : '1200');
    setPitchMessage(
      campaign
        ? `Hi ${brand.companyName} team! I love your products and my audience aligns 100% with your ${campaign.title}. I would love to collaborate on this campaign.`
        : `Hi ${brand.companyName}! I am interested in collaborating with your brand on upcoming creator campaigns.`
    );
    setIsPitchModalOpen(true);
  };

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchMessage.trim()) {
      message.error('Please write a brief pitch for the brand.');
      return;
    }

    setIsSubmittingPitch(true);
    setTimeout(() => {
      setIsSubmittingPitch(false);
      setIsPitchModalOpen(false);
      message.success(
        selectedCampaign
          ? `Application submitted for "${selectedCampaign.title}"! Brand will review your creator rate card.`
          : `Partnership proposal delivered to ${brand.companyName}!`
      );
    }, 600);
  };

  const isCurrentBrandOwner =
    currentUser?.role === 'brand' &&
    (currentUser.id === brand.id ||
      currentUser.companyName?.toLowerCase() === brand.companyName.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0A0A0A] font-sans pb-24">
      {/* 1. TOP BREADCRUMB & CONTEXT NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#66665E]">
            <Link href="/" className="hover:text-[#0A0A0A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3A39C]" />
            <Link href="/creator/campaigns" className="hover:text-[#0A0A0A] transition-colors">
              Brands
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3A39C]" />
            <span className="text-[#0A0A0A] font-bold truncate max-w-[200px]">
              {brand.companyName}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {isCurrentBrandOwner && (
              <Link
                href="/brand/settings"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold text-[#0A0A0A] transition-all shadow-2xs"
              >
                <span>Edit Brand Profile</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setIsSaved(!isSaved);
                message.success(isSaved ? 'Brand removed from saved' : 'Brand saved to favorites');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-[#FF2D78]'
                  : 'bg-white border-[#E7E7E2] text-[#52524E] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Brand'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold text-[#52524E] hover:text-[#0A0A0A] transition-all shadow-2xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 2. HERO COVER BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-[#E7E7E2] shadow-sm">
          <div className="h-48 sm:h-64 md:h-80 w-full relative">
            <img
              src={brand.coverImage}
              alt={brand.companyName}
              className="w-full h-full object-cover opacity-90 filter brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </div>

          {/* Floating Brand Trust Badge over Cover */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-xs font-extrabold text-[#0A0A0A] shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Escrow Backed</span>
            </div>
          </div>
        </div>

        {/* 3. BRAND IDENTITY HEADER & QUICK SUMMARY */}
        <div className="relative -mt-16 sm:-mt-20 px-4 sm:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-md flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Brand Logo Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-4 border-white shadow-xl overflow-hidden shrink-0 flex items-center justify-center p-1 relative z-10">
                <div className="w-full h-full rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center overflow-hidden">
                  <BrandLogo name={brand.companyName} logoUrl={brand.logo} size="lg" />
                </div>
              </div>

              {/* Title, Badge & Meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
                    {brand.companyName}
                  </h1>
                  {brand.verified && (
                    <VerifiedBadge size="md" title="Verified Marketplace Brand" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF0F5] border border-[#FF2D78]/25 text-[#FF2D78]">
                    {brand.industry.split(',')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm text-[#66665E] font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#A3A39C]" />
                    <span>{brand.location}</span>
                  </span>
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#0A0A0A] font-semibold hover:underline"
                    >
                      <Globe className="w-4 h-4 text-[#A3A39C]" />
                      <span>{brand.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3 text-[#A3A39C]" />
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#A3A39C]" />
                    <span>{brand.companySize.split('(')[0].trim()}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Button for Creators */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenPitch()}
                className="h-12 px-7 rounded-full font-bold text-sm bg-[#FF2D78] hover:bg-[#E02669] text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pitch Collaboration</span>
              </button>

              <Link
                href="/creator/messages"
                className="h-12 px-5 rounded-full font-bold text-sm bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[#66665E]" />
                <span className="hidden sm:inline">Message</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. HIGH IMPACT RELIABILITY & ESCROW STATS RIBBON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66665E]">Escrow Funded</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              {brand.stats.escrowFundedRate}%
            </div>
            <p className="text-[11px] font-medium text-emerald-700">
              Guaranteed payment upfront
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66665E]">Creator Rating</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight flex items-baseline gap-1.5">
              <span>{brand.stats.rating}</span>
              <span className="text-xs font-medium text-[#66665E]">
                ({brand.stats.reviewsCount} reviews)
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#66665E]">
              Average feedback score
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66665E]">Avg. Response</span>
              <Clock className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              &lt; {brand.stats.avgResponseHours} hours
            </div>
            <p className="text-[11px] font-medium text-[#66665E]">
              Fast communication turnaround
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66665E]">Completed Campaigns</span>
              <Layers className="w-4 h-4 text-[#FF2D78]" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              {brand.stats.totalCampaigns}+
            </div>
            <p className="text-[11px] font-medium text-[#66665E]">
              Across European creators
            </p>
          </div>
        </div>

        {/* 5. NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-[#E7E7E2] pb-px">
          {[
            { id: 'overview', label: 'Brand Overview' },
            {
              id: 'campaigns',
              label: 'Open Campaigns',
              badge: brand.activeCampaigns.length,
            },
            {
              id: 'reviews',
              label: 'Creator Reviews',
              badge: brand.reviews.length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-[#0A0A0A]'
                  : 'text-[#66665E] hover:text-[#0A0A0A]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-[#0A0A0A] text-white'
                      : 'bg-[#F4F4F0] text-[#66665E]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* 6. MAIN CONTENT GRID (LEFT CONTENT + RIGHT STICKY ACTION CARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: ACTIVE TAB CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About Brand Story Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-[#0A0A0A]" />
                    </div>
                    <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                      About {brand.companyName}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-[#44443E] leading-relaxed font-normal">
                    {brand.bio}
                  </p>

                  {/* Niche Industry Tags */}
                  <div className="pt-4 border-t border-[#E7E7E2]/70 space-y-2">
                    <span className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                      Marketplace Focus &amp; Style Tags
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {brand.industryTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Creator Collaboration Philosophy / Guidelines */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] border border-[#FF2D78]/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#FF2D78]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                        What We Look For in Creators
                      </h2>
                      <p className="text-xs text-[#66665E] font-medium">
                        How {brand.companyName} partners with talent.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Authentic Storytelling</span>
                      </div>
                      <p className="text-xs text-[#66665E] leading-relaxed">
                        Creators who genuinely test and integrate clean formulas into their day-to-day rituals without scripted infomercial vibes.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>High Production Aesthetics</span>
                      </div>
                      <p className="text-xs text-[#66665E] leading-relaxed">
                        Natural lighting, crisp 4K vertical footage, clean audio, and thoughtful camera angles that elevate organic engagement.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>European Audience Reach</span>
                      </div>
                      <p className="text-xs text-[#66665E] leading-relaxed">
                        Engaged followings across France, Germany, the UK, Scandinavia, and major European lifestyle hubs.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>100% Escrow Protection</span>
                      </div>
                      <p className="text-xs text-[#66665E] leading-relaxed">
                        All campaign budgets are funded upfront to escrow before creators film a single second. Zero late-invoice chase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Past Campaign Deliverable Highlights */}
                {brand.pastCampaignsHighlights.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                          Past Creator Collaborations
                        </h2>
                        <p className="text-xs text-[#66665E]">
                          Sample content produced by Influverse creators for {brand.companyName}.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#66665E]">
                        {brand.pastCampaignsHighlights.length} Showcases
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {brand.pastCampaignsHighlights.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-[#E7E7E2] overflow-hidden bg-[#FAFAF8] group hover:border-[#0A0A0A] transition-all"
                        >
                          <div className="h-44 w-full relative overflow-hidden bg-black/10">
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {item.views && (
                              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white">
                                {item.views}
                              </span>
                            )}
                          </div>
                          <div className="p-3.5 space-y-1">
                            <h4 className="text-xs font-bold text-[#0A0A0A] truncate">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <img
                                src={item.creatorAvatar}
                                alt={item.creatorName}
                                className="w-4 h-4 rounded-full object-cover"
                              />
                              <span className="text-[11px] text-[#66665E] font-medium truncate">
                                {item.creatorName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ACTIVE CAMPAIGNS */}
            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                      Open Campaign Briefs
                    </h2>
                    <p className="text-xs sm:text-sm text-[#66665E]">
                      Collaborations currently accepting applications from vetted creators.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#FF2D78]/25 text-[#FF2D78]">
                    {brand.activeCampaigns.length} Active Briefs
                  </span>
                </div>

                {brand.activeCampaigns.length > 0 ? (
                  <div className="space-y-4">
                    {brand.activeCampaigns.map((camp) => (
                      <div
                        key={camp.id}
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] hover:border-[#0A0A0A] shadow-2xs hover:shadow-md transition-all space-y-5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A]">
                                {camp.platform.toUpperCase()}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {camp.openSlots} Slots Open
                              </span>
                              <span className="text-xs text-[#66665E]">
                                Deadline: {camp.deadlineDate}
                              </span>
                            </div>
                            <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight">
                              {camp.title}
                            </h3>
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#66665E]">
                              Estimated Budget
                            </span>
                            <div className="text-xl font-black text-[#0A0A0A]">
                              {camp.budgetFormatted}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-[#52524E] leading-relaxed">
                          {camp.description}
                        </p>

                        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                          <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                            Key Deliverable Requirements:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {camp.requirements.map((req, i) => (
                              <li key={i} className="text-xs text-[#52524E] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D78] shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-xs text-[#66665E] font-medium flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>100% Escrow deposit locked prior to contract start</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleOpenPitch(camp)}
                            className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Apply with Rate Card</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E7E2] space-y-3">
                    <Briefcase className="w-10 h-10 text-[#A3A39C] mx-auto" />
                    <h3 className="text-base font-bold text-[#0A0A0A]">
                      No Public Briefs Open Right Now
                    </h3>
                    <p className="text-xs text-[#66665E] max-w-md mx-auto">
                      {brand.companyName} occasionally hires talent via direct custom offers. You can send an organic collaboration pitch directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenPitch()}
                      className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white font-bold text-xs"
                    >
                      <span>Send Direct Pitch</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CREATOR REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                      Reviews from Creators
                    </h2>
                    <p className="text-xs sm:text-sm text-[#66665E]">
                      Feedback from creators who completed escrow campaigns with {brand.companyName}.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{brand.stats.rating} / 5.0</span>
                  </div>
                </div>

                {brand.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {brand.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.creatorAvatar}
                              alt={rev.creatorName}
                              className="w-11 h-11 rounded-2xl object-cover border border-[#E7E7E2]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-extrabold text-[#0A0A0A]">
                                  {rev.creatorName}
                                </h4>
                                <span className="text-xs text-[#66665E] font-medium">
                                  {rev.creatorHandle}
                                </span>
                              </div>
                              <span className="text-xs text-[#FF2D78] font-semibold">
                                {rev.campaignTitle}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-0.5 justify-end">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-[#E7E7E2]'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-[#A3A39C] mt-0.5 block">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-[#44443E] leading-relaxed italic bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2]/70">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E7E2] space-y-2">
                    <Star className="w-8 h-8 text-[#A3A39C] mx-auto" />
                    <h3 className="text-base font-bold text-[#0A0A0A]">
                      No Reviews Yet
                    </h3>
                    <p className="text-xs text-[#66665E]">
                      Reviews appear once milestone collaborations are completed and signed off.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY BRAND CONTACT & ESCROW GUARANTEE CARD */}
          <div className="space-y-6">
            {/* Quick Action Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-5 sticky top-24">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D78]">
                  Brand Partnership
                </span>
                <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight">
                  Work with {brand.companyName}
                </h3>
                <p className="text-xs text-[#66665E] leading-relaxed">
                  Apply with your Influverse rate card or pitch a tailored cross-platform creative concept.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenPitch()}
                  className="w-full h-12 rounded-2xl font-extrabold text-sm bg-[#FF2D78] hover:bg-[#E02669] text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pitch Campaign Proposal</span>
                </button>

                <Link
                  href="/creator/messages"
                  className="w-full h-11 rounded-2xl font-bold text-sm bg-[#FAFAF8] hover:bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#66665E]" />
                  <span>Start Direct Inquiry</span>
                </Link>
              </div>

              {/* Verified Trust Metrics List */}
              <div className="pt-4 border-t border-[#E7E7E2] space-y-3">
                <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider block">
                  Marketplace Guarantees
                </span>

                <div className="space-y-2 text-xs text-[#52524E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Escrow Milestone Payout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Compliant EU VAT Reverse-Charge Invoicing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Platform Dispute Arbitration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Commercial Licensing Protection</span>
                  </div>
                </div>
              </div>

              {/* Brand Meta Specs */}
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Account Manager:</span>
                  <strong className="text-[#0A0A0A]">{brand.contactName}</strong>
                </div>
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Headquarters:</span>
                  <strong className="text-[#0A0A0A]">{brand.location}</strong>
                </div>
                {brand.foundedYear && (
                  <div className="flex items-center justify-between text-[#66665E]">
                    <span>Established:</span>
                    <strong className="text-[#0A0A0A]">{brand.foundedYear}</strong>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Avg Creator Rate:</span>
                  <strong className="text-[#0A0A0A]">€{brand.stats.avgPayoutEur}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={brand.companyName}
        subtitle={brand.industry}
        shareUrl={`/brands/${brand.id}`}
        avatar={brand.logo}
        role="brand"
      />

      {/* PITCH / APPLICATION MODAL */}
      <Modal
        open={isPitchModalOpen}
        onCancel={() => setIsPitchModalOpen(false)}
        footer={null}
        centered
        width={560}
        destroyOnClose
        className="influverse-modal"
      >
        <div className="p-6 sm:p-8 space-y-6 font-sans">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D78]">
              {selectedCampaign ? 'Campaign Application' : 'Direct Collaboration Pitch'}
            </span>
            <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
              {selectedCampaign ? selectedCampaign.title : `Pitch ${brand.companyName}`}
            </h3>
            <p className="text-xs text-[#66665E]">
              Send your collaboration idea, package proposal, and rate card to {brand.companyName}.
            </p>
          </div>

          <form onSubmit={handleSendPitch} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Proposed Compensation (€ EUR)
              </label>
              <Input
                prefix={<span className="text-sm font-bold text-[#66665E] mr-1">€</span>}
                value={proposedRate}
                onChange={(e) => setProposedRate(e.target.value)}
                placeholder="1200"
                className="h-11 rounded-xl font-bold text-sm"
                required
              />
              <span className="text-[11px] text-[#66665E]">
                100% of this amount will be funded into secure escrow upon offer acceptance.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Pitch &amp; Creative Concept
              </label>
              <textarea
                rows={4}
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
                placeholder="Explain why your audience is a match, what creative angle you suggest, and proposed turnaround time..."
                required
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-[#52524E] leading-relaxed">
                By submitting, your verified profile and media kit metrics will be shared with {brand.contactName} at {brand.companyName}.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPitchModalOpen(false)}
                className="h-10 px-5 rounded-full font-bold text-xs border border-[#E7E7E2] text-[#66665E] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingPitch}
                className="h-10 px-7 rounded-full font-bold text-xs bg-[#FF2D78] hover:bg-[#E02669] text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmittingPitch ? 'Sending...' : 'Submit Pitch'}</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
