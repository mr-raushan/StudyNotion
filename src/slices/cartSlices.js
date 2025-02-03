import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totoalItems: localStorage.getItem("totoalItems")
    ? JSON.parse(localStorage.getItem("totoalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totoalItems = action.payload;
    },
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
