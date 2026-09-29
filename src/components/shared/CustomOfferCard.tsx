'use client';

import React from 'react';
import Link from 'next/link';
import { message } from 'antd';
import { useAppDispatch } from '@/redux/hooks';
import { ChatCustomOffer, updateCustomOfferStatus } from '@/redux/slices/messageSlice';
import { createOffer } from '@/redux/slices/orderSlice';
import { Order, PlatformType } from '@/types';

function platformLabel(platform: PlatformType) {
  if (platform === 'all' || platform === 'multi') return 'All platforms';
  if (platform === 'ugc') return 'UGC Ads';
  if (platform === 'instagram') return 'Instagram';
  if (platform === 'tiktok') return 'TikTok';
  if (platform === 'youtube') return 'YouTube';
  return platform;
}

interface CustomOfferCardProps {
  offer: ChatCustomOffer;
  viewer: 'brand' | 'creator';
  conversationId: string;
  messageId: string;
  brand: { id: string; name: string; avatar: string };
  creator: { id: string; name: string; handle: string; avatar: string };
}

export function CustomOfferCard({
  offer,
  viewer,
  conversationId,
  messageId,
  brand,
  creator,
}: CustomOfferCardProps) {
  const dispatch = useAppDispatch();
  const feeEur = Math.round(offer.priceEur * 0.15 * 100) / 100;
  const totalEur = Math.round((offer.priceEur + feeEur) * 100) / 100;
  const amount = viewer === 'brand' ? totalEur : offer.priceEur;

  const statusLabel =
    offer.status === 'accepted' ? 'Accepted' : offer.status === 'declined' ? 'Declined' : 'Pending';

  const handleAccept = () => {
    const orderId = `ord-${Date.now()}`;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);

    const order: Order = {
      id: orderId,
      brandId: brand.id,
      brandName: brand.name,
      brandLogo: brand.avatar,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorHandle: creator.handle.startsWith('@') ? creator.handle : `@${creator.handle}`,
      creatorAvatar: creator.avatar,
      packageTitle: offer.title,
      collaborationType: offer.platform === 'ugc' || offer.platform === 'all' ? 'content_creation' : 'sponsored_post',
      platform: offer.platform,
      basePriceEur: offer.priceEur,
      platformFeeEur: feeEur,
      totalEur,
      status: 'in_production',
      brief: offer.deliverables.join('\n'),
      requirements: offer.deliverables,
      deadlineDate: deadline.toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      escrowFunded: true,
      escrowReleased: false,
      deliverables: [],
      messages: [],
    };

    dispatch(createOffer(order));
    dispatch(
      updateCustomOfferStatus({
        conversationId,
        messageId,
        status: 'accepted',
        orderId,
      })
    );
    message.success('Offer accepted. Work has started.');
  };

  const handleDecline = () => {
    dispatch(
      updateCustomOfferStatus({
        conversationId,
        messageId,
        status: 'declined',
      })
    );
    message.info('Offer declined.');
  };

  const orderHref = offer.orderId
    ? viewer === 'brand'
      ? `/brand/orders/${offer.orderId}`
      : `/creator/orders/${offer.orderId}`
    : null;

  return (
    <div className="w-[280px] sm:w-[320px] rounded-2xl border border-[#E7E7E2] bg-white text-left shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[#E7E7E2] flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#73736A]">Custom offer</span>
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            offer.status === 'accepted'
              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
              : offer.status === 'declined'
              ? 'bg-rose-50 text-rose-600 border-rose-200'
              : 'bg-[#F4F4F0] text-[#73736A] border-[#E7E7E2]'
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="text-sm font-bold text-[#0A0A0A]">{offer.title}</div>
          <div className="text-xs font-semibold text-[#73736A] mt-0.5">{platformLabel(offer.platform)}</div>
        </div>

        <ul className="space-y-1">
          {offer.deliverables.map((item) => (
            <li key={item} className="text-sm text-[#0A0A0A] leading-snug">
              {item}
            </li>
          ))}
        </ul>

        <div>
          <div className="text-lg font-black text-[#0A0A0A] tracking-tight">€{amount.toLocaleString()}</div>
          {viewer === 'brand' && (
            <div className="text-xs font-medium text-[#73736A]">
              €{offer.priceEur.toLocaleString()} + €{feeEur.toLocaleString()} fee
            </div>
          )}
        </div>

        {viewer === 'brand' && offer.status === 'pending' && (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleDecline}
              className="h-9 flex-1 rounded-full text-sm font-bold border border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] bg-white cursor-pointer"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="h-9 flex-1 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-zinc-800 cursor-pointer"
            >
              Accept
            </button>
          </div>
        )}

        {offer.status === 'accepted' && orderHref && (
          <Link
            href={orderHref}
            className="inline-flex h-9 items-center text-sm font-bold text-[#0A0A0A] underline underline-offset-2"
          >
            Open campaign
          </Link>
        )}
      </div>
    </div>
  );
}
