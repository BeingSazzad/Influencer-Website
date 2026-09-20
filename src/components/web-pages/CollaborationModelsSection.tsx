'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Video, Share2, Check, ArrowRight, Sparkles } from 'lucide-react';

export function CollaborationModelsSection() {
  const { t } = useAppSelector((state) => state.lang);

  return (
    <section className="py-24 bg-white border-y border-[#E7E7E2] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6E8] text-[#8C6819] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Collaboration Formats
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
            Two ways to partner{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              with creators.
            </span>
          </h2>
          <p className="text-[18px] text-[#73736A] font-medium leading-[28px] mt-4 sm:mt-5">
            Choose whether you want high-performing raw ad creative or direct access to a dedicated follower base.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Model 1: UGC & Content Creation */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#23744D]">
                  Ad Creatives & Organic
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-1">
                  Content Creation{' '}
                  <span className="font-editorial italic font-normal text-[#0A0A0A]">(UGC)</span>
                </h3>
                <p className="text-[16px] text-[#555550] mt-2.5 leading-[26px] font-medium">
                  Hire top creators to produce authentic video ads, unboxings, tutorials, and aesthetic photography without posting to their channel.
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-[#E7E7E2]">
                {[
                  'Full commercial usage & whitelisting rights included',
                  'Multiple hook variations and raw asset handoffs',
                  'Fast 3-5 day production turnaround',
                  'Escrow funded & protected until you approve final cut',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-bold text-[#0A0A0A]">
                    <Check className="w-5 h-5 text-[#23744D] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link href="/creators?platform=ugc" className="block">
                <button
                  className="w-full h-12 rounded-full font-outfit font-bold text-[16px] leading-[20px] border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-all cursor-pointer hover:scale-102 active:scale-98 whitespace-nowrap"
                >
                  Explore UGC Creators
                </button>
              </Link>
            </div>
          </div>

          {/* Model 2: Sponsored Posting */}
          <div className="rounded-3xl p-8 sm:p-10 overflow-hidden bg-[#0A0A0A] bg-[linear-gradient(145deg,#141414_0%,#0A0A0A_58%,#160B10_100%)] text-white border border-[#3A2730] hover:border-[#573344] shadow-[0_18px_45px_-28px_rgba(10,10,10,0.65)] hover:shadow-[0_24px_55px_-30px_rgba(255,45,120,0.28)] transition-all duration-300 flex flex-col justify-between relative group">
            <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#FF2D78]/20 blur-[95px] pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute -top-20 right-10 w-52 h-52 rounded-full bg-[#7C3AED]/10 blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Share2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF2D78]">
                  Audience Reach & Influence
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Sponsored{' '}
                  <span className="font-editorial italic font-normal text-white">Posting</span>
                </h3>
                <p className="text-[16px] text-[#A3A39C] mt-2.5 leading-[26px] font-medium">
                  Leverage the creator&apos;s established credibility by sponsoring dedicated Instagram Stories, Reels, TikTok videos, or YouTube integrations.
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-white/10">
                {[
                  'Guaranteed organic feed or story placement',
                  'Authentic audience endorsement & bio link tracking',
                  'Verified audience demographics & engagement proof',
                  '15% transparent platform fee with escrow release on post',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-bold text-white">
                    <Check className="w-5 h-5 text-[#FF2D78] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <Link href="/creators" className="block">
                <button
                  className="w-full h-12 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-white text-[#0A0A0A] hover:bg-[#FF2D78] hover:text-[#FAFAFA] transition-all cursor-pointer hover:scale-102 active:scale-98 shadow-sm whitespace-nowrap"
                >
                  Browse Influencers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
