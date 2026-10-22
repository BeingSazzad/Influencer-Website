'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  updateOrderStatus,
  addMessageToOrder,
  submitOrderReview,
  reportOrderIssue,
  resolveOrderIssue,
} from '@/redux/slices/orderSlice';
import { reportIssueToSupport, sendMessage } from '@/redux/slices/messageSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Video,
  Link2,
  Send,
  ExternalLink,
  MessageSquare,
  Star,
  RotateCcw,
  AlertTriangle,
  HelpCircle,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { Button, Input, Modal, Rate, Select, message } from 'antd';

export default function BrandOrderDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const orderId = params?.id as string;
  const order =
    orders.find(
      (o) =>
        o.id === orderId ||
        o.id.toLowerCase() === orderId?.toLowerCase() ||
        (orderId?.toLowerCase() === 'ord-102' && o.id === 'ORD-94102') ||
        (orderId?.toUpperCase() === 'ORD-94102' && o.id === 'ord-102')
    ) || orders[0];

  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Support / Issue states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('Quality / Creative Brief Disagreement');
  const [reportReason, setReportReason] = useState('');

  const handleApproveDeliverables = () => {
    dispatch(updateOrderStatus({ orderId: order.id, status: 'approved' }));
    message.success('Deliverables approved! Escrow payment released to creator.');
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) {
      message.error('Please specify the revisions needed.');
      return;
    }

    // Send note to unified Messages inbox
    dispatch(
      sendMessage({
        conversationId: 'conv-sophie-kim',
        senderId: currentUser?.id || 'user_brand_01',
        senderName: currentUser?.companyName || 'Aura Skincare Paris',
        senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        senderRole: 'brand',
        text: `[Revision Requested for Order #${order.id}]: ${revisionNotes}`,
      })
    );

    dispatch(
      addMessageToOrder({
        orderId: order.id,
        message: {
          id: `msg-${Date.now()}`,
          senderId: currentUser?.id || 'brand-aura',
          senderName: currentUser?.companyName || currentUser?.name || 'Aura Skincare Paris',
          senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
          senderRole: 'brand',
          text: `[Revision Requested]: ${revisionNotes}`,
          timestamp: 'Just now',
        },
      })
    );

    dispatch(updateOrderStatus({ orderId: order.id, status: 'in_production' }));
    setIsRevisionModalOpen(false);
    setRevisionNotes('');
    message.info('Revision request sent to creator.');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    dispatch(
      submitOrderReview({
        orderId: order.id,
        rating: ratingVal,
        comment: reviewComment.trim(),
      })
    );
    message.success('Review submitted! Campaign marked as completed.');
  };

  const handleReportIssue = () => {
    if (!reportReason.trim()) {
      message.error('Please describe the issue for our support team.');
      return;
    }
    dispatch(
      reportOrderIssue({
        orderId: order.id,
        reporterRole: 'brand',
        category: reportCategory,
        reason: reportReason.trim(),
      })
    );
    dispatch(
      reportIssueToSupport({
        orderId: order.id,
        role: 'brand',
        reporterName: currentUser?.companyName || currentUser?.name || 'Aura Skincare Paris',
        category: reportCategory,
        reason: reportReason.trim(),
      })
    );
    setIsReportModalOpen(false);
    setReportReason('');
    message.success('Support ticket opened! Influverse Support is notified and will assist both parties in chat.');
  };

  const handleResolveSupportTicket = () => {
    Modal.confirm({
      title: 'Mark Support Ticket as Resolved?',
      content: 'Confirm that you and the creator have resolved this issue with Support assistance.',
      okText: 'Mark Resolved',
      okButtonProps: { className: '!bg-[#0A0A0A]' },
      onOk: () => {
        dispatch(
          resolveOrderIssue({
            orderId: order.id,
            resolutionNotes: 'Brand confirmed resolution with support.',
          })
        );
        message.success('Issue marked as resolved! Order fulfillment can continue.');
      },
    });
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title={order.creatorName}
        subtitle={`Order #${order.id.toUpperCase()} • ${order.packageTitle}`}
        backHref="/brand/campaigns"
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 font-sans">
        {/* Support Ticket Active Banner */}
        {(order.status === 'disputed' || !!order.dispute) && (
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#EBE7DF] shadow-2xs space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E7E3D8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black text-[#0A0A0A] bg-white px-2.5 py-0.5 rounded-md border border-[#E7E3D8]">
                      {order.dispute?.id || 'SUP-8821'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold uppercase">
                      Support Review Active
                    </span>
                    <span className="text-xs text-[#66665E] font-medium">
                      Opened: {order.dispute?.filedDate || 'Recently'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight mt-1">
                    Support Ticket Under Review
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <Link
                  href="/brand/messages?conv=conv-influverse-support"
                  className="px-4 py-2 rounded-xl bg-[#0A0A0A] hover:bg-zinc-800 text-white text-xs font-bold transition-all inline-flex items-center gap-2 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat with Support</span>
                </Link>
                <button
                  onClick={handleResolveSupportTicket}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E7E3D8] space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#888880]">
                Report Details
              </div>
              <p className="text-sm text-[#44443E] font-medium leading-relaxed">
                {order.dispute?.reason || 'Issue reported regarding order deliverables and timeline.'}
              </p>
            </div>

            <div className="text-xs text-[#66665E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Escrow funds of <strong>€{order.totalEur.toLocaleString()}</strong> remain secured in platform escrow while Support assists both parties in chat.
              </span>
            </div>
          </div>
        )}
        {/* Top Status & Escrow Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link href={`/creators/${order.creatorId}`} className="group/avatar block shrink-0">
                <img
                  src={order.creatorAvatar}
                  alt={order.creatorName}
                  className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2] shadow-2xs group-hover/avatar:scale-105 transition-transform"
                />
              </Link>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/creators/${order.creatorId}`}
                    className="hover:text-[#FF2D78] transition-colors"
                  >
                    <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">{order.creatorName}</h2>
                  </Link>
                  <VerifiedBadge size="sm" />
                  <span className="text-sm text-[#66665E] font-medium">{order.creatorHandle}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-sm text-[#0A0A0A]">
                  <span className="text-[#66665E]">Package:</span>
                  <span className="font-semibold text-[#0A0A0A]">{order.packageTitle}</span>
                  <span className="text-[#66665E]">({order.platform})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
              <Link
                href={`/brand/messages?creatorId=${order.creatorId}`}
                className="px-4 py-2.5 rounded-2xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Creator</span>
              </Link>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#66665E] hover:text-[#0A0A0A] font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                title="Report an issue or ask support for assistance"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Help?</span>
              </button>
              <Link
                href={`/creators/${order.creatorId}`}
                className="px-4 py-2.5 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] font-bold text-sm flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#66665E]" />
              </Link>
              <div className="bg-[#FAFAF8] px-5 py-3.5 rounded-2xl border border-[#E7E7E2] text-left sm:text-right">
                <div className="text-xs font-bold text-[#66665E] uppercase tracking-wider">Escrow</div>
                <div className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">€{order.totalEur.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Escrow Progress Stepper */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 pt-4 sm:pt-6 border-t border-[#E7E7E2]">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#0A0A0A] space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#FF2D78]" />
                <span>1. Escrow Funded</span>
              </div>
              <p className="text-sm text-[#66665E]">€{order.totalEur} secured</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                order.status !== 'offer_sent'
                  ? 'bg-[#FAFAF8] text-[#0A0A0A] border-[#0A0A0A]'
                  : 'bg-[#FFF0F5] text-[#FF2D78] border-[#FF2D78]/25'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${order.status !== 'offer_sent' ? 'text-[#FF2D78]' : 'text-[#66665E]'}`} />
                <span>2. Offer Accepted</span>
              </div>
              <p className="text-sm text-[#66665E]">Creator working</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                ['deliverable_submitted', 'approved', 'completed'].includes(order.status)
                  ? 'bg-[#FAFAF8] text-[#0A0A0A] border-[#0A0A0A]'
                  : 'bg-[#FAFAF8] text-[#66665E] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A]">
                <Video className={`w-4 h-4 shrink-0 ${['deliverable_submitted', 'approved', 'completed'].includes(order.status) ? 'text-[#FF2D78]' : 'text-[#66665E]'}`} />
                <span>3. Assets Submitted</span>
              </div>
              <p className="text-sm text-[#66665E]">{order.deliverables.length} files attached</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                order.escrowReleased
                  ? 'bg-[#FAFAF8] text-[#0A0A0A] border-[#0A0A0A]'
                  : 'bg-[#FAFAF8] text-[#66665E] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A0A0A]">
                <ShieldCheck className={`w-4 h-4 shrink-0 ${order.escrowReleased ? 'text-[#FF2D78]' : 'text-[#66665E]'}`} />
                <span>4. Payment Released</span>
              </div>
              <p className="text-sm text-[#66665E]">
                {order.escrowReleased ? '100% Payout Disbursed' : 'Awaiting approval'}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left Deliverables & Brief | Right Chat & Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Deliverables & Campaign Scope */}
          <div className="lg:col-span-7 space-y-6">
            {/* Deliverables Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Creator Deliverables</h3>
                  <p className="text-sm text-[#66665E] mt-0.5">Review submitted assets before releasing payment.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A] text-sm font-semibold">
                  {order.deliverables.length} Files
                </span>
              </div>

              {order.deliverables.length > 0 ? (
                <div className="space-y-4">
                  {order.deliverables.map((deliv) => (
                    <div
                      key={deliv.id}
                      className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#FF2D78]" />
                          <span className="font-bold text-sm text-[#0A0A0A]">{deliv.title}</span>
                        </div>
                        <span className="text-sm text-[#66665E] font-medium">{deliv.submittedAt}</span>
                      </div>

                      {/* Video Player Preview or Image Preview */}
                      {(deliv.previewUrl?.startsWith('blob:') || deliv.previewUrl?.includes('.mp4') || deliv.fileUrl?.startsWith('blob:') || deliv.fileUrl?.includes('.mp4')) ? (
                        <div className="rounded-2xl overflow-hidden border border-[#E7E7E2] aspect-video max-h-72 bg-black shadow-xs flex items-center justify-center">
                          <video
                            src={deliv.previewUrl || deliv.fileUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : deliv.previewUrl ? (
                        <div className="rounded-2xl overflow-hidden border border-[#E7E7E2] max-h-64 bg-black">
                          <img
                            src={deliv.previewUrl}
                            alt="Deliverable Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}

                      {deliv.notes && (
                        <p className="text-sm text-[#555550] bg-white p-3.5 rounded-xl border border-[#E7E7E2] italic leading-relaxed">
                          &ldquo;{deliv.notes}&rdquo;
                        </p>
                      )}

                      {deliv.fileUrl && (
                        <div className="pt-1">
                          <a
                            href={deliv.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E7E2] text-sm font-bold text-[#0A0A0A] hover:border-[#0A0A0A] hover:text-[#FF2D78] transition-colors shadow-2xs"
                          >
                            <Link2 className="w-3.5 h-3.5 text-[#FF2D78]" />
                            <span>
                              {deliv.fileUrl.includes('drive.google.com')
                                ? 'Open Google Drive Folder'
                                : deliv.fileUrl.includes('dropbox') || deliv.fileUrl.includes('frame.io')
                                ? 'Open Cloud Asset Link'
                                : 'Download / Open Master Deliverable'}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#66665E]" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Approval / Revision Action Bar */}
                  {order.status === 'deliverable_submitted' && (
                    <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-3.5">
                      <div className="text-sm font-semibold text-[#0A0A0A]">
                        Are you satisfied with these deliverables?
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          type="primary"
                          onClick={handleApproveDeliverables}
                          className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Release Escrow Payment</span>
                        </Button>

                        <Button
                          type="default"
                          onClick={() => setIsRevisionModalOpen(true)}
                          className="h-10 px-4 rounded-full font-semibold text-sm border-[#D2D2CA] text-[#0A0A0A] flex items-center gap-2 hover:border-[#0A0A0A] cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Request Revisions</span>
                        </Button>

                        <Button
                          type="default"
                          onClick={() => setIsReportModalOpen(true)}
                          className="h-10 px-4 rounded-full font-semibold text-sm border-[#E7E7E2] text-[#66665E] hover:text-[#0A0A0A] flex items-center gap-2 cursor-pointer bg-white"
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span>Report an Issue</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {order.escrowReleased && (
                    <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#FF2D78] shrink-0" />
                      <div className="text-sm text-[#0A0A0A] font-semibold">
                        Payment of €{order.basePriceEur} has been released to {order.creatorName}&apos;s wallet.
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-10 text-center bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A] flex items-center justify-center mx-auto shadow-2xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-sm text-[#0A0A0A]">Deliverables In Progress</p>
                  <p className="text-sm text-[#66665E] max-w-sm mx-auto leading-relaxed">
                    {order.creatorName} is currently crafting your content according to the agreed brief.
                  </p>
                </div>
              )}
            </div>

            {/* Campaign Brief Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Campaign Brief & Scope</h3>
              <p className="text-sm text-[#44443E] leading-relaxed bg-[#FAFAF8] p-5 rounded-2xl border border-[#E7E7E2]">
                {order.brief}
              </p>

              <div className="pt-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#66665E] mb-3">
                  Key Requirements
                </h4>
                <ul className="space-y-2.5">
                  {order.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-[#0A0A0A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Communication & Review */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Communication Hub Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Direct Communication
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#66665E] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#0A0A0A]">Active</span>
                </div>
              </div>

              {/* Creator Preview */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <img
                  src={order.creatorAvatar}
                  alt={order.creatorName}
                  className="w-12 h-12 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#0A0A0A] truncate">{order.creatorName}</span>
                    <VerifiedBadge size="sm" />
                  </div>
                  <p className="text-xs text-[#66665E] truncate">{order.creatorHandle}</p>
                </div>
              </div>

              {/* Info Note */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE7DF] text-xs text-[#66665E] leading-relaxed space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-[#0A0A0A]">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Centralized Messaging</span>
                </div>
                <p>
                  To prevent duplicate conversations and keep all files organized, all direct messaging, brief discussions, and revision feedback with {order.creatorName} are handled in your dedicated Messages inbox.
                </p>
              </div>

              {/* Primary Action Button */}
              <Link
                href={`/brand/messages?creatorId=${order.creatorId}`}
                className="w-full h-11 rounded-2xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs group/msg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Conversation in Messages</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/msg:translate-x-1" />
              </Link>
            </div>

            {/* Escrow & Protection Summary */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                  Escrow Guarantee
                </h4>
              </div>
              <p className="text-xs text-[#66665E] leading-relaxed">
                Your payment of €{order.totalEur.toLocaleString()} is securely protected in escrow. Funds are only released to {order.creatorName} once you review and approve the final deliverables.
              </p>
            </div>

            {/* Review Form (Appears when approved or completed) */}
            {order.status === 'approved' && !order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-bold text-sm text-[#0A0A0A]">Leave a Review</h3>
                </div>
                <p className="text-sm text-[#66665E]">
                  Rate {order.creatorName}&apos;s work to finalize the campaign.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-3.5">
                  <div>
                    <Rate value={ratingVal} onChange={(v) => setRatingVal(v)} />
                  </div>
                  <Input.TextArea
                    rows={3}
                    placeholder="Describe how the collaboration went, communication, content quality..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="rounded-2xl text-sm font-sans"
                    required
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="h-10 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none shadow-sm cursor-pointer"
                  >
                    Submit Review & Complete
                  </Button>
                </form>
              </div>
            )}

            {order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#0A0A0A]">Your Review</h3>
                  <div className="flex text-amber-500">
                    {[...Array(order.reviewSubmitted.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#555550] italic bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2] leading-relaxed">
                  &ldquo;{order.reviewSubmitted.comment}&rdquo;
                </p>
                <span className="text-sm text-[#66665E] block">
                  Submitted {order.reviewSubmitted.date}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Revision Modal */}
      <Modal
        title="Request Revisions from Creator"
        open={isRevisionModalOpen}
        onCancel={() => setIsRevisionModalOpen(false)}
        onOk={handleRequestRevision}
        okText="Send Revision Request"
        okButtonProps={{ className: 'bg-[#0A0A0A] rounded-full' }}
      >
        <div className="space-y-3 pt-2">
          <p className="text-sm text-[#66665E]">
            Please clearly describe the timestamps or specific adjustments required for the creator.
          </p>
          <Input.TextArea
            rows={4}
            placeholder="e.g. Please shorten the intro hook by 2 seconds and emphasize the promo code in the ending caption."
            value={revisionNotes}
            onChange={(e) => setRevisionNotes(e.target.value)}
            className="rounded-xl text-xs"
          />
        </div>
      </Modal>

      {/* Report Issue to Support Modal */}
      <Modal
        title={`Report an Issue with Order #${order.id.toUpperCase()}`}
        open={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
        footer={null}
        width={540}
        centered
      >
        <div className="space-y-4 pt-3 font-sans">
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] text-xs text-[#66665E] leading-relaxed">
            Need help? Our Trust & Support team mediates between brands and creators. Submitting a report alerts support specialists who review briefs, chat history, and deliverables to resolve issues amicably.
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#66665E]">
              Issue Category
            </label>
            <Select
              value={reportCategory}
              onChange={(val) => setReportCategory(val)}
              className="w-full h-10 rounded-xl"
              options={[
                { value: 'Quality / Creative Brief Disagreement', label: 'Deliverables do not match agreed creative brief' },
                { value: 'Missed Delivery Deadline / Creator Unresponsive', label: 'Missed delivery deadline or creator unresponsive' },
                { value: 'Video Formatting / Technical Problems', label: 'Technical or formatting issues with video files' },
                { value: 'Scope or Revision Disagreement', label: 'Disagreement regarding revisions or scope' },
                { value: 'Other Support Inquiry', label: 'Other order support request' },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#66665E]">
              Describe the Issue
            </label>
            <Input.TextArea
              rows={4}
              placeholder="Explain specifically what is missing, what went wrong, or what assistance you need from Influverse Support..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="rounded-2xl text-xs p-3"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-[#E7E7E2] text-xs font-bold text-[#66665E] hover:text-[#0A0A0A] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReportIssue}
              className="px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white text-xs font-extrabold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Submit Report to Support</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
