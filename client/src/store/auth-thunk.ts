import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNonce, login, verifyAccount } from "../api/auth-api";
import { ethers } from "ethers";
import { deleteTokenFromStorage, setTokenToStorage } from "../utils/storage";

export const verifyAccountAsync = createAsyncThunk<string, string>(
  'auth/verifyAccount',
  async (token) => {
    const response = await verifyAccount(token);
    return response.message;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (_, {rejectWithValue}) => {
    try {
      const nonce = await getNonce();
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const message = `I am signing this message to prove my identity. Nonce: ${nonce}`;
      const signedMessage = await signer.signMessage(message);

      let token = await login(signedMessage, message, address);
      setTokenToStorage(token);

      const response = await verifyAccount(token);

      return response;

    } catch (e: any) {
      deleteTokenFromStorage();

      if (e.response && e.response.data.message) {
        return rejectWithValue(e.response.data.message)
      } else {
        return rejectWithValue(e.message)
      }
    }
  }
);