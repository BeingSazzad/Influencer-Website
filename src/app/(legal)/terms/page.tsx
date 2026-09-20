import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — Influverse',
  description: 'Clear, balanced, and transparent terms governing creator hiring, 15% escrow protection, intellectual property usage, and milestone fulfillment.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account, accessing, or using Influverse ("Platform", "We", "Our"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service.',
      'These terms apply to all users, including digital creators ("Creators"), commercial brands and agencies ("Brands"), and general website visitors.',
    ],
  },
  {
    id: 'escrow',
    title: '2. Escrow Protection & Platform Fee (15%)',
    badge: 'Core Guarantee',
    highlight: true,
    content: [
      'Influverse operates a non-custodial milestone escrow mechanism for all campaign agreements. When a Brand issues or accepts a collaboration offer, the total contract amount plus a transparent 15% marketplace platform fee is immediately authorized and funded into secure escrow.',
      'Escrow funds remain securely held in escrow until the Creator completes all brief requirements and the Brand reviews and approves the submitted deliverables.',
      'Creators receive 100% of their base quote without hidden payout deductions. Payouts are transferred in EUR (€) via SEPA or SWIFT bank transfer within 48 business hours of deliverable approval.',
    ],
  },
  {
    id: 'creators',
    title: '3. Creator Obligations & Deliverables',
    content: [
      'Creators agree to produce and submit original, high-fidelity content adhering strictly to the campaign brief, guidelines, and agreed delivery dates.',
      'Creators warrant that their submitted deliverables do not infringe upon any third-party copyright, trademark, privacy, or intellectual property rights.',
      'Unless otherwise specified in a custom package, creators agree to provide up to 2 revisions if the submitted content deviates from the mutually agreed brief.',
    ],
  },
  {
    id: 'brands',
    title: '4. Brand Usage Rights & Licensing',
    content: [
      'Upon release of escrow funds, the Brand receives the specific commercial licensing rights defined in the purchased Creator package (e.g., 30-day, 90-day, or perpetual paid ad usage).',
      'Brands may not sublicense, resell, or distribute raw creator assets outside the explicitly agreed campaign channels without prior written consent and appropriate licensing upgrades.',
    ],
  },
  {
    id: 'disputes',
    title: '5. Dispute Resolution & Mediation',
    content: [
      'In the rare event of a disagreement regarding deliverable compliance, milestone deadlines, or creative execution, either party may initiate the Influverse Mediation Protocol.',
      'The Influverse trust team reviews the original brief, uploaded deliverables, revision notes, and chat transcripts to render an impartial final determination within 5 business days.',
      'If work was not completed as specified in the signed brief, funds held in escrow may be refunded to the Brand or partially settled based on verified deliverables.',
    ],
  },
  {
    id: 'termination',
    title: '6. Account Termination & Compliance',
    content: [
      'Influverse reserves the right to suspend or terminate accounts that engage in fraudulent activity, artificial engagement inflation (bot followers/views), harassment, or attempts to circumvent platform escrow.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Marketplace & Escrow Agreement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
          Terms of Service
        </h1>

        <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed max-w-2xl">
          Clear, balanced, and transparent terms governing creator hiring, 15% escrow protection, intellectual property usage, and milestone fulfillment.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#73736A]">
          <span className="font-semibold text-[#0A0A0A]">Last Modified:</span>
          <span>September 2026</span>
          <span>•</span>
          <span>Version 2.4</span>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={`p-6 sm:p-8 rounded-3xl transition-all ${
              section.highlight
                ? 'bg-[#FAFAF8] border-2 border-[#23744D]/20 shadow-xs'
                : 'bg-white border border-[#E7E7E2] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                {section.title}
              </h2>
              {section.badge && (
                <span className="px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold tracking-wide">
                  {section.badge}
                </span>
              )}
            </div>

            <div className="space-y-3 text-sm text-[#555550] leading-relaxed font-normal">
              {section.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-[#0A0A0A]">
            Have questions about our escrow or legal framework?
          </h3>
          <p className="text-xs text-[#73736A]">
            Our compliance and trust team is available 24/7 to assist.
          </p>
        </div>
        <Link
          href="/faq"
          className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-xs transition-colors shrink-0"
        >
          View Marketplace FAQ
        </Link>
      </div>
    </div>
  );
}
