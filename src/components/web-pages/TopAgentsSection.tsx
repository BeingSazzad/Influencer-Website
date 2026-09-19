'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_USERS } from '@/Mockdata';
import { AgentCard } from '@/components/shared/AgentCard';
import { Sparkles, Video, Users, ArrowRight } from 'lucide-react';
import { Button } from 'antd';

export function TopAgentsSection() {
  const agents = MOCK_USERS.filter((u) => u.role === 'agent');

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Media & Real Estate Powerhouses</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              Top Global Real Estate Influencers
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
              Meet the industry-leading creators who generate hundreds of millions in buyer interest through bespoke cinematic media productions.
            </p>
          </div>

          <Link href="/agents">
            <Button
              type="default"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-11 px-5 rounded-xl font-semibold flex items-center gap-2"
            >
              <span>View All Verified Creators</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
