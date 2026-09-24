'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateOrderStatus } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  Layers,
  Clock,
  CheckCircle2,
  Inbox,
  ArrowRight,
  DollarSign,
  Search,
} from 'lucide-react';
import { Button, Input, message } from 'antd';

function formatDeadline(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function CreatorCampaignsPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Target creator
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';

  const creatorOrders = orders.filter(
    (o) => o.creatorId === targetCreatorId || (o.creatorId === 'creator-01' && (!currentUser || currentUser?.role === 'creator'))
  );

  // Telemetry & Financial calculations
  const totalPipelineRateEur = creatorOrders.reduce((sum, o) => sum + o.basePriceEur, 0);
  const inProductionOrders = creatorOrders.filter((o) => ['accepted', 'in_production'].includes(o.status));
  const lockedInEscrowEur = inProductionOrders.reduce((sum, o) => sum + o.basePriceEur, 0);

  const pendingOffers = creatorOrders.filter((o) => o.status === 'offer_sent');
  const reviewReady = creatorOrders.filter((o) => o.status === 'deliverable_submitted');
  const completedOrders = creatorOrders.filter((o) => ['completed', 'approved'].includes(o.status));

  const handleAcceptOffer = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: 'in_production' }));
    message.success('Offer accepted! Escrow funds locked. Campaign moved to production.');
  };

  const handleDeclineOffer = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: 'declined' }));
    message.info('Campaign proposal declined.');
  };

  const filteredOrders = creatorOrders
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
        o.brandName.toLowerCase().includes(q) ||
        o.packageTitle.toLowerCase().includes(q) ||
        o.platform.toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Brand Campaigns & Deals"
        subtitle="Your active brand partnerships and deals."
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7">
        {/* Executive Rate & Status Telemetry Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Pipeline Deal Value</span>
              <DollarSign className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{totalPipelineRateEur.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Locked in Escrow</span>
              <Clock className="w-4 h-4 text-[#6444A6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{lockedInEscrowEur.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Pending Proposals</span>
              <Inbox className="w-4 h-4 text-[#8C6819]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {pendingOffers.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Completed Campaigns</span>
              <CheckCircle2 className="w-4 h-4 text-[#23744D]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {completedOrders.length}
            </div>
          </div>
        </div>

        {/* Search & Status Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-[#E7E7E2] shadow-2xs overflow-x-auto no-scrollbar max-w-full">
            {[
              { key: 'all', label: 'All Deals', count: creatorOrders.length },
              { key: 'pending', label: 'Pending Proposals', count: pendingOffers.length },
              { key: 'active', label: 'In Production', count: inProductionOrders.length },
              { key: 'review', label: 'Under Review', count: reviewReady.length },
              { key: 'completed', label: 'Completed', count: completedOrders.length },
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

        {/* Campaigns Deals Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
          <div className="pb-3 border-b border-[#E7E7E2] flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
              Campaign Contracts
            </h2>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-3.5">
              {filteredOrders.map((order) => {
                const isOffer = order.status === 'offer_sent';
                const isUnderReview = order.status === 'deliverable_submitted';

                return (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    {/* Brand Details & Deliverable Title */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <BrandLogo
                        name={order.brandName}
                        logoUrl={order.brandLogo}
                        size="lg"
                      />
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm sm:text-base text-[#0A0A0A] leading-tight">
                            {order.brandName}
                          </h3>
                          <span className="text-xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#73736A] leading-none">
                            {order.platform}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-[#0A0A0A] leading-snug truncate">
                          {order.packageTitle}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-[#73736A] font-medium pt-0.5">
                          <span className="font-extrabold text-[#0A0A0A] text-sm">
                            €{order.basePriceEur.toLocaleString()}
                          </span>
                          <span className="text-[#D2D2CA]">•</span>
                          <span>Due {formatDeadline(order.deadlineDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      {isOffer ? (
                        <div className="flex items-center gap-2">
                          <Button
                            type="primary"
                            onClick={() => handleAcceptOffer(order.id)}
                            className="h-9 sm:h-10 px-4 sm:px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-[#23744D] !text-white border-none cursor-pointer shadow-2xs"
                          >
                            Accept (€{order.basePriceEur})
                          </Button>
                          <Button
                            type="default"
                            onClick={() => handleDeclineOffer(order.id)}
                            className="h-9 sm:h-10 px-3.5 rounded-full font-bold text-xs border-[#E7E7E2] text-[#73736A] hover:text-rose-600 cursor-pointer"
                          >
                            Decline
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          {isUnderReview ? (
                            <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] border border-[#23744D]/20">
                              Under Review
                            </span>
                          ) : order.status === 'completed' ? (
                            <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D]">
                              Completed
                            </span>
                          ) : (
                            <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#FAF6E8] text-[#8C6819] border border-amber-200/60">
                              In Production
                            </span>
                          )}

                          <Link href={`/creator/orders/${order.id}`}>
                            <button className="h-9 sm:h-10 px-4 sm:px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95">
                              <span>{isUnderReview ? 'View Submission' : 'Submit Work'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              color="neutral"
              icon={<Layers className="w-8 h-8" />}
              title="No Campaigns Found in This Filter"
              description="When brands book your packages or issue custom proposals, they will appear here with escrow payout milestones."
              primaryAction={{
                label: 'View Packages',
                href: '/creator/packages',
              }}
              variant="plain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
