'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { Check, Calculator, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button, Slider } from 'antd';

export function PricingSection() {
  const { t } = useAppSelector((state) => state.lang);
  const [budgetEur, setBudgetEur] = useState<number>(1000);

  const platformFeeEur = Math.round(budgetEur * 0.15);
  const totalCostEur = budgetEur + platformFeeEur;

  return (
    <section id="pricing" className="py-24 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EEF9] text-[#6444A6] text-xs font-bold uppercase tracking-wider font-sans mb-4">
            <Sparkles className="w-4 h-4" />
            Zero Subscription Fees
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15] font-sans">
            Transparent,{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              Pay-Per-Campaign
            </span>{' '}
            Pricing
          </h2>
          <p className="text-[18px] text-[#73736A] font-sans font-medium leading-[28px] mt-4 sm:mt-5">
            No monthly software lock-ins. We charge a flat 15% marketplace escrow fee to brands on successful creator hires. Creators keep 100% of their rate.
          </p>
        </div>

        {/* Live Fee Calculator & Model Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
          {/* Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-[#FAFAF8] rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center shadow-xs">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-[#0A0A0A] font-sans">
                  Interactive Fee Calculator
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold font-sans">
                15% Flat Platform Fee
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-sans">
                <label className="text-sm font-bold text-[#73736A]">
                  Creator Base Rate (EUR):
                </label>
                <span className="font-editorial text-2xl sm:text-3xl font-black text-[#0A0A0A]">
                  €{budgetEur.toLocaleString()}
                </span>
              </div>
              <Slider
                min={200}
                max={5000}
                step={50}
                value={budgetEur}
                onChange={(val) => setBudgetEur(val)}
                trackStyle={{ backgroundColor: '#0A0A0A' }}
                handleStyle={{ borderColor: '#0A0A0A' }}
              />
              <div className="flex justify-between text-xs text-[#A3A39C] mt-1 font-sans font-medium">
                <span>€200 (Micro)</span>
                <span>€2,500 (Mid-tier)</span>
                <span>€5,000+ (Macro)</span>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3.5 pt-4 border-t border-[#E7E7E2] font-sans">
              <div className="flex justify-between text-sm text-[#555550]">
                <span>Creator Earnings (100% Payout):</span>
                <span className="font-editorial text-base font-bold text-[#0A0A0A]">€{budgetEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[#555550]">
                <span>Influverse Escrow & Guarantee Fee (15%):</span>
                <span className="font-editorial text-base font-bold text-[#FF2D78]">+€{platformFeeEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#0A0A0A] pt-3 border-t border-[#E7E7E2]">
                <span>Total Brand Cost (Funded in Escrow):</span>
                <span className="font-editorial text-2xl font-black text-[#0A0A0A]">€{totalCostEur.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E7E7E2] flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm text-[#73736A] leading-relaxed font-sans font-medium">
                Funds are held safely in escrow. Creator does not receive payment until you review and approve the submitted content.
              </p>
            </div>
          </div>

          {/* Value Summary Card with consistent site dark gradient & glowing accents */}
          <div className="lg:col-span-5 relative overflow-hidden bg-[#0A0A0A] bg-gradient-to-b from-[#141414] to-[#0D0D0D] text-white rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-white/20 shadow-2xl transition-all duration-300 space-y-6 group">
            {/* Ambient subtle glow effects matching site design */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FF2D78]/20 blur-[90px] pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#7C3AED]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                What&apos;s{' '}
                <span className="font-editorial italic font-normal text-white drop-shadow-[0_2px_12px_rgba(255,45,120,0.3)]">
                  Included
                </span>
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#A3A39C] leading-[26px] font-sans font-medium">
                Every collaboration through Influverse comes with enterprise-grade safeguards and seamless delivery workflows.
              </p>

              <ul className="space-y-3.5">
                {[
                  'Full Escrow Payment Protection',
                  'Standard Commercial Usage Rights Contract',
                  'Built-in File & Link Delivery Workspace',
                  'Dedicated Mediation & Dispute Resolution',
                  'EU VAT Invoices & Compliance Receipts',
                  'Free to Sign Up & Search Catalog',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base font-bold text-white font-sans">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3">
                <Link href="/creators" className="block">
                  <button
                    className="w-full h-12 sm:h-[50px] rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-white text-[#0A0A0A] hover:bg-[#FF2D78] hover:text-white shadow-lg hover:shadow-[0_10px_25px_rgba(255,45,120,0.45)] transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Hire Creators Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
