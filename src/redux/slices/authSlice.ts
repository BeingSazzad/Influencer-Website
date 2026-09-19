import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '@/types';
import { MOCK_USERS } from '@/Mockdata';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
}

const initialState: AuthState = {
  currentUser: MOCK_USERS[1], // Defaults to Sophia Vance (Agent/Influencer) for instant rich dashboard preview
  isAuthenticated: true,
  activeRole: 'agent',
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
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
      if (action.payload === 'agent') {
        state.currentUser = MOCK_USERS[1]; // Sophia Vance
        state.isAuthenticated = true;
      } else if (action.payload === 'buyer') {
        state.currentUser = MOCK_USERS[0]; // Alexander Sterling
        state.isAuthenticated = true;
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.activeRole = 'guest';
    },
  },
});

export const { setUser, switchRole, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
