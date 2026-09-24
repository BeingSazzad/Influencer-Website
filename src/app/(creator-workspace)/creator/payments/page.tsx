'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import {
  ArrowDownLeft,
  FileText,
  Search,
  Clock,
  Download,
} from 'lucide-react';
import { Modal, message } from 'antd';
import { CreatorAnnualAnalytics } from '@/components/shared/CreatorAnnualAnalytics';

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
    payoutMethod: 'Bank Transfer (DE89 •••• 0082)',
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
    payoutMethod: 'Bank Transfer (DE89 •••• 0082)',
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
    payoutMethod: 'PayPal Transfer',
    referenceCode: 'TRF-2026-0310',
  },
];

export default function CreatorPaymentsPage() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  const [payouts] = useState<PayoutRecord[]>(INITIAL_PAYOUTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'paid_out' | 'in_escrow'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRemittance, setSelectedRemittance] = useState<PayoutRecord | null>(null);

  // Escrow calculation from active orders
  const inEscrowEur =
    orders
      .filter(
        (o) =>
          (o.creatorId === 'creator-01' || o.creatorId === currentUser?.id) &&
          o.status !== 'completed' &&
          o.status !== 'declined'
      )
      .reduce((acc, o) => acc + (o.basePriceEur || 0), 0) || 1800;

  const totalEarnedEur = 28400;

  const filteredPayouts = payouts.filter((p) => {
    if (activeFilter === 'paid_out' && p.status !== 'paid_out') return false;
    if (activeFilter === 'in_escrow' && p.status !== 'in_escrow') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        p.id.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.campaignTitle.toLowerCase().includes(q) ||
        p.referenceCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // 1-Click CSV Export Handler
  const handleExportCSV = () => {
    if (payouts.length === 0) {
      message.warning('No records to export.');
      return;
    }

    const headers = [
      'Payout ID',
      'Date',
      'Brand',
      'Campaign',
      'Deliverable',
      'Amount (EUR)',
      'Platform Fee',
      'Status',
      'Reference Code',
    ];

    const rows = payouts.map((p) => [
      `"${p.id}"`,
      `"${p.date}"`,
      `"${p.brandName.replace(/"/g, '""')}"`,
      `"${p.campaignTitle.replace(/"/g, '""')}"`,
      `"${p.deliverableType.replace(/"/g, '""')}"`,
      p.amountEur,
      `"0% (15% paid by brand)"`,
      `"${p.status === 'paid_out' ? 'Transferred' : p.status === 'in_escrow' ? 'In Escrow' : 'Available'}"`,
      `"${p.referenceCode}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `influverse-payouts-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success('Payout ledger exported as CSV!');
  };

  return (
    <div className="space-y-7 font-sans pb-16">
      <WorkspaceHeader
        title="Earnings & Payouts"
        subtitle="Your earnings and payout history."
        action={
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 px-4 rounded-xl border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAF8] text-[#0A0A0A] text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#0A0A0A]" />
            <span>Export CSV</span>
          </button>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* 2-Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* 1. Total Earned */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#73736A]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Earned</span>
              <div className="w-7 h-7 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center text-[#0A0A0A]">
                <ArrowDownLeft className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{totalEarnedEur.toLocaleString()}
            </div>
          </div>

          {/* 2. In Escrow */}
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#73736A]">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Escrow</span>
              <div className="w-7 h-7 rounded-xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{inEscrowEur.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 12-Month Annual Performance & Brand Collabs Analytics */}
        <CreatorAnnualAnalytics />

        {/* Clean Transactions Table Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Payout History</h3>
              <p className="text-sm text-[#73736A] mt-1">Records of completed settlements and funds in escrow.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
              {[
                { id: 'all' as const, label: 'All' },
                { id: 'paid_out' as const, label: 'Transferred' },
                { id: 'in_escrow' as const, label: 'In Escrow' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0A0A0A] text-white shadow-2xs'
                      : 'text-[#73736A] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by brand or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-3.5 text-sm font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none focus:border-[#0A0A0A] placeholder:text-[#A3A39C] transition-all"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E7E7E2] text-[#73736A] font-bold uppercase tracking-wider text-xs">
                  <th className="pb-3.5 px-4">Brand &amp; Campaign</th>
                  <th className="pb-3.5 px-4">Date</th>
                  <th className="pb-3.5 px-4 text-right">Earned (€)</th>
                  <th className="pb-3.5 px-4 text-center">Status</th>
                  <th className="pb-3.5 px-4 text-right">Statement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F0]">
                {filteredPayouts.map((payout) => {
                  const isPaidOut = payout.status === 'paid_out';
                  const isEscrow = payout.status === 'in_escrow';

                  return (
                    <tr key={payout.id} className="hover:bg-[#FAFAF8] transition-colors">
                      {/* Brand & Campaign */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-[#0A0A0A]">{payout.brandName}</div>
                        <div className="text-sm text-[#73736A] truncate max-w-xs mt-0.5">{payout.campaignTitle}</div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-sm text-[#73736A] font-medium whitespace-nowrap">
                        {payout.date}
                      </td>

                      {/* Earnings */}
                      <td className="py-4 px-4 text-right font-black text-sm text-[#0A0A0A] tracking-tight">
                        <span className={isPaidOut ? 'text-[#23744D]' : 'text-[#0A0A0A]'}>
                          +€{payout.amountEur.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        {isPaidOut ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs uppercase tracking-wide">
                            Transferred
                          </span>
                        ) : isEscrow ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF2D78] font-bold text-xs uppercase tracking-wide">
                            In Escrow
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] font-bold text-xs uppercase tracking-wide">
                            Available
                          </span>
                        )}
                      </td>

                      {/* Receipt Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRemittance(payout)}
                          className="w-8 h-8 rounded-lg border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white text-[#73736A] hover:text-[#0A0A0A] inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="View Statement"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredPayouts.length === 0 && (
              <div className="py-12 text-center text-sm text-[#73736A] font-medium">
                No payout records match your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clean Remittance Statement Modal */}
      <Modal
        title={null}
        open={!!selectedRemittance}
        onCancel={() => setSelectedRemittance(null)}
        footer={null}
        centered
        width={460}
      >
        {selectedRemittance && (
          <div className="space-y-5 font-sans pt-2">
            <div className="border-b border-[#E7E7E2] pb-3 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                  REMITTANCE STATEMENT
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mt-0.5">
                  {selectedRemittance.referenceCode}
                </h3>
                <div className="text-sm text-[#73736A]">{selectedRemittance.date}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EEF7F2] text-[#23744D] font-bold text-xs uppercase tracking-wide">
                {selectedRemittance.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#73736A] block">Creator</span>
                <strong className="text-[#0A0A0A] block">{currentUser?.name || 'Sophie Kim'}</strong>
                <span className="text-[#73736A] block">{currentUser?.handle || '@sophiekim'}</span>
              </div>
              <div>
                <span className="text-[#73736A] block">Brand Sponsor</span>
                <strong className="text-[#0A0A0A] block">{selectedRemittance.brandName}</strong>
                <span className="text-[#73736A] block">Verified Escrow</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#0A0A0A]">
                <span>{selectedRemittance.campaignTitle}</span>
                <span>€{selectedRemittance.amountEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#73736A]">
                <span>{selectedRemittance.deliverableType}</span>
                <span>Platform Fee: 0%</span>
              </div>
              <div className="border-t border-[#E7E7E2] pt-2 flex justify-between font-black text-sm text-[#0A0A0A]">
                <span>Net Earnings</span>
                <span className="text-[#23744D]">€{selectedRemittance.amountEur.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                message.success(`Statement ${selectedRemittance.referenceCode} downloaded.`);
                setSelectedRemittance(null);
              }}
              className="w-full h-10 rounded-xl bg-[#0A0A0A] hover:bg-zinc-800 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Statement</span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
