import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "headerSlice",
  initialState: { showInputSearchOnMbDevice: false },
  reducers: {
    handleShowInputSearchOnMbDevice: (state, action) => {
      state.showInputSearchOnMbDevice = action.payload;
    },
  },
});
export const { handleShowInputSearchOnMbDevice } = headerSlice.actions;
export default headerSlice.reducer;
