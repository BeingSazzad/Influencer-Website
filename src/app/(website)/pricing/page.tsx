'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Calculator,
  ShieldCheck,
  Building2,
  ArrowRight,
  Lock,
  Percent,
  Send,
  Zap,
} from 'lucide-react';
import { Slider, Modal, Input, message } from 'antd';

export default function PricingPage() {
  const [budgetEur, setBudgetEur] = useState<number>(1200);

  // Enterprise Modal State
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('€5,000 - €15,000');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [isSubmittingEnterprise, setIsSubmittingEnterprise] = useState(false);

  // Math for calculations
  const platformFeeEur = Math.round(budgetEur * 0.15);
  const totalCostEur = budgetEur + platformFeeEur;

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactEmail.trim() || !contactEmail.includes('@')) {
      message.error('Please provide a valid company name and work email.');
      return;
    }

    setIsSubmittingEnterprise(true);
    setTimeout(() => {
      setIsSubmittingEnterprise(false);
      setIsEnterpriseModalOpen(false);
      message.success(
        `Thank you ${companyName}! Our Enterprise Team has received your inquiry and will reach out to ${contactEmail} within 24 hours.`
      );
      setCompanyName('');
      setContactEmail('');
      setInquiryNotes('');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0A0A0A] font-sans pb-24">
      {/* 1. HERO HEADER */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FF2D78]/25 text-[#FF2D78] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pay-Per-Milestone • 0% Subscription Trap</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0A0A0A] tracking-tight leading-[1.08]">
            Simple, Transparent Pricing <br className="hidden sm:inline" />
            for Brands &amp; Creators.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#66665E] font-medium leading-[28px] max-w-2xl mx-auto">
            Brands pay a flat 15% platform fee when they hire a creator. There is no monthly subscription.
          </p>
          <p className="text-base sm:text-lg text-[#0A0A0A] font-semibold leading-[28px] max-w-2xl mx-auto">
            Creators are free. There is no creator plan and no commission. You keep 100% of your rate.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan 1: Pay-As-You-Go */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#0A0A0A] shadow-lg flex flex-col justify-between relative group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A]">
                    Most Popular
                  </span>
                  <span className="text-xs font-bold text-[#66665E]">
                    Pay-As-You-Go
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
                    Marketplace Standard
                  </h3>
                  <p className="text-sm text-[#66665E] mt-2 leading-relaxed">
                    Designed for DTC brands, agencies, and businesses hiring vetted creators on demand with full escrow protection.
                  </p>
                </div>

                <div className="pt-2 pb-4 border-y border-[#E7E7E2]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight">
                      €0
                    </span>
                    <span className="text-base font-bold text-[#66665E]">
                      / month
                    </span>
                  </div>
                  <p className="text-xs text-[#FF2D78] font-bold mt-1.5">
                    + 15% Platform Fee only on successful creator hires
                  </p>
                </div>

                <div className="space-y-3.5">
                  <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider block">
                    Everything Included:
                  </span>
                  {[
                    '100% Escrow deposit protection on every booking',
                    'Unlimited creator search & rate card discovery',
                    'Direct pitch & custom milestone offer builder',
                    'In-order video deliverable review & 2 revision rounds',
                    'Standard commercial advertising usage rights',
                    'Compliant EU VAT reverse-charge digital invoices',
                    'Dedicated dispute & support mediation',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#44443E]">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <Link href="/register?role=brand" className="block">
                  <button className="w-full h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                    <span>Get Started as a Brand</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/creators" className="block text-center text-xs font-bold text-[#66665E] hover:text-[#0A0A0A] transition-colors py-1">
                  Explore Creators Catalog &rarr;
                </Link>
              </div>
            </div>

            {/* Plan 2: Enterprise & Managed Agency */}
            <div className="bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FF2D78]/20 blur-[90px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white">
                    High Volume Teams
                  </span>
                  <span className="text-xs font-bold text-[#A3A39C]">
                    Custom Solutions
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Enterprise &amp; Agency Scale
                  </h3>
                  <p className="text-sm text-[#A3A39C] mt-2 leading-relaxed">
                    Customized workflow for performance marketing agencies and global enterprises managing multiple creator campaigns.
                  </p>
                </div>

                <div className="pt-2 pb-4 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      Custom
                    </span>
                    <span className="text-base font-bold text-[#A3A39C]">
                      / volume tier
                    </span>
                  </div>
                  <p className="text-xs text-[#FF2D78] font-bold mt-1.5">
                    Reduced platform rates for &gt;€10,000/mo spend
                  </p>
                </div>

                <div className="space-y-3.5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Enterprise Benefits:
                  </span>
                  {[
                    'Everything in Marketplace Standard plan',
                    'Dedicated Account Manager & Talent Scouting Concierge',
                    'Multi-seat team workspace with role permissions',
                    'Consolidated monthly VAT invoicing & PO settlement',
                    'Custom legal licensing addendums & buyout terms',
                    'Bulk milestone payout management',
                    '24/7 Priority SLA response for rapid sign-offs',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#E7E7E2]">
                      <Check className="w-4 h-4 text-[#FF2D78] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => setIsEnterpriseModalOpen(true)}
                  className="w-full h-12 rounded-full bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Contact Enterprise Sales</span>
                </button>
                <div className="text-center text-xs text-[#A3A39C] py-1">
                  Average setup turnaround within 24 hours
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* 3. INTERACTIVE FEE & EARNINGS CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" id="calculator">
        <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E7E7E2] shadow-sm max-w-5xl mx-auto space-y-8">
          <div className="space-y-1 border-b border-[#E7E7E2] pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                Interactive Fee &amp; Earnings Calculator
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66665E]">
              See exactly how budget, platform fee (15%), and creator take-home (100%) calculate in real time.
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-[#66665E]">
                Select Campaign Creator Quote:
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#0A0A0A]">
                €{budgetEur.toLocaleString()}
              </span>
            </div>

            <Slider
              min={200}
              max={10000}
              step={50}
              value={budgetEur}
              onChange={(val) => setBudgetEur(val)}
              tooltip={{ open: false }}
              trackStyle={{ backgroundColor: '#0A0A0A' }}
              handleStyle={{ borderColor: '#0A0A0A', backgroundColor: '#0A0A0A' }}
            />

            <div className="flex justify-between text-xs text-[#A3A39C] font-semibold">
              <span>€200 (Micro Package)</span>
              <span>€5,000 (Mid-Tier Campaign)</span>
              <span>€10,000+ (Macro Ambassadorship)</span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Creator Take-Home Payout
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
                €{budgetEur.toLocaleString()}
              </div>
              <p className="text-xs font-bold text-emerald-700">
                100% of quote &bull; 0% deduction
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E7E7E2] shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Platform Escrow Fee (15%)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#FF2D78]">
                +€{platformFeeEur.toLocaleString()}
              </div>
              <p className="text-xs text-[#66665E]">
                Protection, licensing &amp; VAT receipts
              </p>
            </div>

            <div className="bg-[#0A0A0A] text-white rounded-2xl p-5 border border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3A39C]">
                Total Brand Escrow Deposit
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                €{totalCostEur.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-400 font-semibold">
                Locked safely in escrow until approval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE & GUARANTEES MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
            Built-In Marketplace Guarantees
          </h2>
          <p className="text-sm sm:text-base text-[#66665E]">
            Every cent on Influverse is protected by enterprise safeguards and automated European compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#0A0A0A]">
              100% Escrow Protection
            </h3>
            <p className="text-xs text-[#66665E] leading-relaxed">
              Funds are safely secured upon agreement and released only when deliverables are approved by the brand.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center border border-[#FF2D78]/20">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#0A0A0A]">
              Zero Recurring Lock-In
            </h3>
            <p className="text-xs text-[#66665E] leading-relaxed">
              No €500/mo software subscriptions. You only pay the 15% platform fee when you actually hire and work with creators.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#0A0A0A]">
              Commercial Usage Rights
            </h3>
            <p className="text-xs text-[#66665E] leading-relaxed">
              Every package includes legally binding commercial rights contracts for paid advertising and social media channels.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#0A0A0A]">
              EU VAT Compliant Invoices
            </h3>
            <p className="text-xs text-[#66665E] leading-relaxed">
              Automated reverse-charge B2B invoicing with VAT validation for seamless corporate accounting across European territories.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONVERSION CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FF2D78]/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Ready to collaborate with total confidence?
            </h2>
            <p className="text-sm sm:text-base text-[#A3A39C] leading-relaxed">
              Explore thousands of verified creators or join our talent marketplace. No credit card required to get started.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/creators">
                <button className="h-12 px-8 rounded-full bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] font-bold text-sm transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95">
                  <span>Browse Creator Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/register">
                <button className="h-12 px-8 rounded-full bg-[#FF2D78] hover:bg-[#E02669] text-white font-bold text-sm transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95">
                  <span>Create Free Account</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE INQUIRY MODAL */}
      <Modal
        open={isEnterpriseModalOpen}
        onCancel={() => setIsEnterpriseModalOpen(false)}
        footer={null}
        centered
        width={560}
        destroyOnClose
        className="influverse-modal"
      >
        <div className="p-6 sm:p-8 space-y-6 font-sans">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2D78]">
              Enterprise &amp; Agency Scale
            </span>
            <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
              Talk to Our Partnerships Team
            </h3>
            <p className="text-xs text-[#66665E]">
              Custom creator scouting, volume fee discounts, and multi-seat team workspaces tailored to your goals.
            </p>
          </div>

          <form onSubmit={handleEnterpriseSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Company / Agency Name
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. L'Oréal Paris or Spark Media Agency"
                className="h-11 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Corporate Work Email
              </label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="marketing@company.com"
                className="h-11 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Estimated Monthly Creator Spend
              </label>
              <select
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none text-sm font-medium text-[#0A0A0A] bg-white transition-all shadow-2xs"
              >
                <option value="€2,500 - €5,000">€2,500 - €5,000 / month</option>
                <option value="€5,000 - €15,000">€5,000 - €15,000 / month</option>
                <option value="€15,000 - €50,000">€15,000 - €50,000 / month</option>
                <option value="€50,000+">€50,000+ / month (Enterprise Scale)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Key Collaboration Goals &amp; Channels
              </label>
              <textarea
                rows={3}
                value={inquiryNotes}
                onChange={(e) => setInquiryNotes(e.target.value)}
                placeholder="Tell us about the creators, target markets (e.g. France, Germany, UK), or volume needs you have..."
                className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEnterpriseModalOpen(false)}
                className="h-10 px-5 rounded-full font-bold text-xs border border-[#E7E7E2] text-[#66665E] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingEnterprise}
                className="h-10 px-7 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmittingEnterprise ? 'Sending...' : 'Submit Enterprise Inquiry'}</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
