import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isInquiryModalOpen: boolean;
  activePropertyForInquiry: { id: string; title: string; price: string; image: string } | null;
  isMobileMenuOpen: boolean;
  isSearchModalOpen: boolean;
  activeQuickNotification: string | null;
}

const initialState: UIState = {
  isInquiryModalOpen: false,
  activePropertyForInquiry: null,
  isMobileMenuOpen: false,
  isSearchModalOpen: false,
  activeQuickNotification: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openInquiryModal: (
      state,
      action: PayloadAction<{ id: string; title: string; price: string; image: string }>
    ) => {
      state.activePropertyForInquiry = action.payload;
      state.isInquiryModalOpen = true;
    },
    closeInquiryModal: (state) => {
      state.isInquiryModalOpen = false;
      state.activePropertyForInquiry = null;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleSearchModal: (state) => {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },
    setNotification: (state, action: PayloadAction<string | null>) => {
      state.activeQuickNotification = action.payload;
    },
  },
});

export const {
  openInquiryModal,
  closeInquiryModal,
  toggleMobileMenu,
  setMobileMenu,
  toggleSearchModal,
  setNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
