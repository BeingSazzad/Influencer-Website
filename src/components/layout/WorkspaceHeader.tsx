'use client';

import React from 'react';
import Link from 'next/link';
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
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#E7E7E2] bg-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {backHref && (
          <Link
            href={backHref}
            className="shrink-0 rounded-xl border border-[#E7E7E2] p-2 text-[#0A0A0A] transition-colors hover:bg-[#F4F4F0]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 truncate text-sm font-medium text-[#66665E]">{subtitle}</p>}
        </div>
      </div>

      {action && (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {action}
        </div>
      )}
    </header>
  );
}
