import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus, OrderDeliverable, OrderMessage, PlatformType } from '@/types';
import { MOCK_ORDERS } from '@/Mockdata';

interface OrderState {
  orders: Order[];
  isOfferModalOpen: boolean;
  selectedCreatorForOffer: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
    packageId?: string;
    packageTitle?: string;
    priceEur?: number;
    platform?: PlatformType;
    deliveryDays?: number;
  } | null;
}

const initialState: OrderState = {
  orders: MOCK_ORDERS,
  isOfferModalOpen: false,
  selectedCreatorForOffer: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOffer: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        if (action.payload.status === 'approved' || action.payload.status === 'completed') {
          order.escrowReleased = true;
        }
      }
    },
    submitDeliverable: (
      state,
      action: PayloadAction<{ orderId: string; deliverable: OrderDeliverable }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.deliverables.push(action.payload.deliverable);
        order.status = 'deliverable_submitted';
      }
    },
    addMessageToOrder: (
      state,
      action: PayloadAction<{ orderId: string; message: OrderMessage }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.messages.push(action.payload.message);
      }
    },
    submitOrderReview: (
      state,
      action: PayloadAction<{ orderId: string; rating: number; comment: string }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.reviewSubmitted = {
          rating: action.payload.rating,
          comment: action.payload.comment,
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        };
        order.status = 'completed';
      }
    },
    openDispute: (
      state,
      action: PayloadAction<{ orderId: string; reason: string; scope?: string }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = 'disputed';
        order.dispute = {
          id: `DSP-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'open',
          filedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          reason: action.payload.reason,
          scope: action.payload.scope,
        };
      }
    },
    arbitrateDispute: (
      state,
      action: PayloadAction<{
        orderId: string;
        decision: 'resolved_split' | 'resolved_brand' | 'resolved_creator';
        splitRatio?: string;
        mediatorNotes?: string;
      }>
    ) => {
      const order = state.orders.find(
        (o) => o.id === action.payload.orderId || o.dispute?.id === action.payload.orderId
      );
      if (order && order.dispute) {
        order.dispute.status = action.payload.decision;
        order.dispute.splitRatio = action.payload.splitRatio;
        order.dispute.mediatorNotes = action.payload.mediatorNotes;
        if (action.payload.decision === 'resolved_creator') {
          order.status = 'completed';
          order.escrowReleased = true;
        } else if (action.payload.decision === 'resolved_brand') {
          order.status = 'declined';
        } else {
          order.status = 'completed';
          order.escrowReleased = true;
        }
      }
    },
    reportOrderIssue: (
      state,
      action: PayloadAction<{
        orderId: string;
        reporterRole: 'brand' | 'creator';
        category: string;
        reason: string;
      }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = 'disputed';
        const ticketId = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;
        order.dispute = {
          id: ticketId,
          status: 'open',
          filedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          reason: `${action.payload.category}: ${action.payload.reason}`,
          scope: order.brief,
        };
        order.messages.push({
          id: `msg-sup-${Date.now()}`,
          senderId: 'system-support',
          senderName: 'Influverse Support Desk',
          senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          senderRole: 'brand',
          text: `⚠️ [Support Ticket #${ticketId} Opened]: A report was submitted regarding "${action.payload.category}". Influverse Support is mediating via support chat.`,
          timestamp: 'Just now',
        });
      }
    },
    resolveOrderIssue: (
      state,
      action: PayloadAction<{
        orderId: string;
        resolutionNotes?: string;
      }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order && order.dispute) {
        order.dispute.status = 'resolved_split';
        order.status = 'in_production';
        order.messages.push({
          id: `msg-sup-res-${Date.now()}`,
          senderId: 'system-support',
          senderName: 'Influverse Support Desk',
          senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          senderRole: 'brand',
          text: `✅ [Support Ticket Resolved]: The issue has been marked as resolved. ${action.payload.resolutionNotes || 'Both parties agreed to proceed with order completion.'}`,
          timestamp: 'Just now',
        });
      }
    },
    openOfferModal: (
      state,
      action: PayloadAction<NonNullable<OrderState['selectedCreatorForOffer']>>
    ) => {
      state.selectedCreatorForOffer = action.payload;
      state.isOfferModalOpen = true;
    },
    closeOfferModal: (state) => {
      state.isOfferModalOpen = false;
      state.selectedCreatorForOffer = null;
    },
  },
});

export const {
  createOffer,
  updateOrderStatus,
  submitDeliverable,
  addMessageToOrder,
  submitOrderReview,
  openDispute,
  arbitrateDispute,
  reportOrderIssue,
  resolveOrderIssue,
  openOfferModal,
  closeOfferModal,
} = orderSlice.actions;

export default orderSlice.reducer;
