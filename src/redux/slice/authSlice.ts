import { createSlice } from '@reduxjs/toolkit';
import {Logout} from '../../features/auth/authService';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem("accessToken"),
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      Logout();
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');

      state.isLoggedIn=false;
      state.user=null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;