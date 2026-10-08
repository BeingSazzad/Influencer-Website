'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { createOffer } from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { PlatformType, Order, CreatorPackage } from '@/types';
import {
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Input, Select, Button, message, Slider, InputNumber } from 'antd';

const PLATFORM_OPTIONS: { value: PlatformType; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'ugc', label: 'UGC Video' },
];

function NewHireContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { creators } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const creatorParam = searchParams.get('creator') || searchParams.get('creatorId');
  const packageParam = searchParams.get('package') || searchParams.get('packageId');

  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(
    creatorParam && creators.some((c) => c.id === creatorParam) ? creatorParam : creators[0]?.id || ''
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [collabType, setCollabType] = useState<'content_creation' | 'sponsored_post'>('sponsored_post');
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram']);
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
            setSelectedPackageId(foundPkg.id);
            setCampaignTitle(`${foundPkg.title} Collab`);
            if (foundPkg.platforms && foundPkg.platforms.length > 0) {
              setPlatforms(foundPkg.platforms);
            } else if (foundPkg.platform === 'all' || foundPkg.platform === 'multi') {
              setPlatforms(['instagram', 'tiktok', 'youtube']);
            } else {
              setPlatforms([foundPkg.platform]);
            }
            setBasePriceEur(foundPkg.priceEur);
            setDeadlineDays(foundPkg.deliveryDays || 7);
            if (foundPkg.platform === 'ugc') {
              setCollabType('content_creation');
            }
            if (foundPkg.description) {
              setBrief(foundPkg.description);
            }
            if (foundPkg.inclusions && foundPkg.inclusions.length > 0) {
              setRequirements(foundPkg.inclusions.join('\n'));
            }
          }
        } else {
          setBasePriceEur(foundCreator.startingPriceEur);
        }
      }
    }
  }, [creatorParam, packageParam, creators]);

  const handleSelectCreator = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setSelectedPackageId(null);
    const found = creators.find((c) => c.id === creatorId);
    if (found) {
      setBasePriceEur(found.startingPriceEur);
    }
  };

  const handleSelectPackage = (pkg: CreatorPackage) => {
    setSelectedPackageId(pkg.id);
    setCampaignTitle(`${pkg.title} Collab`);
    if (pkg.platforms && pkg.platforms.length > 0) {
      setPlatforms(pkg.platforms);
    } else if (pkg.platform === 'all' || pkg.platform === 'multi') {
      setPlatforms(['instagram', 'tiktok', 'youtube']);
    } else {
      setPlatforms([pkg.platform]);
    }
    setBasePriceEur(pkg.priceEur);
    setDeadlineDays(pkg.deliveryDays || 7);
    if (pkg.platform === 'ugc') {
      setCollabType('content_creation');
    } else {
      setCollabType('sponsored_post');
    }
    if (pkg.description) {
      setBrief(pkg.description);
    }
    if (pkg.inclusions && pkg.inclusions.length > 0) {
      setRequirements(pkg.inclusions.join('\n'));
    }
    message.success(`Autofilled terms from "${pkg.title}"`);
  };

  const totalCostEur = basePriceEur;

  // Deadline calculation
  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + deadlineDays);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle.trim()) {
      message.error('Please enter a campaign name.');
      return;
    }
    if (!brief.trim()) {
      message.error('Please provide a campaign brief.');
      return;
    }

    setIsSubmitting(true);

    const primaryPlatform: PlatformType =
      platforms.length > 1 ? 'all' : platforms[0] || 'instagram';

    const newOrder: Order = {
      id: `order-${Date.now().toString().slice(-4)}`,
      brandId: currentUser?.id || 'brand-01',
      brandName: currentUser?.companyName || 'Aura Skincare Paris',
      brandLogo: currentUser?.avatar || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100',
      creatorId: currentCreator.id,
      creatorName: currentCreator.name,
      creatorHandle: currentCreator.handle,
      creatorAvatar: currentCreator.avatar,
      packageTitle: campaignTitle,
      collaborationType: collabType,
      platform: primaryPlatform,
      basePriceEur: basePriceEur,
      platformFeeEur: 0,
      totalEur: basePriceEur,
      status: 'offer_sent',
      brief: brief,
      requirements: requirements.split('\n').filter((r) => r.trim().length > 0),
      deadlineDate: formattedDeadline,
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
          text: `Offer sent for "${campaignTitle}" (€${basePriceEur.toLocaleString()}). Looking forward to collaborating!`,
          timestamp: 'Just now',
        },
      ],
    };

    setTimeout(() => {
      dispatch(createOffer(newOrder));
      setIsSubmitting(false);
      message.success(`Offer sent to ${currentCreator.name}!`);
      router.push('/brand/campaigns');
    }, 400);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="New Campaign"
        subtitle="Scope, deliverables, and escrow."
        backHref="/brand/campaigns"
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Scope & Brief Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Campaign Details</h2>

            {/* Select Creator */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Creator
              </label>
              <Select
                value={selectedCreatorId}
                onChange={handleSelectCreator}
                className="w-full h-11"
                showSearch
                placeholder="Search by creator name or @username..."
                optionFilterProp="label"
                filterOption={(input, option) => {
                  const q = input.trim().toLowerCase().replace(/^@+/, '');
                  if (!q) return true;
                  const c = creators.find((cr) => cr.id === option?.value);
                  if (!c) {
                    return (option?.label ?? '').toString().toLowerCase().includes(q);
                  }
                  return (
                    c.name.toLowerCase().includes(q) ||
                    c.handle.toLowerCase().replace(/^@+/, '').includes(q)
                  );
                }}
                optionRender={(option) => {
                  const c = creators.find((cr) => cr.id === option.data.value);
                  if (!c) return option.data.label;
                  return (
                    <div className="flex items-center gap-2.5 py-0.5">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                      />
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-[#0A0A0A] text-sm">{c.name}</span>
                        <span className="text-xs text-[#66665E]">@{c.handle.replace(/^@+/, '')}</span>
                      </div>
                    </div>
                  );
                }}
                options={creators.map((c) => ({
                  value: c.id,
                  label: `${c.name} (@${c.handle.replace(/^@+/, '')})`,
                }))}
              />

              {/* Creator Snapshot Card */}
              {currentCreator && (
                <div className="p-3 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={currentCreator.avatar}
                        alt={currentCreator.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E7E7E2]"
                      />
                      <VerifiedBadge className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#0A0A0A] text-sm leading-tight">
                          {currentCreator.name}
                        </span>
                        <span className="text-sm text-[#66665E]">
                          @{currentCreator.handle.replace(/^@+/, '')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Package Presets */}
            {currentCreator?.packages && currentCreator.packages.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#66665E]">
                  Package Preset
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {currentCreator.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handleSelectPackage(pkg)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0A0A0A] bg-[#FAFAF8] ring-1.5 ring-[#0A0A0A] shadow-xs'
                            : 'border-[#E7E7E2] bg-white hover:border-[#D1D1CB] hover:bg-[#FAFAF8]/50'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-[#66665E]">
                            {pkg.platform === 'all' ? 'Bundle' : pkg.platform}
                          </span>
                          <div className="text-sm font-bold text-[#0A0A0A] mt-2 line-clamp-1 leading-snug">
                            {pkg.title}
                          </div>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-[#E7E7E2]/70 flex items-center justify-between">
                          <span className="text-xs font-black text-[#0A0A0A]">
                            €{pkg.priceEur.toLocaleString()}
                          </span>
                          <span className="text-sm text-[#66665E] font-semibold">
                            {pkg.deliveryDays}d
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Platform Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                  Platform(s)
                </label>
                <span className="text-[11px] text-[#66665E] font-medium">Select one or more</span>
              </div>
              <Select
                mode="multiple"
                value={platforms}
                onChange={(vals: PlatformType[]) => {
                  setPlatforms(vals.length > 0 ? vals : ['instagram']);
                  setSelectedPackageId(null);
                }}
                className="w-full min-h-10"
                placeholder="Select platform(s)..."
                options={PLATFORM_OPTIONS}
              />
            </div>

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Campaign Name
              </label>
              <Input
                value={campaignTitle}
                onChange={(e) => {
                  setCampaignTitle(e.target.value);
                  setSelectedPackageId(null);
                }}
                className="rounded-xl h-10 text-sm font-semibold"
                placeholder="e.g. Summer Skincare Product Launch"
                required
              />
            </div>

            {/* Campaign Brief */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Campaign Brief
              </label>
              <Input.TextArea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="rounded-xl text-sm leading-relaxed p-3"
                placeholder="Outline key campaign objectives, talking points, hook concepts, and call-to-action..."
                required
              />
            </div>

            {/* Deliverables & Requirements */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Deliverables & Requirements
              </label>
              <Input.TextArea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="rounded-xl text-sm leading-relaxed p-3 font-medium"
                placeholder="Submit video draft for review before publishing&#10;Tag official brand account&#10;Provide 24h performance screenshot"
                required
              />
            </div>

          </div>

          {/* Right Column: Offer Financials & Direct Send */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6 sticky top-6">
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Offer Summary</h2>

              {/* Creator Rate Slider & Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                    Offer Budget
                  </label>
                  <div className="w-32">
                    <InputNumber
                      min={100}
                      max={10000}
                      step={50}
                      value={basePriceEur}
                      onChange={(val) => setBasePriceEur(val || 100)}
                      prefix="€"
                      className="w-full text-sm font-bold rounded-xl"
                    />
                  </div>
                </div>
                <Slider
                  min={100}
                  max={5000}
                  step={50}
                  value={basePriceEur}
                  onChange={(v) => setBasePriceEur(v)}
                  tooltip={{ open: false }}
                />
                <div className="flex justify-between text-sm font-semibold text-[#66665E]">
                  <span>€100</span>
                  <span>€5,000+</span>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="pt-4 border-t border-[#E7E7E2]">
                <div className="flex justify-between items-baseline text-sm font-black text-[#0A0A0A]">
                  <span>Total Offer:</span>
                  <span className="text-2xl font-black text-[#0A0A0A]">
                    €{basePriceEur.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Escrow Protection Notice */}
              <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#E7E7E2] flex items-center gap-2 text-sm font-bold text-[#0A0A0A]">
                <ShieldCheck className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                <span>Escrow protected · Released after you approve</span>
              </div>

              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full h-12 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Offer (€{basePriceEur.toLocaleString()})</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewHireCampaignPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#66665E]">Loading campaign checkout...</div>}>
      <NewHireContent />
    </Suspense>
  );
}
