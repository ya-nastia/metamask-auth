import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyAccount } from "../api/auth-api";

export const verifyAccountAsync = createAsyncThunk<string, string>(
  'auth/verifyAccount',
  async (token) => {
    const response = await verifyAccount(token);
    return response.message;
  }
);