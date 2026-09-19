'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { PropertyCard } from '@/components/shared/PropertyCard';
import { ArrowRight, Sparkles, Building2, Eye } from 'lucide-react';
import { Button } from 'antd';

export function FeaturedPropertiesSection() {
  const { properties } = useAppSelector((state) => state.property);
  const [activeTab, setActiveTab] = useState<'all' | 'villa' | 'penthouse' | 'mansion'>('all');

  const filteredProperties = properties.filter((prop) => {
    if (activeTab === 'all') return true;
    return prop.type === activeTab;
  });

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Curated Trophy Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Featured Global Residences
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mt-2 leading-relaxed">
              Explore rare architectural masterpieces with cinematic 4K video walkthroughs and private escrows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Trophy Estates' },
              { id: 'villa', label: 'Modern Villas' },
              { id: 'penthouse', label: 'Sky Penthouses' },
              { id: 'mansion', label: 'Waterfront' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/properties">
            <Button
              type="default"
              size="large"
              className="h-12 px-8 rounded-xl font-bold border-slate-300 text-slate-800 hover:border-emerald-600 hover:text-emerald-700 shadow-xs"
            >
              <span>Explore All {properties.length} Active Trophy Listings</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
