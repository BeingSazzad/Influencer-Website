import React from 'react';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Influverse',
  description: 'How Influverse manages and protects personal information, audience analytics, and payment data.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-2xs space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-xs font-bold text-[#151515] mb-3">
          <Lock className="w-3.5 h-3.5 text-[#2B7FFF]" />
          Data Protection & GDPR
        </div>
        <h1 className="text-3xl font-black text-[#151515]">Privacy Policy</h1>
        <p className="text-xs text-[#73736A] mt-1">Last updated: September 2026</p>
      </div>

      <div className="prose text-xs text-[#555550] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">1. Data Collection & Usage</h2>
          <p>
            Influverse collects profile information (name, business email, social handles, audience demographics), billing information, and communication records necessary to process campaign orders, verify identities, and facilitate escrow disbursements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">2. Social API Integration</h2>
          <p>
            When creators connect their social profiles (Instagram, TikTok, YouTube), we access public profile data, follower counts, and anonymized audience engagement analytics solely to display verified metrics to hiring brands on the marketplace.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-black text-[#151515]">3. Payment Processing & Security</h2>
          <p>
            All financial transactions are processed securely through PCI-DSS Level 1 certified banking partners. Influverse does not store raw credit card numbers or banking passwords on internal servers.
          </p>
        </section>
      </div>
    </div>
  );
}
