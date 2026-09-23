'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ArrowUpRight, Instagram, Youtube, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-[#0A0A0A] text-[#FAFAF8] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Logo isLight size="md" />
            <p className="text-sm text-[#A3A39C] max-w-sm leading-relaxed">
              Influverse is the premier creator marketplace connecting forward-thinking brands with verified content creators worldwide for sponsored collaborations and bespoke UGC.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#E1306C] text-[#A3A39C] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-110 shadow-sm"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-[#A3A39C] hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.891-2.887 2.896 2.896 0 0 1 2.891-2.887c.28 0 .546.04.8.113V9.37a6.31 6.31 0 0 0-.8-.052 6.333 6.333 0 0 0-6.333 6.333 6.333 6.333 0 0 0 6.333 6.333 6.333 6.333 0 0 0 6.333-6.333V9.01a8.172 8.172 0 0 0 4.968 1.666V7.231a4.8 4.8 0 0 1-1.19-.545z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF0000] text-[#A3A39C] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-110 shadow-sm"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-[#A3A39C] hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2] text-[#A3A39C] hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-110 shadow-sm"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
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
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  About Influverse
                </Link>
              </li>
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
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#73736A]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Influverse Inc. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#A3A39C]">Real people. Real results.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#A3A39C]">
              EUR (€) Standard Marketplace
            </span>
            {pathname === '/' && <LanguageSwitcher />}
          </div>
        </div>
      </div>
    </footer>
  );
}
