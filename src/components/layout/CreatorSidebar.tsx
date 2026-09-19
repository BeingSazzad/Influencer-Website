'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { switchRole } from '@/redux/slices/authSlice';
import {
  LayoutDashboard,
  Inbox,
  ShoppingBag,
  Package,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export function CreatorSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  // Incoming pending offers
  const pendingOffersCount = orders.filter(
    (o) => o.status === 'offer_sent' && (o.creatorId === 'creator-01' || o.creatorId === currentUser?.id)
  ).length;

  // Active production orders
  const activeOrdersCount = orders.filter(
    (o) => ['accepted', 'in_production', 'deliverable_submitted'].includes(o.status)
  ).length;

  const navItems = [
    {
      name: 'Overview & Earnings',
      href: '/creator/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Incoming Offers',
      href: '/creator/offers',
      icon: Inbox,
      badge: pendingOffersCount > 0 ? pendingOffersCount : undefined,
    },
    {
      name: 'Order Deliverables',
      href: '/creator/orders/order-01',
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    {
      name: 'Package Manager',
      href: '/creator/packages',
      icon: Package,
    },
    {
      name: 'Public Profile',
      href: '/creators/creator-01',
      icon: UserCheck,
      external: true,
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
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2B7FFF] text-white text-[10px] font-bold uppercase tracking-wider">
            Creator Workspace
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F1EEF9] text-[#6444A6]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.external && (
                  <ExternalLink className="w-3 h-3 text-[#A3A39C]" />
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
          onClick={() => dispatch(switchRole('brand'))}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F4F4F0] hover:bg-[#EAEAE3] text-[#151515] text-xs font-bold transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#151515]" />
            <span>Switch to Brand View</span>
          </div>
          <span className="text-[10px] text-[#73736A]">Demo</span>
        </button>

        {/* Creator User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              alt="Sophie Kim"
              className="w-9 h-9 rounded-full object-cover border border-[#E7E7E2]"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white text-[8px] font-black">
              ✓
            </div>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-bold text-[#151515] truncate">
              Sophie Kim
            </div>
            <div className="text-[10px] text-[#73736A] truncate">
              @sophiekim • 1.2M
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
