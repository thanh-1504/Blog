import { createSlice } from "@reduxjs/toolkit";

const userPageSlice = createSlice({
  name: "userPage",
  initialState: {
    showPostSaved: false,
    dataViewedPost: [],
    dataSavedPosts: [],
  },
  reducers: {
    handleShowPostSaved: (state, action) => {
      state.showPostSaved = action.payload;
    },
    handleGetDataViewedPosts: (state, action) => {
      state.dataViewedPost = action.payload;
    },
    handleGetDataSavedPosts: (state, action) => {
      state.dataSavedPosts = action.payload;
    },
  },
});
export const {
  handleShowPostSaved,
  handleGetDataViewedPosts,
  handleGetDataSavedPosts,
} = userPageSlice.actions;
export default userPageSlice.reducer;
