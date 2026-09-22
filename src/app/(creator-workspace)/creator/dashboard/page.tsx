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
  Camera,
  X,
} from 'lucide-react';
import { Button, Tag, message } from 'antd';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { EmptyState } from '@/components/shared/EmptyState';

export default function CreatorDashboardPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  // Filter creator's orders strictly
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const creatorOrders = orders.filter(
    (o) => o.creatorId === targetCreatorId || (o.creatorId === 'creator-01' && (!currentUser || currentUser?.role === 'creator'))
  );

  const incomingOffers = creatorOrders.filter((o) => o.status === 'offer_sent');
  const activeOrders = creatorOrders.filter((o) =>
    ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status)
  );
  const completedOrders = creatorOrders.filter((o) => ['approved', 'completed'].includes(o.status));

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

  const creatorDisplayName = currentUser?.name || 'Sophie Kim';
  const creatorDisplayHandle = currentUser?.handle || 'sophiekim';

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Creator Dashboard"
        subtitle={`${creatorDisplayName} (@${creatorDisplayHandle.replace('@', '')}) • Verified Talent Hub`}
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Earnings Stats Cards in EUR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Available Balance */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Available Payout
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A]">
              €{(totalEarnedEur + 3400).toLocaleString()}
            </div>
            <div className="text-xs text-[#23744D] font-bold">
              Ready for instant bank transfer
            </div>
          </div>

          {/* Card 2: Pending in Escrow */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Locked in Escrow
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F1EEF9] text-[#6444A6] flex items-center justify-center">
                <Clock className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A]">
              €{pendingInEscrowEur.toLocaleString()}
            </div>
            <div className="text-xs text-[#73736A]">
              Releases upon deliverable approval
            </div>
          </div>

          {/* Card 3: Incoming Offers */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Incoming Offers
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#FAF6E8] text-[#8C6819] flex items-center justify-center">
                <Inbox className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A]">
              {incomingOffers.length}
            </div>
            <div className="text-xs text-[#8C6819] font-bold">
              {incomingOffers.length > 0 ? 'Action required within 48h' : 'No new offers'}
            </div>
          </div>

          {/* Card 4: Creator Rating */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Rating & Feedback
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#FDF0ED] text-[#C75D47] flex items-center justify-center">
                <Star className="w-4.5 h-4.5 fill-[#C75D47]" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A]">
              5.0 ★
            </div>
            <div className="text-xs text-[#73736A]">
              48 completed brand partnerships
            </div>
          </div>
        </div>

        {/* Incoming Offers Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                Incoming Campaign Offers
              </h2>
              <p className="text-sm text-[#73736A]">
                Pre-funded brand offers with secure escrow deposits.
              </p>
            </div>
            <Link
              href="/creator/offers"
              className="text-sm font-bold text-[#0A0A0A] hover:text-zinc-600 flex items-center gap-1.5 transition-colors"
            >
              <span>View all ({incomingOffers.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {incomingOffers.length > 0 ? (
            <div className="space-y-4">
              {incomingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#0A0A0A] transition-all"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <BrandLogo
                      name={offer.brandName}
                      logoUrl={offer.brandLogo}
                      size="lg"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-[#0A0A0A] leading-tight">
                          {offer.brandName}
                        </h3>
                        <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                          {offer.platform}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                        {offer.packageTitle}
                      </p>
                      <div className="flex items-center gap-2.5 flex-wrap text-xs text-[#73736A] font-medium pt-0.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#EEF7F2] text-[#23744D] font-bold border border-[#23744D]/20 text-xs leading-none shadow-2xs">
                          €{offer.basePriceEur.toLocaleString()} Payout (100%)
                        </span>
                        <span className="text-[#C5C5BD] text-xs leading-none select-none">•</span>
                        <span className="inline-flex items-center text-xs text-[#73736A] leading-none">
                          Due {offer.deadlineDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0 mt-2 md:mt-0">
                    <Button
                      type="primary"
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#23744D] !text-white hover:!text-white border-none"
                    >
                      Accept (€{offer.basePriceEur})
                    </Button>

                    <Button
                      type="default"
                      onClick={() => handleDeclineOffer(offer.id)}
                      className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#73736A] hover:text-rose-600"
                    >
                      Decline
                    </Button>

                    <Link href={`/creator/orders/${offer.id}`}>
                      <Button
                        type="default"
                        className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A]"
                      >
                        Brief
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              color="pink"
              icon={<Inbox className="w-8 h-8" />}
              badge="Inbox Zero"
              title="No Pending Offers Right Now"
              description="Keep your rate card packages and media portfolio up to date to attract incoming brand proposals."
              primaryAction={{
                label: 'Manage Rate Card Packages',
                href: '/creator/packages',
              }}
              variant="dashed"
            />
          )}
        </div>

        {/* Active Production Orders */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                Active Deliverables & Fulfilment
              </h2>
              <p className="text-sm text-[#73736A]">
                Submit drafts and links to trigger brand escrow release.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={order.brandLogo}
                      alt={order.brandName}
                      className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2]"
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-[#0A0A0A]">
                        {order.brandName}
                      </h3>
                      <p className="text-sm text-[#555550]">
                        {order.packageTitle} ({order.platform})
                      </p>
                      <div className="text-xs text-[#73736A] mt-1">
                        Due: {order.deadlineDate} • Locked in Escrow: €{order.basePriceEur}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      {order.status === 'deliverable_submitted'
                        ? 'Under Brand Review'
                        : 'In Production'}
                    </span>

                    <Link href={`/creator/orders/${order.id}`}>
                      <button className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white border-none flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98">
                        <span>Open Fulfilment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                color="emerald"
                icon={<ShoppingBag className="w-8 h-8" />}
                badge="Fulfilment Clear"
                title="No Active Production Orders"
                description="When you accept brand proposals, they will appear here with brief instructions, upload portals, and escrow payout milestones."
                primaryAction={{
                  label: 'View All Production History',
                  href: '/creator/orders',
                }}
                variant="dashed"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
