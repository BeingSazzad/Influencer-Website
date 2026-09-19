'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateLeadStatus } from '@/redux/slices/leadSlice';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { AGENT_ANALYTICS } from '@/Mockdata';
import { LeadStatus } from '@/types';
import {
  Building,
  Users,
  Eye,
  DollarSign,
  PlusCircle,
  Video,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Button, Tag, Select, message } from 'antd';

export default function AgentDashboardOverviewPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { properties } = useAppSelector((state) => state.property);
  const { leads } = useAppSelector((state) => state.lead);

  const newLeads = leads.filter((l) => l.status === 'new');

  const handleStatusChange = (id: string, status: LeadStatus) => {
    dispatch(updateLeadStatus({ id, status }));
    message.success(`Lead status updated to ${status.replace('_', ' ')}`);
  };

  return (
    <div>
      <DashboardHeader
        title="Agent & Creator CRM Hub"
        subtitle={`Signed in as ${currentUser?.name || 'Sophia Vance'} • ${currentUser?.agency || 'Vance Luxury Realty'}`}
        actionButton={
          <Link href="/agent/listings/new">
            <Button
              type="primary"
              className="font-bold flex items-center gap-1.5 h-9 rounded-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Listing</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Sales Volume"
            value={currentUser?.salesVolume || '$420M+'}
            change="+14.2% YTD"
            isPositive={true}
            icon={DollarSign}
            color="emerald"
            subtitle="Verified career transaction volume"
          />
          <MetricCard
            title="Active Listed Estates"
            value={properties.length}
            change="+3 new"
            isPositive={true}
            icon={Building}
            color="sky"
            subtitle="Trophy homes on public portal"
          />
          <MetricCard
            title="New Buyer Leads"
            value={leads.length}
            change={`${newLeads.length} Action Needed`}
            isPositive={true}
            icon={Users}
            color="amber"
            subtitle="Active private buyer inquiries"
          />
          <MetricCard
            title="Monthly Video Views"
            value="124.5K"
            change="+28.4% reach"
            isPositive={true}
            icon={Eye}
            color="purple"
            subtitle="YouTube & Instagram impressions"
          />
        </div>

        {/* 2-Column Split: Active Leads CRM & High Performing Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Inquiries & Leads Pipeline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950 font-serif">
                  High-Priority Buyer Leads ({leads.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Pre-qualified high-net-worth inquiries awaiting private viewing confirmation.
                </p>
              </div>
              <Link href="/agent/leads" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                <span>View Full Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
              {leads.map((lead) => (
                <div key={lead.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={lead.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={lead.clientName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{lead.clientName}</span>
                        <Tag color={lead.status === 'new' ? 'processing' : lead.status === 'viewing_scheduled' ? 'success' : 'default'} className="text-[10px] font-bold uppercase">
                          {lead.status.replace('_', ' ')}
                        </Tag>
                      </div>
                      <div className="text-xs text-emerald-700 font-semibold">{lead.propertyTitle} ({lead.propertyPrice})</div>
                      <p className="text-xs text-slate-600 line-clamp-1 italic mt-0.5">"{lead.message}"</p>
                      <div className="text-[11px] text-slate-400 mt-1">Budget: <strong>{lead.budgetRange}</strong> • {lead.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 w-full sm:w-auto">
                    <Select
                      size="small"
                      value={lead.status}
                      onChange={(val) => handleStatusChange(lead.id, val)}
                      className="w-36 text-xs font-semibold"
                      options={[
                        { value: 'new', label: 'New Inquiry' },
                        { value: 'contacted', label: 'Contacted' },
                        { value: 'viewing_scheduled', label: 'Tour Scheduled' },
                        { value: 'offer_made', label: 'Offer Escrow' },
                        { value: 'closed', label: 'Closed Deal' },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Top Performing Listings & Traffic Sources */}
          <div className="space-y-6">
            {/* Top Media Listings */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-950 font-serif flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Top Performing Video Tours</span>
              </h3>

              <div className="space-y-3">
                {AGENT_ANALYTICS.topPerformingListings.map((item) => (
                  <div key={item.title} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.views} Views • {item.leads} Leads</div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {item.conversion} CVR
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/agent/analytics" className="block pt-2">
                <Button block type="default" className="text-xs font-semibold">
                  Detailed Traffic Breakdown →
                </Button>
              </Link>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 rounded-3xl text-white shadow-lg space-y-4">
              <h3 className="text-base font-bold font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Influencer Actions</span>
              </h3>
              <p className="text-xs text-slate-300">
                Launch a 4K video drop or syndicate an off-market property across YouTube & Instagram reels.
              </p>
              <div className="space-y-2">
                <Link href="/agent/listings/new" className="block">
                  <Button type="primary" block className="font-bold text-xs h-10">
                    + Launch New Property
                  </Button>
                </Link>
                <Link href="/agent/profile" className="block">
                  <Button block className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs h-10 font-bold">
                    Edit Brand Bio & Socials
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
