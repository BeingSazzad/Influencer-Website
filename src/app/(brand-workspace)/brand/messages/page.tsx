'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  sendMessage,
  setActiveConversationId,
  getOrCreateConversation,
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
  Clock,
  CheckCheck,
  Sparkles,
} from 'lucide-react';
import { Button, Input, message } from 'antd';

function BrandMessagesContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { conversations, activeConversationId } = useAppSelector((state) => state.message);
  const { creators } = useAppSelector((state) => state.creator);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  const filteredConversations = conversations.filter((c) =>
    c.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !activeConv) return;

    const brandName = currentUser?.companyName || currentUser?.name || 'Aura Skincare Paris';
    const brandAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80';

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        text,
        senderId: currentUser?.id || 'user_brand_01',
        senderName: brandName,
        senderAvatar: brandAvatar,
        senderRole: 'brand',
      })
    );

    if (!textToSend) {
      setInputText('');
    }

    // Realistic simulated interactive response after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
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

  const quickPrompts = [
    'Are you available for a campaign this month?',
    'What is your standard turnaround time for 1x Reel?',
    'Can we negotiate 60-day paid usage rights?',
  ];

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
                  Conversations ({conversations.length})
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
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
                  className="w-full h-10 pl-9 pr-3 text-xs font-medium rounded-xl border border-[#E7E7E2] bg-[#FAFAF8] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Conversations Scrollable List */}
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
                          <span className="text-[11px] text-[#73736A] shrink-0 font-medium">
                            {conv.lastMessageTimestamp}
                          </span>
                        </div>

                        <div className="text-xs text-[#73736A] truncate leading-snug">
                          {conv.lastMessage}
                        </div>
                      </div>

                      {conv.unreadCountBrand > 0 && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] shrink-0 mt-2" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-[#73736A] font-medium">
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
                    <div className="flex items-center gap-2 text-xs text-[#73736A]">
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
                  <Link href={`/creators/${activeConv.creatorId}`}>
                    <Button
                      type="default"
                      className="h-9 px-3.5 rounded-full text-xs font-bold border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#73736A]" />
                      <span className="hidden sm:inline">View Profile</span>
                    </Button>
                  </Link>

                  <Link href={`/brand/hire/new?creatorId=${activeConv.creatorId}`}>
                    <Button
                      type="primary"
                      className="h-9 px-4 rounded-full text-xs font-bold bg-[#0A0A0A] hover:!bg-zinc-800 !text-white hover:!text-white border-none flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Send Offer</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFAF8]">
                <div className="text-center my-2">
                  <span className="px-3 py-1 rounded-full bg-[#EAEAE3] text-[#73736A] text-[11px] font-bold uppercase tracking-wider">
                    Collaboration Channel Opened
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isBrand = msg.senderRole === 'brand';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                        isBrand ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0 mt-1"
                      />

                      <div className={`space-y-1 ${isBrand ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2 text-[11px] text-[#73736A] font-medium px-1">
                          <span className="font-bold text-[#0A0A0A]">{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isBrand
                              ? 'bg-[#0A0A0A] text-white rounded-tr-xs'
                              : 'bg-white text-[#0A0A0A] border border-[#E7E7E2] shadow-2xs rounded-tl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Creator Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2 items-center text-xs text-[#73736A] italic bg-white px-3 py-2 rounded-full border border-[#E7E7E2] w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 font-medium">{activeConv.creatorName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <div className="px-4 py-2 border-t border-[#E7E7E2] bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-[#73736A] shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#73736A]" />
                  <span>Quick Questions:</span>
                </span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs px-3 py-1 rounded-full bg-[#FAFAF8] hover:bg-[#EAEAE3] border border-[#E7E7E2] text-[#0A0A0A] font-semibold whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Message Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 border-t border-[#E7E7E2] bg-white flex items-center gap-3"
              >
                <input
                  type="text"
                  placeholder={`Write a message to ${activeConv.creatorName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 h-11 px-4 text-sm font-sans rounded-full bg-[#FAFAF8] border border-[#E7E7E2] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
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
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center font-sans text-xs font-bold text-[#73736A]">
          Loading direct messages...
        </div>
      }
    >
      <BrandMessagesContent />
    </React.Suspense>
  );
}
