'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_MARKET_INSIGHTS } from '@/Mockdata';
import { TrendingUp, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';

export function MarketInsightsSection() {
  return (
    <section id="insights" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Proprietary Market Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Influencer Media & Wealth Insights
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mt-2">
              Expert articles on international capital movement, luxury property valuation, and architectural trends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_MARKET_INSIGHTS.map((insight) => (
            <article
              key={insight.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  {insight.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {insight.readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {insight.views} reads</span>
                  </div>
                  <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-emerald-700 transition-colors mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {insight.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={insight.authorAvatar}
                      alt={insight.author}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-800">{insight.author}</span>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
