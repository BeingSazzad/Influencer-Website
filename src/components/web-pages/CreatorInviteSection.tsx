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
        <div className="bg-[#151515] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-[#262626]">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2B7FFF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#F1EEF9]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2B7FFF]" />
              For Creators & Influencers
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t?.creatorInvite?.title || 'Turn your passion into predictable brand deals.'}
            </h2>

            <p className="text-sm sm:text-base text-[#A3A39C] leading-relaxed">
              {t?.creatorInvite?.subtitle ||
                'Join thousands of verified creators monetizing their content. Set your own prices in EUR, receive upfront funded offers, and never chase unpaid invoices again.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAFAF8]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAFAF8]">
                <DollarSign className="w-4 h-4 text-[#2B7FFF] shrink-0" />
                <span>Zero Creator Fee (Keep 100%)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAFAF8]">
                <Award className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Vetted Global Brands</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/register">
                <Button
                  type="primary"
                  className="h-12 px-8 rounded-full font-extrabold text-xs bg-white text-[#151515] hover:!bg-[#2B7FFF] hover:!text-white border-none shadow-md"
                >
                  Create Creator Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/how-it-works#creators">
                <Button
                  type="default"
                  className="h-12 px-6 rounded-full font-bold text-xs bg-transparent text-white border-white/20 hover:border-white hover:text-white"
                >
                  Learn How Creators Earn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
