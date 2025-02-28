import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LockerInfo {
  lockerPrice: number;
  provider: string;
  lockerSize: string;
}

export interface LockerState {
  DPD: LockerInfo | null;
  SmartPost: LockerInfo | null;
  packageDimensions: number[];
  totalVolume: number | null;
}

const initialState: LockerState = {
  DPD: null,
  SmartPost: null,
  packageDimensions: [],
  totalVolume: null,
};

const lockerSlice = createSlice({
  name: "locker",
  initialState,
  reducers: {
    // Set or update a provider's locker info
    setLockerInfo: (
      state,
      action: PayloadAction<{ provider: string; info: LockerInfo }>
    ) => {
      const { provider, info } = action.payload;
      if (provider.toLowerCase() === "dpd") {
        state.DPD = info;
      } else if (provider.toLowerCase() === "smartpost") {
        state.SmartPost = info;
      }
    },
    // Optionally, store additional package details
    setPackageDetails: (
      state,
      action: PayloadAction<{
        packageDimensions: number[];
        totalVolume: number;
      }>
    ) => {
      state.packageDimensions = action.payload.packageDimensions;
      state.totalVolume = action.payload.totalVolume;
    },
    // Reset the locker state to initial
    resetLocker: () => initialState,
  },
});

export const { setLockerInfo, setPackageDetails, resetLocker } =
  lockerSlice.actions;
export default lockerSlice.reducer;
