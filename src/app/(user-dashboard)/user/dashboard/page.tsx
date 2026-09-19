'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MetricCard } from '@/components/shared/MetricCard';
import { PropertyCard } from '@/components/shared/PropertyCard';
import {
  Heart,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Eye,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Button } from 'antd';

export default function UserDashboardOverviewPage() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { properties, savedPropertyIds } = useAppSelector((state) => state.property);
  const { leads } = useAppSelector((state) => state.lead);

  const savedProperties = properties.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div>
      <DashboardHeader
        title="Buyer & Investor Overview"
        subtitle={`Welcome back, ${currentUser?.name || 'Alexander Sterling'}`}
        actionButton={
          <Link href="/properties">
            <Button type="primary" className="font-semibold text-xs h-9">
              Browse Trophy Estates
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard
            title="Saved Trophy Estates"
            value={savedPropertyIds.length}
            change="+2 this week"
            isPositive={true}
            icon={Heart}
            color="emerald"
            subtitle="Properties in private wishlist"
          />
          <MetricCard
            title="Scheduled Private Tours"
            value="2 Active"
            change="Confirmed"
            isPositive={true}
            icon={Calendar}
            color="sky"
            subtitle="Bel Air & Tribeca viewings"
          />
          <MetricCard
            title="Broker Conversations"
            value="3 Open"
            change="Fast Response"
            isPositive={true}
            icon={MessageSquare}
            color="purple"
            subtitle="Direct with verified influencers"
          />
        </div>

        {/* Scheduled Tours Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming VIP Viewing</span>
            </div>
            <h3 className="text-xl font-bold font-serif">The Bellagio Crest Estate Walkthrough</h3>
            <p className="text-xs text-slate-400">
              Thursday, March 26 at 2:00 PM PST • Accompanied by Sophia Vance & Acquisition Counsel
            </p>
          </div>
          <Link href="/user/inquiries">
            <Button type="primary" className="font-bold">
              Manage Itinerary
            </Button>
          </Link>
        </div>

        {/* Saved Properties Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-serif">Saved Trophy Estates</h2>
              <p className="text-xs text-slate-500">Your curated collection of high-conviction luxury assets.</p>
            </div>
            <Link href="/user/saved-properties" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              <span>View All Saved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
