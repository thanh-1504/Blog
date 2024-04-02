/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import { useSidebarContext } from "../Contexts/SidebarContext";
import UserPageContent from "../Components/UserPageContent";

const UserPage = () => {
  useShowScrollbar();
  const { toggleSidebar } = useSidebarContext();
  return (
    <div>
      <Header userImgStyle="lg:mr-8"></Header>
      <div className="pt-[80px] flex">
        <Sidebar></Sidebar>
        <UserPageContent toggleSidebar={toggleSidebar}></UserPageContent>
      </div>
    </div>
  );
};

export default UserPage;
