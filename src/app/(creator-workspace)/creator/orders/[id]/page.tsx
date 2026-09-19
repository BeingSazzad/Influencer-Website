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
} from 'lucide-react';
import { Button, Input, message } from 'antd';

export default function CreatorOrderFulfilmentPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const orderId = params?.id as string;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [delivTitle, setDelivTitle] = useState('Campaign Final Video Cut (9:16 4K)');
  const [delivFileUrl, setDelivFileUrl] = useState('https://drive.google.com/drive/folders/influverse-demo-draft');
  const [delivPreviewUrl, setDelivPreviewUrl] = useState('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800');
  const [delivNotes, setDelivNotes] = useState('Here is the final cut with both color grades and clean uncompressed audio.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [chatMessage, setChatMessage] = useState('');

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newDeliverable: OrderDeliverable = {
      id: `deliv-${Date.now()}`,
      title: delivTitle,
      fileUrl: delivFileUrl,
      previewUrl: delivPreviewUrl,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: delivNotes,
    };

    setTimeout(() => {
      dispatch(submitDeliverable({ orderId: order.id, deliverable: newDeliverable }));
      setIsSubmitting(false);
      message.success('Deliverable submitted to brand for escrow approval!');
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

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
        {/* Top Escrow Payout Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={order.brandLogo}
                alt={order.brandName}
                className="w-14 h-14 rounded-full object-cover border border-[#E7E7E2]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#151515]">{order.brandName}</h2>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EAEAE3] text-[#151515]">
                    {order.platform}
                  </span>
                </div>
                <p className="text-xs text-[#555550] mt-0.5">{order.packageTitle}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-[#73736A]">Your Guaranteed Payout:</div>
              <div className="text-2xl font-black text-[#151515]">€{order.basePriceEur}</div>
              <div className="text-[10px] text-[#23744D] font-bold">100% Escrow Funded by Brand</div>
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
                  <h3 className="text-base font-black text-[#151515]">
                    Submit Deliverables
                  </h3>
                  <p className="text-xs text-[#73736A]">
                    Upload or link your completed video draft for brand sign-off.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
              </div>

              <form onSubmit={handleDeliverableSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#151515] mb-1">
                    Deliverable Asset Name
                  </label>
                  <Input
                    value={delivTitle}
                    onChange={(e) => setDelivTitle(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151515] mb-1">
                    File Download / Drive Link
                  </label>
                  <Input
                    value={delivFileUrl}
                    onChange={(e) => setDelivFileUrl(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151515] mb-1">
                    Preview Image URL
                  </label>
                  <Input
                    value={delivPreviewUrl}
                    onChange={(e) => setDelivPreviewUrl(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151515] mb-1">
                    Creator Notes / Context
                  </label>
                  <Input.TextArea
                    rows={3}
                    value={delivNotes}
                    onChange={(e) => setDelivNotes(e.target.value)}
                    className="bg-[#FAFAF8] border-[#E7E7E2] rounded-xl text-xs"
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  block
                  className="h-11 rounded-full font-bold text-xs bg-[#151515] hover:!bg-[#2B7FFF] text-white border-none shadow-none"
                >
                  Submit for Brand Sign-Off & Escrow Release
                </Button>
              </form>
            </div>

            {/* Existing Submissions List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E2] shadow-2xs space-y-4">
              <h3 className="text-base font-black text-[#151515]">Submitted Assets ({order.deliverables.length})</h3>
              {order.deliverables.map((deliv) => (
                <div key={deliv.id} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E2] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#151515]">
                    <span>{deliv.title}</span>
                    <span className="text-[10px] text-[#73736A]">{deliv.submittedAt}</span>
                  </div>
                  {deliv.previewUrl && (
                    <img src={deliv.previewUrl} alt="Preview" className="rounded-xl h-44 w-full object-cover" />
                  )}
                  {deliv.fileUrl && (
                    <a
                      href={deliv.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#2B7FFF] font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Open File Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Brief & Chat */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brief Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#73736A]">
                Agreed Brief & Requirements
              </h3>
              <p className="text-xs text-[#555550] bg-[#FAFAF8] p-3 rounded-xl border border-[#E7E7E2]">
                {order.brief}
              </p>
              <ul className="space-y-1 text-xs text-[#555550]">
                {order.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#151515]" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7E7E2] shadow-2xs flex flex-col h-[400px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E2]">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#151515]">
                  Brand Chat
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs">
                {order.messages.map((msg) => {
                  const isMe = msg.senderRole === 'creator';
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

              <form onSubmit={handleSendChat} className="pt-3 border-t border-[#E7E7E2] flex gap-2">
                <input
                  type="text"
                  placeholder="Type message to brand..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAFAF8] border border-[#E7E7E2] rounded-xl outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#151515] text-white rounded-xl transition-colors cursor-pointer"
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
