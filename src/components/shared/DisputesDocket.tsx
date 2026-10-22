'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { arbitrateDispute } from '@/redux/slices/orderSlice';
import { Order } from '@/types';
import {
  Scale,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Play,
  X,
} from 'lucide-react';
import { Modal, message } from 'antd';

interface DisputesDocketProps {
  role?: 'brand' | 'creator' | 'admin';
  backHref?: string;
}

export function DisputesDocket({ role = 'brand', backHref }: DisputesDocketProps) {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedDisputeOrder, setSelectedDisputeOrder] = useState<Order | null>(null);
  const [isArbitrateModalOpen, setIsArbitrateModalOpen] = useState(false);
  const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState(false);

  // Arbitration form state
  const [decision, setDecision] = useState<'resolved_split' | 'resolved_brand' | 'resolved_creator'>('resolved_split');
  const [splitRatio, setSplitRatio] = useState('50% Brand / 50% Creator');
  const [mediatorNotes, setMediatorNotes] = useState(
    'Deliverable met 70% of creative brief criteria. Re-cut revision was acceptable for organic channels but not whitelisted TikTok Ads. 50/50 mutual settlement approved.'
  );

  // Filter orders that have disputes or disputed status
  const disputedOrders = orders.filter((o) => o.status === 'disputed' || !!o.dispute);

  const filteredDisputes = disputedOrders.filter((o) => {
    const isResolved = o.dispute?.status && o.dispute.status !== 'open';
    if (activeTab === 'open') return !isResolved;
    if (activeTab === 'resolved') return isResolved;
    return true;
  });

  const handleOpenArbitration = (order: Order) => {
    setSelectedDisputeOrder(order);
    setIsArbitrateModalOpen(true);
  };

  const handleConfirmArbitration = () => {
    if (!selectedDisputeOrder) return;
    dispatch(
      arbitrateDispute({
        orderId: selectedDisputeOrder.id,
        decision,
        splitRatio: decision === 'resolved_split' ? splitRatio : undefined,
        mediatorNotes,
      })
    );
    message.success(
      `Dispute ${selectedDisputeOrder.dispute?.id || ''} successfully arbitrated and settlement executed.`
    );
    setIsArbitrateModalOpen(false);
    setSelectedDisputeOrder(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0A0A0A] tracking-tight">Disputes</h1>
          <p className="text-sm text-[#66665E] mt-1 font-medium">
            Arbitrate escrow conflicts, evidence audits, and binding financial settlements.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 bg-[#F4F4F0] p-1 rounded-xl self-start max-w-sm">
        {(['all', 'open', 'resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-sm font-bold rounded-lg transition-all capitalize cursor-pointer ${
              activeTab === tab
                ? 'bg-white text-[#0A0A0A] shadow-xs'
                : 'text-[#66665E] hover:text-[#0A0A0A]'
            }`}
          >
            {tab === 'all' ? 'All Cases' : `${tab} Cases`}
          </button>
        ))}
      </div>

      {/* Dispute Cards */}
      <div className="space-y-4">
        {filteredDisputes.length === 0 ? (
          <div className="p-12 text-center text-[#66665E] text-sm bg-white rounded-3xl border border-[#E7E7E2]">
            No disputes found matching current filter.
          </div>
        ) : (
          filteredDisputes.map((order) => {
            const dispute = order.dispute;
            const isOpen = !dispute?.status || dispute?.status === 'open';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-6 hover:border-[#D2D2CA] transition-all"
              >
                {/* Top Metainfo Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F0EA]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs font-black text-[#0A0A0A] bg-[#F4F4F0] px-2.5 py-1 rounded-md border border-[#E7E7E2]">
                      {dispute?.id || 'DSP-8821'}
                    </span>
                    <span
                      className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${
                        isOpen
                          ? 'bg-[#FFF0F5] text-[#FF2D78] border border-[#FF2D78]/25'
                          : 'bg-[#F0FDF4] text-[#16A34A] border border-[#16A34A]/25'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-[#FF2D78]' : 'bg-[#16A34A]'}`} />
                      {isOpen ? 'OPEN' : (dispute?.status || 'RESOLVED').replace('_', ' ')}
                    </span>
                    <Link
                      href={role === 'creator' ? `/creator/orders/${order.id}` : `/brand/orders/${order.id}`}
                      className="text-xs text-[#66665E] font-medium hover:text-[#0A0A0A] transition-colors"
                    >
                      Contract Order #{order.id}
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium text-[#66665E]">
                    <span>Filed: {dispute?.filedDate || 'Sep 24, 2026'}</span>
                    <span className="text-[#0A0A0A] font-extrabold text-base">
                      €{order.basePriceEur.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Campaign Title & Grievance */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Campaign Title + Brand & Creator Info */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#888880]">
                        CAMPAIGN
                      </div>
                      <h3 className="text-lg font-black text-[#0A0A0A] tracking-tight mt-0.5">
                        {order.packageTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Brand Info */}
                      <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#888880]">
                          BRAND
                        </div>
                        <div className="flex items-center gap-2.5 pt-0.5">
                          <img
                            src={order.brandLogo}
                            alt={order.brandName}
                            className="w-7 h-7 rounded-full object-cover border border-[#E7E7E2]"
                          />
                          <span className="text-sm font-bold text-[#0A0A0A] truncate">
                            {order.brandName}
                          </span>
                        </div>
                      </div>

                      {/* Creator Info */}
                      <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#888880]">
                          CREATOR
                        </div>
                        <div className="flex items-center gap-2.5 pt-0.5">
                          <img
                            src={order.creatorAvatar}
                            alt={order.creatorName}
                            className="w-7 h-7 rounded-full object-cover border border-[#E7E7E2]"
                          />
                          <span className="text-sm font-bold text-[#0A0A0A] truncate">
                            {order.creatorName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scope */}
                    <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-xs text-[#555550]">
                      <strong className="text-[#0A0A0A]">Scope:</strong>{' '}
                      {dispute?.scope || order.brief}
                    </div>
                  </div>

                  {/* Right Column: Grievance Box */}
                  <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#888880] mb-2">
                        GRIEVANCE
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-[#FFE0EB] text-sm text-[#7A1E3E] font-medium leading-relaxed italic">
                        &ldquo;{dispute?.reason || 'Brand claims lighting & tone do not match agreed moodboard; Creator claims script was fully approved.'}&rdquo;
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between gap-3 pt-3">
                      <button
                        onClick={() => {
                          setSelectedDisputeOrder(order);
                          setIsDeliverableModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF2D78] hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Deliverable</span>
                      </button>

                      {isOpen ? (
                        <button
                          onClick={() => handleOpenArbitration(order)}
                          className="px-4 py-2 rounded-xl bg-[#FF2D78] hover:bg-[#E02669] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>Arbitrate Case</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[#16A34A] font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Settled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Arbitration Modal */}
      <Modal
        open={isArbitrateModalOpen}
        onCancel={() => setIsArbitrateModalOpen(false)}
        footer={null}
        width={560}
        centered
        className="arbitration-modal"
      >
        {selectedDisputeOrder && (
          <div className="p-2 space-y-6 font-sans">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF0F5] text-[#FF2D78] text-xs font-bold border border-[#FF2D78]/20">
                <Scale className="w-3.5 h-3.5" />
                <span>Arbitration Docket • {selectedDisputeOrder.dispute?.id || 'DSP-8821'}</span>
              </div>
              <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">
                Binding Escrow Settlement
              </h2>
              <p className="text-xs text-[#66665E]">
                Contract Order #{selectedDisputeOrder.id} • €{selectedDisputeOrder.basePriceEur} Escrow Total
              </p>
            </div>

            {/* Decision options */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#888880] block">
                Arbitration Ruling
              </label>
              {[
                {
                  key: 'resolved_split',
                  label: '50% Split Settlement (Recommended)',
                  desc: 'Split locked escrow 50/50 between brand and creator as mutual settlement.',
                },
                {
                  key: 'resolved_creator',
                  label: 'Release 100% to Creator',
                  desc: 'Deliverables met the approved brief requirements. Full payout released.',
                },
                {
                  key: 'resolved_brand',
                  label: 'Refund 100% to Brand',
                  desc: 'Critical non-compliance with signed contract. Full escrow refund to brand.',
                },
              ].map((opt) => (
                <div
                  key={opt.key}
                  onClick={() => setDecision(opt.key as any)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    decision === opt.key
                      ? 'border-[#0A0A0A] bg-[#FAFAF8] shadow-xs'
                      : 'border-[#E7E7E2] hover:border-[#D2D2CA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#0A0A0A]">{opt.label}</span>
                    <input
                      type="radio"
                      checked={decision === opt.key}
                      onChange={() => setDecision(opt.key as any)}
                      className="accent-[#FF2D78]"
                    />
                  </div>
                  <p className="text-xs text-[#66665E] mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Mediator Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#888880] block">
                Mediator Ruling & Contract Audit Notes
              </label>
              <textarea
                value={mediatorNotes}
                onChange={(e) => setMediatorNotes(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-2xl border border-[#E7E7E2] focus:border-[#0A0A0A] focus:outline-none bg-white leading-relaxed text-[#0A0A0A]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsArbitrateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-[#E7E7E2] text-xs font-bold text-[#66665E] hover:text-[#0A0A0A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmArbitration}
                className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-extrabold transition-all shadow-xs cursor-pointer"
              >
                Confirm & Disburse Settlement
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Deliverable Modal */}
      <Modal
        open={isDeliverableModalOpen}
        onCancel={() => setIsDeliverableModalOpen(false)}
        footer={null}
        width={680}
        centered
      >
        {selectedDisputeOrder && (
          <div className="p-2 space-y-4 font-sans">
            <div>
              <div className="text-xs font-bold text-[#FF2D78]">Deliverable Evidence</div>
              <h3 className="text-xl font-black text-[#0A0A0A]">
                {selectedDisputeOrder.packageTitle}
              </h3>
              <p className="text-xs text-[#66665E]">
                Submitted by {selectedDisputeOrder.creatorName} for {selectedDisputeOrder.brandName}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E7E7E2] aspect-video bg-black flex items-center justify-center">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                controls
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3.5 bg-[#FAFAF8] rounded-xl border border-[#E7E7E2] text-xs space-y-1">
              <div className="font-bold text-[#0A0A0A]">Brief Compliance Audit</div>
              <p className="text-[#66665E]">
                {selectedDisputeOrder.brief}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
