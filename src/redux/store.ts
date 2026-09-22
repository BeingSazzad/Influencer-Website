import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import creatorReducer from './slices/creatorSlice';
import orderReducer from './slices/orderSlice';
import langReducer from './slices/langSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    creator: creatorReducer,
    order: orderReducer,
    lang: langReducer,
    message: messageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
