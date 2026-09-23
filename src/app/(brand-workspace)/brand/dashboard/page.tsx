'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { openOfferModal } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
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
import { BrandAnnualAnalytics } from '@/components/shared/BrandAnnualAnalytics';

export default function BrandDashboardPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);
  const { creators, savedCreatorIds } = useAppSelector((state) => state.creator);

  // Filter orders related to this brand
  const currentBrandId = currentUser?.role === 'brand' ? currentUser.id : 'brand-aura';
  const brandOrders = orders.filter(
    (o) => o.brandId === currentBrandId || o.brandName === currentUser?.companyName || o.brandName === 'Aura Skincare Paris'
  );
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
        subtitle={`${currentUser?.companyName || 'Aura Skincare Paris'} • Brand Campaign Hub`}
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Campaign Offer</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 font-sans">
        {/* Metric Cards Row in EUR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active In Escrow */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                In Escrow (Active)
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              €{Math.round(activeSpendEur).toLocaleString()}
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              Held securely for {activeOrders.length} active campaigns
            </div>
          </div>

          {/* Card 2: Active Orders */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Active Hires
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              {activeOrders.length}
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              {activeOrders.filter((o) => o.status === 'deliverable_submitted').length} pending review
            </div>
          </div>

          {/* Card 3: Total Spend */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Total Lifetime Spend
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              €{Math.round(totalEscrowFundedEur).toLocaleString()}
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              Includes standard 15% platform fee
            </div>
          </div>

          {/* Card 4: Shortlist */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Shortlisted
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#FDF0ED] text-[#C75D47] flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              {savedCreatorIds.length} creators
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              Ready for campaign outreach
            </div>
          </div>
        </div>

        {/* 12-Month Annual Campaign Spend & Creator Hires Analytics */}
        <BrandAnnualAnalytics />

        {/* Active Campaigns Table / List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] tracking-tight">
                Active Brand Campaigns
              </h2>
              <p className="text-sm text-[#73736A] mt-0.5 font-medium">
                Track deliverables, milestone progress, and escrow release status.
              </p>
            </div>
            <Link
              href="/brand/campaigns"
              className="text-sm font-semibold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1.5 transition-colors"
            >
              <span>View all campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeOrders.map((order) => {
              const statusColors: Record<string, string> = {
                offer_sent: 'bg-[#FAF6E8] text-[#8C6819]',
                accepted: 'bg-[#F1EEF9] text-[#6444A6]',
                in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-extrabold animate-pulse',
                approved: 'bg-[#EEF7F2] text-[#23744D]',
                completed: 'bg-[#F4F4F0] text-[#0A0A0A]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Offer Sent • Pending Acceptance',
                accepted: 'Accepted • Production Started',
                in_production: 'In Production',
                deliverable_submitted: 'Deliverable Submitted • Review Ready',
                approved: 'Approved • Escrow Released',
                completed: 'Completed',
              };

              const platformLabels: Record<string, string> = {
                instagram: 'Instagram',
                tiktok: 'TikTok',
                youtube: 'YouTube',
                ugc: 'UGC Video',
              };

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#0A0A0A] transition-all"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <img
                      src={order.creatorAvatar}
                      alt={order.creatorName}
                      className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2] shrink-0 shadow-2xs"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-[#0A0A0A] leading-tight">
                          {order.creatorName}
                        </h3>
                        <VerifiedBadge size="xs" />
                        <span className="text-xs text-[#73736A] font-medium leading-none">
                          {order.creatorHandle.startsWith('@') ? order.creatorHandle : `@${order.creatorHandle}`}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                          {platformLabels[order.platform] || order.platform}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                        {order.packageTitle}
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap text-xs text-[#73736A] font-medium pt-0.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-[#E7E7E2] text-[#0A0A0A] font-semibold text-xs leading-none shadow-2xs">
                          €{order.totalEur.toLocaleString()} Escrow Funded
                        </span>
                        <span className="text-[#C5C5BD] text-xs leading-none select-none">•</span>
                        <span className="inline-flex items-center text-xs text-[#73736A] leading-none">
                          Due {order.deadlineDate}
                        </span>
                        <span className="text-[#C5C5BD] text-xs leading-none select-none">•</span>
                        <span className="inline-flex items-center text-xs text-[#73736A] leading-none">
                          {order.deliverables.length} Deliverable{order.deliverables.length === 1 ? '' : 's'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                    <span
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full leading-none inline-flex items-center ${
                        statusColors[order.status] || 'bg-[#F4F4F0] text-[#0A0A0A]'
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>

                    <Link href={`/brand/orders/${order.id}`}>
                      <button className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98">
                        <span>Manage</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
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
              <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] tracking-tight">
                Saved Creator Shortlist
              </h2>
              <p className="text-sm text-[#73736A] mt-0.5 font-medium">
                Creators you bookmarked during discovery.
              </p>
            </div>
            <Link
              href="/brand/saved"
              className="text-sm font-semibold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1.5 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {savedCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {savedCreators.slice(0, 4).map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          ) : (
            <EmptyState
              color="neutral"
              icon={<Bookmark className="w-8 h-8" />}
              badge="Shortlist"
              title="No Saved Creators Yet"
              description="Bookmark creators while browsing the marketplace to quickly compare rates and issue bulk campaign briefs."
              primaryAction={{
                label: 'Explore Verified Creators',
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
