'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  Check,
  ArrowRight,
  Lock,
} from 'lucide-react';

export function DesignMonkBentoSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-[#1F1F1F]">
      {/* Background ambient radial gradients matching DesignMonk reference */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/15 via-teal-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold uppercase tracking-widest font-sans shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
            <span>Creative Agency Performance Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-[1.15] font-sans">
            Engineered for{' '}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">
              High-Converting
            </span>{' '}
            Creator Campaigns
          </h2>

          <p className="text-[18px] text-[#A3A39C] max-w-2xl mx-auto font-sans font-medium leading-[28px] mt-4 sm:mt-5">
            From raw organic UGC ad creative to dedicated 4K influencer sponsorships — experience a frictionless platform designed for top-tier growth marketing.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Viral UGC Conversion Engine (7 cols) */}
          <div className="md:col-span-7 bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#FF2D78]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#FF2D78]/20 text-[#FF2D78] text-xs font-extrabold uppercase tracking-wider font-sans border border-[#FF2D78]/30">
                  UGC Creative Lab
                </span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-sans">
                  <TrendingUp className="w-4 h-4" />
                  +340% Avg ROAS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                Authentic Ad Creative{' '}
                <span className="font-editorial italic font-normal text-white/90">
                  that actually converts.
                </span>
              </h3>

              <p className="text-[16px] text-[#A3A39C] leading-[26px] font-sans font-medium">
                Ditch robotic corporate ads. Hire verified creators to deliver high-retention hooks, problem-solution angles, and unboxing videos optimized for Meta & TikTok ads.
              </p>

              {/* Interactive Performance Meter */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-sm text-[#A3A39C] font-sans font-medium">Avg. Hook Rate</div>
                  <div className="font-sans text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">48.2%</div>
                  <div className="text-sm text-emerald-400 font-sans font-bold mt-0.5">↑ 2.4x vs Industry</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-sm text-[#A3A39C] font-sans font-medium">Click-Through (CTR)</div>
                  <div className="font-sans text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">3.85%</div>
                  <div className="text-sm text-emerald-400 font-sans font-bold mt-0.5">↑ Meta Benchmarks</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-sm text-[#A3A39C] font-sans font-medium">Turnaround Time</div>
                  <div className="font-sans text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">3-5 Days</div>
                  <div className="text-sm text-[#FF2D78] font-sans font-bold mt-0.5">⚡ Rapid Delivery</div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Visual Strip */}
            <div className="mt-6 pt-4 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    alt="Sophie Kim"
                  />
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                    alt="Liam Carter"
                  />
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                    alt="Elena V"
                  />
                </div>
                <span className="text-sm text-[#A3A39C] font-sans font-medium">
                  340+ UGC creators ready for brief
                </span>
              </div>

              <Link href="/creators?platform=ugc">
                <span className="text-sm font-black text-white hover:text-[#FF2D78] transition-colors flex items-center gap-1.5 font-sans">
                  Browse UGC Talent <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Bento Card 2: 100% Escrow Vault & Guarantee (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-20 -left-20 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6" />
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider font-sans border border-emerald-500/30 inline-block">
                Zero Financial Risk
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                100% Escrow{' '}
                <span className="font-editorial italic font-normal text-emerald-300">
                  Protection
                </span>
              </h3>

              <p className="text-[16px] text-[#A3A39C] leading-[26px] font-sans font-medium">
                Funds remain locked in EU compliant escrow. Creators are paid only when you approve the raw footage or published post.
              </p>

              <div className="space-y-3 pt-2 font-sans text-sm sm:text-base">
                <div className="flex items-center gap-2.5 text-[#FAFAF8] font-medium">
                  <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>48-Hour acceptance guarantee</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#FAFAF8] font-medium">
                  <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>Commercial rights contract scaffolded</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#FAFAF8] font-medium">
                  <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>No monthly subscriptions or hidden charges</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-sans">
              <span className="text-sm text-[#A3A39C] font-medium">European Banking Standard</span>
              <span className="text-sm font-bold text-white">15% Transparent Fee</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
