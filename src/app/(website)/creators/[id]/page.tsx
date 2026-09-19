'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import { toggleSaveCreator } from '@/redux/slices/creatorSlice';
import { PackageCard } from '@/components/shared/PackageCard';
import { OfferModal } from '@/components/shared/OfferModal';
import { CreatorPackage, PlatformType } from '@/types';
import {
  Check,
  MapPin,
  Instagram,
  Youtube,
  Send,
  MessageSquare,
  Bookmark,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button, Tag, message } from 'antd';

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const creatorId = params?.id as string;
  const creator = creators.find((c) => c.id === creatorId) || creators[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'portfolio' | 'audience' | 'reviews'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('instagram');

  const isSaved = savedCreatorIds.includes(creator.id);

  const handleOpenOffer = (pkg?: CreatorPackage) => {
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
      })
    );
  };

  const filteredPackages = creator.packages.filter(
    (p) => p.platform === selectedPlatform
  );

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#73736A]">
          <Link href="/creators" className="hover:text-[#151515] transition-colors">
            Creators
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A3A39C]" />
          <span className="text-[#151515] font-bold">{creator.name}</span>
        </div>

        {/* Profile Header Area matching reference media_1789815697276.jpg */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E7E2] shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Circular Avatar with blue check badge */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#FAFAF8] shadow-md bg-[#F4F4F0]">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {creator.verified && (
                  <div
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-7 h-7 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"
                    title="Verified Creator"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Identity & Bio */}
              <div className="space-y-2.5 max-w-xl">
                {creator.verified && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3FE] text-[#2B7FFF] text-[11px] font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified creator</span>
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#151515] tracking-tight">
                  {creator.name}
                </h1>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#73736A]">
                  <span>{creator.categories.join(' & ')}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A3A39C]" />
                    {creator.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555550] leading-relaxed">
                  {creator.bio}
                </p>

                {/* Category Pills matching pastel tags in reference */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {creator.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                        idx === 0
                          ? 'bg-[#FDF0ED] text-[#C75D47]'
                          : idx === 1
                          ? 'bg-[#EEF7F2] text-[#23744D]'
                          : idx === 2
                          ? 'bg-[#F1EEF9] text-[#6444A6]'
                          : idx === 3
                          ? 'bg-[#FAF6E8] text-[#8C6819]'
                          : 'bg-[#EBF3FE] text-[#2B7FFF]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Social Platform Counts & Action Buttons */}
            <div className="w-full lg:w-72 flex flex-col gap-5 pt-4 lg:pt-0 lg:border-l border-[#E7E7E2] lg:pl-8">
              {/* Follower Stats Columns */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {creator.platforms.instagram && (
                  <div className="p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                    <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                      <Instagram className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-black text-[#151515]">
                      {creator.platforms.instagram.followersFormatted}
                    </div>
                    <div className="text-[9px] font-semibold text-[#73736A]">Followers</div>
                  </div>
                )}

                {creator.platforms.tiktok && (
                  <div className="p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                    <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-[#151515] flex items-center justify-center text-white text-[10px] font-black">
                      ♪
                    </div>
                    <div className="text-xs font-black text-[#151515]">
                      {creator.platforms.tiktok.followersFormatted}
                    </div>
                    <div className="text-[9px] font-semibold text-[#73736A]">Followers</div>
                  </div>
                )}

                {creator.platforms.youtube && (
                  <div className="p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                    <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                      <Youtube className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-black text-[#151515]">
                      {creator.platforms.youtube.followersFormatted}
                    </div>
                    <div className="text-[9px] font-semibold text-[#73736A]">Subscribers</div>
                  </div>
                )}
              </div>

              {/* Action Buttons matching reference */}
              <div className="space-y-2.5">
                <Button
                  type="primary"
                  block
                  onClick={() => handleOpenOffer()}
                  className="h-11 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none shadow-sm"
                >
                  Send Offer
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="default"
                    onClick={() => {
                      message.info(`Direct messaging channel open with ${creator.name}`);
                    }}
                    className="h-10 rounded-full font-bold text-xs border-[#D2D2CA] text-[#151515] flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </Button>

                  <Button
                    type="default"
                    onClick={() => {
                      dispatch(toggleSaveCreator(creator.id));
                      message.success(isSaved ? 'Removed from shortlist' : 'Added to brand shortlist');
                    }}
                    className={`h-10 rounded-full font-bold text-xs border-[#D2D2CA] flex items-center justify-center gap-1.5 ${
                      isSaved ? 'bg-[#151515] text-white' : 'text-[#151515]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs matching reference */}
          <div className="flex items-center gap-8 border-b border-[#E7E7E2] mt-10 text-xs font-bold">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'packages', label: 'Packages' },
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'audience', label: 'Audience' },
              { key: 'reviews', label: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-3.5 transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-[#151515] font-extrabold'
                    : 'text-[#73736A] hover:text-[#151515]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#151515] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview & Tab 2: Packages */}
        {(activeTab === 'overview' || activeTab === 'packages') && (
          <div className="space-y-8">
            {/* Packages Section matching reference */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#151515] tracking-tight">Packages</h2>
                  <p className="text-xs text-[#73736A] mt-0.5">
                    Choose a platform to view {creator.name.split(' ')[0]}&apos;s available packages.
                  </p>
                </div>

                {/* Platform Switcher Tabs */}
                <div className="inline-flex p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2]">
                  <button
                    onClick={() => setSelectedPlatform('instagram')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedPlatform === 'instagram'
                        ? 'bg-[#FDF0ED] text-[#C75D47] shadow-2xs'
                        : 'text-[#73736A] hover:text-[#151515]'
                    }`}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlatform('tiktok')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedPlatform === 'tiktok'
                        ? 'bg-[#151515] text-white shadow-2xs'
                        : 'text-[#73736A] hover:text-[#151515]'
                    }`}
                  >
                    <span>♪ TikTok</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlatform('youtube')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedPlatform === 'youtube'
                        ? 'bg-[#FF0000] text-white shadow-2xs'
                        : 'text-[#73736A] hover:text-[#151515]'
                    }`}
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </button>

                  <button
                    onClick={() => setSelectedPlatform('ugc')}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedPlatform === 'ugc'
                        ? 'bg-[#EEF7F2] text-[#23744D] shadow-2xs'
                        : 'text-[#73736A] hover:text-[#151515]'
                    }`}
                  >
                    <span>📹 UGC</span>
                  </button>
                </div>
              </div>

              {/* Packages Cards Row matching reference */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      packageItem={pkg}
                      onSelect={(p) => handleOpenOffer(p)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10 text-xs text-[#73736A]">
                    No packages listed for this channel. Contact creator for a custom brief.
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio Section matching reference */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#151515] tracking-tight">Portfolio</h2>
                  <p className="text-xs text-[#73736A] mt-0.5">
                    A selection of brand collaborations and content examples.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="text-xs font-bold text-[#151515] hover:text-[#2B7FFF] flex items-center gap-1"
                >
                  <span>View full portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Items Portfolio Grid matching reference media_1789815697276.jpg */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {creator.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl overflow-hidden group bg-[#F4F4F0] h-64 border border-[#E7E7E2]"
                  >
                    <img
                      src={item.mediaUrl}
                      alt={item.campaignTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-xs text-white">{item.brandName}</div>
                          <div className="text-[10px] text-[#D2D2CA]">{item.campaignTitle}</div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Full Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-6">
            <h2 className="text-xl font-black text-[#151515]">Full Work Gallery & Case Studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.portfolio.map((item) => (
                <div key={item.id} className="rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8]">
                  <img src={item.mediaUrl} alt={item.brandName} className="w-full h-56 object-cover" />
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B7FFF]">
                      {item.platform} Campaign
                    </span>
                    <h3 className="font-bold text-sm text-[#151515]">{item.brandName}</h3>
                    <p className="text-xs text-[#73736A]">{item.campaignTitle}</p>
                    <div className="flex justify-between text-[11px] font-semibold text-[#151515] pt-2 border-t border-[#E7E7E2]">
                      <span>Views: {item.views}</span>
                      <span>Likes: {item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Audience Demographics */}
        {activeTab === 'audience' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-8">
            <div>
              <h2 className="text-xl font-black text-[#151515]">Verified Audience Demographics</h2>
              <p className="text-xs text-[#73736A] mt-0.5">
                First-party authenticated analytics via Instagram Graph API & TikTok Creator Portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Countries */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Top Countries</h3>
                {creator.audience.topCountries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#151515]">
                      <span>{c.country}</span>
                      <span>{c.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E7E7E2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#151515] rounded-full" style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Gender Split */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Gender Distribution</h3>
                <div className="flex items-center justify-between text-xs font-bold text-[#151515]">
                  <span>Female ({creator.audience.genderSplit.female}%)</span>
                  <span>Male ({creator.audience.genderSplit.male}%)</span>
                </div>
                <div className="w-full h-3 bg-[#EEF7F2] rounded-full flex overflow-hidden">
                  <div
                    className="h-full bg-[#C75D47]"
                    style={{ width: `${creator.audience.genderSplit.female}%` }}
                  />
                  <div
                    className="h-full bg-[#2B7FFF]"
                    style={{ width: `${creator.audience.genderSplit.male}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#73736A] pt-1">
                  <span>Female</span>
                  <span>Male</span>
                </div>
              </div>

              {/* Age Bracket */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Primary Age Bracket</h3>
                <div className="text-3xl font-black text-[#151515] pt-2">
                  {creator.audience.topAgeGroup}
                </div>
                <p className="text-xs text-[#73736A]">
                  Over 78% of the engaged audience falls between young adult and high-income working age demographics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#151515]">Brand Reviews & Feedback</h2>
                <p className="text-xs text-[#73736A] mt-0.5">
                  Verified reviews from completed Influverse escrow orders.
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6E8] text-[#8C6819] font-black text-xs">
                <Star className="w-3.5 h-3.5 fill-[#8C6819]" />
                <span>{creator.rating} ({creator.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {creator.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.brandLogo} alt={rev.brandName} className="w-8 h-8 rounded-full object-cover border" />
                      <div>
                        <div className="font-bold text-xs text-[#151515]">{rev.brandName}</div>
                        <div className="text-[10px] text-[#73736A]">{rev.campaignName} • {rev.date}</div>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#555550] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Escrow Offer Modal */}
      <OfferModal />
    </div>
  );
}
