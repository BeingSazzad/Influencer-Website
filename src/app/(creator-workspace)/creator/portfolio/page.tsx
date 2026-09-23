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
  Link2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calculator,
  Wand2,
  Video as VideoIcon,
  RefreshCw,
} from 'lucide-react';
import { Button, Modal, Input, Select, message, Popconfirm } from 'antd';

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
  const [views, setViews] = useState('280K');
  const [likes, setLikes] = useState('21.4K');
  const [comments, setComments] = useState('920');
  const [engagementRate, setEngagementRate] = useState('8.0%');
  const [description, setDescription] = useState('');
  const [soundTrack, setSoundTrack] = useState('');
  const [packagePriceEur, setPackagePriceEur] = useState<number | undefined>(1100);

  // Automation & Smart UX States
  const [isAutoEngRate, setIsAutoEngRate] = useState(true);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [detectedSpecs, setDetectedSpecs] = useState<{
    duration?: string;
    aspect?: string;
    resolution?: string;
    fileName?: string;
    fileSize?: string;
  } | null>(null);

  // Platform deliverable quick presets
  const PLATFORM_PRESETS: Partial<Record<PlatformType, { label: string; duration: string; aspect: '9:16' | '16:9' | '1:1' }[]>> = {
    instagram: [
      { label: '60s 4K Reel (Voiceover)', duration: '0:60', aspect: '9:16' },
      { label: '3x Story Sequence with Link', duration: '0:45', aspect: '9:16' },
      { label: 'Carousel Post (Multi-Slide)', duration: 'Static', aspect: '1:1' },
      { label: 'Product Showcase Reel', duration: '0:30', aspect: '9:16' },
    ],
    tiktok: [
      { label: 'Trending Hook UGC Video', duration: '0:35', aspect: '9:16' },
      { label: 'Native Spark Ad Creative', duration: '0:45', aspect: '9:16' },
      { label: 'Unboxing & First Impression', duration: '0:50', aspect: '9:16' },
      { label: 'Problem-Solution Demo', duration: '0:40', aspect: '9:16' },
    ],
    youtube: [
      { label: '60s Vertical YouTube Short', duration: '0:60', aspect: '9:16' },
      { label: 'Dedicated Product Deep Dive', duration: '8:30', aspect: '16:9' },
      { label: '90s Mid-Roll Integration', duration: '1:30', aspect: '16:9' },
    ],
    ugc: [
      { label: 'High-Converting UGC Ad Hook', duration: '0:30', aspect: '9:16' },
      { label: 'Direct Testimonial / Review', duration: '0:45', aspect: '9:16' },
      { label: 'A/B Testing Creative Pair', duration: '0:30', aspect: '9:16' },
    ],
  };

  // Helper to parse human metric strings like '280K', '1.5M', '920'
  const parseMetricValue = (val: string): number => {
    if (!val) return 0;
    const clean = val.trim().toUpperCase().replace(/,/g, '');
    if (clean.endsWith('M')) {
      const num = parseFloat(clean.replace('M', ''));
      return isNaN(num) ? 0 : num * 1000000;
    }
    if (clean.endsWith('K')) {
      const num = parseFloat(clean.replace('K', ''));
      return isNaN(num) ? 0 : num * 1000;
    }
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  // Real-time automatic engagement rate calculation: (Likes + Comments) / Views * 100
  useEffect(() => {
    if (!isAutoEngRate) return;
    const v = parseMetricValue(views);
    const l = parseMetricValue(likes);
    const c = parseMetricValue(comments);

    if (v > 0) {
      const rate = ((l + c) / v) * 100;
      const formatted = rate >= 10 ? `${rate.toFixed(1)}%` : rate >= 1 ? `${rate.toFixed(1)}%` : `${rate.toFixed(2)}%`;
      setEngagementRate(formatted);
    }
  }, [views, likes, comments, isAutoEngRate]);

  // Handle Preset format selection
  const handleSelectPreset = (preset: { label: string; duration: string; aspect: '9:16' | '16:9' | '1:1' }) => {
    setDeliverableType(preset.label);
    setDuration(preset.duration);
    setAspectRatio(preset.aspect);
    message.info(`Applied format: ${preset.label}`);
  };

  // 1-Click Autofill from Completed Orders / Deals
  const handleAutofillFromOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setBrandName(order.brandName);
    setBrandLogo(order.brandLogo || '');
    setCampaignTitle(order.packageTitle || `${order.brandName} Sponsored Collaboration`);
    setPlatform(order.platform);
    setDeliverableType(order.packageTitle);
    setPackagePriceEur(order.basePriceEur);
    if (order.brief) {
      setDescription(order.brief);
    }
    if (order.deliverables && order.deliverables.length > 0 && order.deliverables[0].fileUrl) {
      setMediaUrl(order.deliverables[0].fileUrl);
    }
    message.success(`⚡ Auto-filled specs from ${order.brandName} order!`);
  };

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
    setDeliverableType('60s 4K Reel (Voiceover)');
    setMediaType('video');
    setMediaUrl('');
    setAspectRatio('9:16');
    setDuration('0:45');
    setViews('280K');
    setLikes('21.4K');
    setComments('920');
    setEngagementRate('8.0%');
    setDescription('');
    setSoundTrack('Original Audio • Voiceover');
    setPackagePriceEur(1100);
    setIsAutoEngRate(true);
    setShowUrlInput(false);
    setDetectedSpecs(null);
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
    setIsAutoEngRate(false); // keep existing custom value when editing
    setShowUrlInput(false);
    setDetectedSpecs(null);
    setIsVideoModalOpen(true);
  };

  // Browser-native automatic file inspection & metadata extraction
  const handleModalMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video') || /\.(mp4|mov|webm|m4v)$/i.test(file.name);
    const isImage = file.type.startsWith('image') || /\.(jpg|jpeg|png|webp)$/i.test(file.name);

    // Clean human title from file name (strips extensions, trailing v1/v2/copy/draft)
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
        if (!deliverableType.trim()) {
          setDeliverableType(
            detectedAspect === '9:16' ? `Vertical 9:16 Reel (${formattedDuration})` : `Widescreen Video (${formattedDuration})`
          );
        }
        setDetectedSpecs({
          duration: formattedDuration,
          aspect: detectedAspect,
          resolution: `${w} × ${h}px`,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        });
        message.success(`⚡ Auto-extracted: ${formattedDuration} duration, ${detectedAspect} format`);
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

        setDuration('Static');
        setAspectRatio(detectedAspect);
        setMediaType('image');

        if (!campaignTitle.trim() && cleanName) {
          setCampaignTitle(cleanName);
        }
        if (!deliverableType.trim()) {
          setDeliverableType(detectedAspect === '9:16' ? 'Vertical Story / Photo' : 'Post / Banner Image');
        }
        setDetectedSpecs({
          duration: 'Static',
          aspect: detectedAspect,
          resolution: `${w} × ${h}px`,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        });
        message.success(`⚡ Auto-extracted: ${detectedAspect} image format`);
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
        subtitle="Your brand deliverables and past work."
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
              <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Deliverables Portfolio
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
                  className={`px-3.5 py-1.5 rounded-full text-sm font-bold capitalize transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    platformFilter === tab.key
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full font-extrabold ${
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
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#73736A]">
                          {item.brandName}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0A0A0A] line-clamp-1 leading-snug">
                        {item.campaignTitle}
                      </h3>

                      {item.deliverableType && (
                        <div className="text-sm text-[#73736A] font-medium line-clamp-1">
                          {item.deliverableType}
                        </div>
                      )}
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-center">
                      <div>
                        <div className="text-xs uppercase font-bold text-[#73736A]">Views</div>
                        <div className="text-xs font-black text-[#0A0A0A]">{item.views || '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase font-bold text-[#73736A]">Likes</div>
                        <div className="text-xs font-black text-[#0A0A0A]">{item.likes || '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase font-bold text-[#73736A]">Eng. Rate</div>
                        <div className="text-xs font-black text-[#23744D]">{item.engagementRate || '—'}</div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 flex items-center justify-between border-t border-[#E7E7E2]">
                      <button
                        type="button"
                        onClick={() => handleQuickMediaReplaceClick(item.id)}
                        className="text-sm font-bold text-[#0A0A0A] hover:text-[#2563EB] flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
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
        title={
          <div className="flex items-center gap-2.5 pb-1">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-sm font-bold shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                {editingItemId ? 'Edit Client Deliverable' : 'Add Client Deliverable'}
              </div>
              <div className="text-sm text-[#73736A] font-medium">
                Showcase verified brand deliverables, production specs, and engagement metrics.
              </div>
            </div>
          </div>
        }
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={720}
        centered
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="py-2 space-y-4">
          {/* Section 1: 1-Click Autofill from Brand Deals / Orders */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-[#FAFAF8] to-emerald-50/40 border border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0A0A0A] flex items-center gap-1.5">
                  <span>1-Click Autofill from Brand Deals</span>
                  <span className="text-xs font-black uppercase tracking-wider px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                    Time Saver
                  </span>
                </div>
                <p className="text-sm text-[#73736A] mt-0.5">
                  Select a past campaign to pre-populate brand, title, platform, and brief
                </p>
              </div>
            </div>
            <Select
              placeholder="⚡ Select brand deal..."
              className="w-full sm:w-64"
              onChange={handleAutofillFromOrder}
              allowClear
              options={orders.map((o) => ({
                value: o.id,
                label: (
                  <div className="flex items-center gap-2 text-xs py-0.5">
                    <span className="font-bold text-[#0A0A0A] truncate">{o.brandName}</span>
                    <span className="text-sm text-[#73736A] truncate">({o.packageTitle})</span>
                  </div>
                ),
              }))}
            />
          </div>

          <form onSubmit={handleSaveVideo} className="space-y-4">
            {/* Section 2: Media Asset & Automated Specs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-1.5">
                  <span>Deliverable Media Asset</span>
                  <span className="text-sm text-[#73736A] font-medium">(Video or Cover Image)</span>
                </label>
                {detectedSpecs && (
                  <span className="text-sm font-bold text-[#23744D] bg-[#E8F5E9] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-detected technical specs
                  </span>
                )}
              </div>

              <input
                ref={modalMediaFileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleModalMediaUpload}
              />

              {mediaUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#0A0A0A] h-48 flex items-center justify-center group shadow-inner">
                  <img
                    src={mediaUrl}
                    alt="Deliverable preview"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90"
                  />
                  {/* Spec badges overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                      <VideoIcon className="w-3 h-3" /> {aspectRatio}
                    </span>
                    <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                      ⏱ {duration}
                    </span>
                    {detectedSpecs?.resolution && (
                      <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-emerald-600/80 text-white backdrop-blur-md">
                        {detectedSpecs.resolution}
                      </span>
                    )}
                  </div>

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <Button
                      type="default"
                      onClick={() => modalMediaFileInputRef.current?.click()}
                      className="h-9 px-4 rounded-full text-sm font-bold bg-white text-[#0A0A0A] border-none flex items-center gap-1.5 shadow-md hover:!bg-zinc-100"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace File</span>
                    </Button>
                    <Button
                      type="default"
                      danger
                      onClick={() => {
                        setMediaUrl('');
                        setDetectedSpecs(null);
                      }}
                      className="h-9 px-4 rounded-full text-sm font-bold bg-white border-none flex items-center gap-1.5 shadow-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => modalMediaFileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#FAFAF8] hover:bg-[#F5F5F0] space-y-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-white border border-[#E7E7E2] group-hover:border-[#0A0A0A] group-hover:scale-105 transition-all flex items-center justify-center mx-auto text-[#0A0A0A] shadow-2xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-[#0A0A0A]">
                    Click to upload deliverable video or cover image
                  </div>
                  <p className="text-sm text-[#73736A] max-w-sm mx-auto">
                    ⚡ <strong>Smart Auto-Extractor</strong>: Video duration, aspect ratio, and filename will be detected automatically!
                  </p>
                </div>
              )}

              {/* Collapsible raw URL option */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-sm text-[#73736A] hover:text-[#0A0A0A] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{showUrlInput ? 'Hide URL link input' : 'Paste media link instead (URL)'}</span>
                  {showUrlInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                {mediaUrl && (
                  <span className="text-xs text-[#23744D] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Media loaded & ready
                  </span>
                )}
              </div>

              {showUrlInput && (
                <div className="pt-1.5">
                  <Input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or hosted video URL"
                    className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
                    prefix={<Link2 className="w-3.5 h-3.5 text-[#73736A]" />}
                    allowClear
                  />
                </div>
              )}
            </div>

            {/* Section 3: Brand Name & Campaign Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-[#0A0A0A] block">
                  Brand / Client Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Glossier, Laneige, Dyson"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#0A0A0A] block">
                  Campaign / Content Title <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. Dewy Hydration Routine Reel"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>
            </div>

            {/* Section 4: Platform, Deliverable Format, Duration & Quick Presets */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#0A0A0A] block">Platform</label>
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
                  <label className="text-sm font-bold text-[#0A0A0A] block">Deliverable Format</label>
                  <Input
                    value={deliverableType}
                    onChange={(e) => setDeliverableType(e.target.value)}
                    placeholder="60s 4K Reel (Voiceover)"
                    className="rounded-xl h-10 font-semibold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#0A0A0A] block">Duration</label>
                    <Input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="0:45"
                      className="rounded-xl h-10 font-semibold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#0A0A0A] block">Aspect</label>
                    <Select
                      value={aspectRatio}
                      onChange={(val) => setAspectRatio(val)}
                      className="w-full h-10"
                      options={[
                        { value: '9:16', label: '9:16' },
                        { value: '16:9', label: '16:9' },
                        { value: '1:1', label: '1:1' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Platform Preset Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-sm font-bold text-[#73736A] flex items-center gap-1 mr-1">
                  <Wand2 className="w-3 h-3 text-[#0A0A0A]" /> Quick Formats:
                </span>
                {PLATFORM_PRESETS[platform]?.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      deliverableType === preset.label
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] font-bold shadow-2xs'
                        : 'bg-[#FAFAF8] text-[#52524E] border-[#E7E7E2] hover:border-[#0A0A0A] hover:text-[#0A0A0A] font-medium'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 5: Performance Metrics & Real-time Auto-Calculated Engagement Rate */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-[#0A0A0A] flex items-center gap-1.5">
                  <span>Verified Performance Metrics</span>
                  <span className="text-sm text-[#73736A] font-normal">(Views, Likes, Comments)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-[#73736A] font-medium">Auto-Calculate:</span>
                  <button
                    type="button"
                    onClick={() => setIsAutoEngRate(!isAutoEngRate)}
                    className={`text-sm font-bold px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                      isAutoEngRate
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/50'
                        : 'bg-[#E7E7E2] text-[#52524E] border border-[#D2D2CA]'
                    }`}
                  >
                    {isAutoEngRate ? (
                      <>
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Auto</span>
                      </>
                    ) : (
                      <span>Manual Edit</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Views</label>
                  <Input
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="280K"
                    className="rounded-xl h-9.5 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Likes</label>
                  <Input
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    placeholder="21.4K"
                    className="rounded-xl h-9.5 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Comments</label>
                  <Input
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="920"
                    className="rounded-xl h-9.5 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Eng. Rate</label>
                    {isAutoEngRate && (
                      <span className="text-xs font-black text-emerald-700 uppercase bg-emerald-100 px-1 rounded">
                        Live
                      </span>
                    )}
                  </div>
                  <Input
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(e.target.value)}
                    readOnly={isAutoEngRate}
                    placeholder="8.0%"
                    className={`rounded-xl h-9.5 text-sm font-bold ${
                      isAutoEngRate
                        ? 'bg-emerald-50/60 text-emerald-700 border-emerald-200 cursor-default'
                        : 'text-[#0A0A0A]'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-[#73736A] pt-0.5">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Formula: <strong>(Likes + Comments) ÷ Views × 100</strong></span>
                </span>
                {isAutoEngRate ? (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} /> Computed from metrics
                  </span>
                ) : (
                  <span className="text-xs text-amber-700 font-semibold">Custom manual value</span>
                )}
              </div>
            </div>

            {/* Section 6: Narrative Strategy & Deal Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-[#0A0A0A] block">
                  Deliverable Narrative & Strategy
                </label>
                <Input.TextArea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your hook, visual direction, audio choice, and why this deliverable drove strong conversion..."
                  className="rounded-2xl p-3 text-xs border-[#E7E7E2] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#0A0A0A] block">
                  Deal / Package Rate (€)
                </label>
                <Input
                  type="number"
                  value={packagePriceEur}
                  onChange={(e) => setPackagePriceEur(Number(e.target.value))}
                  prefix="€"
                  placeholder="1200"
                  className="rounded-xl h-10 font-bold text-sm"
                />
                <p className="text-sm text-[#73736A]">
                  Positions your production value when prospective brands view your case studies.
                </p>
              </div>
            </div>

            {/* Section 7: Modal Footer Actions */}
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
                className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{editingItemId ? 'Update Deliverable' : 'Publish to Portfolio'}</span>
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
