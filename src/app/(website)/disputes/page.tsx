'use client';

import React from 'react';
import Link from 'next/link';
import { DisputesDocket } from '@/components/shared/DisputesDocket';
import { ArrowLeft, Shield } from 'lucide-react';

export default function WebsiteDisputesPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] py-12 sm:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E7E2]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#66665E] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#FF2D78]/20 text-[#FF2D78] text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Escrow Protection Protocol</span>
          </div>
        </div>

        <DisputesDocket role="admin" />
      </div>
    </div>
  );
}
