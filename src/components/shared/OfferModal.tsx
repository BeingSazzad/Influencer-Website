'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeOfferModal, createOffer } from '@/redux/slices/orderSlice';
import { Modal, Input, InputNumber, message } from 'antd';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';
import { Order, PlatformType } from '@/types';
import { useRouter } from 'next/navigation';

export function OfferModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOfferModalOpen, selectedCreatorForOffer } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [collabType, setCollabType] = useState<'sponsored_post' | 'content_creation'>('sponsored_post');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [packageTitle, setPackageTitle] = useState(selectedCreatorForOffer?.packageTitle || 'Instagram Reel Campaign');
  const [basePrice, setBasePrice] = useState<number>(selectedCreatorForOffer?.priceEur || 950);
  const [brief, setBrief] = useState('We would like an authentic 30–60s video featuring our new product launch with key value propositions and tracking link.');
  const [deadlineDays, setDeadlineDays] = useState<number>(7);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize when selected creator opens
  React.useEffect(() => {
    if (selectedCreatorForOffer) {
      if (selectedCreatorForOffer.packageTitle) {
        setPackageTitle(selectedCreatorForOffer.packageTitle);
      }
      if (selectedCreatorForOffer.priceEur) {
        setBasePrice(selectedCreatorForOffer.priceEur);
      }
      if (selectedCreatorForOffer.platform) {
        setPlatform(selectedCreatorForOffer.platform);
      }
    }
  }, [selectedCreatorForOffer]);

  const platformFee = Math.round(basePrice * 0.15 * 100) / 100;
  const totalInvoiceEur = Math.round((basePrice + platformFee) * 100) / 100;

  const handleSendOffer = () => {
    if (!brief.trim() || !basePrice) {
      message.error('Please enter budget and campaign brief.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + deadlineDays);
      const deadlineDateFormatted = targetDate.toISOString().split('T')[0];

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        brandId: currentUser?.id || 'user_brand_01',
        brandName: currentUser?.companyName || 'Aura Skincare Paris',
        brandLogo: currentUser?.avatar || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80',
        creatorId: selectedCreatorForOffer?.id || 'creator-01',
        creatorName: selectedCreatorForOffer?.name || 'Sophie Kim',
        creatorHandle: selectedCreatorForOffer?.handle || '@sophiekim',
        creatorAvatar: selectedCreatorForOffer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        packageTitle: packageTitle,
        collaborationType: collabType,
        platform: platform,
        basePriceEur: basePrice,
        platformFeeEur: platformFee,
        totalEur: totalInvoiceEur,
        status: 'offer_sent',
        brief: brief,
        requirements: ['Follow brand aesthetic', 'Submit draft before publishing', 'Provide analytics screenshot'],
        deadlineDate: deadlineDateFormatted,
        createdAt: new Date().toISOString().split('T')[0],
        escrowFunded: true,
        escrowReleased: false,
        deliverables: [],
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: currentUser?.id || 'user_brand_01',
            senderName: currentUser?.name || 'Elena',
            senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
            senderRole: 'brand',
            text: `Offer sent: ${packageTitle} for €${totalInvoiceEur} (Escrow Funded).`,
            timestamp: 'Just now',
          },
        ],
      };

      dispatch(createOffer(newOrder));
      setIsSubmitting(false);
      dispatch(closeOfferModal());
      message.success('Offer created and Escrow funded! You can track progress in your Brand Workspace.');
      router.push('/brand/orders');
    }, 600);
  };

  if (!selectedCreatorForOffer) return null;

  return (
    <Modal
      title={null}
      open={isOfferModalOpen}
      onCancel={() => dispatch(closeOfferModal())}
      footer={null}
      width={560}
      centered
    >
      <div className="pt-2 pb-1 space-y-5 font-sans">
        {/* Header */}
        <div className="pb-4 border-b border-[#E7E7E2]">
          <h3 className="text-xl font-black text-[#0A0A0A] tracking-tight">
            Send Offer to {selectedCreatorForOffer.name}
          </h3>
        </div>

        {/* 1. Collaboration Model Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
            Collaboration Type
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setCollabType('sponsored_post')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                collabType === 'sponsored_post'
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                  : 'bg-[#FAFAF8] text-[#555550] border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white'
              }`}
            >
              <div className="text-sm font-bold flex items-center justify-between">
                <span>Sponsored Post</span>
                {collabType === 'sponsored_post' && (
                  <span className="w-2 h-2 rounded-full bg-[#FF2D78]" />
                )}
              </div>
              <div className="text-xs mt-0.5 opacity-80 font-normal">
                Published to creator's feed
              </div>
            </button>

            <button
              type="button"
              onClick={() => setCollabType('content_creation')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                collabType === 'content_creation'
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                  : 'bg-[#FAFAF8] text-[#555550] border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white'
              }`}
            >
              <div className="text-sm font-bold flex items-center justify-between">
                <span>Content Creation (UGC)</span>
                {collabType === 'content_creation' && (
                  <span className="w-2 h-2 rounded-full bg-[#FF2D78]" />
                )}
              </div>
              <div className="text-xs mt-0.5 opacity-80 font-normal">
                Raw assets for brand ads
              </div>
            </button>
          </div>
        </div>

        {/* 2. Package / Deliverable Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
            Deliverable Name
          </label>
          <Input
            value={packageTitle}
            onChange={(e) => setPackageTitle(e.target.value)}
            className="rounded-xl h-11 text-sm font-medium"
            placeholder="e.g. 1x 60s High-Energy Reel with Link Sticker"
          />
        </div>

        {/* 3. Campaign Brief & Requirements */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
            Brief & Key Instructions
          </label>
          <Input.TextArea
            rows={3}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="rounded-xl text-sm font-medium"
            placeholder="Describe product talking points, preferred aesthetic, do's/don'ts, and call to action..."
          />
        </div>

        {/* 4. Delivery Turnaround */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] text-xs">
          <span className="font-bold text-[#73736A] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FF2D78]" />
            Target Turnaround
          </span>
          <div className="flex items-center gap-1.5">
            {[5, 7, 14].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setDeadlineDays(days)}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  deadlineDays === days
                    ? 'bg-[#0A0A0A] text-white shadow-2xs'
                    : 'bg-white text-[#73736A] border border-[#E7E7E2] hover:text-[#0A0A0A]'
                }`}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        {/* 5. Minimalist Clean Pricing & Escrow Summary */}
        <div className="p-4 bg-[#FAFAF8] border border-[#E7E7E2] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#0A0A0A]">Creator Compensation</span>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E7E7E2]">
              <span className="text-sm font-bold text-[#73736A]">€</span>
              <InputNumber
                min={50}
                max={50000}
                value={basePrice}
                onChange={(val) => setBasePrice(val || 100)}
                bordered={false}
                className="w-24 text-sm font-extrabold text-[#0A0A0A] p-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#73736A] font-medium">
            <span>Escrow Guarantee & Service (15%)</span>
            <span className="font-semibold text-[#0A0A0A]">+ €{platformFee.toFixed(2)}</span>
          </div>

          <div className="pt-2.5 border-t border-[#E7E7E2] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#73736A] font-bold uppercase tracking-wider">
                Total Escrow Locked
              </div>
              <div className="text-xs text-[#23744D] font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#23744D]" />
                <span>Held safely until your sign-off</span>
              </div>
            </div>
            <span className="text-2xl font-black text-[#0A0A0A] font-sans">
              €{totalInvoiceEur.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeOfferModal())}
            className="h-11 px-5 rounded-full text-sm font-bold text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSendOffer}
            className="h-11 px-6 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4 text-[#FF2D78]" />
            <span>{isSubmitting ? 'Securing Escrow...' : `Fund Escrow & Send Offer (€${totalInvoiceEur.toFixed(2)})`}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

