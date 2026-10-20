import React from 'react';
import { BrandSidebar } from '@/components/layout/BrandSidebar';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { OfferModal } from '@/components/shared/OfferModal';

export default function BrandWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceShell sidebar={<BrandSidebar />}>
      {children}
      <OfferModal />
    </WorkspaceShell>
  );
}
