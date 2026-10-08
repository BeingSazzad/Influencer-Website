'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  sendMessage,
  setActiveConversationId,
  markConversationAsRead,
  deleteMessage,
  deleteConversation,
  clearMessages,
  MessageAttachment,
  ChatCustomOffer,
} from '@/redux/slices/messageSlice';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { CustomOfferCard } from '@/components/shared/CustomOfferCard';
import {
  MessageSquare,
  Search,
  Send,
  ExternalLink,
  ShoppingBag,
  Paperclip,
  FileText,
  Film,
  Download,
  X,
  UploadCloud,
  Check,
  CheckCheck,
  Trash2,
  MoreVertical,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { Button, Popconfirm, message, Dropdown, Modal, Input, Select } from 'antd';
import { PlatformType } from '@/types';

export default function CreatorMessagesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { conversations, activeConversationId } = useAppSelector((state) => state.message);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDeliverables, setOfferDeliverables] = useState('');
  const [offerPrice, setOfferPrice] = useState<number | null>(null);
  const [offerPlatform, setOfferPlatform] = useState<PlatformType>('instagram');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations relevant to creator
  const currentCreatorHandle = (currentUser?.handle || 'sophiekim').replace('@', '').toLowerCase();
  const creatorConversations = conversations.filter((c) => {
    return (
      c.creatorId === currentUser?.id ||
      c.creatorId === 'creator-01' ||
      c.creatorHandle.toLowerCase() === currentCreatorHandle
    );
  });

  const activeConv =
    creatorConversations.find((c) => c.id === activeConversationId) ||
    creatorConversations[0] ||
    null;

  // Auto-synchronize active conversation so Creator doesn't see other creators' chats
  useEffect(() => {
    if (creatorConversations.length > 0) {
      const isValid = creatorConversations.some((c) => c.id === activeConversationId);
      if (!isValid) {
        dispatch(setActiveConversationId(creatorConversations[0].id));
      }
    }
  }, [creatorConversations, activeConversationId, dispatch]);

  // Mark incoming messages as read when viewing this conversation
  useEffect(() => {
    if (activeConv && activeConv.unreadCountCreator > 0) {
      dispatch(markConversationAsRead({ conversationId: activeConv.id, role: 'creator' }));
    }
  }, [activeConv?.id, activeConv?.unreadCountCreator, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping, pendingAttachments]);

  const filteredConversations = creatorConversations.filter(
    (c) =>
      c.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSendOffer = () => {
    if (!activeConv) return;
    const title = offerTitle.trim();
    const deliverables = offerDeliverables
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (!title || deliverables.length === 0 || !offerPrice || offerPrice <= 0) {
      message.error('Add a title, at least one deliverable, and a price.');
      return;
    }

    const customOffer: ChatCustomOffer = {
      id: `offer-${Date.now()}`,
      title,
      deliverables,
      priceEur: offerPrice,
      platform: offerPlatform,
      status: 'pending',
    };

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        text: '',
        senderId: activeConv.creatorId,
        senderName: activeConv.creatorName,
        senderAvatar: activeConv.creatorAvatar,
        senderRole: 'creator',
        customOffer,
      })
    );

    setIsOfferOpen(false);
    setOfferTitle('');
    setOfferDeliverables('');
    setOfferPrice(null);
    setOfferPlatform('instagram');
    message.success('Custom offer sent.');
  };

  return (
    <div className="min-h-screen pb-12 font-sans flex flex-col">
      <WorkspaceHeader
        title="Messages"
        subtitle="Direct conversations with brands."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto flex-1">
        <div className="bg-white rounded-3xl border border-[#E7E7E2] shadow-2xs overflow-hidden flex flex-col lg:flex-row h-[720px]">
          {/* LEFT COLUMN: Conversation List */}
          <div className="w-full lg:w-80 xl:w-96 border-r border-[#E7E7E2] flex flex-col bg-[#FAFAF8]">
            <div className="p-4 border-b border-[#E7E7E2] bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#66665E]">
                  Conversations
                </span>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-[#66665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                          src={conv.brandAvatar}
                          alt={conv.brandName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E7E7E2]"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <div className="flex items-center gap-1.5 truncate">
                            {conv.unreadCountCreator > 0 && (
                              <span className="w-2 h-2 rounded-full bg-[#0A0A0A] shrink-0" />
                            )}
                            <span className={`text-sm truncate ${conv.unreadCountCreator > 0 ? 'font-black text-[#0A0A0A]' : 'font-bold text-[#0A0A0A]'}`}>
                              {conv.brandName}
                            </span>
                          </div>
                          <span className={`text-xs shrink-0 ${conv.unreadCountCreator > 0 ? 'font-bold text-[#0A0A0A]' : 'font-medium text-[#66665E]'}`}>
                            {conv.lastMessageTimestamp}
                          </span>
                        </div>

                        <div className="text-xs text-[#66665E] font-medium truncate mb-1">
                          Brand Partner
                        </div>

                        <div className={`text-xs truncate leading-snug ${conv.unreadCountCreator > 0 ? 'font-bold text-[#0A0A0A]' : 'font-medium text-[#66665E]'}`}>
                          {conv.lastMessage}
                        </div>
                      </div>

                      {conv.unreadCountCreator > 0 && (
                        <div className="shrink-0 self-center pl-1">
                          <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-black flex items-center justify-center shadow-2xs">
                            {conv.unreadCountCreator}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-sm text-[#66665E] font-medium">
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
                    <h2 className="text-sm sm:text-base font-bold text-[#0A0A0A] truncate">
                      {activeConv.brandName}
                    </h2>
                    <div className="text-sm text-[#66665E]">Verified Brand Partner</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* 3-Dot Options Dropdown */}
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'orders',
                          icon: <ShoppingBag className="w-4 h-4" />,
                          label: 'Active Orders',
                          onClick: () => router.push('/creator/orders'),
                        },
                        {
                          key: 'clear',
                          icon: <RotateCcw className="w-4 h-4" />,
                          label: 'Clear Chat History',
                          onClick: () => {
                            Modal.confirm({
                              title: 'Clear Chat History?',
                              content: 'Are you sure you want to clear messages in this chat conversation?',
                              okText: 'Clear Messages',
                              okType: 'danger',
                              cancelText: 'Cancel',
                              onOk: () => {
                                dispatch(clearMessages({ conversationId: activeConv.id }));
                                message.success('Chat history cleared');
                              },
                            });
                          },
                        },
                        {
                          type: 'divider',
                        },
                        {
                          key: 'delete',
                          icon: <Trash2 className="w-4 h-4" />,
                          label: 'Delete Thread',
                          danger: true,
                          onClick: () => {
                            Modal.confirm({
                              title: 'Delete entire conversation?',
                              content: 'Are you sure you want to permanently delete this entire conversation and message history? This action cannot be undone.',
                              okText: 'Delete Thread',
                              okType: 'danger',
                              cancelText: 'Cancel',
                              onOk: () => {
                                dispatch(deleteConversation({ conversationId: activeConv.id }));
                                message.success('Conversation deleted');
                              },
                            });
                          },
                        },
                      ],
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full border border-[#E7E7E2] hover:border-[#0A0A0A] bg-white hover:bg-[#FAFAF8] text-[#66665E] hover:text-[#0A0A0A] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </Dropdown>
                </div>
              </div>

              {/* Message Stream */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFAF8] relative transition-colors ${
                  isDragging ? 'bg-[#FFF0F5]/60 border-2 border-dashed border-[#FF2D78]' : ''
                }`}
              >
                {isDragging && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                    <div className="w-16 h-16 rounded-3xl bg-[#FFF0F5] text-[#FF2D78] flex items-center justify-center mb-3 animate-bounce">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-base text-[#0A0A0A]">Drop Files Here to Submit</p>
                    <p className="text-sm text-[#66665E] mt-1">
                      Upload campaign briefs, raw footage, video edits, images, or documents
                    </p>
                  </div>
                )}


                {activeConv.messages.map((msg) => {
                  const isCreator = msg.senderRole === 'creator';
                  return (
                    <div
                      key={msg.id}
                      className={`group flex gap-2.5 sm:gap-3 max-w-[88%] sm:max-w-[75%] relative ${
                        isCreator ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0 mt-1"
                      />

                      <div className={`space-y-1.5 ${isCreator ? 'text-right' : 'text-left'}`}>
                        {/* Header: Sender name, timestamp, and read status for outgoing messages */}
                        <div
                          className={`flex items-center gap-1.5 text-xs text-[#66665E] font-medium px-1 ${
                            isCreator ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {!isCreator && (
                            <>
                              <span className="font-bold text-[#0A0A0A]">{msg.senderName}</span>
                              <span>•</span>
                            </>
                          )}
                          <span>{msg.timestamp}</span>

                          {/* Read/Delivered/Sent status badge for own creator messages */}
                          {isCreator && (
                            <span className="inline-flex items-center gap-0.5 ml-1">
                              {msg.status === 'read' ? (
                                <span
                                  className="inline-flex items-center gap-0.5 text-sky-500 font-semibold"
                                  title="Read by brand"
                                >
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Read</span>
                                </span>
                              ) : msg.status === 'delivered' ? (
                                <span
                                  className="inline-flex items-center gap-0.5 text-zinc-400"
                                  title="Delivered to brand"
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
                            isCreator ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Text Content */}
                            {msg.customOffer && (
                              <div className={isCreator ? 'flex justify-end' : 'flex justify-start'}>
                                <CustomOfferCard
                                  offer={msg.customOffer}
                                  viewer="creator"
                                  conversationId={activeConv.id}
                                  messageId={msg.id}
                                  brand={{
                                    id: activeConv.brandId,
                                    name: activeConv.brandName,
                                    avatar: activeConv.brandAvatar,
                                  }}
                                  creator={{
                                    id: activeConv.creatorId,
                                    name: activeConv.creatorName,
                                    handle: activeConv.creatorHandle,
                                    avatar: activeConv.creatorAvatar,
                                  }}
                                />
                              </div>
                            )}

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
                              <div
                                className={`flex flex-col gap-2 ${
                                  isCreator ? 'items-end' : 'items-start'
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
                                            <p className="text-sm text-[#66665E]">{att.size}</p>
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
                                              isCreator ? 'text-zinc-400' : 'text-[#66665E]'
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

                {isTyping && (
                  <div className="flex gap-2 items-center text-sm text-[#66665E] italic bg-white px-3 py-2 rounded-full border border-[#E7E7E2] w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66665E] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66665E] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66665E] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 font-medium">{activeConv.brandName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Pending Attachments Preview Tray */}
              {pendingAttachments.length > 0 && (
                <div className="px-4 py-2.5 bg-[#FAFAF8] border-t border-[#E7E7E2] flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#66665E] shrink-0">
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
                          <p className="text-sm text-[#66665E]">{att.size}</p>
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
                  className="w-11 h-11 rounded-full bg-[#FAFAF8] hover:bg-[#F4F4F0] border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#66665E] hover:text-[#0A0A0A] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs group"
                >
                  <Paperclip className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOfferOpen(true)}
                  title="Send a custom offer"
                  className="h-11 px-3.5 rounded-full bg-[#FAFAF8] hover:bg-[#F4F4F0] border border-[#E7E7E2] hover:border-[#0A0A0A] text-[#0A0A0A] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Offer</span>
                </button>

                <input
                  type="text"
                  placeholder={`Write a reply to ${activeConv.brandName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 h-11 px-4 text-sm font-sans rounded-full bg-[#FAFAF8] border border-[#D2D2CA] outline-none focus:border-[#0A0A0A] focus:bg-white text-[#0A0A0A] placeholder:text-[#66665E] transition-all"
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

      <Modal
        open={isOfferOpen}
        onCancel={() => setIsOfferOpen(false)}
        footer={null}
        centered
        width={440}
        title={<span className="text-base font-extrabold text-[#0A0A0A]">Custom offer</span>}
      >
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#0A0A0A]">Title</label>
            <Input
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
              placeholder="Reel and 3 stories"
              className="rounded-xl h-11 text-sm font-semibold text-[#0A0A0A] placeholder:text-[#66665E] placeholder:font-normal border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#0A0A0A]">Deliverables</label>
            <Input.TextArea
              rows={4}
              value={offerDeliverables}
              onChange={(e) => setOfferDeliverables(e.target.value)}
              placeholder={'1 Reel\n3 Stories\nUsage rights for 30 days'}
              className="rounded-xl text-sm font-semibold text-[#0A0A0A] placeholder:text-[#66665E] placeholder:font-normal border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A] p-3 leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#0A0A0A]">Price (EUR)</label>
              <Input
                type="number"
                prefix={<span className="text-[#0A0A0A] font-bold text-sm">€</span>}
                value={offerPrice ?? ''}
                onChange={(e) => setOfferPrice(e.target.value ? Number(e.target.value) : null)}
                placeholder="950"
                className="rounded-xl h-11 text-sm font-semibold text-[#0A0A0A] placeholder:text-[#66665E] placeholder:font-normal border-[#D2D2CA] hover:border-[#0A0A0A] focus:border-[#0A0A0A]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#0A0A0A]">Platform</label>
              <Select
                value={offerPlatform}
                onChange={(value) => setOfferPlatform(value)}
                className="w-full h-11 text-sm font-semibold text-[#0A0A0A]"
                options={[
                  { value: 'instagram', label: 'Instagram' },
                  { value: 'tiktok', label: 'TikTok' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'ugc', label: 'UGC Ads' },
                  { value: 'all', label: 'All platforms' },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsOfferOpen(false)}
              className="h-10 px-4 rounded-full text-sm font-bold border border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendOffer}
              className="h-10 px-5 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-zinc-800 cursor-pointer"
            >
              Send Offer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
