'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import { toggleSaveCreator } from '@/redux/slices/creatorSlice';
import { PackageCard } from '@/components/shared/PackageCard';
import { OfferModal } from '@/components/shared/OfferModal';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { PortfolioVideoModal } from '@/components/shared/PortfolioVideoModal';
import { CreatorPhotoLightbox } from '@/components/shared/CreatorPhotoLightbox';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { CreatorProfileSkeleton } from '@/components/shared/Skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { CreatorPackage, PlatformType, PortfolioItem, CreatorPhoto } from '@/types';
import {
  MapPin,
  Instagram,
  Youtube,
  MessageSquare,
  Bookmark,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Film,
  Play,
  Heart,
  ZoomIn,
  Home,
  Package,
  ExternalLink,
} from 'lucide-react';
import { Button, message } from 'antd';
import { Button as AppButton, Badge as AppBadge } from '@/components/ui';

function platformLabel(platform: string) {
  if (platform === 'all' || platform === 'multi') return 'All platforms';
  if (platform === 'ugc') return 'UGC Ads';
  if (platform === 'instagram') return 'Instagram';
  if (platform === 'tiktok') return 'TikTok';
  if (platform === 'youtube') return 'YouTube';
  return platform;
}

function genderLabel(gender?: string) {
  if (gender === 'female') return 'Female';
  if (gender === 'male') return 'Male';
  if (gender === 'non-binary' || gender === 'other') return 'Non-binary';
  return null;
}

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const creatorId = params?.id as string;
  const normalizedId = creatorId
    ? creatorId.startsWith('creator-') && creatorId.split('-')[1]?.length === 1
      ? `creator-0${creatorId.split('-')[1]}`
      : creatorId
    : '';

  const creator = creators.find(
    (c) =>
      c.id === creatorId ||
      c.id === normalizedId ||
      c.handle.replace('@', '').toLowerCase() === creatorId?.toLowerCase()
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'portfolio' | 'photos' | 'audience' | 'reviews'>('overview');
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | PlatformType>('all');
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4'>('all');
  const [reviewPage, setReviewPage] = useState(1);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<CreatorPhoto | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (creators.length === 0) {
    return <CreatorProfileSkeleton />;
  }

  if (!creator) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen py-20 font-sans flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center mx-auto shadow-xs">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold uppercase tracking-wider">
              <span>Creator Not Found</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Profile Unavailable
            </h1>
            <p className="text-sm text-[#66665E] max-w-sm mx-auto leading-relaxed">
              We couldn’t find a creator matching <span className="font-bold text-[#0A0A0A]">"{creatorId}"</span>. They may have changed their username or made their profile private.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Browse Creators</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedCreatorIds.includes(creator.id);

  const isSelfProfile =
    currentUser?.role === 'creator' &&
    (currentUser.id === creator.id ||
      creator.id === 'creator-01' ||
      currentUser.handle?.replace('@', '').toLowerCase() === creator.handle.toLowerCase());

  const handleOpenOffer = (pkg?: CreatorPackage) => {
    if (isSelfProfile) {
      router.push('/creator/packages');
      return;
    }
    dispatch(
      openOfferModal({
        id: creator.id,
        name: creator.name,
        handle: creator.handle,
        avatar: creator.avatar,
        packageId: pkg?.id,
        packageTitle: pkg?.title || 'Custom Campaign Brief',
        priceEur: pkg?.priceEur || creator.startingPriceEur,
        platform: pkg?.platform || 'instagram',
        deliveryDays: pkg?.deliveryDays,
      })
    );
  };

  const handleBookFromPortfolio = (item: PortfolioItem) => {
    setSelectedPortfolioItem(null);
    const matchingPkg =
      creator.packages.find((p) => p.platform === item.platform) || creator.packages[0];
    handleOpenOffer(matchingPkg);
  };

  const filteredPackages = creator.packages;

  const filteredPortfolio = portfolioFilter === 'all'
    ? creator.portfolio
    : creator.portfolio.filter((item) => item.platform === portfolioFilter);

  // High-res creator gallery photos
  const defaultPhotos: CreatorPhoto[] = [
    {
      id: `photo-${creator.id}-1`,
      url: creator.avatar,
      caption: `${creator.name} • Portrait`,
      category: 'photo',
      aspectRatio: 'portrait',
      date: 'February 2026',
      location: creator.location,
    },
    {
      id: `photo-${creator.id}-2`,
      url: creator.coverImage || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
      caption: `${creator.name} • Lifestyle Stills`,
      category: 'photo',
      aspectRatio: 'landscape',
      date: 'January 2026',
      location: creator.location,
    },
    {
      id: `photo-${creator.id}-3`,
      url: creator.portfolio[0]?.mediaUrl || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
      caption: `${creator.name} • Studio Shoot`,
      category: 'photo',
      aspectRatio: 'portrait',
      date: 'January 2026',
      location: creator.location,
    },
    {
      id: `photo-${creator.id}-4`,
      url: creator.portfolio[1]?.mediaUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
      caption: `${creator.name} • Candid Capture`,
      category: 'photo',
      aspectRatio: 'portrait',
      date: 'December 2025',
      location: creator.location,
    },
    {
      id: `photo-${creator.id}-5`,
      url: creator.portfolio[2]?.mediaUrl || 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
      caption: `${creator.name} • Natural Lighting`,
      category: 'photo',
      aspectRatio: 'square',
      date: 'November 2025',
      location: creator.location,
    },
    {
      id: `photo-${creator.id}-6`,
      url: creator.portfolio[3]?.mediaUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
      caption: `${creator.name} • Outdoor Shoot`,
      category: 'photo',
      aspectRatio: 'landscape',
      date: 'October 2025',
      location: creator.location,
    },
  ];

  const creatorPhotos = (creator.photos && creator.photos.length > 0) ? creator.photos : defaultPhotos;



  return (
    <div className="bg-[#FAFAF8] min-h-screen py-8 sm:py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Profile Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden text-sm font-bold text-[#66665E]">
            <Link href="/creators" className="shrink-0 hover:text-[#0A0A0A] transition-colors">
              Creators
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 text-[#A3A39C]" />
            <span className="hidden sm:inline truncate text-[#66665E]">{creator.categories[0]}</span>
            <ChevronRight className="hidden sm:block w-4 h-4 shrink-0 text-[#A3A39C]" />
            <span className="truncate text-[#0A0A0A] font-extrabold">{creator.name}</span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isSelfProfile && (
              <button
                type="button"
                onClick={() => {
                  dispatch(toggleSaveCreator(creator.id));
                  message.success(isSaved ? 'Removed from shortlist' : 'Added to brand shortlist');
                }}
                title={isSaved ? 'Saved to shortlist' : 'Save Creator'}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                  isSaved
                    ? 'bg-[#FFF0F5] border-[#FF2D78]/40 text-[#FF2D78] shadow-xs'
                    : 'bg-white hover:bg-[#FAFAF8] border-[#E7E7E2] text-[#66665E] hover:text-[#0A0A0A] hover:border-[#0A0A0A] shadow-2xs'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 transition-transform ${
                    isSaved ? 'fill-[#FF2D78] text-[#FF2D78] scale-110' : ''
                  }`}
                />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              title="Share Profile"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FAFAF8] border border-[#E7E7E2] text-[#66665E] hover:text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Header Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E7E2] shadow-sm relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Circular Avatar */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#FAFAF8] shadow-md bg-[#F4F4F0] group">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Identity & Bio */}
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0A0A0A] tracking-tight leading-none font-sans">
                    {creator.name}
                  </h1>
                  {creator.verified && (
                    <VerifiedBadge className="w-6 h-6 sm:w-7 sm:h-7" />
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-[#66665E] flex-wrap">
                  <span>{creator.categories.join(' & ')}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A3A39C]" />
                    {creator.location}
                  </span>
                  {genderLabel(creator.gender) && (
                    <>
                      <span>•</span>
                      <span>{genderLabel(creator.gender)}</span>
                    </>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#0A0A0A] font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {creator.rating} ({creator.reviewsCount} reviews)
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#555550] leading-[26px] font-medium">
                  {creator.bio}
                </p>

                {(creator.contactEmail || creator.contactPhone) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-[#0A0A0A]">
                    {creator.contactEmail && (
                      <a href={`mailto:${creator.contactEmail}`} className="hover:text-[#FF2D78]">
                        {creator.contactEmail}
                      </a>
                    )}
                    {creator.contactEmail && creator.contactPhone && (
                      <span className="text-[#A3A39C]">•</span>
                    )}
                    {creator.contactPhone && <span>{creator.contactPhone}</span>}
                  </div>
                )}

                {/* Category Pills matching pastel tags in reference */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {creator.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Social Platform Counts & Action Buttons */}
            <div className="w-full lg:w-80 xl:w-[340px] shrink-0 flex flex-col gap-4 pt-4 lg:pt-0 lg:border-l border-[#E7E7E2] lg:pl-8">
              <span className="text-sm font-bold text-[#66665E] uppercase tracking-wider">Social Reach</span>

              {/* Follower Stats Columns */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 text-center">
                {creator.platforms.instagram && (
                  <a
                    href={
                      creator.platforms.instagram.url ||
                      `https://instagram.com/${creator.platforms.instagram.handle.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#E1306C] hover:bg-rose-50/20 transition-all group/item block cursor-pointer"
                    title={`Visit ${creator.name}'s Instagram (@${creator.platforms.instagram.handle.replace('@', '')})`}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-2xs group-hover/item:scale-110 transition-transform">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-sm font-black text-[#0A0A0A] flex items-center justify-center gap-1">
                      <span>{creator.platforms.instagram.followersFormatted}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#66665E] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#66665E] tracking-tight">Followers</div>
                  </a>
                )}

                {creator.platforms.tiktok && (
                  <a
                    href={
                      creator.platforms.tiktok.url ||
                      `https://tiktok.com/@${creator.platforms.tiktok.handle.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-zinc-100/40 transition-all group/item block cursor-pointer"
                    title={`Visit ${creator.name}'s TikTok (@${creator.platforms.tiktok.handle.replace('@', '')})`}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white shadow-2xs group-hover/item:scale-110 transition-transform">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                      </svg>
                    </div>
                    <div className="text-sm font-black text-[#0A0A0A] flex items-center justify-center gap-1">
                      <span>{creator.platforms.tiktok.followersFormatted}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#66665E] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#66665E] tracking-tight">Followers</div>
                  </a>
                )}

                {creator.platforms.youtube && (
                  <a
                    href={
                      creator.platforms.youtube.url ||
                      `https://youtube.com/@${creator.platforms.youtube.handle.replace(/[\s@]/g, '').toLowerCase()}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#FF0000] hover:bg-red-50/20 transition-all group/item block cursor-pointer"
                    title={`Visit ${creator.name}'s YouTube (${creator.platforms.youtube.handle})`}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-2xs group-hover/item:scale-110 transition-transform">
                      <Youtube className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-sm font-black text-[#0A0A0A] flex items-center justify-center gap-1">
                      <span>{creator.platforms.youtube.followersFormatted}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#66665E] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#66665E] tracking-tight">Subscribers</div>
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-[#66665E]">Starting rate</span>
                <span className="text-lg font-black text-[#0A0A0A]">€{creator.startingPriceEur}</span>
              </div>

              {/* Action Buttons */}
              {isSelfProfile ? (
                <div className="space-y-2.5">
                  <AppButton
                    href="/creator/profile"
                    size="md"
                    variant="primary"
                    fullWidth
                  >
                    Edit Profile & Bio
                  </AppButton>
                  <AppButton
                    href="/creator/packages"
                    size="md"
                    variant="secondary"
                    fullWidth
                  >
                    Manage Packages
                  </AppButton>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <AppButton
                    type="button"
                    size="md"
                    variant="primary"
                    fullWidth
                    onClick={() => handleOpenOffer()}
                  >
                    Send Offer
                  </AppButton>

                  <AppButton
                    type="button"
                    size="md"
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      if (currentUser?.role === 'creator') {
                        router.push(`/creator/messages?creatorId=${creator.id}`);
                      } else {
                        router.push(`/brand/messages?creatorId=${creator.id}`);
                      }
                    }}
                    icon={<MessageSquare className="w-4 h-4 text-[#66665E]" />}
                  >
                    Message
                  </AppButton>
                </div>
              )}
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-[#E7E7E2] mt-8 sm:mt-10 text-sm font-bold overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'packages', label: 'Packages' },
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'photos', label: 'Gallery' },
              { key: 'audience', label: 'Audience' },
              { key: 'reviews', label: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={(e) => {
                  setActiveTab(tab.key as any);
                  e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
                }}
                className={`pb-3.5 whitespace-nowrap transition-colors relative cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-[#0A0A0A] font-black'
                    : 'text-[#66665E] hover:text-[#0A0A0A]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Collaboration Deals & Offerings Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Collaboration Deals &amp; Rates
                  </h2>
                  <p className="text-sm text-[#66665E] mt-1 font-medium">
                    Fixed-price verified deliverables with 100% escrow protection and guaranteed turnaround.
                  </p>
                </div>

                {filteredPackages.length > 3 && (
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                  >
                    <span>View All Deals ({filteredPackages.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Packages Cards Row (Highest 3 Deals) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.length > 0 ? (
                  filteredPackages.slice(0, 3).map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      packageItem={pkg}
                      creator={{
                        id: creator.id,
                        name: creator.name,
                        handle: creator.handle,
                        avatar: creator.avatar,
                      }}
                      onSelect={(p) => handleOpenOffer(p)}
                    />
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <EmptyState
                      color="neutral"
                      icon={<Package className="w-8 h-8 text-[#66665E]" />}
                      title="No Deals In This Category"
                      description="This creator currently accepts custom collaboration offers and multi-deliverable briefs for this format."
                      primaryAction={{
                        label: 'Request Custom Proposal',
                        onClick: () => handleOpenOffer(),
                      }}
                      variant="plain"
                    />
                  </div>
                )}
              </div>

              {/* Custom Brief Banner */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0A0A0A]">Need a custom campaign or multi-channel rollout?</h4>
                    <p className="text-xs sm:text-sm text-[#66665E] mt-0.5">Send a tailored brief with your budget, required deliverables, and licensing timeline.</p>
                  </div>
                </div>
                <AppButton
                  size="md"
                  variant="primary"
                  onClick={() => handleOpenOffer()}
                >
                  Send Custom Offer
                </AppButton>
              </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Featured Portfolio</h2>
                  <p className="text-sm text-[#66665E] mt-1 font-medium">
                    Verified brand collaborations and creative content samples.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>View All Campaigns</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Items Portfolio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {creator.portfolio.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedPortfolioItem(item)}
                    className="relative rounded-2xl overflow-hidden group bg-[#F4F4F0] h-64 border border-[#E7E7E2] hover:border-[#0A0A0A] hover:shadow-lg transition-all cursor-pointer"
                  >
                    <img
                      src={item.mediaUrl}
                      alt={item.campaignTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Play Indicator Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#FF2D78] group-hover:scale-110 transition-all shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                            {platformLabel(item.platform)}
                          </span>
                          <div className="font-extrabold text-sm text-white">{item.brandName}</div>
                          <div className="text-xs text-[#D2D2CA] line-clamp-1">{item.campaignTitle}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-white/90">{item.views} views</div>
                          <div className="text-xs text-[#D2D2CA]">{item.likes} likes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Gallery
                  </h2>
                  <p className="text-sm text-[#66665E] mt-1 font-medium">
                    Photos and visual showcase of {creator.name}.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('photos')}
                  className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>View All Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4-Card Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {creatorPhotos.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhoto(item)}
                    className="relative rounded-2xl overflow-hidden group bg-[#FAFAF8] h-72 border border-[#E7E7E2] hover:border-[#0A0A0A] hover:shadow-lg transition-all cursor-pointer"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Minimal Zoom Icon on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-[#0A0A0A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md group-hover:scale-110">
                        <ZoomIn className="w-4.5 h-4.5 text-[#0A0A0A]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
    
          </div>

            {/* Verified Brand Reviews Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Client Reviews & Testimonials</h2>
                  <p className="text-sm text-[#66665E] mt-1 font-medium">
                    Verified ratings from completed brand escrow contracts.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>All {creator.reviewsCount} Reviews</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creator.reviews.slice(0, 4).map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3 flex flex-col justify-between shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <BrandLogo name={rev.brandName} logoUrl={rev.brandLogo} size="md" />
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-[#0A0A0A] truncate">{rev.brandName}</div>
                            <div className="text-sm text-[#66665E] truncate">{rev.campaignName} • {rev.date}</div>
                          </div>
                        </div>
                        <div className="flex text-amber-500 shrink-0">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#555550] leading-[24px] italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E7E7E2]/60 flex items-center justify-between text-sm text-[#66665E]">
                      <span className="font-bold text-[#0A0A0A] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0A]" />
                        <span>Escrow Verified</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E7E2]/60">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A]">All Collaboration Deals</h2>
                <p className="text-xs sm:text-sm text-[#66665E] mt-1 font-medium">
                  Transparent fixed EUR pricing with escrow protection and clear turnaround times.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  packageItem={pkg}
                  creator={{
                    id: creator.id,
                    name: creator.name,
                    handle: creator.handle,
                    avatar: creator.avatar,
                  }}
                  onSelect={(p) => handleOpenOffer(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FULL PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-6">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A]">
                  Work Gallery & Portfolio
                </h2>
                <p className="text-sm text-[#66665E] mt-1 font-medium max-w-xl">
                  {portfolioFilter === 'all'
                    ? 'Browse previous brand campaigns, engagement reach, and visual deliverables across all platforms.'
                    : `Filtered by ${platformLabel(portfolioFilter)} campaigns and deliverables produced by ${creator.name}.`}
                </p>
              </div>

              {/* Interactive Platform Filter Pills - Strict 1 Line */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] whitespace-nowrap overflow-x-auto shrink-0 max-w-full">
                {[
                  { key: 'all', label: 'All', count: creator.portfolio.length },
                  {
                    key: 'instagram',
                    label: 'Instagram',
                    count: creator.portfolio.filter((i) => i.platform === 'instagram').length,
                  },
                  {
                    key: 'tiktok',
                    label: 'TikTok',
                    count: creator.portfolio.filter((i) => i.platform === 'tiktok').length,
                  },
                  {
                    key: 'youtube',
                    label: 'YouTube',
                    count: creator.portfolio.filter((i) => i.platform === 'youtube').length,
                  },
                  {
                    key: 'ugc',
                    label: 'UGC Ads',
                    count: creator.portfolio.filter((i) => i.platform === 'ugc').length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setPortfolioFilter(tab.key as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      portfolioFilter === tab.key
                        ? 'bg-[#0A0A0A] text-white shadow-2xs'
                        : 'text-[#66665E] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-extrabold ${
                        portfolioFilter === tab.key
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EAEAE3] text-[#0A0A0A]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {filteredPortfolio.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedPortfolioItem(item)}
                    className="rounded-3xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] hover:border-[#0A0A0A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer font-sans"
                  >
                    {/* Media Thumbnail Container */}
                    <div className="h-60 overflow-hidden relative bg-[#0A0A0A]">
                      <img
                        src={item.mediaUrl}
                        alt={item.campaignTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Top Badges: Platform & Duration */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <span className="text-xs font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-sm">
                          {item.platform === 'instagram' && <Instagram className="w-3 h-3 text-[#FF2D78]" />}
                          {item.platform === 'tiktok' && <Film className="w-3 h-3 text-white" />}
                          {item.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                          {item.platform === 'ugc' && <Sparkles className="w-3 h-3 text-purple-400" />}
                          <span>{platformLabel(item.platform)}</span>
                        </span>

                        {item.duration && (
                          <span className="text-xs font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10">
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Hover Center Play Overlay Button */}
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/95 group-hover:bg-[#FF2D78] group-hover:text-white text-[#0A0A0A] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
                          <Play className="w-5 h-5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-base text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">
                            {item.brandName}
                          </h3>
                          <span className="text-xs font-extrabold text-[#0A0A0A] bg-[#F4F4F0] px-2.5 py-0.5 rounded-md border border-[#E7E7E2]">
                            {item.views} Views
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-[#0A0A0A] line-clamp-1">
                          {item.campaignTitle}
                        </p>

                        {item.deliverableType && (
                          <p className="text-sm text-[#66665E] font-medium line-clamp-1">
                            {item.deliverableType}
                          </p>
                        )}
                      </div>

                      {/* Footer Metrics & Verified Label */}
                      <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-between text-sm font-bold text-[#66665E]">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[#0A0A0A]">
                            <Heart className="w-3.5 h-3.5 text-[#FF2D78]" />
                            {item.likes}
                          </span>
                          {item.engagementRate && (
                            <span className="flex items-center gap-1 text-[#0A0A0A]">
                              <TrendingUp className="w-3.5 h-3.5 text-[#FF2D78]" />
                              {item.engagementRate}
                            </span>
                          )}
                        </div>

                        <span className="text-[#0A0A0A] group-hover:text-[#FF2D78] flex items-center gap-1 font-extrabold transition-colors">
                          <span>Preview Portfolio</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                color="purple"
                icon={<Film className="w-8 h-8" />}
                badge="Portfolio Filter"
                title={`No Works Found for ${portfolioFilter.toUpperCase()}`}
                description="This creator has not tagged portfolio items specifically for this platform yet. Switch to 'All Works' to preview their full portfolio."
                primaryAction={{
                  label: 'View All Works',
                  onClick: () => setPortfolioFilter('all'),
                }}
                variant="dashed"
              />
            )}
          </div>
        )}

        {/* TAB 4: GALLERY */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-8">
            <div className="pb-6 border-b border-[#E7E7E2]">
              <h2 className="text-2xl font-extrabold text-[#0A0A0A]">
                Gallery
              </h2>
              <p className="text-sm text-[#66665E] mt-1 font-medium">
                Photos and visual profile of {creator.name}.
              </p>
            </div>

            {/* Clean Photo Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {creatorPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] hover:border-[#0A0A0A] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer aspect-square relative"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Creator editorial photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient & Minimal Zoom Icon on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#0A0A0A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-2">
                      <ZoomIn className="w-5 h-5 text-[#FF2D78]" />
                    </div>
                    <span className="text-white font-extrabold text-xs tracking-wide">
                      Preview Full Resolution
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AUDIENCE DEMOGRAPHICS */}
        {activeTab === 'audience' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A]">Verified Audience Demographics</h2>
              <p className="text-sm text-[#66665E] mt-1 font-medium">
                First-party authenticated analytics via Instagram Graph API & TikTok Creator Portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Countries */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Top Geographies</h3>
                {creator.audience.topCountries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex justify-between text-sm font-bold text-[#0A0A0A]">
                      <span>{c.country}</span>
                      <span>{c.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E7E7E2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A0A0A] rounded-full" style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Gender Split */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Gender Distribution</h3>
                <div className="flex items-center justify-between text-sm font-bold text-[#0A0A0A]">
                  <span>Female ({creator.audience.genderSplit.female}%)</span>
                  <span>Male ({creator.audience.genderSplit.male}%)</span>
                </div>
                <div className="w-full h-3 bg-[#E7E7E2] rounded-full flex overflow-hidden">
                  <div
                    className="h-full bg-[#0F766E]"
                    style={{ width: `${creator.audience.genderSplit.female}%` }}
                  />
                  <div
                    className="h-full bg-[#7C3AED]"
                    style={{ width: `${creator.audience.genderSplit.male}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-[#66665E] pt-1 font-bold">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0F766E]" /> Female
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#7C3AED]" /> Male
                  </span>
                </div>
              </div>

              {/* Age Bracket */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Primary Age Bracket</h3>
                <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] pt-2">
                  {creator.audience.topAgeGroup}
                </div>
                <p className="text-sm text-[#66665E] font-medium leading-relaxed">
                  Over 75% of the engaged audience falls between young adult and high-income working age demographics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === 'reviews' && (() => {
          const filteredReviews = creator.reviews.filter((rev) => {
            if (reviewFilter === '5') return rev.rating === 5;
            if (reviewFilter === '4') return rev.rating === 4;
            return true;
          });
          const reviewsPerPage = 6;
          const reviewPageCount = Math.ceil(filteredReviews.length / reviewsPerPage);
          const currentReviewPage = Math.min(reviewPage, Math.max(reviewPageCount, 1));
          const reviewPageStart = (currentReviewPage - 1) * reviewsPerPage;
          const displayedReviews = filteredReviews.slice(
            reviewPageStart,
            reviewPageStart + reviewsPerPage,
          );

          return (
            <div className="space-y-6">
              {/* Rating Summary & Trust Breakdown Header Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Brand Reviews & Verified Ratings
                    </h2>
                    <p className="text-sm text-[#66665E] mt-1 font-medium">
                      All reviews are verified from completed escrow collaborations on Influverse.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center gap-3.5">
                      <div className="text-3xl font-black text-[#0A0A0A] font-sans tracking-tight">
                        {creator.rating.toFixed(2)}
                      </div>
                      <div>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500" />
                          ))}
                        </div>
                        <div className="text-sm font-bold text-[#66665E] mt-0.5">
                          {creator.reviewsCount || 42} verified reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Reviews List & Filter Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-sm space-y-6">
                {/* 1-Line Filter Tabs */}
                <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#E7E7E2] overflow-x-auto">
                  <div className="inline-flex items-center gap-2 whitespace-nowrap shrink-0">
                    <button
                      onClick={() => {
                        setReviewFilter('all');
                        setReviewPage(1);
                      }}
                      className={`h-9 px-4 rounded-full text-sm font-bold transition-all cursor-pointer ${
                        reviewFilter === 'all'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'bg-[#FAFAF8] text-[#555550] hover:bg-[#F4F4F0] border border-[#E7E7E2]'
                      }`}
                    >
                      All Reviews
                    </button>
                    <button
                      onClick={() => {
                        setReviewFilter('5');
                        setReviewPage(1);
                      }}
                      className={`h-9 px-4 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        reviewFilter === '5'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'bg-[#FAFAF8] text-[#555550] hover:bg-[#F4F4F0] border border-[#E7E7E2]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>5 Stars ({creator.reviews.filter((r) => r.rating === 5).length})</span>
                    </button>
                    <button
                      onClick={() => {
                        setReviewFilter('4');
                        setReviewPage(1);
                      }}
                      className={`h-9 px-4 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        reviewFilter === '4'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'bg-[#FAFAF8] text-[#555550] hover:bg-[#F4F4F0] border border-[#E7E7E2]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4 Stars ({creator.reviews.filter((r) => r.rating === 4).length})</span>
                    </button>
                  </div>

                  <span className="text-sm font-bold text-[#66665E] whitespace-nowrap shrink-0 hidden sm:inline">
                    Showing {filteredReviews.length === 0 ? 0 : reviewPageStart + 1}–{Math.min(reviewPageStart + reviewsPerPage, filteredReviews.length)} of {filteredReviews.length} Verified Reviews
                  </span>
                </div>

                {/* Reviews Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedReviews.map((rev) => (
                    <div key={rev.id} className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A]/30 transition-all space-y-4 flex flex-col justify-between group shadow-2xs">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <BrandLogo name={rev.brandName} logoUrl={rev.brandLogo} size="md" />
                            <div className="min-w-0">
                              <div className="font-extrabold text-sm text-[#0A0A0A] truncate">{rev.brandName}</div>
                              <div className="text-sm text-[#66665E] truncate">{rev.campaignName}</div>
                            </div>
                          </div>
                          <div className="flex text-amber-500 shrink-0">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500" />
                            ))}
                          </div>
                        </div>

                        <p className="text-sm sm:text-[15px] text-[#44443E] leading-[24px] italic font-normal">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E7E7E2]/80 flex items-center justify-between text-sm text-[#66665E]">
                        <span className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0A]" />
                          <span>Verified Escrow Order</span>
                        </span>
                        <span className="font-medium text-[#66665E]">{rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {reviewPageCount > 1 && (
                  <nav
                    aria-label="Review pagination"
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#E7E7E2]"
                  >
                    <p className="text-sm font-semibold text-[#66665E]">
                      Page {currentReviewPage} of {reviewPageCount}
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setReviewPage((page) => Math.max(1, page - 1))}
                        disabled={currentReviewPage === 1}
                        aria-label="Previous reviews page"
                        className="w-9 h-9 rounded-full border border-[#E7E7E2] bg-white text-[#0A0A0A] flex items-center justify-center transition-colors hover:border-[#0A0A0A] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:border-[#E7E7E2]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: reviewPageCount }, (_, index) => index + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setReviewPage(page)}
                          aria-current={page === currentReviewPage ? 'page' : undefined}
                          className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${
                            page === currentReviewPage
                              ? 'bg-[#0A0A0A] text-white'
                              : 'bg-white border border-[#E7E7E2] text-[#555550] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => setReviewPage((page) => Math.min(reviewPageCount, page + 1))}
                        disabled={currentReviewPage === reviewPageCount}
                        aria-label="Next reviews page"
                        className="w-9 h-9 rounded-full border border-[#E7E7E2] bg-white text-[#0A0A0A] flex items-center justify-center transition-colors hover:border-[#0A0A0A] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:border-[#E7E7E2]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </nav>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Video Showcase & Portfolio Modal */}
      <PortfolioVideoModal
        item={selectedPortfolioItem}
        creator={creator}
        onClose={() => setSelectedPortfolioItem(null)}
        onBookCampaign={handleBookFromPortfolio}
      />

      {/* Interactive High-Res Lookbook & Photo Lightbox */}
      <CreatorPhotoLightbox
        photo={selectedPhoto}
        photos={creatorPhotos}
        creator={creator}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
        onBookCampaign={() => {
          setSelectedPhoto(null);
          handleOpenOffer();
        }}
      />

      {/* Share Profile Modal */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={creator.name}
        subtitle={`@${creator.handle.replace('@', '')} • ${creator.categories.join(' • ')}`}
        shareUrl={`/creators/${creator.id}`}
        avatar={creator.avatar}
        role="creator"
      />

      {/* Brand Escrow Offer Modal */}
      <OfferModal />
    </div>
  );
}
