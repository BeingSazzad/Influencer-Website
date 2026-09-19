'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_USERS, MOCK_PROPERTIES } from '@/Mockdata';
import { PropertyCard } from '@/components/shared/PropertyCard';
import {
  ShieldCheck,
  Star,
  Building,
  ArrowLeft,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  Award,
  Video,
  Sparkles
} from 'lucide-react';
import { Button, Tag, Input, message } from 'antd';

export default function AgentProfilePage() {
  const params = useParams();
  const agent = MOCK_USERS.find((u) => u.id === params.id) || MOCK_USERS[1];

  const agentProperties = MOCK_PROPERTIES.filter(
    (p) => p.agent.id === agent.id || p.agent.name.includes(agent.name.split(' ')[0])
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    message.success(`Confidential message delivered directly to ${agent.name}'s advisory desk!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Creator Directory</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="h-44 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 relative p-6 flex items-start justify-between">
            <Tag color="gold" className="font-bold border-none text-xs uppercase tracking-wider">
              Top 1% Global Producer & Media Creator
            </Tag>
            <span className="text-white text-xs font-semibold flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {agent.rating || 4.98} Rating ({agent.reviewsCount || 120}+ Reviews)
            </span>
          </div>

          {/* Profile Header Bar */}
          <div className="px-8 pb-8 -mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                />
                <span className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif">
                  {agent.name}
                </h1>
                <p className="text-sm font-semibold text-emerald-800">{agent.agency}</p>
                <p className="text-xs text-slate-500">{agent.location}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 min-w-[100px]">
                <div className="text-xs text-slate-400 font-bold uppercase">Career Volume</div>
                <div className="text-lg font-extrabold text-slate-950 font-serif">{agent.salesVolume || '$420M+'}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 min-w-[100px]">
                <div className="text-xs text-slate-400 font-bold uppercase">Portfolio</div>
                <div className="text-lg font-extrabold text-slate-950 font-serif">{agentProperties.length || 6} Estates</div>
              </div>
            </div>
          </div>

          {/* Bio & Socials */}
          <div className="px-8 py-6 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-slate-950 font-serif">About {agent.name}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {agent.bio} With over a decade of specialized ultra-luxury advisory, our production team combines cinema-grade visual storytelling with private banking and family office networks to showcase irreplaceable properties worldwide.
              </p>

              {/* Social Channels */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {agent.socials?.instagram && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    {agent.socials.instagram}
                  </span>
                )}
                {agent.socials?.youtube && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800">
                    <Youtube className="w-4 h-4 text-rose-600" />
                    {agent.socials.youtube}
                  </span>
                )}
                {agent.socials?.linkedin && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-800">
                    <Linkedin className="w-4 h-4 text-sky-600" />
                    {agent.socials.linkedin}
                  </span>
                )}
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Direct Confidential Inquiry
              </h3>
              <form onSubmit={handleSendMessage} className="space-y-2.5">
                <Input placeholder="Your Name" className="text-xs" required />
                <Input type="email" placeholder="Email Address" className="text-xs" required />
                <Input.TextArea rows={2} placeholder="Message regarding acquisition or representation..." className="text-xs" required />
                <Button type="primary" htmlType="submit" block className="font-bold text-xs h-9">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Active Property Portfolio */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 font-serif">
                Exclusive Represented Portfolio ({agentProperties.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Active trophy listings and off-market estates currently represented by {agent.name}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
