'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { switchRole } from '@/redux/slices/authSlice';
import { Button, Drawer, Dropdown, MenuProps, Tag } from 'antd';
import {
  Building2,
  Sparkles,
  Search,
  User as UserIcon,
  Menu as MenuIcon,
  X,
  Heart,
  Briefcase,
  ChevronDown,
  ShieldCheck,
  PlusCircle,
  Home,
  LogOut
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { savedPropertyIds } = useAppSelector((state) => state.property);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Top Influencers', href: '/agents' },
    { name: 'Market Insights', href: '/#insights' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const roleMenu: MenuProps['items'] = [
    {
      key: 'agent',
      label: (
        <div className="flex items-center gap-2 py-1">
          <Briefcase className="w-4 h-4 text-emerald-600" />
          <div>
            <div className="font-semibold text-slate-800">Agent / Influencer View</div>
            <div className="text-xs text-slate-500">Access CRM, Listings & Analytics</div>
          </div>
          {activeRole === 'agent' && <Tag color="success" className="ml-auto">Active</Tag>}
        </div>
      ),
      onClick: () => dispatch(switchRole('agent')),
    },
    {
      key: 'buyer',
      label: (
        <div className="flex items-center gap-2 py-1">
          <Home className="w-4 h-4 text-sky-600" />
          <div>
            <div className="font-semibold text-slate-800">Buyer / Investor View</div>
            <div className="text-xs text-slate-500">Saved homes, scheduled tours</div>
          </div>
          {activeRole === 'buyer' && <Tag color="processing" className="ml-auto">Active</Tag>}
        </div>
      ),
      onClick: () => dispatch(switchRole('buyer')),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-950 via-emerald-900 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-950 font-serif">LUXE PRIME</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">Estates</span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Influencer & Luxury Real Estate</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Instant Role Preview Switcher */}
            <Dropdown menu={{ items: roleMenu }} trigger={['click']} placement="bottomRight">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>
                  Demo Mode: <strong className="text-emerald-700 capitalize">{activeRole}</strong>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </Dropdown>

            {/* Saved Wishlist icon */}
            <Link
              href="/user/saved-properties"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {savedPropertyIds.length}
                </span>
              )}
            </Link>

            {/* Dashboard or Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={activeRole === 'agent' ? '/agent/dashboard' : '/user/dashboard'}
                >
                  <Button
                    type="default"
                    className="flex items-center gap-2 border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 font-semibold"
                  >
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                    <span>{activeRole === 'agent' ? 'Agent CRM Portal' : 'User Portal'}</span>
                  </Button>
                </Link>

                {activeRole === 'agent' && (
                  <Link href="/agent/listings/new">
                    <Button
                      type="primary"
                      className="flex items-center gap-1.5 font-semibold"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Post Listing</span>
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button type="default" className="font-semibold">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button type="primary" className="font-semibold">Join As Agent</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/user/saved-properties"
              className="relative p-2 text-slate-600"
            >
              <Heart className="w-5 h-5" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute 0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {savedPropertyIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Open Navigation Menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-slate-900 font-serif">LUXE PRIME</span>
          </div>
        }
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={300}
      >
        <div className="flex flex-col gap-6">
          {/* Role Switcher in Mobile */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Demo Perspective
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  dispatch(switchRole('agent'));
                  setIsDrawerOpen(false);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 ${
                  activeRole === 'agent'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Agent View
              </button>
              <button
                onClick={() => {
                  dispatch(switchRole('buyer'));
                  setIsDrawerOpen(false);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 ${
                  activeRole === 'buyer'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Buyer View
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
                className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                  pathname === link.href
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={activeRole === 'agent' ? '/agent/dashboard' : '/user/dashboard'}
              onClick={() => setIsDrawerOpen(false)}
            >
              <Button type="primary" block className="h-11 font-semibold">
                {activeRole === 'agent' ? 'Open Agent Dashboard' : 'Open User Portal'}
              </Button>
            </Link>
            {activeRole === 'agent' && (
              <Link href="/agent/listings/new" onClick={() => setIsDrawerOpen(false)}>
                <Button block className="h-11 font-semibold border-emerald-500 text-emerald-700">
                  + Add New Property Listing
                </Button>
              </Link>
            )}
            <Link href="/login" onClick={() => setIsDrawerOpen(false)}>
              <Button block className="h-11 font-semibold">
                Switch / Log In
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
