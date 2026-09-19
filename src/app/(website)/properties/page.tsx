'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { PropertyCard } from '@/components/shared/PropertyCard';
import { SearchFilterBar } from '@/components/shared/SearchFilterBar';
import { resetFilters } from '@/redux/slices/propertySlice';
import { LayoutGrid, List, Sparkles, Building, RotateCcw } from 'lucide-react';
import { Button } from 'antd';

export default function PropertiesPage() {
  const dispatch = useAppDispatch();
  const { properties, filters } = useAppSelector((state) => state.property);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter properties logic
  const filteredProperties = properties.filter((prop) => {
    // Search keyword
    if (
      filters.searchQuery &&
      !prop.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !prop.address.city.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !prop.address.street.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !prop.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // City
    if (filters.city !== 'all' && !prop.address.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // Type
    if (filters.type !== 'all' && prop.type !== filters.type) {
      return false;
    }

    // Bedrooms
    if (filters.bedrooms !== 'all' && prop.specs.bedrooms < Number(filters.bedrooms)) {
      return false;
    }

    return true;
  });

  // Sort properties logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'popular') return b.viewsCount - a.viewsCount;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Verified Global Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Trophy Properties & Residences
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explore available architectural estates, private islands, and luxury sky penthouses.
            </p>
          </div>

          {/* View Switcher & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Showing <strong>{sortedProperties.length}</strong> of {properties.length} Estates
            </span>
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Omnisearch Filter Bar */}
        <SearchFilterBar />

        {/* Properties Results */}
        {sortedProperties.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col space-y-6'
            }
          >
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Trophy Homes</h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find any properties matching your current filter criteria. Try expanding your search or resetting filters.
            </p>
            <Button
              type="primary"
              onClick={() => dispatch(resetFilters())}
              className="font-semibold flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
