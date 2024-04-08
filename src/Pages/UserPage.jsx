/* eslint-disable no-unused-vars */
import UserPageContent from "../Components/UserPageContent";
import Sidebar from "../Components/Sidebar";
import React from "react";
import Header from "../Components/Header";
const UserPage = () => {
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
