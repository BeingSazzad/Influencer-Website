'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  addCreatorPackage,
  updateCreatorPackage,
  deleteCreatorPackage,
  updateCreatorProfileDetails,
} from '@/redux/slices/creatorSlice';
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
  Copy,
  Search,
} from 'lucide-react';
import { Button, Modal, Input, InputNumber, Select, message, Popconfirm } from 'antd';

const CHANNEL_OPTIONS: { id: PlatformType; label: string; icon: React.ReactNode }[] = [
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-3.5 h-3.5 text-[#FF2D78]" /> },
  { id: 'tiktok', label: 'TikTok', icon: <Film className="w-3.5 h-3.5 text-[#0A0A0A]" /> },
  { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-3.5 h-3.5 text-red-500" /> },
  { id: 'ugc', label: 'UGC Video', icon: <Sparkles className="w-3.5 h-3.5 text-purple-600" /> },
];

export default function CreatorPackagesPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators.find((c) => c.id === currentUser?.id) || creators[0];

  const packages = currentCreator?.packages || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<PlatformType[]>(['instagram']);
  const [priceEur, setPriceEur] = useState<number>(850);
  const [deliveryDays, setDeliveryDays] = useState<number>(4);
  const [revisions, setRevisions] = useState<number>(2);
  const [usageRights, setUsageRights] = useState('30-Day Organic Rights');
  const [inclusionsText, setInclusionsText] = useState('1x Dedicated Video Deliverable (4K)\nBrand Mention & Official Tag\nHigh-Res Raw Footage Export');
  const [isPopular, setIsPopular] = useState(false);

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = pkg.title.toLowerCase().includes(q);
      const matchDesc = pkg.description.toLowerCase().includes(q);
      const matchInc = pkg.inclusions?.some((i) => i.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchInc;
    }

    return true;
  });

  const handleOpenAddModal = () => {
    if (currentCreator.packages.length >= 3) {
      message.warning('Rate cards support a maximum of 3 packages (Starter, Standard, Premium). Edit an existing package to update your offerings.');
      return;
    }
    setEditingPkgId(null);
    setTitle('');
    setDescription('');
    setSelectedChannels(['instagram', 'tiktok']);
    setPriceEur(850);
    setDeliveryDays(4);
    setRevisions(2);
    setUsageRights('30-Day Organic Rights');
    setInclusionsText('1x Dedicated Video Deliverable (4K)\nBrand Mention & Official Tag\nCommercial Music Sync\n30-Day Organic Rights');
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: CreatorPackage) => {
    setEditingPkgId(pkg.id);
    setTitle(pkg.title);
    setDescription(pkg.description);
    if (pkg.platforms && pkg.platforms.length > 0) {
      setSelectedChannels(pkg.platforms);
    } else if (pkg.platform === 'all' || pkg.platform === 'multi') {
      setSelectedChannels(['youtube', 'instagram', 'tiktok', 'ugc']);
    } else {
      setSelectedChannels([pkg.platform]);
    }
    setPriceEur(pkg.priceEur);
    setDeliveryDays(pkg.deliveryDays);
    setRevisions(pkg.revisions);
    setUsageRights(pkg.usageRights || '30-Day Organic Rights');
    setInclusionsText(pkg.inclusions ? pkg.inclusions.join('\n') : '');
    setIsPopular(!!pkg.popular);
    setIsModalOpen(true);
  };

  const handleDuplicatePackage = (pkg: CreatorPackage) => {
    if (currentCreator.packages.length >= 3) {
      message.warning('Rate cards support a maximum of 3 packages. Please remove or edit an existing package first.');
      return;
    }
    const duplicatedPkg: CreatorPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      title: `${pkg.title} (Copy)`,
      popular: false,
    };
    dispatch(addCreatorPackage({ creatorId: currentCreator.id, pkg: duplicatedPkg }));
    const allPackages = [...currentCreator.packages, duplicatedPkg];
    const minPrice = Math.min(...allPackages.map((p) => p.priceEur));
    if (Number.isFinite(minPrice) && minPrice > 0) {
      dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates: { startingPriceEur: minPrice } }));
    }
    message.success(`Duplicated "${pkg.title}" as a new package!`);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      message.error('Please enter a package title and description.');
      return;
    }

    if (!priceEur || priceEur <= 0) {
      message.error('Please enter a valid rate in EUR.');
      return;
    }

    if (selectedChannels.length === 0) {
      message.error('Please select at least 1 delivery channel for this package.');
      return;
    }

    const inclusionsArray = inclusionsText
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const primaryPlatform: PlatformType =
      selectedChannels.length > 1 ? 'multi' : selectedChannels[0];

    const packageType =
      selectedChannels.length > 1
        ? 'bundle'
        : selectedChannels[0] === 'ugc'
        ? 'ugc_video'
        : selectedChannels[0] === 'youtube'
        ? 'video'
        : 'reel';

    if (editingPkgId) {
      const updatedPkg: CreatorPackage = {
        id: editingPkgId,
        platform: primaryPlatform,
        platforms: selectedChannels,
        title: title.trim(),
        type: packageType,
        description: description.trim(),
        priceEur,
        deliveryDays,
        revisions,
        usageRights,
        popular: isPopular,
        inclusions: inclusionsArray,
      };

      dispatch(updateCreatorPackage({ creatorId: currentCreator.id, pkg: updatedPkg }));
      const remainingPackages = currentCreator.packages.map((p) => (p.id === editingPkgId ? updatedPkg : p));
      const minPrice = Math.min(...remainingPackages.map((p) => p.priceEur));
      if (Number.isFinite(minPrice) && minPrice > 0) {
        dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates: { startingPriceEur: minPrice } }));
      }
      message.success('Package updated on your rate card!');
    } else {
      const newPkg: CreatorPackage = {
        id: `pkg-${Date.now()}`,
        platform: primaryPlatform,
        platforms: selectedChannels,
        title: title.trim(),
        type: packageType,
        description: description.trim(),
        priceEur,
        deliveryDays,
        revisions,
        usageRights,
        popular: isPopular,
        inclusions: inclusionsArray,
      };

      dispatch(addCreatorPackage({ creatorId: currentCreator.id, pkg: newPkg }));
      const allPackages = [...currentCreator.packages, newPkg];
      const minPrice = Math.min(...allPackages.map((p) => p.priceEur));
      if (Number.isFinite(minPrice) && minPrice > 0) {
        dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates: { startingPriceEur: minPrice } }));
      }
      message.success('New package published to your rate card!');
    }

    setIsModalOpen(false);
  };

  const handleDeletePackage = (pkgId: string) => {
    dispatch(deleteCreatorPackage({ creatorId: currentCreator.id, packageId: pkgId }));
    const remainingPackages = currentCreator.packages.filter((p) => p.id !== pkgId);
    if (remainingPackages.length > 0) {
      const minPrice = Math.min(...remainingPackages.map((p) => p.priceEur));
      if (Number.isFinite(minPrice) && minPrice > 0) {
        dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates: { startingPriceEur: minPrice } }));
      }
    }
    message.success('Package removed from your rate card.');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Packages"
        subtitle="Pricing and deliverables."
        action={
          <Button
            type="primary"
            onClick={handleOpenAddModal}
            className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-7">
        {/* Deals Management Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          {/* Header Controls: Search & Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Packages
              </h2>
              <p className="text-sm text-[#66665E] mt-0.5 font-medium">
                Manage your packages and deliverables.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#66665E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold placeholder:text-[#66665E] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Deal Cards Grid */}
          {filteredPackages.slice(0, 3).length > 0 ? (
            <div className={`grid grid-cols-1 ${filteredPackages.slice(0,3).length === 1 ? 'md:grid-cols-1 max-w-sm' : filteredPackages.slice(0,3).length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5`}>
              {filteredPackages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md relative bg-white ${
                    pkg.popular
                      ? 'border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
                      : 'border-[#E7E7E2] hover:border-[#0A0A0A]'
                  }`}
                >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-6 bg-[#0A0A0A] text-white text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {/* Price label */}
                      <div className="text-sm font-bold text-[#66665E]">
                        €{pkg.priceEur.toLocaleString()}
                      </div>

                      {/* Title — dominant */}
                      <div>
                        <h3 className="text-lg font-black text-[#0A0A0A] leading-snug tracking-tight">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-[#66665E] mt-1.5 line-clamp-2 leading-relaxed font-medium">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Inclusions List */}
                      {pkg.inclusions && pkg.inclusions.length > 0 && (
                        <div className="pt-3 border-t border-[#F4F4F0] space-y-1.5 text-xs">
                          {pkg.inclusions.slice(0, 4).map((inc, i) => (
                            <div key={i} className="flex items-center gap-2 text-[#52524E]">
                              <Check className="w-3 h-3 text-[#FF2D78] shrink-0" />
                              <span className="truncate font-medium">{inc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Turnaround, Revisions & Actions */}
                    <div className="pt-4 mt-4 border-t border-[#E7E7E2] space-y-3">
                      <div className="flex items-center justify-between text-sm text-[#66665E] font-bold">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#66665E]" />
                          {pkg.deliveryDays}d turnaround
                        </span>
                        <span className="flex items-center gap-1">
                          <RotateCcw className="w-3.5 h-3.5 text-[#66665E]" />
                          {pkg.revisions} revisions
                        </span>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(pkg)}
                          className="flex-1 h-9 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Deal</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicatePackage(pkg)}
                          className="w-9 h-9 rounded-full bg-[#FAFAF8] hover:bg-[#EAEAE3] text-[#0A0A0A] border border-[#E7E7E2] flex items-center justify-center transition-all cursor-pointer shrink-0"
                          title="Duplicate Deal"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <Popconfirm
                          title="Delete Collaboration Deal"
                          description="Remove this deal from your public rate card?"
                          onConfirm={() => handleDeletePackage(pkg.id)}
                          okText="Delete"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <button
                            type="button"
                            className="w-9 h-9 rounded-full bg-[#FAFAF8] hover:bg-rose-50 text-[#66665E] hover:text-rose-600 border border-[#E7E7E2] flex items-center justify-center transition-all cursor-pointer shrink-0"
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
              icon={<Package className="w-8 h-8 text-[#66665E]" />}
              title="No Deals Found"
              description="No collaboration packages match your current filter. Create a deal to start receiving direct brand bookings."
              primaryAction={{
                label: 'Create New Deal',
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
            <span className="text-2xl font-extrabold text-[#0A0A0A]">
              {editingPkgId ? 'Edit Collaboration Deal' : 'Create Collaboration Deal'}
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={620}
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="space-y-4 pt-3 font-sans">

          {/* Deal Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Deal Title</label>
            <Input
              placeholder="e.g. 1x Dedicated 4K Reel + 3x Stories"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl h-10 text-sm font-semibold"
              required
            />
          </div>

          {/* Multi-Channel Deliverable Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                Delivery Channels
              </label>
              <span className="text-sm text-[#66665E]">Select one or multiple</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CHANNEL_OPTIONS.map((ch) => {
                const isSelected = selectedChannels.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedChannels.length > 1) {
                          setSelectedChannels(selectedChannels.filter((c) => c !== ch.id));
                        } else {
                          message.warning('A deal must have at least 1 channel.');
                        }
                      } else {
                        setSelectedChannels([...selectedChannels, ch.id]);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-2xs'
                        : 'bg-[#FAFAF8] text-[#66665E] border-[#E7E7E2] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>{ch.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing, Turnaround, Revisions */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Rate (€)</label>
              <InputNumber
                min={50}
                max={50000}
                value={priceEur}
                onChange={(val) => setPriceEur(val || 100)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Turnaround (Days)</label>
              <InputNumber
                min={1}
                max={60}
                value={deliveryDays}
                onChange={(val) => setDeliveryDays(val || 3)}
                className="w-full rounded-xl h-10 text-sm font-bold flex items-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Revisions</label>
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
            <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
              Included Deliverables (one per line)
            </label>
            <Input.TextArea
              rows={3}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              className="rounded-xl text-sm font-medium"
              placeholder="1x 60s Reel&#10;3x Story Links&#10;Brand Mention Tag"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Package Description</label>
            <Input.TextArea
              rows={2}
              placeholder="Creative scope, angles, or content guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl text-sm"
              required
            />
          </div>

          {/* Featured Deal Toggle */}
          <label className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="w-4 h-4 rounded text-[#0A0A0A]"
            />
            <span>Highlight as &quot;Most Popular&quot; on public storefront</span>
          </label>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <Button onClick={() => setIsModalOpen(false)} className="rounded-full h-10 px-5 font-bold">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSavePackage}
              className="h-10 px-6 rounded-full font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm cursor-pointer"
            >
              {editingPkgId ? 'Save Changes' : 'Publish Package'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
