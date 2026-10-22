'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ShieldCheck,
  Building2,
  ArrowRight,
  Lock,
  Percent,
  Send,
  Zap,
} from 'lucide-react';
import { Modal, Input, message } from 'antd';

export default function PricingPage() {
  // Enterprise Modal State
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('€5,000 - €15,000');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [isSubmittingEnterprise, setIsSubmittingEnterprise] = useState(false);

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
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#52524B] text-[11px] font-bold uppercase tracking-[0.14em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2D78]" />
            No monthly fee
          </div>

          <h1 className="mt-5 text-[2.15rem] sm:text-5xl lg:text-[3.25rem] font-black text-[#0A0A0A] tracking-tight leading-[1.02]">
            <span className="block">Clear pricing.</span>
            <span className="block">For both sides.</span>
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[#E7E7E2] bg-white px-5 py-4 sm:px-6 sm:py-5 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#73736A]">Brands</p>
            <p className="mt-1.5 text-3xl sm:text-4xl font-black tracking-tight text-[#FF2D78]">15%</p>
            <p className="mt-1.5 text-sm leading-snug text-[#52524B]">
              Only when you hire. No monthly plan.
            </p>
          </div>
          <div className="rounded-2xl bg-[#0A0A0A] px-5 py-4 sm:px-6 sm:py-5 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A3A39C]">Creators</p>
            <p className="mt-1.5 text-3xl sm:text-4xl font-black tracking-tight text-white">100%</p>
            <p className="mt-1.5 text-sm leading-snug text-[#D6D6D0]">
              Free to join. Keep your full rate.
            </p>
          </div>
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
