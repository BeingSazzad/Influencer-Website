'use client';

import React from 'react';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { DisputesDocket } from '@/components/shared/DisputesDocket';

export default function BrandDisputesPage() {
  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Disputes & Escrow Arbitration"
        subtitle="Review open grievances, evidence submissions, and binding settlements."
        backHref="/brand/campaigns"
      />
      <div className="p-6 sm:p-8 max-w-6xl mx-auto">
        <DisputesDocket role="brand" backHref="/brand/campaigns" />
      </div>
    </div>
  );
}
