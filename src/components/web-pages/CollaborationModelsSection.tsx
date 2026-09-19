'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Video, Share2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from 'antd';

export function CollaborationModelsSection() {
  const { t } = useAppSelector((state) => state.lang);

  return (
    <section className="py-24 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6E8] text-[#8C6819] text-[11px] font-bold uppercase tracking-wider font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            Collaboration Formats
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight font-sans">
            Two ways to partner{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              with creators.
            </span>
          </h2>
          <p className="text-sm text-[#73736A] font-sans font-medium">
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
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#23744D] font-sans">
                  Ad Creatives & Organic
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] mt-1 font-sans">
                  Content Creation{' '}
                  <span className="font-editorial italic font-normal text-[#0A0A0A]">(UGC)</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#73736A] mt-2.5 leading-relaxed font-sans font-medium">
                  Hire top creators to produce authentic video ads, unboxings, tutorials, and aesthetic photography without posting to their channel.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E7E7E2]">
                {[
                  'Full commercial usage & whitelisting rights included',
                  'Multiple hook variations and raw asset handoffs',
                  'Fast 3-5 day production turnaround',
                  'Escrow funded & protected until you approve final cut',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-[#0A0A0A] font-sans">
                    <Check className="w-4 h-4 text-[#23744D] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link href="/creators?platform=ugc">
                <Button
                  type="default"
                  block
                  className="h-12 rounded-full font-bold text-xs border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all font-sans"
                >
                  Explore UGC Creators
                </Button>
              </Link>
            </div>
          </div>

          {/* Model 2: Sponsored Posting */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#0A0A0A] text-white border border-[#262626] hover:border-[#404040] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Share2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B7FFF] font-sans">
                  Audience Reach & Influence
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-sans">
                  Sponsored{' '}
                  <span className="font-editorial italic font-normal text-white">Posting</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A39C] mt-2.5 leading-relaxed font-sans font-medium">
                  Leverage the creator&apos;s established credibility by sponsoring dedicated Instagram Stories, Reels, TikTok videos, or YouTube integrations.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                {[
                  'Guaranteed organic feed or story placement',
                  'Authentic audience endorsement & bio link tracking',
                  'Verified audience demographics & engagement proof',
                  '15% transparent platform fee with escrow release on post',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-bold text-white font-sans">
                    <Check className="w-4 h-4 text-[#2B7FFF] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link href="/creators">
                <Button
                  type="primary"
                  block
                  className="h-12 rounded-full font-bold text-xs bg-white text-[#0A0A0A] hover:!bg-[#2B7FFF] hover:!text-white border-none transition-all font-sans"
                >
                  Browse Influencers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
