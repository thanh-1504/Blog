import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
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
  signUpSlice.actions;
export default signUpSlice.reducer;
