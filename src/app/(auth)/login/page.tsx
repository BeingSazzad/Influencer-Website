'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { loginAsBrandDemo, loginAsCreatorDemo } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';
import { message } from 'antd';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      message.error('Please enter your email address');
      return;
    }

    // Default to Brand or Creator based on email input
    if (email.toLowerCase().includes('creator') || email.toLowerCase().includes('sophie')) {
      dispatch(loginAsCreatorDemo());
      message.success('Welcome back, Sophie Kim!');
      router.push('/creator/dashboard');
    } else {
      dispatch(loginAsBrandDemo());
      message.success('Welcome back, Elena Rostova!');
      router.push('/brand/dashboard');
    }
  };

  const handleBrandDemoLogin = () => {
    dispatch(loginAsBrandDemo());
    message.success('Logged in as Elena Rostova (Brand Lead)');
    router.push('/brand/dashboard');
  };

  const handleCreatorDemoLogin = () => {
    dispatch(loginAsCreatorDemo());
    message.success('Logged in as Sophie Kim (Verified Creator)');
    router.push('/creator/dashboard');
  };

  return (
    <div className="min-h-dvh bg-[#FAFAF8] font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78] lg:grid lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <div className="flex min-h-dvh items-center justify-center px-4 py-8 sm:px-8 lg:order-2 lg:h-full lg:min-h-0 lg:overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-6">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center mb-2 hover:opacity-90 transition-opacity">
              <Logo size="lg" />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-[#66665E] font-medium leading-[24px]">
              Log in to manage your campaigns, orders, and creator collaborations.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 shadow-xl shadow-black/[0.04] rounded-3xl border border-[#D2D2CA] space-y-6">
            {/* Manual Form */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#66665E] absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-[#0A0A0A]">
                    Password
                  </label>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#66665E] absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-10 pr-11 bg-white border border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/10 rounded-xl text-sm font-sans text-[#0A0A0A] placeholder-[#9E9E94] outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-[#66665E] hover:text-[#0A0A0A] transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1 select-none">
                <label className="inline-flex items-center gap-2 cursor-pointer group">
                  <span
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      rememberMe
                        ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-2xs'
                        : 'bg-white border-[#D2D2CA] group-hover:border-[#0A0A0A]'
                    }`}
                  >
                    {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="text-sm text-[#66665E] group-hover:text-[#0A0A0A] font-medium transition-colors">
                    Remember me
                  </span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#66665E] hover:text-[#0A0A0A] font-bold transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-full font-bold text-sm sm:text-base bg-[#0A0A0A] hover:bg-[#FF2D78] text-white shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-3 font-sans"
              >
                Log in
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCreatorDemoLogin}
                  className="h-8 px-3.5 rounded-full text-xs font-bold bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAF8] cursor-pointer"
                >
                  Demo Influencer
                </button>
                <button
                  type="button"
                  onClick={handleBrandDemoLogin}
                  className="h-8 px-3.5 rounded-full text-xs font-bold bg-white border border-[#D2D2CA] text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FAFAF8] cursor-pointer"
                >
                  Demo Brand
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-2 border-t border-[#E7E7E2]/60">
              <p className="text-sm text-[#66665E] font-medium">
                New to Influverse?{' '}
                <Link href="/register" className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <aside className="relative hidden min-h-0 overflow-hidden lg:order-1 lg:block lg:h-full">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/25" />
        <div className="relative z-10 flex h-full flex-col justify-between overflow-y-auto p-8 text-white xl:p-14">
          <Logo isLight size="md" />
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              Brand &amp; creator collaboration
            </p>
            <h2 className="mt-3 text-3xl font-black leading-[1.12] tracking-tight xl:text-[2.75rem] xl:leading-[1.08]">
              Where Impactful Stories Turn Into Powerful Results.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 xl:text-base">
              Connect, collaborate, and scale your brand with top-tier creators. Influverse makes partnerships transparent, seamless, and results-driven.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/20 pt-5 xl:mt-8 xl:gap-4 xl:pt-6">
              <div className="min-w-0">
                <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-white" />
                <p className="text-[13px] font-black leading-tight xl:text-sm">Discover Creators</p>
                <p className="mt-1 text-[11px] leading-snug text-white/70 xl:text-xs">Verified profiles &amp; authentic reach</p>
              </div>
              <div className="min-w-0">
                <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-white" />
                <p className="text-[13px] font-black leading-tight xl:text-sm">Seamless Workflow</p>
                <p className="mt-1 text-[11px] leading-snug text-white/70 xl:text-xs">From brief to final approval</p>
              </div>
              <div className="min-w-0">
                <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-white" />
                <p className="text-[13px] font-black leading-tight xl:text-sm">Guaranteed Safety</p>
                <p className="mt-1 text-[11px] leading-snug text-white/70 xl:text-xs">Protected payments at every step</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
