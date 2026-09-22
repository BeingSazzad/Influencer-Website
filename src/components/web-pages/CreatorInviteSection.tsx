'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Sparkles, ArrowRight, ShieldCheck, DollarSign, Award } from 'lucide-react';
import { Button } from 'antd';

export function CreatorInviteSection() {
  const { t } = useAppSelector((state) => state.lang);

  return (
    <section className="py-20 bg-[#FAFAF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0A0A] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-white/10">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2D78]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#F1EEF9]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl lg:max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
              For Creators & Influencers
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-[1.15]">
              {t?.creatorInvite?.title || 'Turn your passion into predictable brand deals.'}
            </h2>

            <p className="text-[18px] text-[#A3A39C] leading-[28px] mt-4 sm:mt-5 mb-8 max-w-2xl">
              {t?.creatorInvite?.subtitle ||
                'Join thousands of verified creators monetizing their content. Set your own prices in EUR, receive upfront funded offers, and never chase unpaid invoices again.'}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 mb-8">
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#FAFAF8] whitespace-nowrap">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#FAFAF8] whitespace-nowrap">
                <DollarSign className="w-5 h-5 text-[#FF2D78] shrink-0" />
                <span>Zero Creator Fee (Keep 100%)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#FAFAF8] whitespace-nowrap">
                <Award className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Vetted Global Brands</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register">
                <button
                  className="h-12 px-8 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-white text-[#0A0A0A] hover:bg-[#FF2D78] hover:text-[#FAFAFA] shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Create Creator Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/how-it-works#creators">
                <button
                  className="h-12 px-6 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all inline-flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                >
                  Learn How Creators Earn
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
