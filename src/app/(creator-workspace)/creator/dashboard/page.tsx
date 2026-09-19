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
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Package,
  X,
} from 'lucide-react';
import { Button, Tag, message } from 'antd';

export default function CreatorDashboardPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  // Filter creator's orders (Sophie Kim or default)
  const incomingOffers = orders.filter((o) => o.status === 'offer_sent');
  const activeOrders = orders.filter((o) =>
    ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status)
  );
  const completedOrders = orders.filter((o) => ['approved', 'completed'].includes(o.status));

  // Earnings calculations
  const totalEarnedEur = completedOrders.reduce((acc, curr) => acc + curr.basePriceEur, 0);
  const pendingInEscrowEur = activeOrders.reduce((acc, curr) => acc + curr.basePriceEur, 0);

  const handleAcceptOffer = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: 'in_production' }));
    message.success('Offer accepted! Escrow funds locked. Campaign moved to production.');
  };

  const handleDeclineOffer = (orderId: string) => {
    dispatch(updateOrderStatus({ orderId, status: 'declined' }));
    message.info('Offer declined.');
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Creator Dashboard"
        subtitle="Sophie Kim (@sophiekim) • Verified Talent Hub"
        action={
          <Link href="/creators/creator-01" target="_blank">
            <Button
              type="default"
              className="h-9 px-4 rounded-full font-bold text-xs border-[#D2D2CA] text-[#151515] flex items-center gap-1.5"
            >
              <span>View Live Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Earnings Stats Cards in EUR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Available Balance */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Available Payout
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              €{(totalEarnedEur + 3400).toLocaleString()}
            </div>
            <div className="text-[11px] text-[#23744D] font-bold">
              Ready for instant bank transfer
            </div>
          </div>

          {/* Card 2: Pending in Escrow */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Locked in Escrow
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              €{pendingInEscrowEur.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#73736A]">
              Releases upon deliverable approval
            </div>
          </div>

          {/* Card 3: Incoming Offers */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Incoming Offers
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              {incomingOffers.length}
            </div>
            <div className="text-[11px] text-[#8C6819] font-bold">
              {incomingOffers.length > 0 ? 'Action required within 48h' : 'No new offers'}
            </div>
          </div>

          {/* Card 4: Creator Rating */}
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                Rating & Feedback
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FDF0ED] text-[#C75D47] flex items-center justify-center">
                <Star className="w-4 h-4 fill-[#C75D47]" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#151515]">
              5.0 ★
            </div>
            <div className="text-[11px] text-[#73736A]">
              48 completed brand partnerships
            </div>
          </div>
        </div>

        {/* Incoming Offers Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515] tracking-tight">
                Incoming Campaign Offers
              </h2>
              <p className="text-xs text-[#73736A]">
                Pre-funded brand offers with secure escrow deposits.
              </p>
            </div>
            <Link
              href="/creator/offers"
              className="text-xs font-bold text-[#151515] hover:text-[#2B7FFF] flex items-center gap-1"
            >
              <span>View all ({incomingOffers.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {incomingOffers.length > 0 ? (
            <div className="space-y-4">
              {incomingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#151515] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={offer.brandLogo}
                      alt={offer.brandName}
                      className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-[#151515]">
                          {offer.brandName}
                        </h3>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAEAE3] text-[#151515]">
                          {offer.platform}
                        </span>
                      </div>
                      <p className="text-xs text-[#555550]">
                        {offer.packageTitle} • &ldquo;{offer.brief.slice(0, 80)}...&rdquo;
                      </p>
                      <div className="text-[11px] text-[#73736A]">
                        Your Payout: <strong className="text-[#151515]">€{offer.basePriceEur}</strong> (100%) • Due by {offer.deadlineDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <Button
                      type="primary"
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="h-9 px-4 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#23744D] text-white border-none"
                    >
                      Accept (€{offer.basePriceEur})
                    </Button>

                    <Button
                      type="default"
                      onClick={() => handleDeclineOffer(offer.id)}
                      className="h-9 px-3 rounded-full font-bold text-xs border-[#D2D2CA] text-[#73736A] hover:text-rose-600"
                    >
                      Decline
                    </Button>

                    <Link href={`/creator/orders/${offer.id}`}>
                      <Button
                        type="default"
                        className="h-9 px-3 rounded-full font-bold text-xs border-[#D2D2CA] text-[#151515]"
                      >
                        Brief
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-2">
              <Sparkles className="w-6 h-6 text-[#73736A] mx-auto" />
              <p className="font-bold text-xs text-[#151515]">No pending offers right now</p>
              <p className="text-[11px] text-[#73736A]">
                Ensure your packages and portfolio are up to date to increase incoming brand requests.
              </p>
            </div>
          )}
        </div>

        {/* Active Production Orders */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#151515] tracking-tight">
                Active Deliverables & Fulfilment
              </h2>
              <p className="text-xs text-[#73736A]">
                Submit drafts and links to trigger brand escrow release.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.brandLogo}
                    alt={order.brandName}
                    className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2]"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-[#151515]">
                      {order.brandName}
                    </h3>
                    <p className="text-xs text-[#555550]">
                      {order.packageTitle} ({order.platform})
                    </p>
                    <div className="text-[11px] text-[#73736A] mt-1">
                      Due: {order.deadlineDate} • Locked in Escrow: €{order.basePriceEur}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D]">
                    {order.status === 'deliverable_submitted'
                      ? 'Under Brand Review'
                      : 'In Production'}
                  </span>

                  <Link href={`/creator/orders/${order.id}`}>
                    <Button
                      type="primary"
                      className="h-9 px-5 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none"
                    >
                      Open Fulfilment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
