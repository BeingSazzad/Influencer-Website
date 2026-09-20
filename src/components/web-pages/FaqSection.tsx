'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const { t } = useAppSelector((state) => state.lang);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Influverse escrow system protect my budget?',
      a: 'When a brand sends an offer, the campaign budget (creator rate + 15% platform fee) is placed into a secure escrow account. The creator starts working with complete confidence that funds are secured. Funds are only transferred to the creator once you review and approve the submitted content.',
    },
    {
      q: 'Why is Influverse different from traditional influencer agencies?',
      a: 'Influverse eliminates middleman markups, slow email chains, and opaque pricing. Brands get direct access to verified creator rate cards, 100% escrow milestone protection, on-demand portfolio previews, and automated EU VAT invoicing.',
    },
    {
      q: 'Do creators have to pay any fee or commission?',
      a: 'No. Creators keep 100% of their listed package price. The 15% platform fee is covered by the hiring brand to fund escrow protection, contract guarantees, dispute mediation, and secure instant payouts.',
    },
    {
      q: 'What is the difference between UGC Content and a Sponsored Post?',
      a: 'UGC (User Generated Content) is custom high-converting photo/video assets produced by the creator for your brand to run on your own official channels or paid ad campaigns. A Sponsored Post includes the creator publishing the content directly to their own engaged audience on Instagram, TikTok, or YouTube.',
    },
    {
      q: 'How do revisions work if I need changes on the content?',
      a: 'Each creator package includes specified revision rounds (typically 1 to 2 revisions). When a creator submits draft deliverables, you can request adjustments directly inside your order workspace with timestamped notes before final escrow sign-off.',
    },
    {
      q: 'Are all creators verified on Influverse?',
      a: 'Yes. Our talent team manually verifies creator identity, authentic audience engagement metrics, past brand collaborations, and channel handles across Instagram, TikTok, and YouTube before granting the verified checkmark badge.',
    },
    {
      q: 'What currencies and payment methods are supported?',
      a: 'All packages, custom offers, and balance transactions are standardized in EUR (€) with support for major credit cards (Visa, Mastercard, Amex), SEPA bank transfers, Apple Pay, and Google Pay.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white border-t border-[#E7E7E2] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#73736A] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4 text-[#FF2D78]" />
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
            {t?.faq?.title || 'Frequently Asked Questions'}
          </h2>
          <p className="text-[18px] text-[#73736A] font-medium leading-[28px] mt-4 sm:mt-5">
            Everything you need to know about booking creators, escrow protection, and deliverables.
          </p>
        </div>

        {/* Minimalist Open Accordion List matching reference */}
        <div className="divide-y divide-[#E7E7E2] border-t border-b border-[#E7E7E2]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-6 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[20px] sm:text-[24px] font-bold text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors leading-snug">
                    {faq.q}
                  </span>

                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#FF2D78] text-white shadow-md shadow-[#FF2D78]/25'
                        : 'bg-white border border-[#D2D2CA] text-[#0A0A0A] group-hover:border-[#FF2D78] group-hover:text-[#FF2D78]'
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 transition-transform" />
                    ) : (
                      <ChevronDown className="w-5 h-5 transition-transform" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 sm:pt-5 pr-12 text-[18px] text-[#555550] leading-[28px] font-medium">
                    <p>{faq.a}</p>
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

