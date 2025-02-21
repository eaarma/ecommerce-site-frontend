import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryMethodState {
  provider: string;
  name: string;
  address: string;
  country: string;
  price: number;
}

const initialState: DeliveryMethodState = {
  provider: "",
  name: "",
  address: "",
  country: "",
  price: 0,
};

const deliveryMethodSlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    updateDeliveryMethodDetails: (
      state,
      action: PayloadAction<Partial<DeliveryMethodState>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetDeliveryMethodDetails: () => initialState,
  },
});

export const { updateDeliveryMethodDetails, resetDeliveryMethodDetails } =
  deliveryMethodSlice.actions;
export default deliveryMethodSlice.reducer;
