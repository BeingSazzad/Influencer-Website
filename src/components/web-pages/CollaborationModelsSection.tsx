'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Video, Share2, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from 'antd';

export function CollaborationModelsSection() {
  const { t } = useAppSelector((state) => state.lang);

  return (
    <section className="py-20 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6E8] text-[#8C6819] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Collaboration Formats
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#151515] tracking-tight">
            {t?.collab?.title || 'Two ways to partner with creators.'}
          </h2>
          <p className="text-sm text-[#73736A] mt-2">
            Choose whether you want high-performing raw ad creative or direct access to a dedicated follower base.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Model 1: UGC & Content Creation */}
          <div className="rounded-3xl p-8 bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#151515] transition-all flex flex-col justify-between relative group">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#23744D]">
                  Ad Creatives & Organic
                </span>
                <h3 className="text-2xl font-black text-[#151515] mt-1">
                  Content Creation (UGC)
                </h3>
                <p className="text-xs text-[#73736A] mt-2 leading-relaxed">
                  Hire top creators to produce authentic video ads, unboxings, tutorials, and aesthetic photography without posting to their channel.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#E7E7E2]">
                {[
                  'Full commercial usage & whitelisting rights included',
                  'Multiple hook variations and raw asset handoffs',
                  'Fast 3-5 day production turnaround',
                  'Escrow funded & protected until you approve final cut',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#151515]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                  className="h-11 rounded-full font-bold text-xs border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white"
                >
                  Explore UGC Creators
                </Button>
              </Link>
            </div>
          </div>

          {/* Model 2: Sponsored Posting */}
          <div className="rounded-3xl p-8 bg-[#151515] text-white border border-[#262626] hover:border-[#404040] transition-all flex flex-col justify-between relative group">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B7FFF]">
                  Audience Reach & Influence
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Sponsored Posting
                </h3>
                <p className="text-xs text-[#A3A39C] mt-2 leading-relaxed">
                  Leverage the creator&apos;s established credibility by sponsoring dedicated Instagram Stories, Reels, TikTok videos, or YouTube integrations.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10">
                {[
                  'Guaranteed organic feed or story placement',
                  'Authentic audience endorsement & bio link tracking',
                  'Verified audience demographics & engagement proof',
                  '15% transparent platform fee with escrow release on post',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-white">
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
                  className="h-11 rounded-full font-bold text-xs bg-white text-[#151515] hover:!bg-[#2B7FFF] hover:!text-white border-none"
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
