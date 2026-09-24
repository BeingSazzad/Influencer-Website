'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, switchRole } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import { AuthNetworkVisual } from '@/components/auth/AuthNetworkVisual';
import {
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  Sparkles,
  Building,
  AtSign,
  Check,
  Eye,
  EyeOff,
  ChevronDown,
} from 'lucide-react';
import { message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<'brand' | 'creator'>('brand');
  const [showPassword, setShowPassword] = useState(false);

  // Brand Form Fields
  const [companyName, setCompanyName] = useState('');
  const [brandContactName, setBrandContactName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandPassword, setBrandPassword] = useState('');
  const [brandIndustry, setBrandIndustry] = useState('Beauty & Skincare');

  // Creator Form Fields
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorPassword, setCreatorPassword] = useState('');
  const [creatorPlatform, setCreatorPlatform] = useState('instagram');
  const [creatorCategory, setCreatorCategory] = useState('Beauty');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'brand') {
      const newBrandUser = {
        id: `user_brand_${Date.now()}`,
        name: brandContactName || 'Brand Partner',
        email: brandEmail || 'brand@company.com',
        role: 'brand' as const,
        companyName: companyName || 'Global Brand',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        location: 'Berlin & London',
        bio: `${companyName || 'Brand'} marketing and campaign team.`,
        balanceEur: 5000,
      };

      dispatch(setUser(newBrandUser));
      dispatch(switchRole('brand'));
      message.success(`Welcome to Influverse, ${brandContactName || companyName}! Your Brand Workspace is ready.`);
      router.push('/brand/dashboard');
    } else {
      const cleanHandle = creatorHandle.startsWith('@') ? creatorHandle : `@${creatorHandle}`;
      const newCreatorUser = {
        id: `user_creator_${Date.now()}`,
        name: creatorName || 'Content Creator',
        email: creatorEmail || 'creator@influverse.com',
        role: 'creator' as const,
        handle: cleanHandle || '@creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        location: 'Milan & Paris',
        bio: `Verified content creator focusing on ${creatorCategory}.`,
        balanceEur: 0,
      };

      dispatch(setUser(newCreatorUser));
      dispatch(switchRole('creator'));
      message.success(`Welcome to Influverse, ${creatorName}! Your Creator Workspace is ready.`);
      router.push('/creator/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
        {/* Left: Registration Form Card */}
        <div className="w-full lg:col-span-6 xl:col-span-6 space-y-6">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center mb-2 hover:opacity-90 transition-opacity">
              <Logo size="lg" />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              Create your account
            </h1>
            <p className="text-sm sm:text-base text-[#73736A] font-medium leading-[24px]">
              Choose your role to get started with verified creator partnerships.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 shadow-xl shadow-black/[0.04] rounded-3xl border border-[#D2D2CA] space-y-6">
            {/* Step 1: Role Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-[#73736A]">
                1. Select your account role
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Role Card 1: Brand */}
                <button
                  type="button"
                  onClick={() => setRole('brand')}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                    role === 'brand'
                      ? 'border-2 border-[#0A0A0A] bg-[#FAFAF8] ring-2 ring-[#0A0A0A]/10 shadow-sm'
                      : 'border-2 border-[#E7E7E2] hover:border-[#0A0A0A] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center shadow-2xs">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    {role === 'brand' ? (
                      <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-[#D2D2CA]" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-sm text-[#0A0A0A]">Brand / Agency</h3>
                    <p className="text-sm text-[#73736A] mt-1 leading-relaxed font-medium">
                      Hire vetted talent with escrow guarantee.
                    </p>
                  </div>
                </button>

                {/* Role Card 2: Creator */}
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                    role === 'creator'
                      ? 'border-2 border-[#FF2D78] bg-[#FFF0F5] ring-2 ring-[#FF2D78]/15 shadow-sm'
                      : 'border-2 border-[#E7E7E2] hover:border-[#FF2D78] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FF2D78] text-white flex items-center justify-center shadow-2xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    {role === 'creator' ? (
                      <span className="w-5 h-5 rounded-full bg-[#FF2D78] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-[#D2D2CA]" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-sm text-[#0A0A0A]">Content Creator</h3>
                    <p className="text-sm text-[#73736A] mt-1 leading-relaxed font-medium">
                      Set rates, earn EUR & keep 100%.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="border-t border-[#E7E7E2]" />

            {/* Step 2: Role Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <label className="block text-xs font-black uppercase tracking-wider text-[#73736A] mb-1">
                2. Enter your {role === 'brand' ? 'company' : 'creator'} details
              </label>

              {role === 'brand' ? (
                /* BRAND REGISTRATION FORM */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Brand Name
                      </label>
                      <div className="relative flex items-center">
                        <Building className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Aura Skincare Paris"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative flex items-center">
                        <UserIcon className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Elena Rostova"
                          value={brandContactName}
                          onChange={(e) => setBrandContactName(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Work Email
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="elena@company.com"
                          value={brandEmail}
                          onChange={(e) => setBrandEmail(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create password"
                          value={brandPassword}
                          onChange={(e) => setBrandPassword(e.target.value)}
                          className="w-full h-12 pl-10 pr-11 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 text-[#73736A] hover:text-[#0A0A0A] transition-colors p-1"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                      Primary Industry / Niche
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={brandIndustry}
                        onChange={(e) => setBrandIndustry(e.target.value)}
                        className="w-full h-12 px-4 pr-10 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] appearance-none outline-none cursor-pointer transition-all"
                      >
                        <option value="Beauty & Skincare">Beauty & Skincare</option>
                        <option value="Fashion & Apparel">Fashion & Apparel</option>
                        <option value="Fitness & Health">Fitness & Health</option>
                        <option value="Tech & SaaS">Tech & SaaS</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Travel & Hospitality">Travel & Hospitality</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#73736A] absolute right-3.5 pointer-events-none" />
                    </div>
                  </div>
                </>
              ) : (
                /* CREATOR REGISTRATION FORM */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Creator Name
                      </label>
                      <div className="relative flex items-center">
                        <UserIcon className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Sophie Kim"
                          value={creatorName}
                          onChange={(e) => setCreatorName(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Social Handle
                      </label>
                      <div className="relative flex items-center">
                        <AtSign className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. @sophiekim"
                          value={creatorHandle}
                          onChange={(e) => setCreatorHandle(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="sophie@creatorhub.com"
                          value={creatorEmail}
                          onChange={(e) => setCreatorEmail(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-[#73736A] absolute left-3.5 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create password"
                          value={creatorPassword}
                          onChange={(e) => setCreatorPassword(e.target.value)}
                          className="w-full h-12 pl-10 pr-11 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 text-[#73736A] hover:text-[#0A0A0A] transition-colors p-1"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Primary Platform
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={creatorPlatform}
                          onChange={(e) => setCreatorPlatform(e.target.value)}
                          className="w-full h-12 px-4 pr-10 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] appearance-none outline-none cursor-pointer transition-all"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="ugc">UGC Content Creator</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#73736A] absolute right-3.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Content Category
                      </label>
                      <div className="relative flex items-center">
                        <select
                          value={creatorCategory}
                          onChange={(e) => setCreatorCategory(e.target.value)}
                          className="w-full h-12 px-4 pr-10 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] appearance-none outline-none cursor-pointer transition-all"
                        >
                          <option value="Beauty">Beauty & Skincare</option>
                          <option value="Fashion">Fashion & Style</option>
                          <option value="Fitness">Fitness & Health</option>
                          <option value="Travel">Travel & Outdoor</option>
                          <option value="Food">Food & Cuisine</option>
                          <option value="Tech">Tech & Gadgets</option>
                          <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#73736A] absolute right-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-[#0A0A0A] hover:bg-[#FF2D78] text-white shadow-md hover:shadow-[#FF2D78]/25 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-4 whitespace-nowrap"
              >
                {role === 'brand' ? 'Create Brand Account' : 'Create Creator Profile'}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-3 border-t border-[#E7E7E2]">
              <p className="text-sm text-[#73736A] font-medium">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Connected Network Graphic Matching Reference Design */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 h-full">
          <AuthNetworkVisual />
        </div>
      </div>
    </div>
  );
}
