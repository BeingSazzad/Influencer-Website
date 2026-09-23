'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { PortfolioVideoModal } from '@/components/shared/PortfolioVideoModal';
import {
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  addCreatorPhoto,
  deleteCreatorPhoto,
} from '@/redux/slices/creatorSlice';
import { PortfolioItem, PlatformType, CreatorPhoto } from '@/types';
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
  Camera,
  MapPin,
  Calendar,
  X,
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

const PHOTO_PRESETS = [
  { label: 'Parisian Morning', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85', ratio: 'portrait' as const },
  { label: 'Studio Minimal', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85', ratio: 'portrait' as const },
  { label: 'Editorial Makeup', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85', ratio: 'portrait' as const },
  { label: 'Golden Hour Stills', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85', ratio: 'landscape' as const },
  { label: 'Skincare Flatlay', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85', ratio: 'square' as const },
  { label: 'Vogue Editorial', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85', ratio: 'portrait' as const },
];

function CreatorPortfolioContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);

  // Active creator
  const targetCreatorId = currentUser?.role === 'creator' ? currentUser.id : 'creator-01';
  const currentCreator = creators.find((c) => c.id === targetCreatorId) || creators[0];

  const portfolioList: PortfolioItem[] = currentCreator?.portfolio || [];
  const photosList: CreatorPhoto[] = currentCreator?.photos || [];

  // Tab mode: Video Works vs Photo Lookbook
  const initialTab = searchParams.get('tab');
  const [portfolioTab, setPortfolioTab] = useState<'videos' | 'photos'>(
    initialTab === 'photos' || initialTab === 'gallery' ? 'photos' : 'videos'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'photos' || tab === 'gallery') {
      setPortfolioTab('photos');
    } else if (tab === 'videos') {
      setPortfolioTab('videos');
    }
  }, [searchParams]);

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

  // Photo Lookbook Modal & States
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoRatio, setNewPhotoRatio] = useState<'portrait' | 'landscape' | 'square'>('portrait');
  const [newPhotoLocation, setNewPhotoLocation] = useState(currentCreator?.location || 'Paris, France');
  const [lightboxPhoto, setLightboxPhoto] = useState<CreatorPhoto | null>(null);

  // Calculate filtered list
  const filteredVideoList = platformFilter === 'all'
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

  const handleSaveVideo = (e: React.FormEvent) => {
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

    setIsVideoModalOpen(false);
  };

  const handleDeleteVideo = (itemId: string, brand: string) => {
    dispatch(deletePortfolioItem({ creatorId: targetCreatorId, itemId }));
    message.success(`Removed ${brand} case study from portfolio.`);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) {
      message.error('Please provide an image URL for the lookbook photo.');
      return;
    }

    const photo: CreatorPhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || `${currentCreator.name} • Lookbook Shoot`,
      category: 'photo',
      aspectRatio: newPhotoRatio,
      date: 'Recent Shoot',
      location: newPhotoLocation || currentCreator.location,
    };

    dispatch(addCreatorPhoto({ creatorId: currentCreator.id, photo }));
    message.success('New lookbook photo added to your public portfolio!');
    setIsPhotoModalOpen(false);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleDeletePhoto = (photoId: string) => {
    dispatch(deleteCreatorPhoto({ creatorId: currentCreator.id, photoId }));
    message.info('Photo removed from your public lookbook.');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Creative Portfolio Hub"
        subtitle="Manage your verified video case studies and high-resolution photo lookbook shown to brands."
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

            {portfolioTab === 'videos' ? (
              <Button
                type="primary"
                onClick={openAddVideoModal}
                className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Case Study</span>
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setNewPhotoUrl(PHOTO_PRESETS[0].url);
                  setIsPhotoModalOpen(true);
                }}
                className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lookbook Photo</span>
              </Button>
            )}
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Metric Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Video Works</span>
              <Film className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{portfolioList.length}</div>
            <div className="text-xs text-[#73736A]">Published deliverables</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Photo Lookbook</span>
              <ImageIcon className="w-4 h-4 text-[#6444A6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">{photosList.length}</div>
            <div className="text-xs text-[#73736A]">Editorial stills & shoots</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Verified Reach</span>
              <Eye className="w-4 h-4 text-[#23744D]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">2.4M+</div>
            <div className="text-xs text-[#23744D] font-bold">Total video views</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#73736A]">
              <span>Avg. Engagement</span>
              <TrendingUp className="w-4 h-4 text-[#FF2D78]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A]">7.9%</div>
            <div className="text-xs text-[#73736A]">Industry benchmark: 3.2%</div>
          </div>
        </div>

        {/* Primary Portfolio Mode Switcher */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] flex gap-1 shadow-2xs max-w-md">
          <button
            type="button"
            onClick={() => setPortfolioTab('videos')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              portfolioTab === 'videos'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Film className={`w-4 h-4 ${portfolioTab === 'videos' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Video Case Studies ({portfolioList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setPortfolioTab('photos')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              portfolioTab === 'photos'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <ImageIcon className={`w-4 h-4 ${portfolioTab === 'photos' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Photo Lookbook ({photosList.length})</span>
          </button>
        </div>

        {/* Tab 1: Video Case Studies Content */}
        {portfolioTab === 'videos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            {/* Header & Platform Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
              <div>
                <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                  Video Case Studies ({filteredVideoList.length})
                </h2>
                <p className="text-xs text-[#73736A] mt-0.5">
                  Verified deliverables showcasing your storytelling, production fidelity, and audience conversion.
                </p>
              </div>

              {/* Platform Filter Pills */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] overflow-x-auto shrink-0 max-w-full">
                {[
                  { key: 'all', label: 'All', count: portfolioList.length },
                  { key: 'instagram', label: 'Instagram', count: portfolioList.filter((i) => i.platform === 'instagram').length },
                  { key: 'tiktok', label: 'TikTok', count: portfolioList.filter((i) => i.platform === 'tiktok').length },
                  { key: 'youtube', label: 'YouTube', count: portfolioList.filter((i) => i.platform === 'youtube').length },
                  { key: 'ugc', label: 'UGC', count: portfolioList.filter((i) => i.platform === 'ugc').length },
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

            {/* Video Cards Grid */}
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
                        <div className="flex items-center gap-2">
                          {item.brandLogo && (
                            <img src={item.brandLogo} alt={item.brandName} className="w-4 h-4 rounded-full object-cover" />
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
                      <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white border border-[#E7E7E2] text-center">
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
                      <div className="pt-2 flex items-center justify-between border-t border-[#E7E7E2]">
                        <button
                          type="button"
                          onClick={() => setPreviewingItem(item)}
                          className="text-xs font-bold text-[#0A0A0A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Watch Preview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditVideoModal(item)}
                            className="p-2 rounded-xl text-[#73736A] hover:text-[#0A0A0A] hover:bg-white border border-transparent hover:border-[#E7E7E2] transition-all cursor-pointer"
                            title="Edit Case Study"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <Popconfirm
                            title="Delete Case Study"
                            description={`Remove ${item.brandName} deliverable from your portfolio?`}
                            onConfirm={() => handleDeleteVideo(item.id, item.brandName)}
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                          >
                            <button
                              type="button"
                              className="p-2 rounded-xl text-[#73736A] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer"
                              title="Delete"
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
                title="No case studies found"
                description="You haven't added any deliverables for this platform filter yet."
                primaryAction={{
                  label: 'Add First Deliverable',
                  onClick: openAddVideoModal,
                  icon: <Plus className="w-4 h-4" />,
                }}
              />
            )}
          </div>
        )}

        {/* Tab 2: Photo Lookbook & Stills Content */}
        {portfolioTab === 'photos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
              <div>
                <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                  Photo Lookbook & Editorial Stills ({photosList.length})
                </h2>
                <p className="text-xs text-[#73736A] mt-0.5">
                  Curated editorial imagery, product flatlays, and aesthetic stills showcased on your public lookbook.
                </p>
              </div>

              <Button
                type="primary"
                onClick={() => {
                  setNewPhotoUrl(PHOTO_PRESETS[0].url);
                  setIsPhotoModalOpen(true);
                }}
                className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </Button>
            </div>

            {/* Photos Grid */}
            {photosList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {photosList.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
                  >
                    {/* Image Thumbnail */}
                    <div
                      onClick={() => setLightboxPhoto(photo)}
                      className="cursor-pointer overflow-hidden relative aspect-3/4 bg-[#0A0A0A]"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/15">
                          {photo.aspectRatio || 'portrait'}
                        </span>
                      </div>

                      {photo.location && (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <span className="text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 line-clamp-1">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{photo.location}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer / Caption & Delete */}
                    <div className="p-3 bg-white border-t border-[#E7E7E2] flex items-center justify-between gap-2">
                      <div className="truncate text-xs font-bold text-[#0A0A0A]">
                        {photo.caption}
                      </div>

                      <Popconfirm
                        title="Delete Lookbook Photo"
                        description="Remove this image from your public lookbook?"
                        onConfirm={() => handleDeletePhoto(photo.id)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                      >
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-[#73736A] hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<ImageIcon className="w-8 h-8 text-[#73736A]" />}
                title="No lookbook photos uploaded"
                description="Add high-res editorial shoots, product placement photography, and aesthetic stills."
                primaryAction={{
                  label: 'Upload First Photo',
                  onClick: () => {
                    setNewPhotoUrl(PHOTO_PRESETS[0].url);
                    setIsPhotoModalOpen(true);
                  },
                  icon: <Plus className="w-4 h-4" />,
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Video Case Study Modal */}
      <Modal
        title={editingItemId ? 'Edit Case Study' : 'Add Verified Deliverable'}
        open={isVideoModalOpen}
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={720}
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="py-2">
          <form onSubmit={handleSaveVideo} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Brand Name</label>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Glossier, Rhode, Dyson"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Campaign Title</label>
                <Input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="e.g. Milky Jelly Cleanser Launch"
                  className="rounded-xl h-10 font-semibold text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Deliverable Format</label>
                <Input
                  value={deliverableType}
                  onChange={(e) => setDeliverableType(e.target.value)}
                  placeholder="60s 4K Reel with Voiceover"
                  className="rounded-xl h-10 font-semibold text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Duration</label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="0:45"
                  className="rounded-xl h-10 font-semibold text-sm"
                />
              </div>
            </div>

            {/* Media Image URL + Quick Preset Picker */}
            <div className="space-y-2 p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Media Thumbnail URL</label>
              <Input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="rounded-xl h-10 font-semibold text-sm"
                required
              />

              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Quick Presets:</span>
                <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
                  {MEDIA_PRESETS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setMediaUrl(preset.url)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#EAEAE3] border border-[#E7E7E2] text-[#0A0A0A] shrink-0 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
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
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Case Narrative & Strategy</label>
              <Input.TextArea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your hook, visual direction, and how the deliverable drove performance..."
                className="rounded-2xl p-3 text-sm"
              />
            </div>

            <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
              <Button onClick={() => setIsVideoModalOpen(false)} className="rounded-full h-10 px-5 font-bold">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 px-6 rounded-full font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm"
              >
                {editingItemId ? 'Update Case Study' : 'Publish to Portfolio'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Lookbook Photo Modal */}
      <Modal
        title="Add Lookbook Photo"
        open={isPhotoModalOpen}
        onCancel={() => setIsPhotoModalOpen(false)}
        footer={null}
        width={560}
        destroyOnClose
        className="rounded-3xl"
      >
        <div className="py-2">
          <form onSubmit={handleAddPhoto} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Photo Image URL</label>
              <Input
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="rounded-xl h-10 font-semibold text-sm"
                required
              />

              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Sample Stills:</span>
                <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
                  {PHOTO_PRESETS.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => {
                        setNewPhotoUrl(p.url);
                        setNewPhotoRatio(p.ratio);
                        setNewPhotoCaption(p.label);
                      }}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-white hover:bg-[#EAEAE3] border border-[#E7E7E2] text-[#0A0A0A] shrink-0 cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Caption</label>
              <Input
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                placeholder="e.g. Studio Editorial • Natural Glow"
                className="rounded-xl h-10 font-semibold text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Aspect Ratio</label>
                <Select
                  value={newPhotoRatio}
                  onChange={(val) => setNewPhotoRatio(val)}
                  className="w-full h-10"
                  options={[
                    { value: 'portrait', label: 'Portrait (3:4)' },
                    { value: 'landscape', label: 'Landscape (16:9)' },
                    { value: 'square', label: 'Square (1:1)' },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Location</label>
                <Input
                  value={newPhotoLocation}
                  onChange={(e) => setNewPhotoLocation(e.target.value)}
                  placeholder="Paris, France"
                  className="rounded-xl h-10 font-semibold text-sm"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
              <Button onClick={() => setIsPhotoModalOpen(false)} className="rounded-full h-10 px-5 font-bold">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 px-6 rounded-full font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none shadow-sm"
              >
                Add to Lookbook
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Lightbox Photo Preview Modal */}
      {lightboxPhoto && (
        <Modal
          open={!!lightboxPhoto}
          onCancel={() => setLightboxPhoto(null)}
          footer={null}
          width={760}
          centered
          className="rounded-3xl overflow-hidden p-0"
        >
          <div className="relative pt-4">
            <div className="max-h-[70vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="pt-4 flex items-center justify-between text-sm">
              <div>
                <h4 className="font-extrabold text-[#0A0A0A]">{lightboxPhoto.caption}</h4>
                {lightboxPhoto.location && (
                  <p className="text-xs text-[#73736A] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{lightboxPhoto.location}</span>
                  </p>
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] px-2.5 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2]">
                {lightboxPhoto.aspectRatio}
              </span>
            </div>
          </div>
        </Modal>
      )}

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
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#73736A]">Loading portfolio hub...</div>}>
      <CreatorPortfolioContent />
    </Suspense>
  );
}
