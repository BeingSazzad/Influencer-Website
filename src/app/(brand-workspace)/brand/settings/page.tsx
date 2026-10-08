'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { updateUserProfile, logout } from '@/redux/slices/authSlice';
import {
  Building2,
  Shield,
  ShieldCheck,
  KeyRound,
  Globe,
  MapPin,
  Mail,
  Save,
  LogOut,
  Share2,
  Upload,
  X,
  CheckCircle2,
  Lock,
  User,
  Phone,
  Briefcase,
  Plus,
  Check,
  Users,
  Camera,
} from 'lucide-react';
import { ShareProfileModal } from '@/components/shared/ShareProfileModal';
import { Input, Select, message } from 'antd';

// Curated Countries list matching Creator Profile & Onboarding
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
];

// Curated Brand Industries with emojis & suggested niche tags matching platform creator categories
const BRAND_INDUSTRIES = [
  {
    value: 'Beauty, Cosmetics & Wellness',
    label: 'Beauty, Cosmetics & Wellness',
    icon: '💄',
    suggestedTags: ['Clean Beauty', 'Skincare', 'Organic', 'DTC', 'Vegan', 'Cruelty-Free'],
  },
  {
    value: 'Fashion, Apparel & Luxury',
    label: 'Fashion, Apparel & Luxury',
    icon: '👗',
    suggestedTags: ['Streetwear', 'Sustainable', 'Luxury', 'Accessories', 'DTC', 'Footwear'],
  },
  {
    value: 'Fitness, Health & Nutrition',
    label: 'Fitness, Health & Nutrition',
    icon: '⚡',
    suggestedTags: ['Supplements', 'Activewear', 'Nutrition', 'Gym', 'Recovery', 'Biohacking'],
  },
  {
    value: 'Food, Beverage & Dining',
    label: 'Food, Beverage & Dining',
    icon: '🍴',
    suggestedTags: ['Plant-Based', 'Gourmet', 'Specialty Coffee', 'Healthy Snacks', 'Beverages'],
  },
  {
    value: 'Tech, Software & Gaming',
    label: 'Tech, Software & Gaming',
    icon: '🎮',
    suggestedTags: ['SaaS', 'Mobile Apps', 'Gaming', 'AI Tools', 'Consumer Tech'],
  },
  {
    value: 'Travel, Hospitality & Tourism',
    label: 'Travel, Hospitality & Tourism',
    icon: '✈️',
    suggestedTags: ['Boutique Hotels', 'Eco-Travel', 'Luggage', 'Resorts', 'Airlines'],
  },
  {
    value: 'Home, Living & Interior',
    label: 'Home, Living & Interior',
    icon: '🏡',
    suggestedTags: ['Smart Home', 'Interior Design', 'Furniture', 'Kitchen', 'Bedding'],
  },
  {
    value: 'Business, Finance & B2B',
    label: 'Business, Finance & B2B',
    icon: '💼',
    suggestedTags: ['Fintech', 'Investing', 'Crypto', 'Productivity', 'Consulting'],
  },
  {
    value: 'Family, Parenting & Kids',
    label: 'Family, Parenting & Kids',
    icon: '👶',
    suggestedTags: ['Baby Gear', 'Maternity', 'Educational Toys', 'Family Lifestyle'],
  },
  {
    value: 'Eco-Friendly & Sustainability',
    label: 'Eco-Friendly & Sustainability',
    icon: '🌿',
    suggestedTags: ['Zero Waste', 'Renewable', 'Circular Fashion', 'Fair Trade'],
  },
  {
    value: 'Art, Design & Creative',
    label: 'Art, Design & Creative',
    icon: '🎨',
    suggestedTags: ['Prints', 'Graphic Design', 'Photography', 'Crafts'],
  },
];

const COMPANY_SIZES = [
  { value: '1-10', label: '1 - 10 employees (Startup / Boutique)' },
  { value: '11-50', label: '11 - 50 employees (Growth stage)' },
  { value: '51-200', label: '51 - 200 employees (Scale-up)' },
  { value: '201-500', label: '201 - 500 employees (Mid-Market)' },
  { value: '500+', label: '500+ employees (Enterprise / Global)' },
];

export default function BrandSettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'company' | 'security'>('company');

  // Parse location into city and country
  const initialLoc = currentUser?.location || 'Paris, France';
  const locParts = initialLoc.split(',').map((s) => s.trim());
  const initialCity = locParts[0] || 'Paris';
  const initialCountry = locParts.length > 1 ? locParts[1] : 'France';

  // Company Profile Form States
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Aura Skincare Paris');
  const [contactName, setContactName] = useState(currentUser?.name || 'Elena Rostova');
  const [email, setEmail] = useState(currentUser?.email || 'elena@aura-cosmetics.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+33 1 42 68 55 00');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [website, setWebsite] = useState(currentUser?.website || 'https://aura-skincare.com');
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [companySize, setCompanySize] = useState(currentUser?.companySize || '11-50');
  const [industry, setIndustry] = useState(currentUser?.industry || 'Beauty, Cosmetics & Wellness');
  const [tags, setTags] = useState<string[]>(
    currentUser?.industryTags && currentUser.industryTags.length > 0
      ? currentUser.industryTags
      : ['Clean Beauty', 'Organic', 'DTC', 'Skincare']
  );
  const [newTagInput, setNewTagInput] = useState('');
  const [bio, setBio] = useState(
    currentUser?.bio ||
      'We formulate clean, organic skincare and wellness products designed in Paris. Looking for authentic lifestyle, UGC, and beauty creators.'
  );

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Find active industry metadata
  const currentIndustryObj =
    BRAND_INDUSTRIES.find((b) => b.value === industry) || BRAND_INDUSTRIES[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        message.error('Logo image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
          message.success('Brand logo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim()) {
      message.error('Brand name, contact name, and business email are required.');
      return;
    }

    const formattedLocation = city && country ? `${city}, ${country}` : city || country || initialLoc;

    dispatch(
      updateUserProfile({
        name: contactName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        avatar,
        location: formattedLocation,
        website: website.trim(),
        industry: industry.trim(),
        industryTags: tags,
        companySize,
        bio: bio.trim(),
      })
    );

    message.success('Brand identity and organization details updated successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      message.error('Please enter current password.');
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
    message.success('Password updated successfully!');
  };

  const handleLogout = () => {
    dispatch(logout());
    message.success('Signed out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      <WorkspaceHeader
        title="Settings"
        subtitle="Brand profile, marketplace identity, and account security."
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="h-10 px-4 rounded-full font-bold text-sm bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-[#0A0A0A]" />
              <span>Share Brand</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="h-10 px-4 rounded-full font-bold text-sm bg-[#FAFAF8] border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-[#66665E] hover:text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-[#E7E7E2] inline-flex items-center gap-1 shadow-2xs w-fit max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('company')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'company'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${activeTab === 'company' ? 'text-white' : 'text-[#66665E]'}`} />
            <span className="whitespace-nowrap">Company Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`py-2.5 px-4 sm:px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-white shadow-xs'
                : 'text-[#66665E] hover:text-[#0A0A0A] hover:bg-[#FAFAF8]'
            }`}
          >
            <Shield className={`w-4 h-4 shrink-0 ${activeTab === 'security' ? 'text-white' : 'text-[#66665E]'}`} />
            <span className="whitespace-nowrap">Security</span>
          </button>
        </div>

        {/* TAB 1: COMPANY PROFILE */}
        {activeTab === 'company' && (
          <form onSubmit={handleSaveCompany} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              {/* Header with Verification Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Brand Identity & Organization
                  </h2>
                  <p className="text-sm text-[#66665E] mt-0.5">
                    Public company details, industry focus, and marketplace profile shown to creators.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Brand Account</span>
                </span>
              </div>

              {/* Brand Logo (Centered, Matching Onboarding Standards) */}
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
                    <img src={avatar} alt={companyName} className="w-full h-full object-cover" />
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
                    {avatar ? 'Click logo to change' : 'Click to upload brand logo'}
                  </button>
                  <div className="text-xs text-[#66665E]">
                    JPG, PNG, SVG, or WEBP up to 10MB
                  </div>
                  {avatar && (
                    <button
                      type="button"
                      onClick={() => setAvatar('')}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors cursor-pointer pt-1 inline-block"
                    >
                      Remove logo
                    </button>
                  )}
                </div>
              </div>

              {/* Public Details Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                    Public Details
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66665E] mt-0.5">
                    Displayed on your creator campaign briefs, proposals, and marketplace listings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Brand Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Brand Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<Building2 className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="e.g. Aura Skincare Paris"
                      required
                    />
                  </div>

                  {/* Primary Industry */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Primary Industry <span className="text-rose-500">*</span>
                    </label>
                    <Select
                      value={industry}
                      onChange={(val) => {
                        setIndustry(val);
                        const sel = BRAND_INDUSTRIES.find((b) => b.value === val);
                        if (sel && tags.length === 0) {
                          setTags(sel.suggestedTags.slice(0, 3));
                        }
                      }}
                      className="w-full h-11 rounded-xl"
                      options={BRAND_INDUSTRIES.map((ind) => ({
                        value: ind.value,
                        label: (
                          <div className="flex items-center gap-2">
                            <span className="text-base">{ind.icon}</span>
                            <span className="font-semibold text-sm">{ind.label}</span>
                          </div>
                        ),
                      }))}
                    />
                  </div>

                  {/* Business Email */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<Mail className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="partnerships@aura-skincare.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Phone Number
                    </label>
                    <Input
                      prefix={<Phone className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="+33 1 42 68 55 00"
                    />
                  </div>

                  {/* Official Website */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      Official Website
                    </label>
                    <Input
                      prefix={<Globe className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="https://aura-skincare.com"
                    />
                  </div>

                  {/* Company Size */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Company Size</label>
                    <Select
                      value={companySize}
                      onChange={(val) => setCompanySize(val)}
                      className="w-full h-11 rounded-xl"
                      options={COMPANY_SIZES}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">Country</label>
                    <Select
                      value={country}
                      onChange={(val) => setCountry(val)}
                      className="w-full h-11 rounded-xl"
                      options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))}
                    />
                  </div>

                  {/* City / Headquarters */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0A0A0A]">
                      City / Headquarters
                    </label>
                    <Input
                      prefix={<MapPin className="w-4 h-4 text-[#A3A39C] mr-0.5" />}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
                      placeholder="e.g. Paris, Berlin, London"
                    />
                  </div>

                  {/* About Brand / Bio (with character counter) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-[#0A0A0A]">
                        Bio / About Brand
                      </label>
                      <span className="text-xs font-semibold text-[#66665E]">
                        {bio.length}/300
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={300}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none p-3.5 text-sm font-normal text-[#0A0A0A] leading-relaxed transition-all resize-y shadow-2xs"
                      placeholder="Tell creators what your brand stands for, your campaign goals, and what makes your products unique..."
                    />
                  </div>
                </div>
              </div>

              {/* Marketplace Niche Tags */}
              <div className="pt-6 border-t border-[#E7E7E2] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#0A0A0A]" />
                      <span>Marketplace Niche Tags</span>
                    </h3>
                    <p className="text-xs text-[#66665E] mt-0.5">
                      Helps creators discover relevant campaign briefs and match collaboration styles.
                    </p>
                  </div>
                  <span className="text-xs text-[#66665E] font-medium">
                    {tags.length}/8 tags selected
                  </span>
                </div>

                {/* Active Selected Tags */}
                <div className="min-h-[46px] rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] focus-within:border-[#0A0A0A] bg-white p-2 flex flex-wrap items-center gap-1.5 transition-all shadow-2xs">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E2] text-sm font-semibold text-[#0A0A0A]"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                        className="text-[#66665E] hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    placeholder={tags.length === 0 ? "Type tag and press Enter..." : "+ Add custom tag"}
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        const trimmed = newTagInput.trim().replace(/^#/, '');
                        if (trimmed && !tags.includes(trimmed) && tags.length < 8) {
                          setTags([...tags, trimmed]);
                          setNewTagInput('');
                        }
                      }
                    }}
                    className="outline-none text-xs bg-transparent min-w-[120px] flex-1 text-[#0A0A0A] placeholder:text-[#66665E] px-1 py-0.5 font-medium"
                  />
                </div>

                {/* Suggested Quick Tags for Selected Industry */}
                {currentIndustryObj && currentIndustryObj.suggestedTags.length > 0 && (
                  <div className="pt-1.5">
                    <span className="text-xs font-semibold text-[#66665E] mr-2">
                      Suggested for {currentIndustryObj.label.split(',')[0]}:
                    </span>
                    <div className="inline-flex flex-wrap items-center gap-1.5 mt-1">
                      {currentIndustryObj.suggestedTags.map((sug) => {
                        const isSelected = tags.includes(sug);
                        return (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setTags(tags.filter((t) => t !== sug));
                              } else if (tags.length < 8) {
                                setTags([...tags, sug]);
                              }
                            }}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                                : 'bg-white hover:bg-[#FAFAF8] text-[#52524E] border-[#E7E7E2]'
                            }`}
                          >
                            <span>#{sug}</span>
                            {isSelected ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : (
                              <Plus className="w-3 h-3 text-[#66665E]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Private Contact & Billing Card */}
              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7E7E2]/70">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#66665E]" />
                      <span>Primary Contact & Account Admin</span>
                    </h3>
                    <p className="text-xs text-[#66665E] mt-0.5">
                      Used strictly for escrow release receipts, legal contracts, and dispute mediation. Never shown publicly to creators.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F4F4F0] text-[#66665E] border border-[#E7E7E2] self-start sm:self-auto shrink-0">
                    Private
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">
                      Account Manager <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<User className="w-4 h-4 text-[#66665E] mr-0.5" />}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] bg-white"
                      placeholder="Elena Rostova"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      prefix={<Mail className="w-4 h-4 text-[#66665E] mr-0.5" />}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] bg-white"
                      placeholder="elena@aura-cosmetics.com"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-[#52524E]">
                      Direct Phone
                    </label>
                    <Input
                      prefix={<Phone className="w-4 h-4 text-[#66665E] mr-0.5" />}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-xl h-11 text-sm font-medium text-[#0A0A0A] border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] bg-white"
                      placeholder="+33 1 42 68 55 00"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#66665E] font-medium">
                  Changes to brand identity and industry tags update across your active campaigns immediately.
                </p>
                <button
                  type="submit"
                  className="h-11 px-8 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Profile</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Password Update Card */}
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center shrink-0">
                    <KeyRound className="w-5 h-5 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Change Password
                    </h2>
                  </div>
                </div>
              </div>

              {/* Form Content - 2-Column Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left side: Inputs */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-[#0A0A0A]">Current Password</label>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-[#66665E] hover:text-[#FF2D78] transition-colors"
                      >
                        Forgot current password?
                      </Link>
                    </div>
                    <Input.Password
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="rounded-xl h-11 text-sm font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0A0A0A]">New Password</label>
                      <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="rounded-xl h-11 text-sm font-medium"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#0A0A0A]">Confirm New Password</label>
                      <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="rounded-xl h-11 text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="h-11 px-7 rounded-full font-bold text-sm bg-[#0A0A0A] hover:bg-zinc-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </div>

                {/* Right side: Security Requirements Guide Card */}
                <div className="lg:col-span-5 bg-[#FAFAF8] rounded-2xl p-5 border border-[#E7E7E2] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
                    <ShieldCheck className="w-4 h-4 text-[#FF2D78]" />
                    <span>Password Security Guidelines</span>
                  </div>
                  <ul className="space-y-2 text-xs font-medium text-[#66665E]">
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>Minimum 8 characters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>At least one number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword === confirmPassword ? 'bg-[#0A0A0A]' : 'bg-[#D2D2CA]'}`} />
                      <span>Passwords must match</span>
                    </li>
                  </ul>
                </div>
              </div>
            </form>

            {/* Session Management & Devices Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                      Active Session
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] gap-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#0A0A0A]">
                    Windows PC • Chrome Browser
                  </div>
                  <div className="text-sm text-[#66665E]">
                    Current active session • Paris, France
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]">
                    This Device
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="h-9 px-4 rounded-full font-bold text-xs bg-white border border-[#E7E7E2] hover:border-rose-300 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Brand Profile Modal */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={companyName}
        subtitle={[industry, `${city}, ${country}`].filter(Boolean).join(' • ')}
        description={bio}
        link={website}
        shareUrl="/brand/settings"
        avatar={avatar}
        role="brand"
      />
    </div>
  );
}
