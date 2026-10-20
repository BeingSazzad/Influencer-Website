import React from 'react';
import { CreatorSidebar } from '@/components/layout/CreatorSidebar';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

export default function CreatorWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceShell sidebar={<CreatorSidebar />}>
      {children}
    </WorkspaceShell>
  );
}

