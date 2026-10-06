'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { PortfolioVideoModal } from '@/components/shared/PortfolioVideoModal';
import {
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '@/redux/slices/creatorSlice';
import { PortfolioItem, PlatformType } from '@/types';
import {
  Film,
  Layers,
  Plus,
  Edit3,
  Trash2,
  Play,
  Upload,
  Instagram,
  Youtube,
  Sparkles,
  Link2,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from 'lucide-react';
import { Button, Modal, Input, Select, message, Dropdown } from 'antd';

function platformLabel(platform: PlatformType) {
  if (platform === 'all' || platform === 'multi') return 'All platforms';
  if (platform === 'ugc') return 'UGC Ads';
  if (platform === 'instagram') return 'Instagram';
  if (platform === 'tiktok') return 'TikTok';
  if (platform === 'youtube') return 'YouTube';
  return platform;
}

function CreatorPortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const { orders } = useAppSelector((state) => state.order);

  // Active creator
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const currentCreator = creators.find((c) => c.id === targetCreatorId) || creators[0];

  const portfolioList: PortfolioItem[] = currentCreator?.portfolio || [];

  // If user requested photos/gallery tab on portfolio page, redirect to Creator Profile Gallery tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'photos' || tab === 'gallery') {
      router.replace('/creator/profile?tab=gallery');
    }
  }, [searchParams, router]);

  // Video Filter state
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformType>('all');

  // Video Modal states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [previewingItem, setPreviewingItem] = useState<PortfolioItem | null>(null);

  // Video Form states (minimal, clean & product-designed)
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [deliverableType, setDeliverableType] = useState('');
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [mediaUrl, setMediaUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  // 1-Click Import from Completed Campaign / Order
  const handleAutofillFromOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setBrandName(order.brandName);
    setBrandLogo(order.brandLogo || '');
    setCampaignTitle(order.packageTitle || `${order.brandName} Collaboration`);
    setPlatform(order.platform === 'multi' ? 'all' : order.platform);
    setDeliverableType(order.packageTitle);
    if (order.brief) {
      setDescription(order.brief);
    }
    if (order.deliverables && order.deliverables.length > 0 && order.deliverables[0].fileUrl) {
      setMediaUrl(order.deliverables[0].fileUrl);
    }
    message.success(`Imported details from ${order.brandName} campaign!`);
  };

  // File upload refs
  const modalMediaFileInputRef = useRef<HTMLInputElement>(null);

  // Calculate filtered list
  const filteredVideoList =
    platformFilter === 'all'
      ? portfolioList
      : portfolioList.filter((item) => item.platform === platformFilter);

  const openAddVideoModal = () => {
    setEditingItemId(null);
    setBrandName('');
    setBrandLogo('');
    setCampaignTitle('');
    setPlatform('instagram');
    setDeliverableType('');
    setMediaType('video');
    setMediaUrl('');
    setAspectRatio('9:16');
    setDuration('');
    setDescription('');
    setShowUrlInput(false);
    setIsVideoModalOpen(true);
  };

  const openEditVideoModal = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setBrandName(item.brandName || '');
    setBrandLogo(item.brandLogo || '');
    setCampaignTitle(item.campaignTitle);
    setPlatform(item.platform);
    setDeliverableType(item.deliverableType || '');
    setMediaType(item.mediaType || 'video');
    setMediaUrl(item.mediaUrl);
    setAspectRatio(item.aspectRatio || '9:16');
    setDuration(item.duration || '');
    setDescription(item.description || '');
    setShowUrlInput(false);
    setIsVideoModalOpen(true);
  };

  // Browser-native automatic file inspection (silent, auto-detects aspect and duration)
  const handleModalMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video') || /\.(mp4|mov|webm|m4v)$/i.test(file.name);
    const isImage = file.type.startsWith('image') || /\.(jpg|jpeg|png|webp)$/i.test(file.name);

    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\b(v\d+|final|draft|copy|export|render)\b/gi, '')
      .trim();

    if (isVideo) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const blobUrl = URL.createObjectURL(file);
      video.src = blobUrl;
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(blobUrl);
        const totalSecs = Math.round(video.duration);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        const w = video.videoWidth;
        const h = video.videoHeight;
        const detectedAspect: '9:16' | '16:9' | '1:1' =
          h > w * 1.15 ? '9:16' : w > h * 1.15 ? '16:9' : '1:1';

        setDuration(formattedDuration);
        setAspectRatio(detectedAspect);
        setMediaType('video');

        if (!campaignTitle.trim() && cleanName) {
          setCampaignTitle(cleanName);
        }
      };
    } else if (isImage) {
      const img = new Image();
      const blobUrl = URL.createObjectURL(file);
      img.src = blobUrl;
      img.onload = () => {
        URL.revokeObjectURL(blobUrl);
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const detectedAspect: '9:16' | '16:9' | '1:1' =
          h > w * 1.15 ? '9:16' : w > h * 1.15 ? '16:9' : '1:1';

        setDuration('');
        setAspectRatio(detectedAspect);
        setMediaType('image');

        if (!campaignTitle.trim() && cleanName) {
          setCampaignTitle(cleanName);
        }
      };
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setMediaUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle.trim() || !mediaUrl.trim()) {
      message.error('Please enter a project title and upload or provide a media URL.');
      return;
    }

    const payload: PortfolioItem = {
      id: editingItemId || `port-${Date.now()}`,
      brandName: brandName.trim() || 'Personal Work',
      brandLogo: brandLogo.trim() || undefined,
      campaignTitle: campaignTitle.trim(),
      platform,
      deliverableType: deliverableType.trim() || (platform === 'instagram' ? 'Reel / Post' : 'Video / Content'),
      mediaType,
      mediaUrl: mediaUrl.trim(),
      aspectRatio,
      duration: duration.trim(),
      description: description.trim(),
      completedDate: '2026',
    };

    if (editingItemId) {
      dispatch(updatePortfolioItem({ creatorId: targetCreatorId, item: payload }));
      message.success(`Updated "${campaignTitle}" in portfolio!`);
    } else {
      dispatch(addPortfolioItem({ creatorId: targetCreatorId, item: payload }));
      message.success(`Added "${campaignTitle}" to portfolio!`);
    }

    setIsVideoModalOpen(false);
  };

  const handleDeleteVideo = (itemId: string, title: string) => {
    dispatch(deletePortfolioItem({ creatorId: targetCreatorId, itemId }));
    message.success(`Removed "${title}" from portfolio.`);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Portfolio"
        subtitle="Your creative projects and brand collaborations."
        action={
          <Button
            type="primary"
            onClick={openAddVideoModal}
            className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Work</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
        {/* Deliverables Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          {/* Header & Platform Filter Pills (No Numbering Badges) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-[#66665E] mt-1 font-medium">
                Showcase of your past work and collaborations.
              </p>
            </div>

            {/* Clean Platform Filter Pills without number badges */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] overflow-x-auto shrink-0 max-w-full">
              {[
                { key: 'all', label: 'All' },
                { key: 'instagram', label: 'Instagram' },
                { key: 'tiktok', label: 'TikTok' },
                { key: 'youtube', label: 'YouTube' },
                { key: 'ugc', label: 'UGC Ads' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setPlatformFilter(tab.key as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    platformFilter === tab.key
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#66665E] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredVideoList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideoList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewingItem(item)}
                  className="rounded-3xl border border-[#E7E7E2] bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0A0A0A] transition-all flex flex-col group h-full cursor-pointer"
                >
                  {/* Media Thumbnail Container (Standard Uniform Size) */}
                  <div className="relative h-52 sm:h-56 w-full bg-[#0A0A0A] overflow-hidden shrink-0">
                    <img
                      src={item.mediaUrl}
                      alt={item.campaignTitle}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />

                    {/* Platform Badge (Clean, No duration badge) */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="text-xs font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-sm">
                        {item.platform === 'instagram' && <Instagram className="w-3 h-3 text-[#FF2D78]" />}
                        {item.platform === 'tiktok' && <Film className="w-3 h-3 text-white" />}
                        {item.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                        {item.platform === 'ugc' && <Sparkles className="w-3 h-3 text-purple-400" />}
                        {(item.platform === 'all' || item.platform === 'multi') && <Layers className="w-3 h-3 text-white" />}
                        <span>{platformLabel(item.platform)}</span>
                      </span>
                    </div>

                    {/* Center Preview Button on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-sm text-[#0A0A0A] line-clamp-1 leading-snug">
                          {item.campaignTitle}
                        </h3>

                        {/* 3-dot dropdown menu */}
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: 'edit',
                                icon: <Edit3 className="w-4 h-4" />,
                                label: 'Edit Work',
                                onClick: () => openEditVideoModal(item),
                              },
                              {
                                type: 'divider',
                              },
                              {
                                key: 'delete',
                                icon: <Trash2 className="w-4 h-4" />,
                                label: 'Delete Work',
                                danger: true,
                                onClick: () => {
                                  Modal.confirm({
                                    title: 'Delete Work',
                                    content: `Are you sure you want to remove "${item.campaignTitle}" from your portfolio?`,
                                    okText: 'Delete',
                                    okType: 'danger',
                                    cancelText: 'Cancel',
                                    onOk: () => handleDeleteVideo(item.id, item.campaignTitle),
                                  });
                                },
                              },
                            ],
                          }}
                          trigger={['click']}
                          placement="bottomRight"
                        >
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-lg text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8] transition-colors cursor-pointer shrink-0"
                            title="Work options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </Dropdown>
                      </div>

                      {item.deliverableType && (
                        <div className="text-xs text-[#66665E] font-medium line-clamp-1">
                          {item.deliverableType}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Film className="w-8 h-8 text-[#66665E]" />}
              title="No work found"
              description="Upload your creative projects or import directly from completed campaigns."
              primaryAction={{
                label: 'Add First Work',
                onClick: openAddVideoModal,
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          )}
        </div>
      </div>

      {/* Add / Edit Work Modal (Clean, Minimal & Trimmed) */}
      <Modal
        title={
          <div className="pb-1">
            <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">
              {editingItemId ? 'Edit Work' : 'Add Work'}
            </h2>
          </div>
        }
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={540}
        centered
        destroyOnClose
        className="rounded-3xl"
      >
        <form onSubmit={handleSaveVideo} className="py-2 space-y-4">
          {/* Optional: Import from Campaign */}
          {orders && orders.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                Import from Campaign
              </label>
              <Select
                placeholder="Select a campaign to import..."
                className="w-full h-10"
                onChange={handleAutofillFromOrder}
                allowClear
                options={orders.map((o) => ({
                  value: o.id,
                  label: `${o.brandName} — ${o.packageTitle}`,
                }))}
              />
            </div>
          )}

          {/* Media Asset */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
              Media Asset <span className="text-rose-500">*</span>
            </label>

            <input
              ref={modalMediaFileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleModalMediaUpload}
            />

            {mediaUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#0A0A0A] h-44 flex items-center justify-center group shadow-inner">
                <img
                  src={mediaUrl}
                  alt="Work preview"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <Button
                    type="default"
                    onClick={() => modalMediaFileInputRef.current?.click()}
                    className="h-9 px-4 rounded-full text-sm font-semibold bg-white text-[#0A0A0A] border-none flex items-center gap-1.5 shadow-md hover:!bg-zinc-100 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Media</span>
                  </Button>
                  <Button
                    type="default"
                    danger
                    onClick={() => setMediaUrl('')}
                    className="h-9 px-4 rounded-full text-sm font-semibold bg-white border-none flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => modalMediaFileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#FAFAF8] hover:bg-[#F5F5F0] space-y-1.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#E7E7E2] group-hover:border-[#0A0A0A] group-hover:scale-105 transition-all flex items-center justify-center mx-auto text-[#0A0A0A] shadow-2xs">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-[#0A0A0A]">
                  Click to upload image or video
                </div>
                <p className="text-xs text-[#66665E]">
                  Supports MP4, MOV, PNG, JPG
                </p>
              </div>
            )}

            {/* URL Toggle */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-xs text-[#66665E] hover:text-[#0A0A0A] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Link2 className="w-3 h-3" />
                <span>{showUrlInput ? 'Hide link input' : 'Paste media link instead (URL)'}</span>
                {showUrlInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showUrlInput && (
                <div className="pt-1.5">
                  <Input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://... image or video URL"
                    className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
                    prefix={<Link2 className="w-3 h-3 text-[#66665E]" />}
                    allowClear
                  />
                </div>
              )}
            </div>
          </div>

          {/* Work Title & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                Work Title <span className="text-rose-500">*</span>
              </label>
              <Input
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="e.g. Dewy Hydration Routine"
                className="rounded-xl h-10 font-semibold text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                Platform
              </label>
              <Select
                value={platform}
                onChange={(val) => setPlatform(val)}
                className="w-full h-10"
                options={[
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'ugc', label: 'UGC Ads' },
                  { value: 'all', label: 'All platforms' },
                ]}
              />
            </div>
          </div>

          {/* Brand Name & Deliverable Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                Brand
              </label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Laneige, Gisou"
                className="rounded-xl h-10 font-semibold text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
                Format
              </label>
              <Input
                value={deliverableType}
                onChange={(e) => setDeliverableType(e.target.value)}
                placeholder="e.g. 60s Reel, Story Series"
                className="rounded-xl h-10 font-semibold text-sm"
              />
            </div>
          </div>

          {/* Details / Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider block">
              Description
            </label>
            <Input.TextArea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the work"
              className="rounded-2xl p-3 text-sm border-[#E7E7E2] leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <Button
              onClick={() => setIsVideoModalOpen(false)}
              className="rounded-full h-10 px-5 font-semibold text-sm border-[#E7E7E2]"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-full h-10 px-6 font-semibold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-xs cursor-pointer"
            >
              {editingItemId ? 'Update Work' : 'Save Work'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Video Lightbox Preview Modal */}
      {previewingItem && (
        <PortfolioVideoModal
          item={previewingItem}
          creator={currentCreator}
          onClose={() => setPreviewingItem(null)}
          onBookCampaign={() => {
            setPreviewingItem(null);
            message.info('Public preview mode. Brands can book packages directly from this view.');
          }}
        />
      )}
    </div>
  );
}

export default function CreatorPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm font-bold text-[#66665E]">
          Loading portfolio...
        </div>
      }
    >
      <CreatorPortfolioContent />
    </Suspense>
  );
}
