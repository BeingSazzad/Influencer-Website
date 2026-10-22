'use client';

import React from 'react';
import Link from 'next/link';
import { Creator } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSaveCreator } from '@/redux/slices/creatorSlice';
import { ArrowRight, Instagram, Youtube, Star, MapPin } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { SaveButton } from '@/components/shared/SaveButton';
import { Button, Badge } from '@/components/ui';

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const dispatch = useAppDispatch();
  const savedCreatorIds = useAppSelector((state) => state.creator.savedCreatorIds);
  const isSaved = savedCreatorIds.includes(creator.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSaveCreator(creator.id));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7E7E2] bg-white font-sans transition-all duration-300 hover:border-[#0A0A0A] hover:shadow-xl lg:rounded-3xl lg:hover:-translate-y-1">
      <Link
        href={`/creators/${creator.id}`}
        aria-label={`View ${creator.name}`}
        className="absolute inset-0 z-[1] lg:hidden"
      />
      {/* Creator Portrait Section */}
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-t-2xl bg-[#F4F4F0] lg:aspect-square lg:rounded-t-3xl">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <Link
          href={`/creators/${creator.id}`}
          aria-label={`View ${creator.name}`}
          className="absolute inset-0 z-[1] hidden lg:block"
        />

        {/* Rating pill top left */}
        <div className="absolute left-2 top-2 z-[2] flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-md lg:left-3 lg:top-3 lg:px-2.5 lg:py-1 lg:text-[12px]">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400 lg:h-3.5 lg:w-3.5" />
          <span>{creator.rating}</span>
        </div>

        {/* Top Right Save/Bookmark Action Button */}
        <div className="absolute right-2 top-2 z-[2] lg:right-3 lg:top-3">
          <SaveButton saved={isSaved} overlay onClick={handleSave} />
        </div>
      </div>

      {/* Card Info Body with refined balanced padding */}
      <div className="flex flex-1 flex-col justify-between space-y-2 p-2.5 lg:space-y-4 lg:p-5">
        <div>
          {/* Creator Name & Price Header */}
          <div className="mb-1 flex items-start justify-between gap-1.5 lg:mb-2 lg:gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/creators/${creator.id}`} className="relative z-[2] inline-flex max-w-full items-center gap-1 group/link">
                <h3 className="truncate font-sans text-[13px] font-bold tracking-tight text-[#0A0A0A] transition-colors group-hover/link:text-[#FF2D78] lg:text-base">
                  {creator.name}
                </h3>
                {creator.verified && <VerifiedBadge size="sm" />}
              </Link>
              <span className="mt-0.5 block truncate text-[11px] font-medium text-[#66665E] lg:text-sm">
                {creator.location}
              </span>
            </div>

            <div className="shrink-0 text-right">
              <span className="hidden font-sans text-xs font-bold uppercase tracking-wider text-[#66665E] lg:block">
                FROM
              </span>
              <strong className="font-sans text-sm font-extrabold tracking-tight text-[#0A0A0A] lg:text-2xl">
                €{creator.startingPriceEur}
              </strong>
            </div>
          </div>

          {/* Category Tags Pills */}
          <div className="mb-2 flex flex-wrap gap-1 lg:mb-3.5 lg:gap-1.5">
            {creator.categories.slice(0, 1).map((cat) => (
              <Badge key={cat} variant="neutral" size="sm">
                {cat}
              </Badge>
            ))}
            <span className="hidden lg:contents">
              {creator.categories.slice(1, 3).map((cat) => (
                <Badge key={cat} variant="neutral" size="sm">
                  {cat}
                </Badge>
              ))}
            </span>
          </div>

          {/* Social Platform Follower Counts Bar with crisp icons & proper sizes */}
          <div className="flex items-center justify-between gap-1 overflow-hidden border-t border-[#F0F0EB] pt-2 font-sans text-xs font-bold text-[#0A0A0A] lg:pt-3 lg:text-sm">
            {creator.platforms.instagram && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.instagram.followersFormatted}
                </span>
              </div>
            )}

            {creator.platforms.tiktok && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#000000] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-white" viewBox="0 0 24 24">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                  </svg>
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.tiktok.followersFormatted}
                </span>
              </div>
            )}

            {creator.platforms.youtube && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Youtube className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.youtube.followersFormatted}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-[2] hidden lg:block">
          <Button
            href={`/creators/${creator.id}`}
            size="md"
            variant="secondary"
            fullWidth
            className="!h-10 !text-sm"
            iconRight={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

const LIST_PLATFORMS = ['instagram', 'tiktok', 'youtube'] as const;

export function CreatorListRow({ creator }: CreatorCardProps) {
  const platforms = LIST_PLATFORMS.map((key) => ({
    key,
    label: key === 'instagram' ? 'Instagram' : key === 'tiktok' ? 'TikTok' : 'YouTube',
    value: creator.platforms[key]?.followersFormatted,
  }));

  return (
    <article className="rounded-2xl border border-[#E7E7E2] bg-white p-3 shadow-2xs transition-all hover:border-[#0A0A0A] hover:shadow-md sm:rounded-3xl sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <Link href={`/creators/${creator.id}`} className="relative shrink-0">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="h-14 w-14 rounded-xl border border-[#E7E7E2] object-cover sm:h-[72px] sm:w-[72px] sm:rounded-2xl"
          />
          {creator.verified && (
            <VerifiedBadge className="absolute -bottom-1 -right-1 h-5 w-5" />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <Link
                href={`/creators/${creator.id}`}
                className="block truncate text-base font-extrabold tracking-tight text-[#0A0A0A] transition-colors hover:text-[#FF2D78] sm:text-xl"
              >
                {creator.name}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#66665E]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#A3A39C]" />
                  <span>{creator.location}</span>
                </span>
                <span className="text-[#D2D2CA]">•</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#0A0A0A]">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{creator.rating}</span>
                  <span className="font-medium text-[#66665E]">({creator.reviewsCount})</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#66665E] sm:text-[11px]">
                <span className="sm:hidden">From</span>
                <span className="hidden sm:inline">Packages from</span>
              </div>
              <div className="mt-0.5 text-lg font-black leading-none text-[#0A0A0A] sm:mt-1 sm:text-2xl">
                €{creator.startingPriceEur.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {creator.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-[#E7E7E2] bg-[#FAFAF8] px-2.5 py-0.5 text-xs font-semibold text-[#555550]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-[#F4F4F0] pt-3 sm:mt-4 sm:flex-row sm:items-center sm:gap-4 sm:pt-4">
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
          {platforms.map((platform) => (
            <div key={platform.key} className="min-w-0">
              <div className="truncate text-base font-black leading-none text-[#0A0A0A]">
                {platform.value ?? '—'}
              </div>
              <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-wide text-[#A3A39C]">
                {platform.label}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/creators/${creator.id}`}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 text-sm font-bold text-white transition-colors hover:bg-zinc-800 sm:h-10 sm:px-5"
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
