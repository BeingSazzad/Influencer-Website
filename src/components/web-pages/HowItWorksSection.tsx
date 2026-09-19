'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Search, Send, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Video, ArrowRight } from 'lucide-react';
import { Button } from 'antd';

export function HowItWorksSection() {
  const { t } = useAppSelector((state) => state.lang);
  const [activeTab, setActiveTab] = useState<'brand' | 'creator'>('brand');

  const brandSteps = [
    {
      step: '01',
      title: 'Discover & Shortlist',
      desc: 'Filter verified creators across Instagram, TikTok, and YouTube by audience size, engagement, niche, and transparent package pricing in EUR (€).',
      icon: Search,
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Send Offer & Escrow Deposit',
      desc: 'Select a package or define a custom brief. Pay creator base price + 15% platform fee into secure escrow. Creator gets 48 hours to accept.',
      icon: CreditCard,
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Review Draft & Approve',
      desc: 'Collaborate via direct order messaging. Review uploaded deliverables, request minor adjustments, or approve with one click.',
      icon: Video,
      badge: 'Step 3',
    },
    {
      step: '04',
      title: 'Escrow Released & Post Live',
      desc: 'Once approved, the creator publishes the content or delivers raw files, and escrow funds are safely released to the creator wallet.',
      icon: ShieldCheck,
      badge: 'Step 4',
    },
  ];

  const creatorSteps = [
    {
      step: '01',
      title: 'Set Up Your Rate Card',
      desc: 'Create preset packages for Stories, Reels, TikToks, and UGC with your exact EUR prices, delivery timelines, and revision allowances.',
      icon: Sparkles,
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Receive Funded Offers',
      desc: 'Get notified of incoming brand offers with pre-funded escrow deposits. Review campaign briefs, deadlines, and accept or counter.',
      icon: Send,
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Create & Submit Content',
      desc: 'Produce high-quality content following the agreed brief. Upload draft video previews or Google Drive links directly to the order workspace.',
      icon: Video,
      badge: 'Step 3',
    },
    {
      step: '04',
      title: 'Get Paid Instantly',
      desc: 'Upon brand approval, receive 100% of your listed creator price directly to your balance with zero hidden deductions on your end.',
      icon: CheckCircle2,
      badge: 'Step 4',
    },
  ];

  const currentSteps = activeTab === 'brand' ? brandSteps : creatorSteps;

  return (
    <section id="how-it-works" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight font-sans">
            How Influverse{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              Works
            </span>
          </h2>
          <p className="text-sm text-[#73736A] font-sans font-medium">
            A seamless, protected four-step workflow built on transparent escrow and verified delivery.
          </p>

          {/* Interactive Dual Perspective Toggle */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#E7E7E2] shadow-xs mt-6">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-7 py-2.5 rounded-full text-xs font-bold transition-all font-sans ${
                activeTab === 'brand'
                  ? 'bg-[#0A0A0A] text-white shadow-sm'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              For Brands & Marketers
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-7 py-2.5 rounded-full text-xs font-bold transition-all font-sans ${
                activeTab === 'creator'
                  ? 'bg-[#2B7FFF] text-white shadow-sm'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              For Creators & Talent
            </button>
          </div>
        </div>

        {/* 4 Steps Grid with Playfair Display Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#E7E7E2] flex flex-col justify-between hover:border-[#0A0A0A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-editorial text-3xl font-black text-[#D2D2CA] group-hover:text-[#0A0A0A] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-[#0A0A0A] mb-2 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#73736A] leading-relaxed font-sans font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4F4F0]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#73736A] font-sans">
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Bottom */}
        <div className="mt-14 text-center">
          <Link href={activeTab === 'brand' ? '/creators' : '/register'}>
            <Button
              type="primary"
              className="h-12 px-8 rounded-full font-black text-xs bg-[#0A0A0A] hover:!bg-[#2B7FFF] text-white border-none shadow-sm transition-all font-sans"
            >
              {activeTab === 'brand' ? 'Start Browsing Creators' : 'Apply as a Creator'}
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
