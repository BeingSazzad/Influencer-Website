'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Collapse, Button } from 'antd';

export default function FaqPage() {
  const buyerFaqs = [
    {
      key: '1',
      label: <span className="font-bold text-slate-900 text-sm">How do I schedule a private tour for a trophy estate?</span>,
      children: (
        <p className="text-xs text-slate-600 leading-relaxed">
          You can click "Schedule Tour" on any property page or trigger the confidential inquiry drawer. Our lead broker for that region will contact you within 2 hours to confirm private security protocols and itinerary scheduling.
        </p>
      ),
    },
    {
      key: '2',
      label: <span className="font-bold text-slate-900 text-sm">Can I access off-market or pocket listings?</span>,
      children: (
        <p className="text-xs text-slate-600 leading-relaxed">
          Yes. Over 40% of our network's transactions are private off-market estates. Accredited buyers who complete verification through our VIP portal receive direct invitations to confidential video dossiers.
        </p>
      ),
    },
    {
      key: '3',
      label: <span className="font-bold text-slate-900 text-sm">What buyer representation services are provided?</span>,
      children: (
        <p className="text-xs text-slate-600 leading-relaxed">
          Our verified brokers provide full acquisition lifecycle management: structural engineering audits, title and zoning due diligence, private bank escrow negotiation, and bespoke architectural advisory.
        </p>
      ),
    },
  ];

  const agentFaqs = [
    {
      key: '4',
      label: <span className="font-bold text-slate-900 text-sm">How do I qualify as a verified Real Estate Influencer?</span>,
      children: (
        <p className="text-xs text-slate-600 leading-relaxed">
          Creators must hold an active real estate broker/agent license or direct partnership with a licensed brokerage, alongside a minimum verified audience reach or established high-production YouTube/Instagram portfolio.
        </p>
      ),
    },
    {
      key: '5',
      label: <span className="font-bold text-slate-900 text-sm">How does the CRM lead pipeline work?</span>,
      children: (
        <p className="text-xs text-slate-600 leading-relaxed">
          When buyers view your listing video or submit inquiries on your property page, leads appear in your private Agent CRM dashboard with contact info, requested tour dates, and budget tier.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Knowledge Base & VIP Inquiries
          </h1>
          <p className="text-sm text-slate-500">
            Find answers regarding private acquisitions, video production syndication, and creator partnerships.
          </p>
        </div>

        {/* Buyer Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-950 font-serif">For Buyers & Investors</h2>
          <Collapse items={buyerFaqs} defaultActiveKey={['1']} className="bg-transparent border-none" />
        </div>

        {/* Agent Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-950 font-serif">For Real Estate Influencers & Producers</h2>
          <Collapse items={agentFaqs} defaultActiveKey={['4']} className="bg-transparent border-none" />
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 bg-slate-950 text-white rounded-3xl text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold font-serif">Still have confidential questions?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our Executive Advisory team is available 24/7 for bespoke consultation.
          </p>
          <Link href="/contact" className="inline-block">
            <Button type="primary" size="large" className="font-bold">
              Contact Advisory Desk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
