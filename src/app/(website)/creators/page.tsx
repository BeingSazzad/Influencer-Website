'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setFilter, resetFilters } from '@/redux/slices/creatorSlice';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { CreatorGridSkeleton } from '@/components/shared/Skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { PlatformType, CreatorFilterState } from '@/types';
import {
  Search,
  Sparkles,
  RotateCcw,
  ChevronDown,
  Shirt,
  Dumbbell,
  Plane,
  UtensilsCrossed,
  Camera,
  Cpu,
  Briefcase,
  Palette,
  Layers,
  X,
  LayoutGrid,
  List,
  MapPin,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Pagination } from 'antd';
import { Button } from '@/components/ui';

function CreatorsDiscoveryContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { creators, filters } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const pageSize = 9;

  // Synchronize incoming URL search parameters (from Hero search, Footer category links, etc.)
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const location = searchParams.get('location');

    const updates: Partial<CreatorFilterState> = {};
    if (q !== null && q !== undefined && q !== filters.searchQuery) {
      updates.searchQuery = q;
    }
    if (category && category !== filters.category) {
      updates.category = category;
    }
    if (platform && platform !== filters.platform) {
      updates.platform = platform as any;
    }
    if (location && location !== filters.location) {
      updates.location = location;
    }

    if (Object.keys(updates).length > 0) {
      dispatch(setFilter(updates));
    }
  }, [searchParams]);

  // Reset pagination to first page when any search or filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const categories = [
    {
      name: 'all',
      label: 'All Creators',
      count: '12,430',
      icon: <Layers className="w-4 h-4" />,
      color: 'bg-neutral-100 text-neutral-800',
    },
    {
      name: 'Beauty',
      label: 'Beauty & Skincare',
      count: '1,240',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      name: 'Fashion',
      label: 'Fashion & Luxury',
      count: '980',
      icon: <Shirt className="w-4 h-4" />,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      name: 'Fitness',
      label: 'Fitness & Health',
      count: '1,340',
      icon: <Dumbbell className="w-4 h-4" />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      name: 'Travel',
      label: 'Travel & Vlog',
      count: '1,120',
      icon: <Plane className="w-4 h-4" />,
      color: 'bg-rose-50 text-[#FF2D78]',
    },
    {
      name: 'Food',
      label: 'Food & Cuisine',
      count: '890',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      name: 'Lifestyle',
      label: 'Lifestyle & UGC',
      count: '1,560',
      icon: <Camera className="w-4 h-4" />,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      name: 'Tech',
      label: 'Tech & Gaming',
      count: '760',
      icon: <Cpu className="w-4 h-4" />,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      name: 'Business',
      label: 'Founder & SaaS UGC',
      count: '420',
      icon: <Briefcase className="w-4 h-4" />,
      color: 'bg-pink-50 text-[#FF2D78]',
    },
    {
      name: 'Art',
      label: 'Digital Art & Visuals',
      count: '680',
      icon: <Palette className="w-4 h-4" />,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  // Filtering and sorting logic
  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) => {
        // Category filter
        if (filters.category !== 'all') {
          const hasCat = c.categories.some(
            (cat) =>
              cat.toLowerCase().includes(filters.category.toLowerCase()) ||
              filters.category.toLowerCase().includes(cat.toLowerCase())
          );
          if (!hasCat) return false;
        }

        // Platform filter
        if (filters.platform !== 'all') {
          if (filters.platform === 'ugc') {
            const hasUgc =
              !!c.platforms.ugc ||
              c.packages.some((p) => p.platform === 'ugc') ||
              c.categories.includes('Lifestyle') ||
              c.bio.toLowerCase().includes('ugc');
            if (!hasUgc) return false;
          } else if (!c.platforms[filters.platform as PlatformType]) {
            return false;
          }
        }

        // Search query (names, handles, bio, categories, tags, location, city, country, languages, collaboration preferences)
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase().trim();
          const matchName = c.name.toLowerCase().includes(query);
          const matchHandle = c.handle.toLowerCase().includes(query);
          const matchBio = c.bio.toLowerCase().includes(query);
          const matchCat = c.categories.some((cat) => cat.toLowerCase().includes(query));
          const matchTag = c.tags?.some((t) => t.toLowerCase().includes(query));
          const matchLocation = c.location.toLowerCase().includes(query);
          const matchCity = c.city?.toLowerCase().includes(query);
          const matchCountry = c.country?.toLowerCase().includes(query);
          const matchLanguage = c.languages?.some((l) => l.toLowerCase().includes(query));
          const matchCollab = c.collaborationPreferences?.some((p) => p.toLowerCase().includes(query));

          if (
            !matchName &&
            !matchHandle &&
            !matchBio &&
            !matchCat &&
            !matchTag &&
            !matchLocation &&
            !matchCity &&
            !matchCountry &&
            !matchLanguage &&
            !matchCollab
          ) {
            return false;
          }
        }

        // Location filter (location string, city, or country)
        if (
          filters.location !== 'all' &&
          !c.location.toLowerCase().includes(filters.location.toLowerCase()) &&
          !c.country?.toLowerCase().includes(filters.location.toLowerCase()) &&
          !c.city?.toLowerCase().includes(filters.location.toLowerCase())
        ) {
          return false;
        }

        // Follower range filter
        if (filters.followerRange !== 'all') {
          const igFollowers = c.platforms.instagram?.followers || 0;
          if (filters.followerRange === 'nano' && igFollowers >= 50000) return false;
          if (filters.followerRange === 'micro' && (igFollowers < 50000 || igFollowers > 200000)) return false;
          if (filters.followerRange === 'macro' && (igFollowers < 200000 || igFollowers > 1000000)) return false;
          if (filters.followerRange === 'mega' && igFollowers <= 1000000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_asc') return a.startingPriceEur - b.startingPriceEur;
        if (filters.sortBy === 'price_desc') return b.startingPriceEur - a.startingPriceEur;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'followers') {
          const aFollowers = (a.platforms.instagram?.followers || 0) + (a.platforms.tiktok?.followers || 0);
          const bFollowers = (b.platforms.instagram?.followers || 0) + (b.platforms.tiktok?.followers || 0);
          return bFollowers - aFollowers;
        }
        return 0; // relevance
      });
  }, [creators, filters]);

  // Paginated slice
  const paginatedCreators = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCreators.slice(start, start + pageSize);
  }, [filteredCreators, currentPage, pageSize]);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Area matching reference */}
        <div className="relative">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#66665E] font-sans block mb-3">
              CREATOR MARKETPLACE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
              Discover amazing{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A]">
                creators
              </span>
            </h1>
            <p className="text-[18px] text-[#555550] font-sans font-medium leading-[28px] mt-3 sm:mt-4">
              {t?.discovery?.subtitle ||
                'Find the right creators to bring your brand to life — across all platforms and niches.'}
            </p>
          </div>
        </div>

        {/* Global Filter Bar matching reference */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#E7E7E2] shadow-xs flex flex-wrap items-center gap-3">
          {/* Omni Search Input */}
          <div className="flex-1 min-w-[240px] relative font-sans">
            <Search className="w-4 h-4 text-[#66665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t?.discovery?.searchPlaceholder || 'Search creators, keywords or niches...'}
              value={filters.searchQuery}
              onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-[#0A0A0A] bg-[#F4F4F0] rounded-xl outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none placeholder:text-[#A3A39C]"
            />
          </div>

          {/* All Categories Dropdown */}
          <div className="min-w-[150px] font-sans relative">
            <select
              value={filters.category}
              onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
              className="w-full pl-3.5 pr-8 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="Beauty">Beauty</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness & Health</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food & Cuisine</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Tech">Tech & Gaming</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Locations Dropdown */}
          <div className="min-w-[140px] font-sans relative">
            <select
              value={filters.location}
              onChange={(e) => dispatch(setFilter({ location: e.target.value }))}
              className="w-full pl-3.5 pr-8 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Locations</option>
              <option value="London">London, UK</option>
              <option value="Berlin">Berlin, DE</option>
              <option value="Paris">Paris, FR</option>
              <option value="Milan">Milan, IT</option>
              <option value="Amsterdam">Amsterdam, NL</option>
              <option value="Los Angeles">Los Angeles, US</option>
              <option value="New York">New York, US</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Platforms Dropdown */}
          <div className="min-w-[140px] font-sans relative">
            <select
              value={filters.platform}
              onChange={(e) => dispatch(setFilter({ platform: e.target.value as any }))}
              className="w-full pl-3.5 pr-8 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="ugc">UGC Creative</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Follower Range Dropdown */}
          <div className="min-w-[150px] font-sans relative">
            <select
              value={filters.followerRange}
              onChange={(e) => dispatch(setFilter({ followerRange: e.target.value as any }))}
              className="w-full pl-3.5 pr-8 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none"
            >
              <option value="all">Follower Range</option>
              <option value="nano">Nano (10K - 50K)</option>
              <option value="micro">Micro (50K - 200K)</option>
              <option value="macro">Macro (200K - 1M)</option>
              <option value="mega">Mega (1M+)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort By Dropdown */}
          <div className="min-w-[150px] font-sans relative">
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setFilter({ sortBy: e.target.value as any }))}
              className="w-full pl-3.5 pr-8 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="followers">Most Followers</option>
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => dispatch(resetFilters())}
            className="p-2.5 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#66665E] hover:text-[#0A0A0A] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Active Filter Chips / Status bar if any filter is applied */}
        {(filters.searchQuery || filters.category !== 'all' || filters.platform !== 'all' || filters.location !== 'all' || filters.followerRange !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 pt-1 font-sans text-xs">
            <span className="text-[#66665E] font-bold mr-1">Active Filters:</span>
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] text-white font-medium">
                Keyword: "{filters.searchQuery}"
                <button
                  onClick={() => dispatch(setFilter({ searchQuery: '' }))}
                  className="hover:text-[#FF2D78] transition-colors cursor-pointer"
                  title="Remove query filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] font-medium shadow-2xs">
                Category: {filters.category}
                <button
                  onClick={() => dispatch(setFilter({ category: 'all' }))}
                  className="text-[#66665E] hover:text-[#FF2D78] transition-colors cursor-pointer"
                  title="Remove category filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {filters.platform !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] font-medium shadow-2xs">
                Platform: {filters.platform.toUpperCase()}
                <button
                  onClick={() => dispatch(setFilter({ platform: 'all' }))}
                  className="text-[#66665E] hover:text-[#FF2D78] transition-colors cursor-pointer"
                  title="Remove platform filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {filters.location !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] font-medium shadow-2xs">
                Location: {filters.location}
                <button
                  onClick={() => dispatch(setFilter({ location: 'all' }))}
                  className="text-[#66665E] hover:text-[#FF2D78] transition-colors cursor-pointer"
                  title="Remove location filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {filters.followerRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] font-medium shadow-2xs">
                Followers: {filters.followerRange}
                <button
                  onClick={() => dispatch(setFilter({ followerRange: 'all' }))}
                  className="text-[#66665E] hover:text-[#FF2D78] transition-colors cursor-pointer"
                  title="Remove follower range filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={() => dispatch(resetFilters())}
              className="text-[#FF2D78] hover:underline font-bold ml-2 cursor-pointer transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Split Grid: Left Category Sidebar + Right Creator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar (25% width) matching reference */}
          <div className="lg:col-span-3 space-y-6 font-sans">
            {/* Category Navigation Pills */}
            <div className="bg-white rounded-3xl border border-[#E7E7E2] p-3 shadow-2xs space-y-1">
              {categories.map((cat) => {
                const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.name}
                    onClick={() => dispatch(setFilter({ category: cat.name }))}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A0A0A] text-white shadow-xs'
                        : 'text-[#555550] hover:bg-[#F4F4F0] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : `${cat.color} shadow-2xs`
                        }`}
                      >
                        {cat.icon}
                      </span>
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/15 text-white'
                          : 'bg-[#FAFAF8] text-[#66665E] border border-[#E7E7E2]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left Creator CTA Card matching reference */}
            <div className="bg-white rounded-3xl border border-[#E7E7E2] p-6 sm:p-7 shadow-2xs">
              <div className="mb-5">
                <h4 className="font-black text-base leading-[22px] text-[#0A0A0A] tracking-tight">
                  Are you a creator?
                </h4>
                <p className="text-sm text-[#66665E] mt-2 leading-[18px] font-medium">
                  Join thousands of creators and get discovered by top brands worldwide.
                </p>
              </div>

              <Button
                href="/register"
                size="md"
                variant="primary"
                fullWidth
              >
                Create Account
              </Button>
            </div>
          </div>

          {/* Right Main Area (75% width) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Results Header with Count & Grid/List switcher */}
            <div className="flex items-center justify-between font-sans">
              <div>
                <span className="text-2xl font-extrabold text-[#0A0A0A]">
                  {filteredCreators.length.toLocaleString()} creators
                </span>
                <span className="text-sm text-[#66665E] ml-2.5 hidden sm:inline font-medium">
                  Showing 1–{paginatedCreators.length} of {filteredCreators.length} creators
                </span>
              </div>

              {/* Layout Switcher (Grid vs List) */}
              <div className="flex items-center bg-[#F4F4F0] p-1 rounded-2xl border border-[#E7E7E2]">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#0A0A0A] shadow-xs'
                      : 'text-[#66665E] hover:text-[#0A0A0A]'
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
                      ? 'bg-white text-[#0A0A0A] shadow-xs'
                      : 'text-[#66665E] hover:text-[#0A0A0A]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Creator Cards Grid or List */}
            {creators.length === 0 ? (
              <CreatorGridSkeleton count={6} />
            ) : paginatedCreators.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/creators/${creator.id}`}
                              className="text-2xl font-extrabold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors truncate"
                            >
                              {creator.name}
                            </Link>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-semibold text-[#66665E] mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{creator.location}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-[#0A0A0A] font-extrabold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{creator.rating}</span>
                              <span className="text-[#66665E] font-normal">({creator.reviewsCount})</span>
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
                            <div className="text-sm font-bold text-[#66665E]">Instagram</div>
                          </div>
                        )}
                        {creator.platforms.tiktok && (
                          <div className="text-center">
                            <div className="text-xs font-black text-[#0A0A0A]">
                              {creator.platforms.tiktok.followersFormatted}
                            </div>
                            <div className="text-sm font-bold text-[#66665E]">TikTok</div>
                          </div>
                        )}
                        {creator.platforms.youtube && (
                          <div className="text-center">
                            <div className="text-xs font-black text-[#0A0A0A]">
                              {creator.platforms.youtube.followersFormatted}
                            </div>
                            <div className="text-sm font-bold text-[#66665E]">YouTube</div>
                          </div>
                        )}
                      </div>

                      {/* Right: Pricing & CTA */}
                      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#F4F4F0]">
                        <div className="text-left md:text-right">
                          <span className="text-sm font-bold text-[#66665E] uppercase tracking-wider block">
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
              <EmptyState
                color="pink"
                showIcon={false}
                title="No Creators Found"
                description="We couldn't find any verified creators matching your current search parameters or category filter."
                primaryAction={{
                  label: 'Reset All Filters',
                  onClick: () => dispatch(resetFilters()),
                }}
                variant="card"
              />
            )}

            {/* Pagination Controls matching reference */}
            <div className="flex justify-center pt-8">
              <Pagination
                current={currentPage}
                total={filteredCreators.length}
                pageSize={pageSize}
                onChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorsDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FAFAF8] min-h-screen py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <CreatorGridSkeleton count={6} />
          </div>
        </div>
      }
    >
      <CreatorsDiscoveryContent />
    </Suspense>
  );
}
