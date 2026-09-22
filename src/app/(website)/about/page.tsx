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
  TrendingUp,
  HeartHandshake,
  Camera,
  Check,
  Building2,
  User,
  Star,
  Receipt,
  FileCheck2,
} from 'lucide-react';
import { Button } from 'antd';

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Verified Creators', sub: 'Audited audience demographics & authentic reach' },
    { number: '€4.2M+', label: 'Escrow Volume Paid', sub: '100% milestone-protected & guaranteed payouts' },
    { number: '99.8%', label: 'On-Time Delivery', sub: 'Contracted briefs with milestone reviews' },
    { number: '15%', label: 'Flat Platform Fee', sub: 'Zero surprise deductions on creator earnings' },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Milestone Escrow Integrity',
      desc: 'Campaign funds are deposited into neutral escrow before production starts. Creators work with peace of mind, and brands release payment only when deliverables match agreed specifications.',
    },
    {
      icon: CheckCircle2,
      title: 'First-Party Truth & Verified Metrics',
      desc: 'We bypass self-reported media kits and inflated screenshots. Our direct API integrations with Instagram, TikTok, and YouTube guarantee authentic engagement and genuine audience reach.',
    },
    {
      icon: Sparkles,
      title: 'Radical Pricing Transparency',
      desc: 'A simple, flat 15% platform fee with zero hidden margins. Creators see exactly what they take home, and brands know exactly where their marketing spend goes.',
    },
    {
      icon: Globe2,
      title: 'Pan-European Commercial Standard',
      desc: 'Automated EU VAT calculation, reverse-charge B2B compliance, and instant SEPA bank payouts in EUR. We make cross-border European creator campaigns as simple as local commerce.',
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'The Inception',
      desc: 'Founded in Paris & Berlin to solve a fundamental problem: 73% of digital creators experienced unpaid or delayed invoices, while brands struggled with ghosting and unverified reach. We built the first automated escrow protocol tailored for creator briefs.',
    },
    {
      year: '2025',
      title: 'Standardizing Commercial Rights',
      desc: 'Introduced standardized multi-platform deliverable packages, 30-day to perpetual UGC commercial licensing, and built-in revision management to remove ambiguity from contract scopes.',
    },
    {
      year: '2026',
      title: 'The Pan-European Standard',
      desc: 'Scaling to thousands of vetted creators and premier D2C brands across Paris, Berlin, London, Amsterdam, and Milan—processing millions in secure milestone disbursements.',
    },
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#0A0A0A] font-sans">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-[#E7E7E2] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] shadow-2xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
            <span>The Trust Layer for the Creator Economy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Where world-class creators and ambitious brands build lasting partnerships.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#73736A] font-medium leading-relaxed max-w-2xl mx-auto">
            Influverse removes the friction, ghosting, and payment delays from influencer marketing. We provide the infrastructure of transparent pricing, verified reach, and guaranteed milestone escrow.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/creators">
              <button className="h-12 px-7 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                <span>Explore Verified Creators</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="h-12 px-7 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] font-bold text-sm shadow-2xs transition-all cursor-pointer">
                How Escrow Protects Both Sides
              </button>
            </Link>
          </div>
        </div>

        {/* HERO PHOTOGRAPHIC MOSAIC */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Left: Professional Creator Studio */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden border border-[#E7E7E2] group shadow-sm bg-black min-h-[340px] md:min-h-auto">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80"
                alt="Creator with professional camera in studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Creator Sovereignty
                </span>
                <h3 className="text-lg font-black leading-snug">
                  Filmmakers, stylists, and digital storytellers with verified engagement.
                </h3>
              </div>
            </div>

            {/* Center: Live Escrow & Product Aesthetic */}
            <div className="md:col-span-4 flex flex-col gap-5">
              {/* Product Aesthetic Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E7E7E2] group shadow-sm h-48 bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury skincare and aesthetic brand product presentation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5 text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      Brand Product Integration
                    </span>
                    <h4 className="text-sm font-black">
                      High-converting UGC designed for modern European commerce.
                    </h4>
                  </div>
                </div>
              </div>

              {/* Escrow Highlight Box */}
              <div className="p-6 rounded-3xl bg-[#0A0A0A] text-white flex-1 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/90">
                    100% Escrow Backed
                  </span>
                </div>
                <div className="space-y-1 mt-4">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight">€4,200,000+</div>
                  <p className="text-xs text-[#A3A39C] leading-relaxed">
                    Zero creator invoice defaults. Guaranteed milestone releases on delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Collaborative Brand Workspace */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden border border-[#E7E7E2] group shadow-sm bg-black min-h-[340px] md:min-h-auto">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Brand marketing team reviewing campaign creative"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Enterprise Reliability
                </span>
                <h3 className="text-lg font-black leading-snug">
                  European D2C, beauty, and tech brands scaling performance marketing.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-14 bg-white border-b border-[#E7E7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2] text-center sm:text-left space-y-1.5 hover:border-[#0A0A0A] transition-colors"
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

      {/* 3. MISSION & VISION (THE CORE PURPOSE) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#73736A] uppercase tracking-wider">
            Our Purpose & Beliefs
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
            Our Mission & Vision
          </h2>
          <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed">
            We are building the economic infrastructure to make influencer collaborations as trustworthy, transparent, and predictable as traditional commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Our Mission</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight leading-snug">
                Make creative labor financially secure, predictable, and universally respected.
              </h3>
              <p className="text-sm sm:text-base text-[#555550] leading-relaxed font-normal">
                Independent creators are the vanguard of digital media, yet they often operate without standard commercial protections. Our mission is to end the cycle of unpaid invoices, 90-day waiting periods, and ambiguous revisions. By securing capital in milestone escrow before production begins, we ensure creators are fairly compensated for their craft.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E7E2] space-y-3">
              <div className="text-xs font-bold text-[#73736A] uppercase tracking-wider">
                What this means for creators:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#23744D] shrink-0" />
                  <span>Guaranteed Escrow Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#23744D] shrink-0" />
                  <span>Contractual Scope Limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#23744D] shrink-0" />
                  <span>Standardized Rate Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#23744D] shrink-0" />
                  <span>Direct SEPA EUR Banking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FE] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight leading-snug">
                Empower ambitious brands to scale authentic human storytelling without risk.
              </h3>
              <p className="text-sm sm:text-base text-[#555550] leading-relaxed font-normal">
                Modern consumers no longer convert on anonymous studio advertisements—they buy from storytellers they trust. Our vision is a friction-free European marketplace where brand founders and marketing leads can effortlessly discover vetted creator talent, license high-impact UGC, and track genuine ROI without worrying about missed deadlines or fabricated vanity metrics.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E7E2] space-y-3">
              <div className="text-xs font-bold text-[#73736A] uppercase tracking-wider">
                What this means for brands:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Verified 1st-Party Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Milestone-Gated Fund Release</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Compliant EU B2B Invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Guaranteed Turnaround Times</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TWO SIDES: BUILT FOR BRANDS & CREATORS */}
      <section className="py-20 bg-white border-y border-[#E7E7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              A Balanced Marketplace
            </h2>
            <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed">
              Influverse is purposefully designed with equal care for the brand hiring and the creator delivering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Brand Box */}
            <div className="bg-[#FAFAF8] rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="h-56 rounded-2xl overflow-hidden border border-[#E7E7E2] relative">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                    alt="Brand design studio and campaign strategy workspace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#0A0A0A] text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>For Brand Teams</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">
                    Precision, Speed, and Capital Security
                  </h3>
                  <p className="text-sm text-[#555550] leading-relaxed">
                    Say goodbye to messy spreadsheets and unvetted creators. Discover creators by platform, niche, and engagement rate, send custom campaign offers in minutes, and manage all deliverables through a single dashboard.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2]">
                <Link href="/creators">
                  <button className="h-11 px-6 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer">
                    <span>Browse Creator Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Creator Box */}
            <div className="bg-[#FAFAF8] rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="h-56 rounded-2xl overflow-hidden border border-[#E7E7E2] relative">
                  <img
                    src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80"
                    alt="Digital creator working on video editing and storytelling"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#0A0A0A] text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>For Independent Creators</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">
                    Clear Rate Cards, Respect, and On-Time Income
                  </h3>
                  <p className="text-sm text-[#555550] leading-relaxed">
                    Stop working for free product samples or chasing unpaid invoices across WhatsApp. Set transparent package rates, receive formal campaign briefs, and have earnings released directly into your European bank account.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2]">
                <Link href="/how-it-works#creators">
                  <button className="h-11 px-6 rounded-full bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] font-bold text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer">
                    <span>Creator Workflow Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE OPERATING PRINCIPLES */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-xs font-bold text-[#73736A] uppercase tracking-wider">
            Our Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
            The Principles That Guide Us
          </h2>
          <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed">
            Every feature we build and policy we enforce is anchored in four uncompromising values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E7E7E2] shadow-2xs space-y-3.5 hover:border-[#0A0A0A] hover:shadow-xs transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A]">
                  {val.title}
                </h3>
                <p className="text-sm text-[#73736A] leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. TIMELINE & MILESTONES */}
      <section className="py-20 bg-white border-y border-[#E7E7E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              Our Journey
            </h2>
            <p className="text-sm text-[#73736A] font-medium">
              From an ambitious escrow tool to the European marketplace benchmark.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-7 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2] hover:border-[#0A0A0A] transition-colors"
              >
                <div className="px-4 py-2 rounded-2xl bg-[#0A0A0A] text-white font-black text-sm shrink-0">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-[#0A0A0A]">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[#73736A] leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INVITATION CTA */}
      <section className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0A0A0A] text-white text-center space-y-8 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Join the Movement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Be part of the new standard in creator commerce.
            </h2>
            <p className="text-sm sm:text-base text-[#A3A39C] leading-relaxed">
              Whether you are an ambitious brand looking for authentic creators or a storyteller ready to monetize your reach with certainty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10">
            <Link href="/register?role=brand">
              <button className="h-12 px-7 rounded-full bg-white hover:bg-zinc-100 text-[#0A0A0A] font-bold text-sm transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                Hire Creators as a Brand
              </button>
            </Link>
            <Link href="/register?role=creator">
              <button className="h-12 px-7 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                Apply as a Verified Creator
              </button>
            </Link>
          </div>

          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
