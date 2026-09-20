'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  submitDeliverable,
  addMessageToOrder,
} from '@/redux/slices/orderSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { OrderDeliverable } from '@/types';
import {
  Video,
  Upload,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  FileCheck,
  Sparkles,
  Link2,
  Film,
  X,
  Play,
} from 'lucide-react';
import { Button, Input, message } from 'antd';
import { BrandLogo } from '@/components/shared/BrandLogo';

export default function CreatorOrderFulfilmentPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const orderId = params?.id as string;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [delivTitle, setDelivTitle] = useState('Campaign Final Video Cut (9:16 4K)');
  const [submissionMode, setSubmissionMode] = useState<'drive' | 'direct'>('drive');
  const [delivFileUrl, setDelivFileUrl] = useState('https://drive.google.com/drive/folders/influverse-demo-draft');
  const [directVideoFile, setDirectVideoFile] = useState<File | null>(null);
  const [directVideoUrl, setDirectVideoUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [directVideoName, setDirectVideoName] = useState<string>('Sophie_NordicGlow_FinalCut_4K.mp4');
  const [directVideoSize, setDirectVideoSize] = useState<string>('38.6 MB');
  const [delivNotes, setDelivNotes] = useState('Here is the final cut with both color grades and clean uncompressed audio.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [chatMessage, setChatMessage] = useState('');

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDirectVideoFile(file);
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
      setDirectVideoFile(null);
      setDirectVideoUrl('');
      setDirectVideoName('');
      setDirectVideoSize('');
    }, 500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    dispatch(
      addMessageToOrder({
        orderId: order.id,
        message: {
          id: `msg-${Date.now()}`,
          senderId: 'creator-01',
          senderName: order.creatorName,
          senderAvatar: order.creatorAvatar,
          senderRole: 'creator',
          text: chatMessage.trim(),
          timestamp: 'Just now',
        },
      })
    );
    setChatMessage('');
    message.success('Message sent');
  };

  return (
    <div className="min-h-screen pb-16">
      <WorkspaceHeader
        title={`Fulfilment: ${order.brandName}`}
        subtitle={`Order #${order.id.toUpperCase()} • ${order.packageTitle}`}
        backHref="/creator/dashboard"
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 font-sans">
        {/* Top Escrow Payout Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <BrandLogo
                name={order.brandName}
                logoUrl={order.brandLogo}
                size="lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">{order.brandName}</h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E2] text-[#0A0A0A]">
                    {order.platform}
                  </span>
                </div>
                <p className="text-sm text-[#73736A] font-medium">{order.packageTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto bg-[#FAFAF8] px-5 py-3.5 rounded-2xl border border-[#E7E7E2]">
              <div className="text-left sm:text-right">
                <div className="text-xs font-semibold text-[#73736A] uppercase tracking-wider">Your Guaranteed Payout</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">€{order.basePriceEur}</div>
                <div className="text-xs text-[#23744D] font-semibold">100% Escrow Funded by Brand</div>
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
                  <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                    Submit Deliverables
                  </h3>
                  <p className="text-sm text-[#73736A] mt-0.5">
                    Upload or link your completed video draft for brand sign-off.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center shadow-2xs">
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
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        submissionMode === 'drive'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'text-[#73736A] hover:text-[#0A0A0A]'
                      }`}
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Cloud / Drive Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionMode('direct')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        submissionMode === 'direct'
                          ? 'bg-[#0A0A0A] text-white shadow-xs'
                          : 'text-[#73736A] hover:text-[#0A0A0A]'
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
                    <p className="text-[11px] text-[#73736A] mt-1 font-medium">
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
                            <Film className="w-4 h-4 text-[#FF2D78] shrink-0" />
                            <span className="font-bold text-[#0A0A0A] truncate">{directVideoName}</span>
                            <span className="text-[#73736A] shrink-0">({directVideoSize})</span>
                          </div>

                          <label className="text-xs font-bold text-[#FF2D78] hover:underline cursor-pointer shrink-0 ml-2">
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
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Video className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-[#0A0A0A]">
                          Click or drag video file here to upload
                        </div>
                        <div className="text-[11px] text-[#73736A]">
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
                        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
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
              <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">Submitted Assets ({order.deliverables.length})</h3>
              {order.deliverables.map((deliv) => (
                <div key={deliv.id} className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#0A0A0A]">
                    <span className="font-bold">{deliv.title}</span>
                    <span className="text-xs text-[#73736A] font-medium">{deliv.submittedAt}</span>
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
                    <p className="text-xs text-[#555550] bg-white p-3 rounded-xl border border-[#E7E7E2] italic leading-relaxed">
                      &ldquo;{deliv.notes}&rdquo;
                    </p>
                  )}

                  {deliv.fileUrl && (
                    <div className="pt-1">
                      <a
                        href={deliv.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#FF2D78] font-bold inline-flex items-center gap-1.5 hover:underline"
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
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#73736A]">
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

            {/* Chat Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs flex flex-col h-[480px]">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E7E2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAFAF8] border border-[#E7E7E2] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                    Brand Chat
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#23744D] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-3.5 space-y-3 text-sm font-sans">
                {order.messages.map((msg) => {
                  const isMe = msg.senderRole === 'creator';
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

              <form onSubmit={handleSendChat} className="pt-3 border-t border-[#E7E7E2] flex gap-2">
                <input
                  type="text"
                  placeholder="Type message to brand..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
