'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Instagram,
  Youtube,
  Check,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { Button } from 'antd';

export function DesignMonkBentoSection() {
  const [activePlatform, setActivePlatform] = useState<'all' | 'reels' | 'tiktok' | 'youtube'>('reels');

  const recentHires = [
    { brand: 'Gymshark', creator: 'Liam Carter', format: 'TikTok Viral UGC', price: '€950', time: '4m ago', flag: '🇬🇧' },
    { brand: 'Glossier', creator: 'Sophie Kim', format: 'Instagram Reel + Story', price: '€850', time: '12m ago', flag: '🇩🇪' },
    { brand: 'NordVPN', creator: 'Alex Rivera', format: 'YouTube Dedicated', price: '€1,400', time: '28m ago', flag: '🇪🇸' },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-[#1F1F1F]">
      {/* Background ambient radial gradients matching DesignMonk reference */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/15 via-teal-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold uppercase tracking-widest font-sans shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Creative Agency Performance Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
            Engineered for{' '}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              High-Converting
            </span>{' '}
            Creator Campaigns
          </h2>

          <p className="text-sm sm:text-base text-[#A3A39C] max-w-2xl mx-auto font-sans font-medium leading-relaxed">
            From raw organic UGC ad creative to dedicated 4K influencer sponsorships — experience a frictionless platform designed for top-tier growth marketing.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Viral UGC Conversion Engine (7 cols) */}
          <div className="md:col-span-7 bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-extrabold uppercase tracking-wider font-sans border border-blue-500/30">
                  UGC Creative Lab
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-sans">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +340% Avg ROAS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                Authentic Ad Creative{' '}
                <span className="font-editorial italic font-normal text-white/90">
                  that actually converts.
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-[#A3A39C] leading-relaxed font-sans font-medium">
                Ditch robotic corporate ads. Hire verified creators to deliver high-retention hooks, problem-solution angles, and unboxing videos optimized for Meta & TikTok ads.
              </p>

              {/* Interactive Performance Meter */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
                  <div className="text-[11px] text-[#A3A39C] font-sans font-medium">Avg. Hook Rate</div>
                  <div className="font-editorial text-2xl font-bold text-white mt-0.5">48.2%</div>
                  <div className="text-[10px] text-emerald-400 font-sans font-bold">↑ 2.4x vs Industry</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
                  <div className="text-[11px] text-[#A3A39C] font-sans font-medium">Click-Through (CTR)</div>
                  <div className="font-editorial text-2xl font-bold text-white mt-0.5">3.85%</div>
                  <div className="text-[10px] text-emerald-400 font-sans font-bold">↑ Meta Benchmarks</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
                  <div className="text-[11px] text-[#A3A39C] font-sans font-medium">Turnaround Time</div>
                  <div className="font-editorial text-2xl font-bold text-white mt-0.5">3-5 Days</div>
                  <div className="text-[10px] text-blue-400 font-sans font-bold">⚡ Rapid Delivery</div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Visual Strip */}
            <div className="mt-6 pt-4 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    alt="Sophie Kim"
                  />
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                    alt="Liam Carter"
                  />
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-[#0A0A0A] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                    alt="Elena V"
                  />
                </div>
                <span className="text-xs text-[#A3A39C] font-sans font-medium">
                  340+ UGC creators ready for brief
                </span>
              </div>

              <Link href="/creators?platform=ugc">
                <span className="text-xs font-black text-white hover:text-blue-400 transition-colors flex items-center gap-1 font-sans">
                  Browse UGC Talent <ArrowRight className="w-3.5 h-3.5" />
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

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider font-sans border border-emerald-500/30 inline-block">
                Zero Financial Risk
              </span>

              <h3 className="text-2xl font-black text-white tracking-tight font-sans">
                100% Escrow{' '}
                <span className="font-editorial italic font-normal text-emerald-300">
                  Protection
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-[#A3A39C] leading-relaxed font-sans font-medium">
                Funds remain locked in EU compliant escrow. Creators are paid only when you approve the raw footage or published post.
              </p>

              <div className="space-y-2.5 pt-2 font-sans text-xs">
                <div className="flex items-center gap-2 text-[#FAFAF8]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>48-Hour acceptance guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[#FAFAF8]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Commercial rights contract scaffolded</span>
                </div>
                <div className="flex items-center gap-2 text-[#FAFAF8]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No monthly subscriptions or hidden charges</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-sans">
              <span className="text-[11px] text-[#A3A39C]">European Banking Standard</span>
              <span className="text-xs font-bold text-white">15% Transparent Fee</span>
            </div>
          </div>

          {/* Bento Card 3: Live Campaign Feed & Instant Settlement (6 cols) */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white font-sans">
                  Live Deals & Settlements
                </span>
              </div>
              <span className="text-[11px] text-[#A3A39C] font-sans font-medium">Real-time Stream</span>
            </div>

            <div className="space-y-2.5">
              {recentHires.map((deal, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/5 transition-all flex items-center justify-between font-sans"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{deal.flag}</span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{deal.brand}</span>
                        <span className="text-[#73736A]">→</span>
                        <span className="text-blue-300">{deal.creator}</span>
                      </div>
                      <div className="text-[10px] text-[#A3A39C]">{deal.format}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-editorial text-sm font-bold text-emerald-400">{deal.price}</div>
                    <div className="text-[10px] text-[#73736A]">{deal.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#73736A] font-sans text-center pt-1">
              Over €1,450,000 processed safely through Influverse escrow this quarter.
            </p>
          </div>

          {/* Bento Card 4: Verified Multi-Platform Matrix (6 cols) */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-extrabold uppercase tracking-wider font-sans border border-purple-500/30">
                Audience Authenticity
              </span>
              <span className="text-xs text-[#A3A39C] font-sans font-medium">API Authenticated</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
              1st-Party Verified Data{' '}
              <span className="font-editorial italic font-normal text-purple-300">
                zero fake followers.
              </span>
            </h3>

            {/* Platform Badges with Engagement Ratios */}
            <div className="grid grid-cols-3 gap-2.5 font-sans">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <Instagram className="w-3 h-3" />
                </div>
                <div className="text-xs font-black text-white">6.8% ER</div>
                <div className="text-[9px] text-[#A3A39C]">Instagram Reel</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-black">
                  ♪
                </div>
                <div className="text-xs font-black text-white">11.4% ER</div>
                <div className="text-[9px] text-[#A3A39C]">TikTok Viral</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                  <Youtube className="w-3 h-3" />
                </div>
                <div className="text-xs font-black text-white">14.2m View</div>
                <div className="text-[9px] text-[#A3A39C]">YouTube Avg</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#A3A39C] font-sans">
                Filtered across 850+ vetted European creators
              </span>
              <Link href="/creators">
                <Button
                  type="primary"
                  className="rounded-full h-9 px-5 text-xs font-bold bg-white text-[#0A0A0A] hover:!bg-blue-500 hover:!text-white border-none font-sans"
                >
                  Explore Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
