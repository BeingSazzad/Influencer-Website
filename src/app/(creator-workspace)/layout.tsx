'use client';

import React from 'react';
import { CreatorSidebar } from '@/components/layout/CreatorSidebar';

export default function CreatorWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FAFAF8]">
      <CreatorSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
