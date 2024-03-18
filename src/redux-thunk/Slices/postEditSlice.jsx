import { createSlice } from "@reduxjs/toolkit";

const postEditSlice = createSlice({
  name: "editPost",
  initialState: { dataPostEdit: {} },
  reducers: {
    handleGetDataEditPost: (state, action) => {
      state.dataPostEdit = action.payload;
    },
  },
});
export const { handleGetDataEditPost } = postEditSlice.actions;
export default postEditSlice.reducer;
