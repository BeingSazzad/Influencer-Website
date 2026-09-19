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
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EEF9] text-[#6444A6] text-[11px] font-bold uppercase tracking-wider font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Subscription Fees
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight font-sans">
            Transparent,{' '}
            <span className="font-editorial italic font-normal text-[#0A0A0A]">
              Pay-Per-Campaign
            </span>{' '}
            Pricing
          </h2>
          <p className="text-sm text-[#73736A] font-sans font-medium">
            No monthly software lock-ins. We charge a flat 15% marketplace escrow fee to brands on successful creator hires. Creators keep 100% of their rate.
          </p>
        </div>

        {/* Live Fee Calculator & Model Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
          {/* Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-[#FAFAF8] rounded-3xl p-8 sm:p-10 border border-[#E7E7E2] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center shadow-xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-black text-base text-[#0A0A0A] font-sans">
                  Interactive Fee Calculator
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-[11px] font-bold font-sans">
                15% Flat Platform Fee
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-sans">
                <label className="text-xs font-bold text-[#73736A]">
                  Creator Base Rate (EUR):
                </label>
                <span className="font-editorial text-2xl font-black text-[#0A0A0A]">
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
              <div className="flex justify-between text-[11px] text-[#A3A39C] mt-1 font-sans">
                <span>€200 (Micro)</span>
                <span>€2,500 (Mid-tier)</span>
                <span>€5,000+ (Macro)</span>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3.5 pt-4 border-t border-[#E7E7E2] font-sans">
              <div className="flex justify-between text-xs text-[#555550]">
                <span>Creator Earnings (100% Payout):</span>
                <span className="font-editorial text-base font-bold text-[#0A0A0A]">€{budgetEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-[#555550]">
                <span>Influverse Escrow & Guarantee Fee (15%):</span>
                <span className="font-editorial text-base font-bold text-[#2B7FFF]">+€{platformFeeEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#0A0A0A] pt-3 border-t border-[#E7E7E2]">
                <span>Total Brand Cost (Funded in Escrow):</span>
                <span className="font-editorial text-2xl font-black text-[#0A0A0A]">€{totalCostEur.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E7E7E2] flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] text-[#73736A] leading-relaxed font-sans font-medium">
                Funds are held safely in escrow. Creator does not receive payment until you review and approve the submitted content.
              </p>
            </div>
          </div>

          {/* Value Summary Card */}
          <div className="lg:col-span-5 bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-10 border border-[#262626] shadow-2xl space-y-6">
            <h3 className="text-2xl font-black text-white font-sans">
              What&apos;s{' '}
              <span className="font-editorial italic font-normal text-white">Included</span>
            </h3>
            <p className="text-xs text-[#A3A39C] leading-relaxed font-sans font-medium">
              Every collaboration through Influverse comes with enterprise-grade safeguards and seamless delivery workflows.
            </p>

            <ul className="space-y-3">
              {[
                'Full Escrow Payment Protection',
                'Standard Commercial Usage Rights Contract',
                'Built-in File & Link Delivery Workspace',
                'Dedicated Mediation & Dispute Resolution',
                'EU VAT Invoices & Compliance Receipts',
                'Free to Sign Up & Search Catalog',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs font-bold text-white font-sans">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link href="/creators">
                <Button
                  type="primary"
                  block
                  className="h-12 rounded-full font-black text-xs bg-white text-[#0A0A0A] hover:!bg-[#2B7FFF] hover:!text-white border-none shadow-sm transition-all font-sans"
                >
                  Hire Creators Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
