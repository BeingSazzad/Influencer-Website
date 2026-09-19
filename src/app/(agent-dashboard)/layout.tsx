import React from 'react';
import { AgentSidebar } from '@/components/layout/AgentSidebar';

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden lg:block flex-shrink-0">
        <AgentSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
