import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  color: string;
  quantity: number;
  uniqueKey: string;
  stockLeft: number;
  shopId: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    updateCart: (state, action) => {
      state.items = action.payload; // FIX: Replaces entire cart instead of adding duplicates
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.uniqueKey !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ uniqueKey: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.uniqueKey === action.payload.uniqueKey
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, updateCart, removeItem, updateQuantity, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
