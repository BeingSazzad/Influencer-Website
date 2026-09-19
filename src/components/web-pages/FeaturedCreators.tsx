'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedCreators() {
  const { creators } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  // Take the first 4 featured creators (Sophie, Liam, Maya, Noah)
  const featured = creators.slice(0, 4);

  return (
    <section className="py-16 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
              {t?.featured?.title || 'Featured Creators'}
            </h2>
            <p className="text-sm text-[#73736A] mt-1">
              {t?.featured?.subtitle || 'Discover talented creators across different niches.'}
            </p>
          </div>

          <Link
            href="/creators"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#151515] hover:text-[#2B7FFF] transition-colors group self-start sm:self-auto"
          >
            <span>{t?.featured?.viewAll || 'View all creators'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  );
}
