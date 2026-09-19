'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { ChevronDown, HelpCircle, Shield, CreditCard, Users } from 'lucide-react';

export function FaqSection() {
  const { t } = useAppSelector((state) => state.lang);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Influverse escrow system protect my budget?',
      a: 'When a brand sends an offer, the campaign budget (creator rate + 15% platform fee) is placed into a secure escrow account. The creator starts working with complete confidence that funds are secured. Funds are only transferred to the creator once you review and approve the submitted content.',
    },
    {
      q: 'Do creators have to pay any fee or commission?',
      a: 'No. Creators keep 100% of their listed package price. The 15% platform fee is covered by the hiring brand to fund escrow protection, contract guarantees, and mediation services.',
    },
    {
      q: 'What is the difference between UGC Content and a Sponsored Post?',
      a: 'UGC (User Generated Content) is custom creative (videos/photos) produced by the creator for your brand to run on your own social channels or paid ads. A Sponsored Post includes the creator publishing the content directly to their own followers on Instagram, TikTok, or YouTube.',
    },
    {
      q: 'How do revisions work if I need changes on the content?',
      a: 'Each creator package includes specified revision rounds (typically 1 to 2 revisions). When a creator submits draft deliverables, you can request adjustments directly in the order workspace before final approval.',
    },
    {
      q: 'Are all creators verified on Influverse?',
      a: 'Yes. Our team verifies identity, genuine audience engagement, and creator handles across Instagram, TikTok, and YouTube before granting the verified checkmark badge.',
    },
    {
      q: 'What currencies and payment methods are supported?',
      a: 'All packages, offers, and balance transactions are standardized in EUR (€) with support for major credit cards, SEPA bank transfers, Apple Pay, and Google Pay.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-[#E7E7E2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#73736A] text-[11px] font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#2B7FFF]" />
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#151515] tracking-tight">
            {t?.faq?.title || 'Frequently Asked Questions'}
          </h2>
          <p className="text-sm text-[#73736A] mt-2">
            Everything you need to know about booking creators, escrow protection, and deliverables.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E7E7E2] overflow-hidden transition-all bg-[#FAFAF8]"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#151515] hover:text-[#2B7FFF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#73736A] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#151515]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#555550] leading-relaxed border-t border-[#E7E7E2]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
