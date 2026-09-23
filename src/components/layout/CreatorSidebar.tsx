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
  Inbox,
  ShoppingBag,
  Layers,
  Package,
  Film,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export function CreatorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { creators } = useAppSelector((state) => state.creator);
  const { orders } = useAppSelector((state) => state.order);
  const { conversations } = useAppSelector((state) => state.message);

  const currentCreator = creators[0]; // Sophie Kim
  const creatorName = currentCreator?.name || currentUser?.name || 'Sophie Kim';
  const creatorHandle = currentCreator?.handle || currentUser?.handle || '@sophiekim';
  const creatorAvatar = currentCreator?.avatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  const handleLogout = () => {
    dispatch(logout());
    message.success('Signed out successfully');
    router.push('/login');
  };

  // Incoming pending offers
  const pendingOffersCount = orders.filter(
    (o) => o.status === 'offer_sent' && (o.creatorId === 'creator-01' || o.creatorId === currentUser?.id)
  ).length;

  // Active production orders
  const activeOrdersCount = orders.filter(
    (o) => ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status)
  ).length;

  // Unread messages
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCountCreator || 0), 0);

  const navItems = [
    {
      name: 'Overview',
      href: '/creator/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Profile',
      href: '/creator/profile',
      icon: User,
    },
    {
      name: 'Portfolio',
      href: '/creator/portfolio',
      icon: Film,
      badge: currentCreator?.portfolio?.length || undefined,
    },
    {
      name: 'Packages',
      href: '/creator/packages',
      icon: Package,
    },
    {
      name: 'Campaigns',
      href: '/creator/campaigns',
      icon: Layers,
      badge: (pendingOffersCount + activeOrdersCount) > 0 ? (pendingOffersCount + activeOrdersCount) : undefined,
    },
    {
      name: 'Messages',
      href: '/creator/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      name: 'Payouts',
      href: '/creator/payments',
      icon: CreditCard,
    },
    {
      name: 'Settings',
      href: '/creator/settings',
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
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF2D78] text-white text-xs font-bold uppercase tracking-wider">
            Creator Studio
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/creator/dashboard' && pathname.startsWith(item.href));
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
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F1EEF9] text-[#6444A6]'
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
            href="/creator/profile"
            className="flex items-center gap-2.5 min-w-0 flex-1 pr-1.5 cursor-pointer"
            title="View Profile"
          >
            <div className="relative shrink-0">
              <img
                src={creatorAvatar}
                alt={creatorName}
                className="w-9 h-9 rounded-full object-cover border border-[#E7E7E2]"
              />
              <VerifiedBadge className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="text-xs font-bold text-[#0A0A0A] group-hover:text-zinc-600 transition-colors truncate">
                {creatorName}
              </div>
              <div className="text-[11px] text-[#73736A] font-medium truncate">
                {creatorHandle.startsWith('@') ? creatorHandle : `@${creatorHandle}`}
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
