import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: { showSettingPost: false },
  reducers: {
    handleShowSettingPost: (state, action) => {
      state.showSettingPost = action.payload;
    },
  },
});
export const { handleShowSettingPost } = generalSlice.actions;
export default generalSlice.reducer;
