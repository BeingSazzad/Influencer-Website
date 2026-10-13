'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getBrandProfile } from '@/data/mockBrands';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import {
  MapPin,
  Globe,
  ExternalLink,
  ShieldCheck,
  Star,
  Users,
  Building2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Share2,
  Bookmark,
  Award,
  Check,
  Send,
  Calendar,
} from 'lucide-react';
import { message, Modal, Input } from 'antd';

export default function BrandProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);

  const brandId = (params?.id as string) || 'user_brand_01';
  const brand = getBrandProfile(brandId, currentUser);

  const [reviewTab, setReviewTab] = useState<'given' | 'received'>('given');
  const [isSaved, setIsSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Partnership Pitch Modal State
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [pitchMessage, setPitchMessage] = useState('');
  const [proposedRate, setProposedRate] = useState('1200');
  const [isSubmittingPitch, setIsSubmittingPitch] = useState(false);

  const handleOpenPitch = () => {
    setPitchMessage(
      `Hi ${brand.companyName}! I love your brand and would love to collaborate with you on upcoming campaigns. Here is a brief pitch and my rate card proposal.`
    );
    setProposedRate('1200');
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
      message.success(`Partnership pitch delivered to ${brand.companyName}!`);
    }, 600);
  };

  const isCurrentBrandOwner =
    currentUser?.role === 'brand' &&
    (currentUser.id === brand.id ||
      currentUser.companyName?.toLowerCase() === brand.companyName.toLowerCase());

  const reviewsGivenList = brand.reviewsGiven || [];
  const reviewsReceivedList = brand.reviews || [];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0A0A0A] font-sans pb-24">
      {/* 1. TOP BREADCRUMB & UTILITY NAVIGATION */}
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
              <span>{isSaved ? 'Saved' : 'Save'}</span>
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
        {/* 2. CLEAN BRAND IDENTITY HEADER (NO COVER BANNER) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Brand Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center p-2 shrink-0 shadow-xs">
                <BrandLogo name={brand.companyName} logoUrl={brand.logo} size="lg" />
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
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#A3A39C]" />
                    <span>{brand.location}</span>
                  </span>
                  {brand.website && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#0A0A0A] font-semibold hover:underline"
                    >
                      <Globe className="w-4 h-4 text-[#A3A39C]" />
                      <span>{brand.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3 text-[#A3A39C]" />
                    </a>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#A3A39C]" />
                    <span>{brand.companySize.split('(')[0].trim()}</span>
                  </span>
                  {brand.foundedYear && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#A3A39C]" />
                      <span>Est. {brand.foundedYear}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pitch for Partnership Button */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenPitch}
                className="h-12 px-7 rounded-full font-bold text-sm bg-[#FF2D78] hover:bg-[#E02669] text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pitch for Partnership</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: ABOUT & REVIEWS */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Brand */}
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
              {brand.industryTags && brand.industryTags.length > 0 && (
                <div className="pt-4 border-t border-[#E7E7E2]/70 space-y-2">
                  <span className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                    Focus Areas &amp; Aesthetic
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
              )}
            </div>

            {/* Creator Collaboration Ethos */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] border border-[#FF2D78]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#FF2D78]" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                    Creator Collaboration Focus
                  </h2>
                  <p className="text-xs text-[#66665E] font-medium">
                    What {brand.companyName} values in talent partnerships.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Authentic Voice</span>
                  </div>
                  <p className="text-xs text-[#66665E] leading-relaxed">
                    Creators who naturally integrate brand stories with genuine experience, avoiding scripted infomercials.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Visual Excellence</span>
                  </div>
                  <p className="text-xs text-[#66665E] leading-relaxed">
                    Clean framing, natural lighting, and crisp high-definition production that aligns with brand aesthetics.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Timely Delivery</span>
                  </div>
                  <p className="text-xs text-[#66665E] leading-relaxed">
                    Clear milestone alignment, respectful communication, and dependable turnaround schedules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Secured Escrow</span>
                  </div>
                  <p className="text-xs text-[#66665E] leading-relaxed">
                    All collaboration budgets are funded upfront to secure escrow before work begins. Zero payment friction.
                  </p>
                </div>
              </div>
            </div>

            {/* REVIEWS & ENDORSEMENTS SECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              {/* Header with Switcher Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E7E2]">
                <div>
                  <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                    Reviews &amp; Collaborations
                  </h2>
                  <p className="text-xs text-[#66665E]">
                    Verified feedback and endorsements between {brand.companyName} and creators.
                  </p>
                </div>

                {/* Sub-tab switcher */}
                <div className="flex items-center bg-[#FAFAF8] p-1 rounded-2xl border border-[#E7E7E2]">
                  <button
                    type="button"
                    onClick={() => setReviewTab('given')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      reviewTab === 'given'
                        ? 'bg-white text-[#0A0A0A] shadow-xs'
                        : 'text-[#66665E] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>Reviews Given ({reviewsGivenList.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewTab('received')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      reviewTab === 'received'
                        ? 'bg-white text-[#0A0A0A] shadow-xs'
                        : 'text-[#66665E] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>Reviews Received ({reviewsReceivedList.length})</span>
                  </button>
                </div>
              </div>

              {/* REVIEWS GIVEN BY THE BRAND TO CREATORS */}
              {reviewTab === 'given' && (
                <div className="space-y-4">
                  {reviewsGivenList.length > 0 ? (
                    reviewsGivenList.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-2xl p-5 border border-[#E7E7E2] bg-[#FAFAF8]/60 hover:bg-[#FAFAF8] transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.creatorAvatar}
                              alt={rev.creatorName}
                              className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
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
                                {rev.collaborationType}
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

                        <p className="text-xs sm:text-sm text-[#44443E] leading-relaxed italic bg-white p-3.5 rounded-xl border border-[#E7E7E2]">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border border-[#E7E7E2] rounded-2xl space-y-2">
                      <Award className="w-8 h-8 text-[#A3A39C] mx-auto" />
                      <h4 className="text-sm font-bold text-[#0A0A0A]">No Reviews Given Yet</h4>
                      <p className="text-xs text-[#66665E]">
                        {brand.companyName} will publish creator endorsements as completed partnerships conclude.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* REVIEWS RECEIVED FROM CREATORS */}
              {reviewTab === 'received' && (
                <div className="space-y-4">
                  {reviewsReceivedList.length > 0 ? (
                    reviewsReceivedList.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-2xl p-5 border border-[#E7E7E2] bg-[#FAFAF8]/60 hover:bg-[#FAFAF8] transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.creatorAvatar}
                              alt={rev.creatorName}
                              className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
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

                        <p className="text-xs sm:text-sm text-[#44443E] leading-relaxed italic bg-white p-3.5 rounded-xl border border-[#E7E7E2]">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border border-[#E7E7E2] rounded-2xl space-y-2">
                      <Star className="w-8 h-8 text-[#A3A39C] mx-auto" />
                      <h4 className="text-sm font-bold text-[#0A0A0A]">No Reviews Received Yet</h4>
                      <p className="text-xs text-[#66665E]">
                        Creator feedback appears here after milestones are completed and signed off.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: PARTNERSHIP PITCH & BRAND SPECS */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-5 sticky top-24">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D78]">
                  Collaboration Pitch
                </span>
                <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight">
                  Partner with {brand.companyName}
                </h3>
                <p className="text-xs text-[#66665E] leading-relaxed">
                  Pitch your creative ideas, share your rate card, and propose a collaboration concept directly to the brand team.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenPitch}
                className="w-full h-12 rounded-2xl font-extrabold text-sm bg-[#FF2D78] hover:bg-[#E02669] text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pitch for Partnership</span>
              </button>

              {/* Verified Trust Guarantees */}
              <div className="pt-4 border-t border-[#E7E7E2] space-y-3">
                <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider block">
                  Marketplace Assurance
                </span>

                <div className="space-y-2.5 text-xs text-[#52524E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Escrow Milestone Payout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Brand Identity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dispute &amp; Support Mediation</span>
                  </div>
                </div>
              </div>

              {/* Brand Meta Specs */}
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Partnerships Lead:</span>
                  <strong className="text-[#0A0A0A]">{brand.contactName}</strong>
                </div>
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Location:</span>
                  <strong className="text-[#0A0A0A]">{brand.location}</strong>
                </div>
                {brand.website && (
                  <div className="flex items-center justify-between text-[#66665E]">
                    <span>Website:</span>
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A0A0A] font-bold hover:underline"
                    >
                      {brand.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#66665E]">
                  <span>Rating:</span>
                  <div className="flex items-center gap-1 font-bold text-[#0A0A0A]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{brand.stats.rating}</span>
                    <span className="text-[#A3A39C] font-normal">
                      ({brand.stats.reviewsCount})
                    </span>
                  </div>
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

      {/* PARTNERSHIP PITCH MODAL */}
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
              Partnership Pitch
            </span>
            <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
              Pitch {brand.companyName}
            </h3>
            <p className="text-xs text-[#66665E]">
              Send your collaboration concept, media kit link, and proposed fee to {brand.companyName}.
            </p>
          </div>

          <form onSubmit={handleSendPitch} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Proposed Collaboration Fee (€ EUR)
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
                Funds are protected in escrow upon acceptance of the partnership offer.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Creative Proposal &amp; Concept Note
              </label>
              <textarea
                rows={4}
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
                placeholder="Introduce yourself, outline why your audience matches this brand, and describe the content format you propose..."
                required
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-[#52524E] leading-relaxed">
                Your verified creator rate card and profile stats will be delivered to {brand.contactName} at {brand.companyName}.
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
                <span>{isSubmittingPitch ? 'Sending...' : 'Send Pitch'}</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
