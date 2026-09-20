'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  updateOrderStatus,
  addMessageToOrder,
  submitOrderReview,
} from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Video,
  Film,
  Link2,
  Download,
  Send,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  FileText,
  Star,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { Button, Input, Modal, Rate, message } from 'antd';

export default function BrandOrderDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { currentUser } = useAppSelector((state) => state.auth);

  const orderId = params?.id as string;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [newMessageText, setNewMessageText] = useState('');
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    dispatch(
      addMessageToOrder({
        orderId: order.id,
        message: {
          id: `msg-${Date.now()}`,
          senderId: currentUser?.id || 'brand-01',
          senderName: currentUser?.name || 'Elena Rostova',
          senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          senderRole: 'brand',
          text: newMessageText.trim(),
          timestamp: 'Just now',
        },
      })
    );
    setNewMessageText('');
    message.success('Message sent to creator');
  };

  const handleApproveDeliverables = () => {
    dispatch(updateOrderStatus({ orderId: order.id, status: 'approved' }));
    message.success('Deliverables approved! Escrow payment released to creator.');
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) {
      message.error('Please specify the revisions needed.');
      return;
    }

    dispatch(
      addMessageToOrder({
        orderId: order.id,
        message: {
          id: `msg-${Date.now()}`,
          senderId: currentUser?.id || 'brand-01',
          senderName: currentUser?.name || 'Elena Rostova',
          senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
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

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title={`Order Workspace: ${order.creatorName}`}
        subtitle={`Order #${order.id.toUpperCase()} • ${order.packageTitle}`}
        backHref="/brand/orders"
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 font-sans">
        {/* Top Status & Escrow Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={order.creatorAvatar}
                alt={order.creatorName}
                className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2] shadow-2xs shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">{order.creatorName}</h2>
                  <VerifiedBadge size="sm" />
                  <span className="text-xs text-[#73736A] font-medium">{order.creatorHandle}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-xs text-[#0A0A0A]">
                  <span className="text-[#73736A]">Package:</span>
                  <span className="font-semibold text-[#0A0A0A]">{order.packageTitle}</span>
                  <span className="text-[#73736A]">({order.platform})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto bg-[#FAFAF8] px-5 py-3.5 rounded-2xl border border-[#E7E7E2]">
              <div className="text-left sm:text-right">
                <div className="text-xs font-semibold text-[#73736A] uppercase tracking-wider">Total Funded in Escrow</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">€{order.totalEur.toLocaleString()}</div>
                <div className="text-xs text-[#23744D] font-semibold">€{order.basePriceEur} creator + €{order.platformFeeEur} fee</div>
              </div>
            </div>
          </div>

          {/* Escrow Progress Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 border-t border-[#E7E7E2]">
            <div className="p-4 rounded-2xl bg-[#EEF7F2] border border-[#23744D]/25 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#23744D]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1. Escrow Funded</span>
              </div>
              <p className="text-xs text-[#555550]">€{order.totalEur} secured</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                order.status !== 'offer_sent'
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/25'
                  : 'bg-[#FAF6E8] text-[#8C6819] border-[#F3ECCF]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>2. Offer Accepted</span>
              </div>
              <p className="text-xs text-[#555550]">Creator working</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                ['deliverable_submitted', 'approved', 'completed'].includes(order.status)
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/25'
                  : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                <Video className="w-4 h-4 shrink-0" />
                <span>3. Assets Submitted</span>
              </div>
              <p className="text-xs text-[#73736A]">{order.deliverables.length} files attached</p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                order.escrowReleased
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/25'
                  : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>4. Payment Released</span>
              </div>
              <p className="text-xs text-[#73736A]">
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
                  <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">Creator Deliverables</h3>
                  <p className="text-sm text-[#73736A] mt-0.5">Review submitted assets before releasing payment.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A] text-xs font-semibold">
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
                        <span className="text-xs text-[#73736A] font-medium">{deliv.submittedAt}</span>
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
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E7E2] text-xs font-bold text-[#0A0A0A] hover:border-[#0A0A0A] hover:text-[#FF2D78] transition-colors shadow-2xs"
                          >
                            <Link2 className="w-3.5 h-3.5 text-[#FF2D78]" />
                            <span>
                              {deliv.fileUrl.includes('drive.google.com')
                                ? 'Open Google Drive Folder'
                                : deliv.fileUrl.includes('dropbox') || deliv.fileUrl.includes('frame.io')
                                ? 'Open Cloud Asset Link'
                                : 'Download / Open Master Deliverable'}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#73736A]" />
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
                          className="h-10 px-5 rounded-full font-semibold text-sm bg-[#0A0A0A] hover:!bg-[#23744D] !text-white hover:!text-white border-none flex items-center gap-2 shadow-xs cursor-pointer"
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
                      </div>
                    </div>
                  )}

                  {order.escrowReleased && (
                    <div className="p-4 bg-[#EEF7F2] rounded-2xl border border-[#23744D]/20 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#23744D] shrink-0" />
                      <div className="text-sm text-[#23744D] font-semibold">
                        Payment of €{order.basePriceEur} has been released to {order.creatorName}&apos;s wallet.
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-10 text-center bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mx-auto shadow-2xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-sm text-[#0A0A0A]">Deliverables In Progress</p>
                  <p className="text-sm text-[#73736A] max-w-sm mx-auto leading-relaxed">
                    {order.creatorName} is currently crafting your content according to the agreed brief.
                  </p>
                </div>
              )}
            </div>

            {/* Campaign Brief Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-5">
              <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">Campaign Brief & Scope</h3>
              <p className="text-sm text-[#44443E] leading-relaxed bg-[#FAFAF8] p-5 rounded-2xl border border-[#E7E7E2]">
                {order.brief}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#73736A] mb-3">
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

          {/* Right Column (5 cols): Chat & Review */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Order Chat */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs flex flex-col h-[540px]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Order Messaging
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#23744D] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3.5 text-sm font-sans">
                {order.messages.map((msg) => {
                  const isMe = msg.senderRole === 'brand';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-xs text-[#73736A]">
                        <span className="font-semibold text-[#0A0A0A]">{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl max-w-[85%] leading-relaxed text-sm ${
                          isMe
                            ? 'bg-[#0A0A0A] text-white rounded-br-xs'
                            : 'bg-[#F4F4F0] text-[#0A0A0A] rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#E7E7E2] flex gap-2">
                <input
                  type="text"
                  placeholder="Type message or question..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 h-10 px-4 text-sm font-sans bg-[#FAFAF8] border border-[#E7E7E2] rounded-full outline-none focus:border-[#0A0A0A] transition-colors"
                />
                <button
                  type="submit"
                  className="h-10 w-10 rounded-full bg-[#0A0A0A] hover:bg-[#FF2D78] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Review Form (Appears when approved or completed) */}
            {order.status === 'approved' && !order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E7E2] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-bold text-sm text-[#0A0A0A]">Leave a Review</h3>
                </div>
                <p className="text-xs text-[#73736A]">
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
                <span className="text-xs text-[#73736A] block">
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
          <p className="text-xs text-[#73736A]">
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
    </div>
  );
}
