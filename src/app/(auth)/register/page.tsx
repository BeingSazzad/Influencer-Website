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
  ArrowRight,
  ShieldCheck,
  Building,
  AtSign,
  Check,
  Star,
} from 'lucide-react';
import { Input, Select, message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<'brand' | 'creator'>('brand');

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

          <div className="bg-white p-6 sm:p-8 shadow-xl shadow-black/[0.03] rounded-3xl border border-[#E7E7E2] space-y-6">
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
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between space-y-2.5 ${
                    role === 'brand'
                      ? 'border-[#0A0A0A] bg-[#FAFAF8] ring-2 ring-[#0A0A0A]/10 shadow-sm'
                      : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center">
                      <Briefcase className="w-4.5 h-4.5" />
                    </div>
                    {role === 'brand' && (
                      <span className="w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-sm text-[#0A0A0A]">Brand / Agency</h3>
                    <p className="text-xs text-[#73736A] mt-0.5 leading-relaxed font-medium">
                      Hire vetted talent with escrow guarantee.
                    </p>
                  </div>
                </button>

                {/* Role Card 2: Creator */}
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between space-y-2.5 ${
                    role === 'creator'
                      ? 'border-[#FF2D78] bg-[#FAFAF8] ring-2 ring-[#FF2D78]/15 shadow-sm'
                      : 'border-[#E7E7E2] hover:border-[#D2D2CA] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#FF2D78] text-white flex items-center justify-center">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    {role === 'creator' && (
                      <span className="w-5 h-5 rounded-full bg-[#FF2D78] text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-sm text-[#0A0A0A]">Content Creator</h3>
                    <p className="text-xs text-[#73736A] mt-0.5 leading-relaxed font-medium">
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
                      <Input
                        size="large"
                        placeholder="e.g. Aura Skincare Paris"
                        prefix={<Building className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Your Full Name
                      </label>
                      <Input
                        size="large"
                        placeholder="e.g. Elena Rostova"
                        prefix={<UserIcon className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={brandContactName}
                        onChange={(e) => setBrandContactName(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Work Email
                      </label>
                      <Input
                        size="large"
                        type="email"
                        placeholder="elena@company.com"
                        prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={brandEmail}
                        onChange={(e) => setBrandEmail(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Password
                      </label>
                      <Input.Password
                        size="large"
                        placeholder="Create password"
                        prefix={<Lock className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={brandPassword}
                        onChange={(e) => setBrandPassword(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm h-11"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                      Primary Industry / Niche
                    </label>
                    <Select
                      size="large"
                      value={brandIndustry}
                      onChange={(v) => setBrandIndustry(v)}
                      className="w-full"
                      options={[
                        { value: 'Beauty & Skincare', label: 'Beauty & Skincare' },
                        { value: 'Fashion & Apparel', label: 'Fashion & Apparel' },
                        { value: 'Fitness & Health', label: 'Fitness & Health' },
                        { value: 'Tech & SaaS', label: 'Tech & SaaS' },
                        { value: 'Food & Beverage', label: 'Food & Beverage' },
                        { value: 'Travel & Hospitality', label: 'Travel & Hospitality' },
                      ]}
                    />
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
                      <Input
                        size="large"
                        placeholder="e.g. Sophie Kim"
                        prefix={<UserIcon className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={creatorName}
                        onChange={(e) => setCreatorName(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Social Handle
                      </label>
                      <Input
                        size="large"
                        placeholder="e.g. @sophiekim"
                        prefix={<AtSign className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={creatorHandle}
                        onChange={(e) => setCreatorHandle(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Email Address
                      </label>
                      <Input
                        size="large"
                        type="email"
                        placeholder="sophie@creatorhub.com"
                        prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={creatorEmail}
                        onChange={(e) => setCreatorEmail(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] text-[#0A0A0A] rounded-xl text-sm h-11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Password
                      </label>
                      <Input.Password
                        size="large"
                        placeholder="Create password"
                        prefix={<Lock className="w-4 h-4 text-[#73736A] mr-2" />}
                        value={creatorPassword}
                        onChange={(e) => setCreatorPassword(e.target.value)}
                        className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Primary Platform
                      </label>
                      <Select
                        size="large"
                        value={creatorPlatform}
                        onChange={(v) => setCreatorPlatform(v)}
                        className="w-full"
                        options={[
                          { value: 'instagram', label: 'Instagram' },
                          { value: 'tiktok', label: 'TikTok' },
                          { value: 'youtube', label: 'YouTube' },
                          { value: 'ugc', label: 'UGC Content Creator' },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                        Content Category
                      </label>
                      <Select
                        size="large"
                        value={creatorCategory}
                        onChange={(v) => setCreatorCategory(v)}
                        className="w-full"
                        options={[
                          { value: 'Beauty', label: 'Beauty & Skincare' },
                          { value: 'Fashion', label: 'Fashion & Style' },
                          { value: 'Fitness', label: 'Fitness & Health' },
                          { value: 'Travel', label: 'Travel & Outdoor' },
                          { value: 'Food', label: 'Food & Cuisine' },
                          { value: 'Tech', label: 'Tech & Gadgets' },
                          { value: 'Lifestyle', label: 'Lifestyle' },
                        ]}
                      />
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

