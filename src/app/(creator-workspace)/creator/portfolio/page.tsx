'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  ExternalLink,
  Eye,
  Heart,
  TrendingUp,
  Instagram,
  Youtube,
  Sparkles,
  Play,
  CheckCircle2,
  Image as ImageIcon,
  Clock,
  Layers,
  Music,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { Button, Modal, Input, InputNumber, Select, message, Popconfirm, Tag } from 'antd';

const MEDIA_PRESETS = [
  { label: 'Skincare Routine', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hair Care Story', url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80' },
  { label: 'Product Flatlay', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' },
  { label: 'Beauty Swatches', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80' },
  { label: 'Studio Showcase', url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80' },
  { label: 'Direct UGC Hook', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80' },
];

export default function CreatorPortfolioPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);

  // Active creator
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const currentCreator = creators.find((c) => c.id === targetCreatorId) || creators[0];

  const portfolioList: PortfolioItem[] = currentCreator?.portfolio || [];

  // Filter state
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformType>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [previewingItem, setPreviewingItem] = useState<PortfolioItem | null>(null);

  // Form states
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

  // Calculate high-level stats
  const totalCampaigns = portfolioList.length;
  const filteredList = platformFilter === 'all'
    ? portfolioList
    : portfolioList.filter((item) => item.platform === platformFilter);

  const openAddModal = () => {
    setEditingItemId(null);
    setBrandName('');
    setBrandLogo('');
    setCampaignTitle('');
    setPlatform('instagram');
    setDeliverableType('60s 4K Reel with Voiceover');
    setMediaType('video');
    setMediaUrl(MEDIA_PRESETS[0].url);
    setAspectRatio('9:16');
    setDuration('0:45');
    setViews('280K');
    setLikes('21.4K');
    setComments('920');
    setEngagementRate('8.2%');
    setDescription('High-converting product demonstration with seamless hook and authentic narrative.');
    setSoundTrack('Original Audio • Voiceover');
    setPackagePriceEur(1100);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
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
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !campaignTitle.trim() || !mediaUrl.trim()) {
      message.error('Please complete the brand name, campaign title, and media image URL.');
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
      message.success(`Updated case study for ${brandName}!`);
    } else {
      dispatch(addPortfolioItem({ creatorId: targetCreatorId, item: payload }));
      message.success(`Published new case study for ${brandName} to your profile!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (itemId: string, brand: string) => {
    dispatch(deletePortfolioItem({ creatorId: targetCreatorId, itemId }));
    message.success(`Removed ${brand} case study from portfolio.`);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Work Gallery & Case Studies"
        subtitle="Manage verified campaign deliverables and metrics shown on your public profile."
        action={
          <div className="flex items-center gap-2.5">
            <Link href={`/creators/${targetCreatorId}`} target="_blank">
              <Button
                type="default"
                className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
              >
                <span>View Public Profile</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              type="primary"
              onClick={openAddModal}
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Case Study</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Metric Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Case Studies</span>
              <Layers className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{totalCampaigns}</div>
            <div className="text-xs text-[#73736A]">Published on public profile</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Verified Reach</span>
              <Eye className="w-4 h-4 text-[#23744D]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">2.4M+</div>
            <div className="text-xs text-[#23744D] font-bold">Total video views across brands</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Avg. Engagement</span>
              <TrendingUp className="w-4 h-4 text-[#FF2D78]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">7.9%</div>
            <div className="text-xs text-[#73736A]">Industry benchmark: 3.2%</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Channels</span>
              <Film className="w-4 h-4 text-[#6444A6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">4 Active</div>
            <div className="text-xs text-[#73736A]">IG, TikTok, YouTube & UGC</div>
          </div>
        </div>

        {/* Management Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          {/* Header & Platform Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
            <div>
              <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                Case Study Cards ({filteredList.length})
              </h2>
              <p className="text-xs text-[#73736A] mt-0.5">
                Brand partners review these deliverables to evaluate your visual tone, production craft, and ROI.
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
                  label: 'UGC',
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

          {/* Cards Grid */}
          {filteredList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map((item) => (
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
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
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
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-base text-[#0A0A0A]">
                          {item.brandName}
                        </h3>
                        <span className="text-xs font-black text-[#23744D] bg-[#EEF7F2] px-2.5 py-0.5 rounded-md border border-[#23744D]/15">
                          {item.views} Views
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-[#0A0A0A] line-clamp-1">
                        {item.campaignTitle}
                      </p>

                      {item.deliverableType && (
                        <p className="text-xs text-[#73736A] font-medium line-clamp-1">
                          {item.deliverableType}
                        </p>
                      )}
                    </div>

                    {/* Performance metrics pill */}
                    <div className="py-2.5 px-3 rounded-2xl bg-white border border-[#E7E7E2] flex items-center justify-between text-xs font-bold text-[#73736A]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[#0A0A0A]">
                          <Heart className="w-3.5 h-3.5 text-[#FF2D78]" />
                          {item.likes}
                        </span>
                        {item.engagementRate && (
                          <span className="flex items-center gap-1 text-[#23744D]">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {item.engagementRate}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-[#8C8C85]">{item.aspectRatio || '9:16'}</span>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewingItem(item)}
                        className="text-xs font-bold text-[#73736A] hover:text-[#0A0A0A] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="h-8 px-3 rounded-full text-xs font-bold bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-zinc-50 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <Popconfirm
                          title="Remove this case study?"
                          description="It will be immediately removed from your public creator profile."
                          onConfirm={() => handleDelete(item.id, item.brandName)}
                          okText="Delete"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                            title="Delete case study"
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
              color="neutral"
              icon={<Film className="w-8 h-8" />}
              badge="Portfolio"
              title="No Case Studies in this Filter"
              description="No campaigns found for this selected channel. Add a new brand showcase or reset your filter."
              primaryAction={{
                label: 'Add New Case Study',
                onClick: openAddModal,
                icon: <Plus className="w-4 h-4" />,
              }}
              variant="dashed"
            />
          )}
        </div>
      </div>

      {/* Senior-Level Add / Edit Modal with Real-Time Card Preview */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={960}
        centered
        className="rounded-3xl overflow-hidden font-sans"
      >
        <div className="p-2 sm:p-4 space-y-6">
          <div className="pb-4 border-b border-[#E7E7E2]">
            <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
              {editingItemId ? `Edit Case Study: ${brandName || 'Campaign'}` : 'Add New Brand Case Study'}
            </h2>
            <p className="text-xs text-[#73736A] mt-0.5">
              Highlight your top campaign deliverables, verified engagement, and brand impact.
            </p>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Fields Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Brand Name & Campaign Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Brand Name *
                  </label>
                  <Input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Laneige, Gisou, Rhode"
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Platform Channel *
                  </label>
                  <Select
                    value={platform}
                    onChange={(val) => setPlatform(val)}
                    className="w-full h-10 font-bold"
                    options={[
                      { value: 'instagram', label: 'Instagram (Reel / Story / Post)' },
                      { value: 'tiktok', label: 'TikTok (Sound Video / UGC)' },
                      { value: 'youtube', label: 'YouTube (Mid-Roll / Dedicated)' },
                      { value: 'ugc', label: 'UGC Direct Response' },
                    ]}
                  />
                </div>
              </div>

              {/* Campaign Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  Campaign Title *
                </label>
                <Input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. Dewy Glaze Hydration Routine Reel"
                  className="rounded-xl h-10 text-sm font-semibold"
                  required
                />
              </div>

              {/* Deliverable Format & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Deliverable Format
                  </label>
                  <Input
                    value={deliverableType}
                    onChange={(e) => setDeliverableType(e.target.value)}
                    placeholder="e.g. 60s 4K Reel with Voiceover"
                    className="rounded-xl h-10 text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                    Duration / Length
                  </label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 0:45, 11:45, Carousel"
                    className="rounded-xl h-10 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Media URL with Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center justify-between">
                  <span>Cover / Media Image URL *</span>
                  <span className="text-[11px] text-[#8C8C85] font-normal">Direct PNG/JPG/WebP link</span>
                </label>
                <Input
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="rounded-xl h-10 text-sm font-mono"
                  required
                />
                {/* Preset Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-[#73736A] font-bold mr-1">Quick Presets:</span>
                  {MEDIA_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setMediaUrl(preset.url)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                        mediaUrl === preset.url
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                          : 'bg-[#FAFAF8] text-[#555550] border-[#E7E7E2] hover:border-[#0A0A0A]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Metrics Row (Views, Likes, Engagement) */}
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                  Verified Campaign Telemetry
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#73736A]">Total Views</label>
                    <Input
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                      placeholder="320K"
                      className="rounded-xl text-xs font-bold text-center h-9"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#73736A]">Likes</label>
                    <Input
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                      placeholder="28.4K"
                      className="rounded-xl text-xs font-bold text-center h-9"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#73736A]">Engagement</label>
                    <Input
                      value={engagementRate}
                      onChange={(e) => setEngagementRate(e.target.value)}
                      placeholder="8.9%"
                      className="rounded-xl text-xs font-bold text-center h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Case Study Context Narrative */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  Campaign Strategy & Results Brief
                </label>
                <Input.TextArea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the campaign brief, product hook, and conversion outcome..."
                  className="rounded-xl text-xs font-medium"
                />
              </div>

              {/* Submit / Action Buttons */}
              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end gap-3">
                <Button
                  type="default"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-5 rounded-full font-bold text-xs"
                >
                  Cancel
                </Button>

                <button
                  type="submit"
                  className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingItemId ? 'Save Changes' : 'Publish Case Study'}</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Preview Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-start space-y-3 bg-[#FAFAF8] p-5 rounded-3xl border border-[#E7E7E2]">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#73736A] flex items-center gap-1.5 self-start">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
                <span>Live Public Card Preview</span>
              </div>

              {/* Mockup Card */}
              <div className="w-full rounded-3xl overflow-hidden border border-[#E7E7E2] bg-white shadow-sm flex flex-col justify-between">
                <div className="h-44 overflow-hidden relative bg-[#0A0A0A]">
                  <img
                    src={mediaUrl || MEDIA_PRESETS[0].url}
                    alt={campaignTitle || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = MEDIA_PRESETS[0].url;
                    }}
                  />

                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
                      {platform === 'instagram' && <Instagram className="w-3 h-3 text-[#FF2D78]" />}
                      {platform === 'tiktok' && <Film className="w-3 h-3 text-white" />}
                      {platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                      {platform === 'ugc' && <Sparkles className="w-3 h-3 text-purple-400" />}
                      <span>{platform}</span>
                    </span>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/10">
                      {duration || '0:45'}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#0A0A0A] flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-[#0A0A0A]">
                      {brandName || 'Brand Name'}
                    </h4>
                    <span className="text-[11px] font-extrabold text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-md">
                      {views || '0'} Views
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#0A0A0A] line-clamp-1">
                    {campaignTitle || 'Campaign Title'}
                  </p>

                  <p className="text-[11px] text-[#73736A] font-medium line-clamp-1">
                    {deliverableType || '60s 4K Reel with Voiceover'}
                  </p>

                  <div className="pt-2 border-t border-[#E7E7E2] flex items-center justify-between text-[11px] font-bold text-[#73736A]">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1 text-[#0A0A0A]">
                        <Heart className="w-3 h-3 text-[#FF2D78]" />
                        {likes || '0'}
                      </span>
                      <span className="flex items-center gap-1 text-[#23744D]">
                        <TrendingUp className="w-3 h-3" />
                        {engagementRate || '0%'}
                      </span>
                    </div>

                    <span className="text-[#0A0A0A] font-extrabold flex items-center gap-0.5">
                      <span>Preview</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#73736A] text-center font-medium">
                Changes persist live in your workspace and update your public profile instantly.
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Case Study Full Lightbox Preview Modal */}
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
