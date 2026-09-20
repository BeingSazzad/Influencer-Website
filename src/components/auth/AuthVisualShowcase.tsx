'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Star, TrendingUp, CheckCircle2, Check, ArrowUpRight } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { BrandLogo } from '@/components/shared/BrandLogo';

interface AuthVisualShowcaseProps {
  mode?: 'login' | 'register';
}

export function AuthVisualShowcase({ mode = 'login' }: AuthVisualShowcaseProps) {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full min-h-[720px] bg-[#F4F4F0] rounded-3xl p-10 overflow-hidden border border-[#E7E7E2] select-none">
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF2D78]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#E2E2DC_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E7E7E2] text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
          <span>Verified Creator Network</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#23744D] bg-[#EEF7F2] px-3.5 py-1.5 rounded-full border border-[#23744D]/20 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Escrow Guarantee</span>
        </div>
      </div>

      {/* Centerpiece: Curved Orbital Trajectory Constellation */}
      <div className="relative z-10 my-auto py-6 w-full h-[480px] flex items-center justify-center">
        {/* SVG Dashed Orbit Curves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Orbit Arc */}
          <path
            d="M -30 240 C 90 130, 240 50, 480 20"
            stroke="#D2D2CA"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {/* Middle Orbit Arc */}
          <path
            d="M -20 380 C 120 270, 280 170, 520 110"
            stroke="#D2D2CA"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {/* Inner Orbit Arc */}
          <path
            d="M 20 480 C 180 390, 360 310, 540 250"
            stroke="#D2D2CA"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        </svg>

        {/* Node 1: Nike Brand Badge (Top Right on Arc 1) */}
        <div className="absolute top-6 right-16 flex flex-col items-center">
          <div className="hover:scale-110 transition-transform">
            <BrandLogo name="Nike" size="md" />
          </div>
        </div>

        {/* Node 2: Creator 1 - Sophie Kim (Top Left on Arc 1) */}
        <div className="absolute top-10 left-14 flex items-center gap-2">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80"
              alt="Sophie Kim"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg ring-2 ring-[#1D9BF0]/30 group-hover:scale-105 transition-transform"
            />
            <VerifiedBadge className="absolute -bottom-1 -right-1 w-4.5 h-4.5" />
          </div>
        </div>

        {/* Node 3: Sephora Brand Badge (Middle Left on Arc 2) */}
        <div className="absolute top-36 left-8 flex flex-col items-center">
          <div className="hover:scale-110 transition-transform">
            <BrandLogo name="Sephora" size="md" />
          </div>
        </div>

        {/* Node 4: Creator 2 - Maya Chen (Middle Right on Arc 2) */}
        <div className="absolute top-28 right-24 flex items-center gap-2">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=140&q=80"
              alt="Maya Chen"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg ring-2 ring-purple-500/30 group-hover:scale-105 transition-transform"
            />
            <VerifiedBadge className="absolute -bottom-1 -right-1 w-4.5 h-4.5" />
          </div>
        </div>

        {/* Node 5: Central Prominent Creator - Liam Carter (Center on Arc 2 & 3) */}
        <div className="absolute top-44 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="Liam Carter"
              className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-2xl ring-4 ring-[#FF2D78]/20 group-hover:scale-105 transition-transform"
            />
            <VerifiedBadge className="absolute bottom-0 right-0 w-6 h-6" />
            <div className="absolute -top-3 -right-6 bg-white px-2.5 py-0.5 rounded-full border border-[#E7E7E2] shadow-sm text-xs font-extrabold text-[#0A0A0A] flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>4.96★</span>
            </div>
          </div>
        </div>

        {/* Node 6: Adobe Brand Badge (Right Mid on Arc 2) */}
        <div className="absolute top-52 right-8 flex items-center">
          <div className="hover:scale-110 transition-transform">
            <BrandLogo name="Adobe" size="md" />
          </div>
        </div>

        {/* Node 7: Spotify Brand Badge (Bottom Mid-Left) */}
        <div className="absolute bottom-24 left-12 flex items-center">
          <div className="hover:scale-110 transition-transform">
            <BrandLogo name="Spotify" size="md" />
          </div>
        </div>

        {/* Node 8: Creator 3 - Emma Rossi (Bottom Mid-Right) */}
        <div className="absolute bottom-20 right-32 flex items-center">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80"
              alt="Emma Rossi"
              className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform ring-2 ring-amber-500/20"
            />
            <VerifiedBadge className="absolute -bottom-1 -right-1 w-4 h-4" />
          </div>
        </div>

        {/* Prominent Stat Counter (Bottom Left Glass Card) */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E7E7E2] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5 text-[#FF2D78]" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight leading-none">
              1.7M+
            </div>
            <div className="text-xs font-bold text-[#73736A] mt-0.5">
              Global Audience Reach
            </div>
          </div>
        </div>

        {/* Floating Live Escrow Deal Card (Bottom Right Glass Card) */}
        <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E7E7E2] shadow-sm max-w-[210px] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-full">
              Live Deal Funded
            </span>
            <span className="text-xs font-black text-[#0A0A0A]">€1,200</span>
          </div>
          <div className="text-xs font-extrabold text-[#0A0A0A] truncate">
            Instagram 4K Reel Campaign
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#73736A]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Escrow locked & verified</span>
          </div>
        </div>
      </div>

      {/* Bottom Testimonial / Trust Statement */}
      <div className="relative z-10 pt-4 border-t border-[#E7E7E2]/80 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0A0A0A]">
            {mode === 'login'
              ? '“Influverse cut our brand deal turnaround from 3 weeks to 48 hours.”'
              : '“The easiest way to hire top vetted creators with zero unpaid invoice risks.”'}
          </p>
          <span className="text-xs text-[#73736A] font-medium mt-0.5 block">
            — Elena Rostova, Brand Marketing Director • Aura Skincare
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          ))}
        </div>
      </div>
    </div>
  );
}
