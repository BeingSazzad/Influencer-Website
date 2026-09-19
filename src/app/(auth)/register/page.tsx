'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { switchRole, setUser } from '@/redux/slices/authSlice';
import { MOCK_USERS } from '@/Mockdata';
import { Logo } from '@/components/shared/Logo';
import {
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<'brand' | 'creator'>('brand');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyOrHandle, setCompanyOrHandle] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'brand') {
      dispatch(setUser(MOCK_USERS[0]));
      dispatch(switchRole('brand'));
      message.success('Account created! Welcome to Brand Workspace.');
      router.push('/brand/dashboard');
    } else {
      dispatch(setUser(MOCK_USERS[1]));
      dispatch(switchRole('creator'));
      message.success('Creator profile created! Welcome to Creator Workspace.');
      router.push('/creator/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center justify-center mb-2">
          <Logo size="lg" />
        </Link>
        <h2 className="text-3xl font-black text-[#151515] tracking-tight">
          Join Influverse
        </h2>
        <p className="text-xs text-[#73736A]">
          Connect with top creators or get hired by leading brands.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-[#E7E7E2] space-y-6">
          {/* Role Intent Selector */}
          <div>
            <label className="block text-[11px] font-extrabold text-[#73736A] uppercase tracking-wider mb-2">
              I want to join as:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('brand')}
                className={`py-3 px-3 rounded-2xl text-xs font-bold border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  role === 'brand'
                    ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                    : 'bg-[#FAFAF8] text-[#151515] border-[#E7E7E2] hover:bg-[#F4F4F0]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>A Brand / Agency</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-3 px-3 rounded-2xl text-xs font-bold border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  role === 'creator'
                    ? 'bg-[#2B7FFF] text-white border-[#2B7FFF] shadow-xs'
                    : 'bg-[#FAFAF8] text-[#151515] border-[#E7E7E2] hover:bg-[#F4F4F0]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>A Content Creator</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">
                Full Name
              </label>
              <Input
                size="large"
                prefix={<UserIcon className="w-4 h-4 text-[#73736A] mr-2" />}
                placeholder="e.g. Sarah Connor"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">
                Work Email
              </label>
              <Input
                type="email"
                size="large"
                prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">
                {role === 'brand' ? 'Company Name' : 'Primary Social Handle'}
              </label>
              <Input
                size="large"
                placeholder={role === 'brand' ? 'e.g. Acme Corp' : 'e.g. @sophiekim'}
                value={companyOrHandle}
                onChange={(e) => setCompanyOrHandle(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                required
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="h-11 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white mt-2 border-none shadow-none"
            >
              Get Started as {role === 'brand' ? 'Brand' : 'Creator'}
            </Button>
          </form>

          <div className="p-3 bg-[#EEF7F2] rounded-2xl text-[11px] text-[#23744D] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Free registration with transparent 15% escrow on hires.</span>
          </div>

          <div className="text-center pt-2 border-t border-[#E7E7E2] text-xs text-[#73736A]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#151515] font-black hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
