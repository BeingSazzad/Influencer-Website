'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Send, CheckCircle2, Instagram, Youtube, Linkedin, Globe, Phone, MapPin } from 'lucide-react';
import { Input, Button, message } from 'antd';

export function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    message.success('Welcome to the Private VIP Real Estate Investor Dispatch!');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Building2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif">LUXE PRIME</span>
                <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Global Influencer Realty</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting high-net-worth buyers and investors with trophy estates, luxury penthouses, and waterfront sanctuaries through world-class media production and verified real estate influencers.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-rose-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Discover</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?type=villa" className="hover:text-emerald-400 transition-colors">
                  Modern Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-emerald-400 transition-colors">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=mansion" className="hover:text-emerald-400 transition-colors">
                  Waterfront Compounds
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-emerald-400 transition-colors">
                  Featured Influencer Agents
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="hover:text-emerald-400 transition-colors">
                  Market Trend Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Portals & Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/agent/dashboard" className="hover:text-emerald-400 transition-colors">
                  Agent CRM Dashboard
                </Link>
              </li>
              <li>
                <Link href="/user/dashboard" className="hover:text-emerald-400 transition-colors">
                  Buyer Wishlist Portal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Network
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Global Advisory Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* VIP Dispatch Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">VIP Dispatch</h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive confidential off-market listings and architectural video drops weekly.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscription confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="investor@domain.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 rounded-lg"
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-10"
                >
                  Join Private Dispatch
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LUXE PRIME Global Real Estate & Media Network. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
