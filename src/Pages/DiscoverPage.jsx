/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import { useSidebarContext } from "../Contexts/SidebarContext";
import DiscoverPageContext from "../Components/DiscoverPageContent";

const DiscoverPage = () => {
  useShowScrollbar();
  const { toggleSidebar } = useSidebarContext();
  return (
    <div>
      <div className="pt-[80px]">
        <div className="flex w-full h-full">
          <Header></Header>
          <Sidebar></Sidebar>
          <DiscoverPageContext
            toggleSidebar={toggleSidebar}
          ></DiscoverPageContext>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
