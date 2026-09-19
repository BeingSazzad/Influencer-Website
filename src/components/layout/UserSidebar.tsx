'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout, switchRole } from '@/redux/slices/authSlice';
import {
  LayoutDashboard,
  Heart,
  CalendarCheck,
  User,
  ArrowLeft,
  LogOut,
  Building2,
  Sparkles,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Button, Tag } from 'antd';

export function UserSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { savedPropertyIds } = useAppSelector((state) => state.property);

  const menuItems = [
    {
      name: 'Overview',
      href: '/user/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Saved Wishlist',
      href: '/user/saved-properties',
      icon: Heart,
      badge: savedPropertyIds.length,
    },
    {
      name: 'Scheduled Tours',
      href: '/user/inquiries',
      icon: CalendarCheck,
    },
    {
      name: 'Profile & Settings',
      href: '/user/profile',
      icon: User,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 font-serif leading-tight">LUXE PRIME</div>
            <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Buyer Portal</div>
          </div>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="p-4 m-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3">
        <img
          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
          alt={currentUser?.name || 'User'}
          className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
        />
        <div className="overflow-hidden">
          <div className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Alexander Sterling'}</div>
          <div className="text-[11px] text-slate-500 truncate">{currentUser?.location || 'Private Investor'}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-700">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Role Switcher Box */}
      <div className="p-4 mx-3 mb-4 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Switch Perspective</span>
        </div>
        <p className="text-[11px] text-emerald-800 mb-3 leading-snug">
          Want to explore the Agent CRM & Listing creator?
        </p>
        <Link href="/agent/dashboard">
          <button
            onClick={() => dispatch(switchRole('agent'))}
            className="w-full py-1.5 px-3 bg-white text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300 hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            Switch to Agent CRM
          </button>
        </Link>
      </div>

      {/* Back to main website and logout */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 py-1.5 px-2 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 py-1.5 px-2 rounded-lg hover:bg-rose-50 w-full text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
