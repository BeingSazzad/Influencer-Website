'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setFilter, resetFilters } from '@/redux/slices/creatorSlice';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { Creator, PlatformType } from '@/types';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List as ListIcon,
  Sparkles,
  MapPin,
  Instagram,
  Youtube,
  Users,
  ArrowUpDown,
  RotateCcw,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { Input, Select, Pagination, Button } from 'antd';

export default function CreatorsDiscoveryPage() {
  const dispatch = useAppDispatch();
  const { creators, filters } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  const categories = [
    { name: 'all', label: 'All Creators', count: '12,430', icon: '::' },
    { name: 'Beauty', label: 'Beauty', count: '1,240', icon: '✨' },
    { name: 'Fashion', label: 'Fashion', count: '980', icon: '👗' },
    { name: 'Fitness', label: 'Fitness & Health', count: '1,340', icon: '⚡' },
    { name: 'Travel', label: 'Travel', count: '1,120', icon: '✈️' },
    { name: 'Food', label: 'Food & Cuisine', count: '890', icon: '🍽️' },
    { name: 'Lifestyle', label: 'Lifestyle', count: '1,560', icon: '🌿' },
    { name: 'Tech', label: 'Tech & Gaming', count: '760', icon: '🎮' },
    { name: 'Business', label: 'Business', count: '420', icon: '💼' },
    { name: 'Art', label: 'Art & Creativity', count: '680', icon: '🎨' },
  ];

  // Filtering and sorting logic
  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      // Category filter
      if (filters.category !== 'all') {
        const hasCat = c.categories.some(
          (cat) => cat.toLowerCase().includes(filters.category.toLowerCase()) ||
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
    }).sort((a, b) => {
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
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#73736A]">
              CREATOR MARKETPLACE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#151515] tracking-tight">
              {t?.discovery?.title || 'Discover amazing creators'}
            </h1>
            <p className="text-sm sm:text-base text-[#555550]">
              {t?.discovery?.subtitle ||
                'Find the right creators to bring your brand to life — across all platforms and niches.'}
            </p>
          </div>

          {/* Handwritten style note top right */}
          <div className="hidden lg:flex absolute top-2 right-4 items-center gap-2 font-serif italic text-[#555550]">
            <span className="text-base" style={{ fontFamily: 'Georgia, serif' }}>
              Real people. Real results.
            </span>
            <svg
              className="w-7 h-7 text-[#73736A] transform rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Global Filter Bar matching reference */}
        <div className="bg-white p-3 rounded-2xl border border-[#E7E7E2] shadow-xs flex flex-wrap items-center gap-3">
          {/* Omni Search Input */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t?.discovery?.searchPlaceholder || 'Search creators, keywords or niches...'}
              value={filters.searchQuery}
              onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-[#151515] bg-[#F4F4F0] rounded-xl outline-none placeholder:text-[#A3A39C] focus:ring-1 focus:ring-[#151515]"
            />
          </div>

          {/* All Categories Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={filters.category}
              onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
              className="w-full px-3 py-2 text-xs font-bold text-[#151515] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer"
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
          </div>

          {/* Locations Dropdown */}
          <div className="min-w-[130px]">
            <select
              value={filters.location}
              onChange={(e) => dispatch(setFilter({ location: e.target.value }))}
              className="w-full px-3 py-2 text-xs font-bold text-[#151515] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer"
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
          </div>

          {/* Platforms Dropdown */}
          <div className="min-w-[130px]">
            <select
              value={filters.platform}
              onChange={(e) => dispatch(setFilter({ platform: e.target.value as any }))}
              className="w-full px-3 py-2 text-xs font-bold text-[#151515] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="ugc">UGC Creative</option>
            </select>
          </div>

          {/* Follower Range Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={filters.followerRange}
              onChange={(e) => dispatch(setFilter({ followerRange: e.target.value as any }))}
              className="w-full px-3 py-2 text-xs font-bold text-[#151515] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer"
            >
              <option value="all">Follower Range</option>
              <option value="nano">Nano (10K - 50K)</option>
              <option value="micro">Micro (50K - 200K)</option>
              <option value="macro">Macro (200K - 1M)</option>
              <option value="mega">Mega (1M+)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setFilter({ sortBy: e.target.value as any }))}
              className="w-full px-3 py-2 text-xs font-bold text-[#151515] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none cursor-pointer"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="followers">Most Followers</option>
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => dispatch(resetFilters())}
            className="p-2 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#73736A] hover:text-[#151515] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Main Split Grid: Left Category Sidebar + Right Creator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar (25% width) matching reference */}
          <div className="lg:col-span-3 space-y-6">
            {/* Category Navigation Pills */}
            <div className="bg-white rounded-2xl border border-[#E7E7E2] p-3 shadow-2xs space-y-1">
              {categories.map((cat) => {
                const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.name}
                    onClick={() => dispatch(setFilter({ category: cat.name }))}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#151515] text-white shadow-2xs'
                        : 'text-[#666660] hover:bg-[#F4F4F0] hover:text-[#151515]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold ${
                        isSelected ? 'text-white/70' : 'text-[#A3A39C]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left Creator CTA Card matching reference */}
            <div className="bg-white rounded-2xl border border-[#E7E7E2] p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="font-extrabold text-sm text-[#151515]">
                  Are you a creator?
                </h4>
                <p className="text-xs text-[#73736A] mt-1.5 leading-relaxed">
                  Join thousands of creators and get discovered by top brands worldwide.
                </p>
              </div>

              <Link href="/register">
                <Button
                  type="primary"
                  block
                  className="h-10 rounded-full font-bold text-xs bg-[#151515] text-white hover:!bg-[#2B7FFF] border-none shadow-none"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Main Area (75% width) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Results Header with Count & Grid/List toggles */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-black text-[#151515]">
                  {filteredCreators.length.toLocaleString()} creators
                </span>
                <span className="text-xs text-[#73736A] ml-2 hidden sm:inline">
                  Showing 1–{paginatedCreators.length} of {filteredCreators.length} creators
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E7E7E2]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-[#151515] text-white' : 'text-[#73736A] hover:bg-[#F4F4F0]'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'list' ? 'bg-[#151515] text-white' : 'text-[#73736A] hover:bg-[#F4F4F0]'
                  }`}
                  aria-label="List View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Creator Cards Grid (4 columns on desktop matching reference) */}
            {paginatedCreators.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E7E7E2] p-12 text-center space-y-3">
                <p className="font-bold text-sm text-[#151515]">No creators found matching this filter</p>
                <p className="text-xs text-[#73736A]">Try clearing some filter tags or search terms.</p>
                <Button
                  onClick={() => dispatch(resetFilters())}
                  className="rounded-full text-xs font-bold"
                >
                  Reset All Filters
                </Button>
              </div>
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
