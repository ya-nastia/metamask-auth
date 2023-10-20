import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "../types/common";
import { loginThunk, verifyAccountAsync } from "./auth-thunk";

interface AuthState {
  isConnected: boolean;
  fetchStatus: FetchStatus;
  error: string | undefined;
};

const initialState: AuthState = {
  isConnected: false,
  fetchStatus: FetchStatus.Initial,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAccountAsync.pending, (state) => {
        state.fetchStatus = FetchStatus.Fetching;
        state.isConnected = false;
        state.error = '';
      })
      .addCase(verifyAccountAsync.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.Success;
        state.isConnected = true;
        state.error = '';
      })
      .addCase(verifyAccountAsync.rejected, (state, action) => {
        state.isConnected = false;
        state.fetchStatus = FetchStatus.Failed;
      })
      .addCase(loginThunk.pending, (state) => {
        state.fetchStatus = FetchStatus.Fetching;
        state.isConnected = false;
        state.error = '';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.fetchStatus = FetchStatus.Success;
        state.isConnected = true;
        state.error = '';
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isConnected = false;
        state.fetchStatus = FetchStatus.Failed;
        state.error = action.error.message;
      })
  },
});

export const { setIsConnected } = authSlice.actions;

export default authSlice.reducer;