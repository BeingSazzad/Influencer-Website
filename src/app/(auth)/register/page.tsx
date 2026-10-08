'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, switchRole, loginAsCreatorDemo, loginAsBrandDemo } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import {
  Lock,
  Mail,
  User as UserIcon,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const initialRoleParam = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(
    initialRoleParam === 'brand' ? 'brand' : null
  );

  useEffect(() => {
    if (initialRoleParam === 'creator') {
      router.push('/creator/onboarding');
    } else if (initialRoleParam === 'brand') {
      setSelectedRole('brand');
    }
  }, [initialRoleParam, router]);

  // Brand Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');

  // Handle Creator Selection (Direct to Step 1 Onboarding - No Duplication!)
  const handleSelectCreator = () => {
    router.push('/creator/onboarding');
  };

  // Handle Brand Register
  const handleBrandRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      message.error('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      message.error('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      message.error('Password must be at least 6 characters');
      return;
    }

    const brandUser = {
      id: `user_brand_${Date.now()}`,
      name,
      email,
      role: 'brand' as const,
      companyName: companyName.trim() || name,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      location: 'Berlin, Germany',
      bio: `${companyName || name} marketing team.`,
      balanceEur: 5000,
    };

    dispatch(setUser(brandUser));
    dispatch(switchRole('brand'));
    message.success(`Welcome to Influverse, ${name}!`);
    router.push('/brand/dashboard');
  };

  // 1-Click Instant Demo Access
  const handleCreatorDemo = () => {
    dispatch(loginAsCreatorDemo());
    message.success('Signed in as Sophie Kim (Creator)');
    router.push('/creator/dashboard');
  };

  const handleBrandDemo = () => {
    dispatch(loginAsBrandDemo());
    message.success('Signed in as Elena Rostova (Brand)');
    router.push('/brand/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      {/* Clean Header */}
      <header className="border-b border-[#E7E7E2] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>
      </header>

      {/* Main Registration Layout */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-2xl space-y-8">
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              {selectedRole === 'brand' ? 'Create your Brand Workspace' : 'Create your account'}
            </h1>
            <p className="text-sm sm:text-base text-[#66665E] font-medium">
              {selectedRole === 'brand'
                ? 'Launch campaigns and collaborate with vetted European creators.'
                : 'Choose how you want to use Influverse to get started.'}
            </p>
          </div>

          {selectedRole === null ? (
            /* STEP 1: Two Clean Role Selection Boxes (Creator vs Brand) */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* 1. Content Creator Box */}
                <div
                  onClick={handleSelectCreator}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E7E7E2] hover:border-[#0A0A0A] shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group text-left relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#FF2D78] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#66665E]">
                        For Creators
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">
                        I am a Creator
                      </h2>
                      <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1.5 leading-relaxed">
                        Monetize your content, create custom packages, and partner with European brands.
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-[#F4F4F0] text-xs font-semibold text-[#0A0A0A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Keep 100% of your earnings (0% commission)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant escrow payment protection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Direct client chat & custom briefs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-[#0A0A0A] group-hover:bg-[#FF2D78] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Continue as Creator</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* 2. Brand Marketer Box */}
                <div
                  onClick={() => setSelectedRole('brand')}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E7E7E2] hover:border-[#0A0A0A] shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group text-left relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-[#0A0A0A] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <Building className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#66665E]">
                        For Brands
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-[#0A0A0A] group-hover:text-black transition-colors">
                        I am a Brand
                      </h2>
                      <p className="text-xs sm:text-sm text-[#66665E] font-medium mt-1.5 leading-relaxed">
                        Discover 12,000+ vetted creators, run campaigns, and safely escrow deliverables.
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-[#F4F4F0] text-xs font-semibold text-[#0A0A0A]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Verified creators on Instagram, TikTok, YouTube</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% escrow milestone protection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Zero upfront subscription fees</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-[#0A0A0A] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-zinc-800"
                    >
                      <span>Continue as Brand</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick 1-Click Instant Demo Access */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7E7E2] space-y-2.5">
                <div className="text-center">
                  <span className="text-xs font-bold text-[#A3A39C] uppercase tracking-wider">
                    Or instant 1-click test
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={handleCreatorDemo}
                    className="p-2.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-white text-xs font-black text-[#0A0A0A] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
                    <span>Creator Demo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBrandDemo}
                    className="p-2.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-white text-xs font-black text-[#0A0A0A] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Brand Demo</span>
                  </button>
                </div>
              </div>

              {/* Already Have Account - Sign In */}
              <div className="text-center">
                <p className="text-sm text-[#66665E] font-medium">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            /* STEP 2: Brand Registration Form */
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6 max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="text-xs font-bold text-[#66665E] hover:text-[#0A0A0A] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Choose a different account type</span>
              </button>

              <form onSubmit={handleBrandRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Studios GmbH"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
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

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-black text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Create Brand Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Already Have Account */}
              <div className="text-center pt-3 border-t border-[#E7E7E2]/70">
                <p className="text-sm text-[#66665E] font-medium">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
