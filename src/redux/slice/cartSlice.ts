import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";


interface CartState {
  totalQuantity: number;
}

const initialState: CartState = {
  totalQuantity: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.totalQuantity = action.payload;
    },
  },
});

export const { setTotalQuantity } = cartSlice.actions;
export default cartSlice.reducer;
