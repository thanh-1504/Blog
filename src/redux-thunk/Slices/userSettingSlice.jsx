import { createSlice } from "@reduxjs/toolkit";

const userSettingSlice = createSlice({
  name: "userSetting",
  initialState: { showUserSetting: false },
  reducers: {
    handleShowUserSetting: (state, action) => {
      state.showUserSetting = action.payload;
    },
  },
});
export const { handleShowUserSetting } = userSettingSlice.actions;
export default userSettingSlice.reducer;
