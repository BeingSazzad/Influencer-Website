'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  Layers,
  Clock,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Film,
  Instagram,
  Youtube,
  Search,
} from 'lucide-react';
import { Button, Input, Tag } from 'antd';

function formatDeadline(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BrandCampaignsPage() {
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter campaigns strictly for this brand
  const currentBrandId = currentUser?.id || 'user_brand_01';
  const brandOrders = orders.filter(
    (o) =>
      !o.brandId ||
      o.brandId === currentBrandId ||
      o.brandId === 'brand-01' ||
      o.brandId === 'user_brand_01' ||
      o.brandName === (currentUser?.companyName || 'Aura Skincare Paris')
  );

  // Calculations for Telemetry & Rates
  const totalBudgetEur = brandOrders.reduce((sum, o) => sum + o.totalEur, 0);
  const inEscrowEur = brandOrders
    .filter((o) => ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status))
    .reduce((sum, o) => sum + o.totalEur, 0);

  const pendingOffers = brandOrders.filter((o) => o.status === 'offer_sent');
  const inProduction = brandOrders.filter((o) => ['accepted', 'in_production'].includes(o.status));
  const reviewReady = brandOrders.filter((o) => o.status === 'deliverable_submitted');
  const completed = brandOrders.filter((o) => ['completed', 'approved'].includes(o.status));

  const filteredOrders = brandOrders
    .filter((o) => {
      if (activeFilter === 'pending') return o.status === 'offer_sent';
      if (activeFilter === 'active') return ['accepted', 'in_production'].includes(o.status);
      if (activeFilter === 'review') return o.status === 'deliverable_submitted';
      if (activeFilter === 'completed') return ['completed', 'approved'].includes(o.status);
      return true;
    })
    .filter((o) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        o.creatorName.toLowerCase().includes(q) ||
        o.creatorHandle.toLowerCase().includes(q) ||
        o.packageTitle.toLowerCase().includes(q) ||
        o.platform.toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Campaign Operations & Hires"
        subtitle="Manage campaign rates, creator milestones, review deliverables, and release escrow."
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Campaign Offer</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7">
        {/* Executive Rate & Status Telemetry Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Total Campaign Budget</span>
              <DollarSign className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{Math.round(totalBudgetEur).toLocaleString()}
            </div>
            <div className="text-xs text-[#23744D] font-bold">100% Escrow Protected</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>In Production</span>
              <Clock className="w-4 h-4 text-[#6444A6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {inProduction.length} Active
            </div>
            <div className="text-xs text-[#73736A]">€{Math.round(inEscrowEur).toLocaleString()} currently locked</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Pending Acceptance</span>
              <AlertCircle className="w-4 h-4 text-[#8C6819]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {pendingOffers.length}
            </div>
            <div className="text-xs text-[#8C6819] font-bold">Awaiting creator review</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Completed Deals</span>
              <CheckCircle2 className="w-4 h-4 text-[#23744D]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {completed.length}
            </div>
            <div className="text-xs text-[#73736A]">Assets approved & released</div>
          </div>
        </div>

        {/* Search & Status Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-[#E7E7E2] shadow-2xs overflow-x-auto no-scrollbar max-w-full">
            {[
              { key: 'all', label: 'All Campaigns', count: brandOrders.length },
              { key: 'pending', label: 'Pending Offers', count: pendingOffers.length },
              { key: 'active', label: 'In Production', count: inProduction.length },
              { key: 'review', label: 'Review Assets', count: reviewReady.length },
              { key: 'completed', label: 'Completed', count: completed.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeFilter === tab.key
                    ? 'bg-[#0A0A0A] text-white shadow-2xs'
                    : 'text-[#73736A] hover:text-[#0A0A0A]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-[#EAEAE3] text-[#0A0A0A]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Filter Input */}
          <div className="w-full sm:w-64 shrink-0">
            <Input
              prefix={<Search className="w-3.5 h-3.5 text-[#73736A]" />}
              placeholder="Search creator or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl h-10 text-xs font-semibold"
              allowClear
            />
          </div>
        </div>

        {/* Campaigns List Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E7E7E2] flex items-center justify-between">
            <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">
              Campaigns
            </h2>
            <span className="text-xs text-[#73736A] font-medium">
              Funds held securely in Stripe/Wise Escrow until deliverable approval
            </span>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusColors: Record<string, string> = {
                  offer_sent: 'bg-[#FAF6E8] text-[#8C6819]',
                  accepted: 'bg-[#F1EEF9] text-[#6444A6]',
                  in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                  deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-black animate-pulse',
                  approved: 'bg-[#EEF7F2] text-[#23744D]',
                  completed: 'bg-[#F4F4F0] text-[#0A0A0A]',
                };

                const statusLabels: Record<string, string> = {
                  offer_sent: 'Offer Sent • Pending',
                  accepted: 'Accepted • Production Started',
                  in_production: 'In Production',
                  deliverable_submitted: 'Review Ready • Deliverable Uploaded',
                  approved: 'Approved • Escrow Released',
                  completed: 'Completed',
                };

                const isReviewReady = order.status === 'deliverable_submitted';

                return (
                  <div
                    key={order.id}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                      isReviewReady
                        ? 'bg-[#F4FAF6] border-[#23744D] shadow-xs'
                        : 'bg-[#FAFAF8] border-[#E7E7E2] hover:border-[#0A0A0A]'
                    }`}
                  >
                    {/* Creator Details & Deliverable */}
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <img
                        src={order.creatorAvatar}
                        alt={order.creatorName}
                        className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2] shrink-0 shadow-2xs"
                      />
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base text-[#0A0A0A] leading-tight">
                            {order.creatorName}
                          </h3>
                          <VerifiedBadge size="xs" />
                          <span className="text-xs text-[#73736A] font-medium leading-none">
                            {order.creatorHandle.startsWith('@') ? order.creatorHandle : `@${order.creatorHandle}`}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                            {order.platform}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-[#0A0A0A] leading-snug truncate">
                          {order.packageTitle}
                        </div>

                        {/* Financial & Deadline Telemetry */}
                        <div className="flex items-center gap-2 text-xs text-[#73736A] font-medium pt-0.5">
                          <span className="font-extrabold text-[#0A0A0A] text-sm">
                            €{order.totalEur.toLocaleString()}
                          </span>
                          <span className="text-[#D2D2CA]">•</span>
                          <span>Due {formatDeadline(order.deadlineDate)}</span>
                          <span className="text-[#D2D2CA]">•</span>
                          <span>{order.deliverables.length} Deliverable{order.deliverables.length === 1 ? '' : 's'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Direct Action Buttons */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full leading-none inline-flex items-center ${
                          statusColors[order.status] || 'bg-[#F4F4F0] text-[#0A0A0A]'
                        }`}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>

                      <Link href={`/brand/orders/${order.id}`}>
                        <button
                          className={`h-10 px-5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98 ${
                            isReviewReady
                              ? 'bg-[#23744D] hover:bg-[#1c5f3e] text-white border-none'
                              : 'bg-[#0A0A0A] hover:bg-zinc-800 text-white border-none'
                          }`}
                        >
                          <span>{isReviewReady ? 'Review Deliverables' : 'Manage Campaign'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              color="neutral"
              icon={<Layers className="w-8 h-8" />}
              badge="Campaigns"
              title="No Campaigns in This Filter"
              description="Browse top verified creators to initiate campaign offers or explore active proposals."
              primaryAction={{
                label: 'Discover Creators',
                href: '/creators',
              }}
              variant="plain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
