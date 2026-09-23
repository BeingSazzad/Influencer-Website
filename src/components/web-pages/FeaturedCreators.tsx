'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { CreatorCardSkeleton } from '@/components/shared/Skeleton';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedCreators() {
  const { creators } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  const featured = creators.slice(0, 4);

  return (
    <section className="py-20 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EEF9] text-[#6444A6] text-xs font-bold uppercase tracking-wider mb-4 font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Marketplace Talent
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
              Featured{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A]">
                Creators
              </span>
            </h2>
            <p className="text-[18px] text-[#73736A] mt-4 sm:mt-5 font-sans font-medium leading-[28px]">
              {t?.featured?.subtitle || 'Discover talented creators across different niches.'}
            </p>
          </div>

          <Link
            href="/creators"
            className="inline-flex items-center gap-2 text-sm sm:text-2xl font-extrabold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors group self-start sm:self-auto font-sans"
          >
            <span>{t?.featured?.viewAll || 'View all creators'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid per row across full container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.length > 0 ? (
            featured.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <CreatorCardSkeleton key={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
