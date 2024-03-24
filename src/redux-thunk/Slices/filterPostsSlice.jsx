import { createSlice } from "@reduxjs/toolkit";

const filterPostsSlice = createSlice({
  name: "filterPosts",
  initialState: { data: [], valueInput: "" },
  reducers: {
    handleGetDataFilterInput: (state, action) => {
      state.data = action.payload;
    },
    handleGetValueInput: (state, action) => {
      state.valueInput = action.payload;
    },
  },
});
export const { handleGetDataFilterInput, handleGetValueInput } =
  filterPostsSlice.actions;
export default filterPostsSlice.reducer;
