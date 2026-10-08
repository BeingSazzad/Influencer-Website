'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile } from '@/redux/slices/authSlice';
import {
  updateCreatorProfileDetails,
  addCreatorPhoto,
  updateCreatorPhoto,
  deleteCreatorPhoto,
} from '@/redux/slices/creatorSlice';
import { CreatorPhoto, Creator } from '@/types';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { CreatorPhotoLightbox } from '@/components/shared/CreatorPhotoLightbox';
import { InstagramLogo, TikTokLogo, YouTubeLogo } from '@/components/shared/SocialLogos';
import {
  User,
  Globe,
  Save,
  MapPin,
  Upload,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  ZoomIn,
  MoreVertical,
  ExternalLink,
  Lock,
  Eye,
  Languages,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Unlink,
  Link2,
  Camera,
  Mail,
  Phone,
} from 'lucide-react';
import { Input, Button, message, Select, Dropdown } from 'antd';
import { Button as AppButton } from '@/components/ui';

// Curated marketplace categories matching Onboarding
const CATEGORIES = [
  { id: 'Beauty', label: 'Beauty & Skincare', icon: '💄' },
  { id: 'Fashion', label: 'Fashion & Style', icon: '👗' },
  { id: 'Fitness', label: 'Fitness & Health', icon: '⚡' },
  { id: 'Travel', label: 'Travel & Adventure', icon: '✈️' },
  { id: 'Food', label: 'Food & Cuisine', icon: '🍴' },
  { id: 'Lifestyle', label: 'Lifestyle & Wellness', icon: '❤️' },
  { id: 'Tech', label: 'Tech & Gaming', icon: '🎮' },
  { id: 'Business', label: 'Business & Finance', icon: '💼' },
  { id: 'Art', label: 'Art & Photography', icon: '🎨' },
  { id: 'Family', label: 'Family & Parenting', icon: '👶' },
];

// Collaboration preferences matching Onboarding Step 6
const COLLABORATION_PREFERENCES = [
  {
    id: 'sponsored',
    label: 'Sponsored Posts',
    desc: 'Dedicated reels, videos, and posts',
    icon: '✨',
  },
  {
    id: 'ugc',
    label: 'UGC Content',
    desc: 'Ad content without posting to your feed',
    icon: '📱',
  },
  {
    id: 'reviews',
    label: 'Product Reviews',
    desc: 'Unboxings and honest product reviews',
    icon: '📦',
  },
  {
    id: 'events',
    label: 'Events & Brand Trips',
    desc: 'In-person events and brand trips',
    icon: '🎟️',
  },
  {
    id: 'ambassador',
    label: 'Brand Ambassadorship',
    desc: 'Long-term brand partnerships',
    icon: '🤝',
  },
  {
    id: 'affiliate',
    label: 'Affiliate & Gifting',
    desc: 'Affiliate links and product gifting',
    icon: '🎁',
  },
];

// Curated Country list matching Onboarding Step 2
const COUNTRIES = [
  { code: 'CH', name: 'Switzerland' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'US', name: 'United States' },
];

// Curated Languages list matching Onboarding Step 2
const COMMON_LANGUAGES = [
  'English',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Dutch',
  'Portuguese',
  'Swedish',
  'Polish',
  'Turkish',
  'Arabic',
  'Hindi',
  'Bengali',
  'Japanese',
  'Korean',
  'Chinese',
];

function CreatorProfileContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);

  // Match current user or fallback
  const currentCreator =
    creators.find(
      (c) =>
        c.id === currentUser?.id ||
        (currentUser?.handle &&
          c.handle.replace(/^@+/, '').toLowerCase() === currentUser.handle.replace(/^@+/, '').toLowerCase())
    ) || creators[0];

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
  const isDemoSophie = currentCreator?.id === 'creator-01' || currentCreator?.handle === 'sophiekim';
  const [name, setName] = useState(currentCreator?.name || 'Creator');
  const [handle, setHandle] = useState(currentCreator?.handle?.replace(/^@+/, '') || 'creator');

  // Username uniqueness and validation
  const initialCleanHandle = (currentCreator?.handle?.replace(/^@+/, '') || 'creator').toLowerCase();
  const cleanHandle = handle.replace(/^@+/, '').trim().toLowerCase();

  const isUsernameTaken = useMemo(() => {
    if (!cleanHandle || cleanHandle === initialCleanHandle) return false;
    return creators.some(
      (c) =>
        c.id !== currentCreator.id &&
        c.handle.replace(/^@+/, '').toLowerCase() === cleanHandle
    );
  }, [cleanHandle, creators, currentCreator.id, initialCleanHandle]);

  const isUsernameValidFormat = useMemo(() => {
    if (!cleanHandle) return true;
    return /^[a-z0-9_.]+$/.test(cleanHandle) && cleanHandle.length >= 3;
  }, [cleanHandle]);

  const [avatar, setAvatar] = useState(currentCreator?.avatar || '');
  const [bio, setBio] = useState(
    currentCreator?.bio ||
      'I create authentic, relatable content and love working with brands on meaningful partnerships.'
  );

  // Country & City Synchronization
  const initialCountry =
    currentCreator?.country ||
    (currentCreator?.location?.includes(',')
      ? currentCreator.location.split(',')[1].trim()
      : 'United States');
  const initialCity =
    currentCreator?.city ||
    (currentCreator?.location?.includes(',')
      ? currentCreator.location.split(',')[0].trim()
      : currentCreator?.location || 'Los Angeles');

  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [location, setLocation] = useState(
    currentCreator?.location || `${initialCity}, ${initialCountry}`
  );

  // Spoken Languages
  const [languages, setLanguages] = useState<string[]>(
    currentCreator?.languages && currentCreator.languages.length > 0
      ? currentCreator.languages
      : ['English']
  );
  const [newLanguageInput, setNewLanguageInput] = useState('');

  // Collaboration Preferences
  const [collabPreferences, setCollabPreferences] = useState<string[]>(
    currentCreator?.collaborationPreferences && currentCreator.collaborationPreferences.length > 0
      ? currentCreator.collaborationPreferences
      : ['sponsored', 'ugc', 'reviews']
  );

  const [startingPriceEur, setStartingPriceEur] = useState(currentCreator?.startingPriceEur || 350);
  const [gender, setGender] = useState<string>(currentCreator?.gender || 'female');

  // Categories & Specialty Tags
  const [categories, setCategories] = useState<string[]>(
    currentCreator?.categories && currentCreator.categories.length > 0
      ? currentCreator.categories
      : ['Beauty', 'Lifestyle']
  );
  const [tags, setTags] = useState<string[]>(
    currentCreator?.tags && currentCreator.tags.length > 0
      ? currentCreator.tags
      : ['Content Creator', 'Creator Onboarded']
  );
  const [newTagInput, setNewTagInput] = useState('');

  // Private Contact Details
  const [contactEmail, setContactEmail] = useState(currentCreator?.contactEmail || currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(
    currentCreator?.contactPhone || currentUser?.phone || ''
  );

  // Aesthetic Gallery States
  const photosList: CreatorPhoto[] = currentCreator?.photos || [];
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<CreatorPhoto | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCategory, setPhotoCategory] = useState<string>('lifestyle');
  const [photoLocation, setPhotoLocation] = useState(currentCreator?.location || 'Europe');
  const [photoDate, setPhotoDate] = useState('February 2026');
  const [photoTags, setPhotoTags] = useState('Aesthetic, Lifestyle');
  const [lightboxPhoto, setLightboxPhoto] = useState<CreatorPhoto | null>(null);

  // Quick Photo File Inputs
  const quickReplaceInputRef = React.useRef<HTMLInputElement>(null);
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);

  // Social Stats Form States (Dynamic initialization without forcing Sophie Kim data)
  const [igHandle, setIgHandle] = useState(
    currentCreator?.platforms?.instagram?.handle || (isDemoSophie ? '@sophiekim' : '')
  );
  const [igFollowers, setIgFollowers] = useState(
    currentCreator?.platforms?.instagram?.followersFormatted || (isDemoSophie ? '1.2M' : '10K')
  );
  const [igEngagement, setIgEngagement] = useState(
    currentCreator?.platforms?.instagram?.engagementRate || (isDemoSophie ? '4.8%' : '4.5%')
  );
  const [igUrl, setIgUrl] = useState(
    currentCreator?.platforms?.instagram?.url ||
      (currentCreator?.platforms?.instagram?.handle
        ? `https://instagram.com/${currentCreator.platforms.instagram.handle.replace('@', '')}`
        : isDemoSophie
        ? 'https://instagram.com/sophiekim'
        : '')
  );

  const [ttHandle, setTtHandle] = useState(
    currentCreator?.platforms?.tiktok?.handle || (isDemoSophie ? '@sophie.kim' : '')
  );
  const [ttFollowers, setTtFollowers] = useState(
    currentCreator?.platforms?.tiktok?.followersFormatted || (isDemoSophie ? '680K' : '25K')
  );
  const [ttEngagement, setTtEngagement] = useState(
    currentCreator?.platforms?.tiktok?.engagementRate || (isDemoSophie ? '6.2%' : '5.8%')
  );
  const [ttUrl, setTtUrl] = useState(
    currentCreator?.platforms?.tiktok?.url ||
      (currentCreator?.platforms?.tiktok?.handle
        ? `https://tiktok.com/@${currentCreator.platforms.tiktok.handle.replace('@', '')}`
        : isDemoSophie
        ? 'https://tiktok.com/@sophie.kim'
        : '')
  );

  const [ytHandle, setYtHandle] = useState(
    currentCreator?.platforms?.youtube?.handle || (isDemoSophie ? 'Sophie Kim Vlogs' : '')
  );
  const [ytFollowers, setYtFollowers] = useState(
    currentCreator?.platforms?.youtube?.followersFormatted || (isDemoSophie ? '210K' : '5K')
  );
  const [ytEngagement, setYtEngagement] = useState(
    currentCreator?.platforms?.youtube?.engagementRate || (isDemoSophie ? '8.4%' : '6.0%')
  );
  const [ytUrl, setYtUrl] = useState(
    currentCreator?.platforms?.youtube?.url || (isDemoSophie ? 'https://youtube.com/@sophiekimvlogs' : '')
  );

  // Social Channels Connection States & Verification
  const [isIgConnected, setIsIgConnected] = useState<boolean>(
    Boolean(currentCreator?.platforms?.instagram?.handle || (isDemoSophie && igHandle))
  );
  const [isTtConnected, setIsTtConnected] = useState<boolean>(
    Boolean(currentCreator?.platforms?.tiktok?.handle || (isDemoSophie && ttHandle))
  );
  const [isYtConnected, setIsYtConnected] = useState<boolean>(
    Boolean(currentCreator?.platforms?.youtube?.handle || (isDemoSophie && ytHandle))
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Today at 4:15 PM');

  const handleSyncAllMetrics = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedTime('Just now');
      message.success('All social channels and audience metrics synced successfully from official APIs!');
    }, 700);
  };

  const handleConnectChannel = (platform: 'instagram' | 'tiktok' | 'youtube') => {
    if (platform === 'instagram') {
      const h = igHandle.trim() || (handle ? `@${handle}` : '@creator');
      const formatted = h.startsWith('@') ? h : `@${h}`;
      setIgHandle(formatted);
      setIsIgConnected(true);
      message.success('Instagram account connected and metrics verified!');
    } else if (platform === 'tiktok') {
      const h = ttHandle.trim() || (handle ? `@${handle}` : '@creator');
      const formatted = h.startsWith('@') ? h : `@${h}`;
      setTtHandle(formatted);
      setIsTtConnected(true);
      message.success('TikTok account connected and metrics verified!');
    } else if (platform === 'youtube') {
      const h = ytHandle.trim() || name || 'Creator Channel';
      setYtHandle(h);
      setIsYtConnected(true);
      message.success('YouTube channel connected and metrics verified!');
    }
  };

  const handleDisconnectChannel = (platform: 'instagram' | 'tiktok' | 'youtube') => {
    if (platform === 'instagram') {
      setIsIgConnected(false);
      message.info('Instagram account disconnected.');
    } else if (platform === 'tiktok') {
      setIsTtConnected(false);
      message.info('TikTok account disconnected.');
    } else if (platform === 'youtube') {
      setIsYtConnected(false);
      message.info('YouTube channel disconnected.');
    }
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Avatar Upload Handler
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
    setPhotoLocation(currentCreator?.location || 'Europe');
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
        message.success('Image loaded into gallery form!');
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

  // Category Toggle (Curated Chips)
  const handleToggleCategory = (catId: string) => {
    if (categories.includes(catId)) {
      if (categories.length === 1) {
        message.warning('Please select at least 1 category');
        return;
      }
      setCategories(categories.filter((c) => c !== catId));
    } else {
      if (categories.length >= 3) {
        message.warning('You can select up to 3 primary categories');
        return;
      }
      setCategories([...categories, catId]);
    }
  };

  // Collaboration Preference Toggle
  const toggleCollabPreference = (id: string) => {
    if (collabPreferences.includes(id)) {
      if (collabPreferences.length === 1) {
        message.warning('Please keep at least 1 collaboration preference active');
        return;
      }
      setCollabPreferences(collabPreferences.filter((p) => p !== id));
    } else {
      setCollabPreferences([...collabPreferences, id]);
    }
  };

  // Language Handlers
  const handleAddLanguage = (lang: string) => {
    const trimmed = lang.trim();
    if (!trimmed || languages.includes(trimmed)) return;
    setLanguages([...languages, trimmed]);
    setNewLanguageInput('');
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    if (languages.length <= 1) {
      message.warning('Please select at least 1 language');
      return;
    }
    setLanguages(languages.filter((l) => l !== langToRemove));
  };

  // Tag Handlers
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

  // Master Profile Save Handler
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !handle.trim()) {
      message.error('Name and username handle are required.');
      return;
    }

    if (!isUsernameValidFormat) {
      message.error('Username must be at least 3 characters and contain only letters, numbers, underscores (_), or dots (.).');
      return;
    }

    if (isUsernameTaken) {
      message.error(`Username @${cleanHandle} is already taken by another creator. Please choose a unique username.`);
      return;
    }

    const formattedLocation =
      city.trim() && country.trim()
        ? `${city.trim()}, ${country.trim()}`
        : city.trim() || country.trim() || location.trim();

    const updates = {
      name: name.trim(),
      handle: cleanHandle,
      gender,
      avatar,
      bio: bio.trim(),
      location: formattedLocation,
      city: city.trim(),
      country: country.trim(),
      languages: languages.length > 0 ? languages : ['English'],
      collaborationPreferences: collabPreferences.length > 0 ? collabPreferences : ['sponsored'],
      startingPriceEur: Number(startingPriceEur) || 350,
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      categories: categories,
      tags: tags,
      platforms: (() => {
        const platformsObj: Creator['platforms'] = {};
        if (isIgConnected && igHandle.trim()) {
          platformsObj.instagram = {
            followers: currentCreator.platforms?.instagram?.followers || 1200000,
            followersFormatted: igFollowers.trim() || '1.2M',
            handle: igHandle.trim().startsWith('@') ? igHandle.trim() : `@${igHandle.trim()}`,
            engagementRate: igEngagement.trim() || '4.8%',
            avgViews: currentCreator.platforms?.instagram?.avgViews || '85K',
            url: `https://instagram.com/${igHandle.trim().replace('@', '')}`,
          };
        }
        if (isTtConnected && ttHandle.trim()) {
          platformsObj.tiktok = {
            followers: currentCreator.platforms?.tiktok?.followers || 680000,
            followersFormatted: ttFollowers.trim() || '680K',
            handle: ttHandle.trim().startsWith('@') ? ttHandle.trim() : `@${ttHandle.trim()}`,
            engagementRate: ttEngagement.trim() || '6.2%',
            avgViews: currentCreator.platforms?.tiktok?.avgViews || '120K',
            url: `https://tiktok.com/@${ttHandle.trim().replace('@', '')}`,
          };
        }
        if (isYtConnected && ytHandle.trim()) {
          platformsObj.youtube = {
            followers: currentCreator.platforms?.youtube?.followers || 210000,
            followersFormatted: ytFollowers.trim() || '210K',
            handle: ytHandle.trim(),
            engagementRate: ytEngagement.trim() || '8.4%',
            avgViews: currentCreator.platforms?.youtube?.avgViews || '95K',
            url: ytUrl.trim() || `https://youtube.com/@${ytHandle.trim().toLowerCase().replace(/\s+/g, '')}`,
          };
        }
        return platformsObj;
      })(),
    };

    dispatch(updateCreatorProfileDetails({ creatorId: currentCreator.id, updates }));
    dispatch(
      updateUserProfile({
        name: name.trim(),
        handle: `@${cleanHandle}`,
        gender,
        avatar,
        location: formattedLocation,
        bio: bio.trim(),
        phone: contactPhone.trim(),
      })
    );

    message.success('Public profile updated live on the marketplace!');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Profile"
        subtitle="Manage your creator identity, channels, and collaboration preferences."
        action={
          <AppButton
            size="md"
            variant="primary"
            onClick={() => handleSaveProfile()}
            icon={<Save className="w-4 h-4" />}
          >
            Save Profile
          </AppButton>
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
                : 'text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <User className={`w-4 h-4 shrink-0 ${activeTab === 'identity' ? 'text-white' : 'text-[#66665E]'}`} />
            <span className="whitespace-nowrap">Basic Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <ImageIcon className={`w-4 h-4 shrink-0 ${activeTab === 'gallery' ? 'text-white' : 'text-[#66665E]'}`} />
            <span className="whitespace-nowrap">Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('channels')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'channels'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Globe className={`w-4 h-4 shrink-0 ${activeTab === 'channels' ? 'text-white' : 'text-[#66665E]'}`} />
            <span className="whitespace-nowrap">Social Channels</span>
          </button>
        </div>

        {/* Tab 1: Profile Basic Info */}
        {activeTab === 'identity' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-7">
              {/* Header with Authentic Status Badge */}
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Profile Details
                </h2>

                {currentCreator?.verified ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Verified Creator</span>
                  </div>
                ) : currentCreator?.approvalStatus === 'under_review' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Under Curation Review</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F0] text-[#66665E] text-xs font-bold border border-[#E7E7E2] shrink-0">
                    <span>Active Profile</span>
                  </div>
                )}
              </div>

              {/* Profile Photo (Centered, Matching Onboarding Standards) */}
              <div className="flex flex-col items-center justify-center text-center py-2 pb-6 border-b border-[#E7E7E2]">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {avatar ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#0A0A0A] shadow-md cursor-pointer group transition-transform hover:scale-105"
                  >
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 mb-1 text-white" />
                      <span className="text-xs font-bold">Change</span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-[#F4F4F0] flex flex-col items-center justify-center cursor-pointer transition-all text-[#66665E] hover:text-[#0A0A0A] group hover:scale-105"
                  >
                    <Camera className="w-7 h-7 sm:w-8 sm:h-8 mb-1 text-[#0A0A0A] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Upload</span>
                  </div>
                )}

                <div className="mt-3 space-y-0.5 text-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors cursor-pointer block mx-auto"
                  >
                    {avatar ? 'Click photo to change' : 'Click to upload photo'}
                  </button>
                  <div className="text-xs text-[#66665E]">
                    JPG, PNG, or WEBP up to 10MB
                  </div>
                  {avatar && (
                    <button
                      type="button"
                      onClick={() => setAvatar('')}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors cursor-pointer pt-1 inline-block"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              {/* Public Profile Details Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                    Public Details
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66665E] mt-0.5">
                    Displayed on your public marketplace profile.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<User className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="e.g. Sophie Kim"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Gender</label>
                    <Select
                      value={gender}
                      onChange={(val) => setGender(val)}
                      className="w-full h-11 rounded-xl"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Public Contact Email <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<Mail className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="collabs@sophiekim.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Public Phone</label>
                    <Input
                      prefix={<Phone className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="+1 (555) 234-5678"
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-[#0A0A0A]">
                        Username <span className="text-rose-500">*</span>
                      </label>
                      {cleanHandle && (
                        isUsernameTaken ? (
                          <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" />
                            Unavailable
                          </span>
                        ) : !isUsernameValidFormat ? (
                          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Invalid Format
                          </span>
                        ) : cleanHandle !== initialCleanHandle ? (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            Available
                          </span>
                        ) : null
                      )}
                    </div>
                    <Input
                      prefix={<span className="text-[#66665E] text-sm font-medium mr-0.5">@</span>}
                      suffix={
                        cleanHandle ? (
                          isUsernameTaken ? (
                            <X className="w-4 h-4 text-rose-500" />
                          ) : !isUsernameValidFormat ? (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          ) : cleanHandle !== initialCleanHandle ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : null
                        ) : null
                      }
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                      className={`rounded-xl h-11 text-sm font-medium text-[#0A0A0A] ${
                        isUsernameTaken
                          ? '!border-rose-400 focus:!border-rose-500'
                          : !isUsernameValidFormat && cleanHandle
                          ? '!border-amber-400 focus:!border-amber-500'
                          : cleanHandle && cleanHandle !== initialCleanHandle
                          ? '!border-emerald-500 focus:!border-emerald-600'
                          : 'border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]'
                      }`}
                      placeholder="sophiekim"
                      required
                    />
                  </div>

                  {/* Starting Rate */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Starting Rate</label>
                    <Input
                      prefix={<span className="text-[#66665E] text-sm font-medium mr-0.5">€</span>}
                      type="number"
                      value={startingPriceEur}
                      onChange={(e) => setStartingPriceEur(Number(e.target.value) || 0)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="350"
                    />
                  </div>

                  {/* Country & City (Matching Onboarding Step 2) */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Country</label>
                    <Select
                      value={country}
                      onChange={(val) => {
                        setCountry(val);
                        if (city) setLocation(`${city}, ${val}`);
                      }}
                      className="w-full h-11 rounded-xl"
                      options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">City</label>
                    <Input
                      prefix={<MapPin className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (country) setLocation(`${e.target.value}, ${country}`);
                      }}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="Zurich, Paris, London"
                    />
                  </div>

                  {/* Editorial Bio with 0/160 Counter */}
                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-[#0A0A0A]">
                        Bio
                      </label>
                      <span className="text-xs font-semibold text-[#66665E]">
                        {bio.length}/160
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={160}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell brands what you create, your aesthetics, and what makes your content unique..."
                      className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
                    />
                  </div>

                  {/* Spoken Languages (Matching Onboarding Step 2) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Spoken Languages
                    </label>
                    <div className="min-h-[46px] rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus-within:border-[#0A0A0A] bg-white p-2 flex flex-wrap items-center gap-1.5 transition-all shadow-2xs">
                      {languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold text-[#0A0A0A]"
                        >
                          <Languages className="w-3.5 h-3.5 text-[#66665E]" />
                          <span>{lang}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang)}
                            className="text-[#66665E] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}

                      {/* Dropdown Selector for Common Languages */}
                      <Select
                        placeholder="+ Add language"
                        bordered={false}
                        value={undefined}
                        onChange={(val) => {
                          if (val) handleAddLanguage(val);
                        }}
                        className="min-w-[130px]"
                        options={COMMON_LANGUAGES.filter((l) => !languages.includes(l)).map((l) => ({
                          value: l,
                          label: l,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Private Account & Contact Section */}
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#66665E]" />
                      <span>Private Contact</span>
                    </h3>
                    <p className="text-xs text-[#66665E] mt-0.5">
                      Used for order and payout alerts. Never shown publicly.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F4F4F0] text-[#66665E] border border-[#E7E7E2] self-start sm:self-auto shrink-0">
                    Private
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Contact email</label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] bg-white"
                      placeholder="collabs@yourname.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">Phone</label>
                    <Input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] bg-white"
                      placeholder="+1 (555) 234-5678"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E7E7E2]" />

              {/* Creator details Section: Standardized Niches & Custom Tags */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                      Categories
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66665E] mt-0.5">
                      Select up to 3 primary categories.
                    </p>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#F4F4F0] text-[#0A0A0A]">
                    {categories.length} / 3 Selected
                  </span>
                </div>

                {/* Curated Category Chips matching Onboarding Step 3 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = categories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleToggleCategory(cat.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                            : 'bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] border-[#E7E7E2]'
                        }`}
                      >
                        <span className="text-base shrink-0">{cat.icon}</span>
                        <div className="min-w-0 flex-1">
                          <span className={`text-xs font-bold block truncate ${isSelected ? 'text-white' : 'text-[#0A0A0A]'}`}>
                            {cat.label}
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Specialty Tags */}
                <div className="space-y-1.5 pt-2">
                  <label className="block text-sm font-semibold text-[#52524E]">
                    Tags & Keywords
                  </label>
                  <div className="min-h-[46px] rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus-within:border-[#0A0A0A] bg-white p-2 flex flex-wrap items-center gap-1.5 transition-all shadow-2xs">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold text-[#0A0A0A]"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-[#66665E] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={tags.length === 0 ? "Type tag and press Enter..." : "+ Add tag"}
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
                      className="outline-none text-xs bg-transparent min-w-[80px] flex-1 text-[#0A0A0A] placeholder-[#A3A39C] px-1 py-0.5 font-medium"
                    />
                  </div>
                </div>

                {/* Collaboration Preferences (Matching Onboarding Step 6) */}
                <div className="space-y-3 pt-5 border-t border-[#E7E7E2]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                        Collaboration Preferences
                      </h4>
                      <p className="text-xs sm:text-sm text-[#66665E] mt-0.5">
                        Choose the partnership types you are available for.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F4F4F0] text-[#66665E] border border-[#E7E7E2]">
                      {collabPreferences.length} active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {COLLABORATION_PREFERENCES.map((pref) => {
                      const isSelected = collabPreferences.includes(pref.id);
                      return (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => toggleCollabPreference(pref.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                              : 'bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] border-[#E7E7E2]'
                          }`}
                        >
                          <span className="text-xl shrink-0 mt-0.5">{pref.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-[#0A0A0A]'}`}>
                                {pref.label}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                            </div>
                            <p className={`text-xs mt-0.5 line-clamp-2 leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-[#66665E]'}`}>
                              {pref.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                  <p className="text-sm text-[#66665E] mt-0.5">
                    High-resolution lookbook photos and portfolio visuals.
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
                  <div className="w-16 h-16 rounded-3xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center mx-auto text-[#66665E]">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-[#0A0A0A]">No Gallery Photos Yet</h3>
                    <p className="text-sm text-[#66665E] max-w-sm mx-auto">
                      Add editorial shoots, lifestyle portraits, or behind-the-scenes visuals to make your creator profile stand out.
                    </p>
                  </div>
                  <AppButton
                    size="md"
                    variant="primary"
                    onClick={openAddPhotoModal}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Upload First Photo
                  </AppButton>
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

                      {/* Photo Details with 3-dot Menu */}
                      <div className="p-4 bg-white flex items-center justify-between gap-3">
                        <h4 className="font-extrabold text-sm text-[#0A0A0A] line-clamp-2 leading-snug flex-1">
                          {photo.caption || 'Editorial Shoot'}
                        </h4>

                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: 'edit',
                                icon: <Edit3 className="w-4 h-4" />,
                                label: 'Edit Details',
                                onClick: () => openEditPhotoModal(photo),
                              },
                              {
                                key: 'replace',
                                icon: <Upload className="w-4 h-4" />,
                                label: 'Replace Image',
                                onClick: () => handleQuickReplaceClick(photo.id),
                              },
                              {
                                key: 'delete',
                                icon: <Trash2 className="w-4 h-4 text-rose-500" />,
                                label: <span className="text-rose-500">Remove Photo</span>,
                                onClick: () => handleDeletePhoto(photo.id),
                              },
                            ],
                          }}
                          trigger={['click']}
                        >
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg hover:bg-[#FAFAF8] text-[#66665E] hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
                            title="Photo options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Connected Social Channels with Official API Sync */}
        {activeTab === 'channels' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              {/* Header with Live Sync Status & Master Refresh */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E2]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Social Channels &amp; Connected Accounts
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Live API Sync
                    </span>
                  </div>
                  <p className="text-sm text-[#66665E] mt-1 font-medium">
                    Link your active profiles to automatically sync verified follower metrics, engagement rates, and channel analytics visible to brands.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-[#66665E] font-medium hidden md:inline">
                    Last synced: <strong className="text-[#0A0A0A]">{lastSyncedTime}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleSyncAllMetrics}
                    disabled={isSyncing}
                    className="h-10 px-4 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAF8] text-sm font-bold text-[#0A0A0A] transition-all flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 text-[#0A0A0A] ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Re-sync All'}</span>
                  </button>
                </div>
              </div>

              {/* Security & Marketplace Integrity Banner */}
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center gap-3 text-xs text-[#52524E]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Marketplace Trust Standard:</strong> Follower numbers and engagement percentages are automatically verified from official social APIs. To maintain brand transparency and prevent fraudulent data, metrics cannot be edited manually.
                </span>
              </div>

              {/* Channels Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Instagram Card */}
                <div
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 ${
                    isIgConnected
                      ? 'bg-white border-[#E7E7E2] shadow-2xs hover:border-[#0A0A0A]'
                      : 'bg-[#FAFAF8] border-dashed border-[#D2D2CA]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <InstagramLogo className="w-8 h-8 rounded-xl shadow-2xs shrink-0" />
                        <div>
                          <h4 className="text-base font-bold text-[#0A0A0A]">Instagram</h4>
                          <span className="text-xs text-[#66665E] font-medium">Reels &amp; Posts</span>
                        </div>
                      </div>

                      {isIgConnected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Connected
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E7E7E2] text-[#66665E]">
                          Not Linked
                        </span>
                      )}
                    </div>

                    {isIgConnected ? (
                      <>
                        {/* Connected Handle & Profile URL */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Connected Account
                            </span>
                            <span className="text-sm font-extrabold text-[#0A0A0A] truncate block">
                              {igHandle}
                            </span>
                          </div>
                          <a
                            href={igUrl || `https://instagram.com/${igHandle.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white text-[#66665E] hover:text-[#0A0A0A] transition-colors"
                            title="Visit Profile"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        {/* Verified Live Metrics (Read-only badges) */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Followers
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{igFollowers}</span>
                              <span className="text-[10px] font-bold text-emerald-600">✓ Verified</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Engagement
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{igEngagement}</span>
                              <span className="text-[10px] font-medium text-[#66665E]">30d avg</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-[#66665E] flex items-center gap-1 font-medium">
                          <Lock className="w-3 h-3 text-[#A3A39C]" />
                          <span>Metrics verified via Instagram Graph API</span>
                        </div>
                      </>
                    ) : (
                      /* Not Connected State */
                      <div className="space-y-3 py-2">
                        <p className="text-xs text-[#66665E] leading-relaxed">
                          Link your Instagram professional or creator account to automatically import followers and verify engagement.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider">
                            Account Handle
                          </label>
                          <Input
                            prefix={<span className="text-[#66665E] text-xs font-bold mr-0.5">@</span>}
                            value={igHandle.replace('@', '')}
                            onChange={(e) => setIgHandle(`@${e.target.value.replace(/[^a-zA-Z0-9_.]/g, '')}`)}
                            className="rounded-xl h-10 text-sm font-semibold"
                            placeholder="your_handle"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#F0F0EB] flex items-center justify-between gap-2">
                    {isIgConnected ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            message.loading({ content: 'Syncing Instagram...', key: 'sync-ig' });
                            setTimeout(() => {
                              message.success({ content: 'Instagram metrics updated!', key: 'sync-ig' });
                            }, 500);
                          }}
                          className="text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Re-sync</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDisconnectChannel('instagram')}
                          className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Unlink className="w-3 h-3" />
                          <span>Disconnect</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConnectChannel('instagram')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Connect Instagram</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. TikTok Card */}
                <div
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 ${
                    isTtConnected
                      ? 'bg-white border-[#E7E7E2] shadow-2xs hover:border-[#0A0A0A]'
                      : 'bg-[#FAFAF8] border-dashed border-[#D2D2CA]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TikTokLogo className="w-8 h-8 rounded-xl shadow-2xs shrink-0" />
                        <div>
                          <h4 className="text-base font-bold text-[#0A0A0A]">TikTok</h4>
                          <span className="text-xs text-[#66665E] font-medium">Shortform Videos</span>
                        </div>
                      </div>

                      {isTtConnected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Connected
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E7E7E2] text-[#66665E]">
                          Not Linked
                        </span>
                      )}
                    </div>

                    {isTtConnected ? (
                      <>
                        {/* Connected Handle & Profile URL */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Connected Account
                            </span>
                            <span className="text-sm font-extrabold text-[#0A0A0A] truncate block">
                              {ttHandle}
                            </span>
                          </div>
                          <a
                            href={ttUrl || `https://tiktok.com/@${ttHandle.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white text-[#66665E] hover:text-[#0A0A0A] transition-colors"
                            title="Visit Profile"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        {/* Verified Live Metrics */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Followers
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{ttFollowers}</span>
                              <span className="text-[10px] font-bold text-emerald-600">✓ Verified</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Engagement
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{ttEngagement}</span>
                              <span className="text-[10px] font-medium text-[#66665E]">30d avg</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-[#66665E] flex items-center gap-1 font-medium">
                          <Lock className="w-3 h-3 text-[#A3A39C]" />
                          <span>Metrics verified via TikTok Creator API</span>
                        </div>
                      </>
                    ) : (
                      /* Not Connected State */
                      <div className="space-y-3 py-2">
                        <p className="text-xs text-[#66665E] leading-relaxed">
                          Link your TikTok creator account to automatically sync your audience reach and viral video statistics.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider">
                            Account Handle
                          </label>
                          <Input
                            prefix={<span className="text-[#66665E] text-xs font-bold mr-0.5">@</span>}
                            value={ttHandle.replace('@', '')}
                            onChange={(e) => setTtHandle(`@${e.target.value.replace(/[^a-zA-Z0-9_.]/g, '')}`)}
                            className="rounded-xl h-10 text-sm font-semibold"
                            placeholder="your_handle"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#F0F0EB] flex items-center justify-between gap-2">
                    {isTtConnected ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            message.loading({ content: 'Syncing TikTok...', key: 'sync-tt' });
                            setTimeout(() => {
                              message.success({ content: 'TikTok metrics updated!', key: 'sync-tt' });
                            }, 500);
                          }}
                          className="text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Re-sync</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDisconnectChannel('tiktok')}
                          className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Unlink className="w-3 h-3" />
                          <span>Disconnect</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConnectChannel('tiktok')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Connect TikTok</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. YouTube Card */}
                <div
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 ${
                    isYtConnected
                      ? 'bg-white border-[#E7E7E2] shadow-2xs hover:border-[#0A0A0A]'
                      : 'bg-[#FAFAF8] border-dashed border-[#D2D2CA]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <YouTubeLogo className="w-8 h-8 rounded-xl shadow-2xs shrink-0" />
                        <div>
                          <h4 className="text-base font-bold text-[#0A0A0A]">YouTube</h4>
                          <span className="text-xs text-[#66665E] font-medium">Longform &amp; Shorts</span>
                        </div>
                      </div>

                      {isYtConnected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Connected
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E7E7E2] text-[#66665E]">
                          Not Linked
                        </span>
                      )}
                    </div>

                    {isYtConnected ? (
                      <>
                        {/* Connected Handle & Channel URL */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Connected Channel
                            </span>
                            <span className="text-sm font-extrabold text-[#0A0A0A] truncate block">
                              {ytHandle}
                            </span>
                          </div>
                          <a
                            href={ytUrl || `https://youtube.com/@${ytHandle.toLowerCase().replace(/\s+/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white text-[#66665E] hover:text-[#0A0A0A] transition-colors"
                            title="Visit Channel"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        {/* Verified Live Metrics */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Subscribers
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{ytFollowers}</span>
                              <span className="text-[10px] font-bold text-emerald-600">✓ Verified</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
                            <span className="text-[11px] font-bold text-[#66665E] uppercase tracking-wider block">
                              Engagement
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xl font-black text-[#0A0A0A]">{ytEngagement}</span>
                              <span className="text-[10px] font-medium text-[#66665E]">30d avg</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-[#66665E] flex items-center gap-1 font-medium">
                          <Lock className="w-3 h-3 text-[#A3A39C]" />
                          <span>Metrics verified via YouTube Data API v3</span>
                        </div>
                      </>
                    ) : (
                      /* Not Connected State */
                      <div className="space-y-3 py-2">
                        <p className="text-xs text-[#66665E] leading-relaxed">
                          Link your YouTube channel to verify subscribers, longform viewership, and sponsor integration engagement.
                        </p>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#66665E] uppercase tracking-wider">
                            Channel Name or URL
                          </label>
                          <Input
                            value={ytHandle}
                            onChange={(e) => setYtHandle(e.target.value)}
                            className="rounded-xl h-10 text-sm font-semibold"
                            placeholder="e.g. Sophie Kim Vlogs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#F0F0EB] flex items-center justify-between gap-2">
                    {isYtConnected ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            message.loading({ content: 'Syncing YouTube...', key: 'sync-yt' });
                            setTimeout(() => {
                              message.success({ content: 'YouTube metrics updated!', key: 'sync-yt' });
                            }, 500);
                          }}
                          className="text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Re-sync</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDisconnectChannel('youtube')}
                          className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Unlink className="w-3 h-3" />
                          <span>Disconnect</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleConnectChannel('youtube')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Connect YouTube</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="pt-6 border-t border-[#E7E7E2] flex items-center justify-between">
                <span className="text-xs text-[#66665E] font-medium">
                  Changes to connected handles and status are updated across the marketplace instantly.
                </span>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm"
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

      {/* Lightbox for Gallery Photos */}
      {lightboxPhoto && (
        <CreatorPhotoLightbox
          photo={lightboxPhoto}
          photos={photosList}
          creator={currentCreator}
          onClose={() => setLightboxPhoto(null)}
          onSelectPhoto={(p) => setLightboxPhoto(p)}
          onBookCampaign={() => {}}
        />
      )}
    </div>
  );
}

export default function CreatorProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#66665E]">Loading profile...</div>}>
      <CreatorProfileContent />
    </Suspense>
  );
}
