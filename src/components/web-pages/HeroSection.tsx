'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setFilter } from '@/redux/slices/propertySlice';
import {
  Search,
  MapPin,
  Home,
  Sparkles,
  ShieldCheck,
  PlayCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button, Select } from 'antd';

export function HeroSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = () => {
    dispatch(setFilter({ city: selectedCity, type: selectedType }));
    router.push('/properties');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Architectural Estate"
          className="w-full h-full object-cover opacity-35 scale-105 transform animate-pulse duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Top VIP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg shadow-emerald-900/30">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>The World\'s Leading Influencer Real Estate Collective</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-serif max-w-4xl leading-[1.1] mb-6 drop-shadow-md">
          Trophy Architecture Represented by Top Media Producers.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Discover exclusive off-market estates, architectural penthouses, and beachfront sanctuaries showcased by verified global real estate influencers.
        </p>

        {/* Quick Search Floating Box */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/40 shadow-2xl shadow-emerald-950/40 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {/* Location Select */}
            <div className="text-left px-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Destination
              </label>
              <Select
                value={selectedCity}
                onChange={setSelectedCity}
                bordered={false}
                className="w-full font-semibold text-slate-900 -ml-2"
                options={[
                  { value: 'all', label: 'All Prime Global Markets' },
                  { value: 'Bel Air', label: 'Bel Air & Beverly Hills, CA' },
                  { value: 'New York', label: 'Manhattan & Tribeca, NY' },
                  { value: 'Dubai', label: 'Palm Jumeirah, Dubai' },
                  { value: 'Miami Beach', label: 'Miami Beach, FL' },
                  { value: 'London', label: 'Knightsbridge, London' },
                  { value: 'Aspen', label: 'Aspen, Colorado' },
                ]}
              />
            </div>

            {/* Property Type Select */}
            <div className="text-left px-2 sm:border-l border-slate-200">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Asset Category
              </label>
              <Select
                value={selectedType}
                onChange={setSelectedType}
                bordered={false}
                className="w-full font-semibold text-slate-900 -ml-2"
                options={[
                  { value: 'all', label: 'All Luxury Categories' },
                  { value: 'villa', label: 'Architectural Villa' },
                  { value: 'penthouse', label: 'Crown Sky Penthouse' },
                  { value: 'mansion', label: 'Waterfront Compound' },
                  { value: 'apartment', label: 'Luxury Residence' },
                ]}
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="primary"
                onClick={handleSearch}
                className="w-full h-12 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Search Trophy Homes</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust & Performance Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-6 border-t border-slate-800/80 w-full max-w-4xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">$2.4B+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Asset Sales Volume</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">14.8M+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Media Video Reach</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">100%</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Verified Brokers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">4.98★</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
