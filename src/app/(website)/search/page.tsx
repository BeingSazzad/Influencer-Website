'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { CreatorGridSkeleton } from '@/components/shared/Skeleton';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { Creator, PlatformType } from '@/types';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  Instagram,
  Youtube,
  Users,
  ArrowUpDown,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Globe,
  Film,
  Check,
  X,
  LayoutGrid,
  List,
  Star,
  ArrowRight,
  TrendingUp,
  Tag,
  Share2,
} from 'lucide-react';
import { Pagination } from 'antd';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { creators } = useAppSelector((state) => state.creator);

  // Search input state
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState(initialPlatform);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'followers' | 'price_asc' | 'price_desc'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

  // Dropdown states for the in-page search bar
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const platformDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || '';
    const plat = searchParams.get('platform') || 'all';
    const cat = searchParams.get('category') || 'all';

    setSearchQuery(q);
    setPlatform(plat);
    setCategory(cat);
    setCurrentPage(1);
  }, [searchParams]);

  // Click outside listener for dropdowns
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
          <Film className="w-3 h-3 text-white" />
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
    { value: 'Lifestyle', label: 'Lifestyle & UGC' },
    { value: 'Tech', label: 'Tech & Gaming' },
  ];

  // Quick filter pills
  const quickPills = [
    { label: 'All Results', category: 'all', platform: 'all' },
    { label: 'Beauty & Skincare', category: 'Beauty', platform: 'all' },
    { label: 'Fashion & Luxury', category: 'Fashion', platform: 'all' },
    { label: 'Tech & Audio', category: 'Tech', platform: 'all' },
    { label: 'Fitness & Health', category: 'Fitness', platform: 'all' },
    { label: 'Travel & Vlogs', category: 'Travel', platform: 'all' },
    { label: 'Instagram Verified', category: 'all', platform: 'instagram' },
    { label: 'TikTok Native', category: 'all', platform: 'tiktok' },
    { label: 'UGC Video Ads', category: 'all', platform: 'ugc' },
  ];

  // Execute in-page search
  const handleExecuteSearch = (newQ?: string, newPlat?: string, newCat?: string) => {
    setShowSuggestions(false);
    setIsPlatformOpen(false);
    setIsCategoryOpen(false);

    const qVal = newQ !== undefined ? newQ : searchQuery;
    const platVal = newPlat !== undefined ? newPlat : platform;
    const catVal = newCat !== undefined ? newCat : category;

    const params = new URLSearchParams();
    if (qVal.trim()) params.set('q', qVal.trim());
    if (platVal !== 'all') params.set('platform', platVal);
    if (catVal !== 'all') params.set('category', catVal);

    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setPlatform('all');
    setCategory('all');
    setSortBy('relevance');
    router.push('/search');
  };

  // Live suggestions for typing
  const liveSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return creators
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.categories.some((cat) => cat.toLowerCase().includes(q)) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 4);
  }, [creators, searchQuery]);

  // Main filtering logic
  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) => {
        // Category filter
        if (category !== 'all') {
          const hasCat = c.categories.some(
            (cat) =>
              cat.toLowerCase().includes(category.toLowerCase()) ||
              category.toLowerCase().includes(cat.toLowerCase())
          );
          if (!hasCat) return false;
        }

        // Platform filter
        if (platform !== 'all') {
          if (platform === 'ugc') {
            const hasUgc =
              !!c.platforms.ugc ||
              c.packages.some((p) => p.platform === 'ugc') ||
              c.categories.includes('Lifestyle') ||
              c.bio.toLowerCase().includes('ugc');
            if (!hasUgc) return false;
          } else if (!c.platforms[platform as PlatformType]) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = c.name.toLowerCase().includes(query);
          const matchHandle = c.handle.toLowerCase().includes(query);
          const matchBio = c.bio.toLowerCase().includes(query);
          const matchCat = c.categories.some((cat) => cat.toLowerCase().includes(query));
          const matchTag = c.tags?.some((t) => t.toLowerCase().includes(query));
          const matchLocation = c.location.toLowerCase().includes(query);
          if (!matchName && !matchHandle && !matchBio && !matchCat && !matchTag && !matchLocation) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.startingPriceEur - b.startingPriceEur;
        if (sortBy === 'price_desc') return b.startingPriceEur - a.startingPriceEur;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'followers') {
          const aFollowers = (a.platforms.instagram?.followers || 0) + (a.platforms.tiktok?.followers || 0);
          const bFollowers = (b.platforms.instagram?.followers || 0) + (b.platforms.tiktok?.followers || 0);
          return bFollowers - aFollowers;
        }
        return 0; // relevance
      });
  }, [creators, searchQuery, category, platform, sortBy]);

  // Paginated Creators
  const paginatedCreators = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCreators.slice(startIndex, startIndex + pageSize);
  }, [filteredCreators, currentPage, pageSize]);

  // Dynamic Page Title
  const pageTitle = useMemo(() => {
    if (searchQuery.trim()) {
      return `Search results for "${searchQuery.trim()}"`;
    }
    if (category !== 'all' && platform !== 'all') {
      return `${category} Creators on ${platform.toUpperCase()}`;
    }
    if (category !== 'all') {
      return `${category} Creators`;
    }
    if (platform !== 'all') {
      return `Verified ${platform.toUpperCase()} Creators`;
    }
    return 'Search All Creators';
  }, [searchQuery, category, platform]);

  const hasActiveFilters = searchQuery.trim() !== '' || platform !== 'all' || category !== 'all';

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0A0A] font-sans selection:bg-zinc-200 selection:text-[#0A0A0A]">
      {/* Top Banner & Interactive Search Refinement Bar */}
      <section className="bg-white border-b border-[#E7E7E2] pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm font-semibold text-[#73736A]">
            <Link href="/" className="hover:text-[#0A0A0A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/creators" className="hover:text-[#0A0A0A] transition-colors">
              Creators
            </Link>
            <span>/</span>
            <span className="text-[#0A0A0A] font-bold">Search Results</span>
          </div>

          {/* Primary Search Pill Bar */}
          <div className="bg-[#FAFAF8] p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-[#E7E7E2] shadow-sm w-full max-w-4xl transition-all focus-within:border-[#0A0A0A] focus-within:bg-white relative z-30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecuteSearch();
              }}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0"
            >
              {/* 1. Keyword / Name Input */}
              <div ref={searchInputRef} className="flex-1 flex items-center pl-3.5 pr-2 py-1.5 w-full min-w-[180px] relative">
                <Search className="w-4 h-4 text-[#73736A] mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by creator name, niche, bio, or tags..."
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

                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      handleExecuteSearch('');
                    }}
                    className="w-5 h-5 rounded-full hover:bg-[#E7E7E2] text-[#73736A] flex items-center justify-center mr-1 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                {/* Instant Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim().length > 0 && (
                  <div className="absolute top-full left-0 mt-3 w-[calc(100vw-3rem)] sm:w-[380px] bg-white rounded-2xl border border-[#E7E7E2] shadow-2xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F4F4F0] px-1 text-xs font-bold uppercase tracking-wider text-[#73736A]">
                      <span>Matching Creators</span>
                      <span className="text-[#FF2D78]">Press Enter</span>
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
                                className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-black text-[#0A0A0A] flex items-center gap-1 group-hover:text-[#FF2D78] transition-colors">
                                  <span className="truncate">{c.name}</span>
                                  {c.verified && <VerifiedBadge size="xs" />}
                                </div>
                                <div className="text-sm text-[#73736A] truncate">
                                  @{c.handle.replace('@', '')} • {c.categories[0]}
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-2">
                              <div className="text-xs font-black text-[#0A0A0A]">From €{c.startingPriceEur}</div>
                              <div className="text-xs text-[#23744D] font-bold">★ {c.rating}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-3 text-center text-sm text-[#73736A]">
                        No direct matches. Press search for broader catalog.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Divider Line */}
              <div className="hidden sm:block w-px h-6 bg-[#E7E7E2] shrink-0 mx-1" />

              {/* 2. Platform Selector Dropdown */}
              <div ref={platformDropdownRef} className="relative shrink-0 min-w-[130px] w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlatformOpen(!isPlatformOpen);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full flex items-center justify-between pl-3 pr-2 py-2 sm:py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center min-w-0 mr-1.5">
                    {platformOptions.find((p) => p.value === platform)?.icon}
                    <span className="text-sm font-extrabold text-[#0A0A0A] font-sans truncate ml-2">
                      {platformOptions.find((p) => p.value === platform)?.label || 'All Platforms'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#73736A] transition-transform duration-200 shrink-0 ${
                      isPlatformOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                    }`}
                  />
                </button>

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
                              handleExecuteSearch(undefined, opt.value, undefined);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
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

              {/* 3. Category Selector Dropdown */}
              <div ref={categoryDropdownRef} className="relative shrink-0 min-w-[140px] w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsPlatformOpen(false);
                  }}
                  className="w-full flex items-center justify-between pl-3 sm:pl-2 pr-2 py-2 sm:py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer text-left"
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
                              handleExecuteSearch(undefined, undefined, opt.value);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
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

              {/* 4. Pink Submit Search Button */}
              <button
                type="submit"
                className="w-full sm:w-11 sm:h-11 h-10 bg-[#FF2D78] hover:bg-[#E01E69] text-white rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95 sm:ml-1"
                aria-label="Search Creators"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Quick Filter Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[#73736A] font-bold uppercase tracking-wider text-xs shrink-0 mr-1">
              Popular:
            </span>
            {quickPills.map((pill) => {
              const isActive =
                (pill.category === 'all' && pill.platform === 'all' && category === 'all' && platform === 'all') ||
                (pill.category !== 'all' && category === pill.category) ||
                (pill.platform !== 'all' && platform === pill.platform);

              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => {
                    setCategory(pill.category);
                    setPlatform(pill.platform);
                    handleExecuteSearch(undefined, pill.platform, pill.category);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-2xs'
                      : 'bg-[#FAFAF8] text-[#555550] border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A]'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Results Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Results Metadata Bar: Title, Count, Active Filters & Sorting Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-sm font-medium text-[#73736A] mt-1">
                Showing{' '}
                <span className="font-extrabold text-[#0A0A0A]">
                  {filteredCreators.length}
                </span>{' '}
                verified creators ready for brand collaborations
              </p>
            </div>

            {/* Sorting & Layout Switcher */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-[#E7E7E2] shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#73736A]" />
                <span className="text-sm font-bold text-[#73736A]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-sm font-bold text-[#0A0A0A] outline-none cursor-pointer pr-1"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="rating">Highest Rated (★ 5.0)</option>
                  <option value="followers">Most Followers</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {/* View Layout Toggle */}
              <div className="flex items-center bg-white p-1 rounded-2xl border border-[#E7E7E2] shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-sm font-bold text-[#73736A]">Active filters:</span>

              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] shadow-2xs">
                  <span>Query: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      handleExecuteSearch('');
                    }}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {platform !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] shadow-2xs">
                  <span>Platform: {platformOptions.find((p) => p.value === platform)?.label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPlatform('all');
                      handleExecuteSearch(undefined, 'all', undefined);
                    }}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] shadow-2xs">
                  <span>Category: {categoryOptions.find((c) => c.value === category)?.label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('all');
                      handleExecuteSearch(undefined, undefined, 'all');
                    }}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Grid or List */}
        {filteredCreators.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-white rounded-3xl border border-[#E7E7E2] hover:border-[#0A0A0A] p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col md:flex-row items-center justify-between gap-6 group"
                >
                  {/* Left: Avatar & Identity */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href={`/creators/${creator.id}`} className="shrink-0 relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E7E7E2] group-hover:scale-105 transition-transform"
                      />
                      <VerifiedBadge className="absolute -bottom-1 -right-1 w-5 h-5" />
                    </Link>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/creators/${creator.id}`}
                          className="text-2xl font-extrabold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors truncate"
                        >
                          {creator.name}
                        </Link>
                        <span className="text-sm font-bold text-[#73736A]">
                          @{creator.handle.replace('@', '')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-[#73736A] mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{creator.location}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-[#0A0A0A] font-extrabold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{creator.rating}</span>
                          <span className="text-[#73736A] font-normal">({creator.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {creator.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-bold text-[#555550]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Platforms & Audience */}
                  <div className="hidden lg:flex items-center gap-6 border-x border-[#F4F4F0] px-6">
                    {creator.platforms.instagram && (
                      <div className="text-center">
                        <div className="text-xs font-black text-[#0A0A0A]">
                          {creator.platforms.instagram.followersFormatted}
                        </div>
                        <div className="text-sm font-bold text-[#73736A]">Instagram</div>
                      </div>
                    )}
                    {creator.platforms.tiktok && (
                      <div className="text-center">
                        <div className="text-xs font-black text-[#0A0A0A]">
                          {creator.platforms.tiktok.followersFormatted}
                        </div>
                        <div className="text-sm font-bold text-[#73736A]">TikTok</div>
                      </div>
                    )}
                    {creator.platforms.youtube && (
                      <div className="text-center">
                        <div className="text-xs font-black text-[#0A0A0A]">
                          {creator.platforms.youtube.followersFormatted}
                        </div>
                        <div className="text-sm font-bold text-[#73736A]">YouTube</div>
                      </div>
                    )}
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#F4F4F0]">
                    <div className="text-left md:text-right">
                      <span className="text-sm font-bold text-[#73736A] uppercase tracking-wider block">
                        Packages From
                      </span>
                      <span className="text-2xl font-extrabold text-[#0A0A0A]">
                        €{creator.startingPriceEur}
                      </span>
                    </div>

                    <Link
                      href={`/creators/${creator.id}`}
                      className="h-10 px-5 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white text-sm font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty Search State with Actionable Guidance */
          <div className="bg-white rounded-3xl border border-[#E7E7E2] p-10 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center mx-auto shadow-inner">
              <Search className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                No creators matched your search criteria
              </h3>
              <p className="text-sm text-[#73736A] max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any verified creators matching &ldquo;{searchQuery || platform || category}&rdquo;. Try broadening your keywords or removing some filters.
              </p>
            </div>

            {/* Quick Explore Categories */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Explore Popular Categories:
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['Beauty', 'Fashion', 'Fitness', 'Travel', 'Tech'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setCategory(cat);
                      setPlatform('all');
                      handleExecuteSearch('', 'all', cat);
                    }}
                    className="px-4 py-2 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white text-sm font-bold text-[#0A0A0A] transition-all cursor-pointer"
                  >
                    {cat} Creators
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F4F4F0]">
              <button
                type="button"
                onClick={clearAllFilters}
                className="h-11 px-6 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white text-sm font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters & View All</span>
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredCreators.length > pageSize && (
          <div className="pt-12 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredCreators.length}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              showSizeChanger={false}
              className="font-bold"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-8">
          <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin" />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
