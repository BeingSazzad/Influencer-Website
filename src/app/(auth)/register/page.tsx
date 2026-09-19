'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { switchRole, setUser } from '@/redux/slices/authSlice';
import { MOCK_USERS } from '@/Mockdata';
import {
  Building2,
  User,
  Mail,
  Lock,
  Briefcase,
  Home,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Input, Button, message } from 'antd';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<'agent' | 'buyer'>('agent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    message.success('Account created successfully! Welcome to LUXE PRIME.');
    if (role === 'agent') {
      dispatch(setUser(MOCK_USERS[1]));
      dispatch(switchRole('agent'));
      router.push('/agent/dashboard');
    } else {
      dispatch(setUser(MOCK_USERS[0]));
      dispatch(switchRole('buyer'));
      router.push('/user/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Building2 className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-serif">LUXE PRIME</span>
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight font-serif">
          Join the Global Luxury Real Estate Network
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Apply as a verified Real Estate Influencer or join as an accredited Buyer.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-800 space-y-6">
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Membership Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  role === 'agent'
                    ? 'bg-emerald-950/60 border-emerald-500 text-white'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  {role === 'agent' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-white">Agent / Producer</div>
                <div className="text-[10px] text-slate-400">List estates & CRM</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  role === 'buyer'
                    ? 'bg-sky-950/60 border-sky-500 text-white'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Home className="w-4 h-4 text-sky-400" />
                  {role === 'buyer' && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                </div>
                <div className="text-xs font-bold text-white">Buyer / Investor</div>
                <div className="text-[10px] text-slate-400">Tours & wishlists</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Full Name
              </label>
              <Input
                size="large"
                prefix={<User className="w-4 h-4 text-slate-500 mr-2" />}
                placeholder="e.g. Marcus Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Email Address
              </label>
              <Input
                type="email"
                size="large"
                prefix={<Mail className="w-4 h-4 text-slate-500 mr-2" />}
                placeholder="e.g. marcus@estates.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white rounded-xl"
                required
              />
            </div>

            {role === 'agent' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Brokerage / Media Channel Name
                </label>
                <Input
                  size="large"
                  prefix={<Building2 className="w-4 h-4 text-slate-500 mr-2" />}
                  placeholder="e.g. Beverly Hills Media Group"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white rounded-xl"
                />
              </div>
            )}

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="h-12 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white mt-2"
            >
              Complete Registration
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
