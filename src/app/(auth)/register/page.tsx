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
} from 'lucide-react';
import { message } from 'antd';

// Default presets for avatar & gallery
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
];

const PRESET_WORK_SAMPLES = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
];

const CATEGORIES = [
  { id: 'Beauty', label: 'Beauty & Skincare', icon: '💄' },
  { id: 'Fashion', label: 'Fashion & Style', icon: '👗' },
  { id: 'Fitness', label: 'Fitness & Health', icon: '⚡' },
  { id: 'Travel', label: 'Travel & Adventure', icon: '✈️' },
  { id: 'Food', label: 'Food & Cuisine', icon: '🍴' },
  { id: 'Lifestyle', label: 'Lifestyle & Wellness', icon: '❤️' },
  { id: 'Tech', label: 'Tech & Gaming', icon: '🎮' },
  { id: 'Business', label: 'Business & Finance', icon: '💼' },
  { id: 'Art', label: 'Art & Creativity', icon: '🎨' },
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

  // Creator Stepper State: 1 (Account) -> 2 (Identity & Niches) -> 3 (Socials & Portfolio) -> 4 (Rates & Verification)
  const [creatorStep, setCreatorStep] = useState<1 | 2 | 3 | 4>(1);

  // BRAND REGISTRATION STATE
  const [companyName, setCompanyName] = useState('');
  const [brandContactName, setBrandContactName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandPassword, setBrandPassword] = useState('');
  const [brandIndustry, setBrandIndustry] = useState('Beauty & Skincare');

  // CREATOR REGISTRATION STATE
  // Step 1: Account
  const [creatorName, setCreatorName] = useState('Sophie Kim');
  const [creatorEmail, setCreatorEmail] = useState('sophie.kim@example.com');
  const [creatorPassword, setCreatorPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Identity & Niches
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);
  const [handle, setHandle] = useState('sophiekim');
  const [bio, setBio] = useState('Fashion, beauty & lifestyle creator based in Europe ✨ Building authentic brand narratives.');
  const [country, setCountry] = useState('Switzerland');
  const [city, setCity] = useState('Zürich');
  const [languages, setLanguages] = useState<string[]>(['English', 'German']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Beauty', 'Fashion', 'Lifestyle']);

  // Handle availability
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

  // Step 3: Channels & Work
  const [igHandle, setIgHandle] = useState('sophiekim');
  const [igReach, setIgReach] = useState('1.2M');
  const [ttHandle, setTtHandle] = useState('sophiekim');
  const [ttReach, setTtReach] = useState('680K');
  const [ytHandle, setYtHandle] = useState('Sophie Kim Vlogs');
  const [ytReach, setYtReach] = useState('210K');
  const [samplePhotos, setSamplePhotos] = useState<string[]>(PRESET_WORK_SAMPLES);

  // Step 4: Rates & Verification (EUR)
  const [startingRateEur, setStartingRateEur] = useState<number>(500);
  const [igReelRate, setIgReelRate] = useState<number>(800);
  const [ttVideoRate, setTtVideoRate] = useState<number>(650);
  const [ytVideoRate, setYtVideoRate] = useState<number>(1500);
  const [requestVerification, setRequestVerification] = useState<boolean>(true);

  // Category toggle handler (Max 3)
  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== catId));
    } else {
      if (selectedCategories.length >= 3) {
        message.warning('You can choose up to 3 core categories.');
        return;
      }
      setSelectedCategories((prev) => [...prev, catId]);
    }
  };

  // BRAND SUBMIT
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

  // CREATOR SUBMIT & FINISH
  const handleCreatorComplete = () => {
    if (!creatorName.trim()) {
      message.error('Please enter your full name.');
      setCreatorStep(1);
      return;
    }
    if (!cleanHandle || isHandleTaken || !isHandleValidFormat) {
      message.error('Please choose a valid and unique username.');
      setCreatorStep(2);
      return;
    }

    const creatorId = `creator-${Date.now().toString().slice(-4)}`;
    const formattedHandle = `@${cleanHandle}`;

    const newCreatorProfile: Creator = {
      id: creatorId,
      name: creatorName,
      handle: formattedHandle,
      avatar,
      bio,
      location: `${city}, ${country}`,
      verified: requestVerification,
      categories: selectedCategories.length > 0 ? selectedCategories : ['Lifestyle'],
      tags: [...selectedCategories, 'Verified Creator', 'UGC'],
      startingPriceEur: startingRateEur,
      rating: 5.0,
      reviewsCount: 1,
      totalCollaborations: 0,
      platforms: {
        instagram: {
          handle: `@${igHandle}`,
          followers: 1200000,
          followersFormatted: igReach,
          engagementRate: '4.8%',
          avgViews: '150K',
          url: `https://instagram.com/${igHandle}`,
        },
        tiktok: {
          handle: `@${ttHandle}`,
          followers: 680000,
          followersFormatted: ttReach,
          engagementRate: '6.2%',
          avgViews: '90K',
          url: `https://tiktok.com/@${ttHandle}`,
        },
        youtube: {
          handle: ytHandle,
          followers: 210000,
          followersFormatted: ytReach,
          engagementRate: '8.4%',
          avgViews: '45K',
          url: `https://youtube.com/@${ytHandle.toLowerCase().replace(/\s+/g, '')}`,
        },
      },
      packages: [
        {
          id: `pkg-${creatorId}-1`,
          title: 'Dedicated Instagram 60s Reel',
          platform: 'instagram',
          type: 'reel',
          description: `High-production Instagram Reel highlighting brand deliverables with commercial usage rights.`,
          priceEur: igReelRate,
          deliveryDays: 5,
          revisions: 2,
          inclusions: ['1x 60s Reel', '3x Story frames', 'Brand collaboration tag'],
          popular: true,
        },
        {
          id: `pkg-${creatorId}-2`,
          title: 'TikTok UGC Ad Video',
          platform: 'tiktok',
          type: 'ugc_video',
          description: 'Authentic TikTok UGC video optimized for high conversion and organic engagement.',
          priceEur: ttVideoRate,
          deliveryDays: 4,
          revisions: 2,
          inclusions: ['1x TikTok Video', '4K raw footage delivery', 'Sound sync'],
        },
        {
          id: `pkg-${creatorId}-3`,
          title: 'YouTube Dedicated Video',
          platform: 'youtube',
          type: 'integrated',
          description: 'High-production dedicated YouTube video showcase with link in description.',
          priceEur: ytVideoRate,
          deliveryDays: 7,
          revisions: 2,
          inclusions: ['Dedicated YouTube Video', 'Pinned link in description', '4K master file'],
        },
      ],
      portfolio: samplePhotos.map((url, i) => ({
        id: `port-${creatorId}-${i + 1}`,
        brandName: i === 0 ? 'Aura Skincare' : i === 1 ? 'Vogue & Velour' : 'Glow Botanical',
        campaignTitle: `${selectedCategories[0] || 'Lifestyle'} Collaboration`,
        mediaType: 'image',
        mediaUrl: url,
        platform: 'instagram',
        views: '120K',
        likes: '14.2K',
        engagementRate: '5.1%',
      })),
      photos: samplePhotos.map((url, i) => ({
        id: `photo-${creatorId}-${i + 1}`,
        url,
        caption: `${creatorName} • Portfolio Shoot`,
        aspectRatio: 'portrait',
        date: 'March 2026',
        location: `${city}, ${country}`,
      })),
      audience: {
        topCountries: [
          { country, percentage: 48 },
          { country: 'France', percentage: 24 },
          { country: 'United States', percentage: 18 },
        ],
        genderSplit: { female: 72, male: 28 },
        topAgeGroup: '18-34',
      },
      reviews: [
        {
          id: `rev-${creatorId}-1`,
          brandName: 'Aura Skincare Paris',
          brandLogo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=120&q=80',
          rating: 5,
          comment: 'Excellent content delivery, professional communication, and rapid turnaround.',
          campaignName: 'Product Launch Campaign',
          date: 'March 2026',
        },
      ],
    };

    // Save creator in Redux
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

    message.success(`Welcome to Influverse, ${creatorName}! Your creator workspace is ready.`);
    router.push('/creator/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Navigation Header */}
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

      {/* Main Registration Layout */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: VALUE PROPOSITION & LIVE INTERACTIVE PREVIEW */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Marketplace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight leading-[1.15]">
                {role === 'creator'
                  ? 'Get discovered. Monetize your content with global brands.'
                  : 'Hire top-tier verified content creators in Europe.'}
              </h1>
              <p className="text-sm sm:text-base text-[#66665E] font-medium leading-relaxed">
                {role === 'creator'
                  ? 'Set your own EUR deliverables, receive 100% upfront escrow protection, and keep 100% of your earnings with zero platform fee.'
                  : 'Discover vetted creators across Instagram, TikTok, and YouTube with escrow protection.'}
              </p>
            </div>

            {/* VALUE PROPOSITIONS LIST (NO FAKE PREVIEW CARD) */}
            {role === 'creator' ? (
              <div className="space-y-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-start gap-3.5 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A0A0A]">Get discovered by top brands</h4>
                    <p className="text-xs text-[#66665E] mt-0.5">Receive direct inbound campaign offers from verified European companies.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-start gap-3.5 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A0A0A]">100% Upfront Escrow Protection</h4>
                    <p className="text-xs text-[#66665E] mt-0.5">Brand payments are locked in escrow before you produce content. Never chase invoices.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-start gap-3.5 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center shrink-0">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A0A0A]">Multi-platform Showcase</h4>
                    <p className="text-xs text-[#66665E] mt-0.5">Connect Instagram, TikTok, and YouTube channels with real verified reach.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-start gap-3.5 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A0A0A]">0% Creator Platform Fee</h4>
                    <p className="text-xs text-[#66665E] mt-0.5">Set your own rates in EUR and keep 100% of your earnings with zero hidden commissions.</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Brand Value Props */
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-[#0A0A0A]">100% escrow protection before content production begins</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E7E7E2] flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#FF2D78] shrink-0" />
                  <span className="text-xs font-bold text-[#0A0A0A]">Transparent flat 15% platform fee — zero monthly software locks</span>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: REGISTRATION & ONBOARDING STEPPER */}
          {/* ========================================================================= */}
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
                    <p className="text-[11px] text-[#66665E]">Monetize &amp; set rates</p>
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
                    <p className="text-[11px] text-[#66665E]">Hire vetted creators</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="border-t border-[#E7E7E2]" />

            {/* ===================================================================== */}
            {/* BRAND REGISTRATION VIEW */}
            {/* ===================================================================== */}
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
              /* ===================================================================== */
              /* CREATOR PROGRESSIVE 4-STEP ONBOARDING WIZARD */
              /* ===================================================================== */
              <div className="space-y-6">
                {/* Stepper Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#66665E]">
                      Creator Setup • Step {creatorStep} of 4
                    </span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#F4F4F0] text-[#0A0A0A]">
                      {creatorStep === 1 ? '25%' : creatorStep === 2 ? '50%' : creatorStep === 3 ? '75%' : '100%'}
                    </span>
                  </div>

                  {/* 4-Step Progress Track */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s <= creatorStep ? 'bg-[#0A0A0A]' : 'bg-[#EAEAE3]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-[11px] font-bold text-[#66665E] pt-1">
                    <span className={creatorStep >= 1 ? 'text-[#0A0A0A]' : ''}>1. Account</span>
                    <span className={creatorStep >= 2 ? 'text-[#0A0A0A]' : ''}>2. Profile &amp; Niches</span>
                    <span className={creatorStep >= 3 ? 'text-[#0A0A0A]' : ''}>3. Channels &amp; Work</span>
                    <span className={creatorStep >= 4 ? 'text-[#0A0A0A]' : ''}>4. Rates &amp; Trust</span>
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* STEP 1: CREDENTIALS & ACCOUNT */}
                {/* ----------------------------------------------------------------- */}
                {creatorStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">Account Credentials</h2>
                      <p className="text-xs text-[#66665E]">Start by setting up your creator login credentials.</p>
                    </div>

                    {/* Fast SSO */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => message.info('Google SSO ready')}
                        className="h-10 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => message.info('Apple SSO ready')}
                        className="h-10 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-black" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.65-1.24z"/>
                        </svg>
                        <span>Apple</span>
                      </button>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Full Name</label>
                        <input
                          type="text"
                          required
                          value={creatorName}
                          onChange={(e) => setCreatorName(e.target.value)}
                          placeholder="Sophie Kim"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Email Address</label>
                        <input
                          type="email"
                          required
                          value={creatorEmail}
                          onChange={(e) => setCreatorEmail(e.target.value)}
                          placeholder="sophie@example.com"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Password</label>
                        <input
                          type="password"
                          required
                          value={creatorPassword}
                          onChange={(e) => setCreatorPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!creatorName || !creatorEmail) {
                          message.error('Please enter your full name and email.');
                          return;
                        }
                        setCreatorStep(2);
                      }}
                      className="w-full h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-4"
                    >
                      <span>Continue to Profile Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* STEP 2: PROFILE IDENTITY & NICHES */}
                {/* ----------------------------------------------------------------- */}
                {creatorStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">Profile &amp; Niches</h2>
                      <p className="text-xs text-[#66665E]">Configure how brands discover and read your profile.</p>
                    </div>

                    {/* Profile Photo Upload (Direct photo upload, no presets) */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 group">
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
                        <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-xs font-bold text-[#0A0A0A] cursor-pointer shadow-2xs transition-all">
                          <Camera className="w-3.5 h-3.5 text-[#66665E]" />
                          <span>Upload photo</span>
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
                        <p className="text-[11px] text-[#66665E]">Recommended 500x500px JPG or PNG</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Handle</label>
                          {cleanHandle && (
                            <span className={`text-[10px] font-bold ${isHandleTaken ? 'text-rose-500' : 'text-emerald-600'}`}>
                              {isHandleTaken ? 'Taken' : 'Available'}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#66665E]">@</span>
                          <input
                            type="text"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                            placeholder="sophiekim"
                            className="w-full h-11 pl-7 pr-3 rounded-xl border border-[#E7E7E2] text-sm font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">City, Country</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Zürich"
                            className="h-11 px-3 rounded-xl border border-[#E7E7E2] text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="h-11 px-2 rounded-xl border border-[#E7E7E2] text-xs font-bold outline-none focus:border-[#0A0A0A] bg-white cursor-pointer"
                          >
                            {['Switzerland', 'France', 'Germany', 'United Kingdom', 'Italy', 'Spain', 'United States'].map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Bio</label>
                          <span className="text-[10px] text-[#A3A39C]">{bio.length}/150</span>
                        </div>
                        <textarea
                          rows={2}
                          maxLength={150}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Authentic beauty and lifestyle creator..."
                          className="w-full p-2.5 rounded-xl border border-[#E7E7E2] text-xs font-medium outline-none focus:border-[#0A0A0A] resize-none"
                        />
                      </div>
                    </div>

                    {/* Niches 3x3 Grid */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">Select Categories (Max 3)</label>
                        <span className="text-xs font-extrabold text-[#0A0A0A]">{selectedCategories.length} of 3</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => toggleCategory(cat.id)}
                              className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs'
                                  : 'border-[#E7E7E2] hover:border-zinc-400 bg-white text-[#0A0A0A]'
                              }`}
                            >
                              <span>{cat.icon}</span>
                              <span className="truncate">{cat.id}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

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
                        onClick={() => {
                          if (selectedCategories.length === 0) {
                            message.warning('Please select at least 1 category.');
                            return;
                          }
                          setCreatorStep(3);
                        }}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Channels &amp; Work</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* STEP 3: SOCIAL CHANNELS & PORTFOLIO WORK */}
                {/* ----------------------------------------------------------------- */}
                {creatorStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">Channels &amp; Work Samples</h2>
                      <p className="text-xs text-[#66665E]">Connect your primary platforms and showcase sample deliverables.</p>
                    </div>

                    {/* Social Channels row: Instagram, TikTok & YouTube */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Connected Social Platforms
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Instagram */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A]">
                            <Instagram className="w-4 h-4 text-[#FF2D78]" />
                            <span>Instagram</span>
                          </div>
                          <input
                            type="text"
                            value={igHandle}
                            onChange={(e) => setIgHandle(e.target.value)}
                            placeholder="@handle"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                          <input
                            type="text"
                            value={igReach}
                            onChange={(e) => setIgReach(e.target.value)}
                            placeholder="Followers (e.g. 1.2M)"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A]"
                          />
                        </div>

                        {/* TikTok */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A]">
                            <Film className="w-4 h-4 text-black" />
                            <span>TikTok</span>
                          </div>
                          <input
                            type="text"
                            value={ttHandle}
                            onChange={(e) => setTtHandle(e.target.value)}
                            placeholder="@handle"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                          <input
                            type="text"
                            value={ttReach}
                            onChange={(e) => setTtReach(e.target.value)}
                            placeholder="Followers (e.g. 680K)"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A]"
                          />
                        </div>

                        {/* YouTube */}
                        <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A]">
                            <Youtube className="w-4 h-4 text-[#FF0000]" />
                            <span>YouTube</span>
                          </div>
                          <input
                            type="text"
                            value={ytHandle}
                            onChange={(e) => setYtHandle(e.target.value)}
                            placeholder="Channel name / @handle"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-semibold outline-none focus:border-[#0A0A0A]"
                          />
                          <input
                            type="text"
                            value={ytReach}
                            onChange={(e) => setYtReach(e.target.value)}
                            placeholder="Subscribers (e.g. 210K)"
                            className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E2] bg-white text-xs font-medium outline-none focus:border-[#0A0A0A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Samples Thumbnails */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#66665E]">
                        <span>Portfolio Media (Up to 6)</span>
                        <span>{samplePhotos.length} of 6 Added</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {samplePhotos.map((url, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#E7E7E2] group">
                            <img src={url} alt={`Sample ${i}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setSamplePhotos(samplePhotos.filter((_, idx) => idx !== i))}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {samplePhotos.length < 6 && (
                          <label className="aspect-square rounded-xl border-2 border-dashed border-[#D2D2CA] hover:border-[#0A0A0A] flex flex-col items-center justify-center text-[#66665E] hover:text-[#0A0A0A] cursor-pointer transition-colors">
                            <Plus className="w-4 h-4" />
                            <span className="text-[10px] font-bold mt-0.5">Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === 'string') {
                                      setSamplePhotos([...samplePhotos, reader.result]);
                                      message.success('Sample photo added to portfolio.');
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

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
                        onClick={() => setCreatorStep(4)}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <span>Continue to Rates &amp; Trust</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* STEP 4: RATES & VERIFICATION (FINISH) */}
                {/* ----------------------------------------------------------------- */}
                {creatorStep === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-[#0A0A0A]">Rates &amp; Escrow Verification</h2>
                      <p className="text-xs text-[#66665E]">Set your baseline EUR pricing and claim your verified creator badge.</p>
                    </div>

                    {/* Starting Base Rate Input (Replaces slider) */}
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Starting Base Rate (€)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#66665E]">€</span>
                        <input
                          type="number"
                          min={50}
                          step={50}
                          value={startingRateEur}
                          onChange={(e) => setStartingRateEur(Number(e.target.value))}
                          placeholder="500"
                          className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E7E7E2] bg-white text-base font-black text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                      <p className="text-[11px] text-[#66665E]">Minimum baseline rate shown on your public creator profile</p>
                    </div>

                    {/* Platform Deliverable Rates */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                        Platform Deliverable Packages (€)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Instagram Reel */}
                        <div className="p-3 rounded-xl border border-[#E7E7E2] bg-white space-y-1">
                          <span className="text-xs font-bold text-[#0A0A0A]">Instagram Reel</span>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#66665E]">€</span>
                            <input
                              type="number"
                              min={50}
                              step={50}
                              value={igReelRate}
                              onChange={(e) => setIgReelRate(Number(e.target.value))}
                              className="w-full h-8 pl-6 pr-2 rounded-lg border border-[#E7E7E2] font-black text-xs text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
                            />
                          </div>
                        </div>

                        {/* TikTok UGC Video */}
                        <div className="p-3 rounded-xl border border-[#E7E7E2] bg-white space-y-1">
                          <span className="text-xs font-bold text-[#0A0A0A]">TikTok UGC Video</span>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#66665E]">€</span>
                            <input
                              type="number"
                              min={50}
                              step={50}
                              value={ttVideoRate}
                              onChange={(e) => setTtVideoRate(Number(e.target.value))}
                              className="w-full h-8 pl-6 pr-2 rounded-lg border border-[#E7E7E2] font-black text-xs text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
                            />
                          </div>
                        </div>

                        {/* YouTube Video */}
                        <div className="p-3 rounded-xl border border-[#E7E7E2] bg-white space-y-1">
                          <span className="text-xs font-bold text-[#0A0A0A]">YouTube Video</span>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#66665E]">€</span>
                            <input
                              type="number"
                              min={50}
                              step={50}
                              value={ytVideoRate}
                              onChange={(e) => setYtVideoRate(Number(e.target.value))}
                              className="w-full h-8 pl-6 pr-2 rounded-lg border border-[#E7E7E2] font-black text-xs text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verification Box */}
                    <div
                      onClick={() => setRequestVerification(!requestVerification)}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                        requestVerification ? 'border-[#0A0A0A] bg-[#FAFAF8]' : 'border-[#E7E7E2] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0A0A0A]">Request Escrow Verification Badge</h4>
                          <p className="text-[11px] text-[#66665E]">Unlocks priority ranking in brand search results and upfront funded deals.</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                        requestVerification ? 'bg-[#0A0A0A] border-[#0A0A0A]' : 'border-[#D2D2CA]'
                      }`}>
                        {requestVerification && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                    </div>

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
                        onClick={handleCreatorComplete}
                        className="flex-1 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Complete Setup &amp; Launch Dashboard</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7E7E2] bg-white py-4 text-center text-xs text-[#66665E]">
        <span>Influverse Inc. • Transparent Creator Marketplace</span>
      </footer>
    </div>
  );
}
