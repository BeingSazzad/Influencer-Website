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
    <section id="pricing" className="py-20 bg-white border-y border-[#E7E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EEF9] text-[#6444A6] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Subscription Fees
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#151515] tracking-tight">
            {t?.pricing?.title || 'Transparent, Pay-Per-Campaign Pricing'}
          </h2>
          <p className="text-sm text-[#73736A] mt-2">
            No monthly software lock-ins. We charge a flat 15% marketplace escrow fee to brands on successful creator hires. Creators keep 100% of their rate.
          </p>
        </div>

        {/* Live Fee Calculator & Model Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
          {/* Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-[#FAFAF8] rounded-3xl p-8 border border-[#E7E7E2] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#151515] text-white flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-[#151515]">
                  Interactive Fee Calculator
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D] text-[11px] font-bold">
                15% Flat Fee
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#73736A]">
                  Creator Base Rate (EUR):
                </label>
                <span className="text-lg font-black text-[#151515]">
                  €{budgetEur.toLocaleString()}
                </span>
              </div>
              <Slider
                min={200}
                max={5000}
                step={50}
                value={budgetEur}
                onChange={(val) => setBudgetEur(val)}
                trackStyle={{ backgroundColor: '#151515' }}
                handleStyle={{ borderColor: '#151515' }}
              />
              <div className="flex justify-between text-[11px] text-[#A3A39C] mt-1">
                <span>€200 (Micro)</span>
                <span>€2,500 (Mid-tier)</span>
                <span>€5,000+ (Macro)</span>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-3 pt-4 border-t border-[#E7E7E2]">
              <div className="flex justify-between text-xs text-[#555550]">
                <span>Creator Earnings (100% Payout):</span>
                <span className="font-bold text-[#151515]">€{budgetEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-[#555550]">
                <span>Influverse Escrow & Guarantee Fee (15%):</span>
                <span className="font-bold text-[#2B7FFF]">+€{platformFeeEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#151515] pt-3 border-t border-[#E7E7E2]">
                <span>Total Brand Cost (Funded in Escrow):</span>
                <span className="text-base text-[#151515]">€{totalCostEur.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E7E7E2] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] text-[#73736A] leading-relaxed">
                Funds are held safely in escrow. Creator does not receive payment until you review and approve the submitted content.
              </p>
            </div>
          </div>

          {/* Value Summary Card */}
          <div className="lg:col-span-5 bg-[#151515] text-white rounded-3xl p-8 border border-[#262626] space-y-6">
            <h3 className="text-xl font-black text-white">What&apos;s Included</h3>
            <p className="text-xs text-[#A3A39C] leading-relaxed">
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
                <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-white">
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
                  className="h-11 rounded-full font-bold text-xs bg-white text-[#151515] hover:!bg-[#2B7FFF] hover:!text-white border-none"
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
