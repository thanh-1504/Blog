import { createSlice } from "@reduxjs/toolkit";

const postAddPageSlice = createSlice({
  name: "postAddPageSlice",
  initialState: { showSettingPost: false },
  reducers: {
    handleShowSettingPost: (state, action) => {
      state.showSettingPost = action.payload;
    },
  },
});
export const { handleShowSettingPost } = postAddPageSlice.actions;
export default postAddPageSlice.reducer;
