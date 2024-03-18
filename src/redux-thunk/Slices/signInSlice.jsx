import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: { showPassWord: false, changeTypeInput: false },
  reducers: {
    handleShowPassWord: (state, action) => {
      state.showPassWord = action.payload;
    },
    handleChangeToInputText: (state, action) => {
      state.changeTypeInput = action.payload;
    },
  },
});
export const { handleShowPassWord, handleChangeToInputText } =
  signInSlice.actions;
export default signInSlice.reducer;
