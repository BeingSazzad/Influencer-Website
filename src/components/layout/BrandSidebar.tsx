'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { switchRole } from '@/redux/slices/authSlice';
import {
  LayoutDashboard,
  Search,
  Bookmark,
  ShoppingBag,
  PlusCircle,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  MessageSquare,
  Users,
} from 'lucide-react';

export function BrandSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedCreatorIds } = useAppSelector((state) => state.creator);
  const { orders } = useAppSelector((state) => state.order);

  const brandOrdersCount = orders.filter((o) => o.brandId === currentUser?.id || o.brandId === 'user-brand-01').length;

  const navItems = [
    {
      name: 'Overview',
      href: '/brand/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Explore Creators',
      href: '/creators',
      icon: Search,
    },
    {
      name: 'Active Hires & Orders',
      href: '/brand/orders',
      icon: ShoppingBag,
      badge: brandOrdersCount > 0 ? brandOrdersCount : undefined,
    },
    {
      name: 'Saved Shortlist',
      href: '/brand/saved',
      icon: Bookmark,
      badge: savedCreatorIds.length > 0 ? savedCreatorIds.length : undefined,
    },
    {
      name: 'Send New Offer',
      href: '/brand/hire/new',
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E7E7E2] flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-[#E7E7E2]">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#151515] text-white text-[10px] font-bold uppercase tracking-wider">
            Brand Workspace
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/brand/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#151515] text-white shadow-sm'
                    : 'text-[#666660] hover:text-[#151515] hover:bg-[#F4F4F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#73736A]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#EAEAE3] text-[#151515]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Demo Role Switcher */}
      <div className="p-4 border-t border-[#E7E7E2] space-y-3">
        {/* Switch Role Quick Button */}
        <button
          onClick={() => dispatch(switchRole('creator'))}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F4F4F0] hover:bg-[#EAEAE3] text-[#151515] text-xs font-bold transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2B7FFF]" />
            <span>Switch to Creator View</span>
          </div>
          <span className="text-[10px] text-[#73736A]">Demo</span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={currentUser?.name || 'Brand'}
            className="w-9 h-9 rounded-full object-cover border border-[#E7E7E2]"
          />
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-bold text-[#151515] truncate">
              {currentUser?.name || 'Elena Rostova'}
            </div>
            <div className="text-[10px] text-[#73736A] truncate">
              {currentUser?.companyName || 'Nordic Glow Beauty'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
