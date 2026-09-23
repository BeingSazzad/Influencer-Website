'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile } from '@/redux/slices/authSlice';
import { updateCreatorProfileDetails } from '@/redux/slices/creatorSlice';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
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
} from 'lucide-react';
import { Input, Button, message } from 'antd';

const AVATAR_PRESETS = [
  { label: 'Sophie Kim (Studio)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { label: 'Elena Rostova (Natural)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { label: 'Maya Chen (Portrait)', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Liam Carter (Editorial)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { label: 'Emma Rossi (Warm Sunset)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  { label: 'Chloe Nguyen (Creative)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
];

function CreatorProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const currentCreator = creators.find((c) => c.id === currentUser?.id) || creators[0];

  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'identity' | 'channels'>(
    initialTab === 'channels' ? 'channels' : 'identity'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'channels' || tab === 'identity') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Profile Form States
  const [name, setName] = useState(currentCreator?.name || 'Sophie Kim');
  const [handle, setHandle] = useState(currentCreator?.handle?.replace('@', '') || 'sophiekim');
  const [avatar, setAvatar] = useState(currentCreator?.avatar || AVATAR_PRESETS[0].url);
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

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
      name: name.trim(),
      handle: cleanHandle,
      avatar,
      bio: bio.trim(),
      location: location.trim(),
      startingPriceEur: Number(startingPriceEur) || 850,
      aestheticVibe: aestheticVibe.trim(),
      categories: categoriesArray,
      tags: tagsArray,
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
    dispatch(updateUserProfile({ name: name.trim(), handle: `@${cleanHandle}`, avatar, location: location.trim(), bio: bio.trim() }));

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
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] flex gap-1 shadow-2xs max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <User className={`w-4 h-4 ${activeTab === 'identity' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Profile Identity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('channels')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'channels'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#73736A] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeTab === 'channels' ? 'text-white' : 'text-[#73736A]'}`} />
            <span>Connected Channels</span>
          </button>
        </div>

        {/* Tab 1: Profile Identity */}
        {activeTab === 'identity' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div>
                  <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Identity & Appearance</h2>
                  <p className="text-xs text-[#73736A] mt-0.5">High-resolution portrait shown on search results and talent cards.</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] text-xs font-bold border border-[#23744D]/20">
                  <VerifiedBadge size="xs" />
                  <span>Verified Creator</span>
                </div>
              </div>

              {/* Profile Avatar Upload */}
              <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-4">
                <ImageUpload
                  variant="avatar"
                  label="Portrait Photo"
                  description="Upload your high-res headshot (PNG, JPG, WEBP up to 10MB)"
                  value={avatar}
                  onChange={(img) => setAvatar(img)}
                />

                {/* Quick Presets */}
                <div className="pt-2 border-t border-[#E7E7E2]">
                  <div className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider mb-2">
                    Or select a curated portrait preset
                  </div>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {AVATAR_PRESETS.map((p) => (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => setAvatar(p.url)}
                        className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          avatar === p.url
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-2xs'
                            : 'border-[#E7E7E2] bg-white text-[#555550] hover:border-[#0A0A0A]'
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-5 h-5 rounded-full object-cover" />
                        <span className="truncate max-w-[120px]">{p.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="e.g. Sophie Kim"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Username</label>
                  <Input
                    prefix="@"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="sophiekim"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Location</label>
                  <Input
                    prefix={<MapPin className="w-3.5 h-3.5 text-[#73736A]" />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="Milan & Paris"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Starting Rate (EUR)</label>
                  <Input
                    prefix="€"
                    type="number"
                    value={startingPriceEur}
                    onChange={(e) => setStartingPriceEur(Number(e.target.value))}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="850"
                  />
                </div>
              </div>

              {/* Aesthetic Signature */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73736A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Aesthetic Vibe & Signature Tone</span>
                </label>
                <Input
                  value={aestheticVibe}
                  onChange={(e) => setAestheticVibe(e.target.value)}
                  className="rounded-xl h-10 text-sm font-semibold"
                  placeholder="e.g. Clean Minimalist • Warm Natural Glow"
                />
              </div>

              {/* Categories & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Primary Niches (comma-separated)</label>
                  <Input
                    value={categoriesText}
                    onChange={(e) => setCategoriesText(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="Beauty, Lifestyle, Fashion"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Specialty Tags (comma-separated)</label>
                  <Input
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="rounded-xl h-10 text-sm font-semibold"
                    placeholder="Clean Beauty, Skincare Routine, UGC"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#73736A]">Editorial Bio</label>
                  <span className="text-[11px] text-[#A3A39C]">{bio.length} characters</span>
                </div>
                <Input.TextArea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Introduce yourself, your audience demographic, and what brands love about working with you..."
                  className="rounded-2xl text-sm leading-relaxed p-4"
                />
              </div>

              <div className="pt-4 border-t border-[#E7E7E2] flex items-center justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="h-11 px-6 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Connected Channels */}
        {activeTab === 'channels' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="pb-4 border-b border-[#E7E7E2]">
                <h2 className="text-lg font-black text-[#0A0A0A] tracking-tight">Connected Channels & Audience Reach</h2>
                <p className="text-xs text-[#73736A] mt-0.5">Verified follower metrics and engagement benchmarks shown to brand marketing managers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Instagram */}
                <div className="p-5 rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                      <Instagram className="w-5 h-5 text-[#FF2D78]" />
                      <span>Instagram</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Account Handle</label>
                      <Input
                        value={igHandle}
                        onChange={(e) => setIgHandle(e.target.value)}
                        className="rounded-xl h-9 text-xs font-semibold"
                        placeholder="@sophiekim"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Followers</label>
                        <Input
                          value={igFollowers}
                          onChange={(e) => setIgFollowers(e.target.value)}
                          className="rounded-xl h-9 text-xs font-semibold"
                          placeholder="1.2M"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Engagement</label>
                        <Input
                          value={igEngagement}
                          onChange={(e) => setIgEngagement(e.target.value)}
                          className="rounded-xl h-9 text-xs font-semibold"
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
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Account Handle</label>
                      <Input
                        value={ttHandle}
                        onChange={(e) => setTtHandle(e.target.value)}
                        className="rounded-xl h-9 text-xs font-semibold"
                        placeholder="@sophie.kim"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Followers</label>
                        <Input
                          value={ttFollowers}
                          onChange={(e) => setTtFollowers(e.target.value)}
                          className="rounded-xl h-9 text-xs font-semibold"
                          placeholder="680K"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Engagement</label>
                        <Input
                          value={ttEngagement}
                          onChange={(e) => setTtEngagement(e.target.value)}
                          className="rounded-xl h-9 text-xs font-semibold"
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
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Channel Handle</label>
                      <Input
                        value={ytHandle}
                        onChange={(e) => setYtHandle(e.target.value)}
                        className="rounded-xl h-9 text-xs font-semibold"
                        placeholder="Sophie Kim Vlogs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider">Subscribers</label>
                      <Input
                        value={ytFollowers}
                        onChange={(e) => setYtFollowers(e.target.value)}
                        className="rounded-xl h-9 text-xs font-semibold"
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
