'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function BrandOrdersPage() {
  const { orders } = useAppSelector((state) => state.order);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'review' | 'completed'>('all');

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'active') return ['offer_sent', 'accepted', 'in_production'].includes(o.status);
    if (activeFilter === 'review') return o.status === 'deliverable_submitted';
    if (activeFilter === 'completed') return o.status === 'completed' || o.status === 'approved';
    return true;
  });

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Campaign Orders & Hires"
        subtitle="Manage active production, review submitted assets, and release escrow payments."
        action={
          <Link href="/brand/hire/new">
            <button className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white border-none flex items-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-98">
              <PlusCircle className="w-4 h-4" />
              <span>New Hire</span>
            </button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Filter Pills Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E7E7E2] max-w-md shadow-2xs">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'In Progress' },
            { key: 'review', label: 'Needs Review' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#0A0A0A] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#0A0A0A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusColors: Record<string, string> = {
                offer_sent: 'bg-[#FAF6E8] text-[#8C6819]',
                accepted: 'bg-[#FFF0F5] text-[#FF2D78]',
                in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-bold',
                approved: 'bg-[#EEF7F2] text-[#23744D]',
                completed: 'bg-[#F4F4F0] text-[#0A0A0A]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Offer Sent • Pending',
                accepted: 'Accepted • In Production',
                in_production: 'In Production',
                deliverable_submitted: 'Deliverables Submitted • Review Ready',
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
                    {/* Perfect Circular Creator Avatar */}
                    <img
                      src={order.creatorAvatar}
                      alt={order.creatorName}
                      className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2] shrink-0 shadow-2xs"
                    />

                    <div className="flex flex-col gap-2">
                      {/* Row 1: Creator Name + Verified + Handle + Platform Badge */}
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

                      {/* Row 2: Clean Package Title */}
                      <div className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                        {order.packageTitle}
                      </div>

                      {/* Row 3: Clear Clutter-Free Metadata Chips */}
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

                  {/* Status Badge & Action Button */}
                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                    <span
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full leading-none inline-flex items-center ${
                        statusColors[order.status] || 'bg-[#F4F4F0] text-[#0A0A0A]'
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>

                    <Link href={`/brand/orders/${order.id}`}>
                      <button className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98">
                        <span>Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              color="emerald"
              icon={<ShoppingBag className="w-8 h-8" />}
              badge="Escrow Guarded"
              title="No Campaign Orders in this View"
              description="Discover top creators, book fixed packages, or initiate custom escrow-protected milestone agreements."
              primaryAction={{
                label: 'Discover Creators to Hire',
                href: '/creators',
              }}
              secondaryAction={{
                label: 'Create Custom Brief',
                href: '/brand/hire/new',
              }}
              variant="card"
            />
          )}
        </div>
      </div>
    </div>
  );
}
