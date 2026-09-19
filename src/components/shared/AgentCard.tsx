'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@/types';
import {
  ShieldCheck,
  Star,
  Building,
  Award,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Button, Tag } from 'antd';

interface AgentCardProps {
  agent: User;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col luxury-card group">
      {/* Header Banner */}
      <div className="h-28 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 relative p-4 flex items-start justify-between">
        <Tag color="gold" className="font-bold border-none text-[10px] uppercase tracking-wider">
          Top 1% Global Producer
        </Tag>
        <span className="text-white/80 text-xs font-semibold flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          {agent.rating || 4.98} ({agent.reviewsCount || 100}+)
        </span>
      </div>

      {/* Avatar Overlap */}
      <div className="px-6 -mt-12 flex items-end justify-between">
        <div className="relative">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
          />
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white" title="Verified Producer">
            <ShieldCheck className="w-3 h-3" />
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 font-medium">Sales Volume</div>
          <div className="text-base font-extrabold text-slate-950 font-serif">{agent.salesVolume || '$350M+'}</div>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Link href={`/agents/${agent.id}`} className="group-hover:text-emerald-700 transition-colors">
              <h3 className="text-lg font-bold text-slate-950">{agent.name}</h3>
            </Link>
          </div>
          <p className="text-xs font-semibold text-emerald-800 mb-2">{agent.agency || 'Luxury Real Estate Advisory'}</p>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {agent.bio}
          </p>

          {/* Social Presence Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {agent.socials?.instagram && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                {agent.socials.instagram}
              </span>
            )}
            {agent.socials?.youtube && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                <Youtube className="w-3.5 h-3.5 text-rose-600" />
                Channel
              </span>
            )}
          </div>
        </div>

        {/* Footer Stats & Profile Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Building className="w-4 h-4 text-emerald-600" />
            <span><strong>{agent.activeListingsCount || 12}</strong> Active Estates</span>
          </div>

          <Link href={`/agents/${agent.id}`}>
            <Button type="default" className="text-xs font-semibold flex items-center gap-1 hover:border-emerald-600 hover:text-emerald-700">
              <span>View Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
