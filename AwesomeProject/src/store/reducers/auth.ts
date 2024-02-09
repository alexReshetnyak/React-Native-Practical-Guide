import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {authLogout} from '../actions';

interface AuthState {
  token: null | string;
  expiryDate: null | number;
}

const initialState = {
  token: null,
  expiryDate: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{token: string; expiryDate: number}>,
    ) {
      state.token = action.payload.token;
      state.expiryDate = action.payload.expiryDate;
    },
    removeToken(state) {
      state.token = null;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(authLogout.fulfilled, state => {
      state.token = null;
    });

    // builder.addCase(tryAuth.fulfilled, () => {});
  },
});

export const {setToken: authSetToken, removeToken: authRemoveToken} =
  authSlice.actions;
export default authSlice.reducer;
