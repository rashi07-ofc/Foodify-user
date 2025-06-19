import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import filterReducer from './slice/Filters';
import authReducer from "./slice/authSlice";
import searchReducer from './slice/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    filter:filterReducer,
    search:searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
