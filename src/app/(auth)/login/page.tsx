'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { loginAsBrandDemo, loginAsCreatorDemo } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import { AuthNetworkVisual } from '@/components/auth/AuthNetworkVisual';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Input, Checkbox, message } from 'antd';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#FF2D78]/20 selection:text-[#FF2D78]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-6">
        {/* Left: Clean Minimalist Login Form */}
        <div className="w-full lg:col-span-5 xl:col-span-5 space-y-7">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center mb-1 hover:opacity-90 transition-opacity">
              <Logo size="lg" />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              Welcome back.
            </h1>
            <p className="text-sm sm:text-base text-[#73736A] font-medium leading-relaxed">
              Log in to continue your collaborations.
            </p>
          </div>

          <div className="space-y-6">
            {/* Quick 1-Click Demo Accounts */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-white border border-[#E7E7E2] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#73736A] uppercase tracking-wider">
                  1-Click Instant Demo Access
                </span>
                <span className="text-[11px] font-bold text-[#FF2D78] bg-[#FFF0F5] px-2 py-0.5 rounded-full border border-[#FF2D78]/20">
                  Instant Test
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleBrandDemoLogin}
                  className="p-2.5 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-[#FAFAF8] hover:bg-[#F4F4F0] text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-5 h-5 rounded-md bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-[10px]">
                      B
                    </div>
                    <span className="text-xs font-black text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">
                      Brand Demo
                    </span>
                  </div>
                  <div className="text-[11px] text-[#73736A] truncate font-medium">Elena Rostova</div>
                </button>

                <button
                  type="button"
                  onClick={handleCreatorDemoLogin}
                  className="p-2.5 rounded-xl border border-[#E7E7E2] hover:border-[#FF2D78] bg-[#FAFAF8] hover:bg-[#F4F4F0] text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-5 h-5 rounded-md bg-[#FF2D78] text-white flex items-center justify-center font-bold text-[10px]">
                      C
                    </div>
                    <span className="text-xs font-black text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">
                      Creator Demo
                    </span>
                  </div>
                  <div className="text-[11px] text-[#73736A] truncate font-medium">Sophie Kim</div>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E7E7E2] w-full" />
              <span className="bg-[#FAFAF8] px-3 text-[11px] font-bold text-[#A3A39C] uppercase tracking-wider absolute">
                or log in with email
              </span>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">
                  Email address
                </label>
                <Input
                  size="large"
                  type="email"
                  placeholder="you@example.com"
                  prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] text-[#0A0A0A] rounded-xl text-sm h-12 shadow-2xs"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-[#0A0A0A]">
                    Password
                  </label>
                </div>
                <Input.Password
                  size="large"
                  placeholder="••••••••••••"
                  prefix={<Lock className="w-4 h-4 text-[#73736A] mr-2" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-[#E7E7E2] hover:border-[#0A0A0A] focus:border-[#0A0A0A] rounded-xl text-sm h-12 shadow-2xs"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="text-sm text-[#73736A] font-medium"
                >
                  Remember me
                </Checkbox>
                <Link href="/forgot-password" className="text-xs text-[#73736A] hover:text-[#0A0A0A] font-bold transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-full font-outfit font-bold text-[16px] leading-[20px] bg-[#0A0A0A] hover:bg-[#FF2D78] text-white shadow-md hover:shadow-[#FF2D78]/25 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-3"
              >
                Log in
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-[#73736A] font-medium">
                New to Influverse?{' '}
                <Link href="/register" className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Connected Network Graphic Matching Reference Design */}
        <div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-full">
          <AuthNetworkVisual />
        </div>
      </div>
    </div>
  );
}

