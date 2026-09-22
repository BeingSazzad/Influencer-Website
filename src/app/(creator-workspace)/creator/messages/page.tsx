'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  sendMessage,
  setActiveConversationId,
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
} from 'lucide-react';
import { Button } from 'antd';

export default function CreatorMessagesPage() {
  const dispatch = useAppDispatch();
  const { conversations, activeConversationId } = useAppSelector((state) => state.message);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations relevant to creator
  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0] || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  const filteredConversations = conversations.filter(
    (c) =>
      c.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !activeConv) return;

    const creatorName = currentUser?.name || 'Sophie Kim';
    const creatorAvatar =
      currentUser?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        text,
        senderId: currentUser?.id || 'creator-01',
        senderName: creatorName,
        senderAvatar: creatorAvatar,
        senderRole: 'creator',
      })
    );

    if (!textToSend) {
      setInputText('');
    }

    // Realistic simulated interactive response from the brand after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
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

  const quickPrompts = [
    "I'll have the draft uploaded tomorrow morning!",
    'Please send over the product shipment tracking number.',
    'I can deliver the revised version within 48 hours.',
  ];

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
                  Brands ({conversations.length})
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EEF7F2] text-[#23744D]">
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
                  className="w-full h-10 pl-9 pr-3 text-xs font-medium rounded-xl border border-[#E7E7E2] bg-[#FAFAF8] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
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
                          <span className="text-[11px] text-[#73736A] shrink-0 font-medium">
                            {conv.lastMessageTimestamp}
                          </span>
                        </div>

                        <div className="text-xs text-[#73736A] truncate leading-snug">
                          {conv.lastMessage}
                        </div>
                      </div>
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
                    <div className="text-xs text-[#73736A]">Verified Brand Partner</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/creator/orders">
                    <Button
                      type="default"
                      className="h-9 px-3.5 rounded-full text-xs font-bold border-[#E7E7E2] text-[#0A0A0A] hover:border-[#0A0A0A] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#73736A]" />
                      <span className="hidden sm:inline">Active Orders</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFAF8]">
                <div className="text-center my-2">
                  <span className="px-3 py-1 rounded-full bg-[#EAEAE3] text-[#73736A] text-[11px] font-bold uppercase tracking-wider">
                    Direct Brand Channel
                  </span>
                </div>

                {activeConv.messages.map((msg) => {
                  const isCreator = msg.senderRole === 'creator';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                        isCreator ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E7E7E2] shrink-0 mt-1"
                      />

                      <div className={`space-y-1 ${isCreator ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2 text-[11px] text-[#73736A] font-medium px-1">
                          <span className="font-bold text-[#0A0A0A]">{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isCreator
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

                {isTyping && (
                  <div className="flex gap-2 items-center text-xs text-[#73736A] italic bg-white px-3 py-2 rounded-full border border-[#E7E7E2] w-fit shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#73736A] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 font-medium">{activeConv.brandName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <div className="px-4 py-2 border-t border-[#E7E7E2] bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-[#73736A] shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#73736A]" />
                  <span>Quick Replies:</span>
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
                  placeholder={`Write a reply to ${activeConv.brandName}...`}
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
