/* eslint-disable no-unused-vars */
import Sidebar from "../Components/Sidebar";
import React from "react";
import Header from "../Components/Header";
import DiscoverPageContent from "../Components/DiscoverPageContent";
import { useSidebarContext } from "../Contexts/SidebarContext";
import { useShowScrollbar } from "../hooks/useShowScrollbar";

const DiscoverPage = () => {
  useShowScrollbar();
  const { toggleSidebar } = useSidebarContext();
  return (
    <div>
      <div className="pt-[80px]">
        <div className="w-full h-full lg:flex">
          <Header userImgStyle="lg:mr-8" style="lg:mr-5"></Header>
          <Sidebar></Sidebar>
          <DiscoverPageContent
            showSidebar={toggleSidebar}
          ></DiscoverPageContent>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
