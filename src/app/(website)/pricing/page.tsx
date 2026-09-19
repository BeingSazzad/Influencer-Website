import React from 'react';
import { PricingSection } from '@/components/web-pages/PricingSection';
import { FaqSection } from '@/components/web-pages/FaqSection';

export const metadata = {
  title: 'Pricing & Fees — Influverse Creator Marketplace',
  description: 'Transparent 15% marketplace escrow fee on creator bookings in EUR. Zero subscription lock-in.',
};

export default function PricingPage() {
  return (
    <div className="py-8">
      <PricingSection />
      <FaqSection />
    </div>
  );
}
