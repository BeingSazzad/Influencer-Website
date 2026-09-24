import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Users,
  ShieldCheck,
  HelpCircle,
  Home,
} from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found — Influverse',
  description: 'The creator profile or page you are looking for does not exist on Influverse.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0A0A] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Top Navbar */}
      <header className="w-full border-b border-[#E7E7E2] bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm font-bold text-[#555550] hover:text-[#0A0A0A] hover:bg-[#F4F4F0] transition-all"
            >
              Browse Marketplace
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center max-w-4xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>404 • Page Not Found</span>
        </div>

        {/* Big 404 Visual */}
        <div className="relative mb-6">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-[#0A0A0A] select-none opacity-95">
            404
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF2D78] text-white text-xs font-black uppercase tracking-widest shadow-md">
            Lost in Space
          </div>
        </div>

        {/* Heading & Subtext */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight mb-4">
          Looking for a Creator or Campaign?
        </h1>
        <p className="text-sm sm:text-base text-[#73736A] max-w-lg mb-8 leading-relaxed font-medium">
          The creator profile, rate card, or marketplace route you entered doesn’t exist, has been made private, or was moved to a new URL.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            <span>Return to Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/creators/creator-01"
            className="px-6 py-3 rounded-full bg-white hover:bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2] text-sm font-bold transition-all flex items-center gap-2 shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#FF2D78]" />
            <span>Featured Creator Profile</span>
          </Link>
        </div>

        {/* Quick Links Bento */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/"
            className="p-5 rounded-3xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0A0A0A] mb-1 group-hover:text-[#FF2D78] transition-colors">
              Creator Catalog
            </h3>
            <p className="text-sm text-[#73736A] leading-relaxed">
              Explore 500+ vetted UGC, TikTok, & Instagram content creators.
            </p>
          </Link>

          <Link
            href="/terms"
            className="p-5 rounded-3xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0A0A0A] mb-1 group-hover:text-[#23744D] transition-colors">
              Escrow Protection
            </h3>
            <p className="text-sm text-[#73736A] leading-relaxed">
              Milestone funding with 100% guarantee on approved deliverables.
            </p>
          </Link>

          <Link
            href="/faq"
            className="p-5 rounded-3xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0A0A0A] mb-1 group-hover:text-[#6444A6] transition-colors">
              Marketplace Help
            </h3>
            <p className="text-sm text-[#73736A] leading-relaxed">
              Read answers about booking, briefs, usage rights, and payouts.
            </p>
          </Link>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="w-full border-t border-[#E7E7E2] py-6 px-6 text-center text-sm text-[#73736A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Influverse Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#0A0A0A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0A0A0A] transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="hover:text-[#0A0A0A] transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
