'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  sendMessage,
  setActiveConversationId,
  getOrCreateConversation,
  markConversationAsRead,
  deleteMessage,
  deleteConversation,
  MessageAttachment,
} from '@/redux/slices/messageSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  MessageSquare,
  Search,
  Send,
  PlusCircle,
  ExternalLink,
  MapPin,
  Paperclip,
  FileText,
  Film,
  Download,
  X,
  UploadCloud,
  Check,
  CheckCheck,
  Trash2,
} from 'lucide-react';
import { Button, Popconfirm, message } from 'antd';

function BrandMessagesContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { conversations, activeConversationId } = useAppSelector((state) => state.message);
  const { creators } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If a creatorId query param is provided, open or create conversation with that creator
  useEffect(() => {
    const creatorIdParam = searchParams.get('creatorId');
    if (creatorIdParam) {
      const targetCreator = creators.find(
        (c) =>
          c.id === creatorIdParam ||
          c.handle.toLowerCase() === creatorIdParam.toLowerCase() ||
          c.handle.replace('@', '').toLowerCase() === creatorIdParam.toLowerCase()
      );
      if (targetCreator) {
        dispatch(
          getOrCreateConversation({
            creatorId: targetCreator.id,
            creatorName: targetCreator.name,
            creatorHandle: targetCreator.handle,
            creatorAvatar: targetCreator.avatar,
            creatorLocation: targetCreator.location,
            brandId: currentUser?.id || 'user_brand_01',
            brandName: currentUser?.companyName || 'Aura Skincare Paris',
            brandAvatar:
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
          })
        );
      }
    }
  }, [searchParams, creators, currentUser, dispatch]);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0] || null;

  // Mark incoming messages as read when viewing this conversation
  useEffect(() => {
    if (activeConv && activeConv.unreadCountBrand > 0) {
      dispatch(markConversationAsRead({ conversationId: activeConv.id, role: 'brand' }));
    }
  }, [activeConv?.id, activeConv?.unreadCountBrand, dispatch]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping, pendingAttachments]);

  const filteredConversations = conversations.filter((c) =>
    c.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase())
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

    const brandName = currentUser?.companyName || currentUser?.name || 'Aura Skincare Paris';
    const brandAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80';

    const attachmentsToSend = pendingAttachments.length > 0 ? [...pendingAttachments] : undefined;

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        text,
        senderId: currentUser?.id || 'user_brand_01',
        senderName: brandName,
        senderAvatar: brandAvatar,
        senderRole: 'brand',
        attachments: attachmentsToSend,
      })
    );

    if (textToSend === undefined) {
      setInputText('');
    }
    setPendingAttachments([]);

    // Realistic simulated interactive response after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses =
        attachmentsToSend && attachmentsToSend.length > 0
          ? [
              `Thanks for attaching "${attachmentsToSend[0].name}"! I've downloaded it and will follow the brief guidelines precisely.`,
              `Received the campaign materials! Looking over the references now. Everything looks super clear.`,
              `Files received! I'm prepping the production schedule to deliver on time.`,
            ]
          : [
              `Thanks for reaching out, ${currentUser?.name?.split(' ')[0] || 'Elena'}! That sounds like a wonderful campaign. I'd love to review your brief requirements.`,
              `Hi! Yes, I have open production slots next week. Send over the offer details and we can lock in the schedule.`,
              `Sounds exciting! Could you let me know if product samples will be shipped to Berlin or provided as a promo voucher?`,
              `Perfect! I've worked with similar organic beauty brands before. Feel free to review my package tiers or send a customized rate offer.`,
            ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      dispatch(
        sendMessage({
          conversationId: activeConv.id,
          text: randomResponse,
          senderId: activeConv.creatorId,
          senderName: activeConv.creatorName,
          senderAvatar: activeConv.creatorAvatar,
          senderRole: 'creator',
        })
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-12 font-sans flex flex-col">
      <WorkspaceHeader
        title="Direct Messages"
        subtitle="Real-time communication with verified creators to align on creative briefs and custom deliverables."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto flex-1">
        <div className="bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs overflow-hidden flex flex-col lg:flex-row h-[720px]">
          {/* LEFT COLUMN: Conversation List */}
          <div className="w-full lg:w-80 xl:w-96 border-r border-[#E7E7E2] flex flex-col bg-[#FAFAF8]">
            {/* Search Header */}
            <div className="p-4 border-b border-[#E7E7E2] bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#73736A]">
                  Conversations
                </span>
                <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
                  Active Inbox
                </span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-[#73736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-sm font-medium rounded-xl border border-[#E7E7E2] bg-[#FAFAF8] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Conversations Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#E7E7E2]/60">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const isSelected = activeConv?.id === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => dispatch(setActiveConversationId(conv.id))}
                      className={`group w-full p-3.5 sm:p-4 flex items-start gap-3 text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-white border-l-4 border-l-[#0A0A0A] shadow-2xs'
                          : 'hover:bg-[#F4F4F0]'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.creatorAvatar}
                          alt={conv.creatorName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-sm font-bold text-[#0A0A0A] truncate">
                              {conv.creatorName}
                            </span>
                            <VerifiedBadge size="xs" />
                          </div>
                          <span className="text-xs text-[#73736A] shrink-0 font-medium">
                            {conv.lastMessageTimestamp}
                          </span>
                        </div>

                        <div className="text-xs text-[#73736A] font-medium truncate mb-1">
                          @{conv.creatorHandle}
                        </div>

                        <div className="text-xs text-[#73736A] truncate leading-snug">
                          {conv.lastMessage}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-1">
                        {conv.unreadCountBrand > 0 ? (
                          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold flex items-center justify-center">
                            {conv.unreadCountBrand}
                          </span>
                        ) : (
                          <span className="w-2 h-2" />
                        )}

                        <div onClick={(e) => e.stopPropagation()}>
                          <Popconfirm
                            title="Delete conversation?"
                            description="Remove this thread from your inbox?"
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true, size: 'small' }}
                            cancelButtonProps={{ size: 'small' }}
                            onConfirm={() => {
                              dispatch(deleteConversation({ conversationId: conv.id }));
                              message.success('Conversation removed');
                            }}
                          >
                            <button
                              type="button"
                              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                              title="Delete conversation"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
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
              {/* Chat Thread Header */}
              <div className="p-4 sm:px-6 border-b border-[#E7E7E2] flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeConv.creatorAvatar}
                    alt={activeConv.creatorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E7E7E2] shrink-0"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm sm:text-base font-bold text-[#0A0A0A] truncate">
                        {activeConv.creatorName}
                      </h2>
                      <VerifiedBadge size="xs" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#73736A]">
                      <span>@{activeConv.creatorHandle}</span>
                      {activeConv.creatorLocation && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 truncate">
                            <MapPin className="w-3 h-3 text-[#A3A39C]" />
                            <span>{activeConv.creatorLocation}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Popconfirm
                    title="Delete entire conversation?"
                    description="Permanently delete this entire conversation and message history?"
                    okText="Delete Thread"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => {
                      dispatch(deleteConversation({ conversationId: activeConv.id }));
                      message.success('Conversation deleted');
                    }}
                  >
                    <Button
                      type="default"
                      danger
                      className="h-9 px-3 rounded-full text-sm font-semibold border-rose-200 text-rose-600 hover:border-rose-400 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Delete entire conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">Delete Thread</span>
                    </Button>
                  </Popconfirm>

                  <Link href={`/creators/${activeConv.creatorId}`}>
                    <Button
                      type="default"
                      className="h-9 px-3.5 rounded-full text-sm font-bold border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#73736A]" />
                      <span className="hidden sm:inline">View Profile</span>
                    </Button>
                  </Link>

                  <Link href={`/brand/hire/new?creatorId=${activeConv.creatorId}`}>
                    <Button
                      type="primary"
                      className="h-9 px-4 rounded-full text-sm font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Send Offer</span>
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
                    <p className="font-bold text-base text-[#0A0A0A]">Drop Files Here to Share</p>
                    <p className="text-sm text-[#73736A] mt-1">
                      Upload campaign briefs, moodboards, contract drafts, or brand guidelines
                    </p>
                  </div>
                )}

                <div className="text-center my-2">
                  <span className="px-3 py-1 rounded-full bg-[#EAEAE3] text-[#73736A] text-xs font-bold uppercase tracking-wider">
                    Collaboration Channel Opened
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isBrand = msg.senderRole === 'brand';
                  return (
                    <div
                      key={msg.id}
                      className={`group flex gap-2.5 sm:gap-3 max-w-[88%] sm:max-w-[75%] relative ${
                        isBrand ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0 mt-1"
                      />

                      <div className={`space-y-1.5 ${isBrand ? 'text-right' : 'text-left'}`}>
                        {/* Header: Sender name, timestamp, and read status for outgoing messages */}
                        <div
                          className={`flex items-center gap-1.5 text-xs text-[#73736A] font-medium px-1 ${
                            isBrand ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="font-bold text-[#0A0A0A]">{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>

                          {/* Read/Delivered/Sent status badge for own brand messages */}
                          {isBrand && (
                            <span className="inline-flex items-center gap-0.5 ml-1">
                              {msg.status === 'read' ? (
                                <span
                                  className="inline-flex items-center gap-0.5 text-sky-500 font-semibold"
                                  title="Read by creator"
                                >
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Read</span>
                                </span>
                              ) : msg.status === 'delivered' ? (
                                <span
                                  className="inline-flex items-center gap-0.5 text-zinc-400"
                                  title="Delivered to creator"
                                >
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Delivered</span>
                                </span>
                              ) : (
                                <span
                                  className="inline-flex items-center gap-0.5 text-zinc-400"
                                  title="Sent"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Sent</span>
                                </span>
                              )}
                            </span>
                          )}
                        </div>

                        {/* Message content wrapper with Delete action on hover */}
                        <div
                          className={`flex items-center gap-2 ${
                            isBrand ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Message Text */}
                            {msg.text && (
                              <div
                                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                                  isBrand
                                    ? 'bg-[#0A0A0A] text-white rounded-tr-xs'
                                    : 'bg-white text-[#0A0A0A] border border-[#E7E7E2] shadow-2xs rounded-tl-xs'
                                }`}
                              >
                                {msg.text}
                              </div>
                            )}

                            {/* File Attachments */}
                            {msg.attachments && msg.attachments.length > 0 && (
                              <div
                                className={`flex flex-col gap-2 ${
                                  isBrand ? 'items-end' : 'items-start'
                                }`}
                              >
                                {msg.attachments.map((att) => (
                                  <div key={att.id} className="max-w-[340px] sm:max-w-[380px] w-full">
                                    {att.type === 'image' ? (
                                      <div className="rounded-2xl overflow-hidden border border-[#E7E7E2] bg-white shadow-2xs group/img relative">
                                        <img
                                          src={att.url}
                                          alt={att.name}
                                          className="w-full max-h-56 object-cover group-hover/img:scale-102 transition-transform duration-300"
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
                                          isBrand
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
                                              isBrand ? 'text-zinc-400' : 'text-[#73736A]'
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
                                            isBrand
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

                          {/* Delete Single Message Action */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0">
                            <Popconfirm
                              title="Delete message?"
                              description="Remove this message from chat history?"
                              okText="Delete"
                              cancelText="Cancel"
                              okButtonProps={{ danger: true, size: 'small' }}
                              cancelButtonProps={{ size: 'small' }}
                              onConfirm={() => {
                                dispatch(deleteMessage({ conversationId: activeConv.id, messageId: msg.id }));
                                message.success('Message deleted');
                              }}
                            >
                              <button
                                type="button"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Creator Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2 items-center text-sm text-[#73736A] italic bg-white px-3 py-2 rounded-full border border-[#E7E7E2] w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 font-medium">{activeConv.creatorName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Pending Attachments Preview Tray */}
              {pendingAttachments.length > 0 && (
                <div className="px-4 py-2.5 bg-[#FAFAF8] border-t border-[#E7E7E2] flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73736A] shrink-0">
                    Files to Send ({pendingAttachments.length}):
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
                  title="Attach Campaign Brief, Moodboard or Files (PDF, Images, Video, Zip)"
                  className="w-11 h-11 rounded-full bg-[#FAFAF8] hover:bg-[#F4F4F0] border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#73736A] hover:text-[#0A0A0A] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs group"
                >
                  <Paperclip className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
                </button>

                <input
                  type="text"
                  placeholder={`Write a message to ${activeConv.creatorName}...`}
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
                title="No Conversation Selected"
                description="Select a creator from the left list or click Message on any creator card to start a direct inquiry."
                variant="dashed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrandMessagesPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center font-sans text-sm font-bold text-[#73736A]">
          Loading direct messages...
        </div>
      }
    >
      <BrandMessagesContent />
    </React.Suspense>
  );
}
