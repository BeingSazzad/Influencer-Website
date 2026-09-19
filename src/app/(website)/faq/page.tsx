import React from 'react';
import { FaqSection } from '@/components/web-pages/FaqSection';
import { CreatorInviteSection } from '@/components/web-pages/CreatorInviteSection';

export const metadata = {
  title: 'FAQ — Influverse Creator Marketplace',
  description: 'Frequently asked questions regarding Influverse creator bookings, escrow deposits, and deliverables.',
};

export default function FaqPage() {
  return (
    <div className="py-8">
      <FaqSection />
      <CreatorInviteSection />
    </div>
  );
}
