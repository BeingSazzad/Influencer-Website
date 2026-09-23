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
  Lock,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Input, Select, Button, message, Slider, InputNumber } from 'antd';

const PLATFORM_OPTIONS: { value: PlatformType; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'all', label: 'Cross-Platform Bundle' },
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
  const [isCustomDeadline, setIsCustomDeadline] = useState(false);
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
            setPlatform(foundPkg.platform);
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
    setPlatform(pkg.platform);
    setBasePriceEur(pkg.priceEur);
    setDeadlineDays(pkg.deliveryDays || 7);
    setIsCustomDeadline(false);
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

  const platformFeeEur = Math.round(basePriceEur * 0.15);
  const totalCostEur = basePriceEur + platformFeeEur;

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
        subtitle="Configure campaign scope, deliverables, and safely fund escrow."
        backHref="/brand/campaigns"
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Scope & Brief Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <div>
              <h2 className="text-base font-black text-[#0A0A0A] tracking-tight">Campaign Details</h2>
              <p className="text-xs text-[#73736A] mt-0.5">Customize your brief, deliverables, and collaboration terms</p>
            </div>

            {/* Select Creator */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Creator
              </label>
              <Select
                value={selectedCreatorId}
                onChange={handleSelectCreator}
                className="w-full h-11"
                showSearch
                optionFilterProp="label"
                options={creators.map((c) => ({
                  value: c.id,
                  label: `${c.name} (@${c.handle}) — from €${c.startingPriceEur}`,
                }))}
              />

              {/* Creator Snapshot Card */}
              {currentCreator && (
                <div className="p-3.5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={currentCreator.avatar}
                        alt={currentCreator.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
                      />
                      <VerifiedBadge className="absolute -bottom-0.5 -right-0.5 w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#0A0A0A] text-sm leading-tight">
                          {currentCreator.name}
                        </span>
                        <span className="text-xs text-[#73736A]">@{currentCreator.handle}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {currentCreator.categories?.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] font-bold px-2 py-0.5 bg-white border border-[#E7E7E2] rounded-md text-[#73736A]"
                          >
                            {cat}
                          </span>
                        ))}
                        <span className="text-[11px] font-bold text-[#0A0A0A] ml-1">
                          From €{currentCreator.startingPriceEur}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/creators/${currentCreator.id}`}
                    target="_blank"
                    className="text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1 transition-colors px-3 py-1.5 bg-white rounded-xl border border-[#E7E7E2]"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#73736A]" />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Package Presets */}
            {currentCreator?.packages && currentCreator.packages.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Package Preset
                  </label>
                  <span className="text-[11px] text-[#73736A] font-medium">1-Click Autofill</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-[#73736A]">
                              {pkg.platform === 'all' ? 'Bundle' : pkg.platform}
                            </span>
                            {pkg.popular && (
                              <span className="text-[9px] font-extrabold bg-[#FF2D78]/10 text-[#FF2D78] px-1.5 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#0A0A0A] mt-2 line-clamp-1 leading-snug">
                            {pkg.title}
                          </div>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-[#E7E7E2]/70 flex items-center justify-between">
                          <span className="text-xs font-black text-[#0A0A0A]">
                            €{pkg.priceEur.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#73736A] font-semibold">
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
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Platform
              </label>
              <Select
                value={platform}
                onChange={(val) => {
                  setPlatform(val);
                  setSelectedPackageId(null);
                }}
                className="w-full h-10"
                options={PLATFORM_OPTIONS}
              />
            </div>

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
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
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  Deliverables & Requirements
                </label>
                <span className="text-[11px] text-[#73736A]">One guideline per line</span>
              </div>
              <Input.TextArea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="rounded-xl text-sm leading-relaxed p-3 font-medium"
                placeholder="Submit video draft for review before publishing&#10;Tag official brand account&#10;Provide 24h performance screenshot"
                required
              />
            </div>

            {/* Delivery Turnaround */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  Delivery Turnaround
                </label>
                <span className="text-xs font-bold text-[#0A0A0A]">
                  Est. {formattedDeadline} ({deadlineDays} days)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[3, 5, 7, 10, 14].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      setDeadlineDays(days);
                      setIsCustomDeadline(false);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      !isCustomDeadline && deadlineDays === days
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                        : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2] hover:text-[#0A0A0A] hover:bg-white'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustomDeadline(true)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isCustomDeadline
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                      : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2] hover:text-[#0A0A0A] hover:bg-white'
                  }`}
                >
                  Custom
                </button>
              </div>
              {isCustomDeadline && (
                <div className="pt-1 flex items-center gap-2">
                  <InputNumber
                    min={1}
                    max={60}
                    value={deadlineDays}
                    onChange={(val) => setDeadlineDays(val || 7)}
                    className="w-24 rounded-lg text-xs font-bold"
                    size="small"
                  />
                  <span className="text-xs text-[#73736A]">days from offer acceptance</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Escrow Financials & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6 sticky top-6">
              <div>
                <h2 className="text-base font-black text-[#0A0A0A] tracking-tight">Escrow Summary</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Transparent deposit held safely until approval</p>
              </div>

              {/* Creator Rate Slider & Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Creator Rate
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
                  tooltip={{ formatter: (val) => `€${val?.toLocaleString()}` }}
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#73736A]">
                  <span>Min €100</span>
                  <span>Standard €850</span>
                  <span>Max €5,000+</span>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[#E7E7E2] text-xs">
                <div className="flex justify-between text-[#73736A]">
                  <span>Creator Payout:</span>
                  <span className="font-bold text-[#0A0A0A]">€{basePriceEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#73736A]">
                  <span>Escrow & Service Fee (15%):</span>
                  <span className="font-bold text-[#0A0A0A]">+€{platformFeeEur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-black text-[#0A0A0A] pt-3 border-t border-[#E7E7E2]">
                  <span>Total Escrow Deposit:</span>
                  <span className="text-2xl font-black text-[#0A0A0A]">
                    €{totalCostEur.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Escrow Protection Notice */}
              <div className="p-4 bg-[#F0FDF4] rounded-2xl border border-[#86EFAC]/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#166534]">
                  <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0" />
                  <span>100% Escrow Protected</span>
                </div>
                <p className="text-[11px] text-[#374151] leading-relaxed">
                  Funds are safely locked in escrow and released only after you review and approve the submitted deliverables.
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full h-12 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Lock className="w-4 h-4 text-[#FF2D78]" />
                  <span>Deposit €{totalCostEur.toLocaleString()} & Send Offer</span>
                </Button>
                <p className="text-[11px] text-center text-[#73736A]">
                  Free cancellation anytime before creator accepts
                </p>
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
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#73736A]">Loading campaign checkout...</div>}>
      <NewHireContent />
    </Suspense>
  );
}
