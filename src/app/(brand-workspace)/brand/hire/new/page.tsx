'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { createOffer } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { PlatformType, Order } from '@/types';
import {
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Input, Select, Button, message, Slider } from 'antd';

export default function NewHireCampaignPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { creators } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(creators[0].id);
  const [collabType, setCollabType] = useState<'content_creation' | 'sponsored_post'>('sponsored_post');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [campaignTitle, setCampaignTitle] = useState('Autumn Skincare Launch & UGC Ad Set');
  const [brief, setBrief] = useState(
    'Create an authentic 30s video showcasing our hydra-nourishing serum before & after application, highlighting the clean natural ingredients with a clear call-to-action.'
  );
  const [requirements, setRequirements] = useState(
    'Include promo code GLOW15 in caption\nTag @nordicglowbeauty\nDeliver raw 9:16 4K video file without music\n1 revision round included'
  );
  const [basePriceEur, setBasePriceEur] = useState<number>(800);
  const [deadlineDays, setDeadlineDays] = useState<number>(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCreator = creators.find((c) => c.id === selectedCreatorId) || creators[0];

  const platformFeeEur = Math.round(basePriceEur * 0.15);
  const totalCostEur = basePriceEur + platformFeeEur;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + deadlineDays);

    const newOrder: Order = {
      id: `order-${Date.now().toString().slice(-4)}`,
      brandId: currentUser?.id || 'brand-01',
      brandName: currentUser?.companyName || 'Nordic Glow Beauty',
      brandLogo: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      creatorId: currentCreator.id,
      creatorName: currentCreator.name,
      creatorHandle: currentCreator.handle,
      creatorAvatar: currentCreator.avatar,
      packageTitle: campaignTitle,
      collaborationType: collabType,
      platform: platform,
      basePriceEur: basePriceEur,
      platformFeeEur: platformFeeEur,
      totalEur: totalCostEur,
      status: 'offer_sent',
      brief: brief,
      requirements: requirements.split('\n').filter((r) => r.trim().length > 0),
      deadlineDate: deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      escrowFunded: true,
      escrowReleased: false,
      deliverables: [],
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUser?.id || 'brand-01',
          senderName: currentUser?.name || 'Elena Rostova',
          senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          senderRole: 'brand',
          text: `Hi ${currentCreator.name.split(' ')[0]}! We just funded this campaign in escrow. Looking forward to collaborating on our upcoming launch!`,
          timestamp: 'Just now',
        },
      ],
    };

    setTimeout(() => {
      dispatch(createOffer(newOrder));
      setIsSubmitting(false);
      message.success(`Offer created and €${totalCostEur} placed in escrow!`);
      router.push(`/brand/orders/${newOrder.id}`);
    }, 600);
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Create New Campaign Offer"
        subtitle="Define campaign scope, agree terms, and fund project escrow safely in EUR."
        backHref="/brand/dashboard"
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Scope & Brief Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight">1. Campaign Details</h2>

            {/* Select Creator */}
            <div>
              <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                Target Content Creator
              </label>
              <select
                value={selectedCreatorId}
                onChange={(e) => {
                  setSelectedCreatorId(e.target.value);
                  const found = creators.find((c) => c.id === e.target.value);
                  if (found) setBasePriceEur(found.startingPriceEur);
                }}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
              >
                {creators.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.handle}) — from €{c.startingPriceEur}
                  </option>
                ))}
              </select>
            </div>

            {/* Collaboration Type */}
            <div>
              <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                Collaboration Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCollabType('sponsored_post')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    collabType === 'sponsored_post'
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                      : 'bg-[#FAFAF8] text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A]'
                  }`}
                >
                  Sponsored Posting
                </button>
                <button
                  type="button"
                  onClick={() => setCollabType('content_creation')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    collabType === 'content_creation'
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                      : 'bg-[#FAFAF8] text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A]'
                  }`}
                >
                  Content Creation (UGC)
                </button>
              </div>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="block text-sm font-bold text-[#0A0A0A] mb-2">
                Target Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
              >
                <option value="instagram">Instagram (Reel / Story / Post)</option>
                <option value="tiktok">TikTok (Dedicated / Sound)</option>
                <option value="youtube">YouTube (Integration / Video)</option>
                <option value="ugc">UGC Raw Ad Assets</option>
              </select>
            </div>

            {/* Campaign Title */}
            <div>
              <label className="block text-sm font-bold text-[#0A0A0A] mb-2">
                Campaign Title
              </label>
              <Input
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm py-2"
                required
              />
            </div>

            {/* Brief */}
            <div>
              <label className="block text-sm font-bold text-[#0A0A0A] mb-2">
                Creative Brief & Concept
              </label>
              <Input.TextArea
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-bold text-[#0A0A0A] mb-2">
                Specific Deliverable Rules (one per line)
              </label>
              <Input.TextArea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm"
                required
              />
            </div>
          </div>

          {/* Right Column: Escrow Financials & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight">2. Budget & Escrow Deposit</h2>

              {/* Base Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-[#73736A]">
                    Creator Rate (EUR):
                  </label>
                  <span className="text-lg font-bold text-[#0A0A0A]">
                    €{basePriceEur.toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={100}
                  max={5000}
                  step={50}
                  value={basePriceEur}
                  onChange={(v) => setBasePriceEur(v)}
                />
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-3 pt-3 border-t border-[#E7E7E2]">
                <div className="flex justify-between text-sm text-[#555550]">
                  <span>Creator Payout:</span>
                  <span className="font-semibold text-[#0A0A0A]">€{basePriceEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-[#555550]">
                  <span>Influverse Escrow Fee (15%):</span>
                  <span className="font-semibold text-[#FF2D78]">+€{platformFeeEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0A0A0A] pt-3 border-t border-[#E7E7E2]">
                  <span>Total Escrow Deposit:</span>
                  <span className="text-xl font-bold text-[#0A0A0A]">€{totalCostEur.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-[#EEF7F2] rounded-2xl border border-[#23744D]/20 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#23744D]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Escrow Guarantee Protected</span>
                </div>
                <p className="text-xs text-[#555550] leading-relaxed">
                  Your funds remain locked in escrow. The creator does not receive payment until you inspect and approve their submitted deliverables.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full font-sans font-semibold text-base bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : `Deposit €${totalCostEur.toLocaleString()} & Send Offer`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
