'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { depositBrandFunds } from '@/redux/slices/authSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import {
  Wallet,
  ShieldCheck,
  CreditCard,
  Building2,
  FileText,
  Search,
  Download,
  Plus,
  Lock,
} from 'lucide-react';
import { Modal, Button, message } from 'antd';
import { Button as AppButton } from '@/components/ui';


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
    campaignTitle: 'Platform Fee (15%)',
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top-Up Modal State
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sepa' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Invoice Receipt Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<Transaction | null>(null);
  // Compact Detail Drawer/Modal State
  const [selectedDetailTransaction, setSelectedDetailTransaction] = useState<Transaction | null>(null);

  const balanceEur = currentUser?.balanceEur ?? 8450;

  // Active in escrow calculated from active orders
  const activeEscrowEur = orders
    .filter((o) => o.status !== 'completed' && o.status !== 'declined')
    .reduce((acc, o) => acc + (o.totalEur || 0), 0) || 2990;

  const filteredTransactions = transactions.filter((t) => {
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
    <div className="space-y-7 font-sans pb-16">
      <WorkspaceHeader
        title="Payments"
        subtitle="Track wallet balance and payment history."
        action={
          <div className="flex items-center gap-2.5">
            <AppButton
              size="md"
              variant="secondary"
              onClick={handleExportCsv}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV
            </AppButton>
            <AppButton
              size="md"
              variant="primary"
              onClick={() => setIsTopUpModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Deposit Funds
            </AppButton>
          </div>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#66665E]">
              <span className="text-xs font-bold uppercase tracking-wider">Available Wallet</span>
              <div className="w-7 h-7 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center text-[#0A0A0A]">
                <Wallet className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{balanceEur.toLocaleString()}
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#66665E]">
              <span className="text-xs font-bold uppercase tracking-wider">Locked in Escrow</span>
              <div className="w-7 h-7 rounded-xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              €{activeEscrowEur.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                Payment History
              </h3>
              <p className="text-sm text-[#66665E] mt-1">
                Deposits, escrow locks, and released payouts.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-[#66665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by creator or invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-3.5 text-sm font-medium text-[#0A0A0A] bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none focus:border-[#0A0A0A] placeholder:text-[#A3A39C] transition-all"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E7E7E2] text-[#66665E] font-bold uppercase tracking-wider text-xs">
                  <th className="pb-3.5 px-4">Creator &amp; Campaign</th>
                  <th className="pb-3.5 px-4">Date</th>
                  <th className="pb-3.5 px-4 text-right">Amount (€)</th>
                  <th className="pb-3.5 px-4 text-center">Status</th>
                  <th className="pb-3.5 px-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F0]">
                {filteredTransactions.map((txn) => {
                  const isTopUp = txn.type === 'top_up';
                  const isEscrow = txn.status === 'in_escrow';
                  const statusLabel = isEscrow
                    ? 'In Escrow'
                    : isTopUp
                    ? 'Deposited'
                    : txn.type === 'escrow_release'
                    ? 'Released'
                    : 'Settled';

                  return (
                    <tr
                      key={txn.id}
                      onClick={() => setSelectedDetailTransaction(txn)}
                      className="hover:bg-[#FAFAF8] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-[#0A0A0A] group-hover:text-[#FF2D78] transition-colors">{txn.creatorName}</div>
                        <div className="text-sm text-[#66665E] truncate max-w-xs mt-0.5">{txn.campaignTitle}</div>
                      </td>

                      <td className="py-4 px-4 text-sm text-[#66665E] font-medium whitespace-nowrap">
                        {txn.date}
                      </td>

                      <td className="py-4 px-4 text-right font-black text-sm text-[#0A0A0A] tracking-tight whitespace-nowrap">
                        {isTopUp ? '+' : '−'}€{txn.amountEur.toLocaleString()}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-xs uppercase tracking-wide whitespace-nowrap ${
                            isEscrow
                              ? 'bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25'
                              : 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]'
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(txn);
                          }}
                          className="w-8 h-8 rounded-lg border border-[#E7E7E2] hover:border-[#0A0A0A] hover:bg-white text-[#66665E] hover:text-[#0A0A0A] inline-flex items-center justify-center transition-colors cursor-pointer"
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

            {filteredTransactions.length === 0 && (
              <div className="py-12 text-center text-sm text-[#66665E] font-medium">
                No payment records match your search.
              </div>
            )}
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
          <p className="text-sm text-[#66665E] leading-relaxed">
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
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#66665E]">€</span>
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
                      <div className="text-sm text-[#66665E]">{m.desc}</div>
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
          <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#E7E7E2] text-xs text-[#66665E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#0A0A0A]" />
            <span>Regulated by European Payment Institution guidelines. Funds are 100% segregated.</span>
          </div>

          <div className="pt-2">
            <AppButton
              size="lg"
              variant="primary"
              fullWidth
              loading={isProcessing}
              onClick={handleTopUpConfirm}
            >
              Deposit €{topUpAmount.toLocaleString()} to Wallet
            </AppButton>
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
            <div className="border-b border-[#E7E7E2] pb-4 flex items-start justify-between pr-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#66665E]">
                  OFFICIAL TAX INVOICE
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mt-0.5">
                  {selectedInvoice.invoiceNumber}
                </h3>
                <div className="text-sm text-[#66665E]">Issued on {selectedInvoice.date}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2] font-bold text-xs shrink-0 mt-2">
                Paid / Settled
              </span>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#66665E] font-semibold block mb-1">Billed To</span>
                <strong className="text-[#0A0A0A] block">{currentUser?.companyName || 'Aura Skincare Paris'}</strong>
                {currentUser?.email && (
                  <span className="text-[#66665E] block">{currentUser.email}</span>
                )}
                <span className="text-[#66665E] block">{currentUser?.location || 'Berlin & Paris'}</span>
              </div>
              <div>
                <span className="text-[#66665E] font-semibold block mb-1">Platform Issuer</span>
                <strong className="text-[#0A0A0A] block">Influverse Marketplace BV</strong>
                <span className="text-[#66665E] block">NL 864291823B01</span>
                <span className="text-[#66665E] block">Amsterdam, Netherlands</span>
              </div>
            </div>

            {/* Line items */}
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2.5 text-xs">
              <div className="flex justify-between font-bold text-[#0A0A0A]">
                <span>{selectedInvoice.campaignTitle}</span>
                <span>€{selectedInvoice.amountEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#66665E]">
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

      {/* Transaction Detail Breakdown Modal */}
      <Modal
        title={null}
        open={!!selectedDetailTransaction}
        onCancel={() => setSelectedDetailTransaction(null)}
        footer={null}
        centered
        width={480}
      >
        {selectedDetailTransaction && (
          <div className="space-y-5 font-sans pt-2">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E7E2] pr-8">
              <div>
                <span className="text-xs font-bold text-[#66665E] uppercase tracking-wider">
                  Payment Ledger Breakdown
                </span>
                <div className="text-xl font-extrabold text-[#0A0A0A] tracking-tight mt-0.5">
                  {selectedDetailTransaction.id}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide shrink-0 mt-1 ${
                  selectedDetailTransaction.status === 'in_escrow'
                    ? 'bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25'
                    : 'bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]'
                }`}
              >
                {selectedDetailTransaction.status === 'in_escrow' ? 'In Escrow' : 'Settled'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#66665E]">
                  Amount Processed
                </div>
                <div className="text-2xl font-black text-[#0A0A0A] mt-0.5">
                  {selectedDetailTransaction.type === 'top_up' ? '+' : '−'}€{selectedDetailTransaction.amountEur.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#66665E]">Currency</div>
                <div className="text-sm font-extrabold text-[#0A0A0A]">EUR (€)</div>
              </div>
            </div>

            <div className="divide-y divide-[#F4F4F0] text-sm">
              <div className="flex justify-between py-2.5">
                <span className="text-[#66665E] font-medium">Recipient / Entity</span>
                <span className="font-bold text-[#0A0A0A] text-right">{selectedDetailTransaction.creatorName}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#66665E] font-medium">Campaign Purpose</span>
                <span className="font-bold text-[#0A0A0A] text-right max-w-xs truncate">{selectedDetailTransaction.campaignTitle}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#66665E] font-medium">Date & Settlement</span>
                <span className="font-bold text-[#0A0A0A] text-right">{selectedDetailTransaction.date}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#66665E] font-medium">Payment Channel</span>
                <span className="font-bold text-[#0A0A0A] text-right">{selectedDetailTransaction.method}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#66665E] font-medium">Official Invoice ID</span>
                <span className="font-mono font-bold text-[#0A0A0A] text-right">{selectedDetailTransaction.invoiceNumber}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button
                type="primary"
                onClick={() => {
                  setSelectedInvoice(selectedDetailTransaction);
                  setSelectedDetailTransaction(null);
                }}
                className="flex-1 h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white border-none cursor-pointer shadow-xs"
              >
                View Official Tax Invoice
              </Button>
              <button
                type="button"
                onClick={() => setSelectedDetailTransaction(null)}
                className="h-11 px-5 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] text-sm font-bold text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
