'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateOrderStatus } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { Inbox, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, message } from 'antd';

export default function CreatorOffersPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const incomingOffers = orders.filter((o) => o.status === 'offer_sent');

  const handleAccept = (id: string) => {
    dispatch(updateOrderStatus({ orderId: id, status: 'in_production' }));
    message.success('Offer accepted! You can now access the campaign workspace to submit deliverables.');
  };

  const handleDecline = (id: string) => {
    dispatch(updateOrderStatus({ orderId: id, status: 'declined' }));
    message.info('Offer declined.');
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Incoming Brand Offers"
        subtitle="Review campaign briefs, deadlines, and accept escrow-funded offers."
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#151515]">
              Pending Offers ({incomingOffers.length})
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#23744D] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Funded by Brands</span>
            </div>
          </div>

          {incomingOffers.length > 0 ? (
            <div className="space-y-4">
              {incomingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-4 hover:border-[#151515] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={offer.brandLogo}
                        alt={offer.brandName}
                        className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2]"
                      />
                      <div>
                        <h3 className="font-extrabold text-sm text-[#151515]">
                          {offer.brandName}
                        </h3>
                        <div className="text-xs text-[#555550]">{offer.packageTitle}</div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAEAE3] text-[#151515] mt-1 inline-block">
                          {offer.platform}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-[#73736A]">Creator Net Payout:</span>
                      <div className="text-2xl font-black text-[#151515]">
                        €{offer.basePriceEur}
                      </div>
                      <span className="text-[10px] text-[#23744D] font-bold">Zero Creator Fee (100% Payout)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#E7E7E2] space-y-2">
                    <div className="text-xs font-bold text-[#151515]">Creative Concept & Brief:</div>
                    <p className="text-xs text-[#555550] leading-relaxed">
                      {offer.brief}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#151515] mb-1">Campaign Requirements:</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#555550]">
                      {offer.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#151515]" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#E7E7E2] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-[#73736A]">
                      Deadline: <strong className="text-[#151515]">{offer.deadlineDate}</strong>
                    </span>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button
                        type="primary"
                        onClick={() => handleAccept(offer.id)}
                        className="flex-1 sm:flex-initial h-10 px-6 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#23744D] text-white border-none"
                      >
                        Accept Offer (€{offer.basePriceEur})
                      </Button>
                      <Button
                        type="default"
                        onClick={() => handleDecline(offer.id)}
                        className="h-10 px-4 rounded-full font-bold text-xs border-[#D2D2CA] text-[#73736A]"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-3">
              <Inbox className="w-8 h-8 text-[#73736A] mx-auto" />
              <h3 className="font-bold text-sm text-[#151515]">No pending offers</h3>
              <p className="text-xs text-[#73736A]">
                Brands will send proposals directly to your inbox once they discover your profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
