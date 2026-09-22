'use client';

import React from 'react';
import Image from 'next/image';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

interface AuthNetworkVisualProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

interface CreatorNode {
  type: 'creator';
  id: string;
  name: string;
  category: string;
  followers: string;
  photoUrl: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  delay: string;
  animationClass: string;
}

interface BrandNode {
  type: 'brand';
  id: string;
  name: string;
  tagline: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  delay: string;
  animationClass: string;
  renderLogo: () => React.ReactNode;
}

type NetworkNode = CreatorNode | BrandNode;

export function AuthNetworkVisual({
  title = '',
  subtitle = '',
  className = '',
}: AuthNetworkVisualProps) {
  // Center Hub coordinates
  const centerX = 280;
  const centerY = 250;
  const canvasWidth = 560;
  const canvasHeight = 500;

  // Curated list of verified creators with realistic portrait photography
  // and prestigious global brand partners (alternating in a 360-degree orbit)
  const nodes: NetworkNode[] = [
    // 1. Creator (Top-Left): Aisha Rahman - Beauty & Skincare
    {
      type: 'creator',
      id: 'creator-aisha',
      name: 'Aisha Rahman',
      category: 'Beauty & Skincare',
      followers: '1.2M',
      photoUrl: '/images/creators/aisha-rahman.webp',
      x: 130,
      y: 85,
      cx: 190,
      cy: 150,
      delay: '0.4s',
      animationClass: 'animate-float-1',
    },

    // 2. Brand (Top-Right): Pulse - Activewear Partner
    {
      type: 'brand',
      id: 'brand-pulse',
      name: 'Pulse',
      tagline: 'Activewear Partner',
      x: 380,
      y: 65,
      cx: 345,
      cy: 145,
      delay: '0.8s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="w-14 h-14 rounded-2xl bg-[#111111] border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.10)] flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" aria-hidden="true">
            <path d="M7 18.5 15.5 5H25l-8 10.5h8L13.5 27h-7l7.5-8.5H7Z" fill="#FF2D78" />
          </svg>
        </div>
      ),
    },

    // 3. Creator (Far Top-Right): Mina Park - High Fashion
    {
      type: 'creator',
      id: 'creator-mina',
      name: 'Mina Park',
      category: 'Fashion & Editorial',
      followers: '840K',
      photoUrl: '/images/creators/mina-park.webp',
      x: 480,
      y: 145,
      cx: 395,
      cy: 185,
      delay: '1.2s',
      animationClass: 'animate-float-3',
    },

    // 4. Brand (Mid-Left): Muse - Beauty Partner
    {
      type: 'brand',
      id: 'brand-muse',
      name: 'Muse',
      tagline: 'Beauty Partner',
      x: 75,
      y: 185,
      cx: 165,
      cy: 210,
      delay: '1.6s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="h-11 sm:h-12 px-4 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="font-serif italic font-bold text-base tracking-[-0.06em] text-[#0A0A0A]">
            muse.
          </span>
        </div>
      ),
    },

    // 5. Brand (Mid-Right): Luma - Beauty Technology
    {
      type: 'brand',
      id: 'brand-luma',
      name: 'Luma',
      tagline: 'Beauty Technology',
      x: 485,
      y: 260,
      cx: 395,
      cy: 255,
      delay: '2.0s',
      animationClass: 'animate-float-1',
      renderLogo: () => (
        <div className="h-11 sm:h-12 px-3.5 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="font-sans font-black text-sm tracking-[0.18em] text-[#0A0A0A] uppercase">
            LUMA
          </span>
        </div>
      ),
    },

    // 6. Creator (Bottom Mid-Left): Jordan Brooks - Tech & Studio
    {
      type: 'creator',
      id: 'creator-jordan',
      name: 'Jordan Brooks',
      category: 'Tech & Aesthetics',
      followers: '650K',
      photoUrl: '/images/creators/jordan-brooks.webp',
      x: 95,
      y: 320,
      cx: 175,
      cy: 295,
      delay: '0.6s',
      animationClass: 'animate-float-1',
    },

    // 7. Brand (Bottom Mid-Right): Atelier Nera - Luxury Fashion
    {
      type: 'brand',
      id: 'brand-atelier-nera',
      name: 'Atelier Nera',
      tagline: 'Luxury Fashion Partner',
      x: 460,
      y: 375,
      cx: 385,
      cy: 325,
      delay: '1.4s',
      animationClass: 'animate-float-3',
      renderLogo: () => (
        <div className="h-11 sm:h-12 px-3.5 py-1 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="font-serif font-black text-xs tracking-widest text-[#0A0A0A]">
            NERA
          </span>
          <span className="text-[6.5px] font-bold tracking-[0.2em] text-[#73736A] uppercase -mt-0.5">
            ATELIER
          </span>
        </div>
      ),
    },

    // 8. Brand (Bottom-Left): Sora - Beauty Retail
    {
      type: 'brand',
      id: 'brand-sora',
      name: 'Sora',
      tagline: 'Modern Beauty Retail',
      x: 160,
      y: 435,
      cx: 210,
      cy: 360,
      delay: '1.8s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 32 32" className="w-7 h-7 text-[#0A0A0A]" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" />
            <path d="M10 18c3.2-6.5 8.6-8 13-6.5-2 1-3.1 3-3.7 5.1-.8 2.9-2.5 5-6.3 5.9" stroke="#FF2D78" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      ),
    },

    // 9. Creator (Bottom-Right): Luca Moretti - Fitness & Travel
    {
      type: 'creator',
      id: 'creator-luca',
      name: 'Luca Moretti',
      category: 'Fitness & Travel',
      followers: '920K',
      photoUrl: '/images/creators/luca-moretti.webp',
      x: 375,
      y: 430,
      cx: 335,
      cy: 355,
      delay: '2.2s',
      animationClass: 'animate-float-1',
    },
  ];

  return (
    <div
      className={`relative w-full h-full min-h-[500px] lg:min-h-[520px] flex flex-col justify-center items-center p-4 sm:p-5 lg:p-6 select-none ${className}`}
    >
      {/* Soft Ambient Radial Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-purple-200/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-4 right-4 w-72 h-72 bg-pink-100/35 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-72 h-72 bg-indigo-100/35 rounded-full blur-[90px] pointer-events-none" />

      {/* Network Canvas Section (Strict Aspect Ratio for 100% Exact Geometric Alignment) */}
      <div className="relative w-full max-w-[560px] aspect-[560/500] flex items-center justify-center mx-auto my-auto">
        {/* SVG Connecting Curved Paths & Animated Pulsing Beads */}
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        >
          {/* Subtle connecting curved rays from Center to each Satellite Node */}
          <g stroke="#D4CCF7" strokeWidth="1.75" strokeLinecap="round">
            {nodes.map((node) => (
              <path
                key={`path-${node.id}`}
                d={`M ${centerX} ${centerY} Q ${node.cx} ${node.cy} ${node.x} ${node.y}`}
              />
            ))}
          </g>

          {/* Glowing Violet Animated Pulsing Connection Beads along curves */}
          <g fill="#8B70F8">
            {nodes.map((node) => {
              // Calculate quadratic bezier point at t = 0.52 for mathematically accurate bead positioning
              const t = 0.52;
              const mt = 1 - t;
              const beadX = mt * mt * centerX + 2 * mt * t * node.cx + t * t * node.x;
              const beadY = mt * mt * centerY + 2 * mt * t * node.cy + t * t * node.y;

              return (
                <circle
                  key={`bead-${node.id}`}
                  cx={beadX}
                  cy={beadY}
                  r="4"
                  className="animate-pulse-dot"
                  style={{ animationDelay: node.delay }}
                />
              );
            })}
          </g>
        </svg>

        {/* CENTER NODE: Influverse Monogram Luxury Elevated Card */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          style={{
            left: `${(centerX / canvasWidth) * 100}%`,
            top: `${(centerY / canvasHeight) * 100}%`,
          }}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-[0_14px_40px_rgba(139,112,248,0.22),0_2px_10px_rgba(0,0,0,0.04)] border border-[#ECE6FB] flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 cursor-pointer group">
            {/* Stylized Influverse Monogram */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#0A0A0A] transition-transform duration-300 group-hover:scale-110"
            >
              <circle cx="34" cy="36" r="13" fill="currentColor" />
              <path
                d="M32 50 H52 L76 24 C80 20 86 20 90 24 C94 28 94 34 90 38 L58 74 C52 80 44 80 38 74 L24 60 C20 56 20 50 24 46 C28 42 32 46 32 50 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* SATELLITE NODES: Verified Creators & Prestigious Brands */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${(node.x / canvasWidth) * 100}%`,
              top: `${(node.y / canvasHeight) * 100}%`,
            }}
          >
            {/* Gentle organic floating motion container */}
            <div className={node.animationClass}>
              {node.type === 'creator' ? (
                <div className="group relative cursor-pointer">
                  {/* High-Resolution Portrait Photo */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-[3.5px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] ring-1 ring-black/5 bg-[#FAFAF8] transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={node.photoUrl}
                      alt={node.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Verified Creator Checkmark Badge */}
                  <div className="absolute -bottom-0.5 -right-0.5 pointer-events-none">
                    <VerifiedBadge size="xs" />
                  </div>

                  {/* Interactive Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-30">
                    {node.name} • {node.category}
                  </div>
                </div>
              ) : (
                <div className="group relative cursor-pointer">
                  {/* Brand Card with Authentic Mark */}
                  {node.renderLogo()}

                  {/* Interactive Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-30">
                    {node.name} • {node.tagline}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional Typography Section */}
      {title ? (
        <div className="relative z-10 text-center pt-6 pb-4 space-y-2 mt-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight font-sans">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed max-w-md mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
