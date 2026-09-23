'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { ArrowLeft } from 'lucide-react';

interface WorkspaceHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}

export function WorkspaceHeader({
  title,
  subtitle,
  backHref,
  action,
}: WorkspaceHeaderProps) {
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);

  return (
    <header className="bg-white border-b border-[#E7E7E2] px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {backHref && (
          <Link
            href={backHref}
            className="p-2 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-[#73736A] font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {action}
      </div>
    </header>
  );
}
