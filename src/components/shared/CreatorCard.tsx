'use client';

import React from 'react';
import Link from 'next/link';
import { Creator } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSaveCreator } from '@/redux/slices/creatorSlice';
import { Bookmark, Check, ArrowRight, Instagram, Youtube } from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-[#E7E7E2] overflow-hidden hover:border-[#D2D2CA] hover:shadow-lg transition-all duration-300 flex flex-col group relative">
      {/* Creator Portrait Section */}
      <div className="relative h-64 sm:h-72 w-full bg-[#F4F4F0] overflow-hidden">
        <Link href={`/creators/${creator.id}`}>
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Verified Blue Badge */}
        {creator.verified && (
          <div
            className="absolute top-3 right-3 w-6 h-6 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white shadow-sm pointer-events-none"
            title="Verified Creator"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        {/* Bookmark Action */}
        <button
          onClick={handleSave}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
            isSaved
              ? 'bg-[#151515] text-white'
              : 'bg-white/85 text-[#52524B] hover:bg-white hover:text-[#151515]'
          }`}
          title={isSaved ? 'Saved to Shortlist' : 'Save Creator'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Card Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Creator Name & Subtitle */}
          <div className="flex items-center justify-between mb-1.5">
            <Link href={`/creators/${creator.id}`}>
              <h3 className="font-bold text-[#151515] text-base group-hover:text-[#2B7FFF] transition-colors">
                {creator.name}
              </h3>
            </Link>
            <span className="text-xs font-semibold text-[#73736A]">
              from <strong className="text-[#151515]">€{creator.startingPriceEur}</strong>
            </span>
          </div>

          {/* Category Tags Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.categories.slice(0, 3).map((cat, idx) => (
              <span
                key={cat}
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
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

          {/* Social Platform Follower Counts Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#151515] pt-2 border-t border-[#F0F0EB]">
            {creator.platforms.instagram && (
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                  <Instagram className="w-2.5 h-2.5" />
                </span>
                <span>{creator.platforms.instagram.followersFormatted}</span>
              </div>
            )}

            {creator.platforms.tiktok && (
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-[#151515] flex items-center justify-center text-white text-[9px] font-black">
                  ♪
                </span>
                <span>{creator.platforms.tiktok.followersFormatted}</span>
              </div>
            )}

            {creator.platforms.youtube && (
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-[#FF0000] flex items-center justify-center text-white text-[8px] font-bold">
                  <Youtube className="w-2.5 h-2.5" />
                </span>
                <span>{creator.platforms.youtube.followersFormatted}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Profile Action Link */}
        <Link
          href={`/creators/${creator.id}`}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 text-xs font-bold text-[#151515] hover:text-[#2B7FFF] transition-colors border-t border-[#F0F0EB] pt-3"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
