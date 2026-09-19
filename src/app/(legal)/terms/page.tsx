import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service & Escrow Agreement — Influverse',
  description: 'Terms governing brand campaign agreements, creator fulfillment, and 15% escrow protection.',
};

export default function TermsPage() {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-2xs space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-xs font-bold text-[#151515] mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Legal & Marketplace Framework
        </div>
        <h1 className="text-3xl font-black text-[#151515]">Terms of Service</h1>
        <p className="text-xs text-[#73736A] mt-1">Last updated: September 2026</p>
      </div>

      <div className="prose text-xs text-[#555550] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">1. Overview & Acceptance</h2>
          <p>
            By accessing or using the Influverse platform (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. Influverse operates as a trusted marketplace connecting commercial brands (&ldquo;Brands&rdquo;) with digital content creators (&ldquo;Creators&rdquo;) for sponsored postings and custom UGC ad content.
          </p>
        </section>

        <section id="escrow" className="space-y-2 p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
          <h2 className="text-sm font-black text-[#151515]">2. Escrow Protection & Platform Fee (15%)</h2>
          <p>
            All hiring agreements between Brands and Creators are facilitated through the Influverse Escrow Engine. Upon sending or approving an offer, the Brand funds the full contract amount (Creator Rate + 15% platform fee) into escrow.
          </p>
          <p>
            Escrow funds remain securely protected until the Brand reviews and approves the submitted deliverables, or until the milestone completion window concludes. Creators receive 100% of their base quote in EUR (€) without any commission deduction on payout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">3. Content Rights & Commercial Usage</h2>
          <p>
            For UGC collaborations, the Creator grants the Brand non-exclusive, worldwide commercial rights to use the delivered assets in digital advertising and organic social channels for the duration specified in the campaign brief. For Sponsored Posts, content must remain live on the designated channel for a minimum of 30 days unless mutually agreed otherwise.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">4. Revisions & Disputes</h2>
          <p>
            Every order includes the standard number of revisions defined in the selected package. In the event of non-delivery or failure to comply with explicit brief guidelines, the Influverse mediation team provides neutral review and resolution before any funds are released or refunded.
          </p>
        </section>
      </div>
    </div>
  );
}
