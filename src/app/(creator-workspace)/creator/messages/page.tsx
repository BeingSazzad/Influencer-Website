'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  sendMessage,
  setActiveConversationId,
  MessageAttachment,
} from '@/redux/slices/messageSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { BrandLogo } from '@/components/shared/BrandLogo';
import {
  MessageSquare,
  Search,
  Send,
  Building2,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Paperclip,
  FileText,
  Film,
  Download,
  X,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { Button } from 'antd';

export default function CreatorMessagesPage() {
  const dispatch = useAppDispatch();
  const { conversations, activeConversationId } = useAppSelector((state) => state.message);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations relevant to creator
  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0] || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping, pendingAttachments]);

  const filteredConversations = conversations.filter(
    (c) =>
      c.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFiles = (files: File[]) => {
    const newItems: MessageAttachment[] = files.map((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isArchive = file.name.toLowerCase().endsWith('.zip') || file.name.toLowerCase().endsWith('.rar');
      const type: MessageAttachment['type'] = isImage ? 'image' : isVideo ? 'video' : isPdf ? 'pdf' : isArchive ? 'archive' : 'document';

      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024) || 1} KB`;

      return {
        id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: sizeStr,
        type,
        url: URL.createObjectURL(file),
      };
    });

    setPendingAttachments((prev) => [...prev, ...newItems]);
  };

  const removePendingAttachment = (id: string) => {
    setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if ((!text && pendingAttachments.length === 0) || !activeConv) return;

    const creatorName = currentUser?.name || 'Sophie Kim';
    const creatorAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

    const attachmentsToSend = pendingAttachments.length > 0 ? [...pendingAttachments] : undefined;

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        text,
        senderId: currentUser?.id || 'creator-01',
        senderName: creatorName,
        senderAvatar: creatorAvatar,
        senderRole: 'creator',
        attachments: attachmentsToSend,
      })
    );

    if (textToSend === undefined) {
      setInputText('');
    }
    setPendingAttachments([]);

    // Realistic simulated interactive response from the brand after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses =
        attachmentsToSend && attachmentsToSend.length > 0
          ? [
              `Received "${attachmentsToSend[0].name}"! Our team is reviewing the submission with the campaign director right away.`,
              `Awesome, thank you for uploading this! Checking deliverables against our creative brief specs now.`,
              `Files received in great quality! Everything looks right on schedule. Thank you!`,
            ]
          : [
              `Thanks for the update, ${creatorName.split(' ')[0]}! We'll review this with our creative director today.`,
              `That timeline works wonderfully for our campaign schedule. Looking forward to the draft!`,
              `Understood! We'll make sure the product sample shipment tracking code is sent over right away.`,
            ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      dispatch(
        sendMessage({
          conversationId: activeConv.id,
          text: randomResponse,
          senderId: activeConv.brandId,
          senderName: activeConv.brandName,
          senderAvatar: activeConv.brandAvatar,
          senderRole: 'brand',
        })
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-12 font-sans flex flex-col">
      <WorkspaceHeader
        title="Brand Messages"
        subtitle="Communicate directly with campaign managers and discuss creative briefs."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto flex-1">
        <div className="bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs overflow-hidden flex flex-col lg:flex-row h-[720px]">
          {/* LEFT COLUMN: Conversation List */}
          <div className="w-full lg:w-80 xl:w-96 border-r border-[#E7E7E2] flex flex-col bg-[#FAFAF8]">
            <div className="p-4 border-b border-[#E7E7E2] bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#73736A]">
                  Conversations
                </span>
                <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                  Direct Chat
                </span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-sm font-medium rounded-xl border border-[#E7E7E2] bg-[#FAFAF8] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#E7E7E2]/60">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const isSelected = activeConv?.id === conv.id;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => dispatch(setActiveConversationId(conv.id))}
                      className={`w-full p-4 flex items-start gap-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-l-4 border-l-[#0A0A0A] shadow-2xs'
                          : 'hover:bg-[#F4F4F0]'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.brandAvatar}
                          alt={conv.brandName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-sm font-bold text-[#0A0A0A] truncate">
                            {conv.brandName}
                          </span>
                          <span className="text-sm text-[#73736A] shrink-0 font-medium">
                            {conv.lastMessageTimestamp}
                          </span>
                        </div>

                        <div className="text-sm text-[#73736A] truncate leading-snug">
                          {conv.lastMessage}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-sm text-[#73736A] font-medium">
                  No conversations match your search.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Chat Thread */}
          {activeConv ? (
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-4 sm:px-6 border-b border-[#E7E7E2] flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeConv.brandAvatar}
                    alt={activeConv.brandName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                  />
                  <div className="truncate">
                    <h2 className="text-sm sm:text-2xl font-extrabold text-[#0A0A0A] truncate">
                      {activeConv.brandName}
                    </h2>
                    <div className="text-sm text-[#73736A]">Verified Brand Partner</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/creator/orders">
                    <Button
                      type="default"
                      className="h-9 px-3.5 rounded-full text-sm font-bold border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#73736A]" />
                      <span className="hidden sm:inline">Active Orders</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Message Stream */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFAF8] relative transition-colors ${
                  isDragging ? 'bg-[#EEF7F2]/50 border-2 border-dashed border-[#23744D]' : ''
                }`}
              >
                {isDragging && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                    <div className="w-16 h-16 rounded-3xl bg-[#EEF7F2] text-[#23744D] flex items-center justify-center mb-3 animate-bounce">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-base text-[#0A0A0A]">Drop Files Here to Submit</p>
                    <p className="text-sm text-[#73736A] mt-1">
                      Upload campaign briefs, raw footage, video edits, images, or documents
                    </p>
                  </div>
                )}

                <div className="text-center my-2">
                  <span className="px-3 py-1 rounded-full bg-[#EAEAE3] text-[#73736A] text-xs font-bold uppercase tracking-wider">
                    Direct Brand Channel
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isCreator = msg.senderRole === 'creator';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[88%] sm:max-w-[75%] ${
                        isCreator ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0 mt-1"
                      />

                      <div className={`space-y-1.5 ${isCreator ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2 text-sm text-[#73736A] font-medium px-1">
                          <span className="font-bold text-[#0A0A0A]">{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        {/* Text Content */}
                        {msg.text && (
                          <div
                            className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                              isCreator
                                ? 'bg-[#0A0A0A] text-white rounded-tr-xs'
                                : 'bg-white text-[#0A0A0A] border border-[#E7E7E2] shadow-2xs rounded-tl-xs'
                            }`}
                          >
                            {msg.text}
                          </div>
                        )}

                        {/* File Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className={`flex flex-col gap-2 ${isCreator ? 'items-end' : 'items-start'}`}>
                            {msg.attachments.map((att) => (
                              <div key={att.id} className="max-w-[340px] sm:max-w-[380px] w-full">
                                {att.type === 'image' ? (
                                  <div className="rounded-2xl overflow-hidden border border-[#E7E7E2] bg-white shadow-2xs group relative">
                                    <img
                                      src={att.url}
                                      alt={att.name}
                                      className="w-full max-h-56 object-cover group-hover:scale-102 transition-transform duration-300"
                                    />
                                    <div className="p-2.5 bg-white border-t border-[#E7E7E2] flex items-center justify-between gap-2">
                                      <div className="min-w-0 text-left">
                                        <p className="text-sm font-bold text-[#0A0A0A] truncate">{att.name}</p>
                                        <p className="text-sm text-[#73736A]">{att.size}</p>
                                      </div>
                                      <a
                                        href={att.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-1.5 rounded-lg bg-[#FAFAF8] hover:bg-zinc-200 text-[#0A0A0A] transition-colors"
                                        title="Open full size"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </a>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
                                      isCreator
                                        ? 'bg-[#18181B] text-white border border-zinc-800'
                                        : 'bg-white text-[#0A0A0A] border border-[#E7E7E2] shadow-2xs'
                                    }`}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                        att.type === 'pdf'
                                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                          : att.type === 'video'
                                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                                      }`}
                                    >
                                      {att.type === 'pdf' ? (
                                        <FileText className="w-5 h-5" />
                                      ) : att.type === 'video' ? (
                                        <Film className="w-5 h-5" />
                                      ) : (
                                        <Paperclip className="w-5 h-5" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                      <p className="text-sm font-bold truncate leading-tight">{att.name}</p>
                                      <p
                                        className={`text-xs font-sans mt-0.5 ${
                                          isCreator ? 'text-zinc-400' : 'text-[#73736A]'
                                        }`}
                                      >
                                        {att.size} • {att.type.toUpperCase()}
                                      </p>
                                    </div>
                                    <a
                                      href={att.url}
                                      download={att.name}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                                        isCreator
                                          ? 'bg-white/10 hover:bg-white/20 text-white'
                                          : 'bg-[#FAFAF8] hover:bg-[#F4F4F0] text-[#0A0A0A] border border-[#E7E7E2]'
                                      }`}
                                      title="Download file"
                                    >
                                      <Download className="w-4 h-4" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex gap-2 items-center text-sm text-[#73736A] italic bg-white px-3 py-2 rounded-full border border-[#E7E7E2] w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 font-medium">{activeConv.brandName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Pending Attachments Preview Tray */}
              {pendingAttachments.length > 0 && (
                <div className="px-4 py-2.5 bg-[#FAFAF8] border-t border-[#E7E7E2] flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] shrink-0">
                    Files to Submit ({pendingAttachments.length}):
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {pendingAttachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E7E7E2] shadow-2xs text-xs"
                      >
                        {att.type === 'image' ? (
                          <div className="w-6 h-6 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-[#E7E7E2]">
                            <img src={att.url} alt={att.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0">
                            {att.type === 'pdf' ? (
                              <FileText className="w-3.5 h-3.5 text-rose-500" />
                            ) : att.type === 'video' ? (
                              <Film className="w-3.5 h-3.5 text-purple-500" />
                            ) : (
                              <Paperclip className="w-3.5 h-3.5 text-zinc-600" />
                            )}
                          </div>
                        )}
                        <div className="max-w-[130px] truncate">
                          <p className="font-bold text-[#0A0A0A] truncate text-xs">{att.name}</p>
                          <p className="text-sm text-[#73736A]">{att.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePendingAttachment(att.id)}
                          className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 border-t border-[#E7E7E2] bg-white flex items-center gap-2 sm:gap-3"
              >
                {/* Hidden File Picker */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  accept="image/*,video/*,.pdf,.doc,.docx,.zip,.rar,.txt"
                  className="hidden"
                />

                {/* File Attachment / Submit Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Submit File or Deliverables (PDF, Images, Video, Zip)"
                  className="w-11 h-11 rounded-full bg-[#FAFAF8] hover:bg-[#F4F4F0] border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#73736A] hover:text-[#0A0A0A] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs group"
                >
                  <Paperclip className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
                </button>

                <input
                  type="text"
                  placeholder={`Write a reply to ${activeConv.brandName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 h-11 px-4 text-sm font-sans rounded-full bg-[#FAFAF8] border border-[#E7E7E2] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() && pendingAttachments.length === 0}
                  className="h-11 px-5 rounded-full font-bold text-xs bg-[#0A0A0A] hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
              <EmptyState
                color="neutral"
                icon={<MessageSquare className="w-8 h-8" />}
                badge="Inbox Clear"
                title="No Brand Conversations Yet"
                description="When brands inquire about your packages, their chat threads will appear here."
                variant="dashed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
