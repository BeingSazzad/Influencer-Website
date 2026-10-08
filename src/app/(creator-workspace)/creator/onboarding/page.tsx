'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import { onboardCreator } from '@/redux/slices/creatorSlice';
import { Logo } from '@/components/shared/Logo';
import { Creator } from '@/types';
import {
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Instagram,
  Youtube,
  Clock,
  UploadCloud,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User as UserIcon,
  AtSign,
} from 'lucide-react';
import { message } from 'antd';

// Curated Category list
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

// Curated Country list
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

const COMMON_LANGUAGES = ['English', 'German', 'French', 'Spanish', 'Italian', 'Dutch'];

interface StagedMediaSample {
  url: string;
  name: string;
  isVideo: boolean;
  title: string;
  type: string;
}

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Stepper state: 1 to 5 (Collaboration preference removed per user request)
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // File input refs for native upload
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const sampleFileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Account Credentials & Profile (Starts Raw / Empty)
  const isMockUser = currentUser?.name === 'Sophie Kim' || currentUser?.name === 'Elena Rostova';
  const [name, setName] = useState(currentUser?.name && !isMockUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser?.email && !currentUser.email.includes('sophie') ? currentUser.email : '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [handle, setHandle] = useState(currentUser?.handle && !isMockUser ? currentUser.handle.replace(/^@+/, '') : '');
  const [bio, setBio] = useState(
    currentUser?.bio && !isMockUser && !currentUser.bio.includes('Europe') ? currentUser.bio : ''
  );
  const [avatar, setAvatar] = useState(
    currentUser?.avatar && !currentUser.avatar.includes('534528741775') ? currentUser.avatar : ''
  );

  // Step 2: Location & Languages (Starts Raw / Empty)
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [customLang, setCustomLang] = useState('');

  // Step 3: Categories (Starts Raw / Empty)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Step 4: Social Channels (Starts Raw / Empty)
  const [instagramHandle, setInstagramHandle] = useState('');
  const [instagramFollowers, setInstagramFollowers] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [tiktokFollowers, setTiktokFollowers] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [youtubeFollowers, setYoutubeFollowers] = useState('');

  // Step 5: Portfolio Samples (File Upload Only - Starts Raw / Empty, Skippable)
  const [portfolioSamples, setPortfolioSamples] = useState<
    { url: string; title: string; type: string; isVideo: boolean }[]
  >([]);
  const [stagedMedia, setStagedMedia] = useState<StagedMediaSample | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step Validation & Navigation
  const handleNext = () => {
    if (step === 1) {
      if (!name.trim()) return message.error('Please enter your full name');
      if (!email.trim() || !email.includes('@')) return message.error('Please enter a valid email address');
      if (!handle.trim()) return message.error('Please choose a username');
      if (!currentUser?.id && (!password || password.length < 6)) {
        return message.error('Password must be at least 6 characters');
      }
    } else if (step === 2) {
      if (!country.trim()) return message.error('Please select your country');
      if (!city.trim()) return message.error('Please enter your city');
      if (languages.length === 0) return message.error('Please select at least 1 language');
    } else if (step === 3) {
      if (selectedCategories.length < 1) {
        return message.error('Please select at least 1 category');
      }
      if (selectedCategories.length > 3) {
        return message.error('You can select a maximum of 3 categories');
      }
    } else if (step === 4) {
      if (!instagramHandle.trim() && !tiktokHandle.trim() && !youtubeHandle.trim()) {
        return message.error('Please enter at least one social media channel handle');
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Avatar Upload Handler
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error('Avatar file size must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
      message.success('Profile photo uploaded.');
    };
    reader.readAsDataURL(file);
  };

  // Categories Toggle
  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    } else {
      if (selectedCategories.length >= 3) {
        message.warning('You can choose a maximum of 3 categories.');
        return;
      }
      setSelectedCategories((prev) => [...prev, catId]);
    }
  };

  // Languages Toggle
  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages((prev) => prev.filter((l) => l !== lang));
    } else {
      setLanguages((prev) => [...prev, lang]);
    }
  };

  const addCustomLanguage = () => {
    if (customLang.trim() && !languages.includes(customLang.trim())) {
      setLanguages((prev) => [...prev, customLang.trim()]);
      setCustomLang('');
    }
  };

  // Staged Portfolio File Upload Handler
  const handlePortfolioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      message.error('Please upload an image or video file.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      message.error('File size exceeds the 50MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setStagedMedia({
        url: reader.result as string,
        name: file.name,
        isVideo,
        title: cleanName,
        type: isVideo ? 'Reel' : 'Photo',
      });
      message.success(`${isVideo ? 'Video' : 'Image'} file ready.`);
    };
    reader.readAsDataURL(file);
  };

  const confirmAddStagedSample = () => {
    if (!stagedMedia) return;
    if (!stagedMedia.title.trim()) {
      message.error('Please enter a title for this sample.');
      return;
    }

    setPortfolioSamples((prev) => [
      ...prev,
      {
        url: stagedMedia.url,
        title: stagedMedia.title.trim(),
        type: stagedMedia.type,
        isVideo: stagedMedia.isVideo,
      },
    ]);
    setStagedMedia(null);
    if (sampleFileInputRef.current) {
      sampleFileInputRef.current.value = '';
    }
    message.success('Sample added to portfolio!');
  };

  const removeSample = (idx: number) => {
    setPortfolioSamples((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit profile
  const handleSubmit = () => {
    setIsSubmitting(true);

    const cleanH = (handle.trim() || name.toLowerCase().replace(/\s+/g, '')).replace(/^@+/, '') || `creator${Date.now().toString().slice(-4)}`;
    const creatorId = currentUser?.id || `creator-${Date.now().toString().slice(-4)}`;

    const platforms: Creator['platforms'] = {};
    if (instagramHandle.trim()) {
      const clean = instagramHandle.trim().replace(/^@+/, '');
      platforms.instagram = {
        handle: `@${clean}`,
        followers: 25000,
        followersFormatted: instagramFollowers.trim() || '25K',
        engagementRate: '4.8%',
        avgViews: '15K',
        url: `https://instagram.com/${clean}`,
      };
    }
    if (tiktokHandle.trim()) {
      const clean = tiktokHandle.trim().replace(/^@+/, '');
      platforms.tiktok = {
        handle: `@${clean}`,
        followers: 18000,
        followersFormatted: tiktokFollowers.trim() || '18K',
        engagementRate: '6.2%',
        avgViews: '20K',
        url: `https://tiktok.com/@${clean}`,
      };
    }
    if (youtubeHandle.trim()) {
      const clean = youtubeHandle.trim();
      platforms.youtube = {
        handle: clean,
        followers: 8000,
        followersFormatted: youtubeFollowers.trim() || '8K',
        engagementRate: '7.4%',
        avgViews: '10K',
        url: `https://youtube.com/@${clean.toLowerCase().replace(/\s+/g, '')}`,
      };
    }

    const defaultPlatform = platforms.instagram ? 'instagram' : platforms.tiktok ? 'tiktok' : 'youtube';

    const newCreatorProfile: Creator = {
      id: creatorId,
      name: name.trim() || 'New Creator',
      handle: `@${cleanH}`,
      avatar: avatar || '',
      bio: bio.trim(),
      location: city.trim() && country.trim() ? `${city.trim()}, ${country.trim()}` : country.trim() || city.trim() || 'Europe',
      city: city.trim(),
      country: country.trim(),
      contactEmail: email.trim(),
      contactPhone: phone.trim() || undefined,
      languages: languages.length > 0 ? languages : ['English'],
      approvalStatus: 'under_review',
      verified: false,
      categories: selectedCategories.length > 0 ? selectedCategories : ['Lifestyle'],
      tags: [...selectedCategories, 'Creator Onboarded', 'Under Review'],
      startingPriceEur: 350,
      rating: 5.0,
      reviewsCount: 0,
      totalCollaborations: 0,
      platforms,
      packages: [
        {
          id: `pkg-${Date.now()}-1`,
          title: 'Dedicated Reel / Shortform Video',
          platform: defaultPlatform,
          type: 'reel',
          description: 'High-retention vertical video with commercial usage rights.',
          priceEur: 350,
          deliveryDays: 4,
          revisions: 2,
          inclusions: ['60-second vertical video', 'Brand tagging & hashtags', '30-day organic usage rights'],
        },
      ],
      portfolio: portfolioSamples.map((s, idx) => ({
        id: `port-${idx + 1}`,
        brandName: 'Showcase Project',
        campaignTitle: s.title,
        mediaType: s.isVideo ? 'video' : 'image',
        mediaUrl: s.url,
        videoPreviewUrl: s.url,
        views: '15K',
        platform: defaultPlatform,
        deliverableType: s.type,
      })),
      audience: {
        topCountries: [{ country: country || 'United Kingdom', percentage: 70 }, { country: 'Germany', percentage: 20 }],
        genderSplit: { female: 68, male: 32 },
        topAgeGroup: '21-34',
      },
      reviews: [],
    };

    dispatch(onboardCreator(newCreatorProfile));
    dispatch(
      setUser({
        id: creatorId,
        name: name.trim() || 'New Creator',
        email: email.trim() || `${cleanH}@influverse.app`,
        phone: phone.trim() || undefined,
        role: 'creator',
        handle: `@${cleanH}`,
        avatar: avatar || '',
        location: city.trim() && country.trim() ? `${city.trim()}, ${country.trim()}` : 'Europe',
        bio: bio.trim(),
        balanceEur: 0,
      })
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const stepTitles = [
    'Profile',
    'Location',
    'Categories',
    'Channels',
    'Portfolio',
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Header */}
      <header className="border-b border-[#E7E7E2] bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#66665E]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Creator Setup</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-2xl space-y-6">
          {/* Progress Bar & Stepper */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#FF2D78]">
                  Step {step} of {totalSteps}
                </span>
                <h1 className="text-xl font-black text-[#0A0A0A]">{stepTitles[step - 1]}</h1>
              </div>
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#F4F4F0] text-[#0A0A0A]">
                {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>

            {/* Segmented Step Indicator */}
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx + 1 < step
                      ? 'bg-[#0A0A0A]'
                      : idx + 1 === step
                      ? 'bg-[#FF2D78]'
                      : 'bg-[#E7E7E2]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6">
            {/* STEP 1: ACCOUNT CREDENTIALS & PROFILE */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Profile Details</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">
                    Set up your basic account and public creator details.
                  </p>
                </div>

                {/* Profile Photo (Centered) */}
                <div className="flex flex-col items-center justify-center text-center py-1">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarFileChange}
                  />

                  {avatar ? (
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#0A0A0A] shadow-md cursor-pointer group transition-transform hover:scale-105"
                    >
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-5 h-5 mb-1" />
                        <span className="text-xs font-bold">Change</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      className="w-24 h-24 rounded-full border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-[#F4F4F0] flex flex-col items-center justify-center cursor-pointer transition-all text-[#66665E] hover:text-[#0A0A0A] group hover:scale-105"
                    >
                      <Camera className="w-7 h-7 mb-1 text-[#0A0A0A] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Upload</span>
                    </div>
                  )}

                  <div className="mt-2.5 space-y-0.5 text-center">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors cursor-pointer block mx-auto"
                    >
                      {avatar ? 'Click photo to change' : 'Click to upload photo'}
                    </button>
                    <div className="text-sm text-[#66665E]">
                      JPG, PNG or WEBP (max 10MB)
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#0A0A0A] block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C] hover:text-[#0A0A0A] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Username <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="text"
                        value={handle}
                        autoComplete="off"
                        onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))}
                        placeholder="yourusername"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Bio
                    </label>
                    <span className="text-sm text-[#66665E] font-medium">{bio.length}/160</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={160}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell brands what you create, your aesthetics, and what makes your content unique..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION & LANGUAGES */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Location &amp; Languages</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">
                    Where you are based and languages you speak.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] bg-white text-sm font-medium text-[#0A0A0A] outline-none cursor-pointer"
                    >
                      <option value="">Select country...</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#0A0A0A] block">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. London, Zürich, Berlin"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2.5">
                  <label className="text-sm font-bold text-[#0A0A0A] block">
                    Content Languages <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_LANGUAGES.map((l) => {
                      const isSelected = languages.includes(l);
                      return (
                        <button
                          key={l}
                          type="button"
                          onClick={() => toggleLanguage(l)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white shadow-xs'
                              : 'bg-[#F4F4F0] text-[#555550] hover:bg-[#E7E7E2]'
                          }`}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Language */}
                  <div className="flex gap-2 pt-1 max-w-sm">
                    <input
                      type="text"
                      value={customLang}
                      onChange={(e) => setCustomLang(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomLanguage();
                        }
                      }}
                      placeholder="Add another language..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] text-sm font-medium text-[#0A0A0A] outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCustomLanguage}
                      className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] text-white text-sm font-bold cursor-pointer hover:bg-black transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CATEGORIES */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Categories</h2>
                    <p className="text-sm text-[#66665E] font-medium mt-1">
                      Choose 1 to 3 categories that define your work.
                    </p>
                  </div>
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78]">
                    {selectedCategories.length} / 3 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                            : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-sm font-extrabold">{cat.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: SOCIAL CHANNELS */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Social Channels</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">
                    Add at least one platform you create on.
                  </p>
                </div>

                {/* Instagram */}
                <div className="p-4 rounded-2xl border border-[#E7E7E2] bg-white space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#A3A39C]">@</span>
                      <input
                        type="text"
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        placeholder="your_handle"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={instagramFollowers}
                      onChange={(e) => setInstagramFollowers(e.target.value)}
                      placeholder="Followers (e.g. 25K)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                    />
                  </div>
                </div>

                {/* TikTok */}
                <div className="p-4 rounded-2xl border border-[#E7E7E2] bg-white space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                    <span className="text-base">🎵</span>
                    <span>TikTok</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#A3A39C]">@</span>
                      <input
                        type="text"
                        value={tiktokHandle}
                        onChange={(e) => setTiktokHandle(e.target.value)}
                        placeholder="your_handle"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={tiktokFollowers}
                      onChange={(e) => setTiktokFollowers(e.target.value)}
                      placeholder="Followers (e.g. 50K)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="p-4 rounded-2xl border border-[#E7E7E2] bg-white space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-[#0A0A0A]">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={youtubeHandle}
                      onChange={(e) => setYoutubeHandle(e.target.value)}
                      placeholder="Channel Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                    />
                    <input
                      type="text"
                      value={youtubeFollowers}
                      onChange={(e) => setYoutubeFollowers(e.target.value)}
                      placeholder="Subscribers (e.g. 10K)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] text-sm font-medium text-[#0A0A0A] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: PORTFOLIO (File Upload Only & Skippable) */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Portfolio</h2>
                    <p className="text-sm text-[#66665E] font-medium mt-1">
                      Upload image or video files. <span className="text-[#FF2D78] font-bold">This step is optional.</span>
                    </p>
                  </div>
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-zinc-100 text-[#0A0A0A]">
                    {portfolioSamples.length} Uploaded
                  </span>
                </div>

                {/* Hidden File Picker */}
                <input
                  ref={sampleFileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handlePortfolioFileChange}
                />

                {/* Native File Upload Area */}
                {!stagedMedia ? (
                  <div
                    onClick={() => sampleFileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] rounded-2xl p-8 text-center cursor-pointer transition-all bg-[#FAFAF8] hover:bg-[#F4F4F0] space-y-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-[#E7E7E2] group-hover:border-[#0A0A0A] group-hover:scale-105 transition-all flex items-center justify-center mx-auto text-[#0A0A0A] shadow-xs">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-base font-bold text-[#0A0A0A]">
                      Click to choose video or photo file
                    </div>
                    <div className="text-sm text-[#66665E]">
                      Supports MP4, MOV, WEBM, PNG, JPG up to 50MB
                    </div>
                  </div>
                ) : (
                  /* Staged Media Ready to Add */
                  <div className="p-5 rounded-2xl border-2 border-[#0A0A0A] bg-[#FAFAF8] space-y-4">
                    <div className="flex items-start gap-4">
                      {stagedMedia.isVideo ? (
                        <video
                          src={stagedMedia.url}
                          controls
                          className="w-36 h-28 rounded-xl object-cover bg-black shrink-0"
                        />
                      ) : (
                        <img
                          src={stagedMedia.url}
                          alt="Staged"
                          className="w-36 h-28 rounded-xl object-cover border border-[#E7E7E2] shrink-0"
                        />
                      )}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
                            {stagedMedia.isVideo ? 'Video' : 'Image'}
                          </span>
                          <span className="text-sm text-[#66665E] truncate">{stagedMedia.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => sampleFileInputRef.current?.click()}
                          className="text-sm font-bold text-[#FF2D78] hover:underline cursor-pointer"
                        >
                          Change File
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-[#E7E7E2]">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-[#0A0A0A] block">
                          Sample Title
                        </label>
                        <input
                          type="text"
                          value={stagedMedia.title}
                          onChange={(e) =>
                            setStagedMedia({ ...stagedMedia, title: e.target.value })
                          }
                          placeholder="e.g. Summer Lookbook or Product Review"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] bg-white text-sm font-medium text-[#0A0A0A] outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-[#0A0A0A] block">
                          Format
                        </label>
                        <select
                          value={stagedMedia.type}
                          onChange={(e) =>
                            setStagedMedia({ ...stagedMedia, type: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E7E2] bg-white text-sm font-bold text-[#0A0A0A] outline-none cursor-pointer"
                        >
                          <option value="Reel">Reel / Vertical Video</option>
                          <option value="UGC Ad">UGC Video Ad</option>
                          <option value="Photo">Photo Shoot</option>
                          <option value="Video">Full Video</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setStagedMedia(null)}
                        className="px-4 py-2 rounded-xl border border-[#E7E7E2] text-sm font-bold text-[#66665E] hover:text-[#0A0A0A] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmAddStagedSample}
                        className="px-5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-sm font-bold cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Portfolio</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Uploaded Samples Grid */}
                {portfolioSamples.length > 0 ? (
                  <div className="space-y-2.5 pt-2">
                    <span className="text-sm font-bold text-[#0A0A0A] block">
                      Added Samples ({portfolioSamples.length})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {portfolioSamples.map((s, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black group border border-[#E7E7E2]"
                        >
                          {s.isVideo ? (
                            <video src={s.url} className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <img src={s.url} alt={s.title} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                                {s.type}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeSample(idx)}
                                className="text-white/80 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white leading-tight truncate">
                              {s.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5 px-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] text-sm text-[#66665E]">
                    No samples added yet. You can upload media now or skip and add anytime later from your portfolio studio.
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 pt-5 border-t border-[#F4F4F0]">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-3 px-5 rounded-2xl border border-[#E7E7E2] hover:border-[#0A0A0A] text-sm font-bold text-[#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {/* In step 5, allow explicit Skip for now option */}
              {step === 5 && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="py-3.5 px-6 rounded-2xl border border-[#E7E7E2] hover:border-[#0A0A0A] text-sm font-bold text-[#66665E] hover:text-[#0A0A0A] transition-all cursor-pointer"
                >
                  Skip for Now
                </button>
              )}

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleNext}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{step === totalSteps ? 'Complete Profile' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Celebratory Completion Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#E7E7E2] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Clock className="w-4 h-4" />
                <span>Application Submitted</span>
              </span>
              <h3 className="text-2xl font-black text-[#0A0A0A]">
                Welcome, {name || 'Creator'}!
              </h3>
              <p className="text-sm text-[#66665E] font-medium leading-relaxed">
                Your creator account has been created. You can now access your dashboard and manage campaigns.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/creator/dashboard')}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
