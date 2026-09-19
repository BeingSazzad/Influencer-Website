'use client';

import React from 'react';
import { BrandSidebar } from '@/components/layout/BrandSidebar';
import { OfferModal } from '@/components/shared/OfferModal';

export default function BrandWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8]">
      <BrandSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
      <OfferModal />
    </div>
  );
}
