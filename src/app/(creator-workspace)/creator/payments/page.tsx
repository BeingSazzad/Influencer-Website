'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { withdrawCreatorFunds } from '@/redux/slices/authSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import {
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Lock,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Modal, Input, Button, message, Tag } from 'antd';

interface PayoutRecord {
  id: string;
  date: string;
  brandName: string;
  campaignTitle: string;
  deliverableType: string;
  amountEur: number;
  status: 'paid_out' | 'available' | 'in_escrow';
  payoutMethod: string;
  referenceCode: string;
}

const INITIAL_PAYOUTS: PayoutRecord[] = [
  {
    id: 'PAY-78210',
    date: 'March 14, 2026',
    brandName: 'Aura Skincare Paris',
    campaignTitle: 'Spring Glow Morning Skincare Routine',
    deliverableType: '1x Instagram Reel + 3x Stories',
    amountEur: 1200,
    status: 'in_escrow',
    payoutMethod: 'Escrow Pending (Brand Review)',
    referenceCode: 'ESC-2026-0891',
  },
  {
    id: 'PAY-76504',
    date: 'March 08, 2026',
    brandName: 'Nord Minimal Studios',
    campaignTitle: 'Scandinavian Living Room Tour & Lookbook',
    deliverableType: 'Dedicated TikTok Video',
    amountEur: 850,
    status: 'available',
    payoutMethod: 'Ready for Withdrawal',
    referenceCode: 'ESC-2026-0740',
  },
  {
    id: 'PAY-74120',
    date: 'February 28, 2026',
    brandName: 'Vogue & Velour',
    campaignTitle: 'Paris Fashion Week Runway Recap',
    deliverableType: 'Instagram Carousel + Reel',
    amountEur: 1500,
    status: 'paid_out',
    payoutMethod: 'Deutsche Bank (•••• 0082)',
    referenceCode: 'TRF-2026-0612',
  },
  {
    id: 'PAY-71092',
    date: 'February 15, 2026',
    brandName: 'Glow Botanical Labs',
    campaignTitle: 'Clean Beauty Ingredient Deep Dive UGC',
    deliverableType: 'Raw 4K Video Ad Creative',
    amountEur: 950,
    status: 'paid_out',
    payoutMethod: 'Deutsche Bank (•••• 0082)',
    referenceCode: 'TRF-2026-0498',
  },
  {
    id: 'PAY-68421',
    date: 'January 30, 2026',
    brandName: 'Maison Luxe Paris',
    campaignTitle: 'Winter Velvet Perfume Launch',
    deliverableType: 'Cinematic Story Series',
    amountEur: 1100,
    status: 'paid_out',
    payoutMethod: 'PayPal (sophie@sophiekim.com)',
    referenceCode: 'TRF-2026-0310',
  },
];

export default function CreatorPaymentsPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  const [payouts, setPayouts] = useState<PayoutRecord[]>(INITIAL_PAYOUTS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Withdrawal Modal State
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isPayoutMethodModalOpen, setIsPayoutMethodModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [selectedDestination, setSelectedDestination] = useState<'bank' | 'paypal'>('bank');
  const [isProcessing, setIsProcessing] = useState(false);

  // Remittance Modal State
  const [selectedRemittance, setSelectedRemittance] = useState<PayoutRecord | null>(null);

  const balanceEur = currentUser?.balanceEur ?? 3200;

  // In escrow calculated from current pending orders
  const inEscrowEur = orders
    .filter((o) => (o.creatorId === 'creator-01' || o.creatorId === currentUser?.id) && o.status !== 'completed' && o.status !== 'declined')
    .reduce((acc, o) => acc + (o.basePriceEur || 0), 0) || 1800;

  const filteredPayouts = payouts.filter((p) => {
    if (activeFilter === 'available' && p.status !== 'available') return false;
    if (activeFilter === 'in_escrow' && p.status !== 'in_escrow') return false;
    if (activeFilter === 'paid_out' && p.status !== 'paid_out') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.campaignTitle.toLowerCase().includes(q) ||
        p.referenceCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleWithdrawConfirm = () => {
    if (withdrawAmount <= 0) {
      message.error('Please enter a valid withdrawal amount');
      return;
    }
    if (withdrawAmount > balanceEur) {
      message.error(`Insufficient balance. You have €${balanceEur.toLocaleString()} available.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      dispatch(withdrawCreatorFunds(withdrawAmount));
      const newPayout: PayoutRecord = {
        id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        brandName: 'Influverse Creator Wallet',
        campaignTitle: `Payout to ${selectedDestination === 'bank' ? 'Deutsche Bank (•••• 0082)' : 'PayPal (sophie@sophiekim.com)'}`,
        deliverableType: 'Instant SEPA Bank Transfer',
        amountEur: withdrawAmount,
        status: 'paid_out',
        payoutMethod: selectedDestination === 'bank' ? 'Deutsche Bank (•••• 0082)' : 'PayPal',
        referenceCode: `TRF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      setPayouts([newPayout, ...payouts]);
      setIsProcessing(false);
      setIsWithdrawModalOpen(false);
      message.success(`Successfully transferred €${withdrawAmount.toLocaleString()} to your bank account!`);
    }, 900);
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      <WorkspaceHeader
        title="Earnings & Payouts"
        subtitle="Track collaboration earnings, monitor pending escrow disbursements, and withdraw funds to your bank."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Zero Deduction Fee Highlight */}
        <div className="bg-[#0A0A0A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#FF2D78]">
                <Sparkles className="w-4 h-4 text-[#FF2D78]" />
                <span>Zero Creator Fee • 100% Payout Guaranteed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
                You keep 100% of your listed rate card prices.
              </h2>
              <p className="text-sm text-[#A3A39C] leading-relaxed">
                Influverse charges a 15% platform protection fee directly to brands upon order funding. We never deduct commissions or payout fees from creator earnings. Your stated price is the exact amount deposited into your account.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="h-11 px-6 rounded-full bg-[#FF2D78] hover:bg-[#ff1669] text-white text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw Funds</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Key Earnings Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Metric 1: Available for Withdrawal */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Available for Payout
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{balanceEur.toLocaleString()}
            </div>
            <div className="text-xs text-[#23744D] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instant SEPA transfer available</span>
            </div>
          </div>

          {/* Metric 2: Pending in Escrow */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Pending in Escrow
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{inEscrowEur.toLocaleString()}
            </div>
            <div className="text-xs text-[#73736A] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF2D78]" />
              <span>Releases automatically upon delivery approval</span>
            </div>
          </div>

          {/* Metric 3: Lifetime Net Earnings */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Lifetime Earnings
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €28,400
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              Across 24 verified collaborations
            </div>
          </div>

          {/* Metric 4: Automatic Weekly Payout Schedule */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Scheduled Payout
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              Every Friday
            </div>
            <div className="text-xs text-[#73736A] font-medium">
              Direct to Deutsche Bank AG
            </div>
          </div>
        </div>

        {/* Connected Bank Accounts & Tax Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card: Primary Payout Account */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#0A0A0A]">Primary Payout Method</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                Verified
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center gap-4">
              <div className="w-12 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-black text-xs">
                IBAN
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-[#0A0A0A]">Deutsche Bank AG</div>
                <div className="text-xs text-[#73736A] font-mono">DE89 3704 •••• •••• 0082</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#73736A]">Free SEPA Transfer • 1-2 Days</span>
              <button
                onClick={() => setIsPayoutMethodModalOpen(true)}
                className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Card: Secondary Account & Tax ID */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#0A0A0A]">Payout Preferences & Tax Details</h3>
              <button
                onClick={() => setIsPayoutMethodModalOpen(true)}
                className="text-xs font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1 cursor-pointer"
              >
                Add Method <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">Secondary Payout</span>
                <span className="font-bold text-[#0A0A0A] block truncate">PayPal (sophie@sophiekim.com)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">Creator Tax Residence</span>
                <span className="font-bold text-[#0A0A0A] block">Berlin, Germany (DE)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">Payout Currency</span>
                <span className="font-bold text-[#0A0A0A] block">Euro (EUR €)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payout & Collaboration Invoices History */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-[#0A0A0A] tracking-tight">
                Earnings & Disbursements Ledger
              </h3>
              <p className="text-xs text-[#73736A] mt-1">
                Detailed record of all campaign payouts, funds held in escrow, and bank transfers.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Payouts' },
                { id: 'available', label: 'Available' },
                { id: 'in_escrow', label: 'In Escrow' },
                { id: 'paid_out', label: 'Transferred' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0A0A0A] text-white shadow-xs'
                      : 'bg-[#F4F4F0] text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by brand, campaign, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none focus:border-[#0A0A0A]"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E7E7E2] text-[#73736A] font-extrabold uppercase tracking-wider">
                  <th className="pb-3 px-4">Payout ID / Date</th>
                  <th className="pb-3 px-4">Brand & Campaign</th>
                  <th className="pb-3 px-4">Deliverables</th>
                  <th className="pb-3 px-4">Destination</th>
                  <th className="pb-3 px-4 text-right">Net Payout (€)</th>
                  <th className="pb-3 px-4 text-center">Status</th>
                  <th className="pb-3 px-4 text-right">Statement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F0]">
                {filteredPayouts.map((payout) => {
                  const isPaidOut = payout.status === 'paid_out';
                  const isAvailable = payout.status === 'available';
                  const isEscrow = payout.status === 'in_escrow';

                  return (
                    <tr key={payout.id} className="hover:bg-[#FAFAF8] transition-colors">
                      {/* ID & Date */}
                      <td className="py-4 px-4 font-mono font-bold text-[#0A0A0A]">
                        <div>{payout.id}</div>
                        <div className="text-[11px] font-sans text-[#73736A] font-normal">{payout.date}</div>
                      </td>

                      {/* Brand & Campaign */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#0A0A0A]">{payout.brandName}</div>
                        <div className="text-[11px] text-[#73736A] truncate max-w-xs">{payout.campaignTitle}</div>
                      </td>

                      {/* Deliverables */}
                      <td className="py-4 px-4 text-[#73736A] font-medium max-w-xs truncate">
                        {payout.deliverableType}
                      </td>

                      {/* Destination */}
                      <td className="py-4 px-4 text-[#73736A] font-medium">
                        {payout.payoutMethod}
                      </td>

                      {/* Net Earnings */}
                      <td className="py-4 px-4 text-right font-black text-sm text-[#0A0A0A]">
                        <span className="text-[#23744D]">+€{payout.amountEur.toLocaleString()}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        {isPaidOut ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-[10px] uppercase">
                            Transferred
                          </span>
                        ) : isAvailable ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-white font-bold text-[10px] uppercase">
                            Available
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F5] text-[#FF2D78] font-bold text-[10px] uppercase">
                            Held in Escrow
                          </span>
                        )}
                      </td>

                      {/* Statement Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedRemittance(payout)}
                          className="p-1.5 rounded-lg border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white text-[#73736A] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                          title="View Remittance Advice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Funds Modal */}
      <Modal
        title={
          <div className="font-sans font-black text-lg text-[#0A0A0A] flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[#FF2D78]" />
            <span>Withdraw Creator Earnings</span>
          </div>
        }
        open={isWithdrawModalOpen}
        onCancel={() => setIsWithdrawModalOpen(false)}
        footer={null}
        centered
        width={480}
      >
        <div className="space-y-5 font-sans pt-3">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#73736A] font-semibold block">Available to Cash Out</span>
              <div className="text-2xl font-black text-[#0A0A0A]">€{balanceEur.toLocaleString()}</div>
            </div>
            <button
              type="button"
              onClick={() => setWithdrawAmount(balanceEur)}
              className="text-xs font-bold text-[#FF2D78] hover:underline cursor-pointer"
            >
              Withdraw All (€{balanceEur.toLocaleString()})
            </button>
          </div>

          {/* Quick Percentages */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A0A0A]">Select Payout Amount</label>
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2000, balanceEur].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setWithdrawAmount(preset)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    withdrawAmount === preset
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs'
                      : 'border-[#E7E7E2] bg-white text-[#0A0A0A] hover:bg-[#FAFAF8]'
                  }`}
                >
                  €{preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0A0A0A]">Custom Amount (EUR €)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#73736A]">€</span>
              <input
                type="number"
                min={50}
                max={balanceEur}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
              />
            </div>
          </div>

          {/* Payout Destination Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A0A0A]">Payout Account</label>
            <div className="space-y-2">
              {[
                { id: 'bank', name: 'Deutsche Bank AG (DE89 •••• 0082)', desc: 'SEPA Instant Transfer • 0% Fee', icon: Building2 },
                { id: 'paypal', name: 'PayPal (sophie@sophiekim.com)', desc: 'Direct Wallet Transfer • 0% Fee', icon: Wallet },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedDestination(m.id as any)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedDestination === m.id
                      ? 'border-[#0A0A0A] bg-[#FAFAF8]'
                      : 'border-[#E7E7E2] hover:border-[#D2D2CA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <m.icon className="w-4 h-4 text-[#0A0A0A]" />
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0A]">{m.name}</div>
                      <div className="text-[11px] text-[#73736A]">{m.desc}</div>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedDestination === m.id ? 'border-[#0A0A0A] bg-[#0A0A0A]' : 'border-[#D2D2CA]'
                    }`}
                  >
                    {selectedDestination === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="primary"
              loading={isProcessing}
              onClick={handleWithdrawConfirm}
              className="w-full h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white border-none cursor-pointer shadow-xs"
            >
              Transfer €{withdrawAmount.toLocaleString()} to Account
            </Button>
          </div>
        </div>
      </Modal>

      {/* Remittance Advice Modal */}
      <Modal
        title={null}
        open={!!selectedRemittance}
        onCancel={() => setSelectedRemittance(null)}
        footer={null}
        centered
        width={500}
      >
        {selectedRemittance && (
          <div className="space-y-6 font-sans pt-2">
            <div className="border-b border-[#E7E7E2] pb-4 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#73736A]">
                  CREATOR REMITTANCE STATEMENT
                </span>
                <h3 className="text-xl font-black text-[#0A0A0A] tracking-tight mt-0.5">
                  {selectedRemittance.referenceCode}
                </h3>
                <div className="text-xs text-[#73736A]">Settled on {selectedRemittance.date}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs">
                {selectedRemittance.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#73736A] font-semibold block mb-1">Beneficiary Creator</span>
                <strong className="text-[#0A0A0A] block">{currentUser?.name || 'Sophie Kim'}</strong>
                <span className="text-[#73736A] block">{currentUser?.handle || '@sophiekim'}</span>
                <span className="text-[#73736A] block">Berlin, Germany</span>
              </div>
              <div>
                <span className="text-[#73736A] font-semibold block mb-1">Campaign Sponsor</span>
                <strong className="text-[#0A0A0A] block">{selectedRemittance.brandName}</strong>
                <span className="text-[#73736A] block">100% Escrow Verified</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5 text-xs">
              <div className="flex justify-between font-bold text-[#0A0A0A]">
                <span>{selectedRemittance.campaignTitle}</span>
                <span>€{selectedRemittance.amountEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#73736A]">
                <span>Deliverables: {selectedRemittance.deliverableType}</span>
              </div>
              <div className="border-t border-[#E7E7E2] pt-2 flex justify-between font-black text-sm text-[#0A0A0A]">
                <span>Net Creator Payout (0% fee deducted)</span>
                <span className="text-[#23744D]">€{selectedRemittance.amountEur.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                message.success(`Downloading Remittance Statement ${selectedRemittance.referenceCode}`);
                setSelectedRemittance(null);
              }}
              className="w-full h-11 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Statement</span>
            </button>
          </div>
        )}
      </Modal>

      {/* Add / Manage Payout Methods Modal */}
      <Modal
        title={
          <div className="font-sans font-black text-lg text-[#0A0A0A]">
            Manage Payout Accounts
          </div>
        }
        open={isPayoutMethodModalOpen}
        onCancel={() => setIsPayoutMethodModalOpen(false)}
        footer={null}
        centered
        width={480}
      >
        <div className="space-y-4 font-sans pt-2">
          <p className="text-xs text-[#73736A]">
            Connect your European IBAN or global PayPal account to receive campaign earnings directly.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-[#0A0A0A] bg-[#FAFAF8] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#0A0A0A]">Deutsche Bank AG (Primary)</div>
                <div className="text-xs text-[#73736A] font-mono mt-0.5">IBAN: DE89 3704 0044 •••• •••• 0082</div>
              </div>
              <span className="text-[11px] font-bold text-[#23744D] bg-[#EEF7F2] px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-[#E7E7E2] bg-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#0A0A0A]">PayPal Account</div>
                <div className="text-xs text-[#73736A] mt-0.5">sophie@sophiekim.com</div>
              </div>
              <span className="text-[11px] font-bold text-[#73736A] bg-[#F4F4F0] px-2 py-0.5 rounded-full">
                Secondary
              </span>
            </div>
          </div>

          <Button
            type="dashed"
            onClick={() => {
              message.info('Connect New IBAN account integration window opened.');
              setIsPayoutMethodModalOpen(false);
            }}
            className="w-full h-11 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" /> Connect Another Bank Account (IBAN)
          </Button>
        </div>
      </Modal>
    </div>
  );
}
