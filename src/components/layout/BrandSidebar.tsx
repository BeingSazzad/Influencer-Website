'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { message } from 'antd';
import {
  LayoutDashboard,
  Bookmark,
  Layers,
  PlusCircle,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';

export function BrandSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedCreatorIds } = useAppSelector((state) => state.creator);
  const { orders } = useAppSelector((state) => state.order);
  const { conversations } = useAppSelector((state) => state.message);

  const brandOrdersCount = orders.filter((o) => o.brandId === currentUser?.id || o.brandId === 'user_brand_01').length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCountBrand || 0), 0);

  const handleLogout = () => {
    dispatch(logout());
    message.success('Signed out successfully');
    router.push('/login');
  };

  const navItems = [
    {
      name: 'Overview',
      href: '/brand/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Campaigns',
      href: '/brand/campaigns',
      icon: Layers,
      badge: brandOrdersCount > 0 ? brandOrdersCount : undefined,
    },
    {
      name: 'Messages',
      href: '/brand/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      name: 'Saved',
      href: '/brand/saved',
      icon: Bookmark,
      badge: savedCreatorIds.length > 0 ? savedCreatorIds.length : undefined,
    },
    {
      name: 'Payments',
      href: '/brand/payments',
      icon: CreditCard,
    },
    {
      name: 'New Offer',
      href: '/brand/hire/new',
      icon: PlusCircle,
    },
    {
      name: 'Settings',
      href: '/brand/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E7E7E2] flex flex-col justify-between h-screen sticky top-0 shrink-0 font-sans">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-[#E7E7E2]">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider">
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
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm leading-[20px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white shadow-sm'
                    : 'text-[#555550] hover:text-[#0A0A0A] hover:bg-[#F4F4F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#73736A]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#EAEAE3] text-[#0A0A0A]'
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

      {/* Standard Sidebar User Footer */}
      <div className="border-t border-[#E7E7E2] p-3">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-[#FAFAF8] hover:bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] transition-all group">
          <Link
            href="/brand/settings"
            className="flex items-center gap-2.5 min-w-0 flex-1 pr-1.5 cursor-pointer"
            title="Account Settings"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name || 'Brand'}
              className="w-9 h-9 rounded-full object-cover border border-[#E7E7E2] shrink-0"
            />
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="text-sm font-bold text-[#0A0A0A] group-hover:text-zinc-600 transition-colors truncate">
                {currentUser?.name || 'Elena Rostova'}
              </div>
              <div className="text-sm text-[#73736A] font-medium truncate">
                {currentUser?.companyName || 'Aura Skincare Paris'}
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="w-8 h-8 rounded-xl text-[#73736A] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
