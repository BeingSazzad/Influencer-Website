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
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Video,
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

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Top Status & Escrow Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={order.creatorAvatar}
                alt={order.creatorName}
                className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#151515]">{order.creatorName}</h2>
                  <span className="text-xs text-[#73736A]">{order.creatorHandle}</span>
                </div>
                <div className="text-xs text-[#555550] mt-0.5">
                  Package: <strong className="text-[#151515]">{order.packageTitle}</strong> ({order.platform})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-[#73736A]">Total Funded in Escrow</div>
                <div className="text-xl font-black text-[#151515]">€{order.totalEur}</div>
                <div className="text-[10px] text-[#23744D]">€{order.basePriceEur} creator + €{order.platformFeeEur} fee</div>
              </div>
            </div>
          </div>

          {/* Escrow Progress Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E7E7E2]">
            <div className="p-3 rounded-xl bg-[#EEF7F2] border border-[#23744D]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#23744D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Escrow Funded</span>
              </div>
              <p className="text-[10px] text-[#73736A] mt-1">€{order.totalEur} secured</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                order.status !== 'offer_sent'
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/20'
                  : 'bg-[#FAF6E8] text-[#8C6819] border-[#FAF6E8]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Offer Accepted</span>
              </div>
              <p className="text-[10px] text-[#73736A] mt-1">Creator working</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                ['deliverable_submitted', 'approved', 'completed'].includes(order.status)
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/20'
                  : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                <Video className="w-4 h-4" />
                <span>3. Assets Submitted</span>
              </div>
              <p className="text-[10px] text-[#73736A] mt-1">{order.deliverables.length} files attached</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                order.escrowReleased
                  ? 'bg-[#EEF7F2] text-[#23744D] border-[#23744D]/20'
                  : 'bg-[#FAFAF8] text-[#73736A] border-[#E7E7E2]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>4. Payment Released</span>
              </div>
              <p className="text-[10px] text-[#73736A] mt-1">
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
                  <h3 className="text-base font-black text-[#151515]">Creator Deliverables</h3>
                  <p className="text-xs text-[#73736A]">Review submitted assets before releasing payment.</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAEAE3] text-[#151515] text-xs font-bold">
                  {order.deliverables.length} Files
                </span>
              </div>

              {order.deliverables.length > 0 ? (
                <div className="space-y-4">
                  {order.deliverables.map((deliv) => (
                    <div
                      key={deliv.id}
                      className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#2B7FFF]" />
                          <span className="font-extrabold text-xs text-[#151515]">{deliv.title}</span>
                        </div>
                        <span className="text-[10px] text-[#73736A]">{deliv.submittedAt}</span>
                      </div>

                      {deliv.previewUrl && (
                        <div className="rounded-xl overflow-hidden border border-[#E7E7E2] max-h-64 bg-black">
                          <img
                            src={deliv.previewUrl}
                            alt="Deliverable Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {deliv.notes && (
                        <p className="text-xs text-[#555550] bg-white p-3 rounded-xl border border-[#E7E7E2] italic">
                          &ldquo;{deliv.notes}&rdquo;
                        </p>
                      )}

                      {deliv.fileUrl && (
                        <a
                          href={deliv.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B7FFF] hover:underline"
                        >
                          <span>Open High-Resolution File / Draft Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}

                  {/* Approval / Revision Action Bar */}
                  {order.status === 'deliverable_submitted' && (
                    <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-3">
                      <div className="text-xs font-bold text-[#151515]">
                        Are you satisfied with these deliverables?
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          type="primary"
                          onClick={handleApproveDeliverables}
                          className="h-10 px-6 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#23744D] text-white border-none flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Release Escrow Payment</span>
                        </Button>

                        <Button
                          type="default"
                          onClick={() => setIsRevisionModalOpen(true)}
                          className="h-10 px-4 rounded-full font-bold text-xs border-[#D2D2CA] text-[#151515] flex items-center gap-1.5"
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
                      <div className="text-xs text-[#23744D] font-bold">
                        Payment of €{order.basePriceEur} has been released to {order.creatorName}&apos;s wallet.
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#FAFAF8] rounded-2xl border border-[#E7E7E2] space-y-2">
                  <Clock className="w-6 h-6 text-[#73736A] mx-auto" />
                  <p className="font-bold text-xs text-[#151515]">Deliverables In Progress</p>
                  <p className="text-[11px] text-[#73736A]">
                    {order.creatorName} is currently crafting your content according to the agreed brief.
                  </p>
                </div>
              )}
            </div>

            {/* Campaign Brief Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <h3 className="text-base font-black text-[#151515]">Campaign Brief & Scope</h3>
              <p className="text-xs text-[#555550] leading-relaxed bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2]">
                {order.brief}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#73736A] mb-2">
                  Key Requirements
                </h4>
                <ul className="space-y-1.5">
                  {order.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#151515]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#151515]" />
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
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs flex flex-col h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#151515]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#151515]">
                    Order Messaging
                  </h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
                {order.messages.map((msg) => {
                  const isMe = msg.senderRole === 'brand';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#73736A]">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                          isMe
                            ? 'bg-[#151515] text-white rounded-br-xs'
                            : 'bg-[#F4F4F0] text-[#151515] rounded-bl-xs'
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
                  className="flex-1 px-3 py-2 text-xs bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#151515] hover:bg-[#2B7FFF] text-white rounded-xl transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Review Form (Appears when approved or completed) */}
            {order.status === 'approved' && !order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-black text-sm text-[#151515]">Leave a Review</h3>
                </div>
                <p className="text-xs text-[#73736A]">
                  Rate {order.creatorName}&apos;s work to finalize the campaign.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div>
                    <Rate value={ratingVal} onChange={(v) => setRatingVal(v)} />
                  </div>
                  <Input.TextArea
                    rows={3}
                    placeholder="Describe how the collaboration went, communication, content quality..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="rounded-xl text-xs"
                    required
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="h-10 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none"
                  >
                    Submit Review & Complete
                  </Button>
                </form>
              </div>
            )}

            {order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-[#151515]">Your Review</h3>
                  <div className="flex text-amber-500">
                    {[...Array(order.reviewSubmitted.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#555550] italic bg-[#FAFAF8] p-3 rounded-xl border border-[#E7E7E2]">
                  &ldquo;{order.reviewSubmitted.comment}&rdquo;
                </p>
                <span className="text-[10px] text-[#73736A] block">
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
        okButtonProps={{ className: 'bg-[#151515] rounded-full' }}
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
