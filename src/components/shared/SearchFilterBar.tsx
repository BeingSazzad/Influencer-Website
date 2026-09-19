'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFilter, resetFilters } from '@/redux/slices/propertySlice';
import { Search, MapPin, Home, DollarSign, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Select, Input, Button, Slider } from 'antd';

export function SearchFilterBar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.property);

  const cityOptions = [
    { value: 'all', label: 'All Global Locations' },
    { value: 'Bel Air', label: 'Bel Air & Beverly Hills, CA' },
    { value: 'New York', label: 'Manhattan & Tribeca, NY' },
    { value: 'Dubai', label: 'Palm Jumeirah, Dubai' },
    { value: 'Miami Beach', label: 'Star Island & South Beach, FL' },
    { value: 'London', label: 'Knightsbridge & Mayfair, UK' },
    { value: 'Aspen', label: 'Red Mountain, Aspen, CO' },
    { value: 'Monte Carlo', label: 'Monte Carlo, Monaco' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Property Types' },
    { value: 'villa', label: 'Modern Luxury Villa' },
    { value: 'penthouse', label: 'Sky Penthouse' },
    { value: 'mansion', label: 'Waterfront Mansion' },
    { value: 'apartment', label: 'Designer Apartment' },
    { value: 'townhouse', label: 'Historic Townhouse' },
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Bedrooms' },
    { value: 3, label: '3+ Bedrooms' },
    { value: 4, label: '4+ Bedrooms' },
    { value: 5, label: '5+ Bedrooms' },
    { value: 6, label: '6+ Bedrooms' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'popular', label: 'Most Viewed Trophy Homes' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-5 space-y-4">
      {/* Top Search Line */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Keyword Search */}
        <div className="md:col-span-2 relative">
          <Input
            prefix={<Search className="w-4 h-4 text-emerald-600 mr-1.5" />}
            placeholder="Search by estate name, address, or architect..."
            value={filters.searchQuery}
            onChange={(e) => dispatch(setFilter({ searchQuery: e.target.value }))}
            allowClear
            className="w-full text-sm font-medium"
          />
        </div>

        {/* Location Select */}
        <div>
          <Select
            value={filters.city}
            onChange={(val) => dispatch(setFilter({ city: val }))}
            options={cityOptions}
            className="w-full text-sm"
            suffixIcon={<MapPin className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Property Type Select */}
        <div>
          <Select
            value={filters.type}
            onChange={(val) => dispatch(setFilter({ type: val }))}
            options={typeOptions}
            className="w-full text-sm"
            suffixIcon={<Home className="w-4 h-4 text-emerald-600" />}
          />
        </div>
      </div>

      {/* Secondary Controls: Bedrooms, Sorting, Reset */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Bedrooms:</span>
          {['all', 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => dispatch(setFilter({ bedrooms: num as any }))}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filters.bedrooms === num
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {num === 'all' ? 'All' : `${num}+ Beds`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Sort:</span>
            <Select
              size="small"
              value={filters.sortBy}
              onChange={(val) => dispatch(setFilter({ sortBy: val }))}
              options={sortOptions}
              className="w-44 text-xs font-semibold"
            />
          </div>

          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-semibold px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
