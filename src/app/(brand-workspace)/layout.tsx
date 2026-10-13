'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BrandSidebar } from '@/components/layout/BrandSidebar';
import { OfferModal } from '@/components/shared/OfferModal';

export default function BrandWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname?.includes('/onboarding');

  if (isOnboarding) {
    return <div className="min-h-screen bg-[#FAFAF8]">{children}</div>;
  }

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
