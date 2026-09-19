'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Search, Instagram, Youtube, Check, Sparkles, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export function SplitHero() {
  const router = useRouter();
  const { t } = useAppSelector((state) => state.lang);
  const [platform, setPlatform] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (platform !== 'all') params.set('platform', platform);
    if (category !== 'all') params.set('category', category);
    router.push(`/creators?${params.toString()}`);
  };

  const tickerKeywords = [
    '✨ Beauty & Skincare',
    '👗 High Fashion & Luxury',
    '✈️ Travel & Cinematic Vlog',
    '⚡ Fitness & Wellness',
    '🍽️ Food & Culinary UGC',
    '🎮 Tech & Gaming Unboxings',
    '🎨 Digital Art & Visuals',
    '💼 Founder & SaaS UGC',
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#FAFAF8]">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#F1EEF9]/60 to-[#EBF3FE]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#EEF7F2]/50 to-[#FAF6E8]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Search */}
          <div className="lg:col-span-6 space-y-7">
            {/* Tagline pill with pulse dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E7E2] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2B7FFF] animate-ping" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#73736A] font-sans">
                {t?.hero?.tagline || 'REAL CREATORS. REAL IMPACT.'}
              </span>
            </div>

            {/* Headline pairing Red Hat Display with Playfair Display Italic Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] font-sans">
              The right creators{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A] block sm:inline">
                for your brand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#555550] leading-relaxed max-w-lg font-sans font-medium">
              {t?.hero?.subtitle ||
                'Discover, collaborate and grow with verified creators across all platforms — in one place.'}
            </p>

            {/* Search Pill Bar matching client reference */}
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-[#E7E7E2] shadow-lg shadow-black/[0.03] max-w-xl transition-all focus-within:border-[#0A0A0A]">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
                {/* Platform Selector */}
                <div className="w-full sm:w-44 flex items-center px-3 border-b sm:border-b-0 sm:border-r border-[#E7E7E2] py-1.5 sm:py-0">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mr-2 shrink-0">
                    <Instagram className="w-3 h-3" />
                  </span>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full text-xs font-bold text-[#0A0A0A] bg-transparent outline-none cursor-pointer font-sans"
                  >
                    <option value="all">All Platforms</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="ugc">UGC Creative</option>
                  </select>
                </div>

                {/* Categories Selector */}
                <div className="w-full sm:w-48 flex items-center px-3 py-1.5 sm:py-0">
                  <span className="text-[#73736A] mr-2 text-xs font-bold shrink-0">::</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs font-bold text-[#0A0A0A] bg-transparent outline-none cursor-pointer font-sans"
                  >
                    <option value="all">All Categories</option>
                    <option value="Beauty">Beauty & Skincare</option>
                    <option value="Fashion">Fashion & Style</option>
                    <option value="Fitness">Fitness & Health</option>
                    <option value="Travel">Travel & Adventure</option>
                    <option value="Food">Food & Cuisine</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Tech">Tech & Gaming</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-11 h-11 bg-[#0A0A0A] hover:bg-[#2B7FFF] text-white rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm hover:scale-105"
                  aria-label="Search Creators"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Trust Metrics with Avatar Stack */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Creator"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Creator"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                  alt="Creator"
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A] text-[10px] font-black text-white ring-2 ring-white shadow-xs">
                  +10K
                </div>
              </div>
              <div>
                <div className="text-xs font-black text-[#0A0A0A] font-sans">
                  10&apos;000&apos;000+ Followers
                </div>
                <div className="text-[11px] text-[#73736A] font-sans">
                  Across 850+ vetted European creators
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Overlapping Tilted Cards matching reference */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            {/* Handwritten style note top right with Playfair Display Italic */}
            <div className="absolute -top-6 right-6 sm:right-10 z-30 hidden sm:block">
              <div className="font-editorial text-2xl text-[#0A0A0A] font-bold transform rotate-3 flex items-center gap-2 drop-shadow-2xs">
                <span>Real people. Real results.</span>
                <svg
                  className="w-8 h-8 text-[#0A0A0A] transform rotate-45 -scale-y-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>

            {/* Overlapping Cards Container */}
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[460px]">
              {/* Card 1: Sophie Kim (Front Tilted Left with subtle float) */}
              <Link
                href="/creators/creator-01"
                className="absolute left-0 top-6 w-[210px] sm:w-[230px] bg-white rounded-3xl p-3 border border-[#E7E7E2] shadow-2xl transform -rotate-6 hover:-rotate-1 hover:scale-105 transition-all duration-300 z-20 group animate-float"
              >
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
                    alt="Sophie Kim"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                    Beauty & Lifestyle
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-xs text-[#0A0A0A] font-sans">
                      Sophie Kim
                    </div>
                    <div className="text-[10px] text-[#73736A] font-sans">1.2M followers</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Liam Carter (Center Tilted Slight Right) */}
              <Link
                href="/creators/creator-02"
                className="absolute left-32 sm:left-40 top-0 w-[210px] sm:w-[230px] bg-white rounded-3xl p-3 border border-[#E7E7E2] shadow-2xl transform rotate-4 hover:rotate-1 hover:scale-105 transition-all duration-300 z-10 group animate-float-slow"
              >
                <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                    alt="Liam Carter"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                    Travel & Outdoors
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-xs text-[#0A0A0A] font-sans">Liam Carter</div>
                    <div className="text-[10px] text-[#73736A] font-sans">980K followers</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-black shadow-xs">
                    ♪
                  </div>
                </div>
              </Link>

              {/* Card 3: Emma Rossi (Rightmost Tilted) */}
              <Link
                href="/creators/creator-05"
                className="absolute right-0 top-14 w-[180px] sm:w-[200px] bg-white rounded-3xl p-3 border border-[#E7E7E2] shadow-xl transform rotate-12 hover:rotate-6 hover:scale-105 transition-all duration-300 z-5 group hidden sm:block"
              >
                <div className="relative h-44 sm:h-50 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600"
                    alt="Emma Rossi"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-xs text-[#0A0A0A] font-sans">Emma Rossi</div>
                    <div className="text-[10px] text-[#73736A] font-sans">850K followers</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xs">
                    <Youtube className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Niche & Keyword Ticker Bar */}
        <div className="mt-14 pt-8 border-t border-[#E7E7E2]/70 overflow-hidden relative">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
            {[...tickerKeywords, ...tickerKeywords].map((kw, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] font-sans inline-flex items-center gap-1.5 shadow-2xs hover:border-[#0A0A0A] transition-colors"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
