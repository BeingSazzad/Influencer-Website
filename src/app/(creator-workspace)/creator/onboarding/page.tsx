'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser, switchRole } from '@/redux/slices/authSlice';
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
  Globe,
  Clock,
  CheckCircle2,
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

const COLLAB_PREFERENCES = [
  { id: 'sponsored_posts', title: 'Sponsored Posts & Reels', desc: 'Brand-sponsored feed posts and short-form videos.' },
  { id: 'ugc', title: 'UGC Content Creation', desc: 'High-converting ad assets delivered directly to brand media teams.' },
  { id: 'product_reviews', title: 'Product Reviews & Unboxing', desc: 'In-depth authentic product testing and showcase stories.' },
  { id: 'events', title: 'Events & Experiences', desc: 'On-site brand pop-ups, product launches, and festival coverage.' },
  { id: 'ambassador', title: 'Long-term Ambassador', desc: 'Multi-month retainer partnerships and ongoing brand advocacy.' },
];

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Stepper state: 1 to 6
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 1: Basic Information
  const [name, setName] = useState(currentUser?.name || 'Sophie Kim');
  const [handle, setHandle] = useState(currentUser?.handle?.replace(/^@+/, '') || 'sophiekim');
  const [bio, setBio] = useState(
    currentUser?.bio || 'Fashion, beauty & lifestyle creator based in Europe ✨ Building authentic brand narratives.'
  );
  const [avatar, setAvatar] = useState(
    currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  // Step 2: Location & Languages
  const [country, setCountry] = useState('Switzerland');
  const [city, setCity] = useState('Zürich');
  const [languages, setLanguages] = useState<string[]>(['English', 'German']);
  const [customLang, setCustomLang] = useState('');

  // Step 3: Categories / Niche (1 to 3)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Beauty', 'Fashion', 'Lifestyle']);

  // Step 4: Social Media
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [socialHandle, setSocialHandle] = useState('sophiekim');
  const [followers, setFollowers] = useState('1.2M');

  // Step 5: Content Samples (At least 2-3)
  const [portfolioSamples, setPortfolioSamples] = useState([
    {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      title: 'Aura Skincare • 60s Reel',
      type: 'Reel',
    },
    {
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
      title: 'Vogue & Velour • OOTD Lookbook',
      type: 'UGC Ad',
    },
    {
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
      title: 'Glow Botanical • Product Review',
      type: 'Photo',
    },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState('Reel');

  // Step 6: Collaboration Preferences
  const [selectedCollabs, setSelectedCollabs] = useState<string[]>([
    'sponsored_posts',
    'ugc',
    'product_reviews',
  ]);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step Validation & Navigation
  const handleNext = () => {
    if (step === 1) {
      if (!name.trim()) return message.error('Please enter your display name');
      if (!handle.trim()) return message.error('Please enter your handle');
      if (!bio.trim()) return message.error('Please enter a short bio');
    } else if (step === 2) {
      if (!city.trim() || !country.trim()) return message.error('Please enter your location');
      if (languages.length === 0) return message.error('Please select at least 1 language');
    } else if (step === 3) {
      if (selectedCategories.length < 1 || selectedCategories.length > 3) {
        return message.error('Please select 1 to 3 categories');
      }
    } else if (step === 4) {
      if (!socialHandle.trim()) return message.error('Please enter your social handle');
      if (!followers.trim()) return message.error('Please enter your approximate followers');
    } else if (step === 5) {
      if (portfolioSamples.length < 2) {
        return message.error('Please add at least 2 content samples');
      }
    } else if (step === 6) {
      if (selectedCollabs.length === 0) {
        return message.error('Please select at least 1 collaboration preference');
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

  // Categories Toggle
  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) {
        message.warning('Please keep at least 1 main category.');
        return;
      }
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    } else {
      if (selectedCategories.length >= 3) {
        message.warning('You can choose a maximum of 3 main categories.');
        return;
      }
      setSelectedCategories((prev) => [...prev, catId]);
    }
  };

  // Languages Toggle
  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      if (languages.length === 1) return message.warning('Select at least 1 language');
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

  // Portfolio Add/Remove
  const addSample = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newUrl.trim()) return message.error('Please provide an image or video URL');
    setPortfolioSamples((prev) => [
      ...prev,
      {
        url: newUrl.trim(),
        title: newTitle.trim() || `Content Sample ${prev.length + 1}`,
        type: newType,
      },
    ]);
    setNewUrl('');
    setNewTitle('');
    message.success('Sample added to portfolio');
  };

  const removeSample = (idx: number) => {
    if (portfolioSamples.length <= 2) {
      return message.warning('At least 2 samples are required');
    }
    setPortfolioSamples((prev) => prev.filter((_, i) => i !== idx));
  };

  // Collaboration Toggle
  const toggleCollab = (id: string) => {
    if (selectedCollabs.includes(id)) {
      if (selectedCollabs.length === 1) return message.warning('Select at least 1 collaboration type');
      setSelectedCollabs((prev) => prev.filter((c) => c !== id));
    } else {
      setSelectedCollabs((prev) => [...prev, id]);
    }
  };

  // Submit profile
  const handleSubmit = () => {
    setIsSubmitting(true);

    const cleanH = handle.trim().replace(/^@+/, '');
    const creatorId = `creator-${Date.now().toString().slice(-4)}`;

    const platforms: Creator['platforms'] = {};
    if (platform === 'instagram') {
      platforms.instagram = {
        handle: `@${socialHandle.replace(/^@+/, '')}`,
        followers: 1200000,
        followersFormatted: followers,
        engagementRate: '4.8%',
        avgViews: '150K',
        url: `https://instagram.com/${socialHandle.replace(/^@+/, '')}`,
      };
    } else if (platform === 'tiktok') {
      platforms.tiktok = {
        handle: `@${socialHandle.replace(/^@+/, '')}`,
        followers: 680000,
        followersFormatted: followers,
        engagementRate: '6.2%',
        avgViews: '90K',
        url: `https://tiktok.com/@${socialHandle.replace(/^@+/, '')}`,
      };
    } else {
      platforms.youtube = {
        handle: socialHandle,
        followers: 210000,
        followersFormatted: followers,
        engagementRate: '8.4%',
        avgViews: '45K',
        url: `https://youtube.com/@${socialHandle.toLowerCase()}`,
      };
    }

    const newCreatorProfile: Creator = {
      id: creatorId,
      name,
      handle: `@${cleanH}`,
      avatar,
      bio,
      location: `${city}, ${country}`,
      city,
      country,
      languages,
      collaborationPreferences: selectedCollabs,
      approvalStatus: 'under_review',
      verified: false,
      categories: selectedCategories,
      tags: [...selectedCategories, 'Creator Onboarded', 'Under Review'],
      startingPriceEur: 450,
      rating: 5.0,
      reviewsCount: 0,
      totalCollaborations: 0,
      platforms,
      packages: [
        {
          id: `pkg-${Date.now()}-1`,
          title: 'Dedicated Reel / Shortform Video',
          platform: platform === 'youtube' ? 'youtube' : platform === 'tiktok' ? 'tiktok' : 'instagram',
          type: 'reel',
          description: 'High-retention vertical video with usage rights.',
          priceEur: 450,
          deliveryDays: 4,
          revisions: 2,
          inclusions: ['60-second vertical video', 'Brand tagging & hashtags', '30-day organic usage rights'],
        },
      ],
      portfolio: portfolioSamples.map((s, idx) => ({
        id: `port-${idx + 1}`,
        brandName: 'Featured Campaign',
        campaignTitle: s.title,
        mediaType: (s.type === 'Photo' ? 'image' : 'video') as 'image' | 'video',
        mediaUrl: s.url,
        videoPreviewUrl: s.url,
        views: '120K',
        platform: 'instagram',
        deliverableType: s.type,
      })),
      audience: {
        topCountries: [{ country: country, percentage: 65 }, { country: 'Germany', percentage: 20 }],
        genderSplit: { female: 72, male: 28 },
        topAgeGroup: '21-34',
      },
      reviews: [],
    };

    dispatch(onboardCreator(newCreatorProfile));
    dispatch(
      setUser({
        id: creatorId,
        name,
        email: currentUser?.email || `${cleanH}@influverse.app`,
        role: 'creator',
        handle: `@${cleanH}`,
        avatar,
        location: `${city}, ${country}`,
        bio,
        balanceEur: 0,
      })
    );
    dispatch(switchRole('creator'));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const stepTitles = [
    'Basic Profile',
    'Location & Languages',
    'Categories / Niche',
    'Social Media',
    'Portfolio Samples',
    'Collaboration Preferences',
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Sleek App Header */}
      <header className="border-b border-[#E7E7E2] bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <div className="text-xs font-bold text-[#66665E]">
            Creator Onboarding
          </div>
        </div>
      </header>

      {/* Main Centered Flow */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-xl space-y-6">
          {/* Minimal Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#66665E]">
              <span>Step {step} of {totalSteps}: {stepTitles[step - 1]}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E7E7E2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0A0A0A] transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6">
            {/* STEP 1: BASIC INFORMATION */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Basic Information</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">Set up your public identity for brand discovery.</p>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-4 py-1">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                  />
                  <div className="space-y-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-white text-xs font-black text-[#0A0A0A] cursor-pointer transition-all">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setAvatar(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Display Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sophie Kim"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                  />
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Username / Handle</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#A3A39C]">@</span>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))}
                      placeholder="sophiekim"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Short Bio */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Short Bio</label>
                    <span className="text-xs text-[#A3A39C]">{bio.length}/160</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={160}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your style, focus, and what you create..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION & LANGUAGES */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Location &amp; Languages</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">Help European and global brands find you by market.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] bg-white text-sm font-medium text-[#0A0A0A] outline-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Zürich, Berlin"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Spoken Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_LANGUAGES.map((l) => {
                      const isSelected = languages.includes(l);
                      return (
                        <button
                          key={l}
                          type="button"
                          onClick={() => toggleLanguage(l)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white'
                              : 'bg-[#F4F4F0] text-[#555550] hover:bg-[#E7E7E2]'
                          }`}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Language */}
                  <div className="flex gap-2 pt-2">
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
                      placeholder="Other language..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-[#E7E7E2] text-xs font-medium text-[#0A0A0A] outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCustomLanguage}
                      className="px-3 py-1.5 rounded-xl bg-[#0A0A0A] text-white text-xs font-bold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CATEGORIES / NICHE */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Select 1 to 3 Categories</h2>
                    <p className="text-sm text-[#66665E] font-medium mt-1">Choose the niches your content primarily focuses on.</p>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78]">
                    {selectedCategories.length} of 3
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                            : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-xs font-extrabold">{cat.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: SOCIAL MEDIA */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Primary Social Channel</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">Connect the channel with your main audience reach.</p>
                </div>

                {/* Platform selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlatform('instagram')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      platform === 'instagram'
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                        : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                    }`}
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlatform('tiktok')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      platform === 'tiktok'
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                        : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                    }`}
                  >
                    <span>TikTok</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlatform('youtube')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      platform === 'youtube'
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                        : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                    }`}
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                  </button>
                </div>

                {/* Social Handle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    {platform === 'instagram' ? 'Instagram Username' : platform === 'tiktok' ? 'TikTok Username' : 'YouTube Channel'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#A3A39C]">@</span>
                    <input
                      type="text"
                      value={socialHandle}
                      onChange={(e) => setSocialHandle(e.target.value)}
                      placeholder="username"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Followers count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">Followers / Subscribers</label>
                  <input
                    type="text"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    placeholder="e.g. 1.2M, 250K"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: PORTFOLIO & CONTENT SAMPLES */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Content &amp; Portfolio</h2>
                    <p className="text-sm text-[#66665E] font-medium mt-1">Showcase 2–3 samples of your content style.</p>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    {portfolioSamples.length} samples
                  </span>
                </div>

                {/* Samples Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {portfolioSamples.map((s, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-100 group border border-[#E7E7E2]">
                      <img src={s.url} alt={s.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2.5 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                            {s.type}
                          </span>
                          {portfolioSamples.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeSample(idx)}
                              className="text-white/80 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight truncate">
                          {s.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Add Sample Input */}
                <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">Add Another Sample</span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title / Brand"
                      className="sm:col-span-4 px-3 py-2 rounded-xl border border-[#E7E7E2] text-xs font-medium text-[#0A0A0A] bg-white outline-none"
                    />
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="sm:col-span-3 px-2 py-2 rounded-xl border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] bg-white outline-none"
                    >
                      <option value="Reel">Reel</option>
                      <option value="UGC Ad">UGC Ad</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                    </select>
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="Image / Video URL"
                      className="sm:col-span-5 px-3 py-2 rounded-xl border border-[#E7E7E2] text-xs font-medium text-[#0A0A0A] bg-white outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSample}
                    className="w-full py-2 rounded-xl bg-[#0A0A0A] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sample</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: COLLABORATION PREFERENCES */}
            {step === 6 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Collaboration Preferences</h2>
                  <p className="text-sm text-[#66665E] font-medium mt-1">Select the deal types you are open to receiving from brands.</p>
                </div>

                <div className="space-y-2.5">
                  {COLLAB_PREFERENCES.map((pref) => {
                    const isSelected = selectedCollabs.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => toggleCollab(pref.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                            : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:bg-[#FAFAF8]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-black">{pref.title}</h4>
                          <p className={`text-xs ${isSelected ? 'text-[#D2D2CA]' : 'text-[#66665E]'}`}>
                            {pref.desc}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0 ml-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#F4F4F0]">
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

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleNext}
                className="flex-1 py-3 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-black text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{step === totalSteps ? 'Submit for Review' : 'Continue'}</span>
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
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>Application Submitted • Under Review</span>
              </span>
              <h3 className="text-2xl font-black text-[#0A0A0A]">
                Welcome to Influverse, {name}!
              </h3>
              <p className="text-sm text-[#66665E] font-medium leading-relaxed">
                Your onboarding is complete! Our talent curation team is reviewing your profile (~12–24h).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-left text-xs text-[#555550] space-y-1">
              <div className="font-black text-[#0A0A0A]">Next steps in your Creator Dashboard:</div>
              <p>You can fine-tune deliverable rates for reels, add demographics, and explore campaigns.</p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/creator/dashboard')}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
