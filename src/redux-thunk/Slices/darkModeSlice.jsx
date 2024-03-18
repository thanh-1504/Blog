import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    switchToSunIcon: !!localStorage.getItem("theme"),
  },
  reducers: {
    handleCheckedInputDarkMode: (state, action) => {
      state.switchToSunIcon = action.payload;
    },
  },
});
export const { handleCheckedInputDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
