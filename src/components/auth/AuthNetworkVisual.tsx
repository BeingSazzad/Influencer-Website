'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Star,
  Lock,
  Clock,
} from 'lucide-react';

interface AuthNetworkVisualProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

interface CollaborationDeal {
  id: string;
  category: string;
  creator: {
    name: string;
    handle: string;
    category: string;
    followers: string;
    rating: string;
    photoUrl: string;
    city: string;
  };
  brand: {
    name: string;
    industry: string;
    city: string;
    renderLogo: () => React.ReactNode;
  };
  deal: {
    amount: string;
    deliverable: string;
    statusBadge: string;
    statusVariant: 'amber' | 'emerald' | 'blue' | 'purple';
    turnaround: string;
    escrowAmount: string;
  };
}

const COLLABORATIONS: CollaborationDeal[] = [
  {
    id: 'collab-aisha-muse',
    category: 'Beauty',
    creator: {
      name: 'Aisha Rahman',
      handle: '@aishaskincare',
      category: 'Beauty & Skincare',
      followers: '1.2M',
      rating: '4.98',
      photoUrl: '/images/creators/aisha-rahman.webp',
      city: 'London',
    },
    brand: {
      name: 'Muse',
      industry: 'Luxury French Skincare',
      city: 'Paris',
      renderLogo: () => (
        <span className="font-serif italic font-bold text-xs sm:text-sm tracking-[-0.04em] text-[#0A0A0A]">
          muse.
        </span>
      ),
    },
    deal: {
      amount: '€1,450',
      deliverable: '1 Dedicated 4K Reel + 3 IG Stories',
      statusBadge: 'Draft in Review',
      statusVariant: 'amber',
      turnaround: '48h',
      escrowAmount: '€1,450 Funded',
    },
  },
  {
    id: 'collab-mina-pulse',
    category: 'Fashion',
    creator: {
      name: 'Mina Park',
      handle: '@minafashion',
      category: 'Fashion & Editorial',
      followers: '840K',
      rating: '4.95',
      photoUrl: '/images/creators/mina-park.webp',
      city: 'Milan',
    },
    brand: {
      name: 'Pulse',
      industry: 'Performance Activewear',
      city: 'Berlin',
      renderLogo: () => (
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-[#111111] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 32 32" className="w-2.5 h-2.5" fill="none">
              <path d="M7 18.5 15.5 5H25l-8 10.5h8L13.5 27h-7l7.5-8.5H7Z" fill="#FF2D78" />
            </svg>
          </div>
          <span className="font-sans font-black text-[11px] tracking-wider text-[#0A0A0A] uppercase">
            PULSE
          </span>
        </div>
      ),
    },
    deal: {
      amount: '€2,100',
      deliverable: 'Editorial UGC Lookbook & Stills',
      statusBadge: 'Content Approved',
      statusVariant: 'emerald',
      turnaround: '72h',
      escrowAmount: '€2,100 Funded',
    },
  },
  {
    id: 'collab-jordan-luma',
    category: 'Tech',
    creator: {
      name: 'Jordan Brooks',
      handle: '@jordanb.tech',
      category: 'Studio & Aesthetics',
      followers: '650K',
      rating: '4.92',
      photoUrl: '/images/creators/jordan-brooks.webp',
      city: 'Stockholm',
    },
    brand: {
      name: 'Luma',
      industry: 'Smart Beauty Tech',
      city: 'Amsterdam',
      renderLogo: () => (
        <span className="font-sans font-black text-[11px] tracking-[0.14em] text-[#0A0A0A] uppercase">
          LUMA
        </span>
      ),
    },
    deal: {
      amount: '€1,200',
      deliverable: '2 Testimonials & Unboxing Reels',
      statusBadge: 'In Production',
      statusVariant: 'blue',
      turnaround: '24h remaining',
      escrowAmount: '€1,200 Funded',
    },
  },
  {
    id: 'collab-luca-nera',
    category: 'Menswear',
    creator: {
      name: 'Luca Moretti',
      handle: '@lucamoretti',
      category: 'Menswear & Travel',
      followers: '920K',
      rating: '5.0',
      photoUrl: '/images/creators/luca-moretti.webp',
      city: 'Barcelona',
    },
    brand: {
      name: 'Atelier Nera',
      industry: 'Tailored Luxury Goods',
      city: 'Milano',
      renderLogo: () => (
        <div className="flex flex-col items-start leading-none">
          <span className="font-serif font-black text-[10px] tracking-widest text-[#0A0A0A]">
            NERA
          </span>
          <span className="text-[5.5px] font-bold tracking-[0.2em] text-[#66665E] uppercase">
            ATELIER
          </span>
        </div>
      ),
    },
    deal: {
      amount: '€1,850',
      deliverable: 'Seasonal Campaign Ambassador',
      statusBadge: 'Payout Released',
      statusVariant: 'emerald',
      turnaround: 'Delivered',
      escrowAmount: '€1,850 Released',
    },
  },
];

export function AuthNetworkVisual({
  title = '',
  subtitle = '',
  className = '',
}: AuthNetworkVisualProps) {
  const [activeDealId, setActiveDealId] = useState<string>(COLLABORATIONS[0].id);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through collaboration highlights unless user hovers
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveDealId((currentId) => {
        const currentIndex = COLLABORATIONS.findIndex((c) => c.id === currentId);
        const nextIndex = (currentIndex + 1) % COLLABORATIONS.length;
        return COLLABORATIONS[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeDeal = COLLABORATIONS.find((c) => c.id === activeDealId) || COLLABORATIONS[0];

  return (
    <div
      className={`relative w-full rounded-3xl bg-gradient-to-br from-white via-[#FAF9F5] to-[#F5F1FD] border border-[#E7E7E2] p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(10,10,10,0.06)] flex flex-col justify-between overflow-hidden select-none font-sans ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <style>{`
        @keyframes energy-stream-flow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-energy-stream {
          stroke-dasharray: 6 5;
          animation: energy-stream-flow 1.2s linear infinite;
        }
        @keyframes orbit-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        .animate-orbit-ring {
          animation: orbit-pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Atmospheric Ambient Glow Blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-100/45 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-100/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Blueprint Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A0A0A_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

      {/* TOP HEADER: Live Ecosystem Indicator & Quick Category Filter */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-[#E7E7E2]/75">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0A0A0A]">
            Marketplace Ecosystem
          </span>
        </div>

        {/* Live Escrow Protection Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#E7E7E2] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[11px] font-extrabold text-[#0A0A0A]">
            €2.4M+ <span className="text-[#66665E] font-medium">Protected</span>
          </span>
        </div>
      </div>

      {/* CENTER ORBIT STAGE: 4 Collaboration Cards + Connected Influverse Hub */}
      <div className="relative z-10 my-3 h-[320px] sm:h-[330px] flex items-center justify-center">
        {/* Concentric Orbital Rings */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-purple-200/50 pointer-events-none animate-orbit-ring" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-[#D2D2CA]/50 pointer-events-none" />

        {/* SVG Curved Connection Vectors */}
        <svg
          viewBox="0 0 460 320"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        >
          <defs>
            <linearGradient id="stream-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B70F8" />
              <stop offset="50%" stopColor="#FF2D78" />
              <stop offset="100%" stopColor="#8B70F8" />
            </linearGradient>
            <linearGradient id="stream-faint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4CCF7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E2DCF7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Spline: Top-Left (Aisha Rahman × Muse) */}
          <path
            d="M 230 160 C 190 160 140 115 115 75"
            fill="none"
            stroke={activeDealId === 'collab-aisha-muse' ? 'url(#stream-active)' : 'url(#stream-faint)'}
            strokeWidth={activeDealId === 'collab-aisha-muse' ? 2.5 : 1.25}
            className={activeDealId === 'collab-aisha-muse' ? 'animate-energy-stream' : ''}
          />

          {/* Spline: Top-Right (Mina Park × Pulse) */}
          <path
            d="M 230 160 C 270 160 320 115 345 75"
            fill="none"
            stroke={activeDealId === 'collab-mina-pulse' ? 'url(#stream-active)' : 'url(#stream-faint)'}
            strokeWidth={activeDealId === 'collab-mina-pulse' ? 2.5 : 1.25}
            className={activeDealId === 'collab-mina-pulse' ? 'animate-energy-stream' : ''}
          />

          {/* Spline: Bottom-Left (Jordan Brooks × Luma) */}
          <path
            d="M 230 160 C 190 160 140 205 115 245"
            fill="none"
            stroke={activeDealId === 'collab-jordan-luma' ? 'url(#stream-active)' : 'url(#stream-faint)'}
            strokeWidth={activeDealId === 'collab-jordan-luma' ? 2.5 : 1.25}
            className={activeDealId === 'collab-jordan-luma' ? 'animate-energy-stream' : ''}
          />

          {/* Spline: Bottom-Right (Luca Moretti × Atelier Nera) */}
          <path
            d="M 230 160 C 270 160 320 205 345 245"
            fill="none"
            stroke={activeDealId === 'collab-luca-nera' ? 'url(#stream-active)' : 'url(#stream-faint)'}
            strokeWidth={activeDealId === 'collab-luca-nera' ? 2.5 : 1.25}
            className={activeDealId === 'collab-luca-nera' ? 'animate-energy-stream' : ''}
          />

          {/* Center Point Glow */}
          <circle cx="230" cy="160" r="3.5" fill="#8B70F8" />
        </svg>

        {/* 1. TOP-LEFT CARD: Aisha Rahman × Muse */}
        <div
          onClick={() => setActiveDealId('collab-aisha-muse')}
          onMouseEnter={() => setActiveDealId('collab-aisha-muse')}
          className={`absolute top-0 left-0 w-[47%] max-w-[215px] transition-all duration-300 cursor-pointer ${
            activeDealId === 'collab-aisha-muse'
              ? 'scale-[1.03] z-30'
              : 'scale-100 z-10 opacity-90 hover:opacity-100'
          }`}
        >
          <div
            className={`p-2.5 sm:p-3 rounded-2xl bg-white transition-all duration-300 ${
              activeDealId === 'collab-aisha-muse'
                ? 'border-2 border-[#FF2D78] shadow-[0_10px_25px_-5px_rgba(255,45,120,0.18)]'
                : 'border border-[#E7E7E2] shadow-xs hover:border-[#0A0A0A]'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#F4F4F0]">
                  <Image
                    src={COLLABORATIONS[0].creator.photoUrl}
                    alt={COLLABORATIONS[0].creator.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
                      {COLLABORATIONS[0].creator.name}
                    </span>
                    <VerifiedBadge size="xs" />
                  </div>
                  <span className="text-[9.5px] text-[#66665E] block leading-none truncate">
                    {COLLABORATIONS[0].creator.followers} • Beauty
                  </span>
                </div>
              </div>

              <div className="px-1.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E7E7E2] shrink-0">
                {COLLABORATIONS[0].brand.renderLogo()}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F0EB] text-[10px]">
              <span className="font-black text-[#0A0A0A]">{COLLABORATIONS[0].deal.amount}</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 font-semibold text-[9px]">
                <Clock className="w-2.5 h-2.5" />
                {COLLABORATIONS[0].deal.statusBadge}
              </span>
            </div>
          </div>
        </div>

        {/* 2. TOP-RIGHT CARD: Mina Park × Pulse */}
        <div
          onClick={() => setActiveDealId('collab-mina-pulse')}
          onMouseEnter={() => setActiveDealId('collab-mina-pulse')}
          className={`absolute top-0 right-0 w-[47%] max-w-[215px] transition-all duration-300 cursor-pointer ${
            activeDealId === 'collab-mina-pulse'
              ? 'scale-[1.03] z-30'
              : 'scale-100 z-10 opacity-90 hover:opacity-100'
          }`}
        >
          <div
            className={`p-2.5 sm:p-3 rounded-2xl bg-white transition-all duration-300 ${
              activeDealId === 'collab-mina-pulse'
                ? 'border-2 border-[#FF2D78] shadow-[0_10px_25px_-5px_rgba(255,45,120,0.18)]'
                : 'border border-[#E7E7E2] shadow-xs hover:border-[#0A0A0A]'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#F4F4F0]">
                  <Image
                    src={COLLABORATIONS[1].creator.photoUrl}
                    alt={COLLABORATIONS[1].creator.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
                      {COLLABORATIONS[1].creator.name}
                    </span>
                    <VerifiedBadge size="xs" />
                  </div>
                  <span className="text-[9.5px] text-[#66665E] block leading-none truncate">
                    {COLLABORATIONS[1].creator.followers} • Fashion
                  </span>
                </div>
              </div>

              <div className="px-1.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E7E7E2] shrink-0">
                {COLLABORATIONS[1].brand.renderLogo()}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F0EB] text-[10px]">
              <span className="font-black text-[#0A0A0A]">{COLLABORATIONS[1].deal.amount}</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-semibold text-[9px]">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                {COLLABORATIONS[1].deal.statusBadge}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER HUB: Influverse Escrow Engine */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#8B70F8] to-[#FF2D78] opacity-25 blur-lg group-hover:opacity-40 transition-opacity" />

            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_10px_30px_rgba(139,112,248,0.22)] flex flex-col items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#0A0A0A] transition-transform duration-300 group-hover:scale-110"
              >
                <circle cx="34" cy="36" r="13" fill="currentColor" />
                <path
                  d="M32 50 H52 L76 24 C80 20 86 20 90 24 C94 28 94 34 90 38 L58 74 C52 80 44 80 38 74 L24 60 C20 56 20 50 24 46 C28 42 32 46 32 50 Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-[8px] font-black tracking-tight text-[#0A0A0A] mt-0.5">
                INFLUVERSE
              </span>
            </div>

            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[8px] font-extrabold tracking-wider uppercase whitespace-nowrap shadow-md flex items-center gap-1">
              <Lock className="w-2 h-2 text-[#FF2D78]" />
              <span>Escrow Hub</span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM-LEFT CARD: Jordan Brooks × LUMA */}
        <div
          onClick={() => setActiveDealId('collab-jordan-luma')}
          onMouseEnter={() => setActiveDealId('collab-jordan-luma')}
          className={`absolute bottom-0 left-0 w-[47%] max-w-[215px] transition-all duration-300 cursor-pointer ${
            activeDealId === 'collab-jordan-luma'
              ? 'scale-[1.03] z-30'
              : 'scale-100 z-10 opacity-90 hover:opacity-100'
          }`}
        >
          <div
            className={`p-2.5 sm:p-3 rounded-2xl bg-white transition-all duration-300 ${
              activeDealId === 'collab-jordan-luma'
                ? 'border-2 border-[#FF2D78] shadow-[0_10px_25px_-5px_rgba(255,45,120,0.18)]'
                : 'border border-[#E7E7E2] shadow-xs hover:border-[#0A0A0A]'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#F4F4F0]">
                  <Image
                    src={COLLABORATIONS[2].creator.photoUrl}
                    alt={COLLABORATIONS[2].creator.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
                      {COLLABORATIONS[2].creator.name}
                    </span>
                    <VerifiedBadge size="xs" />
                  </div>
                  <span className="text-[9.5px] text-[#66665E] block leading-none truncate">
                    {COLLABORATIONS[2].creator.followers} • Studio
                  </span>
                </div>
              </div>

              <div className="px-1.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E7E7E2] shrink-0">
                {COLLABORATIONS[2].brand.renderLogo()}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F0EB] text-[10px]">
              <span className="font-black text-[#0A0A0A]">{COLLABORATIONS[2].deal.amount}</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/70 font-semibold text-[9px]">
                <Zap className="w-2.5 h-2.5 text-blue-600" />
                {COLLABORATIONS[2].deal.statusBadge}
              </span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM-RIGHT CARD: Luca Moretti × Atelier Nera */}
        <div
          onClick={() => setActiveDealId('collab-luca-nera')}
          onMouseEnter={() => setActiveDealId('collab-luca-nera')}
          className={`absolute bottom-0 right-0 w-[47%] max-w-[215px] transition-all duration-300 cursor-pointer ${
            activeDealId === 'collab-luca-nera'
              ? 'scale-[1.03] z-30'
              : 'scale-100 z-10 opacity-90 hover:opacity-100'
          }`}
        >
          <div
            className={`p-2.5 sm:p-3 rounded-2xl bg-white transition-all duration-300 ${
              activeDealId === 'collab-luca-nera'
                ? 'border-2 border-[#FF2D78] shadow-[0_10px_25px_-5px_rgba(255,45,120,0.18)]'
                : 'border border-[#E7E7E2] shadow-xs hover:border-[#0A0A0A]'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-[#F4F4F0]">
                  <Image
                    src={COLLABORATIONS[3].creator.photoUrl}
                    alt={COLLABORATIONS[3].creator.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
                      {COLLABORATIONS[3].creator.name}
                    </span>
                    <VerifiedBadge size="xs" />
                  </div>
                  <span className="text-[9.5px] text-[#66665E] block leading-none truncate">
                    {COLLABORATIONS[3].creator.followers} • Menswear
                  </span>
                </div>
              </div>

              <div className="px-1.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E7E7E2] shrink-0">
                {COLLABORATIONS[3].brand.renderLogo()}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F0EB] text-[10px]">
              <span className="font-black text-[#0A0A0A]">{COLLABORATIONS[3].deal.amount}</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 font-semibold text-[9px]">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                {COLLABORATIONS[3].deal.statusBadge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SPOTLIGHT DETAIL STRIP: Currently Selected Campaign Scope */}
      <div className="relative z-10 pt-2.5 pb-2 px-3 rounded-2xl bg-white border border-[#E7E7E2] shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2D78]">
              Spotlight
            </span>
            <span className="text-[#D2D2CA]">•</span>
            <span className="text-xs font-bold text-[#0A0A0A] truncate">
              {activeDeal.creator.name} × {activeDeal.brand.name}
            </span>
          </div>
          <span className="text-[11px] font-black text-[#0A0A0A] bg-[#F4F4F0] px-2 py-0.5 rounded-md shrink-0">
            {activeDeal.deal.amount}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px] text-[#66665E]">
          <span className="truncate text-[10.5px]">
            {activeDeal.deal.deliverable}
          </span>
          <div className="flex items-center gap-2 shrink-0 font-medium text-[10.5px]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              {activeDeal.deal.escrowAmount}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM TRUST RIBBON: Key Marketplace Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-2.5 border-t border-[#E7E7E2]/70 text-center">
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#E7E7E2]/60">
          <div className="text-xs font-black text-[#0A0A0A]">3,400+</div>
          <div className="text-[9.5px] text-[#66665E] font-medium">Vetted Creators</div>
        </div>
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#E7E7E2]/60">
          <div className="text-xs font-black text-[#0A0A0A]">48 Hours</div>
          <div className="text-[9.5px] text-[#66665E] font-medium">Avg Delivery</div>
        </div>
        <div className="p-1.5 rounded-xl bg-white/70 border border-[#E7E7E2]/60">
          <div className="text-xs font-black text-[#0A0A0A]">100% Secure</div>
          <div className="text-[9.5px] text-[#66665E] font-medium">Escrow Protected</div>
        </div>
      </div>

      {/* Optional Title/Subtitle if passed */}
      {title ? (
        <div className="relative z-10 text-center pt-2">
          <h3 className="text-base font-black text-[#0A0A0A] tracking-tight">{title}</h3>
          {subtitle ? <p className="text-xs text-[#66665E] mt-0.5">{subtitle}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
export default AuthNetworkVisual;
