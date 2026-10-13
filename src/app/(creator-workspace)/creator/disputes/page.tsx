'use client';

import React from 'react';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { DisputesDocket } from '@/components/shared/DisputesDocket';

export default function CreatorDisputesPage() {
  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Disputes & Escrow Arbitration"
        subtitle="Review active contract conflicts, creative brief evidence, and mediation payouts."
        backHref="/creator/campaigns"
      />
      <div className="p-6 sm:p-8 max-w-6xl mx-auto">
        <DisputesDocket role="creator" backHref="/creator/campaigns" />
      </div>
    </div>
  );
}
