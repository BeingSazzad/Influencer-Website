'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout, switchRole } from '@/redux/slices/authSlice';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  Users,
  BarChart3,
  UserCircle,
  ArrowLeft,
  LogOut,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Home
} from 'lucide-react';
import { Tag } from 'antd';

export function AgentSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { leads } = useAppSelector((state) => state.lead);
  const { properties } = useAppSelector((state) => state.property);

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  const menuItems = [
    {
      name: 'CRM Dashboard',
      href: '/agent/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'My Listings',
      href: '/agent/listings',
      icon: Building,
      badge: properties.length,
    },
    {
      name: 'Add New Listing',
      href: '/agent/listings/new',
      icon: PlusCircle,
      highlight: true,
    },
    {
      name: 'Leads & Inquiries',
      href: '/agent/leads',
      icon: Users,
      badge: newLeadsCount,
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      name: 'Social Reach & Analytics',
      href: '/agent/analytics',
      icon: BarChart3,
    },
    {
      name: 'Influencer Brand Profile',
      href: '/agent/profile',
      icon: UserCircle,
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Building2 className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="font-bold text-white font-serif leading-tight">LUXE PRIME</div>
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <span>Agent CRM Hub</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        </Link>
      </div>

      {/* Agent Profile Card */}
      <div className="p-4 m-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
        <div className="relative">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name || 'Agent'}
            className="w-10 h-10 rounded-full object-cover border border-emerald-500/50 shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
        </div>
        <div className="overflow-hidden">
          <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Sophia Vance'}</div>
          <div className="text-[11px] text-emerald-400 font-medium truncate">{currentUser?.agency || 'Top 1% Global Producer'}</div>
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
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : item.highlight
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Role Switcher Box */}
      <div className="p-4 mx-3 mb-4 bg-slate-900/90 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Switch Perspective</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3 leading-snug">
          Want to see what the buyer portal looks like?
        </p>
        <Link href="/user/dashboard">
          <button
            onClick={() => dispatch(switchRole('buyer'))}
            className="w-full py-1.5 px-3 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 hover:bg-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-sky-400" />
            Switch to Buyer View
          </button>
        </Link>
      </div>

      {/* Back to main website and logout */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white py-1.5 px-2 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 py-1.5 px-2 rounded-lg hover:bg-rose-950/40 w-full text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
