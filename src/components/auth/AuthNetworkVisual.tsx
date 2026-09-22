'use client';

import React from 'react';
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
    // 1. Creator (Top-Left): Sophie Kim - Beauty & Skincare
    {
      type: 'creator',
      id: 'creator-sophie',
      name: 'Sophie Kim',
      category: 'Beauty & Skincare',
      followers: '1.2M',
      photoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      x: 130,
      y: 85,
      cx: 190,
      cy: 150,
      delay: '0.4s',
      animationClass: 'animate-float-1',
    },

    // 2. Brand (Top-Right): Nike - Global Partner
    {
      type: 'brand',
      id: 'brand-nike',
      name: 'Nike',
      tagline: 'Global Athletic Partner',
      x: 380,
      y: 65,
      cx: 345,
      cy: 145,
      delay: '0.8s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0A0A0A]" fill="currentColor">
            <path d="M21.707 5.293c-.267-.267-.688-.319-1.011-.125C15.65 8.193 11.234 9.9 8.212 9.9c-2.482 0-3.923-1.12-4.14-3.21-.05-.48-.445-.85-.928-.85-.515 0-.936.42-.936.936 0 4.296 3.01 6.824 6.84 6.824 3.72 0 8.65-2.09 12.35-7.397.23-.33.15-.79-.12-1.06z" />
          </svg>
        </div>
      ),
    },

    // 3. Creator (Far Top-Right): Maya Chen - High Fashion
    {
      type: 'creator',
      id: 'creator-maya',
      name: 'Maya Chen',
      category: 'Fashion & Editorial',
      followers: '840K',
      photoUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      x: 480,
      y: 145,
      cx: 395,
      cy: 185,
      delay: '1.2s',
      animationClass: 'animate-float-3',
    },

    // 4. Brand (Mid-Left): Glossier - Direct Beauty Partner
    {
      type: 'brand',
      id: 'brand-glossier',
      name: 'Glossier',
      tagline: 'Beauty Partner',
      x: 75,
      y: 185,
      cx: 165,
      cy: 210,
      delay: '1.6s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="h-11 sm:h-12 px-4 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="font-serif italic font-bold text-sm tracking-tight text-[#0A0A0A]">
            Glossier.
          </span>
        </div>
      ),
    },

    // 5. Brand (Mid-Right): Dyson - Tech & Beauty Innovations
    {
      type: 'brand',
      id: 'brand-dyson',
      name: 'Dyson',
      tagline: 'Tech & Lifestyle Partner',
      x: 485,
      y: 260,
      cx: 395,
      cy: 255,
      delay: '2.0s',
      animationClass: 'animate-float-1',
      renderLogo: () => (
        <div className="h-11 sm:h-12 px-3.5 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="font-sans font-black text-sm tracking-tight text-[#0A0A0A] lowercase">
            dyson
          </span>
        </div>
      ),
    },

    // 6. Creator (Bottom Mid-Left): Noah Becker - Tech & Studio
    {
      type: 'creator',
      id: 'creator-noah',
      name: 'Noah Becker',
      category: 'Tech & Aesthetics',
      followers: '650K',
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      x: 95,
      y: 320,
      cx: 175,
      cy: 295,
      delay: '0.6s',
      animationClass: 'animate-float-1',
    },

    // 7. Brand (Bottom Mid-Right): Prada - Luxury Milan House
    {
      type: 'brand',
      id: 'brand-prada',
      name: 'Prada',
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
            PRADA
          </span>
          <span className="text-[6.5px] font-bold tracking-[0.2em] text-[#73736A] uppercase -mt-0.5">
            MILANO
          </span>
        </div>
      ),
    },

    // 8. Brand (Bottom-Left): Sephora - Beauty Retail
    {
      type: 'brand',
      id: 'brand-sephora',
      name: 'Sephora',
      tagline: 'Global Beauty Retail',
      x: 160,
      y: 435,
      cx: 210,
      cy: 360,
      delay: '1.8s',
      animationClass: 'animate-float-2',
      renderLogo: () => (
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#E7E7E2] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0A0A0A]" fill="currentColor">
            <path d="M12.8 2C9.5 5 7.8 7.6 7.8 10.4c0 3.1 2.2 4.9 4.3 6.3 1.9 1.3 3.1 2.4 3.1 4.1 0 1.6-1.3 2.7-3.2 2.7-1.8 0-3.3-.9-4.2-2.1l-1.3 1.5c1.3 1.6 3.3 2.6 5.5 2.6 3.2 0 5.4-1.9 5.4-4.7 0-3-2.1-4.8-4.3-6.2-2-1.3-3.1-2.4-3.1-4.2 0-2.2 1.6-4.3 4.1-6.4L12.8 2z" />
          </svg>
        </div>
      ),
    },

    // 9. Creator (Bottom-Right): Liam Carter - Fitness & Travel
    {
      type: 'creator',
      id: 'creator-liam',
      name: 'Liam Carter',
      category: 'Fitness & Travel',
      followers: '920K',
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
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
      className={`relative w-full h-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 select-none ${className}`}
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-[3.5px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] ring-1 ring-black/5 bg-[#FAFAF8] transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={node.photoUrl}
                      alt={node.name}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
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
