import { createSlice } from "@reduxjs/toolkit";

const detailPageSlice = createSlice({
  name: "detailPage",
  initialState: { data: {} },
  reducers: {
    handleGetData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { handleGetData } = detailPageSlice.actions;
export default detailPageSlice.reducer;
