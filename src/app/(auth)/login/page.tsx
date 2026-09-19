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
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedRole, setSelectedRole] = useState<'brand' | 'creator'>('brand');
  const [email, setEmail] = useState('elena@nordicglow.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (role: 'brand' | 'creator') => {
    setSelectedRole(role);
    if (role === 'brand') {
      setEmail('elena@nordicglow.com');
    } else {
      setEmail('sophie@creatorhub.de');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'brand') {
      dispatch(setUser(MOCK_USERS[0])); // Elena Rostova (Brand)
      dispatch(switchRole('brand'));
      message.success('Signed in as Elena Rostova (Brand Lead)');
      router.push('/brand/dashboard');
    } else {
      dispatch(setUser(MOCK_USERS[1])); // Sophie Kim (Creator)
      dispatch(switchRole('creator'));
      message.success('Signed in as Sophie Kim (Verified Creator)');
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
          Welcome back
        </h2>
        <p className="text-xs text-[#73736A]">
          Sign in to access your Brand campaigns or Creator workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-[#E7E7E2] space-y-6">
          {/* Perspective Selector Pills */}
          <div>
            <label className="block text-[11px] font-extrabold text-[#73736A] uppercase tracking-wider mb-2">
              Select Demo Perspective
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('brand')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'brand'
                    ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                    : 'bg-[#FAFAF8] text-[#151515] border-[#E7E7E2] hover:bg-[#F4F4F0]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Brand Marketer</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('creator')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'creator'
                    ? 'bg-[#2B7FFF] text-white border-[#2B7FFF] shadow-xs'
                    : 'bg-[#FAFAF8] text-[#151515] border-[#E7E7E2] hover:bg-[#F4F4F0]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Content Creator</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#151515] mb-1">
                Account Email
              </label>
              <Input
                size="large"
                prefix={<Mail className="w-4 h-4 text-[#73736A] mr-2" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#FAFAF8] border-[#E7E7E2] text-[#151515] rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#151515]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#2B7FFF] hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <Input.Password
                size="large"
                prefix={<Lock className="w-4 h-4 text-[#73736A] mr-2" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Sign In to {selectedRole === 'brand' ? 'Brand Workspace' : 'Creator Workspace'}
            </Button>
          </form>

          {/* Quick Demo Pre-fill note */}
          <div className="p-3 bg-[#F4F4F0] rounded-2xl border border-[#E7E7E2] text-[11px] text-[#73736A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2B7FFF] shrink-0" />
            <span>Clicking Sign In instantly loads verified demo session records.</span>
          </div>

          <div className="text-center pt-2 border-t border-[#E7E7E2] text-xs text-[#73736A]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#151515] font-black hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
