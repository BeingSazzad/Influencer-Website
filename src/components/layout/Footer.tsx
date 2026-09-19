'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ArrowUpRight, ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#151515] text-[#FAFAF8] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Logo isLight size="md" />
            <p className="text-sm text-[#A3A39C] max-w-sm leading-relaxed">
              Influverse is the premier creator marketplace connecting forward-thinking brands with verified content creators worldwide for sponsored collaborations and bespoke UGC.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#73736A] pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2B7FFF]" />
                100% Escrow Protected
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                Verified Creators Only
              </span>
            </div>
          </div>

          {/* Column: Discover */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A39C]">
              <li>
                <Link href="/creators" className="hover:text-white transition-colors">
                  All Creators
                </Link>
              </li>
              <li>
                <Link href="/creators?category=Beauty" className="hover:text-white transition-colors">
                  Beauty & Skincare
                </Link>
              </li>
              <li>
                <Link href="/creators?category=Travel" className="hover:text-white transition-colors">
                  Travel & Adventure
                </Link>
              </li>
              <li>
                <Link href="/creators?category=Fitness" className="hover:text-white transition-colors">
                  Fitness & Health
                </Link>
              </li>
              <li>
                <Link href="/creators?category=Tech" className="hover:text-white transition-colors">
                  Tech & Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Platform */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A39C]">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/brand/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                  Brand Workspace <ArrowUpRight className="w-3 h-3 text-[#73736A]" />
                </Link>
              </li>
              <li>
                <Link href="/creator/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                  Creator Workspace <ArrowUpRight className="w-3 h-3 text-[#73736A]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A3A39C]">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#escrow" className="hover:text-white transition-colors">
                  Escrow Guarantee (15% Fee)
                </Link>
              </li>
              <li>
                <Link href="/terms#guidelines" className="hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#73736A]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Influverse Inc. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#A3A39C]">Real people. Real results.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#A3A39C]">
              EUR (€) Standard Marketplace
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
