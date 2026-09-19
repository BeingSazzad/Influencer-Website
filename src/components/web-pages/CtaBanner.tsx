'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Video, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Button } from 'antd';

export function CtaBanner() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-sky-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-8 sm:p-12 lg:p-16 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Global Influencer Network</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
                Ready to Represent or Acquire a World-Class Trophy Estate?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Whether you are seeking private off-market architectural acquisitions or are a top producer seeking media distribution, partner with LUXE PRIME today.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/properties">
                  <Button
                    type="primary"
                    size="large"
                    className="h-12 px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <span>Browse Properties</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    type="default"
                    size="large"
                    className="h-12 px-8 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Join Creator Network
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Feature Card */}
            <div className="bg-slate-950/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>The LUXE PRIME Guarantee</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                  <span><strong>Full Escrow Confidentiality:</strong> Strict non-disclosure agreements for all trophy buyers and celebrity properties.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                  <span><strong>Cinematic 4K Walkthroughs:</strong> Every featured property receives broadcast-grade architectural video distribution.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                  <span><strong>Top 1% Verified Influencers:</strong> Direct advisory with pre-vetted producers holding multi-million audience reach.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
