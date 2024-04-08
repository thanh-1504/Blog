/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import PostsMainPage from "../Components/Post/PostsMainPage";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import Header from "../Components/Header";

const MainPage = () => {
  // window.innerWidth > 440 ? useShowScrollbar() : null;
  return (
    <>
      <Header userImgStyle="lg:mr-10" style="lg:mr-5"></Header>
      <div className="flex pt-[80px] w-full h-full  ">
        <Sidebar></Sidebar>
        <PostsMainPage></PostsMainPage>
      </div>
    </>
  );
};

export default MainPage;
