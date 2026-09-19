'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Bell, ShieldCheck, ArrowLeft, ArrowUpRight } from 'lucide-react';

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
            className="p-2 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <div>
          <h1 className="text-xl font-black text-[#151515] tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-[#73736A]">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F0] border border-[#E7E7E2] text-xs font-semibold text-[#151515]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Escrow Protected</span>
        </div>

        <Link
          href="/"
          className="text-xs font-bold text-[#73736A] hover:text-[#151515] flex items-center gap-1 transition-colors"
        >
          <span>Marketplace</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>

        {action}
      </div>
    </header>
  );
}
