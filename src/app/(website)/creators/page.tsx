'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setFilter, resetFilters } from '@/redux/slices/creatorSlice';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { CreatorGridSkeleton } from '@/components/shared/Skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
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
  PlusCircle,
  ExternalLink,
  ChevronDown,
  Globe,
  Shirt,
  Dumbbell,
  Plane,
  UtensilsCrossed,
  Camera,
  Cpu,
  Briefcase,
  Palette,
  Layers,
} from 'lucide-react';
import { Input, Select, Pagination, Button } from 'antd';

export default function CreatorsDiscoveryPage() {
  const dispatch = useAppDispatch();
  const { creators, filters } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

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
          if (!c.platforms[filters.platform as PlatformType]) return false;
        }

        // Search query
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(query);
          const matchHandle = c.handle.toLowerCase().includes(query);
          const matchBio = c.bio.toLowerCase().includes(query);
          const matchCat = c.categories.some((cat) => cat.toLowerCase().includes(query));
          if (!matchName && !matchHandle && !matchBio && !matchCat) return false;
        }

        // Location filter
        if (filters.location !== 'all' && !c.location.includes(filters.location)) {
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
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#73736A] font-sans block mb-3">
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
            <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t?.discovery?.searchPlaceholder || 'Search creators, keywords or niches...'}
              value={filters.searchQuery}
              onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-[#0A0A0A] bg-[#F4F4F0] rounded-xl outline-none placeholder:text-[#A3A39C] focus:ring-1 focus:ring-[#0A0A0A]"
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
            <ChevronDown className="w-4 h-4 text-[#73736A] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
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
            <ChevronDown className="w-4 h-4 text-[#73736A] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
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
            <ChevronDown className="w-4 h-4 text-[#73736A] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
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
            <ChevronDown className="w-4 h-4 text-[#73736A] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
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
            <ChevronDown className="w-4 h-4 text-[#73736A] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => dispatch(resetFilters())}
            className="p-2.5 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#73736A] hover:text-[#0A0A0A] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

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
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/15 text-white'
                          : 'bg-[#FAFAF8] text-[#73736A] border border-[#E7E7E2]'
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
                <p className="text-xs text-[#73736A] mt-2 leading-[18px] font-medium">
                  Join thousands of creators and get discovered by top brands worldwide.
                </p>
              </div>

              <Link href="/register" className="block w-full">
                <button
                  type="button"
                  className="w-full h-11 px-5 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-outfit font-bold text-sm leading-[18px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create Account
                </button>
              </Link>
            </div>
          </div>

          {/* Right Main Area (75% width) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Results Header with Count */}
            <div className="flex items-center justify-between font-sans">
              <div>
                <span className="text-base font-black text-[#0A0A0A]">
                  {filteredCreators.length.toLocaleString()} creators
                </span>
                <span className="text-sm text-[#73736A] ml-2.5 hidden sm:inline font-medium">
                  Showing 1–{paginatedCreators.length} of {filteredCreators.length} creators
                </span>
              </div>
            </div>

            {/* Creator Cards Grid (3 columns on desktop for spacious cards) */}
            {creators.length === 0 ? (
              <CreatorGridSkeleton count={6} />
            ) : paginatedCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {paginatedCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
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
