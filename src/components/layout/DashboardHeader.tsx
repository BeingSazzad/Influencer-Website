'use client';

import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { switchRole, logout } from '@/redux/slices/authSlice';
import {
  Bell,
  Search,
  Sparkles,
  Briefcase,
  Home,
  User as UserIcon,
  ChevronDown,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Dropdown, MenuProps, Badge, Button, Tag } from 'antd';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, actionButton }: DashboardHeaderProps) {
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { leads } = useAppSelector((state) => state.lead);

  const newLeads = leads.filter((l) => l.status === 'new');

  const notificationsMenu: MenuProps['items'] = [
    {
      key: 'header',
      label: (
        <div className="font-bold text-xs uppercase tracking-wider text-slate-500 py-1">
          Recent VIP Notifications ({newLeads.length})
        </div>
      ),
    },
    ...newLeads.slice(0, 3).map((lead) => ({
      key: lead.id,
      label: (
        <div className="py-1.5 max-w-xs">
          <div className="text-xs font-bold text-slate-900">{lead.clientName}</div>
          <div className="text-[11px] text-slate-500 truncate">{lead.message}</div>
          <div className="text-[10px] text-emerald-600 font-medium">{lead.propertyTitle}</div>
        </div>
      ),
    })),
    {
      key: 'all',
      label: (
        <Link href="/agent/leads" className="text-xs font-semibold text-emerald-600 block text-center py-1">
          View all inquiries →
        </Link>
      ),
    },
  ];

  const profileMenu: MenuProps['items'] = [
    {
      key: 'role',
      label: (
        <div className="py-1">
          <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
          <div className="text-[11px] text-slate-500 capitalize">{activeRole} Account</div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'switch_to_buyer',
      label: 'Switch to Buyer View',
      icon: <Home className="w-3.5 h-3.5" />,
      onClick: () => dispatch(switchRole('buyer')),
    },
    {
      key: 'switch_to_agent',
      label: 'Switch to Agent View',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      onClick: () => dispatch(switchRole('agent')),
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Sign Out',
      danger: true,
      onClick: () => dispatch(logout()),
    },
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-slate-950 tracking-tight font-serif">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {actionButton}

        {/* Global Role Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg text-xs">
          <button
            onClick={() => dispatch(switchRole('agent'))}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeRole === 'agent'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Agent
          </button>
          <button
            onClick={() => dispatch(switchRole('buyer'))}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeRole === 'buyer'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Buyer
          </button>
        </div>

        {/* Notification Bell */}
        <Dropdown menu={{ items: notificationsMenu }} placement="bottomRight" trigger={['click']}>
          <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            {newLeads.length > 0 && (
              <span className="absolute 1 top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </button>
        </Dropdown>

        {/* Profile Dropdown */}
        <Dropdown menu={{ items: profileMenu }} placement="bottomRight" trigger={['click']}>
          <button className="flex items-center gap-2.5 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-full transition-colors">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
            <span className="text-xs font-bold text-slate-800 hidden md:inline-block">
              {currentUser?.name || 'Account'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
