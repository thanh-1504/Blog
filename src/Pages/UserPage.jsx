/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import UserPageContent from "../Components/UserPageContent";

const UserPage = () => {
  useShowScrollbar();
  return (
    <div>
      <Header userImgStyle="lg:mr-8" style="lg:mr-5"></Header>
      <div className="pt-[80px] flex">
        <Sidebar></Sidebar>
        <UserPageContent></UserPageContent>
      </div>
    </div>
  );
};

export default UserPage;
