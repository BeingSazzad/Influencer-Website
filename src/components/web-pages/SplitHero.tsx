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
  ArrowRight,
  ChevronDown,
  Globe,
  Star,
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { CategoryIcon } from '@/components/shared/CategoryIcon';

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
      const matchLang = c.languages?.some((lang) => lang.toLowerCase().includes(q));
      const matchLoc = c.location.toLowerCase().includes(q) || c.country?.toLowerCase().includes(q) || c.city?.toLowerCase().includes(q);
      const matchesText = matchName || matchHandle || matchBio || matchCat || matchTag || matchLang || matchLoc;

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
    router.push(`/search?${params.toString()}`);
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
        <span className="w-5 h-5 rounded-full bg-[#FF2D78] flex items-center justify-center text-white shrink-0 shadow-2xs">
          <CategoryIcon name="ugc" size={13} className="text-white" />
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
        <span className="w-5 h-5 rounded-full bg-[#FF2D78] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
          <CategoryIcon name="ugc" size={13} className="text-white" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white mr-2 shrink-0 shadow-2xs">
        <Globe className="w-3 h-3 text-white" />
      </span>
    );
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 bg-[#FAFAF8]">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFF0F5]/60 to-[#FFE4EC]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#EEF7F2]/50 to-[#FAF6E8]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="grid w-full min-w-0 max-w-full grid-cols-1 items-center gap-8 overflow-hidden lg:grid-cols-12 lg:overflow-visible">
          {/* Left Column: Typography & Search */}
          <div className="lg:col-span-7 xl:col-span-7 min-w-0">
            {/* Headline pairing Red Hat Display with Playfair Display Italic Accent */}
            <h1 className="text-[32px] min-[420px]:text-4xl sm:text-5xl lg:text-[62px] font-black text-[#0A0A0A] tracking-tight leading-[1.1] sm:leading-[1.05] font-sans mb-3 sm:mb-5">
              The right creators{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A] block sm:inline">
                for your brand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-6 max-w-full text-[15px] font-medium leading-[24px] text-[#555550] sm:mb-8 sm:text-[18px] sm:leading-[28px] lg:max-w-lg">
              {t?.hero?.subtitle ||
                'Discover, collaborate and grow with verified creators across all platforms — in one place.'}
            </p>

            {/* Search Pill Bar - Responsive Mobile/Tablet Two-Tier & Desktop Unified Pill */}
            <div className="bg-white p-2 rounded-2xl lg:rounded-full border border-[#E7E7E2] shadow-lg shadow-black/[0.04] w-full max-w-2xl xl:max-w-3xl transition-all focus-within:border-[#0A0A0A] relative z-30 mb-6 lg:mb-8">
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
                {/* 1. Keyword / Name Text Search Input */}
                <div ref={searchInputRef} className="flex-1 flex items-center pl-3.5 pr-2 py-1.5 w-full min-w-0 lg:min-w-[160px] relative">
                  <Search className="w-4 h-4 text-[#66665E] mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder={t?.hero?.searchPlaceholder || 'Search creators...'}
                    value={searchQuery}
                    onFocus={() => {
                      if (searchQuery.trim()) setShowSuggestions(true);
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-[#0A0A0A] placeholder:text-[#A3A39C] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none font-sans"
                  />

                  {/* Submit Search Button (Mobile & Tablet Inline) */}
                  <button
                    type="submit"
                    className="lg:hidden btn-base btn-icon-sm btn-pink rounded-xl shrink-0 shadow-xs ml-1.5"
                    aria-label="Search Creators"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Live Suggestions Dropdown */}
                  {showSuggestions && searchQuery.trim().length > 0 && (
                    <div className="absolute top-full left-0 mt-3 w-[calc(100vw-3rem)] sm:w-[380px] lg:w-[420px] bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F4F4F0] px-1 text-xs font-bold uppercase tracking-wider text-[#66665E]">
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
                                  <div className="text-sm text-[#66665E] truncate">
                                    @{c.handle.replace('@', '')} • {c.categories[0]}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0 pl-2">
                                <div className="text-xs font-black text-[#0A0A0A]">From €{c.startingPriceEur}</div>
                                <div className="text-xs font-bold text-[#0A0A0A] flex items-center justify-end gap-0.5"><span className="text-amber-400">★</span> {c.rating}</div>
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
                        <div className="py-4 text-center text-sm text-[#66665E] space-y-2">
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

                {/* Filter Controls: 2-col on mobile/tablet, inline on desktop */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 lg:pt-0 border-t border-[#F4F4F0] lg:border-t-0 lg:flex lg:items-center w-full lg:w-auto">
                  {/* Divider Line (Desktop only) */}
                  <div className="hidden lg:block w-px h-6 bg-[#E7E7E2] shrink-0 mx-1" />

                  {/* 2. Platform Selector */}
                  <div ref={platformDropdownRef} className="relative shrink-0 lg:min-w-[130px] w-full lg:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPlatformOpen(!isPlatformOpen);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl lg:rounded-full bg-[#FAFAF8] lg:bg-transparent hover:bg-[#F4F4F0] transition-colors cursor-pointer text-left border lg:border-0 border-[#E7E7E2]"
                    >
                      <div className="flex items-center min-w-0 mr-1">
                        {renderPlatformIcon()}
                        <span className="text-xs sm:text-sm font-extrabold text-[#0A0A0A] font-sans truncate">
                          {platformOptions.find((p) => p.value === platform)?.label || 'All'}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#66665E] transition-transform duration-200 shrink-0 ${
                          isPlatformOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                        }`}
                      />
                    </button>

                    {/* Custom Floating Dropdown Menu with Clean Gap */}
                    {isPlatformOpen && (
                      <div className="absolute top-full left-0 mt-2 sm:mt-3 w-52 sm:w-56 bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
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
                                className={`w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#0A0A0A] text-white shadow-xs'
                                    : 'text-[#0A0A0A] hover:bg-[#F4F4F0]'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {opt.icon}
                                  <span>{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Divider Line (Desktop only) */}
                  <div className="hidden lg:block w-px h-6 bg-[#E7E7E2] shrink-0 mx-1" />

                  {/* 3. Categories Selector */}
                  <div ref={categoryDropdownRef} className="relative shrink-0 lg:min-w-[140px] w-full lg:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCategoryOpen(!isCategoryOpen);
                        setIsPlatformOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl lg:rounded-full bg-[#FAFAF8] lg:bg-transparent hover:bg-[#F4F4F0] transition-colors cursor-pointer text-left border lg:border-0 border-[#E7E7E2]"
                    >
                      <div className="flex items-center min-w-0 mr-1">
                        <span className="text-[#A3A39C] mr-1.5 text-xs font-black shrink-0 font-mono">::</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#0A0A0A] font-sans truncate">
                          {categoryOptions.find((c) => c.value === category)?.label || 'Categories'}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#66665E] transition-transform duration-200 shrink-0 ${
                          isCategoryOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                        }`}
                      />
                    </button>

                    {/* Custom Floating Dropdown Menu with Clean Gap */}
                    {isCategoryOpen && (
                      <div className="absolute top-full right-0 lg:left-auto lg:right-0 mt-2 sm:mt-3 w-56 sm:w-64 bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 max-h-72 overflow-y-auto">
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
                                className={`w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#0A0A0A] text-white shadow-xs'
                                    : 'text-[#0A0A0A] hover:bg-[#F4F4F0]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Submit Search Button (Desktop only) */}
                  <div className="hidden lg:block">
                    <button
                      type="submit"
                      className="btn-base btn-icon-md btn-pink w-10 h-10 rounded-full shrink-0 shadow-sm ml-1"
                      aria-label="Search Creators"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

              </form>
            </div>

            {/* Social Trust Metrics with Avatar Stack */}
            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-8 w-8 sm:h-11 sm:w-11 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Creator"
                />
                <img
                  className="inline-block h-8 w-8 sm:h-11 sm:w-11 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Creator"
                />
                <img
                  className="inline-block h-8 w-8 sm:h-11 sm:w-11 rounded-full ring-2 ring-white object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                  alt="Creator"
                />
                <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-full bg-[#0A0A0A] text-white text-[11px] sm:text-[13px] font-black flex items-center justify-center ring-2 ring-white shadow-xs font-sans">
                  +12k
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-base font-bold text-[#0A0A0A] font-sans">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[#0A0A0A] font-black ml-0.5">4.9/5</span>
                  <span className="text-[#66665E] font-medium text-[11px] sm:text-sm">· 3,400+ reviews</span>
                </div>
                <p className="text-[11px] sm:text-sm font-medium text-[#66665E] font-sans mt-0.5">
                  Trusted by brands across 45+ countries worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Floating Creator Stack Cards on Desktop, Horizontal Spotlight Reel on Mobile */}
          <div className="lg:col-span-5 xl:col-span-5 relative min-w-0">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 max-w-sm mx-auto bg-gradient-to-tr from-[#FF2D78]/15 to-[#F1EEF9]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Mobile Creator Spotlight Reel (Compact, Zero Overflow, ~210px height) */}
            <div className="lg:hidden mt-2">
              <div className="mb-2 flex min-w-0 items-center justify-between gap-3 px-1">
                <span className="min-w-0 truncate text-[11px] font-black uppercase tracking-wider text-[#66665E]">
                  Verified Creator Spotlight
                </span>
                <span className="shrink-0 text-[11px] font-bold text-[#FF2D78]">Swipe to explore →</span>
              </div>
              <div className="flex w-full min-w-0 gap-3 overflow-x-auto pb-2 snap-x no-scrollbar">
                {/* Mobile Spotlight Card 1: Sophie Kim */}
                <Link
                  href="/creators/creator-01"
                  className="w-[185px] shrink-0 snap-start bg-white rounded-2xl p-2.5 border border-[#E7E7E2] shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-32 rounded-xl overflow-hidden bg-[#F4F4F0] mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                      alt="Sophie Kim"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black">
                      €500
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                      <Instagram className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="px-0.5">
                    <div className="font-extrabold text-xs text-[#0A0A0A] flex items-center gap-1">
                      <span className="truncate">Sophie Kim</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-[11px] text-[#66665E]">1.2M followers • Beauty</div>
                  </div>
                </Link>

                {/* Mobile Spotlight Card 2: Liam Carter */}
                <Link
                  href="/creators/creator-02"
                  className="w-[185px] shrink-0 snap-start bg-white rounded-2xl p-2.5 border border-[#E7E7E2] shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-32 rounded-xl overflow-hidden bg-[#F4F4F0] mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
                      alt="Liam Carter"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#FF2D78] text-white text-[10px] font-black">
                      Top Rated
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shadow-xs">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                      </svg>
                    </div>
                  </div>
                  <div className="px-0.5">
                    <div className="font-extrabold text-xs text-[#0A0A0A] flex items-center gap-1">
                      <span className="truncate">Liam Carter</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-[11px] text-[#66665E]">980K followers • Adventure</div>
                  </div>
                </Link>

                {/* Mobile Spotlight Card 3: Emma Rossi */}
                <Link
                  href="/creators/creator-05"
                  className="w-[185px] shrink-0 snap-start bg-white rounded-2xl p-2.5 border border-[#E7E7E2] shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-32 rounded-xl overflow-hidden bg-[#F4F4F0] mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
                      alt="Emma Rossi"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black">
                      €420
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xs">
                      <Youtube className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="px-0.5">
                    <div className="font-extrabold text-xs text-[#0A0A0A] flex items-center gap-1">
                      <span className="truncate">Emma Rossi</span>
                      <VerifiedBadge size="sm" />
                    </div>
                    <div className="text-[11px] text-[#66665E]">850K followers • Lifestyle</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Stacked Cards Group with Depth & Rotation (Hidden on Mobile) */}
            <div className="hidden lg:flex relative h-[440px] items-center justify-center">
              <div className="relative w-full max-w-[480px] h-[400px]">
                {/* Card 1: Sophie Kim (Leftmost Tilted) */}
                <Link
                  href="/creators/creator-01"
                  title="View Sophie Kim's Creator Profile"
                  className="absolute left-0 top-10 w-[210px] bg-white rounded-3xl p-3.5 border border-[#E7E7E2] shadow-xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 hover:z-30 cursor-pointer group block"
                >
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"
                      alt="Sophie Kim"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-black">
                      €500
                    </div>
                    {/* Hover Overlay Pill */}
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="bg-white text-[#0A0A0A] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Profile <ArrowRight className="w-3.5 h-3.5 text-[#FF2D78]" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                        <span>Sophie Kim</span>
                        <VerifiedBadge size="sm" />
                      </div>
                      <div className="text-sm text-[#66665E] font-sans font-medium">1.2M followers</div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>

                {/* Card 2: Liam Carter (Center Prominent) */}
                <Link
                  href="/creators/creator-02"
                  title="View Liam Carter's Creator Profile"
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-[230px] bg-white rounded-3xl p-4 border border-[#E7E7E2] shadow-2xl hover:scale-105 transition-all duration-300 z-20 hover:z-30 cursor-pointer group block"
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                      alt="Liam Carter"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FF2D78] text-white text-xs font-black shadow-xs">
                      Top Rated
                    </div>
                    {/* Hover Overlay Pill */}
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="bg-white text-[#0A0A0A] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Profile <ArrowRight className="w-3.5 h-3.5 text-[#FF2D78]" />
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white">
                      <div className="text-xs font-black">Cinematic 4K Adventure</div>
                      <div className="text-xs text-[#D2D2CA]">From €550</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                        <span>Liam Carter</span>
                        <VerifiedBadge size="sm" />
                      </div>
                      <div className="text-sm text-[#66665E] font-sans font-medium">980K followers</div>
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
                  title="View Emma Rossi's Creator Profile"
                  className="absolute right-0 top-14 w-[200px] bg-white rounded-3xl p-3.5 border border-[#E7E7E2] shadow-xl transform rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-300 z-5 hover:z-30 cursor-pointer group block"
                >
                  <div className="relative h-50 rounded-2xl overflow-hidden bg-[#F4F4F0] mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600"
                      alt="Emma Rossi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-black">
                      €420
                    </div>
                    {/* Hover Overlay Pill */}
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="bg-white text-[#0A0A0A] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Profile <ArrowRight className="w-3.5 h-3.5 text-[#FF2D78]" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <div className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                        <span>Emma Rossi</span>
                        <VerifiedBadge size="sm" />
                      </div>
                      <div className="text-sm text-[#66665E] font-sans font-medium">850K followers</div>
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
      </div>
    </section>
  );
}
