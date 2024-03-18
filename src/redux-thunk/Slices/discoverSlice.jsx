import { createSlice } from "@reduxjs/toolkit";

const discoverSlice = createSlice({
  name: "discover",
  initialState: { category: "Popular", data: [] },
  reducers: {
    handleSelectCategoryText: (state, action) => {
      state.category = action.payload;
    },
    handleGetDataDiscover: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { handleSelectCategoryText, handleGetDataDiscover } =
  discoverSlice.actions;
export default discoverSlice.reducer;
