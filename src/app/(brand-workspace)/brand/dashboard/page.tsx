'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorCard } from '@/components/shared/CreatorCard';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Bookmark,
  ExternalLink,
  DollarSign,
} from 'lucide-react';
import { Button, Tag } from 'antd';

export default function BrandDashboardPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);

  // Filter orders related to this brand
  const brandOrders = orders;
  const activeOrders = brandOrders.filter(
    (o) => o.status !== 'completed' && o.status !== 'declined'
  );
  const completedOrders = brandOrders.filter((o) => o.status === 'completed');

  // Calculate totals
  const totalEscrowFundedEur = brandOrders.reduce((acc, curr) => acc + curr.totalEur, 0);
  const activeSpendEur = activeOrders.reduce((acc, curr) => acc + curr.totalEur, 0);

  // Shortlisted creators
  const savedCreators = creators.filter((c) => savedCreatorIds.includes(c.id));

  return (
    <div className="min-h-screen">
      <WorkspaceHeader
        title={`Welcome back, ${currentUser?.name || 'Elena'}`}
        subtitle={`${currentUser?.companyName || 'Nordic Glow Beauty'} • Brand Campaign Hub`}
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-9 px-4 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Campaign Offer</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Metric Cards Row in EUR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active In Escrow */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                In Escrow (Active)
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              €{activeSpendEur.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#73736A]">
              Held securely for {activeOrders.length} active campaigns
            </div>
          </div>

          {/* Card 2: Active Orders */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Active Hires
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              {activeOrders.length}
            </div>
            <div className="text-[11px] text-[#73736A]">
              {activeOrders.filter((o) => o.status === 'deliverable_submitted').length} pending review
            </div>
          </div>

          {/* Card 3: Total Spend */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Total Lifetime Spend
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              €{totalEscrowFundedEur.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#73736A]">
              Includes standard 15% platform fee
            </div>
          </div>

          {/* Card 4: Shortlist */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Shortlisted
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FDF0ED] text-[#C75D47] flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              {savedCreatorIds.length} creators
            </div>
            <div className="text-[11px] text-[#73736A]">
              Ready for campaign outreach
            </div>
          </div>
        </div>

        {/* Active Campaign Orders Table / List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515] tracking-tight">
                Active Campaign Orders
              </h2>
              <p className="text-xs text-[#73736A]">
                Track deliverable progress and release escrow payments upon approval.
              </p>
            </div>
            <Link
              href="/brand/orders"
              className="text-xs font-bold text-[#151515] hover:text-[#2B7FFF] flex items-center gap-1"
            >
              <span>View all orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeOrders.map((order) => {
              const statusColors: Record<string, string> = {
                offer_sent: 'bg-[#FAF6E8] text-[#8C6819]',
                accepted: 'bg-[#EBF3FE] text-[#2B7FFF]',
                in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-extrabold animate-pulse',
                approved: 'bg-[#EEF7F2] text-[#23744D]',
                completed: 'bg-[#F4F4F0] text-[#151515]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Offer Sent • Pending Acceptance',
                accepted: 'Accepted • Production Started',
                in_production: 'In Production',
                deliverable_submitted: 'Deliverable Submitted • Review Ready',
                approved: 'Approved • Escrow Released',
                completed: 'Completed',
              };

              return (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#151515] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={order.creatorAvatar}
                      alt={order.creatorName}
                      className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-[#151515]">
                          {order.creatorName}
                        </h3>
                        <span className="text-[11px] text-[#73736A]">{order.creatorHandle}</span>
                      </div>
                      <div className="text-xs text-[#555550] mt-0.5">
                        {order.packageTitle} ({order.collaborationType === 'content_creation' ? 'UGC Video' : 'Sponsored Post'})
                      </div>
                      <div className="text-[11px] text-[#73736A] mt-1">
                        Deadline: {order.deadlineDate} • Funded: €{order.totalEur} (€{order.basePriceEur} + €{order.platformFeeEur} fee)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        statusColors[order.status] || 'bg-[#F4F4F0] text-[#151515]'
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>

                    <Link href={`/brand/orders/${order.id}`}>
                      <Button
                        type="primary"
                        className="h-9 px-4 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none"
                      >
                        Manage Order
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shortlisted Creators Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515] tracking-tight">
                Saved Creator Shortlist
              </h2>
              <p className="text-xs text-[#73736A]">
                Creators you bookmarked during discovery.
              </p>
            </div>
            <Link
              href="/brand/saved"
              className="text-xs font-bold text-[#151515] hover:text-[#2B7FFF] flex items-center gap-1"
            >
              <span>View all ({savedCreators.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {savedCreators.slice(0, 4).map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
