'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile } from '@/redux/slices/authSlice';
import {
  updateCreatorProfileDetails,
  addCreatorPhoto,
  updateCreatorPhoto,
  deleteCreatorPhoto,
} from '@/redux/slices/creatorSlice';
import { CreatorPhoto } from '@/types';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { CreatorPhotoLightbox } from '@/components/shared/CreatorPhotoLightbox';
import { ImageUpload } from '@/components/shared/ImageUpload';
import {
  User,
  Globe,
  Instagram,
  Youtube,
  Film,
  ExternalLink,
  Save,
  Share2,
  DollarSign,
  TrendingUp,
  MapPin,
  AtSign,
  Sparkles,
  Camera,
  Layers,
  ArrowRight,
  Upload,
  X,
  Check,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Eye,
  Mail,
  Phone,
  ShieldCheck,
  ZoomIn,
} from 'lucide-react';
import { Input, Button, message, Modal, Select, Popconfirm, Tag } from 'antd';

function CreatorProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators.find((c) => c.id === currentUser?.id) || creators[0];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'identity' | 'gallery' | 'channels'>(
    initialTab === 'gallery' || initialTab === 'photos'
      ? 'gallery'
      : initialTab === 'channels'
      ? 'channels'
      : 'identity'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'channels' || tab === 'identity' || tab === 'gallery' || tab === 'photos') {
      setActiveTab(tab === 'photos' ? 'gallery' : (tab as any));
    }
  }, [searchParams]);

  // Profile Form States
  const [name, setName] = useState(currentCreator?.name || 'Sophie Kim');
  const [handle, setHandle] = useState(currentCreator?.handle?.replace('@', '') || 'sophiekim');
  const [avatar, setAvatar] = useState(
    currentCreator?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [bio, setBio] = useState(
    currentCreator?.bio ||
      'I create authentic, relatable content about beauty, wellness and everyday life. I love working with brands that share my values and believe in meaningful, long-term partnerships.'
  );
  const [location, setLocation] = useState(currentCreator?.location || 'Los Angeles, CA');
  const [startingPriceEur, setStartingPriceEur] = useState(currentCreator?.startingPriceEur || 500);
  const [aestheticVibe, setAestheticVibe] = useState(
    currentCreator?.aestheticVibe || 'Clean Minimalist · Warm Sun-Drenched Natural Glow'
  );
  const [categories, setCategories] = useState<string[]>(
    currentCreator?.categories && currentCreator.categories.length > 0
      ? currentCreator.categories
      : ['Beauty', 'Lifestyle', 'Fashion']
  );
  const [tags, setTags] = useState<string[]>(
    currentCreator?.tags && currentCreator.tags.length > 0
      ? currentCreator.tags
      : ['Beauty', 'Lifestyle', 'Self Care', 'Skincare', 'Wellness']
  );
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [contactEmail, setContactEmail] = useState(currentCreator?.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(currentCreator?.contactPhone || '');

  // Aesthetic Gallery States
  const photosList: CreatorPhoto[] = currentCreator?.photos || [];
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<CreatorPhoto | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCategory, setPhotoCategory] = useState<string>('lifestyle');
  const [photoLocation, setPhotoLocation] = useState(currentCreator?.location || 'Los Angeles, CA');
  const [photoDate, setPhotoDate] = useState('February 2026');
  const [photoTags, setPhotoTags] = useState('Clean Beauty, Aesthetic');
  const [lightboxPhoto, setLightboxPhoto] = useState<CreatorPhoto | null>(null);

  // Quick Photo File Inputs
  const modalPhotoFileInputRef = React.useRef<HTMLInputElement>(null);
  const quickReplaceInputRef = React.useRef<HTMLInputElement>(null);
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);

  // Social Stats Form States
  const [igHandle, setIgHandle] = useState(currentCreator?.platforms?.instagram?.handle || '@sophiekim');
  const [igFollowers, setIgFollowers] = useState(currentCreator?.platforms?.instagram?.followersFormatted || '1.2M');
  const [igEngagement, setIgEngagement] = useState(currentCreator?.platforms?.instagram?.engagementRate || '4.8%');

  const [ttHandle, setTtHandle] = useState(currentCreator?.platforms?.tiktok?.handle || '@sophie.kim');
  const [ttFollowers, setTtFollowers] = useState(currentCreator?.platforms?.tiktok?.followersFormatted || '680K');
  const [ttEngagement, setTtEngagement] = useState(currentCreator?.platforms?.tiktok?.engagementRate || '8.2%');

  const [ytHandle, setYtHandle] = useState(currentCreator?.platforms?.youtube?.handle || 'Sophie Kim Vlogs');
  const [ytFollowers, setYtFollowers] = useState(currentCreator?.platforms?.youtube?.followersFormatted || '210K');

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setAvatar(result);
        message.success('Portrait photo updated!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Gallery Handlers
  const openAddPhotoModal = () => {
    setEditingPhoto(null);
    setPhotoUrl('');
    setPhotoCaption('');
    setPhotoCategory('lifestyle');
    setPhotoLocation(currentCreator?.location || 'Los Angeles, CA');
    setPhotoDate('February 2026');
    setPhotoTags('Aesthetic, Lifestyle');
    setIsPhotoModalOpen(true);
  };

  const openEditPhotoModal = (photo: CreatorPhoto) => {
    setEditingPhoto(photo);
    setPhotoUrl(photo.url);
    setPhotoCaption(photo.caption || '');
    setPhotoCategory(photo.category || 'lifestyle');
    setPhotoLocation(photo.location || currentCreator?.location || '');
    setPhotoDate(photo.date || '');
    setPhotoTags(photo.tags?.join(', ') || '');
    setIsPhotoModalOpen(true);
  };

  const handleModalPhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        message.success('Image loaded into gallery photo form!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQuickReplaceClick = (photoId: string) => {
    setReplacingPhotoId(photoId);
    quickReplaceInputRef.current?.click();
  };

  const handleQuickFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingPhotoId) return;
    if (!file.type.startsWith('image/')) {
      message.error('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const existing = photosList.find((p) => p.id === replacingPhotoId);
        if (existing) {
          dispatch(
            updateCreatorPhoto({
              creatorId: currentCreator.id,
              photo: { ...existing, url: result },
            })
          );
          message.success('Gallery photo image replaced successfully!');
        }
      }
      setReplacingPhotoId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) {
      message.error('Please upload an image or provide an image URL.');
      return;
    }
    const tagList = photoTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPhoto) {
      const updated: CreatorPhoto = {
        ...editingPhoto,
        url: photoUrl.trim(),
        caption: photoCaption.trim() || `${currentCreator.name} • Lookbook`,
        category: photoCategory as any,
        location: photoLocation.trim(),
        date: photoDate.trim(),
        tags: tagList,
      };
      dispatch(updateCreatorPhoto({ creatorId: currentCreator.id, photo: updated }));
      message.success('Gallery photo updated.');
    } else {
      const newPhoto: CreatorPhoto = {
        id: `photo-${Date.now()}`,
        url: photoUrl.trim(),
        caption: photoCaption.trim() || `${currentCreator.name} • Lookbook Shoot`,
        category: photoCategory as any,
        location: photoLocation.trim() || currentCreator?.location,
        date: photoDate.trim() || 'Recent Shoot',
        tags: tagList,
      };
      dispatch(addCreatorPhoto({ creatorId: currentCreator.id, photo: newPhoto }));
      message.success('New aesthetic photo added to your profile gallery!');
    }
    setIsPhotoModalOpen(false);
  };

  const handleDeletePhoto = (photoId: string) => {
    dispatch(deleteCreatorPhoto({ creatorId: currentCreator.id, photoId }));
    message.success('Photo removed from your profile gallery.');
  };

  const handleRemoveCategory = (catToRemove: string) => {
    setCategories(categories.filter((c) => c !== catToRemove));
  };

  const handleAddCategory = (val: string) => {
    const trimmed = val.trim().replace(/^,+|,+$/g, '');
    if (!trimmed) return;
    const items = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    const updated = Array.from(new Set([...categories, ...items]));
    setCategories(updated);
    setNewCategoryInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = (val: string) => {
    const trimmed = val.trim().replace(/^,+|,+$/g, '');
    if (!trimmed) return;
    const items = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    const updated = Array.from(new Set([...tags, ...items]));
    setTags(updated);
    setNewTagInput('');
  };

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !handle.trim()) {
      message.error('Name and username handle are required.');
      return;
    }

    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;

    const updates = {
      name: name.trim(),
      handle: cleanHandle,
      avatar,
      bio: bio.trim(),
      location: location.trim(),
      startingPriceEur: Number(startingPriceEur) || 500,
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      categories: categories,
      tags: tags,
      platforms: {
        ...currentCreator.platforms,
        instagram: currentCreator.platforms.instagram
          ? {
              ...currentCreator.platforms.instagram,
              handle: igHandle.trim(),
              followersFormatted: igFollowers.trim(),
              engagementRate: igEngagement.trim(),
            }
          : {
              followers: 1200000,
              followersFormatted: igFollowers.trim(),
              handle: igHandle.trim(),
              engagementRate: igEngagement.trim(),
              avgViews: '145K',
            },
        tiktok: currentCreator.platforms.tiktok
          ? {
              ...currentCreator.platforms.tiktok,
              handle: ttHandle.trim(),
              followersFormatted: ttFollowers.trim(),
              engagementRate: ttEngagement.trim(),
            }
          : {
              followers: 680000,
              followersFormatted: ttFollowers.trim(),
              handle: ttHandle.trim(),
              engagementRate: ttEngagement.trim(),
              avgViews: '320K',
            },
        youtube: currentCreator.platforms.youtube
          ? {
              ...currentCreator.platforms.youtube,
              handle: ytHandle.trim(),
              followersFormatted: ytFollowers.trim(),
            }
          : {
              followers: 210000,
              followersFormatted: ytFollowers.trim(),
              handle: ytHandle.trim(),
              engagementRate: '3.4%',
              avgViews: '85K',
            },
      },
    };

    dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates }));
    dispatch(
      updateUserProfile({
        name: name.trim(),
        handle: `@${cleanHandle}`,
        avatar,
        location: location.trim(),
        bio: bio.trim(),
      })
    );

    message.success('Public profile updated live on the marketplace!');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Public Profile & Identity"
        subtitle="Manage your marketplace storefront, editorial bio, starting rate, and verified channels."
        action={
          <div className="flex items-center gap-2.5">
            <Button
              type="default"
              onClick={() => setIsShareModalOpen(true)}
              className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
            >
              <Share2 className="w-4 h-4 text-[#0A0A0A]" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button
                type="default"
                className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
              >
                <span>Preview</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              type="primary"
              onClick={() => handleSaveProfile()}
              className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] inline-flex items-center gap-1 shadow-2xs w-fit max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <User className={`w-4 h-4 shrink-0 ${activeTab === 'identity' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Profile Identity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <ImageIcon className={`w-4 h-4 shrink-0 ${activeTab === 'gallery' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Gallery</span>
            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-[#E7E7E2] text-[#0A0A0A]'
              }`}
            >
              {photosList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('channels')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'channels'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Globe className={`w-4 h-4 shrink-0 ${activeTab === 'channels' ? 'text-white' : 'text-[#73736A]'}`} />
            <span className="whitespace-nowrap">Channels</span>
          </button>
        </div>

        {/* Tab 1: Profile Identity */}
        {activeTab === 'identity' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E7E2] shadow-2xs space-y-7 max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Identity &amp; Appearance
                  </h2>
                  <p className="text-xs sm:text-sm text-[#73736A] mt-1">
                    Manage how brands see you.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF5FF] text-[#1E40AF] text-sm font-semibold border border-[#BFDBFE] shrink-0">
                  <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Verified Creator</span>
                </div>
              </div>

              {/* Portrait photo Section */}
              <div className="flex items-center gap-5 sm:gap-6 pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-[#FAFAF8] border border-[#E7E7E2] shrink-0 shadow-2xs">
                  {avatar ? (
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A3A39C] font-bold text-lg bg-[#F4F4F0]">
                      {name.charAt(0) || 'U'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm sm:text-2xl font-extrabold text-[#0A0A0A]">Portrait photo</h4>
                    <p className="text-sm text-[#73736A] mt-0.5">PNG, JPG or WEBP · Max 10 MB</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-9 px-3.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#0A0A0A]" />
                      <span>Upload new</span>
                    </button>

                    {avatar && (
                      <button
                        type="button"
                        onClick={() => setAvatar('')}
                        className="text-xs sm:text-sm font-medium text-[#73736A] hover:text-rose-600 transition-colors cursor-pointer px-1 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E7E7E2]" />

              {/* Basic information Section */}
              <div className="space-y-4">
                <h3 className="text-sm sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Basic information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Full name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="Sophie Kim"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Username</label>
                    <Input
                      prefix={<span className="text-[#73736A] text-sm font-medium mr-0.5">@</span>}
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="sophiekim"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Location</label>
                    <Input
                      prefix={<MapPin className="w-4 h-4 text-[#73736A] mr-0.5" />}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="Los Angeles, CA"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Starting rate (EUR)</label>
                    <Input
                      prefix={<span className="text-[#73736A] text-sm font-medium mr-0.5">€</span>}
                      type="number"
                      value={startingPriceEur}
                      onChange={(e) => setStartingPriceEur(Number(e.target.value) || 0)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Contact email</label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="collabs@yourname.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Contact phone</label>
                    <Input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="+1 (555) 234-5678"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E7E7E2]" />

              {/* Creator details Section */}
              <div className="space-y-5">
                <h3 className="text-sm sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Creator details
                </h3>

                {/* Niches and Specialty Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Primary Niches */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">
                      Primary niches (comma-separated)
                    </label>
                    <div className="min-h-[46px] rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus-within:border-[#0A0A0A] bg-white p-2 flex flex-wrap items-center gap-1.5 transition-all shadow-2xs">
                      {categories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold text-[#0A0A0A]"
                        >
                          <span>{cat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(cat)}
                            className="text-[#73736A] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder={categories.length === 0 ? "Type and press Enter or comma..." : "+ Add"}
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddCategory(newCategoryInput);
                          } else if (e.key === 'Backspace' && !newCategoryInput && categories.length > 0) {
                            handleRemoveCategory(categories[categories.length - 1]);
                          }
                        }}
                        onBlur={() => {
                          if (newCategoryInput.trim()) {
                            handleAddCategory(newCategoryInput);
                          }
                        }}
                        className="outline-none text-xs bg-transparent min-w-[70px] flex-1 text-[#0A0A0A] placeholder-[#A3A39C] px-1 py-0.5 font-medium"
                      />
                    </div>
                  </div>

                  {/* Specialty Tags */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">
                      Specialty tags (comma-separated)
                    </label>
                    <div className="min-h-[46px] rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus-within:border-[#0A0A0A] bg-white p-2 flex flex-wrap items-center gap-1.5 transition-all shadow-2xs">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold text-[#0A0A0A]"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-[#73736A] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder={tags.length === 0 ? "Type and press Enter or comma..." : "+ Add"}
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddTag(newTagInput);
                          } else if (e.key === 'Backspace' && !newTagInput && tags.length > 0) {
                            handleRemoveTag(tags[tags.length - 1]);
                          }
                        }}
                        onBlur={() => {
                          if (newTagInput.trim()) {
                            handleAddTag(newTagInput);
                          }
                        }}
                        className="outline-none text-xs bg-transparent min-w-[70px] flex-1 text-[#0A0A0A] placeholder-[#A3A39C] px-1 py-0.5 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Editorial Bio */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-[#52524E]">Editorial bio</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="I create authentic, relatable content about beauty, wellness and everyday life. I love working with brands that share my values and believe in meaningful, long-term partnerships."
                    className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
                  />
                  <div className="text-right text-sm text-[#73736A] mt-1 font-medium">
                    {bio.length} characters
                  </div>
                </div>
              </div>



              {/* Save Button */}
              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save profile</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Aesthetic Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E2]">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Gallery
                  </h2>
                  <p className="text-xs sm:text-sm text-[#73736A] mt-1 font-medium">
                    Manage your photo gallery for brand visibility.
                  </p>
                </div>

                <Button
                  type="primary"
                  onClick={openAddPhotoModal}
                  className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </Button>
              </div>

              {/* Hidden file input for quick image replacement */}
              <input
                ref={quickReplaceInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleQuickFileChosen}
              />

              {/* Photos Grid */}
              {photosList.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center mx-auto text-[#73736A]">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-[#0A0A0A]">No Gallery Photos Yet</h3>
                    <p className="text-sm text-[#73736A] max-w-sm mx-auto">
                      Add editorial shoots, lifestyle portraits, or behind-the-scenes visuals to make your creator profile stand out.
                    </p>
                  </div>
                  <Button
                    type="primary"
                    onClick={openAddPhotoModal}
                    className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white"
                  >
                    Upload First Photo
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photosList.map((photo) => (
                    <div
                      key={photo.id}
                      className="rounded-3xl border border-[#E7E7E2] bg-[#FAFAF8] overflow-hidden hover:border-[#0A0A0A] hover:shadow-md transition-all duration-200 flex flex-col group"
                    >
                      {/* Photo Image with Lightbox Trigger */}
                      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 cursor-pointer">
                        <img
                          src={photo.url}
                          alt={photo.caption || 'Creator gallery photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onClick={() => setLightboxPhoto(photo)}
                        />



                        {/* Hover Overlay */}
                        <div
                          onClick={() => setLightboxPhoto(photo)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        >
                          <div className="px-4 py-2 rounded-full bg-white/95 text-[#0A0A0A] font-bold text-xs flex items-center gap-2 shadow-lg scale-95 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-4 h-4 text-[#FF2D78]" />
                            <span>View Fullscreen</span>
                          </div>
                        </div>
                      </div>

                      {/* Photo Details */}
                      <div className="p-4 bg-white">
                        <h4 className="font-extrabold text-sm text-[#0A0A0A] line-clamp-2 leading-snug">
                          {photo.caption || 'Editorial Shoot'}
                        </h4>

                        {/* Actions Toolbar */}
                        <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-between gap-2">
                          {/* Replace Image Button */}
                          <button
                            type="button"
                            onClick={() => handleQuickReplaceClick(photo.id)}
                            className="text-sm font-bold text-[#0A0A0A] hover:text-[#2563EB] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Replace this photo with a new image"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {/* Edit Details Button */}
                            <button
                              type="button"
                              onClick={() => openEditPhotoModal(photo)}
                              className="text-sm font-bold text-[#0A0A0A] hover:text-[#0A0A0A] p-2 rounded-lg hover:bg-[#FAFAF8] transition-colors cursor-pointer"
                              title="Edit photo details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <Popconfirm
                              title="Remove Photo"
                              description="Are you sure you want to delete this photo from your gallery?"
                              onConfirm={() => handleDeletePhoto(photo.id)}
                              okText="Delete"
                              cancelText="Cancel"
                              okButtonProps={{ danger: true }}
                            >
                              <button
                                type="button"
                                className="text-sm font-bold text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete photo"
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
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Connected Channels */}
        {activeTab === 'channels' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Connected Channels & Audience Reach</h2>
                <p className="text-sm text-[#73736A] mt-0.5">Verified follower metrics and engagement benchmarks shown to brand marketing managers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Instagram */}
                <div className="p-5 rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                      <Instagram className="w-5 h-5 text-[#FF2D78]" />
                      <span>Instagram</span>
                    </div>
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Account Handle</label>
                      <Input
                        value={igHandle}
                        onChange={(e) => setIgHandle(e.target.value)}
                        className="rounded-xl h-9 text-sm font-semibold"
                        placeholder="@sophiekim"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Followers</label>
                        <Input
                          value={igFollowers}
                          onChange={(e) => setIgFollowers(e.target.value)}
                          className="rounded-xl h-9 text-sm font-semibold"
                          placeholder="1.2M"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Engagement</label>
                        <Input
                          value={igEngagement}
                          onChange={(e) => setIgEngagement(e.target.value)}
                          className="rounded-xl h-9 text-sm font-semibold"
                          placeholder="4.8%"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TikTok */}
                <div className="p-5 rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                      <Film className="w-5 h-5 text-[#0A0A0A]" />
                      <span>TikTok</span>
                    </div>
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Account Handle</label>
                      <Input
                        value={ttHandle}
                        onChange={(e) => setTtHandle(e.target.value)}
                        className="rounded-xl h-9 text-sm font-semibold"
                        placeholder="@sophie.kim"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Followers</label>
                        <Input
                          value={ttFollowers}
                          onChange={(e) => setTtFollowers(e.target.value)}
                          className="rounded-xl h-9 text-sm font-semibold"
                          placeholder="680K"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Engagement</label>
                        <Input
                          value={ttEngagement}
                          onChange={(e) => setTtEngagement(e.target.value)}
                          className="rounded-xl h-9 text-sm font-semibold"
                          placeholder="8.2%"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* YouTube */}
                <div className="p-5 rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span>YouTube</span>
                    </div>
                    <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Channel Handle</label>
                      <Input
                        value={ytHandle}
                        onChange={(e) => setYtHandle(e.target.value)}
                        className="rounded-xl h-9 text-sm font-semibold"
                        placeholder="Sophie Kim Vlogs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#73736A] uppercase tracking-wider">Subscribers</label>
                      <Input
                        value={ytFollowers}
                        onChange={(e) => setYtFollowers(e.target.value)}
                        className="rounded-xl h-9 text-sm font-semibold"
                        placeholder="210K"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="h-11 px-6 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Channels</span>
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={currentCreator?.name || 'Creator Profile'}
        subtitle={`@${currentCreator?.handle?.replace('@', '')} • ${currentCreator?.categories?.[0] || 'Creator'}`}
        shareUrl={`/creators/${currentCreator?.id}`}
        avatar={currentCreator?.avatar}
        role="creator"
      />

      {/* Add / Edit Gallery Photo Modal */}
      <Modal
        title={editingPhoto ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
        open={isPhotoModalOpen}
        onCancel={() => setIsPhotoModalOpen(false)}
        footer={null}
        width={560}
        className="rounded-3xl"
      >
        <form onSubmit={handleSavePhoto} className="space-y-4 pt-2">
          {/* Image Upload / Preview */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#0A0A0A] block">Photo Image</label>
            <input
              ref={modalPhotoFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleModalPhotoFileUpload}
            />

            {photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] h-48 flex items-center justify-center group">
                <img src={photoUrl} alt="Photo preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="default"
                    onClick={() => modalPhotoFileInputRef.current?.click()}
                    className="h-9 px-3 rounded-full text-sm font-bold bg-white text-[#0A0A0A] border-none flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Different</span>
                  </Button>
                  <Button
                    type="default"
                    danger
                    onClick={() => setPhotoUrl('')}
                    className="h-9 px-3 rounded-full text-sm font-bold bg-white border-none flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => modalPhotoFileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#FAFAF8] space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#E7E7E2] flex items-center justify-center mx-auto text-[#0A0A0A]">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-[#0A0A0A]">Click to upload an image</div>
                <div className="text-sm text-[#73736A]">Supports PNG, JPG, WEBP up to 10MB</div>
              </div>
            )}

            {/* Direct Image URL Option */}
            <div className="pt-1">
              <Input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Or paste high-res image URL (https://...)"
                className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="text-sm font-bold text-[#0A0A0A] block mb-1">Photo Caption / Title</label>
            <Input
              value={photoCaption}
              onChange={(e) => setPhotoCaption(e.target.value)}
              placeholder="e.g. Paris Fashion Week Street Style • Natural Light"
              className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-bold text-[#0A0A0A] block mb-1">Visual Category</label>
              <Select
                value={photoCategory}
                onChange={(v) => setPhotoCategory(v)}
                className="w-full h-10"
                options={[
                  { label: 'Lifestyle', value: 'lifestyle' },
                  { label: 'Headshot & Portrait', value: 'headshot' },
                  { label: 'Modeling & Fashion', value: 'modeling' },
                  { label: 'Behind The Scenes (BTS)', value: 'bts' },
                  { label: 'Studio Shoot', value: 'studio' },
                  { label: 'Outdoors & Travel', value: 'outdoors' },
                ]}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#0A0A0A] block mb-1">Location</label>
              <Input
                value={photoLocation}
                onChange={(e) => setPhotoLocation(e.target.value)}
                placeholder="e.g. Los Angeles, CA"
                className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
              />
            </div>
          </div>

          {/* Date & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-bold text-[#0A0A0A] block mb-1">Shoot Date</label>
              <Input
                value={photoDate}
                onChange={(e) => setPhotoDate(e.target.value)}
                placeholder="e.g. February 2026"
                className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#0A0A0A] block mb-1">Style Tags (comma-separated)</label>
              <Input
                value={photoTags}
                onChange={(e) => setPhotoTags(e.target.value)}
                placeholder="e.g. Clean Beauty, Minimalist"
                className="rounded-xl h-10 text-sm font-medium border-[#E7E7E2]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <Button
              type="default"
              onClick={() => setIsPhotoModalOpen(false)}
              className="h-10 px-4 rounded-full font-bold text-xs"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 text-white border-none cursor-pointer"
            >
              {editingPhoto ? 'Save Changes' : 'Add to Gallery'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Full-resolution Photo Lightbox */}
      <CreatorPhotoLightbox
        photo={lightboxPhoto}
        photos={photosList}
        creator={currentCreator}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(p) => setLightboxPhoto(p)}
        onBookCampaign={() => {}}
      />
    </div>
  );
}

export default function CreatorProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-[#73736A]">Loading profile studio...</div>}>
      <CreatorProfileContent />
    </Suspense>
  );
}
