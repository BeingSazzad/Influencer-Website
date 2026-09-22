'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '@/components/shared/BrandLogo';

export default function CreatorOrdersPage() {
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'review' | 'completed'>('all');

  // Filter orders strictly for this creator
  const targetCreatorId = currentUser?.id || 'creator-01';
  const creatorOrders = orders.filter(
    (o) => o.creatorId === targetCreatorId || (o.creatorId === 'creator-01' && currentUser?.role === 'creator')
  );

  const filteredOrders = creatorOrders.filter((o) => {
    if (activeFilter === 'active') return ['accepted', 'in_production'].includes(o.status);
    if (activeFilter === 'review') return o.status === 'deliverable_submitted';
    if (activeFilter === 'completed') return o.status === 'completed' || o.status === 'approved';
    return true;
  });

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Production Orders & Deliverables"
        subtitle="Track active brand campaigns, submit content deliverables, and manage escrow disbursements."
      />

      <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Filter Pills Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E7E7E2] max-w-md shadow-2xs">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'In Production' },
            { key: 'review', label: 'Under Review' },
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
                accepted: 'bg-[#F1EEF9] text-[#6444A6]',
                in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-bold',
                approved: 'bg-[#EEF7F2] text-[#23744D]',
                completed: 'bg-[#F4F4F0] text-[#0A0A0A]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Incoming Offer • Pending',
                accepted: 'Accepted • In Production',
                in_production: 'In Production',
                deliverable_submitted: 'Submitted • Brand Reviewing',
                approved: 'Approved • Payout Cleared',
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
                    {/* Brand Logo Avatar */}
                    <BrandLogo
                      name={order.brandName}
                      logoUrl={order.brandLogo}
                      size="lg"
                    />

                    <div className="flex flex-col gap-2">
                      {/* Row 1: Brand Name + Platform Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-[#0A0A0A] leading-tight">
                          {order.brandName}
                        </h3>
                        <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                          {platformLabels[order.platform] || order.platform}
                        </span>
                      </div>

                      {/* Row 2: Package Title */}
                      <div className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                        {order.packageTitle}
                      </div>

                      {/* Row 3: Creator Payout Chips */}
                      <div className="flex items-center gap-2.5 flex-wrap text-xs text-[#73736A] font-medium pt-0.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#EEF7F2] text-[#23744D] font-bold border border-[#23744D]/20 text-xs leading-none shadow-2xs">
                          €{order.basePriceEur.toLocaleString()} Payout (100%)
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

                    <Link href={`/creator/orders/${order.id}`}>
                      <button className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98">
                        <span>Fulfilment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              color="purple"
              icon={<ShoppingBag className="w-8 h-8" />}
              badge="Production Pipeline"
              title="No Production Orders Found"
              description="Accepted brand campaign offers and custom briefs will appear here for content creation, draft uploads, and milestone delivery."
              primaryAction={{
                label: 'View Incoming Brand Offers',
                href: '/creator/offers',
              }}
              secondaryAction={{
                label: 'Update Rate Card Packages',
                href: '/creator/packages',
              }}
              variant="card"
            />
          )}
        </div>
      </div>
    </div>
  );
}
