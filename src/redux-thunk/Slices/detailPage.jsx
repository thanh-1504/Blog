import { createSlice } from "@reduxjs/toolkit";

const detailPageSlice = createSlice({
  name: "detailPage",
  initialState: { data: {}, dataSamePost: [] },
  reducers: {
    handleGetData: (state, action) => {
      state.data = action.payload;
    },
    handleGetDataSamePost: (state, action) => {
      state.dataSamePost = action.payload;
    },
  },
});
export const { handleGetData, handleGetDataSamePost } = detailPageSlice.actions;
export default detailPageSlice.reducer;
