'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { depositBrandFunds } from '@/redux/slices/authSlice';
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
} from 'lucide-react';
import { Modal, Input, Button, message, Tag } from 'antd';
import { BrandAnnualAnalytics } from '@/components/shared/BrandAnnualAnalytics';

interface Transaction {
  id: string;
  date: string;
  creatorName: string;
  campaignTitle: string;
  type: 'escrow_deposit' | 'escrow_release' | 'top_up' | 'platform_fee';
  amountEur: number;
  status: 'in_escrow' | 'completed' | 'processing';
  method: string;
  invoiceNumber: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-90412',
    date: 'March 14, 2026',
    creatorName: 'Sophie Kim',
    campaignTitle: 'Spring Glow Morning Skincare Routine',
    type: 'escrow_deposit',
    amountEur: 1380,
    status: 'in_escrow',
    method: 'Escrow Wallet',
    invoiceNumber: 'INV-2026-0891',
  },
  {
    id: 'TXN-90413',
    date: 'March 14, 2026',
    creatorName: 'Influverse Escrow',
    campaignTitle: '15% Platform Protection & Escrow Fee',
    type: 'platform_fee',
    amountEur: 180,
    status: 'completed',
    method: 'Escrow Wallet',
    invoiceNumber: 'INV-2026-0892',
  },
  {
    id: 'TXN-88914',
    date: 'March 10, 2026',
    creatorName: 'Liam Carter',
    campaignTitle: 'Dolomites Sunrise SPF 50 Cinematic Reel',
    type: 'escrow_release',
    amountEur: 1610,
    status: 'completed',
    method: 'Escrow Released',
    invoiceNumber: 'INV-2026-0744',
  },
  {
    id: 'TXN-87201',
    date: 'March 01, 2026',
    creatorName: 'Aura Skincare Paris',
    campaignTitle: 'Corporate Wallet Top-Up (SEPA Instant)',
    type: 'top_up',
    amountEur: 5000,
    status: 'completed',
    method: 'SEPA Transfer',
    invoiceNumber: 'TOP-2026-0312',
  },
  {
    id: 'TXN-84510',
    date: 'February 24, 2026',
    creatorName: 'Camille Dubois',
    campaignTitle: 'French Riviera Luxury Hydration Story Series',
    type: 'escrow_release',
    amountEur: 920,
    status: 'completed',
    method: 'Escrow Released',
    invoiceNumber: 'INV-2026-0610',
  },
  {
    id: 'TXN-82109',
    date: 'February 15, 2026',
    creatorName: 'Elena Rostova',
    campaignTitle: 'Corporate Wallet Deposit (Mastercard Corporate)',
    type: 'top_up',
    amountEur: 4500,
    status: 'completed',
    method: 'Mastercard •••• 8841',
    invoiceNumber: 'TOP-2026-0205',
  },
];

export default function BrandPaymentsPage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top-Up Modal State
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sepa' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Invoice Receipt Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<Transaction | null>(null);

  const balanceEur = currentUser?.balanceEur ?? 8450;

  // Active in escrow calculated from active orders
  const activeEscrowEur = orders
    .filter((o) => o.status !== 'completed' && o.status !== 'declined')
    .reduce((acc, o) => acc + (o.totalEur || 0), 0) || 2990;

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === 'escrow' && t.type !== 'escrow_deposit') return false;
    if (activeFilter === 'releases' && t.type !== 'escrow_release') return false;
    if (activeFilter === 'top_up' && t.type !== 'top_up') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.creatorName.toLowerCase().includes(q) ||
        t.campaignTitle.toLowerCase().includes(q) ||
        t.invoiceNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleTopUpConfirm = () => {
    if (topUpAmount <= 0) {
      message.error('Please enter a valid deposit amount in EUR');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      dispatch(depositBrandFunds(topUpAmount));
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        creatorName: currentUser?.companyName || 'Corporate Wallet',
        campaignTitle: `Wallet Deposit via ${selectedMethod === 'card' ? 'Corporate Card' : selectedMethod === 'sepa' ? 'SEPA Instant' : 'Apple Pay'}`,
        type: 'top_up',
        amountEur: topUpAmount,
        status: 'completed',
        method: selectedMethod === 'card' ? 'Visa •••• 4242' : selectedMethod === 'sepa' ? 'SEPA Transfer' : 'Apple Pay',
        invoiceNumber: `TOP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      setTransactions([newTxn, ...transactions]);
      setIsProcessing(false);
      setIsTopUpModalOpen(false);
      message.success(`Successfully deposited €${topUpAmount.toLocaleString()} to your Brand Wallet!`);
    }, 900);
  };

  const handleExportCsv = () => {
    const headers = ['Transaction ID', 'Date', 'Entity / Creator', 'Campaign Details', 'Type', 'Amount (EUR)', 'Status', 'Invoice Number'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.date}"`,
      `"${t.creatorName}"`,
      `"${t.campaignTitle.replace(/"/g, '""')}"`,
      t.type,
      t.amountEur,
      t.status,
      t.invoiceNumber,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `influverse_brand_payments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Ledger exported to CSV successfully!');
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      <WorkspaceHeader
        title="Payments & Escrow Wallet"
        subtitle="Manage available funds, monitor escrow protection on active creator orders, and retrieve tax invoices."
        action={
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCsv}
              className="h-10 px-4 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white font-bold text-sm text-[#0A0A0A] flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:bg-[#FAFAF8]"
            >
              <Download className="w-3.5 h-3.5 text-[#0A0A0A]" />
              <span>Export CSV</span>
            </button>
            <Button
              type="primary"
              onClick={() => setIsTopUpModalOpen(true)}
              className="h-10 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:!bg-zinc-800 !text-white border-none flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Deposit Funds</span>
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Available Wallet */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Available Wallet
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
              <span>Ready for immediate campaigns</span>
            </div>
          </div>

          {/* Card 2: Active in Escrow */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Locked in Escrow
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{activeEscrowEur.toLocaleString()}
            </div>
            <div className="text-sm text-[#73736A] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF2D78]" />
              <span>Held across active creator orders</span>
            </div>
          </div>

          {/* Card 3: Total Collaborations Paid */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Disbursed to Talent
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €14,250
            </div>
            <div className="text-sm text-[#73736A] font-medium">
              Across 8 completed campaigns
            </div>
          </div>

          {/* Card 4: Platform Fee Standard */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#73736A] uppercase tracking-wider">
                Platform Escrow Fee
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              15.0%
            </div>
            <div className="text-sm text-[#73736A] font-medium">
              Tax-compliant EU VAT invoices
            </div>
          </div>
        </div>

        {/* 12-Month Campaign Spend & Creator Hires Analytics */}
        <BrandAnnualAnalytics />

        {/* Payment Methods & Billing Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card: Payment Method on File */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#0A0A0A]">Primary Payment Method</h3>
              <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                Active
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center gap-4">
              <div className="w-12 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-black text-xs">
                VISA
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-[#0A0A0A]">Corporate Visa •••• 4242</div>
                <div className="text-sm text-[#73736A]">Expires 12/28 • Default Billing</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#73736A]">Secondary: SEPA Direct Debit</span>
              <button
                onClick={() => setIsTopUpModalOpen(true)}
                className="font-bold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors cursor-pointer"
              >
                Change Method
              </button>
            </div>
          </div>

          {/* Card: Billing Entity */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#0A0A0A]">Tax & Invoicing Details</h3>
              <Link
                href="/brand/settings"
                className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF2D78] flex items-center gap-1"
              >
                Edit Details <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">Legal Entity</span>
                <span className="font-bold text-[#0A0A0A] block">{currentUser?.companyName || 'Aura Skincare Paris S.A.S.'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">EU VAT ID</span>
                <span className="font-bold text-[#0A0A0A] block">FR 89 342 981 002</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                <span className="text-[#73736A] font-semibold block">Billing Address</span>
                <span className="font-bold text-[#0A0A0A] block">75008 Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History & Escrow Ledger */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Transaction & Escrow Ledger
              </h3>
              <p className="text-sm text-[#73736A] mt-1">
                Complete record of wallet deposits, escrow locks, release payouts, and platform fee invoices.
              </p>
            </div>

            {/* Omni Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Activity' },
                { id: 'escrow', label: 'In Escrow' },
                { id: 'releases', label: 'Released' },
                { id: 'top_up', label: 'Deposits' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
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
              placeholder="Search by ID, creator, or invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-sm font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none focus:border-[#0A0A0A] placeholder:text-[#A3A39C] transition-all"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E7E7E2] text-[#73736A] font-bold uppercase tracking-wider text-xs">
                  <th className="pb-3.5 px-4">Transaction / Date</th>
                  <th className="pb-3.5 px-4">Campaign &amp; Recipient</th>
                  <th className="pb-3.5 px-4">Type</th>
                  <th className="pb-3.5 px-4">Method</th>
                  <th className="pb-3.5 px-4 text-right">Amount (€)</th>
                  <th className="pb-3.5 px-4 text-center">Status</th>
                  <th className="pb-3.5 px-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F0]">
                {filteredTransactions.map((txn) => {
                  const isTopUp = txn.type === 'top_up';
                  const isEscrow = txn.type === 'escrow_deposit';
                  const isRelease = txn.type === 'escrow_release';

                  return (
                    <tr key={txn.id} className="hover:bg-[#FAFAF8] transition-colors">
                      {/* ID & Date */}
                      <td className="py-4 px-4 font-sans">
                        <div className="font-bold text-sm text-[#0A0A0A]">{txn.id}</div>
                        <div className="text-sm text-[#73736A] font-normal mt-0.5">{txn.date}</div>
                      </td>

                      {/* Campaign & Creator */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-[#0A0A0A]">{txn.creatorName}</div>
                        <div className="text-sm text-[#73736A] truncate max-w-xs mt-0.5">{txn.campaignTitle}</div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-4 px-4">
                        {isTopUp ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs">
                            <ArrowDownLeft className="w-3.5 h-3.5" /> Wallet Deposit
                          </span>
                        ) : isEscrow ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] font-bold text-xs">
                            <Lock className="w-3.5 h-3.5" /> In Escrow
                          </span>
                        ) : isRelease ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F4F0] text-[#0A0A0A] font-bold text-xs">
                            <ArrowUpRight className="w-3.5 h-3.5" /> Escrow Released
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F4F0] text-[#73736A] font-bold text-xs">
                            Platform Fee (15%)
                          </span>
                        )}
                      </td>

                      {/* Method */}
                      <td className="py-4 px-4 text-sm text-[#73736A] font-medium">
                        {txn.method}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 text-right font-sans font-black text-sm sm:text-base text-[#0A0A0A]">
                        {isTopUp ? (
                          <span className="text-[#23744D]">+€{txn.amountEur.toLocaleString()}</span>
                        ) : (
                          <span>-€{txn.amountEur.toLocaleString()}</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 text-center">
                        {txn.status === 'in_escrow' ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] font-bold text-xs uppercase tracking-wide">
                            Held in Escrow
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs uppercase tracking-wide">
                            Settled
                          </span>
                        )}
                      </td>

                      {/* Invoice Link */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedInvoice(txn)}
                          className="w-8 h-8 rounded-lg border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white text-[#73736A] hover:text-[#0A0A0A] inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="View Tax Receipt"
                        >
                          <FileText className="w-4 h-4" />
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

      {/* Top Up Wallet Modal */}
      <Modal
        title={
          <div className="font-sans font-black text-lg text-[#0A0A0A] flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#FF2D78]" />
            <span>Deposit Funds to Brand Wallet</span>
          </div>
        }
        open={isTopUpModalOpen}
        onCancel={() => setIsTopUpModalOpen(false)}
        footer={null}
        centered
        width={480}
      >
        <div className="space-y-5 font-sans pt-3">
          <p className="text-sm text-[#73736A] leading-relaxed">
            Funds deposited to your Brand Wallet are available immediately to hire verified creators and fund escrow campaigns.
          </p>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0A0A0A]">Select Deposit Amount (EUR)</label>
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2500, 5000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTopUpAmount(preset)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    topUpAmount === preset
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
            <label className="text-sm font-bold text-[#0A0A0A]">Or Enter Custom Amount (€)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#73736A]">€</span>
              <input
                type="number"
                min={100}
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] outline-none focus:border-[#0A0A0A]"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0A0A0A]">Payment Source</label>
            <div className="space-y-2">
              {[
                { id: 'card', name: 'Corporate Visa (•••• 4242)', desc: 'Instant • Verified', icon: CreditCard },
                { id: 'sepa', name: 'SEPA Direct Debit / Transfer', desc: 'Instant European Clearing', icon: Building2 },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as any)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === m.id
                      ? 'border-[#0A0A0A] bg-[#FAFAF8]'
                      : 'border-[#E7E7E2] hover:border-[#D2D2CA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <m.icon className="w-4 h-4 text-[#0A0A0A]" />
                    <div>
                      <div className="text-sm font-bold text-[#0A0A0A]">{m.name}</div>
                      <div className="text-sm text-[#73736A]">{m.desc}</div>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedMethod === m.id ? 'border-[#0A0A0A] bg-[#0A0A0A]' : 'border-[#D2D2CA]'
                    }`}
                  >
                    {selectedMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow note */}
          <div className="p-3 bg-[#EEF7F2] rounded-xl border border-[#D9EDE2] text-xs text-[#23744D] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Regulated by European Payment Institution guidelines. Funds are 100% segregated.</span>
          </div>

          <div className="pt-2">
            <Button
              type="primary"
              loading={isProcessing}
              onClick={handleTopUpConfirm}
              className="w-full h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white border-none cursor-pointer shadow-xs"
            >
              Deposit €{topUpAmount.toLocaleString()} to Wallet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Tax Invoice & Receipt Modal */}
      <Modal
        title={null}
        open={!!selectedInvoice}
        onCancel={() => setSelectedInvoice(null)}
        footer={null}
        centered
        width={500}
      >
        {selectedInvoice && (
          <div className="space-y-6 font-sans pt-2">
            {/* Header */}
            <div className="border-b border-[#E7E7E2] pb-4 flex items-start justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#73736A]">
                  OFFICIAL TAX INVOICE
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mt-0.5">
                  {selectedInvoice.invoiceNumber}
                </h3>
                <div className="text-sm text-[#73736A]">Issued on {selectedInvoice.date}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs">
                Paid / Settled
              </span>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#73736A] font-semibold block mb-1">Billed To</span>
                <strong className="text-[#0A0A0A] block">{currentUser?.companyName || 'Aura Skincare Paris S.A.S.'}</strong>
                <span className="text-[#73736A] block">FR 89 342 981 002</span>
                <span className="text-[#73736A] block">Paris, France</span>
              </div>
              <div>
                <span className="text-[#73736A] font-semibold block mb-1">Platform Issuer</span>
                <strong className="text-[#0A0A0A] block">Influverse Marketplace BV</strong>
                <span className="text-[#73736A] block">NL 864291823B01</span>
                <span className="text-[#73736A] block">Amsterdam, Netherlands</span>
              </div>
            </div>

            {/* Line items */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5 text-xs">
              <div className="flex justify-between font-bold text-[#0A0A0A]">
                <span>{selectedInvoice.campaignTitle}</span>
                <span>€{selectedInvoice.amountEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#73736A]">
                <span>Transaction Ref: {selectedInvoice.id}</span>
                <span>{selectedInvoice.method}</span>
              </div>
              <div className="border-t border-[#E7E7E2] pt-2 flex justify-between font-black text-sm text-[#0A0A0A]">
                <span>Total Settled in EUR</span>
                <span>€{selectedInvoice.amountEur.toLocaleString()}</span>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => {
                message.success(`Downloading PDF for invoice ${selectedInvoice.invoiceNumber}`);
                setSelectedInvoice(null);
              }}
              className="w-full h-11 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Invoice</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
