import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus, OrderDeliverable, OrderMessage } from '@/types';
import { MOCK_ORDERS } from '@/Mockdata';

interface OrderState {
  orders: Order[];
  isOfferModalOpen: boolean;
  selectedCreatorForOffer: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    packageId?: string;
    packageTitle?: string;
    priceEur?: number;
    platform?: 'instagram' | 'tiktok' | 'youtube' | 'ugc';
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
  openOfferModal,
  closeOfferModal,
} = orderSlice.actions;

export default orderSlice.reducer;
