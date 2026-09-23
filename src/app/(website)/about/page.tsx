'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Camera, ArrowUpRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0A0A0A] font-sans min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-16 pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] shadow-2xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
          <span className="tracking-wider uppercase">About Influverse</span>
        </div>

        {/* Split Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-8 sm:mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0A0A0A] tracking-tight leading-[1.1]">
              Good work starts with the right connection.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="text-base sm:text-lg text-[#73736A] font-medium leading-[28px]">
              We bring brands and creators together to turn shared ideas into meaningful content.
            </p>
          </div>
        </div>

        {/* Hero Photographic Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E7E7E2] shadow-sm bg-zinc-900 h-[300px] sm:h-[460px] lg:h-[540px]">
          <Image
            src="/images/about-influverse-collaboration.png"
            alt="A content creator filming while her creative team reviews the campaign"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) calc(100vw - 3rem), 1280px"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* 2. WHY WE BUILT INFLUVERSE */}
      <section className="py-20 sm:py-24 border-y border-[#E7E7E2] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
                Why we built Influverse
              </h2>
            </div>
            <div className="lg:col-span-7 lg:border-l lg:border-[#E7E7E2] lg:pl-12">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] mb-3">
                Finding the right collaborator should feel simple.
              </h3>
              <p className="text-base sm:text-lg text-[#73736A] font-medium leading-[28px]">
                Influverse brings creator discovery, clear offers and content delivery into one place—so both sides know what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUILT FOR BOTH SIDES */}
      <section className="py-20 sm:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0A0A0A] tracking-tight mb-12 sm:mb-16">
            Built for both sides.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: For brands */}
            <div className="group">
              <div className="h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden mb-6 border border-[#E7E7E2] bg-zinc-100 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80"
                  alt="Brand discussing creative strategy and deliverables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#E7E7E2] flex items-center justify-center text-[#0A0A0A] shrink-0 mt-0.5 shadow-2xs">
                  <Briefcase className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A0A0A] mb-2">
                    For brands
                  </h3>
                  <p className="text-base text-[#73736A] font-medium leading-[26px] mb-4">
                    Find creators who fit your brand. Agree on the brief, review the work and keep everything organised.
                  </p>
                  <Link
                    href="/creators"
                    className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] inline-flex items-center gap-1.5 transition-colors group/link"
                  >
                    <span>Explore creators</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: For creators */}
            <div className="group">
              <div className="h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden mb-6 border border-[#E7E7E2] bg-zinc-100 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Creator filming professional content"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#E7E7E2] flex items-center justify-center text-[#0A0A0A] shrink-0 mt-0.5 shadow-2xs">
                  <Camera className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A0A0A] mb-2">
                    For creators
                  </h3>
                  <p className="text-base text-[#73736A] font-medium leading-[26px] mb-4">
                    Show your work, set your packages and manage collaborations with clarity.
                  </p>
                  <Link
                    href="/register?role=creator"
                    className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] inline-flex items-center gap-1.5 transition-colors group/link"
                  >
                    <span>Join as a creator</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLEAR FROM THE START */}
      <section className="py-16 sm:py-20 bg-[#F4F4F0] border-y border-[#E7E7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
                Clear from <br className="hidden sm:inline" />the start.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF2D78] uppercase mb-2.5 block">
                  01
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-1.5">
                  Clear expectations
                </h3>
                <p className="text-sm text-[#73736A] font-medium leading-[22px]">
                  Agree on scope, price and timing.
                </p>
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF2D78] uppercase mb-2.5 block">
                  02
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-1.5">
                  Shared visibility
                </h3>
                <p className="text-sm text-[#73736A] font-medium leading-[22px]">
                  Keep feedback and delivery together.
                </p>
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF2D78] uppercase mb-2.5 block">
                  03
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-1.5">
                  Creative respect
                </h3>
                <p className="text-sm text-[#73736A] font-medium leading-[22px]">
                  Build around the work and the people behind it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MAKE YOUR NEXT CONNECTION CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight text-center sm:text-left">
              Make your next connection.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/creators">
                <button className="h-12 px-8 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm sm:text-base shadow-sm transition-all inline-flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95">
                  Find Creators
                </button>
              </Link>
              <Link href="/register?role=creator">
                <button className="h-12 px-8 rounded-full bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] font-bold text-sm sm:text-base shadow-2xs transition-all inline-flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95">
                  Join as Creator
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
