import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageAttachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video' | 'pdf' | 'document' | 'archive' | 'file';
  url: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'brand' | 'creator';
  text: string;
  timestamp: string;
  createdAt: number;
  attachments?: MessageAttachment[];
}

export interface Conversation {
  id: string;
  brandId: string;
  brandName: string;
  brandAvatar: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorLocation?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCountBrand: number;
  unreadCountCreator: number;
  messages: DirectMessage[];
}

interface MessageState {
  conversations: Conversation[];
  activeConversationId: string | null;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-noah-becker',
    brandId: 'user_brand_01',
    brandName: 'Aura Skincare Paris',
    brandAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    creatorId: 'creator-04',
    creatorName: 'Noah Becker',
    creatorHandle: 'noahbecker',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Berlin, Germany',
    lastMessage: "Berlin is home for me, and I love Aura's clean formulations. What deliverables are you looking for?",
    lastMessageTimestamp: '10m ago',
    unreadCountBrand: 1,
    unreadCountCreator: 0,
    messages: [
      {
        id: 'msg-nb-1',
        senderId: 'user_brand_01',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        senderRole: 'brand',
        text: "Hi Noah! We're planning our Berlin autumn skincare launch and your styling aesthetic aligns perfectly with Aura Skincare's clean minimalist line.",
        timestamp: '15m ago',
        createdAt: Date.now() - 15 * 60 * 1000,
      },
      {
        id: 'msg-nb-2',
        senderId: 'creator-04',
        senderName: 'Noah Becker',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        senderRole: 'creator',
        text: "Hello Elena! Thanks for reaching out. Berlin is home for me, and I love Aura's clean formulations. What deliverables are you looking for?",
        timestamp: '10m ago',
        createdAt: Date.now() - 10 * 60 * 1000,
      },
    ],
  },
  {
    id: 'conv-sophie-kim',
    brandId: 'user_brand_01',
    brandName: 'Aura Skincare Paris',
    brandAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    creatorId: 'creator-01',
    creatorName: 'Sophie Kim',
    creatorHandle: 'sophiekim',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Los Angeles, CA',
    lastMessage: "I'll have the 4K raw video draft uploaded to the order workspace tomorrow morning!",
    lastMessageTimestamp: '1h ago',
    unreadCountBrand: 0,
    unreadCountCreator: 0,
    messages: [
      {
        id: 'msg-sk-1',
        senderId: 'user_brand_01',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        senderRole: 'brand',
        text: 'Hi Sophie, just checking in on the dewy glaze video draft. The lighting references looked stellar!',
        timestamp: '2h ago',
        createdAt: Date.now() - 2 * 3600 * 1000,
        attachments: [
          {
            id: 'att-sk-1',
            name: 'Aura_Autumn_Campaign_Brief.pdf',
            size: '2.4 MB',
            type: 'pdf',
            url: '#',
          },
          {
            id: 'att-sk-2',
            name: 'Dewy_Glaze_Moodboard.jpg',
            size: '1.8 MB',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      {
        id: 'msg-sk-2',
        senderId: 'creator-01',
        senderName: 'Sophie Kim',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        senderRole: 'creator',
        text: "Hi Elena! Editing the final cut right now. I'll have the 4K raw video draft uploaded to the order workspace tomorrow morning!",
        timestamp: '1h ago',
        createdAt: Date.now() - 1 * 3600 * 1000,
      },
    ],
  },
  {
    id: 'conv-maya-chen',
    brandId: 'user_brand_01',
    brandName: 'Aura Skincare Paris',
    brandAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    creatorId: 'creator-03',
    creatorName: 'Maya Chen',
    creatorHandle: 'mayachen',
    creatorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Singapore & London',
    lastMessage: 'Yes, my October calendar opens next Monday. Feel free to review my package tiers.',
    lastMessageTimestamp: 'Yesterday',
    unreadCountBrand: 0,
    unreadCountCreator: 0,
    messages: [
      {
        id: 'msg-mc-1',
        senderId: 'user_brand_01',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        senderRole: 'brand',
        text: 'Hello Maya! Are you currently accepting commercial partnerships for luxury skincare?',
        timestamp: 'Yesterday',
        createdAt: Date.now() - 24 * 3600 * 1000,
      },
      {
        id: 'msg-mc-2',
        senderId: 'creator-03',
        senderName: 'Maya Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
        senderRole: 'creator',
        text: 'Yes, my October calendar opens next Monday. Feel free to review my package tiers.',
        timestamp: 'Yesterday',
        createdAt: Date.now() - 23 * 3600 * 1000,
      },
    ],
  },
];

const initialState: MessageState = {
  conversations: INITIAL_CONVERSATIONS,
  activeConversationId: INITIAL_CONVERSATIONS[0].id,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setActiveConversationId: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload;
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) {
        conv.unreadCountBrand = 0;
      }
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        text?: string;
        senderId: string;
        senderName: string;
        senderAvatar: string;
        senderRole: 'brand' | 'creator';
        attachments?: MessageAttachment[];
      }>
    ) => {
      const { conversationId, text = '', senderId, senderName, senderAvatar, senderRole, attachments } = action.payload;
      const conv = state.conversations.find((c) => c.id === conversationId);
      if (conv) {
        const newMsg: DirectMessage = {
          id: `msg-${Date.now()}`,
          senderId,
          senderName,
          senderAvatar,
          senderRole,
          text,
          timestamp: 'Just now',
          createdAt: Date.now(),
          attachments: attachments && attachments.length > 0 ? attachments : undefined,
        };
        conv.messages.push(newMsg);
        conv.lastMessage = text || (attachments && attachments.length > 0 ? `📎 ${attachments[0].name}` : 'Shared a file');
        conv.lastMessageTimestamp = 'Just now';
        if (senderRole === 'brand') {
          conv.unreadCountCreator += 1;
        } else {
          conv.unreadCountBrand += 1;
        }
      }
    },
    getOrCreateConversation: (
      state,
      action: PayloadAction<{
        creatorId: string;
        creatorName: string;
        creatorHandle: string;
        creatorAvatar: string;
        creatorLocation?: string;
        brandId?: string;
        brandName?: string;
        brandAvatar?: string;
      }>
    ) => {
      const {
        creatorId,
        creatorName,
        creatorHandle,
        creatorAvatar,
        creatorLocation,
        brandId = 'user_brand_01',
        brandName = 'Aura Skincare Paris',
        brandAvatar = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      } = action.payload;

      let conv = state.conversations.find((c) => c.creatorId === creatorId);
      if (!conv) {
        conv = {
          id: `conv-${creatorId}`,
          brandId,
          brandName,
          brandAvatar,
          creatorId,
          creatorName,
          creatorHandle: creatorHandle.replace('@', ''),
          creatorAvatar,
          creatorLocation: creatorLocation || 'Marketplace Creator',
          lastMessage: 'Conversation opened',
          lastMessageTimestamp: 'Just now',
          unreadCountBrand: 0,
          unreadCountCreator: 0,
          messages: [
            {
              id: `msg-welcome-${Date.now()}`,
              senderId: creatorId,
              senderName: creatorName,
              senderAvatar: creatorAvatar,
              senderRole: 'creator',
              text: `Hi! Thanks for checking out my profile. Feel free to ask about custom packages, delivery timelines, or campaign ideas.`,
              timestamp: 'Just now',
              createdAt: Date.now(),
            },
          ],
        };
        state.conversations.unshift(conv);
      }
      state.activeConversationId = conv.id;
    },
  },
});

export const { setActiveConversationId, sendMessage, getOrCreateConversation } = messageSlice.actions;
export default messageSlice.reducer;
