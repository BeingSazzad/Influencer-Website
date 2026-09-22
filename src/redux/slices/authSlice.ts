import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '@/types';
import { MOCK_USERS } from '@/Mockdata';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  activeRole: 'brand',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        state.activeRole = action.payload.role;
      }
    },
    loginAsBrandDemo: (state) => {
      state.currentUser = MOCK_USERS[0]; // Elena Rostova (Brand)
      state.isAuthenticated = true;
      state.activeRole = 'brand';
    },
    loginAsCreatorDemo: (state) => {
      state.currentUser = MOCK_USERS[1]; // Sophie Kim (Creator)
      state.isAuthenticated = true;
      state.activeRole = 'creator';
    },
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
      if (action.payload === 'brand') {
        state.currentUser = MOCK_USERS[0];
        state.isAuthenticated = true;
      } else if (action.payload === 'creator') {
        state.currentUser = MOCK_USERS[1];
        state.isAuthenticated = true;
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    depositBrandFunds: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.balanceEur = (state.currentUser.balanceEur || 0) + action.payload;
      }
    },
    withdrawCreatorFunds: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.balanceEur = Math.max(0, (state.currentUser.balanceEur || 0) - action.payload);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.activeRole = 'brand';
    },
  },
});

export const {
  setUser,
  loginAsBrandDemo,
  loginAsCreatorDemo,
  switchRole,
  updateUserProfile,
  depositBrandFunds,
  withdrawCreatorFunds,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
