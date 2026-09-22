'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Dropdown, MenuProps, Drawer } from 'antd';
import {
  Menu as MenuIcon,
  Settings,
  ChevronDown,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  Briefcase,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { t } = useAppSelector((state) => state.lang);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: t?.nav?.forBrands || 'For Brands', href: '/creators' },
    { name: t?.nav?.forCreators || 'For Creators', href: '/how-it-works#creators' },
    { name: t?.nav?.howItWorks || 'How It Works', href: '/how-it-works' },
    { name: t?.nav?.pricing || 'Pricing', href: '/pricing' },
    { name: t?.nav?.faq || 'FAQ', href: '/faq' },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'header',
      label: (
        <div className="py-1 px-1 font-sans border-b border-[#E7E7E2] pb-2 min-w-[200px]">
          <div className="font-black text-[#0A0A0A] text-xs truncate">
            {currentUser?.companyName || currentUser?.name}
          </div>
          <div className="text-[11px] text-[#73736A] truncate">
            {currentUser?.email}
          </div>
          <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[10px] font-extrabold text-[#0A0A0A] uppercase tracking-wider">
            {activeRole === 'brand' ? 'Brand Account' : 'Creator Account'}
          </div>
        </div>
      ),
    },
    {
      key: 'dashboard',
      label: (
        <div className="flex items-center gap-2 py-1 font-sans text-xs font-bold text-[#0A0A0A]">
          <LayoutDashboard className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <span>{activeRole === 'brand' ? 'Brand Workspace' : 'Creator Workspace'}</span>
        </div>
      ),
      onClick: () => {
        router.push(activeRole === 'brand' ? '/brand/dashboard' : '/creator/dashboard');
      },
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center gap-2 py-1 font-sans text-xs font-bold text-[#0A0A0A]">
          <Settings className="w-3.5 h-3.5 text-[#73736A]" />
          <span>Profile & Settings</span>
        </div>
      ),
      onClick: () => {
        router.push(activeRole === 'brand' ? '/brand/settings' : '/creator/settings');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2 py-1 font-sans text-xs font-bold text-rose-600">
          <LogOut className="w-3.5 h-3.5 text-rose-600" />
          <span>Sign Out</span>
        </div>
      ),
      onClick: () => {
        dispatch(logout());
        router.push('/');
      },
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E7E7E2] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold font-sans transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-[#0A0A0A]'
                      : 'text-[#666660] hover:text-[#0A0A0A]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher - Only on Home Screen */}
            {pathname === '/' && <LanguageSwitcher />}

            {/* Auth State */}
            {currentUser ? (
              <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                <button className="flex items-center gap-2.5 py-1 px-2.5 rounded-full bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] hover:shadow-2xs transition-all cursor-pointer group">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#E7E7E2]"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#0A0A0A] truncate max-w-[120px]">
                      {currentUser.companyName || currentUser.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#73736A] group-hover:text-[#0A0A0A] transition-colors" />
                </button>
              </Dropdown>
            ) : (
              <div className="flex items-center font-sans">
                <Link href="/register">
                  <button className="h-10 px-5 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden items-center gap-2">
            {pathname === '/' && <LanguageSwitcher />}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-[#0A0A0A] hover:bg-[#EFEFEA] rounded-xl cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<Logo size="sm" />}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={310}
      >
        <div className="flex flex-col gap-6 font-sans">
          {currentUser ? (
            <div className="p-4 bg-[#F4F4F0] rounded-2xl border border-[#E7E7E2] space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-sm text-[#0A0A0A] truncate">{currentUser.name}</div>
                  <div className="text-xs text-[#73736A] capitalize">{activeRole} Account</div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href={activeRole === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full h-10 rounded-xl bg-[#0A0A0A] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={activeRole === 'brand' ? '/brand/settings' : '/creator/settings'}
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full h-9 rounded-xl bg-white border border-[#E7E7E2] text-[#0A0A0A] font-bold text-xs flex items-center justify-center gap-1.5 hover:border-[#0A0A0A]"
                >
                  <Settings className="w-3.5 h-3.5 text-[#73736A]" />
                  <span>Profile & Settings</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    dispatch(logout());
                    router.push('/login');
                  }}
                  className="w-full h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-100 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 space-y-2.5">
              <Link
                href="/register"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full h-11 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-sans font-bold text-sm flex items-center justify-center shadow-sm transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full h-10 rounded-full bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] font-sans font-bold text-sm flex items-center justify-center transition-all"
              >
                Log In
              </Link>
            </div>
          )}

          {/* Nav Links */}
          <div className="space-y-1 border-t border-[#E7E7E2] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-[#0A0A0A] hover:bg-[#F4F4F0]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
