'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile, logout } from '@/redux/slices/authSlice';
import {
  updateCreatorProfileDetails,
  addCreatorPhoto,
  deleteCreatorPhoto,
} from '@/redux/slices/creatorSlice';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { EmptyState } from '@/components/shared/EmptyState';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { CreatorPhoto } from '@/types';
import {
  User,
  Shield,
  Lock,
  KeyRound,
  Instagram,
  Youtube,
  Film,
  Sparkles,
  Camera,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Save,
  Globe,
  Tag,
  Palette,
  Image as ImageIcon,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  LogOut,
  Check,
  Share2,
} from 'lucide-react';
import { Input, Button, message, Switch, Modal } from 'antd';

const AVATAR_PRESETS = [
  {
    label: 'Sophie Kim (Studio)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Elena Rostova (Natural)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Maya Chen (Portrait)',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Liam Carter (Editorial)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Emma Rossi (Warm Sunset)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Chloe Nguyen (Creative)',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
];

export default function CreatorSettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators[0]; // Sophie Kim

  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'gallery' | 'security'>('profile');

  // Profile Form States
  const [name, setName] = useState(currentCreator?.name || 'Sophie Kim');
  const [handle, setHandle] = useState(currentCreator?.handle?.replace('@', '') || 'sophiekim');
  const [avatar, setAvatar] = useState(currentCreator?.avatar || AVATAR_PRESETS[0].url);
  const [coverImage, setCoverImage] = useState(currentCreator?.coverImage || '');
  const [bio, setBio] = useState(currentCreator?.bio || '');
  const [location, setLocation] = useState(currentCreator?.location || 'Milan & Paris');
  const [startingPriceEur, setStartingPriceEur] = useState(currentCreator?.startingPriceEur || 850);
  const [aestheticVibe, setAestheticVibe] = useState(currentCreator?.aestheticVibe || 'Clean Minimalist • Warm Natural Glow');
  const [categoriesText, setCategoriesText] = useState(currentCreator?.categories ? currentCreator.categories.join(', ') : 'Beauty, Lifestyle, Fashion');
  const [tagsText, setTagsText] = useState(currentCreator?.tags ? currentCreator.tags.join(', ') : 'Clean Beauty, Skincare Routine, Direct Response UGC, Editorial Makeup');

  // Social Stats Form States
  const [igHandle, setIgHandle] = useState(currentCreator?.platforms?.instagram?.handle || '@sophiekim');
  const [igFollowers, setIgFollowers] = useState(currentCreator?.platforms?.instagram?.followersFormatted || '1.2M');
  const [igEngagement, setIgEngagement] = useState(currentCreator?.platforms?.instagram?.engagementRate || '4.8%');
  
  const [ttHandle, setTtHandle] = useState(currentCreator?.platforms?.tiktok?.handle || '@sophie.kim');
  const [ttFollowers, setTtFollowers] = useState(currentCreator?.platforms?.tiktok?.followersFormatted || '680K');
  const [ttEngagement, setTtEngagement] = useState(currentCreator?.platforms?.tiktok?.engagementRate || '8.2%');

  const [ytHandle, setYtHandle] = useState(currentCreator?.platforms?.youtube?.handle || 'Sophie Kim Vlogs');
  const [ytFollowers, setYtFollowers] = useState(currentCreator?.platforms?.youtube?.followersFormatted || '210K');

  // Gallery Photo Modal & States
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoRatio, setNewPhotoRatio] = useState<'portrait' | 'landscape' | 'square'>('portrait');
  const [newPhotoLocation, setNewPhotoLocation] = useState(location || 'Paris, France');

  // Security & Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim()) {
      message.error('Name and username handle are required.');
      return;
    }

    const categoriesArray = categoriesText
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const tagsArray = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;

    const updates = {
      name,
      handle: cleanHandle,
      avatar,
      coverImage,
      bio,
      location,
      startingPriceEur: Number(startingPriceEur) || 850,
      aestheticVibe,
      categories: categoriesArray,
      tags: tagsArray,
    };

    dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates }));
    dispatch(updateUserProfile({ name, handle: `@${cleanHandle}`, avatar, location, bio }));

    message.success('Creator profile saved and updated live across the marketplace!');
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    const platformUpdates = {
      platforms: {
        ...currentCreator.platforms,
        instagram: currentCreator.platforms.instagram
          ? {
              ...currentCreator.platforms.instagram,
              handle: igHandle,
              followersFormatted: igFollowers,
              engagementRate: igEngagement,
            }
          : {
              followers: 1200000,
              followersFormatted: igFollowers,
              handle: igHandle,
              engagementRate: igEngagement,
              avgViews: '145K',
            },
        tiktok: currentCreator.platforms.tiktok
          ? {
              ...currentCreator.platforms.tiktok,
              handle: ttHandle,
              followersFormatted: ttFollowers,
              engagementRate: ttEngagement,
            }
          : {
              followers: 680000,
              followersFormatted: ttFollowers,
              handle: ttHandle,
              engagementRate: ttEngagement,
              avgViews: '320K',
            },
        youtube: currentCreator.platforms.youtube
          ? {
              ...currentCreator.platforms.youtube,
              handle: ytHandle,
              followersFormatted: ytFollowers,
            }
          : {
              followers: 210000,
              followersFormatted: ytFollowers,
              handle: ytHandle,
              engagementRate: '3.4%',
              avgViews: '85K',
            },
      },
    };

    dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates: platformUpdates }));
    message.success('Connected channels and audience metrics updated!');
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) {
      message.error('Please provide an image URL for the gallery photo.');
      return;
    }

    const photo: CreatorPhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || `${name} • Portfolio Shoot`,
      category: 'photo',
      aspectRatio: newPhotoRatio,
      date: 'Recent Shoot',
      location: newPhotoLocation || location,
    };

    dispatch(addCreatorPhoto({ creatorId: currentCreator.id, photo }));
    message.success('New gallery photo published to your public rate card!');
    setIsPhotoModalOpen(false);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleDeletePhoto = (photoId: string) => {
    dispatch(deleteCreatorPhoto({ creatorId: currentCreator.id, photoId }));
    message.info('Photo removed from your public gallery.');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      message.error('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      message.error('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error('New password and confirmation do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    message.success('Security password updated successfully! All active sessions refreshed.');
  };

  const handleLogout = () => {
    dispatch(logout());
    message.success('Signed out successfully');
    router.push('/login');
  };

  const photosList = currentCreator?.photos || [];

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Creator Profile & Account Settings"
        subtitle="Manage your public rate card identity, aesthetic signature, gallery photos, and security."
        action={
          <div className="flex items-center gap-3">
            <Button
              type="default"
              onClick={() => setIsShareModalOpen(true)}
              className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#FF2D78]"
            >
              <Share2 className="w-4 h-4 text-[#FF2D78]" />
              <span>Share Rate Card</span>
            </Button>

            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button
                type="default"
                className="h-10 px-4 rounded-full font-bold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A]"
              >
                <span>Preview Public Profile</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="h-10 px-4 rounded-full font-bold text-sm bg-[#FAFAF8] border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-[#73736A] hover:text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] flex flex-wrap gap-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Profile & Identity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('socials')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'socials'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeTab === 'socials' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Channels & Reach</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <ImageIcon className={`w-4 h-4 ${activeTab === 'gallery' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Gallery Photos ({photosList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-[#FF2D78]' : 'text-[#73736A]'}`} />
            <span>Security & Password</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & IDENTITY */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div>
                  <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Public Profile Identity</h2>
                  <p className="text-xs text-[#73736A] mt-0.5">This information is shown to brands when discovering and vetting creators.</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold border border-[#23744D]/20">
                  <VerifiedBadge size="xs" />
                  <span>Verified Creator</span>
                </div>
              </div>

              {/* Profile Avatar Image Upload (Direct File Upload & Drag-and-Drop) */}
              <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2]">
                <ImageUpload
                  variant="avatar"
                  label="Profile Portrait Photo"
                  description="Upload your high-resolution portrait (PNG, JPG, WEBP up to 10MB). Drag & drop or browse from device."
                  value={avatar}
                  onChange={(img) => setAvatar(img)}
                />
              </div>

              {/* Cover Banner Image Upload (Direct Drag & Drop) */}
              <div className="space-y-2">
                <ImageUpload
                  variant="banner"
                  label="Cover Banner Image"
                  description="Upload a panoramic showcase banner (16:9 or 3:1 recommended, PNG/JPG up to 10MB)"
                  value={coverImage}
                  onChange={(img) => setCoverImage(img)}
                />
              </div>

              {/* Name, Handle, Location, Starting Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Username Handle</label>
                  <Input
                    prefix="@"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Location / City</label>
                  <Input
                    prefix={<MapPin className="w-3.5 h-3.5 text-[#FF2D78]" />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Starting Rate (EUR)</label>
                  <Input
                    prefix="€"
                    type="number"
                    value={startingPriceEur}
                    onChange={(e) => setStartingPriceEur(Number(e.target.value))}
                    className="rounded-xl h-10 text-sm font-bold"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Bio & Creative Statement</label>
                <Input.TextArea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-xl text-sm font-medium"
                  placeholder="Tell brands about your aesthetic style, content specialties, and collaboration philosophy..."
                />
              </div>

              {/* Aesthetic Signature & Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#FF2D78]" />
                    <span>Aesthetic Signature / Visual Vibe</span>
                  </label>
                  <Input
                    value={aestheticVibe}
                    onChange={(e) => setAestheticVibe(e.target.value)}
                    placeholder="e.g. Clean Minimalist • Warm Natural Glow"
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#FF2D78]" />
                    <span>Categories / Niches (comma separated)</span>
                  </label>
                  <Input
                    value={categoriesText}
                    onChange={(e) => setCategoriesText(e.target.value)}
                    placeholder="Beauty, Skincare, Lifestyle, Fashion"
                    className="rounded-xl h-10 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Focus Content Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
                  <span>Content Focus Topics & Deliverable Tags (comma separated)</span>
                </label>
                <Input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="Clean Beauty, Skincare Routine, Direct Response UGC, Editorial Makeup"
                  className="rounded-xl h-10 text-sm font-semibold"
                />
              </div>

              {/* Submit Profile Button */}
              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Details</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: CONNECTED CHANNELS & AUDIENCE */}
        {activeTab === 'socials' && (
          <form onSubmit={handleSaveSocials} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Connected Social Handles & Reach</h2>
                <p className="text-xs text-[#73736A] mt-0.5">These audience metrics power your search card and verified follower analytics.</p>
              </div>

              <div className="space-y-4">
                {/* Instagram */}
                <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0A0A0A]">Instagram Channel</div>
                      <div className="text-xs text-[#73736A]">Primary photo & reel platform</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <Input
                      value={igHandle}
                      onChange={(e) => setIgHandle(e.target.value)}
                      placeholder="@handle"
                      className="rounded-xl h-10 text-sm font-semibold w-full sm:w-36"
                    />
                    <Input
                      value={igFollowers}
                      onChange={(e) => setIgFollowers(e.target.value)}
                      placeholder="1.2M Followers"
                      className="rounded-xl h-10 text-sm font-bold w-full sm:w-32 text-center"
                    />
                    <Input
                      value={igEngagement}
                      onChange={(e) => setIgEngagement(e.target.value)}
                      placeholder="4.8% Eng"
                      className="rounded-xl h-10 text-sm font-semibold w-full sm:w-28 text-center"
                    />
                  </div>
                </div>

                {/* TikTok */}
                <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0A0A0A]">TikTok Channel</div>
                      <div className="text-xs text-[#73736A]">Short-form vertical video reach</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <Input
                      value={ttHandle}
                      onChange={(e) => setTtHandle(e.target.value)}
                      placeholder="@handle"
                      className="rounded-xl h-10 text-sm font-semibold w-full sm:w-36"
                    />
                    <Input
                      value={ttFollowers}
                      onChange={(e) => setTtFollowers(e.target.value)}
                      placeholder="680K Followers"
                      className="rounded-xl h-10 text-sm font-bold w-full sm:w-32 text-center"
                    />
                    <Input
                      value={ttEngagement}
                      onChange={(e) => setTtEngagement(e.target.value)}
                      placeholder="8.2% Eng"
                      className="rounded-xl h-10 text-sm font-semibold w-full sm:w-28 text-center"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0A0A0A]">YouTube Channel</div>
                      <div className="text-xs text-[#73736A]">Longform reviews & mid-roll slots</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <Input
                      value={ytHandle}
                      onChange={(e) => setYtHandle(e.target.value)}
                      placeholder="Channel Name"
                      className="rounded-xl h-10 text-sm font-semibold w-full sm:w-44"
                    />
                    <Input
                      value={ytFollowers}
                      onChange={(e) => setYtFollowers(e.target.value)}
                      placeholder="210K Subscribers"
                      className="rounded-xl h-10 text-sm font-bold w-full sm:w-36 text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Channels & Reach</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: GALLERY PHOTOS MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
              <div>
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Public Rate Card Gallery</h2>
                <p className="text-xs text-[#73736A] mt-0.5">These high-resolution portfolio photos appear directly on your public profile Gallery tab.</p>
              </div>

              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="h-10 px-5 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            {photosList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {photosList.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative rounded-3xl overflow-hidden border border-[#E7E7E2] bg-[#FAFAF8] shadow-xs hover:border-[#0A0A0A] hover:shadow-md transition-all duration-300 aspect-4/5"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Creator gallery photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Vignette on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Quick Delete Action */}
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer opacity-90 group-hover:opacity-100 z-10"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                color="pink"
                icon={<Camera className="w-8 h-8" />}
                badge="Media Gallery"
                title="No Gallery Photos Added Yet"
                description="Upload editorial portraits, studio stills, and aesthetic lifestyle shots to showcase your visual identity to brands."
                primaryAction={{
                  label: 'Add First Photo',
                  onClick: () => setIsPhotoModalOpen(true),
                  icon: <Plus className="w-4 h-4" />,
                }}
                variant="dashed"
              />
            )}
          </div>
        )}

        {/* TAB 4: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Change Password</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Ensure your account uses a strong password with letters, numbers, and symbols.</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Current Password</label>
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">New Password (min 8 characters)</label>
                  <Input.Password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Confirm New Password</label>
                  <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="rounded-xl h-10 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-between flex-wrap gap-3">
                <Link href="/forgot-password" className="text-xs font-bold text-[#73736A] hover:text-[#FF2D78] transition-colors">
                  Forgot current password? Reset via email
                </Link>

                <button
                  type="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-[#FF2D78] text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>

            {/* 2-Factor Authentication Security Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-base font-bold text-[#0A0A0A]">
                    <Shield className="w-5 h-5 text-[#23744D]" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-xs text-[#73736A]">
                    Protect your balance payouts and campaign contracts with SMS/Authenticator security codes.
                  </p>
                </div>

                <Switch
                  checked={twoFactorEnabled}
                  onChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    message.success(checked ? '2FA Protection Enabled' : '2FA Protection Disabled');
                  }}
                />
              </div>
            </div>

            {/* Session Management */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#0A0A0A]">Active Account Session</div>
                  <p className="text-xs text-[#73736A]">
                    You are currently logged into Creator Studio from this device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-10 px-5 rounded-full font-bold text-sm bg-[#FAFAF8] border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-rose-600 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Session</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Photo Modal */}
      <Modal
        title={
          <div className="font-black text-lg text-[#0A0A0A]">
            Add Gallery Photo
          </div>
        }
        open={isPhotoModalOpen}
        onCancel={() => setIsPhotoModalOpen(false)}
        footer={null}
        centered
        className="rounded-3xl"
      >
        <form onSubmit={handleAddPhoto} className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <ImageUpload
              label="Select Photo File"
              description="PNG, JPG, WEBP up to 10MB. Drag & drop or browse from device."
              value={newPhotoUrl}
              onChange={(img) => setNewPhotoUrl(img)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
              Caption & Look Details
            </label>
            <Input
              value={newPhotoCaption}
              onChange={(e) => setNewPhotoCaption(e.target.value)}
              placeholder="e.g. Editorial Makeup Look • Paris Studio"
              className="rounded-xl h-10 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Orientation
              </label>
              <select
                value={newPhotoRatio}
                onChange={(e) => setNewPhotoRatio(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-[#E7E7E2] text-sm font-medium bg-white"
              >
                <option value="portrait">Portrait (4:5)</option>
                <option value="landscape">Landscape (16:9)</option>
                <option value="square">Square (1:1)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Location
              </label>
              <Input
                value={newPhotoLocation}
                onChange={(e) => setNewPhotoLocation(e.target.value)}
                placeholder="e.g. Paris, France"
                className="rounded-xl h-10 text-sm font-medium"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7E7E2] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsPhotoModalOpen(false)}
              className="h-10 px-4 rounded-full font-bold text-xs border border-[#E7E7E2] text-[#73736A] hover:text-[#0A0A0A] cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 px-6 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-[#FF2D78] text-white cursor-pointer transition-all"
            >
              Publish to Rate Card
            </button>
          </div>
        </form>
      </Modal>

      {/* Share Profile Modal */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${name} (@${handle})`}
        subtitle={`${categoriesText} • Verified Creator Rate Card`}
        shareUrl={`/creators/${currentCreator.id}`}
        avatar={avatar}
        role="creator"
      />
    </div>
  );
}
