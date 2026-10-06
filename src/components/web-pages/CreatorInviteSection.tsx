'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Sparkles, ArrowRight, ShieldCheck, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui';

export function CreatorInviteSection({ dual = false }: { dual?: boolean }) {
  const { t } = useAppSelector((state) => state.lang);

  return (
    <section className="py-20 bg-[#FAFAF8] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="app-panel-dark p-8 sm:p-14 relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2D78]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#F1EEF9]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl lg:max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
              {dual ? 'For Brands & Creators' : 'For Creators & Influencers'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-[1.15]">
              {dual ? 'Ready to start your next collaboration?' : t?.creatorInvite?.title || 'Turn your passion into predictable brand deals.'}
            </h2>

            <p className="text-[18px] text-[#A3A39C] leading-[28px] mt-4 sm:mt-5 mb-8 max-w-2xl font-medium">
              {dual
                ? 'Brands hire vetted creators with escrow-protected payments. Creators set their own EUR prices and get paid on approval.'
                : t?.creatorInvite?.subtitle ||
                  'Join thousands of verified creators monetizing their content. Set your own prices in EUR, receive upfront funded offers, and never chase unpaid invoices again.'}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 mb-8">
              <div className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-[#FAFAF8] whitespace-nowrap">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-[#FAFAF8] whitespace-nowrap">
                <DollarSign className="w-5 h-5 text-[#FF2D78] shrink-0" />
                <span>0% Platform Fee (Keep 100%)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-[#FAFAF8] whitespace-nowrap">
                <Award className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Vetted Global Brands</span>
              </div>
            </div>

            {dual ? (
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/search"
                  size="lg"
                  variant="white"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  I&apos;m a Brand — Find Creators
                </Button>
                <Button
                  href="/register?role=creator"
                  size="lg"
                  variant="white"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  I&apos;m a Creator — Join Free
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/register"
                  size="lg"
                  variant="white"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  Create Creator Profile
                </Button>
                <Button
                  href="/how-it-works#creators"
                  size="lg"
                  variant="dark-outline"
                >
                  Learn How Creators Earn
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
