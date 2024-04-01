import { combineReducers } from "@reduxjs/toolkit";
import darkModeSlice from "./Slices/darkModeSlice";
import signInSlice from "./Slices/signInSlice";
import signUpSlice from "./Slices/signUpSlice";
import userSettingSlice from "./Slices/userSettingSlice";
import userPageSlice from "./Slices/userPageSlice";
import postMainPageSlice from "./Slices/postMainPageSlice";
import discoverSlice from "./Slices/discoverSlice";
import detailPageSlice from "./Slices/detailPage";
import postEditSlice from "./Slices/postEditSlice";
import filterPostsSlice from "./Slices/filterPostsSlice";
import headerSlice from "./Slices/headerSlice";
import postAddPageSlice from "./Slices/postAddPageSlice";
export const reducer = combineReducers({
  darkMode: darkModeSlice,
  signIn: signInSlice,
  signUp: signUpSlice,
  userSetting: userSettingSlice,
  userPage: userPageSlice,
  mainPage: postMainPageSlice,
  discover: discoverSlice,
  detailPage: detailPageSlice,
  editPost: postEditSlice,
  filterPosts: filterPostsSlice,
  headerSlice: headerSlice,
  postAddPageSlice: postAddPageSlice,
});
