'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setFilter, resetFilters } from '@/redux/slices/creatorSlice';
import { CreatorCard, CreatorListRow } from '@/components/shared/CreatorCard';
import { CreatorGridSkeleton } from '@/components/shared/Skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { PlatformType, CreatorFilterState } from '@/types';
import {
  Search,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from 'lucide-react';
import { Pagination } from 'antd';
import { Button } from '@/components/ui';
import { CategoryIcon } from '@/components/shared/CategoryIcon';

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#73736A]">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-xl border border-[#E7E7E2] bg-[#FAFAF8] pl-3 pr-8 text-sm font-semibold text-[#0A0A0A] outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#66665E]" />
      </span>
    </label>
  );
}

function CreatorsDiscoveryContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { creators, filters } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const categoryRowRef = useRef<HTMLDivElement>(null);
  const [categoryEdges, setCategoryEdges] = useState({ left: false, right: true });
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

  const activeFilterCount = [
    filters.category !== 'all',
    filters.location !== 'all',
    filters.platform !== 'all',
    filters.followerRange !== 'all',
  ].filter(Boolean).length;

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileFiltersOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileFiltersOpen]);

  const updateCategoryEdges = () => {
    const row = categoryRowRef.current;
    if (!row) return;
    setCategoryEdges({
      left: row.scrollLeft > 8,
      right: row.scrollLeft + row.clientWidth < row.scrollWidth - 8,
    });
  };

  useEffect(() => {
    const row = categoryRowRef.current;
    if (!row) return;
    updateCategoryEdges();
    row.addEventListener('scroll', updateCategoryEdges, { passive: true });
    window.addEventListener('resize', updateCategoryEdges);
    return () => {
      row.removeEventListener('scroll', updateCategoryEdges);
      window.removeEventListener('resize', updateCategoryEdges);
    };
  }, []);

  useEffect(() => {
    const row = categoryRowRef.current;
    if (!row) return;
    const selected = row.querySelector<HTMLElement>('[data-selected="true"]');
    if (!selected) return;
    const left = selected.offsetLeft - (row.clientWidth - selected.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [filters.category]);

  const nudgeCategories = (direction: 1 | -1) => {
    categoryRowRef.current?.scrollBy({ left: direction * 200, behavior: 'smooth' });
  };

  const categories = [
    {
      name: 'all',
      label: 'All Creators',
      count: '12,430',
      icon: <CategoryIcon name="all" size={16} />,
      color: 'bg-neutral-100 text-neutral-800',
    },
    {
      name: 'Beauty',
      label: 'Beauty & Skincare',
      count: '1,240',
      icon: <CategoryIcon name="beauty" size={16} />,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      name: 'Fashion',
      label: 'Fashion & Luxury',
      count: '980',
      icon: <CategoryIcon name="fashion" size={16} />,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      name: 'Fitness',
      label: 'Fitness & Health',
      count: '1,340',
      icon: <CategoryIcon name="fitness" size={16} />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      name: 'Travel',
      label: 'Travel & Vlog',
      count: '1,120',
      icon: <CategoryIcon name="travel" size={16} />,
      color: 'bg-rose-50 text-[#FF2D78]',
    },
    {
      name: 'Food',
      label: 'Food & Cuisine',
      count: '890',
      icon: <CategoryIcon name="food" size={16} />,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      name: 'Lifestyle',
      label: 'Lifestyle & UGC',
      count: '1,560',
      icon: <CategoryIcon name="lifestyle" size={16} />,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      name: 'Tech',
      label: 'Tech & Gaming',
      count: '760',
      icon: <CategoryIcon name="tech" size={16} />,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      name: 'Business',
      label: 'Founder & SaaS UGC',
      count: '420',
      icon: <CategoryIcon name="business" size={16} />,
      color: 'bg-pink-50 text-[#FF2D78]',
    },
    {
      name: 'Art',
      label: 'Digital Art & Visuals',
      count: '680',
      icon: <CategoryIcon name="art" size={16} />,
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
    <div className="bg-[#FAFAF8] min-h-screen overflow-x-clip py-5 sm:py-10">
      <div className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-8">
        {/* Top Header Area matching reference */}
        <div className="relative">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#66665E] font-sans block mb-1.5 sm:mb-3">
              CREATOR MARKETPLACE
            </span>
            <h1 className="text-[1.65rem] sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.08] sm:leading-[1.15] font-sans">
              Discover amazing{' '}
              <span className="font-editorial italic font-normal text-[#0A0A0A]">
                creators
              </span>
            </h1>
            <p className="text-sm sm:text-[18px] text-[#555550] font-sans font-medium leading-5 sm:leading-[28px] mt-2 sm:mt-4 max-w-xl">
              {t?.discovery?.subtitle ||
                'Find the right creators to bring your brand to life — across all platforms and niches.'}
            </p>
          </div>
        </div>

        {/* Compact search + filter sheet. Desktop keeps the full bar below. */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1 font-sans">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#66665E]" />
              <input
                type="text"
                placeholder={t?.discovery?.searchPlaceholder || 'Search creators, keywords or niches...'}
                value={filters.searchQuery}
                onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
                className="h-10 w-full rounded-xl border-none bg-[#F4F4F0] pl-9 pr-3 text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-[#A3A39C]"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#E7E7E2] bg-white px-3 text-xs font-bold text-[#0A0A0A]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0A0A0A] px-1 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[70] !mt-0 lg:hidden">
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-[#0A0A0A]/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="absolute inset-x-0 bottom-0 max-h-[min(85dvh,640px)] overflow-y-auto rounded-t-3xl bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-2xl">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#E7E7E2]" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-black text-[#0A0A0A]">Filters</h2>
                <button
                  type="button"
                  onClick={() => dispatch(resetFilters())}
                  className="text-xs font-bold text-[#66665E]"
                >
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FilterField
                  label="Category"
                  value={filters.category}
                  onChange={(category) => dispatch(setFilter({ category }))}
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'Beauty', label: 'Beauty' },
                    { value: 'Fashion', label: 'Fashion' },
                    { value: 'Fitness', label: 'Fitness & Health' },
                    { value: 'Travel', label: 'Travel' },
                    { value: 'Food', label: 'Food & Cuisine' },
                    { value: 'Lifestyle', label: 'Lifestyle' },
                    { value: 'Tech', label: 'Tech & Gaming' },
                  ]}
                />
                <FilterField
                  label="Location"
                  value={filters.location}
                  onChange={(location) => dispatch(setFilter({ location }))}
                  options={[
                    { value: 'all', label: 'All Locations' },
                    { value: 'London', label: 'London, UK' },
                    { value: 'Berlin', label: 'Berlin, DE' },
                    { value: 'Paris', label: 'Paris, FR' },
                    { value: 'Milan', label: 'Milan, IT' },
                    { value: 'Amsterdam', label: 'Amsterdam, NL' },
                    { value: 'Los Angeles', label: 'Los Angeles, US' },
                    { value: 'New York', label: 'New York, US' },
                  ]}
                />
                <FilterField
                  label="Platform"
                  value={filters.platform}
                  onChange={(platform) => dispatch(setFilter({ platform: platform as CreatorFilterState['platform'] }))}
                  options={[
                    { value: 'all', label: 'All Platforms' },
                    { value: 'instagram', label: 'Instagram' },
                    { value: 'tiktok', label: 'TikTok' },
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'ugc', label: 'UGC Creative' },
                  ]}
                />
                <FilterField
                  label="Followers"
                  value={filters.followerRange}
                  onChange={(followerRange) =>
                    dispatch(setFilter({ followerRange: followerRange as CreatorFilterState['followerRange'] }))
                  }
                  options={[
                    { value: 'all', label: 'Any range' },
                    { value: 'nano', label: 'Nano (10K – 50K)' },
                    { value: 'micro', label: 'Micro (50K – 200K)' },
                    { value: 'macro', label: 'Macro (200K – 1M)' },
                    { value: 'mega', label: 'Mega (1M+)' },
                  ]}
                />
                <FilterField
                  label="Sort"
                  value={filters.sortBy}
                  onChange={(sortBy) => dispatch(setFilter({ sortBy: sortBy as CreatorFilterState['sortBy'] }))}
                  options={[
                    { value: 'relevance', label: 'Relevance' },
                    { value: 'followers', label: 'Most Followers' },
                    { value: 'rating', label: 'Top Rated' },
                    { value: 'price_asc', label: 'Price: Low to High' },
                    { value: 'price_desc', label: 'Price: High to Low' },
                  ]}
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-[#0A0A0A] text-sm font-bold text-white"
              >
                Show {filteredCreators.length.toLocaleString()} creators
              </button>
            </div>
          </div>
        )}

        {/* Global Filter Bar matching reference */}
        <div className="hidden lg:flex bg-white p-3.5 rounded-2xl border border-[#E7E7E2] shadow-xs items-center gap-3">
          {/* Omni Search Input */}
          <div className="w-full lg:flex-1 lg:min-w-[220px] relative font-sans">
            <Search className="w-4 h-4 text-[#66665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t?.discovery?.searchPlaceholder || 'Search creators, keywords or niches...'}
              value={filters.searchQuery}
              onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-[#0A0A0A] bg-[#F4F4F0] rounded-xl outline-none focus:outline-none focus:ring-0 focus-visible:outline-none border-none placeholder:text-[#A3A39C]"
            />
          </div>

          {/* Responsive Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
            {/* All Categories Dropdown */}
            <div className="w-full lg:min-w-[145px] font-sans relative">
              <select
                value={filters.category}
                onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
                className="w-full pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none truncate"
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
              <ChevronDown className="w-3.5 h-3.5 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Locations Dropdown */}
            <div className="w-full lg:min-w-[135px] font-sans relative">
              <select
                value={filters.location}
                onChange={(e) => dispatch(setFilter({ location: e.target.value }))}
                className="w-full pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none truncate"
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
              <ChevronDown className="w-3.5 h-3.5 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Platforms Dropdown */}
            <div className="w-full lg:min-w-[130px] font-sans relative">
              <select
                value={filters.platform}
                onChange={(e) => dispatch(setFilter({ platform: e.target.value as any }))}
                className="w-full pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none truncate"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="ugc">UGC Creative</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Follower Range Dropdown */}
            <div className="w-full lg:min-w-[140px] font-sans relative">
              <select
                value={filters.followerRange}
                onChange={(e) => dispatch(setFilter({ followerRange: e.target.value as any }))}
                className="w-full pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none truncate"
              >
                <option value="all">Follower Range</option>
                <option value="nano">Nano (10K - 50K)</option>
                <option value="micro">Micro (50K - 200K)</option>
                <option value="macro">Macro (200K - 1M)</option>
                <option value="mega">Mega (1M+)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort By Dropdown */}
            <div className="w-full lg:min-w-[140px] font-sans relative">
              <select
                value={filters.sortBy}
                onChange={(e) => dispatch(setFilter({ sortBy: e.target.value as any }))}
                className="w-full pl-3 pr-7 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer appearance-none truncate"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="followers">Most Followers</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#66665E] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={() => dispatch(resetFilters())}
              className="w-full lg:w-auto h-10 px-3 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#66665E] hover:text-[#0A0A0A] transition-colors flex items-center justify-center gap-1.5 font-bold text-xs"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="lg:hidden">Reset</span>
            </button>
          </div>
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

        {/* Category navigation scrolls on its own. It must not widen the page. */}
        <div className="relative min-w-0 px-8 lg:hidden">
          {categoryEdges.left && (
            <button
              type="button"
              aria-label="Previous categories"
              onClick={() => nudgeCategories(-1)}
              className="absolute left-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7E7E2] bg-white text-[#0A0A0A] shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <div
            ref={categoryRowRef}
            className="flex w-full min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain no-scrollbar py-0.5"
            role="tablist"
            aria-label="Creator categories"
          >
            {categories.map((cat) => {
              const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();
              const shortLabel = cat.name === 'all' ? 'All' : cat.label.split('&')[0].trim();
              return (
                <button
                  key={cat.name}
                  type="button"
                  role="tab"
                  data-selected={isSelected}
                  aria-selected={isSelected}
                  onClick={() => dispatch(setFilter({ category: cat.name }))}
                  className={`flex h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-white'
                      : 'border border-[#E7E7E2] bg-white text-[#555550]'
                  }`}
                >
                  <span className={`[&_svg]:h-3.5 [&_svg]:w-3.5 ${isSelected ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {cat.icon}
                  </span>
                  <span>{shortLabel}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-white/70' : 'text-[#8A8A82]'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
          {categoryEdges.right && (
            <>
              <div className="pointer-events-none absolute inset-y-0 right-8 w-8 bg-gradient-to-l from-[#FAFAF8] to-transparent" />
              <button
                type="button"
                aria-label="More categories"
                onClick={() => nudgeCategories(1)}
                className="absolute right-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7E7E2] bg-white text-[#0A0A0A] shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          {categoryEdges.left && (
            <div className="pointer-events-none absolute inset-y-0 left-8 w-8 bg-gradient-to-r from-[#FAFAF8] to-transparent" />
          )}
        </div>

        {/* Main Split Grid: Left Category Sidebar + Right Creator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar (25% width) - Desktop only */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 font-sans">
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
                <span className="text-lg font-extrabold text-[#0A0A0A] sm:text-2xl">
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
                <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:gap-7">
                  {paginatedCreators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5 sm:space-y-4">
                  {paginatedCreators.map((creator) => (
                    <CreatorListRow key={creator.id} creator={creator} />
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
