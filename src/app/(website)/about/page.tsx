'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Globe2,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Coins,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import { Button } from 'antd';

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Verified Creators', sub: 'Audited audience demographics & authentic reach' },
    { number: '€4.2M+', label: 'Escrow Volume Paid', sub: '100% milestone protected & guaranteed payouts' },
    { number: '99.8%', label: 'On-Time Delivery', sub: 'Contracted briefs with milestone reviews' },
    { number: '15%', label: 'Flat Platform Fee', sub: 'Zero surprise deductions on creator payouts' },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      color: 'text-[#23744D]',
      bg: 'bg-[#EEF7F2]',
      title: 'Ironclad 15% Escrow Protection',
      desc: 'Brands fund contracts upfront into secure escrow. Creators start work with guaranteed milestone release upon deliverable approval.',
    },
    {
      icon: Zap,
      color: 'text-[#FF2D78]',
      bg: 'bg-[#FFF0F5]',
      title: 'Zero Friction Collaboration',
      desc: 'From initial offer to brief sign-off, live chat, video revisions, and rights licensing, everything happens in one integrated workspace.',
    },
    {
      icon: Globe2,
      color: 'text-[#6444A6]',
      bg: 'bg-[#F1EEF9]',
      title: 'Global EUR (€) Standard',
      desc: 'Direct SEPA, SWIFT, and international bank payouts in EUR with standardized European commercial invoicing and VAT compliance.',
    },
    {
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      title: 'First-Party Verified Metrics',
      desc: 'Direct API integrations with Instagram, TikTok, and YouTube guarantee authentic engagement metrics and real creator audience data.',
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'The Inception',
      desc: 'Founded with a single core mission: eliminate ghosting, unpaid creator invoices, and mismatched brand deliverables through automated escrow.',
    },
    {
      year: '2025',
      title: 'Standardizing UGC & Commercial Rights',
      desc: 'Introduced transparent tiered UGC licensing, multi-platform briefs, and instant milestone mediation.',
    },
    {
      year: '2026',
      title: 'The Pan-European Creator Economy',
      desc: 'Powering thousands of creator businesses and D2C brands across Paris, London, Berlin, Amsterdam, and worldwide.',
    },
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#0A0A0A] font-sans">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 border-b border-[#E7E7E2] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
            <span>Our Mission & Story</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.1] max-w-4xl mx-auto">
            The Trust Layer for the Modern Creator Economy
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#73736A] font-medium leading-relaxed max-w-2xl mx-auto">
            Influverse bridges high-growth brands with verified digital creators through transparent pricing, guaranteed escrow, and frictionless contract fulfillment.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/creators">
              <Button
                type="primary"
                size="large"
                className="h-12 px-7 rounded-full bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <span>Explore Creators</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="large"
                className="h-12 px-7 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] hover:!border-[#0A0A0A] font-bold text-sm shadow-xs transition-all"
              >
                How Escrow Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#FF2D78]/5 via-[#6444A6]/5 to-[#23744D]/5 blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 bg-white border-b border-[#E7E7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2] text-center sm:text-left space-y-2 hover:border-[#0A0A0A] transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-[#0A0A0A]">
                  {stat.label}
                </div>
                <div className="text-xs text-[#73736A] leading-relaxed">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY & PILLARS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-xs font-bold text-[#73736A] uppercase tracking-wider mb-3">
            Why Influverse
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
            Built for Transparency, Safety, and Results
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#73736A] font-medium leading-relaxed">
            We removed the chaos of DM negotiations, vague pricing, and delayed payments to give creators and brands a professional platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E7E7E2] shadow-xs space-y-4 hover:shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#0A0A0A]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#73736A] leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. STORY & TIMELINE */}
      <section className="py-20 bg-white border-y border-[#E7E7E2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              Our Journey So Far
            </h2>
            <p className="mt-2 text-sm text-[#73736A] font-medium">
              From an ambitious creator tool to a full-stack European marketplace.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2]"
              >
                <div className="px-4 py-2 rounded-2xl bg-[#0A0A0A] text-white font-black text-lg shrink-0">
                  {m.year}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A]">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[#73736A] leading-relaxed font-medium">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DUAL CTA */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] text-white text-center space-y-6 relative overflow-hidden shadow-md">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-[#FF2D78]" />
              <span>Ready to Collaborate?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Start Your Next Creator Campaign Today
            </h2>
            <p className="text-sm sm:text-base text-[#A3A39C] leading-relaxed">
              Join thousands of creators earning predictable income and brands scaling high-converting UGC campaigns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10">
            <Link href="/register?role=brand">
              <Button
                type="primary"
                size="large"
                className="h-12 px-7 rounded-full bg-[#FF2D78] hover:!bg-[#E01E69] !text-white font-bold text-sm border-0 shadow-sm"
              >
                Hire Creators as a Brand
              </Button>
            </Link>
            <Link href="/register?role=creator">
              <Button
                size="large"
                className="h-12 px-7 rounded-full bg-white/10 hover:!bg-white/20 !text-white border-white/20 font-bold text-sm"
              >
                Join as a Creator
              </Button>
            </Link>
          </div>

          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2D78]/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
