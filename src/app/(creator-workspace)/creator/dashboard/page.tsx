'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateOrderStatus } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import {
  DollarSign,
  Inbox,
  ShoppingBag,
  Clock,
  Sparkles,
  Package,
  Film,
  ChevronRight,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import { Button, message } from 'antd';
import { CreatorAnnualAnalytics } from '@/components/shared/CreatorAnnualAnalytics';

export default function CreatorDashboardPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);

  // Current creator details
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const currentCreator = creators.find((c) => c.id === targetCreatorId) || creators[0];

  const creatorOrders = orders.filter(
    (o) => o.creatorId === targetCreatorId || (o.creatorId === 'creator-01' && (!currentUser || currentUser?.role === 'creator'))
  );

  const incomingOffers = creatorOrders.filter((o) => o.status === 'offer_sent');
  const activeOrders = creatorOrders.filter((o) =>
    ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status)
  );

  // Portfolio items
  const portfolioItems = currentCreator?.portfolio || [];

  // Earnings calculations
  const pendingInEscrowEur = activeOrders.reduce((acc, curr) => acc + curr.basePriceEur, 0);

  const handleAcceptOffer = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: 'in_production' }));
    message.success('Offer accepted. Production pipeline started.');
  };

  const creatorDisplayName = currentUser?.name || currentCreator?.name || 'Sophie Kim';
  const creatorDisplayHandle = currentUser?.handle || currentCreator?.handle || 'sophiekim';

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Creator Dashboard"
        subtitle={`${creatorDisplayName} (@${creatorDisplayHandle.replace('@', '')}) • Active Studio`}
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7">
        {/* Executive Metric Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Earned */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Total Earned
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €28,400
            </div>

          </div>

          {/* Locked in Escrow */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                In Production
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              €{pendingInEscrowEur.toLocaleString()}
            </div>

          </div>

          {/* Incoming Offers */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Pending Offers
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {incomingOffers.length}
            </div>

          </div>

          {/* Portfolio & Case Studies Summary */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Case Studies
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FDF0ED] text-[#FF2D78] flex items-center justify-center">
                <Film className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">
              {portfolioItems.length}
            </div>

          </div>
        </div>

        {/* Action-Required Banner (Only shown when pending brand offers exist) */}
        {incomingOffers.length > 0 && (
          <div className="bg-gradient-to-r from-[#0A0A0A] to-zinc-900 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF2D78] shrink-0 border border-white/10">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-[#FF2D78] text-white px-2.5 py-0.5 rounded-full">
                    Action Required
                  </span>
                  <span className="text-xs text-zinc-300 font-medium">Response requested</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {incomingOffers[0].brandName} sent a €{incomingOffers[0].basePriceEur} campaign proposal
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {incomingOffers[0].packageTitle} • Due {incomingOffers[0].deadlineDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
              <Button
                type="primary"
                onClick={() => handleAcceptOffer(incomingOffers[0].id)}
                className="h-10 px-5 rounded-full font-bold text-xs bg-[#23744D] hover:!bg-[#1c5f3e] !text-white border-none cursor-pointer"
              >
                Accept Offer
              </Button>
              <Link href="/creator/campaigns">
                <Button
                  type="default"
                  className="h-10 px-4 rounded-full font-bold text-xs bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  View All
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* 12-Month Annual Performance & Brand Collabs Analytics */}
        <CreatorAnnualAnalytics />

        {/* Active Fulfillment Pipeline */}
        <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E2]">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Active Production Deliverables
                </h2>
                <p className="text-sm text-[#73736A] mt-0.5 font-medium">
                  {activeOrders.length} deliverable{activeOrders.length === 1 ? '' : 's'} currently in progress
                </p>
              </div>
              <Link
                href="/creator/campaigns"
                className="text-sm font-bold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1 transition-colors"
              >
                <span>Campaigns Center</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {activeOrders.length > 0 ? (
              <div className="space-y-3">
                {activeOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between gap-3 hover:border-[#0A0A0A] transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={order.brandLogo}
                        alt={order.brandName}
                        className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-[#0A0A0A] truncate">
                            {order.brandName}
                          </h4>
                          <span className="text-xs uppercase font-bold px-2 py-0.2 rounded-full bg-[#EAEAE3] text-[#4A4A45]">
                            {order.platform}
                          </span>
                        </div>
                        <p className="text-sm text-[#555550] truncate font-medium mt-0.5">
                          {order.packageTitle}
                        </p>
                        <div className="text-sm text-[#73736A] font-medium mt-0.5">
                          Due: {order.deadlineDate} • €{order.basePriceEur} in escrow
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-[#EEF7F2] text-[#23744D]">
                        {order.status === 'deliverable_submitted' ? 'In Review' : 'Producing'}
                      </span>
                      <Link href={`/creator/orders/${order.id}`}>
                        <button className="h-8 px-3 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-zinc-800 transition-all cursor-pointer">
                          Upload
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center mx-auto text-[#73736A]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[#0A0A0A]">No Active Production Orders</div>
                <p className="text-sm text-[#73736A] max-w-sm mx-auto">
                  Your pipeline is currently clear. Accepted brand proposals will appear here with upload portals.
                </p>
              </div>
            )}
        </div>

        {/* Quick Utility Shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/creator/packages"
            className="p-4 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0A0A0A]">Rate Card</div>
              <div className="text-sm text-[#73736A]">Packages & pricing</div>
            </div>
          </Link>

          <Link
            href="/creator/portfolio"
            className="p-4 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0A0A0A]">Portfolio Studio</div>
              <div className="text-sm text-[#73736A]">Case studies & metrics</div>
            </div>
          </Link>

          <Link
            href="/creator/payments"
            className="p-4 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0A0A0A]">Payouts</div>
              <div className="text-sm text-[#73736A]">Escrow ledger</div>
            </div>
          </Link>

          <Link
            href="/creator/messages"
            className="p-4 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all flex items-center gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAFAF8] text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0A0A0A]">Inquiries</div>
              <div className="text-sm text-[#73736A]">Brand direct chat</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
