'use client';

import React from 'react';
import Link from 'next/link';
import { Creator } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSaveCreator } from '@/redux/slices/creatorSlice';
import { Bookmark, ArrowRight, Instagram, Youtube, Star } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

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
    <div className="bg-white rounded-3xl border border-[#E7E7E2] overflow-hidden hover:border-[#0A0A0A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative font-sans">
      {/* Creator Portrait Section */}
      <div className="relative w-full aspect-[1/1] bg-[#F4F4F0] overflow-hidden">
        <Link href={`/creators/${creator.id}`} className="block w-full h-full">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Rating pill top left */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[12px] font-bold flex items-center gap-1 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{creator.rating}</span>
        </div>

        {/* Top Right Save/Bookmark Action Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleSave}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-[#0A0A0A] text-white shadow-sm scale-105'
                : 'bg-white/85 text-[#52524B] hover:bg-white hover:text-[#0A0A0A]'
            }`}
            title={isSaved ? 'Saved to Shortlist' : 'Save Creator'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Info Body with refined balanced padding */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Creator Name & Price Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <Link href={`/creators/${creator.id}`} className="inline-flex items-center gap-1.5 max-w-full group/link">
                <h3 className="font-bold text-[#0A0A0A] text-base group-hover/link:text-[#FF2D78] transition-colors font-sans truncate tracking-tight">
                  {creator.name}
                </h3>
                {creator.verified && <VerifiedBadge size="sm" />}
              </Link>
              <span className="text-sm font-medium text-[#73736A] block mt-0.5">
                {creator.location}
              </span>
            </div>

            <div className="text-right shrink-0">
              <span className="text-sm font-bold text-[#73736A] uppercase tracking-wider block font-sans">
                FROM
              </span>
              <strong className="text-[#0A0A0A] font-sans text-2xl font-extrabold tracking-tight">
                €{creator.startingPriceEur}
              </strong>
            </div>
          </div>

          {/* Category Tags Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {creator.categories.slice(0, 3).map((cat, idx) => (
              <span
                key={cat}
                className={`text-sm font-bold px-2.5 py-0.5 rounded-full font-sans ${
                  idx === 0
                    ? 'bg-[#F1EEF9] text-[#6444A6]'
                    : idx === 1
                    ? 'bg-[#EEF7F2] text-[#23744D]'
                    : 'bg-[#FAF6E8] text-[#8C6819]'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Social Platform Follower Counts Bar with crisp icons & proper sizes */}
          <div className="flex items-center justify-between text-sm font-bold text-[#0A0A0A] pt-3 border-t border-[#F0F0EB] font-sans">
            {creator.platforms.instagram && (
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Instagram className="w-3 h-3" />
                </span>
                <span className="text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.instagram.followersFormatted}
                </span>
              </div>
            )}

            {creator.platforms.tiktok && (
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#000000] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                  </svg>
                </span>
                <span className="text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.tiktok.followersFormatted}
                </span>
              </div>
            )}

            {creator.platforms.youtube && (
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Youtube className="w-3 h-3" />
                </span>
                <span className="text-xs font-extrabold text-[#0A0A0A]">
                  {creator.platforms.youtube.followersFormatted}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* View Profile Action Link */}
        <Link
          href={`/creators/${creator.id}`}
          className="inline-flex items-center justify-center gap-2 w-full h-10 text-xs font-extrabold text-[#0A0A0A] hover:text-white bg-[#FAFAF8] hover:bg-[#0A0A0A] rounded-full transition-all border border-[#E7E7E2] hover:border-[#0A0A0A] font-sans group/btn shadow-2xs cursor-pointer"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
