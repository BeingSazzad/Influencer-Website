'use client';

import React from 'react';
import { MOCK_REVIEWS } from '@/Mockdata';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Client & Investor Acclaim</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Trusted by Leaders in Private Wealth
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Read how our verified influencer network delivers unmatched discreet acquisitions and record-breaking sale values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 bg-slate-50/80 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative group hover:bg-white hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-emerald-200/70 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <div className="text-sm font-bold text-slate-950">{review.userName}</div>
                  <div className="text-xs text-slate-500">{review.userRole}</div>
                  {review.propertyTitle && (
                    <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Acquired: {review.propertyTitle}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
