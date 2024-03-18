import { createSlice } from "@reduxjs/toolkit";

const postMainPageSlice = createSlice({
  name: "mainPage",
  initialState: { data: [] },
  reducers: {
    handleGetData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { handleGetData } = postMainPageSlice.actions;
export default postMainPageSlice.reducer;
