'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { OrderStatus } from '@/types';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { Button, Tag } from 'antd';

export default function BrandOrdersPage() {
  const { orders } = useAppSelector((state) => state.order);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'review' | 'completed'>('all');

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'active') return ['offer_sent', 'accepted', 'in_production'].includes(o.status);
    if (activeFilter === 'review') return o.status === 'deliverable_submitted';
    if (activeFilter === 'completed') return o.status === 'completed' || o.status === 'approved';
    return true;
  });

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title="Campaign Orders & Hires"
        subtitle="Manage active production, review submitted assets, and release escrow payments."
        action={
          <Link href="/brand/hire/new">
            <Button
              type="primary"
              className="h-9 px-4 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Hire</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-[#E7E7E2] max-w-md">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'In Progress' },
            { key: 'review', label: 'Needs Review' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.key
                  ? 'bg-[#151515] text-white shadow-2xs'
                  : 'text-[#73736A] hover:text-[#151515]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusColors: Record<string, string> = {
                offer_sent: 'bg-[#FAF6E8] text-[#8C6819]',
                accepted: 'bg-[#EBF3FE] text-[#2B7FFF]',
                in_production: 'bg-[#F1EEF9] text-[#6444A6]',
                deliverable_submitted: 'bg-[#EEF7F2] text-[#23744D] font-extrabold',
                approved: 'bg-[#EEF7F2] text-[#23744D]',
                completed: 'bg-[#F4F4F0] text-[#151515]',
              };

              const statusLabels: Record<string, string> = {
                offer_sent: 'Offer Sent • Pending',
                accepted: 'Accepted • Production Started',
                in_production: 'In Production',
                deliverable_submitted: 'Deliverable Submitted • Review Ready',
                approved: 'Approved • Escrow Released',
                completed: 'Completed',
              };

              return (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#151515] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={order.creatorAvatar}
                      alt={order.creatorName}
                      className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm text-[#151515]">
                          {order.creatorName}
                        </h3>
                        <span className="text-[11px] text-[#73736A]">{order.creatorHandle}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAEAE3] text-[#151515]">
                          {order.platform}
                        </span>
                      </div>
                      <p className="text-xs text-[#555550]">
                        {order.packageTitle} • &ldquo;{order.brief.slice(0, 75)}...&rdquo;
                      </p>
                      <div className="text-[11px] text-[#73736A] flex items-center gap-3">
                        <span>Funded: <strong>€{order.totalEur}</strong></span>
                        <span>•</span>
                        <span>Due: {order.deadlineDate}</span>
                        <span>•</span>
                        <span>{order.deliverables.length} Deliverable(s)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        statusColors[order.status] || 'bg-[#F4F4F0] text-[#151515]'
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>

                    <Link href={`/brand/orders/${order.id}`}>
                      <Button
                        type="primary"
                        className="h-10 px-5 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none flex items-center gap-1.5"
                      >
                        <span>Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="font-bold text-sm text-[#151515]">No orders found for this view</p>
              <Link href="/creators">
                <Button className="rounded-full font-bold text-xs">
                  Discover Creators to Hire
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
