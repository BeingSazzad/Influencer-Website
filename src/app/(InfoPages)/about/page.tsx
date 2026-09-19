'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Video,
  Award,
  Globe2,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Button } from 'antd';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Media-First Luxury Advisory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 font-serif tracking-tight">
            Redefining How Trophy Architecture is Discovered and Acquired
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            LUXE PRIME bridges high-net-worth real estate buyers, private offices, and celebrity sellers with the world\'s most influential architectural media producers.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Estate"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-2xl font-bold font-serif">$2.4B+ in Closed Transactions</div>
              <div className="text-xs text-emerald-300">Across Los Angeles, New York, Miami, London & Dubai</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif">
              Why the World\'s Top 1% Choose Influencer-Driven Representation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional real estate marketing relies on passive portal listings. In today's interconnected global landscape, high-net-worth capital moves where attention congregates.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              By combining Hollywood-caliber cinematography, narrative architectural storytelling, and millions of dedicated digital subscribers, our verified influencer partners create unprecedented liquidity for world-class trophy properties.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">Full Confidentiality</h3>
                <p className="text-xs text-slate-500 mt-1">Strict NDAs for private banking and off-market sellers.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <Video className="w-6 h-6 text-rose-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">Global 4K Distribution</h3>
                <p className="text-xs text-slate-500 mt-1">15M+ impressions across premier social channels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Hubs */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">Global Advisory Desks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="font-bold text-base text-emerald-400">Beverly Hills</div>
              <div className="text-xs text-slate-400 mt-1">Wilshire Boulevard</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="font-bold text-base text-emerald-400">Manhattan</div>
              <div className="text-xs text-slate-400 mt-1">Madison Avenue</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="font-bold text-base text-emerald-400">Dubai</div>
              <div className="text-xs text-slate-400 mt-1">DIFC Gate Towers</div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="font-bold text-base text-emerald-400">London</div>
              <div className="text-xs text-slate-400 mt-1">Mayfair & Berkeley Sq</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
