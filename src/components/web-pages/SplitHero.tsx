'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { PlatformType } from '@/types';
import {
  Search,
  Instagram,
  Youtube,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  ChevronDown,
  Globe,
  User,
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export function SplitHero() {
  const router = useRouter();
  const { t } = useAppSelector((state) => state.lang);
  const { creators } = useAppSelector((state) => state.creator);
  const [platform, setPlatform] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const platformDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  // Live real-time suggestions computed from the creators catalog
  const liveSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return creators.filter((c) => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchHandle = c.handle.toLowerCase().includes(q);
      const matchBio = c.bio.toLowerCase().includes(q);
      const matchCat = c.categories.some((cat) => cat.toLowerCase().includes(q));
      const matchTag = c.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchesText = matchName || matchHandle || matchBio || matchCat || matchTag;

      const matchesPlatform =
        platform === 'all' ||
        (platform === 'ugc'
          ? !!c.platforms.ugc || c.packages.some((p) => p.platform === 'ugc')
          : !!c.platforms[platform as PlatformType]);

      const matchesCategory =
        category === 'all' ||
        c.categories.some(
          (cat) =>
            cat.toLowerCase().includes(category.toLowerCase()) ||
            category.toLowerCase().includes(cat.toLowerCase())
        );

      return matchesText && matchesPlatform && matchesCategory;
    }).slice(0, 4);
  }, [creators, searchQuery, platform, category]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(event.target as Node)) {
        setIsPlatformOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (platform !== 'all') params.set('platform', platform);
    if (category !== 'all') params.set('category', category);
    router.push(`/creators?${params.toString()}`);
  };

  const platformOptions = [
    {
      value: 'all',
      label: 'All Platforms',
      icon: (
        <span className="w-5 h-5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Globe className="w-3 h-3 text-white" />
        </span>
      ),
    },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: (
        <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Instagram className="w-3 h-3" />
        </span>
      ),
    },
    {
      value: 'tiktok',
      label: 'TikTok',
      icon: (
        <span className="w-5 h-5 rounded-full bg-[#000000] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
          </svg>
        </span>
      ),
    },
    {
      value: 'youtube',
      label: 'YouTube',
      icon: (
        <span className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Youtube className="w-3 h-3" />
        </span>
      ),
    },
    {
      value: 'ugc',
      label: 'UGC Creative',
      icon: (
        <span className="w-5 h-5 rounded-full bg-[#23744D] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Sparkles className="w-3 h-3 text-white" />
        </span>
      ),
    },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Beauty', label: 'Beauty & Skincare' },
    { value: 'Fashion', label: 'Fashion & Style' },
    { value: 'Fitness', label: 'Fitness & Health' },
    { value: 'Travel', label: 'Travel & Adventure' },
    { value: 'Food', label: 'Food & Cuisine' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Tech', label: 'Tech & Gaming' },
  ];

  const renderPlatformIcon = () => {
    if (platform === 'instagram') {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
          <Instagram className="w-3 h-3" />
        </span>
      );
    }
    if (platform === 'tiktok') {
      return (
        <span className="w-5 h-5 rounded-full bg-[#000000] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
          <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
          </svg>
        </span>
      );
    }
    if (platform === 'youtube') {
      return (
        <span className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
          <Youtube className="w-3 h-3" />
        </span>
      );
    }
    if (platform === 'ugc') {
      return (
        <span className="w-5 h-5 rounded-full bg-[#23744D] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
          <Sparkles className="w-3 h-3 text-white" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
        <Globe className="w-3 h-3 text-white" />
      </span>
    );
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
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFF0F5]/60 to-[#FFE4EC]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#EEF7F2]/50 to-[#FAF6E8]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Search */}
          <div className="lg:col-span-6">
            {/* Headline pairing Red Hat Display with Playfair Display Italic Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-[#0A0A0A] tracking-tight leading-[1.05] font-sans mb-4 sm:mb-5">
              The right creators{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A] block sm:inline">
                for your brand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[18px] text-[#555550] leading-[28px] max-w-lg font-sans font-medium mb-8">
              {t?.hero?.subtitle ||
                'Discover, collaborate and grow with verified creators across all platforms — in one place.'}
            </p>

            {/* Search Pill Bar with Text Input and Custom Floating Popover Dropdowns */}
            <div className="bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-[#E7E7E2] shadow-lg shadow-black/[0.04] w-full max-w-xl xl:max-w-2xl transition-all focus-within:border-[#0A0A0A] relative z-30 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
                {/* 1. Keyword / Name Text Search Input */}
                <div ref={searchInputRef} className="flex-1 flex items-center pl-3.5 pr-2 py-1.5 w-full min-w-[160px] relative">
                  <Search className="w-4 h-4 text-[#73736A] mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder={t?.hero?.searchPlaceholder || 'Search creators, niches, keywords...'}
                    value={searchQuery}
                    onFocus={() => {
                      if (searchQuery.trim()) setShowSuggestions(true);
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-[#0A0A0A] placeholder:text-[#A3A39C] outline-none font-sans"
                  />

                  {/* Live Suggestions Dropdown */}
                  {showSuggestions && searchQuery.trim().length > 0 && (
                    <div className="absolute top-full left-0 mt-3 w-[calc(100vw-3rem)] sm:w-[380px] bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F4F4F0] px-1 text-[11px] font-bold uppercase tracking-wider text-[#73736A]">
                        <span>Suggested Creators</span>
                        <span className="text-[#FF2D78]">Press Enter to search</span>
                      </div>

                      {liveSuggestions.length > 0 ? (
                        <div className="space-y-1 pt-1.5">
                          {liveSuggestions.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setShowSuggestions(false);
                                router.push(`/creators/${c.id}`);
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAFAF8] transition-colors group cursor-pointer text-left"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="w-9 h-9 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-black text-[#0A0A0A] flex items-center gap-1 group-hover:text-[#FF2D78] transition-colors">
                                    <span className="truncate">{c.name}</span>
                                    {c.verified && <VerifiedBadge size="sm" />}
                                  </div>
                                  <div className="text-[11px] text-[#73736A] truncate">
                                    @{c.handle.replace('@', '')} • {c.categories[0]}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0 pl-2">
                                <div className="text-xs font-black text-[#0A0A0A]">From €{c.startingPriceEur}</div>
                                <div className="text-[10px] text-[#23744D] font-bold">★ {c.rating}</div>
                              </div>
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => handleSearch()}
                            className="w-full mt-2 pt-2 border-t border-[#F4F4F0] text-center text-xs font-extrabold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center justify-center gap-1 cursor-pointer py-1"
                          >
                            <span>Explore all results for &ldquo;{searchQuery}&rdquo;</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-4 text-center text-xs text-[#73736A] space-y-2">
                          <p>No creators directly matching &ldquo;{searchQuery}&rdquo;</p>
                          <button
                            type="button"
                            onClick={() => handleSearch()}
                            className="text-[#FF2D78] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Search full marketplace catalog</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider Line */}
                <div className="hidden sm:block w-px h-6 bg-[#E7E7E2] shrink-0 mx-1" />

                {/* 2. Platform Selector */}
                <div ref={platformDropdownRef} className="relative shrink-0 min-w-[130px] w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlatformOpen(!isPlatformOpen);
                      setIsCategoryOpen(false);
                    }}
                    className="w-full flex items-center justify-between pl-3 pr-2 py-2 sm:py-1.5 rounded-full hover:bg-[#F4F4F0] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center min-w-0 mr-1.5">
                      {renderPlatformIcon()}
                      <span className="text-sm font-extrabold text-[#0A0A0A] font-sans truncate">
                        {platformOptions.find((p) => p.value === platform)?.label || 'All Platforms'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#73736A] transition-transform duration-200 shrink-0 ${
                        isPlatformOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                      }`}
                    />
                  </button>

                  {/* Custom Floating Dropdown Menu with Clean Gap */}
                  {isPlatformOpen && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                      <div className="space-y-1">
                        {platformOptions.map((opt) => {
                          const isSelected = platform === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setPlatform(opt.value);
                                setIsPlatformOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0A0A0A] text-white shadow-xs'
                                  : 'text-[#0A0A0A] hover:bg-[#F4F4F0]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {opt.icon}
                                <span>{opt.label}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider Line */}
                <div className="hidden sm:block w-px h-6 bg-[#E7E7E2] shrink-0 mx-1" />

                {/* 3. Categories Selector */}
                <div ref={categoryDropdownRef} className="relative shrink-0 min-w-[140px] w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsPlatformOpen(false);
                    }}
                    className="w-full flex items-center justify-between pl-3 sm:pl-2 pr-2 py-2 sm:py-1.5 rounded-full hover:bg-[#F4F4F0] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center min-w-0 mr-1.5">
                      <span className="text-[#A3A39C] mr-2 text-sm font-black shrink-0 font-mono tracking-tighter">::</span>
                      <span className="text-sm font-extrabold text-[#0A0A0A] font-sans truncate">
                        {categoryOptions.find((c) => c.value === category)?.label || 'All Categories'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#73736A] transition-transform duration-200 shrink-0 ${
                        isCategoryOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                      }`}
                    />
                  </button>

                  {/* Custom Floating Dropdown Menu with Clean Gap */}
                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-3 w-64 bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 max-h-72 overflow-y-auto">
                      <div className="space-y-1">
                        {categoryOptions.map((opt) => {
                          const isSelected = category === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setCategory(opt.value);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0A0A0A] text-white shadow-xs'
                                  : 'text-[#0A0A0A] hover:bg-[#F4F4F0]'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Submit Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-11 sm:h-11 h-10 bg-[#FF2D78] hover:bg-[#E01E69] text-white rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95 sm:ml-1"
                  aria-label="Search Creators"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* Social Trust Metrics with Avatar Stack */}
            <div className="flex items-center gap-4 pt-1">
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
                <div className="h-10 w-10 rounded-full bg-[#0A0A0A] text-white text-xs font-black flex items-center justify-center ring-2 ring-white shadow-xs font-sans">
                  +12k
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0A0A0A] font-sans">
                  <div className="flex text-amber-400">★★★★★</div>
                  <span className="text-[#0A0A0A] font-black">4.9/5</span>
                  <span className="text-[#73736A] font-medium">• 3,400+ reviews</span>
                </div>
                <p className="text-sm font-medium text-[#555550] font-sans mt-0.5">
                  Trusted by brands across 45+ countries worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Floating Creator Stack Cards */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] flex items-center justify-center">
            {/* Ambient Back Glow */}
            <div className="absolute w-[380px] h-[380px] bg-gradient-to-tr from-[#FF2D78]/15 to-[#F1EEF9]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Stacked Cards Group with Depth & Rotation */}
            <div className="relative w-full max-w-[480px] h-[400px]">
              {/* Card 1: Sophie Kim (Leftmost Tilted) */}
              <Link
                href="/creators/creator-01"
                className="absolute left-0 top-10 w-[190px] sm:w-[210px] bg-white rounded-3xl p-3.5 border border-[#E7E7E2] shadow-xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 group"
              >
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
                    alt="Sophie Kim"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-black">
                    €500
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                      <span>Sophie Kim</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-sm text-[#73736A] font-sans font-medium">1.2M followers</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Marcus Chen (Center Prominent) */}
              <Link
                href="/creators/creator-03"
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] sm:w-[230px] bg-white rounded-3xl p-4 border border-[#E7E7E2] shadow-2xl hover:scale-105 transition-all duration-300 z-20 group"
              >
                <div className="relative h-54 sm:h-64 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                    alt="Marcus Chen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FF2D78] text-white text-xs font-black shadow-xs">
                    Top Rated
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white">
                    <div className="text-xs font-black">Tech & Hardware UGC</div>
                    <div className="text-xs text-[#D2D2CA]">48h turnaround</div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                      <span>Marcus Chen</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-sm text-[#73736A] font-sans font-medium">950K followers</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#000000] flex items-center justify-center text-white shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card 3: Emma Rossi (Rightmost Tilted) */}
              <Link
                href="/creators/creator-05"
                className="absolute right-0 top-14 w-[180px] sm:w-[200px] bg-white rounded-3xl p-3.5 border border-[#E7E7E2] shadow-xl transform rotate-12 hover:rotate-6 hover:scale-105 transition-all duration-300 z-5 group hidden sm:block"
              >
                <div className="relative h-44 sm:h-50 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600"
                    alt="Emma Rossi"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                      <span>Emma Rossi</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-sm text-[#73736A] font-sans font-medium">850K followers</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xs">
                    <Youtube className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
