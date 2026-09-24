'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeOfferModal, createOffer } from '@/redux/slices/orderSlice';
import { Modal, Input, InputNumber, message, Button } from 'antd';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { Order, PlatformType } from '@/types';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export function OfferModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOfferModalOpen, selectedCreatorForOffer } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [campaignTitle, setCampaignTitle] = useState('New Product Launch Campaign');
  const [packageTitle, setPackageTitle] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [basePrice, setBasePrice] = useState<number>(950);
  const [brief, setBrief] = useState('');
  const [deadlineDays, setDeadlineDays] = useState<number>(7);
  const [isCustomDeadline, setIsCustomDeadline] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize when selected creator opens
  useEffect(() => {
    if (selectedCreatorForOffer) {
      setPackageTitle(selectedCreatorForOffer.packageTitle || 'Custom Collaboration Brief');
      setBasePrice(selectedCreatorForOffer.priceEur || 850);
      setPlatform(selectedCreatorForOffer.platform || 'instagram');
      setCampaignTitle(`${selectedCreatorForOffer.packageTitle || 'Custom Campaign'} Collab`);
      setBrief('Highlight product features with authentic voiceover and a clear call-to-action link.');
    }
  }, [selectedCreatorForOffer]);

  if (!selectedCreatorForOffer) return null;

  const platformFee = Math.round(basePrice * 0.15 * 100) / 100;
  const totalInvoiceEur = Math.round((basePrice + platformFee) * 100) / 100;

  const handleSendOffer = () => {
    if (!campaignTitle.trim() || !brief.trim() || !basePrice) {
      message.error('Please complete campaign title and brief.');
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
        creatorId: selectedCreatorForOffer.id,
        creatorName: selectedCreatorForOffer.name,
        creatorHandle: selectedCreatorForOffer.handle,
        creatorAvatar: selectedCreatorForOffer.avatar,
        packageTitle: packageTitle,
        collaborationType: platform === 'ugc' ? 'content_creation' : 'sponsored_post',
        platform: platform,
        basePriceEur: basePrice,
        platformFeeEur: platformFee,
        totalEur: totalInvoiceEur,
        status: 'offer_sent',
        brief: brief.trim(),
        requirements: ['Follow brand aesthetic guidelines', 'Submit draft before publishing', 'Provide analytics screenshot'],
        deadlineDate: deadlineDateFormatted,
        createdAt: new Date().toISOString().split('T')[0],
        escrowFunded: true,
        escrowReleased: false,
        deliverables: [],
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: currentUser?.id || 'user_brand_01',
            senderName: currentUser?.name || 'Brand Manager',
            senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
            senderRole: 'brand',
            text: `Offer submitted for ${packageTitle} (€${totalInvoiceEur} Escrow Funded). Looking forward to collaborating!`,
            timestamp: 'Just now',
          },
        ],
      };

      dispatch(createOffer(newOrder));
      setIsSubmitting(false);
      dispatch(closeOfferModal());
      message.success('Campaign offer submitted and Escrow funded!');
      router.push('/brand/orders');
    }, 500);
  };

  return (
    <Modal
      open={isOfferModalOpen}
      onCancel={() => dispatch(closeOfferModal())}
      footer={null}
      width={520}
      centered
      destroyOnClose
      className="rounded-3xl"
    >
      <div className="pt-2 pb-1 space-y-5 font-sans">
        {/* Creator & Package Summary Header */}
        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedCreatorForOffer.avatar}
                alt={selectedCreatorForOffer.name}
                className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
              />
              <VerifiedBadge className="absolute -bottom-0.5 -right-0.5 w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0A0A0A] text-sm leading-tight">
                {selectedCreatorForOffer.name}
              </h3>
              <p className="text-sm text-[#73736A] font-medium">
                {selectedCreatorForOffer.handle}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Package Rate</div>
            <div className="text-2xl font-extrabold text-[#0A0A0A]">€{basePrice.toLocaleString()}</div>
          </div>
        </div>

        {/* Selected Package Badge */}
        <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white border border-[#E7E7E2]">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-bold text-[#0A0A0A] truncate">{packageTitle}</span>
          </div>
          <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#73736A] shrink-0">
            {platform === 'all' ? 'Cross-Platform' : platform === 'multi' ? 'Multi-Platform' : platform === 'ugc' ? 'UGC Video' : platform}
          </span>
        </div>

        {/* Campaign Info */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Campaign Name
            </label>
            <Input
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="rounded-xl h-10 text-sm font-semibold"
              placeholder="e.g. Summer Skincare Drop"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Campaign Brief
            </label>
            <Input.TextArea
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="rounded-xl text-sm leading-relaxed p-3"
              placeholder="Outline your talking points, aesthetic tone, and required call-to-action..."
              required
            />
          </div>

          {/* Turnaround Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Delivery Turnaround</span>
              <span className="text-[#0A0A0A] font-extrabold lowercase">{deadlineDays} days</span>
            </div>
            <div className="flex items-center gap-2">
              {[5, 7, 14].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setDeadlineDays(days);
                    setIsCustomDeadline(false);
                  }}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    !isCustomDeadline && deadlineDays === days
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-2xs'
                      : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2] hover:text-[#0A0A0A]'
                  }`}
                >
                  {days} Days
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomDeadline(true)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                  isCustomDeadline
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-2xs'
                    : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2] hover:text-[#0A0A0A]'
                }`}
              >
                Custom
              </button>
            </div>

            {isCustomDeadline && (
              <div className="pt-2 flex items-center gap-2">
                <InputNumber
                  min={1}
                  max={60}
                  value={deadlineDays}
                  onChange={(val) => setDeadlineDays(val || 7)}
                  className="w-24 rounded-lg text-sm font-bold"
                  size="small"
                />
                <span className="text-sm text-[#73736A]">days from offer acceptance</span>
              </div>
            )}
          </div>
        </div>

        {/* Transparent Escrow Breakdown */}
        <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#73736A]">
            <span>Creator Fee:</span>
            <span className="font-bold text-[#0A0A0A]">€{basePrice.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-[#73736A]">
            <span>Escrow & Buyer Protection (15%):</span>
            <span className="font-bold text-[#0A0A0A]">€{platformFee.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-[#E7E7E2] flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-[#0A0A0A]">Total Escrow Funded</div>
              <div className="text-xs text-[#23744D] font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Released only upon deliverable approval</span>
              </div>
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">
              €{totalInvoiceEur.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <Button
            onClick={() => dispatch(closeOfferModal())}
            className="rounded-full h-11 px-5 font-bold text-xs"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={isSubmitting}
            onClick={handleSendOffer}
            className="h-11 px-6 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-[#FF2D78]" />
            <span>Fund Escrow & Send Offer</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
