'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateOrderStatus } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { Inbox, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, message } from 'antd';
import { BrandLogo } from '@/components/shared/BrandLogo';

export default function CreatorOffersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const incomingOffers = orders.filter(
    (o) =>
      o.status === 'offer_sent' &&
      (o.creatorId === targetCreatorId ||
        (o.creatorId === 'creator-01' && (!currentUser || currentUser?.role === 'creator')))
  );

  const handleAccept = (id: string) => {
    dispatch(updateOrderStatus({ orderId: id, status: 'in_production' }));
    message.success('Offer accepted! You can now access the campaign workspace to submit deliverables.');
  };

  const handleDecline = (id: string) => {
    dispatch(updateOrderStatus({ orderId: id, status: 'declined' }));
    message.info('Offer declined.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <WorkspaceHeader
        title="Incoming Offers"
        subtitle="Review collaboration briefs, verify escrow funding, and accept campaigns."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">
              Pending Collaboration Requests ({incomingOffers.length})
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Escrow Funded</span>
            </div>
          </div>

          {incomingOffers.length > 0 ? (
            <div className="space-y-4">
              {incomingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-4 hover:border-[#0A0A0A] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <BrandLogo
                        name={offer.brandName}
                        logoUrl={offer.brandLogo}
                        size="lg"
                      />
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-[#0A0A0A] leading-tight">
                            {offer.brandName}
                          </h3>
                          <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#4A4A45] leading-none ml-1">
                            {offer.platform}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-[#0A0A0A] leading-snug">{offer.packageTitle}</div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-semibold text-[#73736A] uppercase tracking-wider">Creator Net Payout</span>
                      <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
                        €{offer.basePriceEur}
                      </div>
                      <span className="text-xs text-[#23744D] font-semibold">Zero Creator Fee (100% Payout)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-[#E7E7E2] space-y-1.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#73736A]">Creative Concept & Brief</div>
                    <p className="text-sm text-[#44443E] leading-relaxed">
                      {offer.brief}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#73736A] mb-2">Campaign Requirements</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#0A0A0A]">
                      {offer.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-sm text-[#73736A]">
                      Deadline: <strong className="text-[#0A0A0A]">{offer.deadlineDate}</strong>
                    </span>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button
                        type="primary"
                        onClick={() => handleAccept(offer.id)}
                        className="flex-1 sm:flex-initial h-10 px-6 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-[#23744D] !text-white hover:!text-white border-none cursor-pointer shadow-xs"
                      >
                        Accept Offer (€{offer.basePriceEur})
                      </Button>
                      <Button
                        type="default"
                        onClick={() => handleDecline(offer.id)}
                        className="h-10 px-5 rounded-full font-semibold text-sm border-[#D2D2CA] text-[#73736A] cursor-pointer"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              color="neutral"
              icon={<Inbox className="w-8 h-8" />}
              badge="Inbox Zero"
              title="No Pending Campaign Offers"
              description="Brands discover your verified rate card and send custom brief proposals directly to this inbox. Make sure your packages and portfolio are up to date."
              primaryAction={{
                label: 'Update Rate Card Packages',
                href: '/creator/packages',
              }}
              secondaryAction={{
                label: 'View Public Profile',
                href: '/creators/creator-01',
              }}
              variant="dashed"
            />
          )}
        </div>
      </div>
    </div>
  );
}
