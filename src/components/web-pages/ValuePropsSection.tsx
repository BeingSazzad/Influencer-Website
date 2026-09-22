'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Search, Zap, TrendingUp, ShieldCheck, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

export function ValuePropsSection() {
  const { t } = useAppSelector((state) => state.lang);

  const valueProps = [
    {
      step: '01',
      icon: Search,
      iconBg: 'bg-[#0A0A0A]',
      iconColor: 'text-white',
      badge: '10,000+ Vetted',
      badgeBg: 'bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2]',
      accentBorder: 'group-hover:border-[#0A0A0A]',
      accentGlow: 'from-[#0A0A0A]/10 to-transparent',
      title: 'Find creators',
      description: 'Search vetted creators across all platforms and niches with verified reach.',
    },
    {
      step: '02',
      icon: Zap,
      iconBg: 'bg-[#EEF7F2]',
      iconColor: 'text-[#23744D]',
      badge: 'Zero Ghosting',
      badgeBg: 'bg-[#EEF7F2] text-[#23744D]',
      accentBorder: 'group-hover:border-[#23744D]',
      accentGlow: 'from-[#23744D]/10 to-transparent',
      title: 'Build partnerships',
      description: 'Connect, collaborate and manage briefs and assets in one unified workspace.',
    },
    {
      step: '03',
      icon: TrendingUp,
      iconBg: 'bg-[#FAF6E8]',
      iconColor: 'text-[#8C6819]',
      badge: '1st-Party Reach',
      badgeBg: 'bg-[#FAF6E8] text-[#8C6819]',
      accentBorder: 'group-hover:border-[#8C6819]',
      accentGlow: 'from-[#8C6819]/10 to-transparent',
      title: 'Drive real results',
      description: 'Boost your brand with authentic storytelling and content that actually converts.',
    },
    {
      step: '04',
      icon: ShieldCheck,
      iconBg: 'bg-[#FFF0F5]',
      iconColor: 'text-[#FF2D78]',
      badge: '100% Escrow',
      badgeBg: 'bg-[#FFF0F5] text-[#FF2D78]',
      accentBorder: 'group-hover:border-[#FF2D78]',
      accentGlow: 'from-[#FF2D78]/10 to-transparent',
      title: 'Secure & simple',
      description: 'Built-in payments, contracted scope and milestone escrow protection for both sides.',
    },
    {
      step: '05',
      icon: Heart,
      iconBg: 'bg-[#FDF0ED]',
      iconColor: 'text-[#C75D47]',
      badge: 'Scale With You',
      badgeBg: 'bg-[#FDF0ED] text-[#C75D47]',
      accentBorder: 'group-hover:border-[#C75D47]',
      accentGlow: 'from-[#C75D47]/10 to-transparent',
      title: 'For every brand',
      description: 'From ambitious direct-to-consumer startups to global agency rosters.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFAF8] relative overflow-hidden font-sans border-b border-[#E7E7E2]">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#FF2D78]/5 via-[#F1EEF9]/20 to-[#23744D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
            <span className="uppercase tracking-wider">Platform Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.12]">
            Everything you need.{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A] block">
              In one place.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#73736A] font-medium leading-[28px] max-w-xl mx-auto">
            A frictionless marketplace engineered for modern marketing teams and high-caliber creators.
          </p>
        </div>

        {/* 5-Column Premium Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E7E2] transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1.5 hover:border-[#0A0A0A] group overflow-hidden shadow-2xs`}
              >
                {/* Subtle top hover glow */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b ${prop.accentGlow} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top Row: Icon + Step Counter */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl ${prop.iconBg} ${prop.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xs`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-black tracking-wider text-[#D2D2CA] group-hover:text-[#0A0A0A] transition-colors font-sans">
                      {prop.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-black text-[#0A0A0A] mb-2 tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73736A] leading-[22px] font-medium">
                    {prop.description}
                  </p>
                </div>

                {/* Bottom Value Badge */}
                <div className="pt-6 mt-4 border-t border-[#E7E7E2]/70 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight ${prop.badgeBg}`}
                  >
                    {prop.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2CA] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
