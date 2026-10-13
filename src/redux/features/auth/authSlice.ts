import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@/types/index.type';
import type { RootState } from '@/redux/store';
export type TAuthState = {
  user: TUser | null;
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
};
const initialState: TAuthState = {
  user: null,
  isLoggedIn: false,
  token: null,
  refreshToken: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: TUser;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});
export const { setUser, logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
