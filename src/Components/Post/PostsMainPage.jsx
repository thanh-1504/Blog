/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PostMainPageItem from "./PostMainPageItem";
import { sidebarWidth } from "../Sidebar";
import { useSidebarContext } from "../../Contexts/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetUserData,
  handleShowSidebar,
} from "../../redux-thunk/handler";
const PostsMainPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mainPage);
  const [isDataFetched, setIsDataFetched] = useState(false);
  let { toggleSidebar, setToggleSidebar } = useSidebarContext();
  useEffect(() => {
    dispatch(handleGetUserData(setIsDataFetched));
    return () => {
      setToggleSidebar(true);
    };
  }, [setToggleSidebar, dispatch]);
  return (
    <div
      style={
        window.innerWidth < 1500 && data.length > 0 ? handleShowSidebar(toggleSidebar, "/") : {}
      }
      onClick={(e) => {
        if (!e.currentTarget.matches("sidebar") && window.innerWidth <= 440)
          setToggleSidebar(true);
      }}
      className={`h-screen lg:px-0 2xl:w-full 2xl:max-w-none 2xl:flex 2xl:flex-col 2xl:items-center mb:w-full mb:px-5 transition-all ease-in-out duration-500 `}
    >
      <p
      style={data.length === 0 && window.innerWidth > 480 ? {marginLeft: sidebarWidth + 20} : {}}
        className={`inline-block lg:mt-8 mb:mt-6 mb-6 2xl:relative 2xl:right-[420px]`}
      >
        All ({data?.length})
      </p>
      {data.length === 0 && isDataFetched && (
        <div className="flex flex-col items-center lg:mt-5 2xl:mt-10">
          <img
            className="w-[100px] h-[100px] "
            src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
            alt="empty post"
          />
          <p>No posts</p>
          <p className="text-sm">Posts you create will appear here</p>
        </div>
      )}
      {!isDataFetched ? (
        <div className="flex flex-col justify-center items-center mb:mt-[50px]">
          <div
            className="inline-block animate-spin mb:h-10 mb:w-10 lg:w-[50px] lg:h-[50px] text-blue-500 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
          <span className="mt-4">Loading</span>
        </div>
      ) : (
        data.map((dataItem) => {
          return (
            <PostMainPageItem
              key={dataItem.id}
              data={dataItem}
            ></PostMainPageItem>
          );
        })
      )}
    </div>
  );
};

export default PostsMainPage;
