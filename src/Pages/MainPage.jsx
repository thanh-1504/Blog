/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import Sidebar from "../Components/Sidebar";
import React from "react";
import PostsMainPage from "../Components/Post/PostsMainPage";
import Header from "../Components/Header";

const MainPage = () => {
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
