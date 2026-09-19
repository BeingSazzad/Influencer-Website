'use client';

import React from 'react';
import Link from 'next/link';
import { PROPERTY_CATEGORIES } from '@/Mockdata';
import { ArrowUpRight, Compass } from 'lucide-react';

export function CategoriesSection() {
  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Architectural Typology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Explore by Living Style
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Select your preferred luxury architectural category to view available off-market options.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROPERTY_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/properties?type=${cat.type}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-0.5">
                  {cat.count}
                </div>
                <h3 className="text-lg font-bold font-serif leading-snug group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
