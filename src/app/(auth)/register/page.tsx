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
  AtSign,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const initialRoleParam = searchParams.get('role');
  const [role, setRole] = useState<'creator' | 'brand'>(
    initialRoleParam === 'creator' ? 'creator' : 'brand'
  );

  useEffect(() => {
    if (initialRoleParam === 'creator') setRole('creator');
    else if (initialRoleParam === 'brand') setRole('brand');
  }, [initialRoleParam]);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [handle, setHandle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('female');

  // Handle Form Submit
  const handleRegister = (e: React.FormEvent) => {
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

    if (role === 'brand') {
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
    } else {
      // Content Creator
      const cleanHandle = (handle.trim() || name.toLowerCase().replace(/\s+/g, '')).replace(/^@+/, '');
      const creatorUser = {
        id: `user_creator_${Date.now()}`,
        name,
        email,
        role: 'creator' as const,
        handle: `@${cleanHandle}`,
        gender,
        avatar: '',
        location: '',
        bio: '',
        balanceEur: 0,
      };

      dispatch(setUser(creatorUser));
      message.success(`Welcome to Influverse, ${name}! Let's complete your creator profile.`);
      router.push('/creator/onboarding');
    }
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

      {/* Main Registration Layout: Clean, Centered, Breathable */}
      <main className="flex-1 flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-lg space-y-8">
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              Create your account
            </h1>
            <p className="text-sm sm:text-base text-[#66665E] font-medium">
              Join Europe&apos;s leading marketplace for brands &amp; creators.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E7E2] shadow-xl shadow-black/[0.03] space-y-6">
            {/* Role Switcher */}
            <div className="grid grid-cols-2 p-1.5 bg-[#F4F4F0] rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'creator'
                    ? 'bg-white text-[#0A0A0A] shadow-sm'
                    : 'text-[#66665E] hover:text-[#0A0A0A]'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${role === 'creator' ? 'text-[#FF2D78]' : ''}`} />
                <span>Content Creator</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('brand')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'brand'
                    ? 'bg-white text-[#0A0A0A] shadow-sm'
                    : 'text-[#66665E] hover:text-[#0A0A0A]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Brand Marketer</span>
              </button>
            </div>

            {/* Standard Signup Form */}
            <form onSubmit={handleRegister} className="space-y-4">
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
                    placeholder={role === 'creator' ? 'e.g. Sophie Kim' : 'e.g. Elena Rostova'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Creator Username or Brand Company */}
              {role === 'creator' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="sophiekim"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>
              ) : (
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
                      placeholder="Acme Studios GmbH"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:ring-0 text-sm font-medium text-[#0A0A0A] outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A39C]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0A0A0A] hover:bg-black text-white font-black text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>
                  {role === 'creator'
                    ? 'Create Creator Account & Continue'
                    : 'Create Brand Workspace'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Instant Demo Access */}
            <div className="pt-4 border-t border-[#F4F4F0] space-y-2.5">
              <div className="text-center">
                <span className="text-xs font-bold text-[#A3A39C] uppercase tracking-wider">
                  Or instant 1-click test
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
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

            {/* Already Have Account - Sign In CTA */}
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
        </div>
      </main>
    </div>
  );
}
