'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import {
  Building2,
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Globe,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User as UserIcon,
  Briefcase,
  Layers,
  Target,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Instagram,
  Youtube,
  FileText,
  TrendingUp,
  Video,
} from 'lucide-react';
import { message } from 'antd';
import { InstagramLogo, TikTokLogo, YouTubeLogo } from '@/components/shared/SocialLogos';

// Curated Countries list matching Creator & Settings
const COUNTRIES = [
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'AT', name: 'Austria' },
  { code: 'DK', name: 'Denmark' },
  { code: 'NO', name: 'Norway' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
];

// Curated Brand Industries
const BRAND_INDUSTRIES = [
  {
    id: 'beauty',
    value: 'Beauty, Cosmetics & Wellness',
    label: 'Beauty, Cosmetics & Wellness',
    icon: '💄',
    suggestedTags: ['Clean Beauty', 'Skincare', 'Organic', 'DTC', 'Vegan', 'Cruelty-Free'],
  },
  {
    id: 'fashion',
    value: 'Fashion, Apparel & Luxury',
    label: 'Fashion, Apparel & Luxury',
    icon: '👗',
    suggestedTags: ['Streetwear', 'Sustainable', 'Luxury', 'Accessories', 'DTC', 'Footwear'],
  },
  {
    id: 'fitness',
    value: 'Fitness, Health & Nutrition',
    label: 'Fitness, Health & Nutrition',
    icon: '⚡',
    suggestedTags: ['Supplements', 'Activewear', 'Nutrition', 'Gym', 'Recovery', 'Biohacking'],
  },
  {
    id: 'food',
    value: 'Food, Beverage & Dining',
    label: 'Food, Beverage & Dining',
    icon: '🍴',
    suggestedTags: ['Plant-Based', 'Gourmet', 'Specialty Coffee', 'Healthy Snacks', 'Beverages'],
  },
  {
    id: 'tech',
    value: 'Tech, Software & Gaming',
    label: 'Tech, Software & Gaming',
    icon: '🎮',
    suggestedTags: ['SaaS', 'Mobile Apps', 'Gaming', 'AI Tools', 'Consumer Tech'],
  },
  {
    id: 'travel',
    value: 'Travel, Hospitality & Tourism',
    label: 'Travel, Hospitality & Tourism',
    icon: '✈️',
    suggestedTags: ['Boutique Hotels', 'Eco-Travel', 'Luggage', 'Resorts', 'Airlines'],
  },
  {
    id: 'home',
    value: 'Home, Living & Interior',
    label: 'Home, Living & Interior',
    icon: '🏡',
    suggestedTags: ['Smart Home', 'Interior Design', 'Furniture', 'Kitchen', 'Bedding'],
  },
  {
    id: 'business',
    value: 'Business, Finance & B2B',
    label: 'Business, Finance & B2B',
    icon: '💼',
    suggestedTags: ['Fintech', 'Investing', 'Crypto', 'Productivity', 'Consulting'],
  },
  {
    id: 'family',
    value: 'Family, Parenting & Kids',
    label: 'Family, Parenting & Kids',
    icon: '👶',
    suggestedTags: ['Baby Gear', 'Maternity', 'Educational Toys', 'Family Lifestyle'],
  },
  {
    id: 'eco',
    value: 'Eco-Friendly & Sustainability',
    label: 'Eco-Friendly & Sustainability',
    icon: '🌿',
    suggestedTags: ['Zero Waste', 'Renewable', 'Circular Fashion', 'Fair Trade'],
  },
  {
    id: 'art',
    value: 'Art, Design & Creative',
    label: 'Art, Design & Creative',
    icon: '🎨',
    suggestedTags: ['Prints', 'Graphic Design', 'Photography', 'Crafts'],
  },
];

// Company Size Options
const COMPANY_SIZES = [
  { value: '1-10', label: '1 - 10 employees', desc: 'Startup / Boutique / DTC brand' },
  { value: '11-50', label: '11 - 50 employees', desc: 'Growth stage & Scaling e-commerce' },
  { value: '51-200', label: '51 - 200 employees', desc: 'Scale-up & Regional brand' },
  { value: '201-500', label: '201 - 500 employees', desc: 'Mid-Market enterprise' },
  { value: '500+', label: '500+ employees', desc: 'Global corporation / Enterprise' },
];

// Target Channels
const TARGET_PLATFORMS = [
  {
    id: 'instagram',
    label: 'Instagram',
    desc: 'Reels, Stories, Carousels & Grid Posts',
    icon: Instagram,
    color: 'from-amber-500 via-rose-500 to-purple-600',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    desc: 'Viral shortform, Spark Ads & Sound Trends',
    icon: Video,
    color: 'bg-black text-white',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    desc: 'Dedicated integrations, Shorts & in-depth reviews',
    icon: Youtube,
    color: 'bg-[#FF0000] text-white',
  },
  {
    id: 'ugc',
    label: 'UGC Video Ads',
    desc: 'Whitelisted organic video ad creatives without feed posting',
    icon: Sparkles,
    color: 'bg-[#FF2D78] text-white',
  },
];

// Campaign Objectives
const CAMPAIGN_OBJECTIVES = [
  { id: 'awareness', label: 'Brand Awareness & Reach', desc: 'Build massive brand recognition & cultural buzz' },
  { id: 'sales', label: 'Direct Conversions & ROAS', desc: 'Drive traceable sales, discount codes & app installs' },
  { id: 'launch', label: 'Product Launch Momentum', desc: 'Create hype spikes for new SKU drops and seasonal releases' },
  { id: 'ugc_library', label: 'High-Volume UGC Creatives', desc: 'Stockpile authentic vertical videos for Meta & TikTok paid ads' },
  { id: 'ambassador', label: 'Long-Term Brand Ambassadors', desc: 'Build recurring, high-trust creator partnerships' },
];

// Budget Ranges
const BUDGET_RANGES = [
  { id: 'starter', value: 'Under €2,500/mo', label: 'Under €2,500 / month', desc: 'Great for testing 2-5 micro creators or UGC pilots' },
  { id: 'growth', value: '€2,500 - €10,000/mo', label: '€2,500 – €10,000 / month', desc: 'Consistent monthly creator drops & multiformat campaigns' },
  { id: 'scale', value: '€10,000 - €50,000/mo', label: '€10,000 – €50,000 / month', desc: 'Aggressive growth with mid-tier creators & Spark Ads' },
  { id: 'enterprise', value: '€50,000+/mo', label: '€50,000+ / month', desc: 'Custom enterprise contracts, VIP talents & dedicated SLAs' },
];

// Preferred Creator Tiers
const CREATOR_TIERS = [
  { id: 'nano', label: 'Nano Creators', range: '5K - 25K followers', desc: 'Ultra-engaged micro communities & highest comment intent' },
  { id: 'micro', label: 'Micro Creators', range: '25K - 100K followers', desc: 'High ROI, authentic authority in dedicated niches' },
  { id: 'mid', label: 'Mid-Tier Creators', range: '100K - 500K followers', desc: 'Proven commercial reach with professional production' },
  { id: 'macro', label: 'Macro & VIP Creators', range: '500K+ followers', desc: 'Mass market prestige and viral spotlight reach' },
  { id: 'ugc_only', label: 'Professional UGC Actors', range: 'Any audience size', desc: 'Focused exclusively on high-converting paid ad hooks' },
];

export default function BrandOnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // Stepper state: 1 to 6
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // File input ref for logo upload
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Account Credentials & Representative
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [jobTitle, setJobTitle] = useState(currentUser?.jobTitle || 'Head of Influencer Marketing');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  // Step 2: Company Profile & Location
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [country, setCountry] = useState(currentUser?.location?.split(',')[1]?.trim() || 'France');
  const [city, setCity] = useState(currentUser?.location?.split(',')[0]?.trim() || 'Paris');
  const [companySize, setCompanySize] = useState(currentUser?.companySize || '11-50');
  const [tagline, setTagline] = useState('Clean, organic skincare and botanical wellness rituals designed in Paris.');

  // Step 3: Industry & Content Niches
  const [industry, setIndustry] = useState(currentUser?.industry || 'Beauty, Cosmetics & Wellness');
  const [tags, setTags] = useState<string[]>(
    currentUser?.industryTags && currentUser.industryTags.length > 0
      ? currentUser.industryTags
      : ['Clean Beauty', 'Skincare', 'Organic', 'DTC']
  );
  const [newTagInput, setNewTagInput] = useState('');

  // Step 4: Channels & Campaign Goals
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>(['instagram', 'tiktok', 'ugc']);
  const [campaignGoals, setCampaignGoals] = useState<string[]>(['awareness', 'sales', 'ugc_library']);

  // Step 5: Creator Budget & Preferred Tiers
  const [monthlyBudgetEur, setMonthlyBudgetEur] = useState('€2,500 - €10,000/mo');
  const [selectedTiers, setSelectedTiers] = useState<string[]>(['micro', 'mid', 'ugc_only']);

  // Step 6: Review, Billing & Brief
  const [vatNumber, setVatNumber] = useState(currentUser?.vatNumber || '');
  const [bio, setBio] = useState(
    currentUser?.bio ||
      'We formulate clean, organic skincare and wellness products designed in Paris. Looking for authentic lifestyle, UGC, and beauty creators.'
  );
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Logo file upload handler
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, SVG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      message.error('Logo file size must be under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
      message.success('Brand logo uploaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  // Tag toggles
  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      if (tags.length >= 8) {
        message.warning('Maximum 8 niche tags recommended.');
        return;
      }
      setTags([...tags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTagInput.trim();
    if (!clean) return;
    if (tags.includes(clean)) {
      message.info('Tag already added');
      setNewTagInput('');
      return;
    }
    setTags([...tags, clean]);
    setNewTagInput('');
  };

  // Platform toggles
  const togglePlatform = (id: string) => {
    if (targetPlatforms.includes(id)) {
      if (targetPlatforms.length === 1) {
        message.warning('Please keep at least 1 target channel.');
        return;
      }
      setTargetPlatforms(targetPlatforms.filter((p) => p !== id));
    } else {
      setTargetPlatforms([...targetPlatforms, id]);
    }
  };

  // Goal toggles
  const toggleGoal = (id: string) => {
    if (campaignGoals.includes(id)) {
      if (campaignGoals.length === 1) {
        message.warning('Please select at least 1 campaign goal.');
        return;
      }
      setCampaignGoals(campaignGoals.filter((g) => g !== id));
    } else {
      setCampaignGoals([...campaignGoals, id]);
    }
  };

  // Tier toggles
  const toggleTier = (id: string) => {
    if (selectedTiers.includes(id)) {
      if (selectedTiers.length === 1) {
        message.warning('Please select at least 1 creator tier.');
        return;
      }
      setSelectedTiers(selectedTiers.filter((t) => t !== id));
    } else {
      setSelectedTiers([...selectedTiers, id]);
    }
  };

  // Step titles
  const stepTitles = [
    'Account & Representative',
    'Company & Headquarters',
    'Industry & Niche Targeting',
    'Channels & Campaign Goals',
    'Creator Budget & Scope',
    'Review & Workspace Launch',
  ];

  // Validation per step
  const handleNext = () => {
    if (step === 1) {
      if (!companyName.trim()) {
        message.error('Please enter your Brand / Company name.');
        return;
      }
      if (!name.trim()) {
        message.error('Please enter your full name (Representative).');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        message.error('Please enter a valid business work email.');
        return;
      }
      if (!currentUser && (!password || password.length < 6)) {
        message.error('Password must be at least 6 characters.');
        return;
      }
    } else if (step === 2) {
      if (!country.trim()) {
        message.error('Please select your headquarters country.');
        return;
      }
      if (!city.trim()) {
        message.error('Please enter your headquarters city.');
        return;
      }
    } else if (step === 3) {
      if (!industry.trim()) {
        message.error('Please select your primary industry.');
        return;
      }
      if (tags.length === 0) {
        message.warning('Please select or add at least 1 niche tag.');
        return;
      }
    } else if (step === 4) {
      if (targetPlatforms.length === 0) {
        message.warning('Please choose at least 1 social platform.');
        return;
      }
      if (campaignGoals.length === 0) {
        message.warning('Please choose at least 1 campaign objective.');
        return;
      }
    } else if (step === 5) {
      if (!monthlyBudgetEur) {
        message.warning('Please select your estimated monthly creator budget.');
        return;
      }
      if (selectedTiers.length === 0) {
        message.warning('Please choose at least 1 preferred creator tier.');
        return;
      }
    } else if (step === 6) {
      if (!agreeTerms) {
        message.error('Please accept the Influverse Terms & Escrow Guarantee.');
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Final submission
  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    const brandUserId = currentUser?.id || `user_brand_${Date.now()}`;
    const formattedLocation = city.trim() && country.trim() ? `${city.trim()}, ${country.trim()}` : country.trim() || 'Paris, France';

    const newBrandUser = {
      id: brandUserId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+33 1 42 68 55 00',
      role: 'brand' as const,
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&h=400&q=80',
      location: formattedLocation,
      website: website.trim() || `https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      industry,
      industryTags: tags,
      companySize,
      bio: bio.trim() || `${companyName} collaborates with verified creators across Europe on premium storytelling.`,
      monthlyBudgetEur,
      targetPlatforms,
      campaignGoals,
      vatNumber: vatNumber.trim() || undefined,
      balanceEur: currentUser?.balanceEur || 5000,
    };

    dispatch(setUser(newBrandUser));

    setTimeout(() => {
      setIsSubmitting(false);
      message.success(`🎉 Brand Workspace initialized for ${companyName}! Welcome, ${name}.`);
      router.push('/brand/dashboard');
    }, 600);
  };

  const currentIndustryObj =
    BRAND_INDUSTRIES.find((b) => b.value === industry) || BRAND_INDUSTRIES[0];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Header */}
      <header className="border-b border-[#E7E7E2] bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#66665E] bg-[#F4F4F0] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Brand Workspace Setup</span>
            </div>
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-[#66665E] hover:text-[#0A0A0A] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-2xl space-y-6">
          {/* Progress Bar & Stepper Indicator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#FF2D78] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Step {step} of {totalSteps}</span>
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                  {stepTitles[step - 1]}
                </h1>
              </div>
              <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-white border border-[#E7E7E2] text-[#0A0A0A] shadow-xs">
                {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>

            {/* Segmented Step Indicator */}
            <div className="grid grid-cols-6 gap-2">
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
          <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6">
            {/* STEP 1: ACCOUNT CREDENTIALS & REPRESENTATIVE */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Brand & Representative Info
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Set up your official brand identity and primary team contact details.
                  </p>
                </div>

                {/* Brand Logo Upload */}
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileChange}
                    className="hidden"
                  />
                  <div className="relative group cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-[#E7E7E2] group-hover:border-[#FF2D78] overflow-hidden bg-[#FAFAF8] flex items-center justify-center transition-all duration-200 shadow-xs">
                      {avatar ? (
                        <img src={avatar} alt="Brand Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-[#66665E] group-hover:text-[#FF2D78]">
                          <Camera className="w-7 h-7" />
                          <span className="text-[11px] font-bold">Upload Logo</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-md group-hover:bg-[#FF2D78] transition-colors">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-xs text-[#66665E] font-medium mt-3">
                    Square PNG, JPG, or SVG (Recommended 400x400)
                  </span>
                </div>

                {/* Brand / Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Brand / Company Name <span className="text-[#FF2D78]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Aura Skincare Paris, Gymshark, Nordic Audio"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                    />
                  </div>
                </div>

                {/* Representative Full Name & Job Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Your Full Name <span className="text-[#FF2D78]">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Job Title / Role
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Head of Influencer Marketing"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Work Email <span className="text-[#FF2D78]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 1 42 68 55 00"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Password (if not already logged in) */}
                {!currentUser && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Password <span className="text-[#FF2D78]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C] hover:text-[#0A0A0A]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: COMPANY PROFILE & LOCATION */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Company Profile & Headquarters
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Where is your business headquartered, and what scale is your team?
                  </p>
                </div>

                {/* Website URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Official Website URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourbrand.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                    />
                  </div>
                </div>

                {/* Headquarters Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Headquarters Country <span className="text-[#FF2D78]">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] bg-white transition-colors"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      City <span className="text-[#FF2D78]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Paris, Berlin, London, New York"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Company Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {COMPANY_SIZES.map((size) => {
                      const isSelected = companySize === size.value;
                      return (
                        <div
                          key={size.value}
                          onClick={() => setCompanySize(size.value)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                              {size.label}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                                  : 'border-[#D2D2CA]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#66665E] font-medium mt-1">
                            {size.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Brand Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Brand Tagline / Elevator Pitch
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Clean, organic skincare rituals formulated in Paris."
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: INDUSTRY & NICHE TARGETING */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Industry & Niche Targeting
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Select your primary business vertical so we can match you with relevant creators.
                  </p>
                </div>

                {/* Industry Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Primary Brand Industry <span className="text-[#FF2D78]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {BRAND_INDUSTRIES.map((ind) => {
                      const isSelected = industry === ind.value;
                      return (
                        <div
                          key={ind.id}
                          onClick={() => {
                            setIndustry(ind.value);
                            // Auto-populate some suggested tags if empty or default
                            if (tags.length === 0) {
                              setTags(ind.suggestedTags.slice(0, 4));
                            }
                          }}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#FF2D78] bg-[#FFF0F5] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{ind.icon}</span>
                            <span className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                              {ind.label}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#FF2D78]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Niche & Category Tags */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      Niche Keywords & Attributes ({tags.length}/8)
                    </label>
                    <span className="text-[11px] text-[#66665E] font-medium">Click to toggle</span>
                  </div>

                  {/* Suggested from current industry */}
                  <div className="flex flex-wrap gap-2">
                    {currentIndustryObj.suggestedTags.map((tag) => {
                      const isSelected = tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#0A0A0A] text-white shadow-xs'
                              : 'bg-[#F4F4F0] hover:bg-[#E7E7E2] text-[#66665E]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#FF2D78]" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Tag Form */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomTag(e);
                        }
                      }}
                      placeholder="Add custom niche tag (e.g. TikTok Viral, Luxury DTC)..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#E7E7E2] text-xs font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] focus:outline-hidden focus:border-[#0A0A0A]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTag}
                      className="px-4 py-2 rounded-xl bg-[#F4F4F0] hover:bg-[#E7E7E2] text-xs font-bold text-[#0A0A0A] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CHANNELS & CAMPAIGN OBJECTIVES */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Channels & Campaign Goals
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Which platforms do you want to hire creators for, and what are your main KPIs?
                  </p>
                </div>

                {/* Target Platforms */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Platforms You Hire Creators For <span className="text-[#FF2D78]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TARGET_PLATFORMS.map((plat) => {
                      const isSelected = targetPlatforms.includes(plat.id);
                      const Icon = plat.icon;
                      return (
                        <div
                          key={plat.id}
                          onClick={() => togglePlatform(plat.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${plat.color}`}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-extrabold text-[#0A0A0A]">
                                {plat.label}
                              </span>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                                  : 'border-[#D2D2CA]'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className="text-xs text-[#66665E] font-medium leading-relaxed">
                            {plat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Campaign Objectives */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Primary Campaign Goals <span className="text-[#FF2D78]">*</span>
                  </label>
                  <div className="space-y-2">
                    {CAMPAIGN_OBJECTIVES.map((goal) => {
                      const isSelected = campaignGoals.includes(goal.id);
                      return (
                        <div
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#FF2D78] bg-[#FFF0F5] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block">
                              {goal.label}
                            </span>
                            <span className="text-[11px] text-[#66665E] font-medium">
                              {goal.desc}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                              isSelected
                                ? 'border-[#FF2D78] bg-[#FF2D78] text-white'
                                : 'border-[#D2D2CA]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CREATOR BUDGET & SCOPE */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Creator Budget & Preferred Tiers
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Help us calibrate matching creator pricing and recommended packages.
                  </p>
                </div>

                {/* Monthly Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Estimated Monthly Influencer Budget <span className="text-[#FF2D78]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGET_RANGES.map((b) => {
                      const isSelected = monthlyBudgetEur === b.value;
                      return (
                        <div
                          key={b.id}
                          onClick={() => setMonthlyBudgetEur(b.value)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-black text-[#0A0A0A]">
                              {b.label}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                                  : 'border-[#D2D2CA]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#66665E] font-medium mt-1">
                            {b.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Creator Tiers */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Preferred Creator Tiers
                  </label>
                  <div className="space-y-2">
                    {CREATOR_TIERS.map((tier) => {
                      const isSelected = selectedTiers.includes(tier.id);
                      return (
                        <div
                          key={tier.id}
                          onClick={() => toggleTier(tier.id)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#FF2D78] bg-[#FFF0F5] shadow-xs'
                              : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                                {tier.label}
                              </span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white border border-[#E7E7E2] text-[#66665E]">
                                {tier.range}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#66665E] font-medium mt-0.5 block">
                              {tier.desc}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                              isSelected
                                ? 'border-[#FF2D78] bg-[#FF2D78] text-white'
                                : 'border-[#D2D2CA]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW, BILLING & WORKSPACE LAUNCH */}
            {step === 6 && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                    Review & Workspace Launch
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1">
                    Verify your brand profile details before launching your Influverse workspace.
                  </p>
                </div>

                {/* Optional EU VAT / Business Tax ID */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      EU VAT Number / Business Tax ID
                    </label>
                    <span className="text-[11px] text-[#A3A39C] font-semibold">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="e.g. FR32884920192 or DE994829104"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                  />
                  <p className="text-[11px] text-[#66665E]">
                    Used for automated B2B reverse charge invoices and official payment receipts in EUR.
                  </p>
                </div>

                {/* Brand Story / Brief for Creators */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Brand Bio & Collaboration Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell creators about your brand mission, product aesthetic, and what you look for in creators..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-hidden text-sm font-medium text-[#0A0A0A] placeholder:text-[#A3A39C] transition-colors"
                  />
                </div>

                {/* Live Brand Card Preview */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Public Brand Preview Card
                  </label>
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-[#E7E7E2] shrink-0 shadow-xs flex items-center justify-center">
                        {avatar ? (
                          <img src={avatar} alt={companyName} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-7 h-7 text-[#0A0A0A]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-[#0A0A0A]">
                            {companyName || 'Your Brand Name'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-black">
                            Vetted Brand
                          </span>
                        </div>
                        <div className="text-xs text-[#66665E] font-medium flex items-center gap-2 mt-0.5">
                          <span>{industry}</span>
                          <span>•</span>
                          <span>{city}, {country}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:justify-end">
                      {tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white border border-[#E7E7E2] text-[11px] font-bold text-[#0A0A0A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terms & Escrow Guarantees */}
                <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#FF2D78]/20 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF2D78] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#0A0A0A] space-y-1">
                    <span className="font-bold block">100% Escrow & Commercial Protection</span>
                    <p className="text-[#66665E] leading-relaxed">
                      Your campaign funds are held securely in European escrow and only released once creators deliver approved deliverables matching your contract brief.
                    </p>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#FF2D78] rounded cursor-pointer"
                  />
                  <span className="text-xs text-[#66665E] leading-relaxed">
                    I agree to the Influverse{' '}
                    <Link href="/terms" className="font-bold text-[#0A0A0A] underline hover:text-[#FF2D78]">
                      Terms of Service
                    </Link>
                    , Commercial Escrow Guidelines, and{' '}
                    <Link href="/privacy" className="font-bold text-[#0A0A0A] underline hover:text-[#FF2D78]">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E2]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl border border-[#E7E7E2] hover:bg-[#F4F4F0] text-sm font-bold text-[#0A0A0A] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link
                  href="/register"
                  className="text-xs font-bold text-[#66665E] hover:text-[#0A0A0A] transition-colors"
                >
                  Cancel
                </Link>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-[#0A0A0A] hover:bg-black text-white text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{step === totalSteps ? (isSubmitting ? 'Launching...' : 'Launch Brand Workspace 🚀') : 'Continue'}</span>
                {step < totalSteps && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#E7E7E2] bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#66665E]">
          <div>© 2026 Influverse Marketplace Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#0A0A0A]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#0A0A0A]">Privacy</Link>
            <Link href="/pricing" className="hover:text-[#0A0A0A]">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
