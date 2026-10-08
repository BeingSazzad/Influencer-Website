'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser, switchRole } from '@/redux/slices/authSlice';
import { onboardCreator } from '@/redux/slices/creatorSlice';
import { Logo } from '@/components/shared/Logo';
import { Creator, PlatformType } from '@/types';
import {
  Lock,
  Mail,
  User as UserIcon,
  Sparkles,
  Building,
  AtSign,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  MapPin,
  Globe,
  Camera,
  Film,
  Instagram,
  Youtube,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Award,
  CheckCircle2,
  Clock,
  Send,
  ExternalLink,
  ChevronRight,
  FileCheck,
  ThumbsUp,
  Sliders,
  DollarSign,
  Layers,
  Heart,
  Share2,
} from 'lucide-react';
import { message } from 'antd';

// Default avatars & initial work samples
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
];

const PRESET_WORK_SAMPLES = [
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
];

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
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
];

// Curated Languages
const AVAILABLE_LANGUAGES = [
  'English',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Bengali',
  'Arabic',
  'Dutch',
  'Portuguese',
  'Hindi',
];

// Collaboration Types
const COLLAB_PREFERENCES = [
  { id: 'sponsored_posts', label: 'Sponsored Posts & Reels', icon: '📱', desc: 'Dedicated feed posts, reels, and stories' },
  { id: 'ugc_creation', label: 'User-Generated Content (UGC)', icon: '🎥', desc: 'Raw & edited video ads for brand channels' },
  { id: 'product_reviews', label: 'Product Reviews & Unboxing', icon: '📦', desc: 'Honest demonstrations & product showcases' },
  { id: 'event_attendance', label: 'Events & Brand Launches', icon: '🎟️', desc: 'VIP appearances, store openings, and popups' },
  { id: 'ambassador', label: 'Long-term Brand Ambassador', icon: '⭐', desc: 'Multi-month retainer & exclusive partnerships' },
  { id: 'affiliate', label: 'Affiliate & Co-Marketing', icon: '🤝', desc: 'Commission-based sales & discount codes' },
];

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { creators } = useAppSelector((state) => state.creator);

  const initialRoleParam = searchParams.get('role');
  const [role, setRole] = useState<'brand' | 'creator'>(
    initialRoleParam === 'creator' ? 'creator' : 'brand'
  );

  useEffect(() => {
    if (initialRoleParam === 'creator') setRole('creator');
    else if (initialRoleParam === 'brand') setRole('brand');
  }, [initialRoleParam]);

  // Stepper: 1 (Basic Info) -> 2 (Location & Languages) -> 3 (Niche) -> 4 (Social Media) -> 5 (Portfolio) -> 6 (Collab Prefs) -> 7 (Review & Submit)
  const [creatorStep, setCreatorStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // BRAND REGISTRATION STATE
  const [companyName, setCompanyName] = useState('');
  const [brandContactName, setBrandContactName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandPassword, setBrandPassword] = useState('');
  const [brandIndustry, setBrandIndustry] = useState('Beauty & Skincare');

  // CREATOR ONBOARDING STATE
  // 1. Basic Information
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);
  const [creatorName, setCreatorName] = useState('Sophie Kim');
  const [handle, setHandle] = useState('sophiekim');
  const [bio, setBio] = useState('Fashion, beauty & lifestyle creator based in Europe ✨ Building authentic brand narratives.');
  const [creatorEmail, setCreatorEmail] = useState('sophie.kim@example.com');
  const [creatorPassword, setCreatorPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // 2. Location & Languages
  const [country, setCountry] = useState('Switzerland');
  const [city, setCity] = useState('Zürich');
  const [languages, setLanguages] = useState<string[]>(['English', 'German']);
  const [customLanguage, setCustomLanguage] = useState('');

  // 3. Categories / Niche (1-3 main categories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Beauty', 'Fashion', 'Lifestyle']);

  // 4. Social Media (At least 1 main platform)
  const [primaryPlatform, setPrimaryPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [igHandle, setIgHandle] = useState('sophiekim');
  const [igFollowers, setIgFollowers] = useState('1.2M');
  const [ttHandle, setTtHandle] = useState('sophiekim');
  const [ttFollowers, setTtFollowers] = useState('680K');
  const [ytHandle, setYtHandle] = useState('Sophie Kim Vlogs');
  const [ytFollowers, setYtFollowers] = useState('210K');

  // 5. Content / Portfolio (At least 2-3 content samples)
  const [portfolioSamples, setPortfolioSamples] = useState(PRESET_WORK_SAMPLES);
  const [newSampleUrl, setNewSampleUrl] = useState('');
  const [newSampleTitle, setNewSampleTitle] = useState('');
  const [newSampleType, setNewSampleType] = useState('Reel');

  // 6. Collaboration Preferences
  const [selectedCollabPrefs, setSelectedCollabPrefs] = useState<string[]>([
    'sponsored_posts',
    'ugc_creation',
    'product_reviews',
  ]);
  const [collaborationNote, setCollaborationNote] = useState(
    'Excited to collaborate with sustainable luxury, skincare, and modern apparel brands.'
  );

  // 7. Post-Submission Success Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  // Handle availability check
  const cleanHandle = handle.replace('@', '').trim().toLowerCase();
  const isHandleTaken = useMemo(() => {
    if (!cleanHandle) return false;
    return creators.some(
      (c) => c.handle.replace('@', '').toLowerCase() === cleanHandle && cleanHandle !== 'sophiekim'
    );
  }, [cleanHandle, creators]);

  const isHandleValidFormat = useMemo(() => {
    if (!cleanHandle) return true;
    return /^[a-z0-9_.]+$/.test(cleanHandle) && cleanHandle.length >= 3;
  }, [cleanHandle]);

  // Category Toggle (Strictly 1-3)
  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) {
        message.warning('You must keep at least 1 main category.');
        return;
      }
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    } else {
      if (selectedCategories.length >= 3) {
        message.warning('Maximum 3 main categories allowed for focused brand discovery.');
        return;
      }
      setSelectedCategories((prev) => [...prev, catId]);
    }
  };

  // Language Toggle
  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      if (languages.length === 1) {
        message.warning('Select at least 1 language you speak.');
        return;
      }
      setLanguages((prev) => prev.filter((l) => l !== lang));
    } else {
      setLanguages((prev) => [...prev, lang]);
    }
  };

  const addCustomLanguage = () => {
    if (customLanguage.trim() && !languages.includes(customLanguage.trim())) {
      setLanguages((prev) => [...prev, customLanguage.trim()]);
      setCustomLanguage('');
    }
  };

  // Collab Prefs Toggle
  const toggleCollabPref = (prefId: string) => {
    if (selectedCollabPrefs.includes(prefId)) {
      if (selectedCollabPrefs.length === 1) {
        message.warning('Please select at least 1 collaboration type.');
        return;
      }
      setSelectedCollabPrefs((prev) => prev.filter((id) => id !== prefId));
    } else {
      setSelectedCollabPrefs((prev) => [...prev, prefId]);
    }
  };

  // Add Portfolio Sample
  const handleAddSample = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSampleUrl.trim()) {
      message.error('Please provide a sample image URL or upload a file.');
      return;
    }
    setPortfolioSamples((prev) => [
      ...prev,
      {
        url: newSampleUrl.trim(),
        title: newSampleTitle.trim() || `Portfolio Sample ${prev.length + 1}`,
        type: newSampleType,
      },
    ]);
    setNewSampleUrl('');
    setNewSampleTitle('');
    message.success('Content sample added to portfolio.');
  };

  // Remove Portfolio Sample
  const handleRemoveSample = (index: number) => {
    if (portfolioSamples.length <= 2) {
      message.warning('At least 2 content samples are required for brand review.');
      return;
    }
    setPortfolioSamples((prev) => prev.filter((_, i) => i !== index));
  };

  // Step Validation Helpers
  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!creatorName.trim()) {
          message.error('Please enter your display name.');
          return false;
        }
        if (!cleanHandle || isHandleTaken || !isHandleValidFormat) {
          message.error('Please enter a valid unique username.');
          return false;
        }
        if (!bio.trim()) {
          message.error('Please provide a short bio.');
          return false;
        }
        return true;
      case 2:
        if (!country.trim() || !city.trim()) {
          message.error('Please provide your country and city.');
          return false;
        }
        if (languages.length === 0) {
          message.error('Please select at least 1 language.');
          return false;
        }
        return true;
      case 3:
        if (selectedCategories.length < 1 || selectedCategories.length > 3) {
          message.error('Please select 1 to 3 core categories.');
          return false;
        }
        return true;
      case 4: {
        const hasPrimaryChannel =
          (primaryPlatform === 'instagram' && igHandle.trim()) ||
          (primaryPlatform === 'tiktok' && ttHandle.trim()) ||
          (primaryPlatform === 'youtube' && ytHandle.trim());
        if (!hasPrimaryChannel) {
          message.error(`Please provide your username or link for ${primaryPlatform}.`);
          return false;
        }
        return true;
      }
      case 5:
        if (portfolioSamples.length < 2) {
          message.error('Please provide at least 2–3 content samples.');
          return false;
        }
        return true;
      case 6:
        if (selectedCollabPrefs.length === 0) {
          message.error('Please select at least 1 collaboration preference.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(creatorStep)) {
      setCreatorStep((prev) => Math.min(7, prev + 1) as any);
    }
  };

  // BRAND REGISTRATION SUBMIT
  const handleBrandRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !brandEmail.trim()) {
      message.error('Please provide your brand name and email.');
      return;
    }
    const newBrandUser = {
      id: `user_brand_${Date.now()}`,
      name: brandContactName || companyName,
      email: brandEmail,
      role: 'brand' as const,
      companyName,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      location: 'Berlin & London',
      bio: `${companyName} marketing team.`,
      balanceEur: 5000,
    };

    dispatch(setUser(newBrandUser));
    dispatch(switchRole('brand'));
    message.success(`Welcome to Influverse, ${brandContactName || companyName}! Your Brand Workspace is ready.`);
    router.push('/brand/dashboard');
  };

  // FINAL SUBMISSION FOR REVIEW
  const handleSubmitForReview = () => {
    setIsSubmitting(true);

    const creatorId = `creator-${Date.now().toString().slice(-4)}`;
    const formattedHandle = `@${cleanHandle}`;

    // Construct creator platforms record
    const platforms: Creator['platforms'] = {};
    if (igHandle.trim()) {
      platforms.instagram = {
        handle: `@${igHandle.replace('@', '')}`,
        followers: 1200000,
        followersFormatted: igFollowers || '1.2M',
        engagementRate: '4.8%',
        avgViews: '150K',
        url: `https://instagram.com/${igHandle.replace('@', '')}`,
      };
    }
    if (ttHandle.trim()) {
      platforms.tiktok = {
        handle: `@${ttHandle.replace('@', '')}`,
        followers: 680000,
        followersFormatted: ttFollowers || '680K',
        engagementRate: '6.2%',
        avgViews: '90K',
        url: `https://tiktok.com/@${ttHandle.replace('@', '')}`,
      };
    }
    if (ytHandle.trim()) {
      platforms.youtube = {
        handle: ytHandle,
        followers: 210000,
        followersFormatted: ytFollowers || '210K',
        engagementRate: '8.4%',
        avgViews: '45K',
        url: `https://youtube.com/@${ytHandle.toLowerCase().replace(/\s+/g, '')}`,
      };
    }

    const newCreatorProfile: Creator = {
      id: creatorId,
      name: creatorName,
      handle: formattedHandle,
      avatar,
      bio,
      location: `${city}, ${country}`,
      city,
      country,
      languages,
      collaborationPreferences: selectedCollabPrefs,
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
          id: `pkg-${creatorId}-1`,
          title: 'Dedicated 60s Reel / Video Showcase',
          platform: primaryPlatform,
          type: 'reel',
          description: 'High-definition video showcasing brand messaging and aesthetic delivery.',
          priceEur: 450,
          deliveryDays: 5,
          revisions: 2,
          inclusions: ['1x Dedicated Video', 'Brand collaboration tag', 'Commercial license'],
          popular: true,
        },
      ],
      portfolio: portfolioSamples.map((sample, i) => ({
        id: `port-${creatorId}-${i + 1}`,
        brandName: sample.title.split('•')[0]?.trim() || 'Brand Partner',
        campaignTitle: sample.title,
        mediaType: 'image',
        mediaUrl: sample.url,
        platform: primaryPlatform,
        views: '115K',
        likes: '12.4K',
        engagementRate: '5.2%',
      })),
      photos: portfolioSamples.map((sample, i) => ({
        id: `photo-${creatorId}-${i + 1}`,
        url: sample.url,
        caption: sample.title,
        aspectRatio: 'portrait',
        date: 'October 2026',
        location: `${city}, ${country}`,
      })),
      audience: {
        topCountries: [
          { country, percentage: 52 },
          { country: 'France', percentage: 22 },
          { country: 'Germany', percentage: 16 },
        ],
        genderSplit: { female: 70, male: 30 },
        topAgeGroup: '18-34',
      },
      reviews: [],
    };

    // Save to Redux Store
    dispatch(onboardCreator(newCreatorProfile));
    dispatch(
      setUser({
        id: creatorId,
        name: creatorName,
        email: creatorEmail,
        role: 'creator',
        handle: formattedHandle,
        avatar,
        location: `${city}, ${country}`,
        bio,
        balanceEur: 0,
      })
    );
    dispatch(switchRole('creator'));

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionCompleted(true);
    }, 800);
  };

  const stepsMeta = [
    { number: 1, title: 'Basic Info', desc: 'Identity & Handle' },
    { number: 2, title: 'Location & Lang', desc: 'Country & Speech' },
    { number: 3, title: 'Niche', desc: '1–3 Categories' },
    { number: 4, title: 'Social Media', desc: 'Primary Channel' },
    { number: 5, title: 'Portfolio', desc: '2–3 Work Samples' },
    { number: 6, title: 'Collaboration', desc: 'Partnership Types' },
    { number: 7, title: 'Review & Submit', desc: 'Approval Pipeline' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* ========================================================================= */}
      {/* APP HEADER */}
      {/* ========================================================================= */}
      <header className="border-b border-[#E7E7E2] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#66665E] font-medium hidden sm:inline">Already have an account?</span>
            <Link
              href="/login"
              className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER */}
      {/* ========================================================================= */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: LIVE MARKETPLACE CARD PREVIEW & VALUE PROPOSITION */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creator Onboarding Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
                {role === 'creator'
                  ? 'Join the Verified Creator Marketplace.'
                  : 'Hire top-tier verified creators in Europe.'}
              </h1>
              <p className="text-sm text-[#66665E] font-medium leading-relaxed">
                {role === 'creator'
                  ? 'Complete the 6 mandatory onboarding steps to submit your profile for curation. Once approved, top European brands book you directly.'
                  : 'Access vetted European influencers across Instagram, TikTok, and YouTube with escrow protection.'}
              </p>
            </div>

            {/* LIVE MARKETPLACE CARD PREVIEW FOR CREATOR */}
            {role === 'creator' ? (
              <div className="bg-white rounded-3xl p-5 border border-[#E7E7E2] shadow-lg shadow-black/[0.04] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E7E7E2] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                      Live Marketplace Card Preview
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#FF2D78]">
                    Brand View
                  </span>
                </div>

                {/* Simulated Creator Marketplace Card */}
                <div className="rounded-2xl border border-[#E7E7E2] overflow-hidden bg-[#FAFAF8] p-4 space-y-3.5 transition-all">
                  <div className="flex items-start gap-3.5">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-zinc-200">
                      <img src={avatar} alt={creatorName} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black text-[#0A0A0A] truncate">
                          {creatorName || 'Your Name'}
                        </h4>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Under Review</span>
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#66665E]">
                        @{cleanHandle || 'username'}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-[#66665E] mt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF2D78]" />
                          <span>{city || 'City'}, {country}</span>
                        </span>
                        <span>•</span>
                        <span>{languages.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#44443E] line-clamp-2 leading-relaxed bg-white p-2.5 rounded-xl border border-[#E7E7E2]">
                    {bio || 'Your elevator pitch bio will appear here for brands.'}
                  </p>

                  {/* Categories Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategories.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0A0A0A] text-white"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Primary Social Reach & Portfolio Previews */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {portfolioSamples.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden border border-[#E7E7E2] bg-zinc-100"
                      >
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 text-[9px] font-black px-1.5 py-0.5 rounded bg-black/75 text-white">
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Channel Stats Bar */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#66665E] pt-1 border-t border-[#E7E7E2]/60">
                    <span className="capitalize flex items-center gap-1">
                      {primaryPlatform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-[#FF2D78]" />}
                      {primaryPlatform === 'tiktok' && <Film className="w-3.5 h-3.5 text-black" />}
                      {primaryPlatform === 'youtube' && <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />}
                      <span>{primaryPlatform} Reach</span>
                    </span>
                    <span className="text-[#0A0A0A] font-black">
                      {primaryPlatform === 'instagram' ? igFollowers : primaryPlatform === 'tiktok' ? ttFollowers : ytFollowers} Followers
                    </span>
                  </div>
                </div>

                {/* Pipeline Roadmap Card */}
                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#FF2D78]/20 space-y-2">
                  <h5 className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FF2D78]" />
                    <span>The Influverse Curation Pipeline</span>
                  </h5>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
                    <div className="p-1 rounded bg-[#0A0A0A] text-white">1. Onboard</div>
                    <div className="p-1 rounded bg-pink-100 text-[#FF2D78] font-black">2. Review</div>
                    <div className="p-1 rounded bg-white text-[#66665E] border border-[#E7E7E2]">3. Approval</div>
                    <div className="p-1 rounded bg-white text-[#66665E] border border-[#E7E7E2]">4. Market</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Brand Value Props */
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-[#0A0A0A]">
                    100% escrow protection before content production begins
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#FF2D78] shrink-0" />
                  <span className="text-xs font-bold text-[#0A0A0A]">
                    Transparent flat 15% platform fee — zero monthly software locks
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: ONBOARDING STEPPER & INTERACTIVE FORM */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6">
            {/* ROLE SELECTOR TABS */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#66665E]">
                Select your account role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                    role === 'creator'
                      ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                      : 'border-[#E7E7E2] hover:border-zinc-400 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#FF2D78] flex items-center justify-center shrink-0 border border-pink-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-[#0A0A0A]">Content Creator</h3>
                    <p className="text-[11px] text-[#66665E]">Apply &amp; get booked</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('brand')}
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                    role === 'brand'
                      ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                      : 'border-[#E7E7E2] hover:border-zinc-400 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center shrink-0 border border-[#E7E7E2]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-[#0A0A0A]">Brand Marketer</h3>
                    <p className="text-[11px] text-[#66665E]">Hire vetted talent</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="border-t border-[#E7E7E2]" />

            {/* ================================================================= */}
            {/* BRAND REGISTRATION VIEW */}
            {/* ================================================================= */}
            {role === 'brand' ? (
              <form onSubmit={handleBrandRegister} className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-[#0A0A0A]">Brand Company Details</h2>
                  <p className="text-xs text-[#66665E]">Create your workspace to book creators with escrow safety.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Brand Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aura Skincare Paris"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Contact Person</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={brandContactName}
                      onChange={(e) => setBrandContactName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Business Email</label>
                    <input
                      type="email"
                      required
                      placeholder="brand@company.com"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Industry</label>
                    <select
                      value={brandIndustry}
                      onChange={(e) => setBrandIndustry(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                    >
                      {['Beauty & Skincare', 'Fashion & Luxury', 'Tech & Apps', 'Fitness & Health', 'Food & Beverage', 'Travel & Hospitality'].map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={brandPassword}
                      onChange={(e) => setBrandPassword(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-4"
                >
                  <span>Create Brand Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* ================================================================= */
              /* MANDATORY CREATOR ONBOARDING FLOW */
              /* ================================================================= */
              <div className="space-y-6">
                {/* Modern Stepper Header */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2D78]">
                        Mandatory Onboarding
                      </span>
                      <h3 className="text-base font-black text-[#0A0A0A]">
                        Step {creatorStep} of 7: {stepsMeta[creatorStep - 1]?.title}
                      </h3>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white shadow-xs">
                      {Math.round((creatorStep / 7) * 100)}% Complete
                    </span>
                  </div>

                  {/* Visual 7-step Progress Track */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                      <div
                        key={s}
                        onClick={() => {
                          if (s < creatorStep) setCreatorStep(s as any);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          s < creatorStep
                            ? 'bg-[#FF2D78] cursor-pointer'
                            : s === creatorStep
                            ? 'bg-[#0A0A0A]'
                            : 'bg-[#EAEAE3]'
                        }`}
                        title={stepsMeta[s - 1]?.title}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-[10px] font-bold text-[#66665E] overflow-x-auto pb-1 gap-2">
                    {stepsMeta.map((s) => (
                      <span
                        key={s.number}
                        className={`whitespace-nowrap transition-colors ${
                          s.number === creatorStep
                            ? 'text-[#0A0A0A] font-black underline underline-offset-4 decoration-[#FF2D78]'
                            : s.number < creatorStep
                            ? 'text-[#FF2D78]'
                            : 'text-[#A3A39C]'
                        }`}
                      >
                        {s.number}. {s.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ============================================================= */}
                {/* STEP 1: BASIC INFORMATION */}
                {/* Profile picture, Display name, Username, Short bio */}
                {/* ============================================================= */}
                {creatorStep === 1 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">1. Basic Information</h2>
                      <p className="text-xs text-[#66665E]">
                        Set up your public identity so brands can recognize your brand persona.
                      </p>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Profile Picture (Required)
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 group bg-zinc-100">
                          <img src={avatar} alt="Profile avatar" className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="w-5 h-5 text-white" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === 'string') {
                                      setAvatar(reader.result);
                                      message.success('Profile photo uploaded.');
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="space-y-1">
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold text-[#0A0A0A] cursor-pointer shadow-2xs transition-all">
                            <Camera className="w-4 h-4 text-[#FF2D78]" />
                            <span>Upload Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === 'string') {
                                      setAvatar(reader.result);
                                      message.success('Profile photo uploaded.');
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-[#66665E]">Recommended: Square 500x500px JPG or PNG</p>
                        </div>
                      </div>
                    </div>

                    {/* Display Name & Username */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                          Display Name
                        </label>
                        <input
                          type="text"
                          required
                          value={creatorName}
                          onChange={(e) => setCreatorName(e.target.value)}
                          placeholder="e.g. Sophie Kim"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                            Username / Handle
                          </label>
                          {cleanHandle && (
                            <span
                              className={`text-[10px] font-bold ${
                                isHandleTaken ? 'text-rose-500' : 'text-emerald-600'
                              }`}
                            >
                              {isHandleTaken ? 'Taken' : 'Available'}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#66665E]">
                            @
                          </span>
                          <input
                            type="text"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                            placeholder="sophiekim"
                            className="w-full h-11 pl-8 pr-3 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Short Bio */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                          Short Bio (Elevator Pitch)
                        </label>
                        <span className="text-[10px] font-semibold text-[#A3A39C]">
                          {bio.length} / 160 characters
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        maxLength={160}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="e.g. Fashion, beauty & lifestyle creator based in Europe. Creating cinematic UGC for luxury brands."
                        className="w-full p-3 rounded-xl border border-[#E7E7E2] text-xs font-medium outline-none focus:border-[#0A0A0A] resize-none"
                      />
                      <p className="text-[11px] text-[#66665E]">
                        Keep it concise. Brands read this first on search and directory cards.
                      </p>
                    </div>

                    {/* Account Login Credentials */}
                    <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                      <span className="text-[11px] font-bold uppercase text-[#66665E] block">
                        Account Login Credentials
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="email"
                          required
                          value={creatorEmail}
                          onChange={(e) => setCreatorEmail(e.target.value)}
                          placeholder="creator@email.com"
                          className="h-9 px-3 rounded-lg border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A]"
                        />
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={creatorPassword}
                            onChange={(e) => setCreatorPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full h-9 px-3 pr-8 rounded-lg border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#66665E] hover:text-black cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Location &amp; Languages</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 2: LOCATION & LANGUAGES */}
                {/* Country, City, Languages */}
                {/* ============================================================= */}
                {creatorStep === 2 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">2. Location &amp; Languages</h2>
                      <p className="text-xs text-[#66665E]">
                        European and international brands filter talent by market location and spoken languages.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Country */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">City</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Zürich, Berlin, Paris"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                    </div>

                    {/* Languages Spoken */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                          Spoken Languages (Select all that apply)
                        </label>
                        <span className="text-xs font-extrabold text-[#0A0A0A]">
                          {languages.length} Selected
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_LANGUAGES.map((lang) => {
                          const isSelected = languages.includes(lang);
                          return (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => toggleLanguage(lang)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                                  : 'bg-white text-[#0A0A0A] border-[#E7E7E2] hover:border-zinc-400'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-[#FF2D78]" />}
                              <span>{lang}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Add Custom Language Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={customLanguage}
                          onChange={(e) => setCustomLanguage(e.target.value)}
                          placeholder="Add another language..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCustomLanguage();
                            }
                          }}
                          className="h-9 px-3 rounded-xl border border-[#E7E7E2] text-xs font-medium outline-none focus:border-[#0A0A0A] flex-1"
                        />
                        <button
                          type="button"
                          onClick={addCustomLanguage}
                          className="h-9 px-3 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(1)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Niche &amp; Categories</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 3: CATEGORIES / NICHE */}
                {/* 1–3 main categories (e.g. Fashion, Beauty, Fitness, Gaming) */}
                {/* ============================================================= */}
                {creatorStep === 3 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-[#0A0A0A]">3. Categories / Niche</h2>
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/20">
                          {selectedCategories.length} of 3 selected
                        </span>
                      </div>
                      <p className="text-xs text-[#66665E]">
                        Select <strong>1 to 3 main categories</strong>. Keeping it focused ensures brands find you for the most relevant campaigns.
                      </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategories.includes(cat.id);
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => toggleCategory(cat.id)}
                            className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-sm'
                                : 'border-[#E7E7E2] hover:border-zinc-400 bg-white text-[#0A0A0A]'
                            }`}
                          >
                            <span className="text-base">{cat.icon}</span>
                            <span className="truncate flex-1">{cat.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FF2D78] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-xs text-[#66665E] flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#FF2D78] shrink-0" />
                      <span>
                        Need more niches or specific micro-tags? You can add detailed sub-niches later during Profile Completion.
                      </span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(2)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Social Media</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 4: SOCIAL MEDIA */}
                {/* At least 1 main social platform, username/profile link, followers */}
                {/* ============================================================= */}
                {creatorStep === 4 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">4. Social Media Channels</h2>
                      <p className="text-xs text-[#66665E]">
                        Connect <strong>at least 1 main social platform</strong> where you create and distribute content.
                      </p>
                    </div>

                    {/* Primary Platform Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Select Primary Social Platform (Required)
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setPrimaryPlatform('instagram')}
                          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                            primaryPlatform === 'instagram'
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] text-[#0A0A0A] shadow-xs'
                              : 'border-[#E7E7E2] bg-white text-[#66665E]'
                          }`}
                        >
                          <Instagram className="w-4 h-4 text-[#FF2D78]" />
                          <span>Instagram</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPrimaryPlatform('tiktok')}
                          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                            primaryPlatform === 'tiktok'
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] text-[#0A0A0A] shadow-xs'
                              : 'border-[#E7E7E2] bg-white text-[#66665E]'
                          }`}
                        >
                          <Film className="w-4 h-4 text-black" />
                          <span>TikTok</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPrimaryPlatform('youtube')}
                          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                            primaryPlatform === 'youtube'
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] text-[#0A0A0A] shadow-xs'
                              : 'border-[#E7E7E2] bg-white text-[#66665E]'
                          }`}
                        >
                          <Youtube className="w-4 h-4 text-[#FF0000]" />
                          <span>YouTube</span>
                        </button>
                      </div>
                    </div>

                    {/* Platform Detail Inputs */}
                    <div className="space-y-3">
                      {/* Instagram Box */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          primaryPlatform === 'instagram'
                            ? 'border-[#0A0A0A] bg-[#FAFAF8]'
                            : 'border-[#E7E7E2] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5">
                            <Instagram className="w-4 h-4 text-[#FF2D78]" />
                            <span>Instagram Handle &amp; Followers</span>
                          </span>
                          {primaryPlatform === 'instagram' && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#66665E]">@</span>
                            <input
                              type="text"
                              value={igHandle}
                              onChange={(e) => setIgHandle(e.target.value.replace('@', ''))}
                              placeholder="instagram_handle"
                              className="w-full h-10 pl-7 pr-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                            />
                          </div>
                          <input
                            type="text"
                            value={igFollowers}
                            onChange={(e) => setIgFollowers(e.target.value)}
                            placeholder="Followers (e.g. 1.2M, 50K)"
                            className="w-full h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>

                      {/* TikTok Box */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          primaryPlatform === 'tiktok'
                            ? 'border-[#0A0A0A] bg-[#FAFAF8]'
                            : 'border-[#E7E7E2] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5">
                            <Film className="w-4 h-4 text-black" />
                            <span>TikTok Profile &amp; Followers</span>
                          </span>
                          {primaryPlatform === 'tiktok' && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#66665E]">@</span>
                            <input
                              type="text"
                              value={ttHandle}
                              onChange={(e) => setTtHandle(e.target.value.replace('@', ''))}
                              placeholder="tiktok_handle"
                              className="w-full h-10 pl-7 pr-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                            />
                          </div>
                          <input
                            type="text"
                            value={ttFollowers}
                            onChange={(e) => setTtFollowers(e.target.value)}
                            placeholder="Followers (e.g. 680K)"
                            className="w-full h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>

                      {/* YouTube Box */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          primaryPlatform === 'youtube'
                            ? 'border-[#0A0A0A] bg-[#FAFAF8]'
                            : 'border-[#E7E7E2] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5">
                            <Youtube className="w-4 h-4 text-[#FF0000]" />
                            <span>YouTube Channel &amp; Subscribers</span>
                          </span>
                          {primaryPlatform === 'youtube' && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            type="text"
                            value={ytHandle}
                            onChange={(e) => setYtHandle(e.target.value)}
                            placeholder="Channel Name or @handle"
                            className="w-full h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                          <input
                            type="text"
                            value={ytFollowers}
                            onChange={(e) => setYtFollowers(e.target.value)}
                            placeholder="Subscribers (e.g. 210K)"
                            className="w-full h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(3)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Portfolio Samples</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 5: CONTENT / PORTFOLIO */}
                {/* At least 2–3 content samples so brands understand their style */}
                {/* ============================================================= */}
                {creatorStep === 5 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-[#0A0A0A]">5. Content &amp; Portfolio</h2>
                        <span
                          className={`text-xs font-black px-2.5 py-1 rounded-full ${
                            portfolioSamples.length >= 2
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {portfolioSamples.length} of 2 min required
                        </span>
                      </div>
                      <p className="text-xs text-[#66665E]">
                        Provide <strong>at least 2–3 content samples</strong> so brands can immediately understand your visual style, framing, and storytelling quality.
                      </p>
                    </div>

                    {/* Work Samples Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {portfolioSamples.map((sample, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-4/5 rounded-2xl overflow-hidden border border-[#E7E7E2] bg-zinc-100 group shadow-2xs"
                        >
                          <img src={sample.url} alt={sample.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                            <span className="text-[10px] font-black uppercase text-[#FF2D78]">
                              {sample.type}
                            </span>
                            <span className="text-xs font-bold text-white line-clamp-1">
                              {sample.title}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveSample(idx)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-rose-600"
                            title="Remove sample"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Sample Section */}
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E] block">
                        Add Content Sample (Image File or URL)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newSampleTitle}
                          onChange={(e) => setNewSampleTitle(e.target.value)}
                          placeholder="Campaign / Title (e.g. Summer Lookbook)"
                          className="h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A] sm:col-span-2"
                        />
                        <select
                          value={newSampleType}
                          onChange={(e) => setNewSampleType(e.target.value)}
                          className="h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-bold outline-none focus:border-[#0A0A0A] cursor-pointer"
                        >
                          {['Reel', 'UGC Ad', 'Photo', 'Carousel', 'Story'].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={newSampleUrl}
                          onChange={(e) => setNewSampleUrl(e.target.value)}
                          placeholder="Paste image URL (https://...)"
                          className="h-10 px-3 rounded-xl border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A] flex-1"
                        />
                        <label className="h-10 px-3 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                          <Camera className="w-3.5 h-3.5 text-[#FF2D78]" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === 'string') {
                                    setNewSampleUrl(reader.result);
                                    message.success('File loaded into preview.');
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddSample()}
                          className="h-10 px-4 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-bold cursor-pointer shrink-0 transition-colors"
                        >
                          Add Sample
                        </button>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(4)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Collaboration Preferences</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 6: COLLABORATION PREFERENCES */}
                {/* What type of collaborations they're interested in */}
                {/* ============================================================= */}
                {creatorStep === 6 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">6. Collaboration Preferences</h2>
                      <p className="text-xs text-[#66665E]">
                        Select what format of collaborations you are eager to take on with brand partners.
                      </p>
                    </div>

                    {/* Collaboration Types Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COLLAB_PREFERENCES.map((pref) => {
                        const isSelected = selectedCollabPrefs.includes(pref.id);
                        return (
                          <div
                            key={pref.id}
                            onClick={() => toggleCollabPref(pref.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                                : 'border-[#E7E7E2] hover:border-zinc-400 bg-white'
                            }`}
                          >
                            <span className="text-xl shrink-0 mt-0.5">{pref.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-black text-[#0A0A0A] flex items-center justify-between">
                                <span>{pref.label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#FF2D78]" />}
                              </h4>
                              <p className="text-[11px] text-[#66665E] mt-0.5 leading-snug">
                                {pref.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Collaboration Notes / Pitch */}
                    <div className="space-y-1 pt-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Brand Partnership Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={collaborationNote}
                        onChange={(e) => setCollaborationNote(e.target.value)}
                        placeholder="e.g. Open to gifting for high-tier products, interested in long-term ambassador roles."
                        className="w-full p-3 rounded-xl border border-[#E7E7E2] text-xs font-medium outline-none focus:border-[#0A0A0A] resize-none"
                      />
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(5)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Review Application Summary</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* STEP 7: REVIEW & SUBMIT FOR APPROVAL */}
                {/* Submit for Review → Under Review → Influverse Approval → Marketplace */}
                {/* ============================================================= */}
                {creatorStep === 7 && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>All 6 Mandatory Steps Completed</span>
                      </div>
                      <h2 className="text-xl font-black text-[#0A0A0A]">Ready to Submit for Review</h2>
                      <p className="text-xs text-[#66665E]">
                        Review your application details below. Once submitted, your profile moves into our curation pipeline.
                      </p>
                    </div>

                    {/* 6-Step Checklist Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">1. Basic Info</span>
                          <span className="text-xs font-bold text-[#0A0A0A]">{creatorName} (@{cleanHandle})</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">2. Location &amp; Lang</span>
                          <span className="text-xs font-bold text-[#0A0A0A]">{city}, {country} ({languages.length} lang)</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">3. Niches</span>
                          <span className="text-xs font-bold text-[#0A0A0A]">{selectedCategories.join(', ')}</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">4. Main Social</span>
                          <span className="text-xs font-bold text-[#0A0A0A] capitalize">{primaryPlatform} ({primaryPlatform === 'instagram' ? igFollowers : primaryPlatform === 'tiktok' ? ttFollowers : ytFollowers})</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">5. Portfolio</span>
                          <span className="text-xs font-bold text-[#0A0A0A]">{portfolioSamples.length} Content Samples</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#66665E] uppercase block">6. Collab Prefs</span>
                          <span className="text-xs font-bold text-[#0A0A0A]">{selectedCollabPrefs.length} Collab Types</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>

                    {/* What Happens Next Roadmap Card */}
                    <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white space-y-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FF2D78]" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          What happens next after submission?
                        </h4>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#FF2D78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            1
                          </div>
                          <div>
                            <span className="font-bold text-white">Under Review:</span>
                            <p className="text-[#A3A39C] text-[11px] mt-0.2">
                              Influverse talent curation team checks social reach and portfolio quality within 12–24h.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            2
                          </div>
                          <div>
                            <span className="font-bold text-white">Influverse Approval &amp; Escrow Badge:</span>
                            <p className="text-[#A3A39C] text-[11px] mt-0.2">
                              Your badge is activated with 100% upfront escrow protection.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            3
                          </div>
                          <div>
                            <span className="font-bold text-white">Marketplace Discovery:</span>
                            <p className="text-[#A3A39C] text-[11px] mt-0.2">
                              Your profile goes live to 5,000+ top European brands for direct campaign booking.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final Action Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setCreatorStep(6)}
                        className="h-12 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitForReview}
                        disabled={isSubmitting}
                        className="flex-1 h-12 rounded-full bg-[#FF2D78] hover:bg-[#0A0A0A] text-white text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#FF2D78]/25"
                      >
                        {isSubmitting ? (
                          <span>Submitting Application...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit for Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* SUBMISSION SUCCESS MODAL: UNDER REVIEW & ROADMAP */}
      {/* ========================================================================= */}
      {submissionCompleted && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#E7E7E2] shadow-2xl relative text-center">
            {/* Celebration Icon */}
            <div className="w-16 h-16 rounded-3xl bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-8 h-8 text-[#FF2D78]" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Application Submitted • Under Review</span>
              </div>
              <h3 className="text-2xl font-black text-[#0A0A0A]">
                Welcome to Influverse, {creatorName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#66665E] leading-relaxed">
                Your onboarding is complete! Our talent curation team is reviewing your profile and channels.
              </p>
            </div>

            {/* Progression Box */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-[#0A0A0A]">
                <span>Status: Under Review</span>
                <span className="text-[#FF2D78]">Estimated: ~12-24 Hours</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#EAEAE3] overflow-hidden">
                <div className="w-2/3 h-full bg-[#FF2D78] rounded-full animate-pulse" />
              </div>
              <p className="text-[11px] text-[#66665E] leading-normal">
                You can now enter your <strong>Creator Dashboard</strong> to polish optional details like custom rates, audience demographics, and extra packages in your <strong>Profile Completion</strong> widget.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  message.success('Entering Creator Workspace...');
                  router.push('/creator/dashboard');
                }}
                className="w-full h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Enter Creator Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E7E7E2] bg-white py-4 text-center text-xs text-[#66665E]">
        <span>Influverse Inc. • Transparent Creator Marketplace</span>
      </footer>
    </div>
  );
}
