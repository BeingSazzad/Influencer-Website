'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  Layers,
  PlusCircle,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Button, Input } from 'antd';

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
        title="Campaigns"
        subtitle="Creator hires and deliverables."
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Campaign</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7">
        {/* Search & Status Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-[#E7E7E2] shadow-2xs overflow-x-auto no-scrollbar max-w-full">
            {[
              { key: 'all', label: 'All', count: brandOrders.length },
              { key: 'pending', label: 'Pending', count: pendingOffers.length },
              { key: 'active', label: 'In Production', count: inProduction.length },
              { key: 'review', label: 'Review', count: reviewReady.length },
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
                  className={`text-xs px-1.5 py-0.2 rounded-full font-extrabold ${
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
              placeholder="Search brand or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl h-10 text-sm font-semibold"
              allowClear
            />
          </div>
        </div>

        {/* Campaigns List Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E7E7E2] flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
              Contracts
            </h2>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusColors: Record<string, string> = {
                  offer_sent: 'bg-[#F4F4F0] text-[#73736A] border border-[#E7E7E2]',
                  accepted: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                  in_production: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                  deliverable_submitted: 'bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25 font-bold',
                  approved: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                  completed: 'bg-[#F4F4F0] text-[#73736A] border border-[#E7E7E2]',
                };

                const statusLabels: Record<string, string> = {
                  offer_sent: 'Pending',
                  accepted: 'Accepted',
                  in_production: 'In Production',
                  deliverable_submitted: 'Review Ready',
                  approved: 'Released',
                  completed: 'Completed',
                };

                const isReviewReady = order.status === 'deliverable_submitted';

                return (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                  >
                    {/* Creator Details & Deliverable */}
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <img
                        src={order.creatorAvatar}
                        alt={order.creatorName}
                        className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                      />
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base text-[#0A0A0A] leading-tight">
                            {order.creatorName}
                          </h3>
                          <VerifiedBadge size="xs" />
                          <span className="text-sm text-[#73736A] font-medium leading-none">
                            {order.creatorHandle.startsWith('@') ? order.creatorHandle : `@${order.creatorHandle}`}
                          </span>
                          <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                            {order.platform}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-[#0A0A0A] leading-snug truncate">
                          {order.packageTitle}
                        </div>

                        {/* Financial & Deadline Telemetry */}
                        <div className="flex items-center gap-2 text-sm text-[#73736A] font-medium pt-0.5">
                          <span className="font-extrabold text-[#0A0A0A] text-sm">
                            €{order.totalEur.toLocaleString()}
                          </span>
                          <span className="text-[#D2D2CA]">•</span>
                          <span>Due {formatDeadline(order.deadlineDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Direct Action Buttons */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                      <span
                        className={`text-sm font-bold px-3 py-1.5 rounded-full leading-none inline-flex items-center ${
                          statusColors[order.status] || 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]'
                        }`}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>

                      <Link href={`/brand/orders/${order.id}`}>
                        <button className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-[#FF2D78] text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98">
                          <span>{isReviewReady ? 'Review' : 'Manage'}</span>
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
