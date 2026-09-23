import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Influverse',
  description: 'How Influverse collects, protects, and handles personal data, verified creator analytics, and payment information in strict compliance with GDPR.',
};

const sections = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    content: [
      'We collect information necessary to operate a secure creator marketplace, process transactions, and provide verified analytics.',
      'Account Information: Name, business email, profile photographs, billing address, VAT ID (where applicable), and payout bank details.',
      'Deliverable Data: Uploaded video drafts, audio files, campaign briefs, feedback messages, and usage licenses exchanged between creators and brands.',
    ],
  },
  {
    id: 'social',
    title: '2. Social API Data & Analytics',
    content: [
      'When creators authenticate their social accounts (Instagram, TikTok, YouTube), we receive read-only public profile metrics, follower counts, and engagement percentages.',
      'We never ask for or store social media account passwords. All integrations use official OAuth 2.0 protocols certified by Meta, ByteDance, and Google.',
      'Creators can disconnect or revoke social API access at any time through their Creator Settings dashboard.',
    ],
  },
  {
    id: 'payments',
    title: '3. Payment Processing & Escrow Security',
    content: [
      'All payment processing for escrow funding and creator disbursements is handled via PCI-DSS Level 1 compliant financial payment gateways.',
      'Influverse does not store credit card numbers or banking passwords on internal databases. Card tokens and payment credentials are encrypted using bank-grade AES-256 encryption.',
    ],
  },
  {
    id: 'gdpr',
    title: '4. GDPR & Your Privacy Rights (EU/EEA & UK)',
    badge: 'GDPR Compliant',
    content: [
      'Under the European Union General Data Protection Regulation (GDPR), users have full rights to access, rectify, port, or request the deletion of their personal data.',
      'Right to Erasure: You may request full account and data deletion at any time via your Settings or by contacting privacy@influverse.com.',
      'Data Minimization: We only retain campaign transaction records required by European commercial tax law for the statutory period.',
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies & Local Storage',
    content: [
      'We utilize essential session cookies and local storage to keep you authenticated, remember your language preferences, and preserve active draft campaigns in progress.',
      'We do not sell user data to third-party ad networks or data brokers.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E7E2] shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Data Privacy & Security Framework</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
          Privacy Policy
        </h1>

        <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed max-w-2xl">
          How Influverse collects, protects, and handles personal data, verified creator analytics, and payment information in strict compliance with GDPR.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2 text-sm text-[#73736A]">
          <span className="font-semibold text-[#0A0A0A]">Effective Date:</span>
          <span>September 2026</span>
          <span>•</span>
          <span>GDPR & UK DPA 2018 Compliant</span>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                {section.title}
              </h2>
              {section.badge && (
                <span className="px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-sm font-bold">
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

      {/* Contact box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-2xl font-extrabold text-[#0A0A0A]">
            Need a data export or deletion request?
          </h3>
          <p className="text-sm text-[#73736A]">
            You can manage connected profiles in your Settings or contact our Data Protection Officer.
          </p>
        </div>
        <Link
          href="/creator/settings"
          className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-xs transition-colors shrink-0"
        >
          Manage Account Settings
        </Link>
      </div>
    </div>
  );
}
