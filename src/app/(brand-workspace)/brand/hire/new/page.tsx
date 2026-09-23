'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

function NewHireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { creators } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const creatorParam = searchParams.get('creator');
  const packageParam = searchParams.get('package');

  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(
    creatorParam && creators.some((c) => c.id === creatorParam) ? creatorParam : creators[0].id
  );
  const [collabType, setCollabType] = useState<'content_creation' | 'sponsored_post'>('sponsored_post');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [campaignTitle, setCampaignTitle] = useState('Product Launch Campaign');
  const [brief, setBrief] = useState(
    'Highlight key benefits with authentic product placement and a clear call-to-action link.'
  );
  const [requirements, setRequirements] = useState(
    'Submit video draft for review before publishing\nTag official brand account\nProvide 24h performance screenshot'
  );
  const [basePriceEur, setBasePriceEur] = useState<number>(850);
  const [deadlineDays, setDeadlineDays] = useState<number>(7);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCreator = creators.find((c) => c.id === selectedCreatorId) || creators[0];

  useEffect(() => {
    if (creatorParam) {
      const foundCreator = creators.find((c) => c.id === creatorParam);
      if (foundCreator) {
        setSelectedCreatorId(foundCreator.id);
        if (packageParam) {
          const foundPkg = foundCreator.packages.find((p) => p.id === packageParam);
          if (foundPkg) {
            setCampaignTitle(`${foundPkg.title} Collab`);
            setPlatform(foundPkg.platform);
            setBasePriceEur(foundPkg.priceEur);
            setDeadlineDays(foundPkg.deliveryDays || 7);
            if (foundPkg.platform === 'ugc') {
              setCollabType('content_creation');
            }
          }
        } else {
          setBasePriceEur(foundCreator.startingPriceEur);
        }
      }
    }
  }, [creatorParam, packageParam, creators]);

  const platformFeeEur = Math.round(basePriceEur * 0.15);
  const totalCostEur = basePriceEur + platformFeeEur;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + deadlineDays);

    const newOrder: Order = {
      id: `order-${Date.now().toString().slice(-4)}`,
      brandId: currentUser?.id || 'user_brand_01',
      brandName: currentUser?.companyName || 'Aura Skincare Paris',
      brandLogo: currentUser?.avatar || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100',
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
          senderName: currentUser?.name || 'Brand Manager',
          senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          senderRole: 'brand',
          text: `Hi ${currentCreator.name.split(' ')[0]}! We just funded this campaign in escrow. Looking forward to collaborating!`,
          timestamp: 'Just now',
        },
      ],
    };

    setTimeout(() => {
      dispatch(createOffer(newOrder));
      setIsSubmitting(false);
      message.success(`Offer created and €${totalCostEur.toLocaleString()} placed in escrow!`);
      router.push(`/brand/orders/${newOrder.id}`);
    }, 500);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Create Campaign Offer"
        subtitle="Define campaign scope, agree deliverables, and fund project escrow safely."
        backHref="/brand/dashboard"
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Scope & Brief Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <h2 className="text-base font-black text-[#0A0A0A] tracking-tight">1. Campaign Scope</h2>

            {/* Select Creator */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Target Creator
              </label>
              <select
                value={selectedCreatorId}
                onChange={(e) => {
                  setSelectedCreatorId(e.target.value);
                  const found = creators.find((c) => c.id === e.target.value);
                  if (found) setBasePriceEur(found.startingPriceEur);
                }}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
              >
                {creators.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.handle}) — from €{c.startingPriceEur}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Platform
              </label>
              <Select
                value={platform}
                onChange={(val) => setPlatform(val)}
                className="w-full h-10"
                options={[
                  { value: 'all', label: '🌟 All Platforms (360° Omni-Channel)' },
                  { value: 'multi', label: '⚡ Custom Multi-Platform Bundle' },
                  { value: 'instagram', label: 'Instagram (Reel / Story / Post)' },
                  { value: 'tiktok', label: 'TikTok (Dedicated / Sound)' },
                  { value: 'youtube', label: 'YouTube (Integration / Video)' },
                  { value: 'ugc', label: 'Direct UGC Raw Assets' },
                ]}
              />
            </div>

            {/* Campaign Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Campaign Title
              </label>
              <Input
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="rounded-xl h-10 text-sm font-semibold"
                placeholder="e.g. Summer Skincare Launch"
                required
              />
            </div>

            {/* Brief */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Creative Brief
              </label>
              <Input.TextArea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="rounded-xl text-sm leading-relaxed p-3"
                placeholder="Describe your hook, value props, and call-to-action..."
                required
              />
            </div>

            {/* Requirements */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Deliverable Guidelines (one per line)
              </label>
              <Input.TextArea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="rounded-xl text-sm p-3"
                required
              />
            </div>
          </div>

          {/* Right Column: Escrow Financials & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <h2 className="text-base font-black text-[#0A0A0A] tracking-tight">2. Escrow Deposit</h2>

              {/* Base Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  <span>Creator Rate</span>
                  <span className="text-lg font-black text-[#0A0A0A]">
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
              <div className="space-y-2.5 pt-3 border-t border-[#E7E7E2] text-xs">
                <div className="flex justify-between text-[#73736A]">
                  <span>Creator Payout:</span>
                  <span className="font-bold text-[#0A0A0A]">€{basePriceEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#73736A]">
                  <span>Platform & Escrow Fee (15%):</span>
                  <span className="font-bold text-[#0A0A0A]">+€{platformFeeEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#0A0A0A] pt-2 border-t border-[#E7E7E2]">
                  <span>Total Escrow Deposit:</span>
                  <span className="text-xl font-black">€{totalCostEur.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#EEF7F2] rounded-2xl border border-[#23744D]/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#23744D]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Escrow Guarantee Protected</span>
                </div>
                <p className="text-[11px] text-[#555550] leading-relaxed">
                  Funds remain safely locked in escrow until you inspect and approve submitted deliverables.
                </p>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF2D78]" />
                <span>Deposit €{totalCostEur.toLocaleString()} & Send Offer</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewHireCampaignPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#73736A]">Loading campaign checkout...</div>}>
      <NewHireContent />
    </Suspense>
  );
}
