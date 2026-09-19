'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { switchRole } from '@/redux/slices/authSlice';
import { Logo } from '@/components/shared/Logo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Button, Drawer, Dropdown, MenuProps, Tag } from 'antd';
import {
  Menu as MenuIcon,
  X,
  Bookmark,
  Briefcase,
  Sparkles,
  ChevronDown,
  User as UserIcon,
  ShoppingBag,
  Send,
  Layers,
  ArrowRight,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { savedCreatorIds } = useAppSelector((state) => state.creator);
  const { t } = useAppSelector((state) => state.lang);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: t?.nav?.forBrands || 'For Brands', href: '/creators' },
    { name: t?.nav?.forCreators || 'For Creators', href: '/how-it-works#creators' },
    { name: t?.nav?.howItWorks || 'How It Works', href: '/how-it-works' },
    { name: t?.nav?.pricing || 'Pricing', href: '/pricing' },
    { name: t?.nav?.faq || 'FAQ', href: '/faq' },
  ];

  const roleMenu: MenuProps['items'] = [
    {
      key: 'brand',
      label: (
        <div className="flex items-center gap-2.5 py-1 px-1">
          <div className="w-8 h-8 rounded-lg bg-[#151515] text-white flex items-center justify-center font-bold text-xs">
            B
          </div>
          <div>
            <div className="font-bold text-[#151515] text-xs">Brand Workspace</div>
            <div className="text-[11px] text-[#73736A]">Discover & hire creators</div>
          </div>
          {activeRole === 'brand' && (
            <Tag color="#151515" className="ml-auto font-medium text-[10px]">
              Active
            </Tag>
          )}
        </div>
      ),
      onClick: () => dispatch(switchRole('brand')),
    },
    {
      key: 'creator',
      label: (
        <div className="flex items-center gap-2.5 py-1 px-1">
          <div className="w-8 h-8 rounded-lg bg-[#2B7FFF] text-white flex items-center justify-center font-bold text-xs">
            C
          </div>
          <div>
            <div className="font-bold text-[#151515] text-xs">Creator Workspace</div>
            <div className="text-[11px] text-[#73736A]">Accept offers & fulfill orders</div>
          </div>
          {activeRole === 'creator' && (
            <Tag color="#2B7FFF" className="ml-auto font-medium text-[10px]">
              Active
            </Tag>
          )}
        </div>
      ),
      onClick: () => dispatch(switchRole('creator')),
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
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-[#151515]'
                      : 'text-[#666660] hover:text-[#151515]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Saved Shortlist Link */}
            <Link
              href="/brand/saved"
              className="relative p-2.5 text-[#555550] hover:text-[#151515] hover:bg-[#F1F1EC] rounded-full transition-colors"
              title="Saved Creators"
            >
              <Bookmark className="w-4 h-4" />
              {savedCreatorIds.length > 0 && (
                <span className="absolute 1 top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#151515] text-[10px] font-bold text-white">
                  {savedCreatorIds.length}
                </span>
              )}
            </Link>

            {/* Role Demo Switcher Dropdown */}
            <Dropdown menu={{ items: roleMenu }} trigger={['click']} placement="bottomRight">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#F0F0EB] hover:bg-[#E5E5DE] text-[#151515] border border-[#E0E0D8] transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-[#2B7FFF]" />
                <span>
                  Demo Role: <strong className="capitalize">{activeRole}</strong>
                </span>
                <ChevronDown className="w-3 h-3 text-[#73736A]" />
              </button>
            </Dropdown>

            {/* Workspace / Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={activeRole === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                >
                  <Button
                    type="default"
                    className="flex items-center gap-2 border-[#D2D2CA] text-[#151515] hover:border-[#151515] font-bold h-9 px-4 rounded-full bg-white text-xs"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{activeRole === 'brand' ? 'Brand Portal' : 'Creator Portal'}</span>
                  </Button>
                </Link>

                <Link
                  href={activeRole === 'brand' ? '/creators' : '/creator/offers'}
                >
                  <Button
                    type="primary"
                    className="flex items-center gap-1.5 font-bold h-9 px-4 rounded-full bg-[#151515] hover:!bg-[#2B7FFF] text-white text-xs border-none shadow-none"
                  >
                    {activeRole === 'brand' ? (
                      <>
                        <span>Find Creators</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>View Offers</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-[#151515] hover:underline px-2"
                >
                  Log in
                </Link>
                <Link href="/register">
                  <Button
                    type="primary"
                    className="h-10 px-5 rounded-full bg-[#151515] hover:!bg-[#2B7FFF] text-white font-bold text-sm border-none shadow-none"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/brand/saved"
              className="relative p-2 text-[#151515]"
            >
              <Bookmark className="w-5 h-5" />
              {savedCreatorIds.length > 0 && (
                <span className="absolute 0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#151515] text-[10px] font-bold text-white">
                  {savedCreatorIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-[#151515] hover:bg-[#EFEFEA] rounded-lg"
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
        <div className="flex flex-col gap-6">
          {/* Role Switcher */}
          <div className="p-3 bg-[#F4F4F0] rounded-xl border border-[#E7E7E2]">
            <div className="text-[11px] font-bold text-[#73736A] uppercase tracking-wider mb-2">
              Select Demo Perspective
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  dispatch(switchRole('brand'));
                  setIsDrawerOpen(false);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 ${
                  activeRole === 'brand'
                    ? 'bg-[#151515] text-white border-[#151515]'
                    : 'bg-white text-[#151515] border-[#E7E7E2]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Brand
              </button>
              <button
                onClick={() => {
                  dispatch(switchRole('creator'));
                  setIsDrawerOpen(false);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 ${
                  activeRole === 'creator'
                    ? 'bg-[#2B7FFF] text-white border-[#2B7FFF]'
                    : 'bg-white text-[#151515] border-[#E7E7E2]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Creator
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`px-3 py-2.5 text-sm font-semibold rounded-lg ${
                  pathname === link.href
                    ? 'bg-[#EAEAE3] text-[#151515] font-bold'
                    : 'text-[#555550] hover:bg-[#F4F4F0]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E7E2] flex flex-col gap-2.5">
            <Link
              href={activeRole === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
              onClick={() => setIsDrawerOpen(false)}
            >
              <Button
                type="primary"
                block
                className="h-11 font-bold bg-[#151515] text-white rounded-full"
              >
                {activeRole === 'brand' ? 'Open Brand Workspace' : 'Open Creator Workspace'}
              </Button>
            </Link>

            <Link href="/creators" onClick={() => setIsDrawerOpen(false)}>
              <Button block className="h-11 font-semibold rounded-full border-[#D2D2CA]">
                Browse All Creators
              </Button>
            </Link>

            <Link href="/login" onClick={() => setIsDrawerOpen(false)}>
              <Button block className="h-11 font-medium rounded-full text-[#666660]">
                Switch / Log In
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
