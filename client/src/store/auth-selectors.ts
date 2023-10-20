import { RootState } from ".";
import { FetchStatus } from "../types/common";

export const selectIsConnected = (state: RootState): boolean => state.auth.isConnected;

export const selectFetchStatus = (state: RootState): FetchStatus => state.auth.fetchStatus;

export const selectErrorMessage = (state: RootState): string => state.auth.error;
