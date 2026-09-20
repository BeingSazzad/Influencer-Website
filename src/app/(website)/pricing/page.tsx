import React from 'react';
import { PricingSection } from '@/components/web-pages/PricingSection';

export const metadata = {
  title: 'Pricing & Fees — Influverse Creator Marketplace',
  description: 'Transparent 15% marketplace escrow fee on creator bookings in EUR. Zero subscription lock-in.',
};

export default function PricingPage() {
  return (
    <div className="py-4 sm:py-8">
      <PricingSection />
    </div>
  );
}
