/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import PostsMainPage from "../Components/Post/PostsMainPage";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import Header from "../Components/Header";

const MainPage = () => {
  useShowScrollbar();
  return (
    <>
      <Header></Header>
      <div className="flex pt-[80px] w-full h-full justify-center">
        <Sidebar></Sidebar>
        <PostsMainPage></PostsMainPage>
      </div>
    </>
  );
};

export default MainPage;
