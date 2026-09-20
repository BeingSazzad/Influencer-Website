'use client';

import React from 'react';

interface AuthNetworkVisualProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function AuthNetworkVisual({
  title = 'Great work starts with a connection.',
  subtitle = 'A shared space for brands and creators.',
  className = '',
}: AuthNetworkVisualProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[580px] lg:min-h-[640px] rounded-[32px] overflow-hidden bg-gradient-to-b from-[#FAF9FE] via-[#F7F5FC] to-[#F5F2FA] border border-[#EBE6F7] shadow-xl shadow-purple-500/5 flex flex-col justify-between p-6 sm:p-8 select-none ${className}`}
    >
      {/* Smooth Soft Ambient Radial Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/35 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-200/25 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Network Canvas Section */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[420px]">
        {/* SVG Connecting Curved Paths & Dots */}
        <svg
          viewBox="0 0 520 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        >
          {/* Subtle connecting lines from Center (260, 220) */}
          <g stroke="#D4CCF7" strokeWidth="1.75" strokeLinecap="round">
            {/* Center to Top-Left Creator (145, 55) */}
            <path d="M 260 220 C 220 150, 180 90, 145 55" />
            
            {/* Center to Top-Right Nike (395, 45) */}
            <path d="M 260 220 C 310 140, 360 80, 395 45" />

            {/* Center to Top-Far-Right Creator (455, 120) */}
            <path d="M 260 220 C 340 185, 410 155, 455 120" />

            {/* Center to Glossier (65, 140) */}
            <path d="M 260 220 C 180 190, 120 160, 65 140" />

            {/* Center to Starbucks (435, 185) */}
            <path d="M 260 220 C 330 205, 385 195, 435 185" />

            {/* Center to Middle-Right Creator (465, 275) */}
            <path d="M 260 220 C 345 235, 420 255, 465 275" />

            {/* Center to Bottom-Left Creator (80, 260) */}
            <path d="M 260 220 C 190 225, 130 245, 80 260" />

            {/* Center to Airbnb (115, 365) */}
            <path d="M 260 220 C 195 280, 150 330, 115 365" />

            {/* Center to Bottom Creator (250, 375) */}
            <path d="M 260 220 C 255 275, 252 330, 250 375" />

            {/* Center to Lego (440, 365) */}
            <path d="M 260 220 C 335 280, 395 330, 440 365" />
          </g>

          {/* Glowing Violet Connection Beads / Dots along lines */}
          <g fill="#8B70F8">
            <circle cx="205" cy="115" r="4" className="animate-pulse-dot" />
            <circle cx="330" cy="100" r="4.5" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
            <circle cx="385" cy="160" r="4" className="animate-pulse-dot" style={{ animationDelay: '1s' }} />
            <circle cx="125" cy="170" r="4.5" className="animate-pulse-dot" style={{ animationDelay: '1.5s' }} />
            <circle cx="350" cy="198" r="3.5" className="animate-pulse-dot" style={{ animationDelay: '0.8s' }} />
            <circle cx="395" cy="252" r="4" className="animate-pulse-dot" style={{ animationDelay: '2s' }} />
            <circle cx="140" cy="242" r="4.5" className="animate-pulse-dot" style={{ animationDelay: '1.2s' }} />
            <circle cx="165" cy="315" r="4" className="animate-pulse-dot" style={{ animationDelay: '1.8s' }} />
            <circle cx="254" cy="310" r="4.5" className="animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
            <circle cx="365" cy="295" r="4" className="animate-pulse-dot" style={{ animationDelay: '2.2s' }} />
          </g>
        </svg>

        {/* 1. CENTER NODE: Elevated White Card with Influverse Monogram */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-[0_12px_36px_rgba(139,112,248,0.18),0_2px_8px_rgba(0,0,0,0.04)] border border-[#ECE6FB] flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 cursor-pointer group">
            {/* Stylized Influverse V Monogram */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
            >
              <circle cx="34" cy="36" r="13" fill="#0A0A0A" />
              <path
                d="M32 50 H52 L76 24 C80 20 86 20 90 24 C94 28 94 34 90 38 L58 74 C52 80 44 80 38 74 L24 60 C20 56 20 50 24 46 C28 42 32 46 32 50 Z"
                fill="#0A0A0A"
              />
            </svg>
          </div>
        </div>

        {/* 2. SURROUNDING NODES */}

        {/* Node A: Top-Left Creator Avatar (Dark Bob, Lavender) */}
        <div className="absolute top-[4%] left-[22%] sm:left-[24%] z-10 animate-float-1">
          <div className="group relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E8E2FF] border-[3.5px] border-white shadow-[0_8px_20px_rgba(139,112,248,0.15)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Illustrated Creator Character */}
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="32" r="32" fill="#E8E2FF" />
                {/* Hair back */}
                <path d="M16 32 C16 18, 48 18, 48 32 C48 42, 44 46, 44 46 L20 46 C20 46, 16 42, 16 32 Z" fill="#2A1B28" />
                {/* Neck & Shoulder */}
                <path d="M28 40 L36 40 L36 48 L28 48 Z" fill="#F3BFA4" />
                <path d="M18 58 C18 48, 46 48, 46 58 L46 64 L18 64 Z" fill="#6054D6" />
                {/* Face */}
                <circle cx="32" cy="32" r="13" fill="#FAD1BC" />
                {/* Bangs / Bob Hair */}
                <path d="M18 28 C19 19, 45 19, 46 28 C41 23, 35 24, 32 25 C29 24, 23 23, 18 28 Z" fill="#2A1B28" />
                {/* Eyes & Smile */}
                <circle cx="28" cy="32" r="1.5" fill="#2A1B28" />
                <circle cx="36" cy="32" r="1.5" fill="#2A1B28" />
                <path d="M29 37 Q32 40 35 37" stroke="#2A1B28" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                {/* Gold earring */}
                <circle cx="19" cy="35" r="1.5" stroke="#F59E0B" strokeWidth="1" fill="none" />
              </svg>
            </div>
            {/* Tooltip */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Sophie Kim • Beauty
            </div>
          </div>
        </div>

        {/* Node B: Top-Right NIKE Brand Badge */}
        <div className="absolute top-[2%] right-[18%] sm:right-[20%] z-10 animate-float-2">
          <div className="group relative">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-[#ECE7F6] flex items-center justify-center p-2.5 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Nike Swoosh Icon */}
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0A0A0A]" fill="currentColor">
                <path d="M21.707 5.293c-.267-.267-.688-.319-1.011-.125C15.65 8.193 11.234 9.9 8.212 9.9c-2.482 0-3.923-1.12-4.14-3.21-.05-.48-.445-.85-.928-.85-.515 0-.936.42-.936.936 0 4.296 3.01 6.824 6.84 6.824 3.72 0 8.65-2.09 12.35-7.397.23-.33.15-.79-.12-1.06z" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Nike • Brand Partner
            </div>
          </div>
        </div>

        {/* Node C: Top-Right Creator Avatar (Beanie & Glasses, Sage Mint) */}
        <div className="absolute top-[18%] right-[4%] sm:right-[6%] z-10 animate-float-3">
          <div className="group relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DEF5E8] border-[3.5px] border-white shadow-[0_8px_20px_rgba(35,116,77,0.12)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Illustrated Creator Character with Beanie */}
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="32" r="32" fill="#DEF5E8" />
                {/* Neck & Shirt */}
                <path d="M28 40 L36 40 L36 48 L28 48 Z" fill="#D79E79" />
                <path d="M18 56 C18 48, 46 48, 46 56 L46 64 L18 64 Z" fill="#1E293B" />
                {/* Face & Beard */}
                <circle cx="32" cy="32" r="13" fill="#E2A782" />
                <path d="M22 34 C22 45, 42 45, 42 34 C42 41, 38 45, 32 45 C26 45, 22 41, 22 34 Z" fill="#1C1917" />
                {/* Glasses */}
                <circle cx="27" cy="31" r="3.5" stroke="#1C1917" strokeWidth="1.2" fill="none" />
                <circle cx="37" cy="31" r="3.5" stroke="#1C1917" strokeWidth="1.2" fill="none" />
                <line x1="30.5" y1="31" x2="33.5" y2="31" stroke="#1C1917" strokeWidth="1.2" />
                {/* Beanie */}
                <path d="M19 25 C19 14, 45 14, 45 25 Z" fill="#1E293B" />
                <rect x="18" y="23" width="28" height="4" rx="2" fill="#334155" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Marcus Vance • Tech
            </div>
          </div>
        </div>

        {/* Node D: Middle-Left GLOSSIER Brand Badge */}
        <div className="absolute top-[26%] left-[4%] sm:left-[6%] z-10 animate-float-2">
          <div className="group relative">
            <div className="rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-[#ECE7F6] px-3.5 py-2.5 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer">
              <span className="font-serif italic font-bold text-sm text-[#0A0A0A] tracking-tight">
                Glossier.
              </span>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Glossier • Beauty Partner
            </div>
          </div>
        </div>

        {/* Node E: Middle-Right STARBUCKS Brand Badge */}
        <div className="absolute top-[35%] right-[12%] sm:right-[15%] z-10 animate-float-1">
          <div className="group relative">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#EAF7EE] shadow-[0_8px_20px_rgba(0,98,65,0.12)] border border-[#D3EEDB] flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Starbucks Siren Emblem SVG */}
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-[#006241]">
                <circle cx="20" cy="20" r="18" fill="#006241" />
                <path
                  d="M20 8 L22 13 L27 13 L23 16 L25 21 L20 18 L15 21 L17 16 L13 13 L18 13 Z"
                  fill="#FFFFFF"
                />
                <circle cx="20" cy="22" r="5" fill="#FFFFFF" />
                <circle cx="20" cy="22" r="3" fill="#006241" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Starbucks • Brand Partner
            </div>
          </div>
        </div>

        {/* Node F: Middle-Right Creator Avatar (Auburn Hair, Blush Pink) */}
        <div className="absolute top-[52%] right-[3%] sm:right-[5%] z-10 animate-float-3">
          <div className="group relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFEAEF] border-[3.5px] border-white shadow-[0_8px_20px_rgba(255,45,120,0.12)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Illustrated Creator Character with Auburn Hair */}
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="32" r="32" fill="#FFEAEF" />
                {/* Hair behind */}
                <path d="M16 30 C16 16, 48 16, 48 30 C50 42, 44 48, 44 48 L20 48 C20 48, 14 42, 16 30 Z" fill="#C25E34" />
                {/* Neck & Shirt */}
                <path d="M28 40 L36 40 L36 48 L28 48 Z" fill="#FAD1BC" />
                <path d="M18 56 C18 48, 46 48, 46 56 L46 64 L18 64 Z" fill="#2E6954" />
                {/* Face */}
                <circle cx="32" cy="32" r="13" fill="#FEE0D2" />
                {/* Wavy hair front */}
                <path d="M17 26 C20 18, 44 18, 47 26 C43 28, 38 22, 32 23 C26 22, 21 28, 17 26 Z" fill="#C25E34" />
                {/* Face features */}
                <circle cx="28" cy="32" r="1.5" fill="#3D1D10" />
                <circle cx="36" cy="32" r="1.5" fill="#3D1D10" />
                <path d="M29 37 Q32 40 35 37" stroke="#3D1D10" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <circle cx="26" cy="35" r="2" fill="#FCA5A5" opacity="0.6" />
                <circle cx="38" cy="35" r="2" fill="#FCA5A5" opacity="0.6" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Chloe Lin • Lifestyle
            </div>
          </div>
        </div>

        {/* Node G: Bottom-Left Creator Avatar (Stylish Guy, Sunny Yellow) */}
        <div className="absolute top-[52%] left-[6%] sm:left-[8%] z-10 animate-float-1">
          <div className="group relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF3D6] border-[3.5px] border-white shadow-[0_8px_20px_rgba(234,179,8,0.12)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Illustrated Creator Character */}
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="32" r="32" fill="#FFF3D6" />
                {/* Hair */}
                <path d="M20 28 C20 16, 44 16, 44 28 C44 20, 38 17, 32 17 C26 17, 20 20, 20 28 Z" fill="#1E293B" />
                {/* Neck & Shirt */}
                <path d="M28 40 L36 40 L36 48 L28 48 Z" fill="#F3BFA4" />
                <path d="M18 56 C18 48, 46 48, 46 56 L46 64 L18 64 Z" fill="#0F172A" />
                {/* Face */}
                <circle cx="32" cy="32" r="13" fill="#FAD1BC" />
                {/* Hair Front */}
                <path d="M19 24 C23 18, 41 18, 45 24 C40 22, 35 22, 32 23 C28 22, 23 22, 19 24 Z" fill="#1E293B" />
                {/* Face Features */}
                <circle cx="28" cy="32" r="1.5" fill="#1E293B" />
                <circle cx="36" cy="32" r="1.5" fill="#1E293B" />
                <path d="M29 37 Q32 40 35 37" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              David Rossi • Fashion
            </div>
          </div>
        </div>

        {/* Node H: Bottom-Left AIRBNB Brand Badge */}
        <div className="absolute bottom-[6%] left-[16%] sm:left-[18%] z-10 animate-float-2">
          <div className="group relative">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white shadow-[0_8px_20px_rgba(255,90,95,0.12)] border border-[#ECE7F6] flex items-center justify-center p-2.5 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Airbnb Bélo Icon */}
              <svg viewBox="0 0 32 32" fill="#FF5A5F" className="w-7 h-7">
                <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533.995c3.088 5.783 7.857 14.939 7.857 18.069 0 5.414-4.221 8.667-9.141 8.667-3.21 0-5.77-1.464-7.001-3.626-1.229 2.162-3.79 3.626-7.001 3.626-4.919 0-9.14-3.253-9.14-8.667 0-3.13 4.769-12.286 7.858-18.069l.533-.995C8.678 1.963 10.133 1 12.141 1h3.859zm0 3h-3.859c-1.077 0-1.921.498-2.83 2.115l-.547 1.021C5.819 12.825 1.714 20.672 1.714 23.333c0 3.829 2.871 5.667 6.143 5.667 2.873 0 5.068-1.574 5.862-4.179.231-.758.917-1.288 1.71-1.288s1.479.53 1.71 1.288c.794 2.605 2.989 4.179 5.862 4.179 3.271 0 6.143-1.838 6.143-5.667 0-2.661-4.105-10.508-7.049-16.197l-.547-1.021C20.062 4.498 19.218 4 18.141 4H16zm0 9c2.761 0 5 2.239 5 5 0 2.217-1.42 4.098-3.415 4.743l-.335.093-.25.045V23h-2v-.119l-.25-.045C12.755 22.191 11.335 20.31 11.335 18c0-2.761 2.239-5 5-5zm0 3c-1.105 0-2 .895-2 2 0 .828.504 1.539 1.225 1.836l.275.097.5.067.5-.067c.721-.297 1.225-1.008 1.225-1.836 0-1.105-.895-2-2-2z" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Airbnb • Travel Partner
            </div>
          </div>
        </div>

        {/* Node I: Bottom-Middle Creator Avatar (Curly Updo, Soft Lavender) */}
        <div className="absolute bottom-[2%] left-[45%] sm:left-[46%] z-10 animate-float-3">
          <div className="group relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EEE6FF] border-[3.5px] border-white shadow-[0_8px_20px_rgba(139,112,248,0.15)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Illustrated Black Woman with Curly Updo */}
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="32" r="32" fill="#EEE6FF" />
                {/* Curly bun */}
                <circle cx="32" cy="18" r="9" fill="#1F1517" />
                <circle cx="26" cy="19" r="6" fill="#1F1517" />
                <circle cx="38" cy="19" r="6" fill="#1F1517" />
                {/* Neck & Top */}
                <path d="M28 40 L36 40 L36 48 L28 48 Z" fill="#8D5B4C" />
                <path d="M18 56 C18 48, 46 48, 46 56 L46 64 L18 64 Z" fill="#EA580C" />
                {/* Face */}
                <circle cx="32" cy="32" r="12" fill="#A26B5B" />
                {/* Hair line */}
                <path d="M20 28 C23 22, 41 22, 44 28 C38 25, 35 25, 32 25 C29 25, 26 25, 20 28 Z" fill="#1F1517" />
                {/* Eyes & Smile */}
                <circle cx="28" cy="32" r="1.5" fill="#1F1517" />
                <circle cx="36" cy="32" r="1.5" fill="#1F1517" />
                <path d="M29 37 Q32 40 35 37" stroke="#1F1517" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                {/* Gold hoop earrings */}
                <circle cx="19" cy="35" r="2.5" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
                <circle cx="45" cy="35" r="2.5" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              Amara Diallo • Fitness
            </div>
          </div>
        </div>

        {/* Node J: Bottom-Right LEGO Brand Badge */}
        <div className="absolute bottom-[6%] right-[14%] sm:right-[16%] z-10 animate-float-1">
          <div className="group relative">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#FFF9E6] shadow-[0_8px_20px_rgba(217,119,6,0.12)] border border-[#FBEAC3] flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* LEGO Square Badge */}
              <div className="w-8 h-8 rounded-md bg-[#D11919] border border-black/15 flex items-center justify-center shadow-inner">
                <span className="text-[9px] font-black text-white italic tracking-tighter scale-y-110 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  LEGO
                </span>
              </div>
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              LEGO • Brand Partner
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Typography Section matching client screenshot */}
      <div className="relative z-10 text-center pt-4 pb-2 space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight font-sans">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed max-w-md mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
