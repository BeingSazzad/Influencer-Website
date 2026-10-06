'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { CreatorCard } from '@/components/shared/CreatorCard';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Bookmark,
} from 'lucide-react';
import { Button } from 'antd';
import { BrandAnnualAnalytics } from '@/components/shared/BrandAnnualAnalytics';

export default function BrandDashboardPage() {
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

  // Calculate totals
  const totalEscrowFundedEur = brandOrders.reduce((acc, curr) => acc + curr.totalEur, 0);
  const activeSpendEur = activeOrders.reduce((acc, curr) => acc + curr.totalEur, 0);

  // Shortlisted creators
  const savedCreators = creators.filter((c) => savedCreatorIds.includes(c.id));

  return (
    <div className="min-h-screen">
      <WorkspaceHeader
        title="Dashboard"
        subtitle={currentUser?.companyName || 'Aura Skincare Paris'}
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Campaign</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#66665E]">
                In Escrow
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{Math.round(activeSpendEur).toLocaleString()}
            </div>
            <div className="text-sm text-[#66665E] font-medium">Locked on active hires</div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#66665E]">
                Active Hires
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {activeOrders.length}
            </div>
            <div className="text-sm text-[#66665E] font-medium">Campaigns in progress</div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#66665E]">
                Lifetime Spend
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{Math.round(totalEscrowFundedEur).toLocaleString()}
            </div>
            <div className="text-sm text-[#66665E] font-medium">All funded campaigns</div>
          </div>
        </div>

        {/* 12-Month Annual Campaign Spend & Creator Hires Analytics */}
        <BrandAnnualAnalytics />

        {/* Active Campaigns Table / List */}
        <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Active Campaigns
              </h2>
              <p className="text-sm text-[#66665E] mt-0.5 font-medium">
                {activeOrders.length} in progress
              </p>
            </div>
            <Link
              href="/brand/campaigns"
              className="text-sm font-bold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeOrders.map((order) => {
              const statusColors: Record<string, string> = {
                offer_sent: 'bg-[#F4F4F0] text-[#66665E] border border-[#E7E7E2]',
                accepted: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                in_production: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                deliverable_submitted: 'bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25 font-bold',
                approved: 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]',
                completed: 'bg-[#F4F4F0] text-[#66665E] border border-[#E7E7E2]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Pending',
                accepted: 'Accepted',
                in_production: 'In Production',
                deliverable_submitted: 'Review Ready',
                approved: 'Released',
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
                  className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#0A0A0A] transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={order.creatorAvatar}
                      alt={order.creatorName}
                      className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-[#0A0A0A] leading-tight">
                          {order.creatorName}
                        </h3>
                        <VerifiedBadge size="xs" />
                        <span className="text-sm text-[#66665E] font-medium leading-none">
                          {order.creatorHandle.startsWith('@') ? order.creatorHandle : `@${order.creatorHandle}`}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                          {platformLabels[order.platform] || order.platform}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                        {order.packageTitle}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#66665E] font-medium pt-0.5">
                        <span className="font-extrabold text-[#0A0A0A]">
                          €{order.totalEur.toLocaleString()}
                        </span>
                        <span className="text-[#D2D2CA]">•</span>
                        <span>Due {order.deadlineDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                    <span
                      className={`text-sm font-semibold px-3.5 py-1.5 rounded-full leading-none inline-flex items-center ${
                        statusColors[order.status] || 'bg-[#F4F4F0] text-[#0A0A0A]'
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>

                    <Link href={`/brand/orders/${order.id}`}>
                      <button className="h-8 px-3 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#FF2D78] transition-all cursor-pointer">
                        Manage
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shortlisted Creators Grid */}
        <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Shortlist
              </h2>
              <p className="text-sm text-[#66665E] mt-0.5 font-medium">
                {savedCreators.length} saved
              </p>
            </div>
            <Link
              href="/brand/saved"
              className="text-sm font-bold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {savedCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
