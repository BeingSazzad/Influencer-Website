'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Search, Send, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Video, ArrowRight } from 'lucide-react';
import { Button } from 'antd';

export function HowItWorksSection() {
  const { t } = useAppSelector((state) => state.lang);
  const [activeTab, setActiveTab] = useState<'brand' | 'creator'>('brand');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#creators') {
        setActiveTab('creator');
      }
      const handleHashChange = () => {
        if (window.location.hash === '#creators') {
          setActiveTab('creator');
        } else if (window.location.hash === '#brands') {
          setActiveTab('brand');
        }
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
            How Influverse{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              Works
            </span>
          </h2>
          <p className="text-[18px] leading-[28px] text-[#73736A] font-sans font-medium mt-4 sm:mt-5 mb-8">
            A seamless, protected four-step workflow built on transparent escrow and verified delivery.
          </p>

          {/* Interactive Dual Perspective Toggle */}
          <div id="creators" className="scroll-mt-28" />
          <div id="brands" className="scroll-mt-28" />
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#E7E7E2] shadow-xs">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-7 py-2.5 rounded-full font-outfit font-bold text-[16px] leading-[20px] transition-all ${
                activeTab === 'brand'
                  ? 'bg-[#0A0A0A] text-[#FAFAFA] shadow-sm'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              For Brands & Marketers
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-7 py-2.5 rounded-full font-outfit font-bold text-[16px] leading-[20px] transition-all ${
                activeTab === 'creator'
                  ? 'bg-[#FF2D78] text-[#FAFAFA] shadow-sm'
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
                    <span className="font-sans text-3xl font-black text-[#D2D2CA] group-hover:text-[#0A0A0A] transition-colors tracking-tight">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-2 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#555550] leading-[22px] font-sans font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4F4F0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] font-sans">
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
            <button
              className="h-12 sm:h-[52px] px-8 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-[#0A0A0A] hover:bg-[#FF2D78] text-[#FAFAFA] shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>{activeTab === 'brand' ? 'Start Browsing Creators' : 'Apply as a Creator'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
