'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { addCreatorPackage, updateCreatorPackage, deleteCreatorPackage } from '@/redux/slices/creatorSlice';
import { CreatorPackage, PlatformType } from '@/types';
import {
  Plus,
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
} from 'lucide-react';
import { Button, Modal, Input, InputNumber, Select, message, Popconfirm } from 'antd';

const PACKAGE_TEMPLATES = [
  {
    label: '⚡ 60s Reel Bundle',
    platform: 'instagram' as PlatformType,
    title: '60s Dedicated Reel + Story Slides',
    description: 'High-retention 60s Instagram Reel with authentic product integration, voiceover, and 3x follow-up Story link stickers.',
    priceEur: 1200,
    deliveryDays: 5,
    revisions: 2,
    usageRights: '30-Day Organic Rights',
    inclusions: ['1x 60s Dedicated Reel (4K)', '3x Story Slides with Link Sticker', 'Brand Mention & Collab Tag', '24h Performance Screenshot'],
  },
  {
    label: '🔥 TikTok Hook Ad',
    platform: 'tiktok' as PlatformType,
    title: 'TikTok Viral Sound & Hook Video',
    description: 'Engaging 30–60s vertical video optimized for TikTok algorithm with trending audio, direct hook, and clear call-to-action.',
    priceEur: 950,
    deliveryDays: 4,
    revisions: 2,
    usageRights: 'Organic + Spark Ad Authorization',
    inclusions: ['1x 30-60s TikTok Video', 'Hook Variations Testing', 'Pinned Comment Link', 'Commercial Audio Sync'],
  },
  {
    label: '📦 3x UGC Raw Creatives',
    platform: 'ugc' as PlatformType,
    title: '3x UGC Video Ad Hooks (Paid Media)',
    description: 'Direct-response UGC video creatives designed specifically for Meta and TikTok paid acquisition campaigns.',
    priceEur: 850,
    deliveryDays: 3,
    revisions: 2,
    usageRights: '90-Day Full Commercial Ad Rights',
    inclusions: ['3x Scroll-Stopping Hook Variations', 'High-Res 9:16 Video (4K)', 'Raw Unedited B-Roll Clips', 'Script & Talking Points Included'],
  },
  {
    label: '🎬 YouTube Mid-Roll',
    platform: 'youtube' as PlatformType,
    title: '60–90s Dedicated YouTube Mid-Roll',
    description: 'Seamless 60–90 second mid-roll segment inside a high-retention longform video with top pinned description link.',
    priceEur: 1800,
    deliveryDays: 7,
    revisions: 2,
    usageRights: 'Permanent Placement',
    inclusions: ['60-90s Mid-Roll Segment', 'Pinned Top Comment & Link', 'End-Screen Card Integration', 'Permanent Video Archive'],
  },
];

export default function CreatorPackagesPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators.find((c) => c.id === currentUser?.id) || creators[0];

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
  const [inclusionsText, setInclusionsText] = useState('1x High-Res Video (4K)\nBrand Mention & Link\nCommercial Music Sync');
  const [isPopular, setIsPopular] = useState(false);

  const filteredPackages = packages.filter((pkg) => {
    if (selectedPlatformFilter === 'all') return true;
    return pkg.platform === selectedPlatformFilter;
  });

  // KPI Metrics
  const minPrice = packages.length > 0 ? Math.min(...packages.map((p) => p.priceEur)) : 0;
  const avgDelivery = packages.length > 0
    ? Math.round(packages.reduce((acc, p) => acc + p.deliveryDays, 0) / packages.length)
    : 0;

  const handleOpenAddModal = () => {
    setEditingPkgId(null);
    applyTemplate(PACKAGE_TEMPLATES[0]);
    setIsModalOpen(true);
  };

  const applyTemplate = (template: typeof PACKAGE_TEMPLATES[0]) => {
    setPlatform(template.platform);
    setTitle(template.title);
    setDescription(template.description);
    setPriceEur(template.priceEur);
    setDeliveryDays(template.deliveryDays);
    setRevisions(template.revisions);
    setUsageRights(template.usageRights);
    setInclusionsText(template.inclusions.join('\n'));
    setIsPopular(false);
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

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
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
    message.success('Package removed from your rate card.');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Service Packages & Rates"
        subtitle="Manage fixed-price collaboration tiers displayed on your public rate card."
        action={
          <div className="flex items-center gap-2.5">
            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button
                type="default"
                className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
              >
                <span>Preview Rate Card</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              type="primary"
              onClick={handleOpenAddModal}
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Minimal 3-Metric KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Active Packages</span>
              <Package className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{packages.length}</div>
            <div className="text-xs text-[#73736A]">Published on public storefront</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Starting Rate</span>
              <span className="text-xs font-bold text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-full">
                Entry Tier
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">€{minPrice.toLocaleString()}</div>
            <div className="text-xs text-[#73736A]">Base price for brand bookings</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Avg. Turnaround</span>
              <Clock className="w-4 h-4 text-[#6444A6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{avgDelivery} Days</div>
            <div className="text-xs text-[#73736A]">Average deliverable turnaround</div>
          </div>
        </div>

        {/* Packages Management Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                Rate Card Tiers ({filteredPackages.length})
              </h2>
              <p className="text-xs text-[#73736A] mt-0.5">
                Brands can instantly book these preset deliverables with escrow protection.
              </p>
            </div>

            {/* Platform Filter Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] overflow-x-auto shrink-0 max-w-full">
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
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAEAE3] text-[#0A0A0A]'
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
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md relative bg-white ${
                    pkg.popular
                      ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
                      : 'border-[#E7E7E2] hover:border-[#0A0A0A]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-6 bg-[#0A0A0A] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] text-[#73736A] border border-[#E7E7E2] flex items-center gap-1.5 capitalize">
                        {pkg.platform === 'instagram' && <Instagram className="w-3 h-3 text-[#FF2D78]" />}
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
                      <p className="text-xs text-[#73736A] mt-1.5 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Inclusions List */}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div className="pt-3 border-t border-[#E7E7E2] space-y-2 text-xs">
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
                        {pkg.deliveryDays}d turnaround
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
                        <span>Edit</span>
                      </button>

                      <Popconfirm
                        title="Delete Package"
                        description="Remove this package from your rate card?"
                        onConfirm={() => handleDeletePackage(pkg.id)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                      >
                        <button
                          type="button"
                          className="w-9 h-9 rounded-full bg-[#FAFAF8] hover:bg-rose-50 text-[#73736A] hover:text-rose-600 border border-[#E7E7E2] flex items-center justify-center transition-all cursor-pointer shrink-0"
                          title="Delete"
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
              icon={<Package className="w-8 h-8 text-[#73736A]" />}
              title={`No ${selectedPlatformFilter.toUpperCase()} Packages`}
              description="Create a preset deliverable tier for this channel to start receiving direct brand bookings."
              primaryAction={{
                label: 'Add Package',
                onClick: handleOpenAddModal,
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          )}
        </div>
      </div>

      {/* Add / Edit Package Modal */}
      <Modal
        title={
          <div className="pb-3 border-b border-[#E7E7E2]">
            <span className="text-lg font-black text-[#0A0A0A]">
              {editingPkgId ? 'Edit Package & Pricing' : 'Create Deliverable Package'}
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="space-y-4 pt-3 font-sans">
          {/* 1-Click Quick Template Pills (Only when creating new) */}
          {!editingPkgId && (
            <div className="space-y-1.5 p-3 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
              <span className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">
                1-Click Preset Templates:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
                {PACKAGE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => applyTemplate(tmpl)}
                    className="px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#0A0A0A] hover:text-white border border-[#E7E7E2] text-[#0A0A0A] transition-all shrink-0 cursor-pointer"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Platform & Usage Rights */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Platform</label>
              <Select
                value={platform}
                onChange={(val) => setPlatform(val)}
                className="w-full h-10"
                options={[
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'ugc', label: 'Direct UGC' },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Usage Rights</label>
              <Select
                value={usageRights}
                onChange={(val) => setUsageRights(val)}
                className="w-full h-10"
                options={[
                  { value: '30-Day Organic Rights', label: '30-Day Organic' },
                  { value: 'Organic + Spark Ad Authorization', label: 'Organic + Spark Ads' },
                  { value: '90-Day Full Commercial Ad Rights', label: '90-Day Commercial Ads' },
                  { value: 'Permanent Placement', label: 'Permanent Placement' },
                ]}
              />
            </div>
          </div>

          {/* Package Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Package Title</label>
            <Input
              placeholder="e.g. 60s Dedicated Reel + Story Bundle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl h-10 text-sm font-semibold"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Description</label>
            <Input.TextArea
              rows={2}
              placeholder="Creative scope, angles, and content specs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl text-sm"
              required
            />
          </div>

          {/* Pricing & Turnaround Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Rate (€ EUR)</label>
              <InputNumber
                min={50}
                max={50000}
                value={priceEur}
                onChange={(val) => setPriceEur(val || 100)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Turnaround (Days)</label>
              <InputNumber
                min={1}
                max={60}
                value={deliveryDays}
                onChange={(val) => setDeliveryDays(val || 3)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Revisions</label>
              <InputNumber
                min={0}
                max={10}
                value={revisions}
                onChange={(val) => setRevisions(val || 1)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Included Deliverables (one per line)
            </label>
            <Input.TextArea
              rows={3}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              className="rounded-xl text-sm"
              placeholder="1x 60s Reel&#10;3x Story Links&#10;Brand Mention Tag"
            />
          </div>

          {/* Popular Tag Toggle */}
          <label className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="w-4 h-4 rounded text-[#0A0A0A]"
            />
            <span>Highlight as &quot;Most Popular&quot; tier</span>
          </label>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <Button onClick={() => setIsModalOpen(false)} className="rounded-full h-10 px-5 font-bold">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSavePackage}
              className="h-10 px-6 rounded-full font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm"
            >
              {editingPkgId ? 'Save Changes' : 'Publish Package'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
