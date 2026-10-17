'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  submitDeliverable,
  addMessageToOrder,
  reportOrderIssue,
  resolveOrderIssue,
} from '@/redux/slices/orderSlice';
import { reportIssueToSupport } from '@/redux/slices/messageSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { OrderDeliverable } from '@/types';
import {
  Video,
  Upload,
  Send,
  ExternalLink,
  MessageSquare,
  Link2,
  Film,
  ArrowRight,
  HelpCircle,
  LifeBuoy,
  CheckCircle2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Button, Input, Modal, Select, message } from 'antd';
import { BrandLogo } from '@/components/shared/BrandLogo';

export default function CreatorOrderFulfilmentPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const orderId = params?.id as string;
  const order =
    orders.find(
      (o) =>
        o.id === orderId ||
        o.id?.toLowerCase() === orderId?.toLowerCase() ||
        (orderId?.toLowerCase() === 'ord-102' && o.id === 'ORD-94102') ||
        (orderId?.toUpperCase() === 'ORD-94102' && o.id === 'ord-102')
    ) || orders[0];

  const [delivTitle, setDelivTitle] = useState('Campaign Final Video Cut (9:16 4K)');
  const [submissionMode, setSubmissionMode] = useState<'drive' | 'direct'>('drive');
  const [delivFileUrl, setDelivFileUrl] = useState('https://drive.google.com/drive/folders/influverse-demo-draft');
  const [directVideoUrl, setDirectVideoUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [directVideoName, setDirectVideoName] = useState<string>('Sophie_NordicGlow_FinalCut_4K.mp4');
  const [directVideoSize, setDirectVideoSize] = useState<string>('38.6 MB');
  const [delivNotes, setDelivNotes] = useState('Here is the final cut with both color grades and clean uncompressed audio.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Support / Issue states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('Brand Unresponsive / Feedback Delayed');
  const [reportReason, setReportReason] = useState('');

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDirectVideoName(file.name);
      setDirectVideoSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      const objectUrl = URL.createObjectURL(file);
      setDirectVideoUrl(objectUrl);
      message.success(`Video file "${file.name}" ready for submission`);
    }
  };

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionMode === 'direct' && !directVideoUrl && !delivFileUrl) {
      message.error('Please upload a video file or provide a cloud link.');
      return;
    }
    if (submissionMode === 'drive' && !delivFileUrl) {
      message.error('Please enter a Google Drive or cloud link.');
      return;
    }

    setIsSubmitting(true);

    const resolvedFileUrl = delivFileUrl || directVideoUrl;

    const newDeliverable: OrderDeliverable = {
      id: `deliv-${Date.now()}`,
      title: delivTitle,
      fileUrl: resolvedFileUrl,
      previewUrl: directVideoUrl || (delivFileUrl?.match(/\.(jpeg|jpg|gif|png|webp|mp4|mov|webm)$/i) ? delivFileUrl : undefined),
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: delivNotes,
    };

    setTimeout(() => {
      dispatch(submitDeliverable({ orderId: order.id, deliverable: newDeliverable }));
      setIsSubmitting(false);
      message.success('Deliverable submitted to brand for escrow approval!');
      setDelivTitle('');
      setDelivFileUrl('');
      setDelivNotes('');
      setDirectVideoUrl('');
      setDirectVideoName('');
      setDirectVideoSize('');
    }, 500);
  };

  const handleReportIssue = () => {
    if (!reportReason.trim()) {
      message.error('Please describe the issue for our support team.');
      return;
    }
    dispatch(
      reportOrderIssue({
        orderId: order.id,
        reporterRole: 'creator',
        category: reportCategory,
        reason: reportReason.trim(),
      })
    );
    dispatch(
      reportIssueToSupport({
        orderId: order.id,
        role: 'creator',
        reporterName: order.creatorName || 'Sophie Kim',
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
      content: 'Confirm that you and the brand have resolved this issue with Support assistance.',
      okText: 'Mark Resolved',
      okButtonProps: { className: '!bg-[#0A0A0A]' },
      onOk: () => {
        dispatch(
          resolveOrderIssue({
            orderId: order.id,
            resolutionNotes: 'Creator confirmed resolution with support.',
          })
        );
        message.success('Issue marked as resolved! Order fulfillment can continue.');
      },
    });
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title={`Fulfilment: ${order.brandName}`}
        subtitle={`Order #${order.id.toUpperCase()} • ${order.packageTitle}`}
        backHref="/creator/dashboard"
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
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white text-[#0A0A0A] border border-[#E7E3D8]">
                      {order.dispute?.caseId || order.dispute?.id || 'SUP-8821'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white">
                      Support Review Active
                    </span>
                    <span className="text-xs text-[#66665E] font-medium">
                      Order #{order.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight mt-1">
                    Support Ticket Under Review
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <Link
                  href="/creator/messages?conv=conv-influverse-support"
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
                Your guaranteed payment of <strong>€{order.basePriceEur}</strong> is held safely in escrow while Support assists both parties in chat.
              </span>
            </div>
          </div>
        )}

        {/* Top Escrow Payout Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/brands/${order.brandId || 'user_brand_01'}`}
                className="hover:opacity-85 transition-opacity shrink-0"
                title="View Brand Profile"
              >
                <BrandLogo
                  name={order.brandName}
                  logoUrl={order.brandLogo}
                  size="lg"
                />
              </Link>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/brands/${order.brandId || 'user_brand_01'}`}
                    className="text-2xl font-extrabold text-[#0A0A0A] hover:text-[#FF2D78] transition-colors tracking-tight flex items-center gap-1.5"
                  >
                    <span>{order.brandName}</span>
                    <ArrowRight className="w-4 h-4 text-[#A3A39C]" />
                  </Link>
                  <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A]">
                    {order.platform}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm flex-wrap">
                  <p className="text-[#66665E] font-medium">{order.packageTitle}</p>
                  <span className="text-[#D2D2CA]">•</span>
                  <Link
                    href={`/brands/${order.brandId || 'user_brand_01'}`}
                    className="text-xs font-bold text-[#FF2D78] hover:underline"
                  >
                    View Brand Profile &amp; Open Briefs
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
              <Link
                href={`/creator/messages?conv=conv-sophie-kim&brandName=${encodeURIComponent(order.brandName)}`}
                className="px-4 py-2.5 rounded-2xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Brand</span>
              </Link>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#66665E] hover:text-[#0A0A0A] font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                title="Report an issue or ask support for assistance"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Help?</span>
              </button>
              <div className="bg-[#FAFAF8] px-5 py-3.5 rounded-2xl border border-[#E7E7E2] text-left sm:text-right">
                <div className="text-sm font-semibold text-[#66665E] uppercase tracking-wider">Your Guaranteed Payout</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">€{order.basePriceEur}</div>
                <div className="text-xs text-[#66665E] font-semibold">100% Escrow Funded by Brand</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Fulfilment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Deliverable Submission Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Submit Deliverable Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">
                    Submit Deliverables
                  </h3>
                  <p className="text-sm text-[#66665E] mt-0.5">
                    Upload or link your completed video draft for brand sign-off.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#FAFAF8] text-[#0A0A0A] border border-[#E7E7E2] flex items-center justify-center shadow-2xs">
                  <Upload className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleDeliverableSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                    Deliverable Asset Name
                  </label>
                  <Input
                    value={delivTitle}
                    onChange={(e) => setDelivTitle(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm py-2"
                    placeholder="e.g. 4K Final Reel Cut + Clean Audio"
                    required
                  />
                </div>

                {/* Delivery Method Switcher */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                    Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                    <button
                      type="button"
                      onClick={() => setSubmissionMode('drive')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        submissionMode === 'drive'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'text-[#66665E] hover:text-[#0A0A0A]'
                      }`}
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Cloud / Drive Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionMode('direct')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        submissionMode === 'direct'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'text-[#66665E] hover:text-[#0A0A0A]'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Direct Video Upload</span>
                    </button>
                  </div>
                </div>

                {/* Option 1: Drive Link */}
                {submissionMode === 'drive' && (
                  <div>
                    <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                      File Download / Drive Link
                    </label>
                    <Input
                      value={delivFileUrl}
                      onChange={(e) => setDelivFileUrl(e.target.value)}
                      className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm py-2 font-sans"
                      placeholder="https://drive.google.com/... or Frame.io, Dropbox link"
                      required
                    />
                    <p className="text-sm text-[#66665E] mt-1 font-medium">
                      Paste a public view/download link to Google Drive, Dropbox, Frame.io, or WeTransfer.
                    </p>
                  </div>
                )}

                {/* Option 2: Direct Video Upload */}
                {submissionMode === 'direct' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-[#0A0A0A]">
                      Upload Video File (MP4, MOV, WebM)
                    </label>

                    {directVideoUrl ? (
                      <div className="rounded-2xl border border-[#E7E7E2] bg-[#FAFAF8] p-4 space-y-3">
                        {/* Video Player Preview */}
                        <div className="rounded-xl overflow-hidden bg-black aspect-video relative flex items-center justify-center shadow-xs">
                          <video
                            src={directVideoUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <Film className="w-4 h-4 text-zinc-700 shrink-0" />
                            <span className="font-bold text-[#0A0A0A] truncate">{directVideoName}</span>
                            <span className="text-[#66665E] shrink-0">({directVideoSize})</span>
                          </div>

                          <label className="text-sm font-bold text-zinc-800 hover:underline cursor-pointer shrink-0 ml-2">
                            <span>Change Video</span>
                            <input
                              type="file"
                              accept="video/mp4,video/quicktime,video/webm"
                              onChange={handleVideoFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-[#E7E7E2] hover:border-[#0A0A0A] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#FAFAF8] hover:bg-white transition-all text-center group">
                        <div className="w-12 h-12 rounded-2xl bg-[#F4F4F0] text-[#0A0A0A] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Video className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-bold text-[#0A0A0A]">
                          Click or drag video file here to upload
                        </div>
                        <div className="text-sm text-[#66665E]">
                          Supports MP4, MOV, ProRes up to 2GB
                        </div>
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm"
                          onChange={handleVideoFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    {directVideoUrl && (
                      <div className="pt-1">
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1">
                          Optional: Google Drive / Cloud Master Link
                        </label>
                        <Input
                          value={delivFileUrl}
                          onChange={(e) => setDelivFileUrl(e.target.value)}
                          className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs py-2 font-sans"
                          placeholder="https://drive.google.com/... (optional uncompressed raw/4K assets)"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                    Creator Notes / Context
                  </label>
                  <Input.TextArea
                    rows={3}
                    value={delivNotes}
                    onChange={(e) => setDelivNotes(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-sm font-sans"
                    placeholder="Provide notes on the video draft, color profile, music rights, or version details..."
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  block
                  className="h-11 rounded-full font-bold text-sm bg-[#0A0A0A] hover:!bg-[#FF2D78] !text-white hover:!text-white border-none shadow-xs cursor-pointer"
                >
                  Submit for Brand Sign-Off & Escrow Release
                </Button>
              </form>
            </div>

            {/* Existing Submissions List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <h3 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">Submitted Assets</h3>
              {order.deliverables.map((deliv) => (
                <div key={deliv.id} className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#0A0A0A]">
                    <span className="font-bold">{deliv.title}</span>
                    <span className="text-sm text-[#66665E] font-medium">{deliv.submittedAt}</span>
                  </div>

                  {/* Inline Video Player if direct video or video URL */}
                  {(deliv.previewUrl || deliv.fileUrl?.includes('.mp4') || deliv.fileUrl?.includes('blob:')) ? (
                    <div className="rounded-xl overflow-hidden bg-black aspect-video max-h-64 shadow-xs">
                      <video
                        src={deliv.previewUrl || deliv.fileUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}

                  {deliv.notes && (
                    <p className="text-sm text-[#555550] bg-white p-3 rounded-xl border border-[#E7E7E2] italic leading-relaxed">
                      &ldquo;{deliv.notes}&rdquo;
                    </p>
                  )}

                  {deliv.fileUrl && (
                    <div className="pt-1">
                      <a
                        href={deliv.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0A0A0A] font-bold inline-flex items-center gap-1.5 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open High-Resolution File / Download Link</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Brief & Chat */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brief Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#66665E]">
                Agreed Brief & Requirements
              </h3>
              <p className="text-sm text-[#44443E] bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2] leading-relaxed">
                {order.brief}
              </p>
              <ul className="space-y-2 text-sm text-[#0A0A0A] pt-1">
                {order.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

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

              {/* Brand Preview */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2]">
                <BrandLogo
                  name={order.brandName}
                  logoUrl={order.brandLogo}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-sm text-[#0A0A0A] truncate block">{order.brandName}</span>
                  <p className="text-xs text-[#66665E] truncate">Verified Brand Partner</p>
                </div>
              </div>

              {/* Info Note */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE7DF] text-xs text-[#66665E] leading-relaxed space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-[#0A0A0A]">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Centralized Messaging</span>
                </div>
                <p>
                  All project updates, brief questions, and deliverable feedback with {order.brandName} are handled in your dedicated Messages inbox to avoid duplicate threads and keep full escrow protections active.
                </p>
              </div>

              {/* Primary Action Button */}
              <Link
                href={`/creator/messages?conv=conv-sophie-kim&brandName=${encodeURIComponent(order.brandName)}`}
                className="w-full h-11 rounded-2xl bg-[#0A0A0A] hover:bg-[#FF2D78] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs group/msg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Conversation in Messages</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/msg:translate-x-1" />
              </Link>
            </div>

            {/* Brand Review (if submitted) */}
            {order.reviewSubmitted && (
              <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#0A0A0A]">Brand Review</h3>
                  <div className="flex text-amber-500">
                    {[...Array(order.reviewSubmitted.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#555550] italic bg-[#FAFAF8] p-4 rounded-2xl border border-[#E7E7E2] leading-relaxed">
                  &ldquo;{order.reviewSubmitted.comment}&rdquo;
                </p>
                <span className="text-xs text-[#66665E] block">
                  Submitted {order.reviewSubmitted.date}
                </span>
              </div>
            )}

            {/* Escrow & Payout Safety */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                  Guaranteed Payout
                </h4>
              </div>
              <p className="text-xs text-[#66665E] leading-relaxed">
                Your payout of €{order.basePriceEur.toLocaleString()} is securely funded in Influverse Escrow. As soon as the brand signs off on the deliverables, funds are immediately credited to your creator balance.
              </p>
            </div>
          </div>
        </div>
      </div>

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
            Need help? Our Trust & Support team mediates between brands and creators. If the brand is unresponsive, requests out-of-scope work, or changes requirements, submit a report here and our team will step in to assist both parties.
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
                { value: 'Brand Unresponsive / Feedback Delayed', label: 'Brand is unresponsive or feedback is delayed' },
                { value: 'Unreasonable / Out-of-Scope Revision Request', label: 'Unreasonable or out-of-scope revision requested' },
                { value: 'Creative Brief Changed After Work Started', label: 'Brief was changed after project started' },
                { value: 'Payment or Escrow Disbursement Inquiry', label: 'Payment or escrow disbursement inquiry' },
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
              placeholder="Explain what happened or what assistance you need from Influverse Support..."
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
