'use client';

import React from 'react';

export function TrustedBySection() {
  const brandLogos = [
    {
      id: 'clickup',
      name: 'ClickUp',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg
            className="h-6 sm:h-7 w-auto text-[#0A0A0A] group-hover:text-[#7B68EE] transition-colors"
            viewBox="0 0 120 32"
            fill="currentColor"
          >
            <path
              d="M14 6.5L9.5 10.5C9.2 10.8 8.8 10.8 8.5 10.5L4 6.5C3.5 6 2.7 6 2.2 6.5C1.7 7 1.7 7.8 2.2 8.3L7.6 13.1C8.4 13.8 9.6 13.8 10.4 13.1L15.8 8.3C16.3 7.8 16.3 7 15.8 6.5C15.3 6 14.5 6 14 6.5Z"
              fill="currentColor"
            />
            <circle cx="9" cy="18" r="2.5" fill="currentColor" />
            <text
              x="24"
              y="22"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="16"
              letterSpacing="-0.5px"
              fill="currentColor"
            >
              ClickUp
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: 'mcdonalds',
      name: "McDonald's",
      content: (
        <div className="flex items-center gap-1.5 group cursor-pointer">
          <svg
            className="h-7 sm:h-8 w-auto text-[#0A0A0A] group-hover:text-[#DA291C] transition-colors"
            viewBox="0 0 42 36"
            fill="currentColor"
          >
            <path d="M7.5 32V14.8C7.5 9.8 10.5 5.5 15.2 5.5C19.2 5.5 21 8.8 21 13.5V32H25V13.5C25 8.8 26.8 5.5 30.8 5.5C35.5 5.5 38.5 9.8 38.5 14.8V32H42V14.2C42 7.2 37.2 2 30.5 2C26 2 22.8 4.6 21 8.2C19.2 4.6 16 2 11.5 2C4.8 2 0 7.2 0 14.2V32H7.5Z" />
          </svg>
          <span className="text-xs font-black tracking-tighter text-[#0A0A0A] self-end mb-1">
            McDonald&apos;s
          </span>
        </div>
      ),
    },
    {
      id: 'hopper',
      name: 'Hopper',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg
            className="h-6 sm:h-7 w-auto text-[#0A0A0A] group-hover:text-[#FA6B6B] transition-colors"
            viewBox="0 0 115 32"
            fill="currentColor"
          >
            <path
              d="M18.5 12C17.5 10 16 6 13.5 3C12.8 2.2 11.8 2.5 12 3.5C12.5 5.5 13.2 8.5 13 10.5C12 9 10 6 8 3.5C7.2 2.5 6.2 3 6.8 4.2C8 6.5 9.5 10 9 13C6 14 3 17 2 20C1.5 21.5 2.5 22.5 4 22C6 21.2 8.5 20.5 11 21C13 21.5 15 24 17 25C18.5 25.8 20 25 20.5 23.5C21.5 20 20.5 15 18.5 12Z"
              fill="currentColor"
            />
            <text
              x="26"
              y="22"
              fontFamily="'Comic Sans MS', cursive, sans-serif"
              fontWeight="700"
              fontSize="16"
              letterSpacing="-0.3px"
              fill="currentColor"
            >
              hopper
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: 'un',
      name: 'United Nations',
      content: (
        <div className="flex flex-col items-center group cursor-pointer">
          <svg
            className="h-7 sm:h-8 w-auto text-[#0A0A0A] group-hover:text-[#009EDB] transition-colors"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 28C6 22 7 14 12 9M32 28C34 22 33 14 28 9" strokeLinecap="round" />
            <path d="M5 24C4 18 6 12 10 7M35 24C36 18 34 12 30 7" strokeLinecap="round" />
            <circle cx="20" cy="20" r="10" strokeWidth="1.2" />
            <ellipse cx="20" cy="20" rx="5" ry="10" strokeWidth="1.2" />
            <line x1="10" y1="20" x2="30" y2="20" strokeWidth="1.2" />
            <line x1="12" y1="15" x2="28" y2="15" strokeWidth="1.2" />
            <line x1="12" y1="25" x2="28" y2="25" strokeWidth="1.2" />
          </svg>
          <span className="text-xs font-black uppercase tracking-widest text-[#0A0A0A] mt-0.5">
            UNITED NATIONS
          </span>
        </div>
      ),
    },
    {
      id: 'orangetheory',
      name: 'Orangetheory',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg
            className="h-6 sm:h-7 w-auto text-[#0A0A0A] group-hover:text-[#F36F21] transition-colors"
            viewBox="0 0 160 34"
            fill="currentColor"
          >
            <circle cx="12" cy="17" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <circle cx="12" cy="4" r="2.5" fill="currentColor" />
            <circle cx="25" cy="17" r="2.5" fill="currentColor" />
            <circle cx="12" cy="30" r="2.5" fill="currentColor" />
            <circle cx="2" cy="22" r="2" fill="currentColor" />
            <text
              x="34"
              y="18"
              fontFamily="system-ui, sans-serif"
              fontWeight="600"
              fontSize="14"
              letterSpacing="-0.2px"
              fill="currentColor"
            >
              orangetheory
            </text>
            <text
              x="34"
              y="29"
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              fontSize="12"
              letterSpacing="2px"
              fill="currentColor"
            >
              FITNESS
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: 'wealthsimple',
      name: 'Wealthsimple',
      content: (
        <div className="flex items-center group cursor-pointer">
          <span className="font-serif font-black text-lg sm:text-xl text-[#0A0A0A] tracking-tight group-hover:text-[#FF2D78] transition-colors">
            Wealthsimple
          </span>
        </div>
      ),
    },
    {
      id: 'spotify',
      name: 'Spotify',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg className="w-6 h-6 text-[#0A0A0A] group-hover:text-[#1DB954] transition-colors fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="font-sans font-black text-base tracking-tight text-[#0A0A0A] group-hover:text-[#1DB954] transition-colors">
            Spotify
          </span>
        </div>
      ),
    },
    {
      id: 'shopify',
      name: 'Shopify',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg className="w-6 h-6 text-[#0A0A0A] group-hover:text-[#96BF48] transition-colors fill-current" viewBox="0 0 24 24">
            <path d="M19.98 5.76c-.05-.33-.31-.59-.65-.63-.33-.04-2.8-.2-2.8-.2s-1.84-1.83-2.03-2.03c-.19-.19-.57-.14-.72-.05l-.97.58c-.28-.73-.72-1.42-1.39-1.88-1.09-.75-2.55-.77-3.48-.12-1.58 1.1-.96 3.51-.23 4.88-1.84.57-3.13.98-3.23 1.01-.81.25-.83.28-.94 1.03C3.41 9.4 1.34 22.84 1.34 22.84c0 .02 1.39.84 3.09.84 1.7 0 11.24-.03 14.15-.4 2.91-.38 3.53-2.18 3.53-2.18s-2.08-15.01-2.13-15.34zM10.9 3.65c.63-.44 1.48-.42 2.11.02.43.3.73.74.93 1.25l-3.66 1.13c-.34-.95-.01-1.96.62-2.4zm-1.82 8.13c-.04-.15-.09-.32-.15-.5l1.63-.5c.08.28.16.59.22.89.44 2.13.79 3.84 1.83 3.84.77 0 1.28-.7 1.28-1.74 0-1.37-.89-2.73-2.67-4.11-2.48-1.92-3.41-3.6-3.41-5.18 0-2.31 1.77-3.9 4.31-3.9 1.41 0 2.45.47 3.09 1.03l-.79 1.34c-.53-.44-1.28-.77-2.18-.77-1.47 0-2.32 1.05-2.32 2.18 0 1.22.75 2.38 2.5 3.73 2.65 2.05 3.67 3.77 3.67 5.66 0 2.59-1.87 4.09-4.22 4.09-2.31 0-3.37-1.91-3.79-3.96z"/>
          </svg>
          <span className="font-sans font-black text-base tracking-tight text-[#0A0A0A] group-hover:text-[#96BF48] transition-colors">
            shopify
          </span>
        </div>
      ),
    },
    {
      id: 'sephora',
      name: 'Sephora',
      content: (
        <div className="flex items-center gap-1.5 group cursor-pointer">
          <span className="font-sans font-black text-lg tracking-[3px] text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">
            SEPHORA
          </span>
        </div>
      ),
    },
    {
      id: 'gymshark',
      name: 'Gymshark',
      content: (
        <div className="flex items-center gap-1.5 group cursor-pointer">
          <span className="font-sans font-black text-base tracking-wider uppercase text-[#0A0A0A] group-hover:text-[#0080FF] transition-colors">
            GYMSHARK
          </span>
        </div>
      ),
    },
    {
      id: 'notion',
      name: 'Notion',
      content: (
        <div className="flex items-center gap-2 group cursor-pointer">
          <svg className="w-6 h-6 text-[#0A0A0A] group-hover:text-[#000000] transition-colors fill-current" viewBox="0 0 24 24">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83c-.467-.373-.98-.606-2.053-.513L3.106 2.39c-.42.047-.513.28-.373.466l1.726 1.352zm.84 3.73v13.567c0 .7.373.933 1.167.886l14.15-.84c.793-.047.886-.606.886-1.166V6.914c0-.606-.233-.886-.793-.84l-14.617.84c-.56.046-.793.373-.793 1.024zm12.375.98c.093.42 0 .84-.42.886l-.887.186v9.42c-.606.373-1.213.606-1.726.606-.793 0-1.026-.233-1.633-1.026l-4.57-7.135v6.855l1.4.326c.42.093.513.466.42.886l-2.846.187c-.093-.42 0-.84.42-.886l.933-.233V8.87l-1.306-.14c-.42-.046-.466-.42-.373-.84l2.846-.186 4.943 7.601V9.01l-1.167-.186c-.42-.047-.466-.42-.373-.84l2.94-.187z"/>
          </svg>
          <span className="font-sans font-black text-base tracking-tight text-[#0A0A0A]">
            Notion
          </span>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-white border-y border-[#E7E7E2] py-7 sm:py-8 relative overflow-hidden font-sans select-none">
      <div className="w-full">
        {/* Marquee Track with Fade Masks */}
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

          {/* Right Gradient Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Scrolling Marquee Container */}
          <div className="animate-marquee-infinite flex items-center gap-12 sm:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500 py-1">
            {/* Set 1 */}
            {brandLogos.map((brand, idx) => (
              <div key={`logo-1-${brand.id}-${idx}`} className="shrink-0">
                {brand.content}
              </div>
            ))}

            {/* Set 2 (for continuous seamless loop) */}
            {brandLogos.map((brand, idx) => (
              <div key={`logo-2-${brand.id}-${idx}`} className="shrink-0">
                {brand.content}
              </div>
            ))}

            {/* Set 3 (ensuring ultra-wide screen coverage) */}
            {brandLogos.map((brand, idx) => (
              <div key={`logo-3-${brand.id}-${idx}`} className="shrink-0">
                {brand.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
