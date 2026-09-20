'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { addCreatorPackage, updateCreatorPackage, deleteCreatorPackage } from '@/redux/slices/creatorSlice';
import { CreatorPackage, PlatformType } from '@/types';
import {
  PlusCircle,
  Package,
  Instagram,
  Youtube,
  Film,
  Sparkles,
  Check,
  Clock,
  RotateCcw,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Zap,
  Tag,
  Percent,
} from 'lucide-react';
import { Button, Modal, Input, InputNumber, Select, message, Popconfirm } from 'antd';

const PACKAGE_TEMPLATES = [
  {
    label: 'Instagram 60s Reel + Story Bundle',
    platform: 'instagram' as PlatformType,
    title: '60s Dedicated Reel + Story Bundle',
    description: 'High-energy 60s Instagram Reel with product integration, voiceover, and 3x follow-up Story link stickers.',
    priceEur: 1200,
    deliveryDays: 5,
    revisions: 2,
    usageRights: '30-Day Organic Rights',
    inclusions: ['1x 60s Dedicated Reel', '3x Story Slides with Link Sticker', 'Brand Mention & Tag', '24h Analytics Screenshot'],
  },
  {
    label: 'TikTok High-Retention Sound Video',
    platform: 'tiktok' as PlatformType,
    title: 'TikTok Viral Sound & Hook Video',
    description: 'Engaging 30–60s vertical video optimized for TikTok algorithm with trending sound, product demo, and hook testing.',
    priceEur: 950,
    deliveryDays: 4,
    revisions: 2,
    usageRights: 'Organic + Spark Ad Authorization',
    inclusions: ['1x 30-60s TikTok Video', 'Hook Testing Variations', 'Pinned Comment Link', 'Commercial Audio Licensing'],
  },
  {
    label: '3x UGC Raw Ad Creative Hooks',
    platform: 'ugc' as PlatformType,
    title: '3x UGC Video Ad Hooks (Raw Content)',
    description: 'Direct-response UGC video ads designed for paid social acquisition (Meta/TikTok Ads) with 3 different scroll-stopping hooks.',
    priceEur: 850,
    deliveryDays: 3,
    revisions: 2,
    usageRights: '90-Day Full Commercial Ad Rights',
    inclusions: ['3x Alternate Video Hooks', 'High-Res 9:16 Video (4K)', 'Raw Unedited B-Roll Clips', 'Script & Talking Points Included'],
  },
  {
    label: 'YouTube 60s Mid-Roll Integration',
    platform: 'youtube' as PlatformType,
    title: '60–90s Dedicated YouTube Mid-Roll',
    description: 'Seamless 60–90 second mid-roll segment inside a high-retention longform video with top pinned description link.',
    priceEur: 1800,
    deliveryDays: 7,
    revisions: 2,
    usageRights: 'Permanent Video Placement',
    inclusions: ['60-90s Mid-Roll Segment', 'Pinned Top Comment & Link', 'End-Screen Card Integration', 'Permanent Archive'],
  },
];

export default function CreatorPackagesPage() {
  const dispatch = useAppDispatch();
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators[0]; // Sophie Kim

  const packages = currentCreator?.packages || [];

  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<'all' | PlatformType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // Form states
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceEur, setPriceEur] = useState<number>(850);
  const [deliveryDays, setDeliveryDays] = useState<number>(4);
  const [revisions, setRevisions] = useState<number>(2);
  const [usageRights, setUsageRights] = useState('30-Day Organic Rights');
  const [inclusionsText, setInclusionsText] = useState('1x High-Res Video\nBrand Tag & Link\nCommercial Music Sync');
  const [isPopular, setIsPopular] = useState(false);

  const filteredPackages = packages.filter((pkg) => {
    if (selectedPlatformFilter === 'all') return true;
    return pkg.platform === selectedPlatformFilter;
  });

  const avgPrice = packages.length > 0 ? Math.round(packages.reduce((acc, p) => acc + p.priceEur, 0) / packages.length) : 0;
  const minPrice = packages.length > 0 ? Math.min(...packages.map((p) => p.priceEur)) : 0;

  const handleOpenAddModal = () => {
    setEditingPkgId(null);
    setPlatform('instagram');
    setTitle('');
    setDescription('');
    setPriceEur(850);
    setDeliveryDays(4);
    setRevisions(2);
    setUsageRights('30-Day Organic Rights');
    setInclusionsText('1x High-Res Video\nBrand Tag & Link\n24h Performance Report');
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: CreatorPackage) => {
    setEditingPkgId(pkg.id);
    setPlatform(pkg.platform);
    setTitle(pkg.title);
    setDescription(pkg.description);
    setPriceEur(pkg.priceEur);
    setDeliveryDays(pkg.deliveryDays);
    setRevisions(pkg.revisions);
    setUsageRights(pkg.usageRights || '30-Day Organic Rights');
    setInclusionsText(pkg.inclusions ? pkg.inclusions.join('\n') : '');
    setIsPopular(!!pkg.popular);
    setIsModalOpen(true);
  };

  const handleApplyTemplate = (tmpl: typeof PACKAGE_TEMPLATES[0]) => {
    setPlatform(tmpl.platform);
    setTitle(tmpl.title);
    setDescription(tmpl.description);
    setPriceEur(tmpl.priceEur);
    setDeliveryDays(tmpl.deliveryDays);
    setRevisions(tmpl.revisions);
    setUsageRights(tmpl.usageRights);
    setInclusionsText(tmpl.inclusions.join('\n'));
    message.info(`Applied template: ${tmpl.label}`);
  };

  const handleSavePackage = () => {
    if (!title.trim() || !description.trim()) {
      message.error('Please enter a package title and description.');
      return;
    }

    if (!priceEur || priceEur <= 0) {
      message.error('Please enter a valid price in EUR.');
      return;
    }

    const inclusionsArray = inclusionsText
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    if (editingPkgId) {
      const updatedPkg: CreatorPackage = {
        id: editingPkgId,
        platform,
        title: title.trim(),
        type: platform === 'ugc' ? 'ugc_video' : platform === 'youtube' ? 'video' : 'reel',
        description: description.trim(),
        priceEur,
        deliveryDays,
        revisions,
        usageRights,
        popular: isPopular,
        inclusions: inclusionsArray,
      };

      dispatch(updateCreatorPackage({ creatorId: currentCreator.id, pkg: updatedPkg }));
      message.success('Package updated on your public rate card!');
    } else {
      const newPkg: CreatorPackage = {
        id: `pkg-${Date.now()}`,
        platform,
        title: title.trim(),
        type: platform === 'ugc' ? 'ugc_video' : platform === 'youtube' ? 'video' : 'reel',
        description: description.trim(),
        priceEur,
        deliveryDays,
        revisions,
        usageRights,
        popular: isPopular,
        inclusions: inclusionsArray,
      };

      dispatch(addCreatorPackage({ creatorId: currentCreator.id, pkg: newPkg }));
      message.success('New package published to your public rate card!');
    }

    setIsModalOpen(false);
  };

  const handleDeletePackage = (pkgId: string) => {
    dispatch(deleteCreatorPackage({ creatorId: currentCreator.id, packageId: pkgId }));
    message.success('Package removed from your rate card');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Package & Rate Card Manager"
        subtitle="Manage preset services, EUR pricing, and turnarounds displayed to hiring brands."
        action={
          <div className="flex items-center gap-3">
            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button
                type="default"
                className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
              >
                <span>View Live Rate Card</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              type="primary"
              onClick={handleOpenAddModal}
              className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Package</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Metric Insights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Published Packages
              </span>
              <Package className="w-4 h-4 text-[#FF2D78]" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">{packages.length} Active</div>
            <div className="text-xs text-[#73736A]">Visible to all booking brands</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Average Rate
              </span>
              <span className="text-xs font-bold text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-full">
                Starting at €{minPrice}
              </span>
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">€{avgPrice} EUR</div>
            <div className="text-xs text-[#73736A]">Average package compensation</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                Creator Earnings
              </span>
              <ShieldCheck className="w-4 h-4 text-[#23744D]" />
            </div>
            <div className="text-2xl font-black text-[#23744D]">100% Payout</div>
            <div className="text-xs text-[#73736A]">0% commission deducted from you</div>
          </div>
        </div>

        {/* Packages Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">
                Active Public Rate Card ({filteredPackages.length})
              </h2>
              <p className="text-xs text-[#73736A] mt-0.5">
                Brands can instantly book these preset packages directly with 100% Escrow funding.
              </p>
            </div>

            {/* Platform Filter Tabs - Strict 1 Line */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] whitespace-nowrap overflow-x-auto shrink-0 max-w-full">
              {(['all', 'instagram', 'tiktok', 'youtube', 'ugc'] as const).map((pType) => {
                const isActive = selectedPlatformFilter === pType;
                const count =
                  pType === 'all'
                    ? packages.length
                    : packages.filter((p) => p.platform === pType).length;

                return (
                  <button
                    key={pType}
                    onClick={() => setSelectedPlatformFilter(pType)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer capitalize flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? 'bg-[#0A0A0A] text-white shadow-2xs'
                        : 'text-[#73736A] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>{pType === 'ugc' ? 'UGC' : pType === 'all' ? 'All' : pType}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EAEAE3] text-[#0A0A0A]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Package Cards Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative ${
                    pkg.popular
                      ? 'border-[#FF2D78]/40 bg-[#FAFAF8] ring-1 ring-[#FF2D78]/20'
                      : 'border-[#E7E7E2] bg-white hover:border-[#0A0A0A]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-6 bg-[#FF2D78] text-white text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] text-[#73736A] border border-[#E7E7E2] flex items-center gap-1.5 capitalize">
                        {pkg.platform === 'instagram' && <Instagram className="w-3 h-3 text-[#E1306C]" />}
                        {pkg.platform === 'tiktok' && <Film className="w-3 h-3 text-[#0A0A0A]" />}
                        {pkg.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                        {pkg.platform === 'ugc' && <Sparkles className="w-3 h-3 text-purple-500" />}
                        <span>{pkg.platform}</span>
                      </span>

                      <span className="text-2xl font-black text-[#0A0A0A]">
                        €{pkg.priceEur.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-[#0A0A0A] leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-[#73736A] mt-1.5 line-clamp-3 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Inclusions List */}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div className="pt-3 border-t border-[#E7E7E2] space-y-1.5 text-xs">
                        {pkg.inclusions.slice(0, 4).map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-[#44443E]">
                            <Check className="w-3.5 h-3.5 text-[#23744D] shrink-0" />
                            <span className="truncate">{inc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7E7E2] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#73736A] font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#73736A]" />
                        {pkg.deliveryDays}d delivery
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCcw className="w-3.5 h-3.5 text-[#73736A]" />
                        {pkg.revisions} revisions
                      </span>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(pkg)}
                        className="flex-1 h-9 rounded-full bg-[#FAFAF8] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] border border-[#E7E7E2] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Package</span>
                      </button>

                      <Popconfirm
                        title="Delete package?"
                        description="Are you sure you want to remove this package from your public rate card?"
                        onConfirm={() => handleDeletePackage(pkg.id)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true, className: 'rounded-full text-xs font-bold' }}
                        cancelButtonProps={{ className: 'rounded-full text-xs font-bold' }}
                      >
                        <button
                          type="button"
                          className="w-9 h-9 rounded-full bg-[#FAFAF8] hover:bg-rose-50 text-[#73736A] hover:text-rose-600 border border-[#E7E7E2] flex items-center justify-center transition-all cursor-pointer shrink-0"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              color="amber"
              icon={<Package className="w-8 h-8" />}
              badge="No Deliverables"
              title={`No Packages for ${platform.toUpperCase()}`}
              description="Define your deliverables, turnarounds, revision counts, and EUR pricing for this social channel."
              primaryAction={{
                label: `Add ${platform.toUpperCase()} Package`,
                onClick: handleOpenAddModal,
                icon: <PlusCircle className="w-4 h-4" />,
              }}
              variant="dashed"
            />
          )}
        </div>
      </div>

      {/* Add / Edit Package Modal */}
      <Modal
        title={
          <div className="pb-3 border-b border-[#E7E7E2]">
            <span className="text-lg font-black text-[#0A0A0A]">
              {editingPkgId ? 'Edit Package & Pricing' : 'Create New Deliverable Package'}
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={580}
        centered
      >
        <div className="space-y-4 pt-3 font-sans">
          {/* Quick Preset Templates Bar */}
          {!editingPkgId && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#FF2D78]" />
                <span>Quick Deliverable Templates</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PACKAGE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="p-2.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-white text-left transition-all cursor-pointer"
                  >
                    <div className="text-xs font-bold text-[#0A0A0A] truncate">{tmpl.label}</div>
                    <div className="text-xs text-[#73736A] mt-0.5">€{tmpl.priceEur} • {tmpl.deliveryDays}d turnaround</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Platform & Deliverable Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="ugc">UGC Creative</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Usage Rights
              </label>
              <select
                value={usageRights}
                onChange={(e) => setUsageRights(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
              >
                <option value="30-Day Organic Rights">30-Day Organic Rights</option>
                <option value="Organic + Spark Ad Authorization">Organic + Spark Ad Auth</option>
                <option value="90-Day Full Commercial Ad Rights">90-Day Full Commercial</option>
                <option value="Permanent Placement">Permanent Placement</option>
              </select>
            </div>
          </div>

          {/* Package Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Package Title
            </label>
            <Input
              placeholder="e.g. 60s Dedicated Reel + Story Bundle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl h-10 text-sm font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Description
            </label>
            <Input.TextArea
              rows={2}
              placeholder="Summary of deliverables, creative angles, and content specs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl text-sm font-medium"
            />
          </div>

          {/* Pricing & Turnaround Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Your Rate (€ EUR)
              </label>
              <InputNumber
                min={50}
                max={50000}
                value={priceEur}
                onChange={(val) => setPriceEur(val || 100)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Turnaround (Days)
              </label>
              <InputNumber
                min={1}
                max={60}
                value={deliveryDays}
                onChange={(val) => setDeliveryDays(val || 3)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Revisions
              </label>
              <InputNumber
                min={0}
                max={10}
                value={revisions}
                onChange={(val) => setRevisions(val || 1)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>
          </div>

          {/* Transparent Escrow Pricing Box */}
          <div className="p-3.5 bg-[#FAFAF8] border border-[#E7E7E2] rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#73736A]">
              <span>You Receive (100% Payout):</span>
              <strong className="text-[#23744D] text-sm">€{priceEur.toFixed(2)} EUR</strong>
            </div>
            <div className="flex items-center justify-between text-[#73736A]">
              <span>Client Pays (includes 15% Platform Escrow Fee):</span>
              <strong className="text-[#0A0A0A] text-sm">€{(priceEur * 1.15).toFixed(2)} EUR</strong>
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Included Deliverables (one line each)
            </label>
            <Input.TextArea
              rows={3}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              className="rounded-xl text-sm font-medium"
              placeholder="e.g.&#10;1x 60s Reel&#10;3x Story Links&#10;Brand Tag"
            />
          </div>

          {/* Popular Tag Toggle */}
          <label className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF2D78] focus:ring-[#FF2D78]"
            />
            <span>Mark as &quot;Most Popular&quot; tier on public rate card</span>
          </label>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="h-10 px-5 rounded-full text-xs font-bold text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSavePackage}
              className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              {editingPkgId ? 'Save Package Changes' : 'Publish to Rate Card'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

