'use client';

import React, { useState } from 'react';
import { MOCK_USERS } from '@/Mockdata';
import { AgentCard } from '@/components/shared/AgentCard';
import { Sparkles, Video, Search, ShieldCheck } from 'lucide-react';
import { Input } from 'antd';

export default function AgentsDirectoryPage() {
  const [search, setSearch] = useState('');
  const allAgents = MOCK_USERS.filter((u) => u.role === 'agent');

  const filteredAgents = allAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.location?.toLowerCase().includes(search.toLowerCase()) ||
      agent.agency?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Creator Directory</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Top Global Real Estate Influencers
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Connect directly with verified elite brokers commanding over 10M+ audience views across Los Angeles, New York, Miami, London, and Dubai.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-md mx-auto">
            <Input
              size="large"
              prefix={<Search className="w-4 h-4 text-emerald-600 mr-2" />}
              placeholder="Search by agent name, city, or agency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl shadow-xs"
              allowClear
            />
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
