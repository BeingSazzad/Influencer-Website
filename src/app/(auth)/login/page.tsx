'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { switchRole, setUser } from '@/redux/slices/authSlice';
import { MOCK_USERS } from '@/Mockdata';
import {
  Building2,
  Lock,
  Mail,
  Briefcase,
  Home,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedRole, setSelectedRole] = useState<'agent' | 'buyer'>('agent');
  const [email, setEmail] = useState('sophia@vancerealestate.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (role: 'agent' | 'buyer') => {
    setSelectedRole(role);
    if (role === 'agent') {
      setEmail('sophia@vancerealestate.com');
    } else {
      setEmail('alexander@luxuryliving.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'agent') {
      dispatch(setUser(MOCK_USERS[1]));
      dispatch(switchRole('agent'));
      message.success('Logged in as Sophia Vance (Agent / Influencer)');
      router.push('/agent/dashboard');
    } else {
      dispatch(setUser(MOCK_USERS[0]));
      dispatch(switchRole('buyer'));
      message.success('Logged in as Alexander Sterling (Buyer / Investor)');
      router.push('/user/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Building2 className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-serif">LUXE PRIME</span>
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight font-serif">
          Sign In to Your Private Portal
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Access high-net-worth listings, inquiries, or your CRM pipeline.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-800 space-y-6">
          {/* Perspective Selector Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Demo Perspective
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('agent')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'agent'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Agent Portal</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('buyer')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'buyer'
                    ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Buyer Portal</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Account Email
              </label>
              <Input
                size="large"
                prefix={<Mail className="w-4 h-4 text-slate-500 mr-2" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white rounded-xl placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input.Password
                size="large"
                prefix={<Lock className="w-4 h-4 text-slate-500 mr-2" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white rounded-xl"
                required
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="h-12 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white mt-2 shadow-lg shadow-emerald-600/30"
            >
              Sign In to {selectedRole === 'agent' ? 'Agent CRM' : 'Buyer Portal'}
            </Button>
          </form>

          {/* Quick Demo Pre-fill note */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Clicking Sign In will immediately authenticate with verified demo mock records.</span>
          </div>

          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-emerald-400 font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
