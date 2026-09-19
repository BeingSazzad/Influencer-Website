'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeOfferModal, createOffer } from '@/redux/slices/orderSlice';
import { Modal, Input, Button, InputNumber, Radio, DatePicker, message } from 'antd';
import { ShieldCheck, Sparkles, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { Order, PlatformType } from '@/types';
import { useRouter } from 'next/navigation';

export function OfferModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOfferModalOpen, selectedCreatorForOffer } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [collabType, setCollabType] = useState<'sponsored_post' | 'content_creation'>('sponsored_post');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [packageTitle, setPackageTitle] = useState(selectedCreatorForOffer?.packageTitle || 'Instagram Reel Package');
  const [basePrice, setBasePrice] = useState<number>(selectedCreatorForOffer?.priceEur || 1200);
  const [brief, setBrief] = useState('We would like an authentic 30–60s video featuring our new product launch with key value propositions and tracking link.');
  const [deadlineDate, setDeadlineDate] = useState('2026-04-05');
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
    if (!brief || !basePrice) {
      message.error('Please enter budget and campaign brief.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        brandId: currentUser?.id || 'user_brand_01',
        brandName: currentUser?.companyName || 'Aura Skincare Paris',
        brandLogo: currentUser?.avatar || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&q=80',
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
        deadlineDate: deadlineDate,
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
      title={
        <div className="flex items-center gap-2 pb-2 border-b border-[#E7E7E2]">
          <span className="font-extrabold text-[#151515] text-lg font-sans">
            Send Offer & Fund Escrow
          </span>
        </div>
      }
      open={isOfferModalOpen}
      onCancel={() => dispatch(closeOfferModal())}
      footer={null}
      width={600}
      centered
    >
      <div className="pt-3 space-y-5">
        {/* Selected Creator Header */}
        <div className="flex items-center gap-3 p-3.5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
          <img
            src={selectedCreatorForOffer.avatar}
            alt={selectedCreatorForOffer.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <div className="text-sm font-bold text-[#151515]">{selectedCreatorForOffer.name}</div>
            <div className="text-xs text-[#73736A]">@{selectedCreatorForOffer.handle}</div>
          </div>
        </div>

        {/* Collaboration Type */}
        <div>
          <label className="block text-xs font-bold text-[#151515] uppercase tracking-wider mb-2">
            Collaboration Model
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setCollabType('sponsored_post')}
              className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                collabType === 'sponsored_post'
                  ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                  : 'bg-white text-[#52524B] border-[#E7E7E2] hover:bg-[#F4F4F0]'
              }`}
            >
              <div className="font-bold">Sponsored Post</div>
              <div className="text-[11px] opacity-80">Published on creator feed</div>
            </button>

            <button
              type="button"
              onClick={() => setCollabType('content_creation')}
              className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                collabType === 'content_creation'
                  ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                  : 'bg-white text-[#52524B] border-[#E7E7E2] hover:bg-[#F4F4F0]'
              }`}
            >
              <div className="font-bold">Content Creation (UGC)</div>
              <div className="text-[11px] opacity-80">Raw assets for brand ads</div>
            </button>
          </div>
        </div>

        {/* Package / Scope Title */}
        <div>
          <label className="block text-xs font-bold text-[#151515] uppercase tracking-wider mb-1">
            Deliverable / Package Title
          </label>
          <Input
            size="large"
            value={packageTitle}
            onChange={(e) => setPackageTitle(e.target.value)}
            className="rounded-xl font-medium"
            placeholder="e.g. 1x 60s Instagram Reel with Link Sticker"
          />
        </div>

        {/* Campaign Brief */}
        <div>
          <label className="block text-xs font-bold text-[#151515] uppercase tracking-wider mb-1">
            Campaign Brief & Guidelines
          </label>
          <Input.TextArea
            rows={3}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="rounded-xl text-xs"
            placeholder="Describe your product, key talking points, required tags, and creative direction..."
          />
        </div>

        {/* Transparent Pricing & 15% Platform Fee Calculation */}
        <div className="p-4 bg-[#FAF6E8] border border-[#F3ECCF] rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8C6819]">
            <span>Creator Base Compensation:</span>
            <div className="flex items-center gap-1">
              <span>€</span>
              <InputNumber
                size="small"
                min={50}
                max={50000}
                value={basePrice}
                onChange={(val) => setBasePrice(val || 100)}
                className="w-24 text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[#8C6819]">
            <span>15% Brand Service & Escrow Fee:</span>
            <span>+ €{platformFee.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-[#F3ECCF] flex items-center justify-between text-sm font-extrabold text-[#151515]">
            <span>Total Escrow Amount:</span>
            <span className="text-base font-sans">€{totalInvoiceEur.toFixed(2)} EUR</span>
          </div>
        </div>

        {/* Escrow Guarantee Pill */}
        <div className="flex items-center gap-2 text-[11px] text-[#52524B] bg-[#EEF7F2] p-2.5 rounded-xl border border-[#D9EDE2]">
          <ShieldCheck className="w-4 h-4 text-[#23744D] flex-shrink-0" />
          <span>
            <strong>100% Escrow Protection:</strong> Funds are locked safely and only paid out when you review and approve the submitted content.
          </span>
        </div>

        {/* Submit Actions */}
        <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
          <Button onClick={() => dispatch(closeOfferModal())} className="font-semibold rounded-xl h-10">
            Cancel
          </Button>
          <Button
            type="primary"
            loading={isSubmitting}
            onClick={handleSendOffer}
            className="btn-primary h-11 px-6 font-bold"
          >
            Fund Escrow & Send Offer (€{totalInvoiceEur.toFixed(2)})
          </Button>
        </div>
      </div>
    </Modal>
  );
}
