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
  Plus,
  Edit3,
  Trash2,
  Play,
  Upload,
  ArrowRight,
  Instagram,
  Youtube,
  Sparkles,
} from 'lucide-react';
import { Button, Modal, Input, Select, message, Popconfirm } from 'antd';

function CreatorPortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);

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

  // Video Form states
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [deliverableType, setDeliverableType] = useState('');
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [mediaUrl, setMediaUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [duration, setDuration] = useState('0:45');
  const [views, setViews] = useState('250K');
  const [likes, setLikes] = useState('18.5K');
  const [comments, setComments] = useState('850');
  const [engagementRate, setEngagementRate] = useState('7.5%');
  const [description, setDescription] = useState('');
  const [soundTrack, setSoundTrack] = useState('');
  const [packagePriceEur, setPackagePriceEur] = useState<number | undefined>(1000);

  // File upload refs
  const modalMediaFileInputRef = useRef<HTMLInputElement>(null);
  const quickReplaceMediaInputRef = useRef<HTMLInputElement>(null);
  const [replacingItemId, setReplacingItemId] = useState<string | null>(null);

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
    setDeliverableType('60s 4K Reel with Voiceover');
    setMediaType('video');
    setMediaUrl('');
    setAspectRatio('9:16');
    setDuration('0:45');
    setViews('280K');
    setLikes('21.4K');
    setComments('920');
    setEngagementRate('8.2%');
    setDescription('');
    setSoundTrack('Original Audio • Voiceover');
    setPackagePriceEur(1100);
    setIsVideoModalOpen(true);
  };

  const openEditVideoModal = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setBrandName(item.brandName);
    setBrandLogo(item.brandLogo || '');
    setCampaignTitle(item.campaignTitle);
    setPlatform(item.platform);
    setDeliverableType(item.deliverableType || '60s 4K Reel with Voiceover');
    setMediaType(item.mediaType || 'video');
    setMediaUrl(item.mediaUrl);
    setAspectRatio(item.aspectRatio || '9:16');
    setDuration(item.duration || '0:45');
    setViews(item.views || '200K');
    setLikes(item.likes || '15K');
    setComments(item.comments || '500');
    setEngagementRate(item.engagementRate || '7.0%');
    setDescription(item.description || '');
    setSoundTrack(item.soundTrack || '');
    setPackagePriceEur(item.packagePriceEur || 1000);
    setIsVideoModalOpen(true);
  };

  const handleModalMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setMediaUrl(result);
        message.success('Deliverable media file loaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQuickMediaReplaceClick = (itemId: string) => {
    setReplacingItemId(itemId);
    quickReplaceMediaInputRef.current?.click();
  };

  const handleQuickMediaChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingItemId) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const existing = portfolioList.find((i) => i.id === replacingItemId);
        if (existing) {
          dispatch(
            updatePortfolioItem({
              creatorId: targetCreatorId,
              item: { ...existing, mediaUrl: result },
            })
          );
          message.success('Deliverable media replaced successfully!');
        }
      }
      setReplacingItemId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !campaignTitle.trim() || !mediaUrl.trim()) {
      message.error('Please complete brand name, campaign title, and media image or URL.');
      return;
    }

    const payload: PortfolioItem = {
      id: editingItemId || `port-${Date.now()}`,
      brandName: brandName.trim(),
      brandLogo: brandLogo.trim() || undefined,
      campaignTitle: campaignTitle.trim(),
      platform,
      deliverableType: deliverableType.trim(),
      mediaType,
      mediaUrl: mediaUrl.trim(),
      aspectRatio,
      duration: duration.trim(),
      views: views.trim(),
      likes: likes.trim(),
      comments: comments.trim() || undefined,
      engagementRate: engagementRate.trim(),
      description: description.trim(),
      soundTrack: soundTrack.trim() || undefined,
      packagePriceEur,
      completedDate: '2026',
    };

    if (editingItemId) {
      dispatch(updatePortfolioItem({ creatorId: targetCreatorId, item: payload }));
      message.success(`Updated ${brandName} deliverable!`);
    } else {
      dispatch(addPortfolioItem({ creatorId: targetCreatorId, item: payload }));
      message.success(`Added ${brandName} deliverable to your portfolio!`);
    }

    setIsVideoModalOpen(false);
  };

  const handleDeleteVideo = (itemId: string, brand: string) => {
    dispatch(deletePortfolioItem({ creatorId: targetCreatorId, itemId }));
    message.success(`Removed ${brand} deliverable from portfolio.`);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Client Work & Deliverables"
        subtitle="Manage verified UGC video ads, sponsored brand deliverables, and performance metrics."
        action={
          <Button
            type="primary"
            onClick={openAddVideoModal}
            className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Deliverable</span>
          </Button>
        }
      />

      {/* Hidden input for quick media replacement */}
      <input
        ref={quickReplaceMediaInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleQuickMediaChosen}
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
        {/* Deliverables Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          {/* Header & Platform Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                Deliverables Portfolio ({filteredVideoList.length})
              </h2>
              <p className="text-xs sm:text-sm text-[#73736A] mt-1 font-medium">
                Verified brand deliverables showcasing your production quality and conversion power.
              </p>
            </div>

            {/* Platform Filter Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] overflow-x-auto shrink-0 max-w-full">
              {[
                { key: 'all', label: 'All', count: portfolioList.length },
                {
                  key: 'instagram',
                  label: 'Instagram',
                  count: portfolioList.filter((i) => i.platform === 'instagram').length,
                },
                {
                  key: 'tiktok',
                  label: 'TikTok',
                  count: portfolioList.filter((i) => i.platform === 'tiktok').length,
                },
                {
                  key: 'youtube',
                  label: 'YouTube',
                  count: portfolioList.filter((i) => i.platform === 'youtube').length,
                },
                {
                  key: 'ugc',
                  label: 'UGC Ads',
                  count: portfolioList.filter((i) => i.platform === 'ugc').length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setPlatformFilter(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    platformFilter === tab.key
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      platformFilter === tab.key ? 'bg-white/20 text-white' : 'bg-[#EAEAE3] text-[#0A0A0A]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Deliverables Grid */}
          {filteredVideoList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideoList.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] hover:border-[#0A0A0A] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
                >
                  {/* Thumbnail Container */}
                  <div className="h-56 overflow-hidden relative bg-[#0A0A0A]">
                    <img
                      src={item.mediaUrl}
                      alt={item.campaignTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Platform & Duration Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="text-xs font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-sm">
                        {item.platform === 'instagram' && <Instagram className="w-3 h-3 text-[#FF2D78]" />}
                        {item.platform === 'tiktok' && <Film className="w-3 h-3 text-white" />}
                        {item.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                        {item.platform === 'ugc' && <Sparkles className="w-3 h-3 text-purple-400" />}
                        <span>{item.platform}</span>
                      </span>

                      {item.duration && (
                        <span className="text-xs font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Center Preview Button on hover */}
                    <button
                      type="button"
                      onClick={() => setPreviewingItem(item)}
                      className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {item.brandLogo && (
                          <img
                            src={item.brandLogo}
                            alt={item.brandName}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        )}
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#73736A]">
                          {item.brandName}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0A0A0A] line-clamp-1 leading-snug">
                        {item.campaignTitle}
                      </h3>

                      {item.deliverableType && (
                        <div className="text-xs text-[#73736A] font-medium line-clamp-1">
                          {item.deliverableType}
                        </div>
                      )}
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-center">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#73736A]">Views</div>
                        <div className="text-xs font-black text-[#0A0A0A]">{item.views || '—'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#73736A]">Likes</div>
                        <div className="text-xs font-black text-[#0A0A0A]">{item.likes || '—'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#73736A]">Eng. Rate</div>
                        <div className="text-xs font-black text-[#23744D]">{item.engagementRate || '—'}</div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 flex items-center justify-between border-t border-[#E7E7E2]">
                      <button
                        type="button"
                        onClick={() => handleQuickMediaReplaceClick(item.id)}
                        className="text-xs font-bold text-[#0A0A0A] hover:text-[#2563EB] flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Replace media image"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Replace Media</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditVideoModal(item)}
                          className="p-2 rounded-xl text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8] border border-transparent hover:border-[#E7E7E2] transition-all cursor-pointer"
                          title="Edit deliverable details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <Popconfirm
                          title="Delete Deliverable"
                          description={`Remove ${item.brandName} deliverable from your portfolio?`}
                          onConfirm={() => handleDeleteVideo(item.id, item.brandName)}
                          okText="Delete"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <button
                            type="button"
                            className="p-2 rounded-xl text-[#73736A] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer"
                            title="Delete deliverable"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Film className="w-8 h-8 text-[#73736A]" />}
              title="No deliverables found"
              description="You haven't added any deliverables for this platform filter yet."
              primaryAction={{
                label: 'Add First Deliverable',
                onClick: openAddVideoModal,
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          )}
        </div>
      </div>

      {/* Add / Edit Deliverable Modal */}
      <Modal
        title={editingItemId ? 'Edit Deliverable' : 'Add Client Deliverable'}
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={680}
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="py-2">
          <form onSubmit={handleSaveVideo} className="space-y-4">
            {/* Media Upload / URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A0A0A] block">
                Deliverable Cover / Video Preview
              </label>
              <input
                ref={modalMediaFileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleModalMediaUpload}
              />

              {mediaUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] h-44 flex items-center justify-center group">
                  <img src={mediaUrl} alt="Deliverable preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="default"
                      onClick={() => modalMediaFileInputRef.current?.click()}
                      className="h-9 px-3 rounded-full text-xs font-bold bg-white text-[#0A0A0A] border-none flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Different</span>
                    </Button>
                    <Button
                      type="default"
                      danger
                      onClick={() => setMediaUrl('')}
                      className="h-9 px-3 rounded-full text-xs font-bold bg-white border-none flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => modalMediaFileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#FAFAF8] space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E7E7E2] flex items-center justify-center mx-auto text-[#0A0A0A]">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#0A0A0A]">Click to upload video cover or image</div>
                  <div className="text-[11px] text-[#73736A]">Supports PNG, JPG, MP4 up to 25MB</div>
                </div>
              )}

              <div className="pt-1">
                <Input
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Or paste media URL (https://...)"
                  className="rounded-xl h-10 text-xs font-medium border-[#E7E7E2]"
                />
              </div>
            </div>

            {/* Brand Name & Campaign Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0A0A0A] block">Brand Name</label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Glossier, Laneige, Dyson"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0A0A0A] block">Campaign Title</label>
                <Input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. Dewy Hydration Routine Reel"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>
            </div>

            {/* Platform, Deliverable Format, Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0A0A0A] block">Platform</label>
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

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0A0A0A] block">Deliverable Format</label>
                <Input
                  value={deliverableType}
                  onChange={(e) => setDeliverableType(e.target.value)}
                  placeholder="60s 4K Reel with Voiceover"
                  className="rounded-xl h-10 font-semibold text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0A0A0A] block">Duration</label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="0:45"
                  className="rounded-xl h-10 font-semibold text-sm"
                />
              </div>
            </div>

            {/* Verified Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#73736A]">Views</label>
                <Input
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="280K"
                  className="rounded-xl h-9 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#73736A]">Likes</label>
                <Input
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  placeholder="21.4K"
                  className="rounded-xl h-9 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#73736A]">Comments</label>
                <Input
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="920"
                  className="rounded-xl h-9 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#73736A]">Eng. Rate</label>
                <Input
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  placeholder="8.2%"
                  className="rounded-xl h-9 text-xs font-semibold text-[#23744D]"
                />
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0A0A0A] block">
                Deliverable Narrative & Strategy
              </label>
              <Input.TextArea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your hook, visual direction, and how the deliverable drove performance..."
                className="rounded-2xl p-3 text-sm border-[#E7E7E2]"
              />
            </div>

            <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
              <Button
                onClick={() => setIsVideoModalOpen(false)}
                className="rounded-full h-10 px-5 font-bold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm cursor-pointer"
              >
                {editingItemId ? 'Update Deliverable' : 'Publish to Portfolio'}
              </Button>
            </div>
          </form>
        </div>
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
        <div className="p-8 text-center text-sm font-bold text-[#73736A]">
          Loading client deliverables...
        </div>
      }
    >
      <CreatorPortfolioContent />
    </Suspense>
  );
}
