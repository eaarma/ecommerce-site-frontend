import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryState {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  shippingMethod: string;
}

const initialState: DeliveryState = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  phoneNumber: "",
  shippingMethod: "standard",
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    updateDeliveryDetails: (
      state,
      action: PayloadAction<Partial<DeliveryState>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetDeliveryDetails: () => initialState,
  },
});

export const { updateDeliveryDetails, resetDeliveryDetails } =
  deliverySlice.actions;
export default deliverySlice.reducer;
