/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PostItem from "./Post/PostItem";
import Category from "./Category";
import { useSidebarContext } from "../Contexts/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectCategoryText } from "../redux-thunk/Slices/discoverSlice";
import {
  handleGetDataDiscoverPage,
  handleShowSidebar,
} from "../redux-thunk/handler";
const DiscoverPageContent = ({ showSidebar }) => {
  const dispatch = useDispatch();
  const [isFetchedData, setIsFetchedData] = useState(false);
  let { toggleSidebar, setToggleSidebar } = useSidebarContext();
  const { category, data } = useSelector((state) => state.discover);
  useEffect(() => {
    dispatch(handleGetDataDiscoverPage({ category, setIsFetchedData }));
    return () => {
      setIsFetchedData(false);
      setToggleSidebar(true);
    };
  }, [dispatch, category, setToggleSidebar]);
  useEffect(() => {
    return () => {
      dispatch(handleSelectCategoryText("Cuisine"));
    };
  }, [dispatch]);
  return (
    <div
      style={handleShowSidebar(toggleSidebar, "discoverPage")}
      onClick={(e) => {
        if (!e.currentTarget.matches("sidebar") && window.innerWidth <= 440)
          setToggleSidebar(true);
      }}
      className={`w-full h-screen transition-all ease-linear duration-300 lg:px-0 ${
        showSidebar ? "lg:ml-[260px] 2xl:ml-[296px]" : `lg:w-full`
      }  `}
    >
      <div className="lg:flex lg:items-center mb:block lg:mt-10 mb:mt-5 ml-1 justify-between max-w-[970px]">
        <div className="lg:mr-[80px] mb:mb-5  mb:ml-3 lg:ml-0 lg:mb-0">
          <label className="mr-2 select-none" htmlFor="category">
          Categorize posts
          </label>
          <select
            onChange={(e) => dispatch(handleSelectCategoryText(e.target.value))}
            id="category"
            className="border border-gray-400 outline-none select-none dark:bg-black"
          >
            <option value="Cuisine">Cuisine</option>
            <option value="Life">Life</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Game">Game</option>
          </select>
          <Category style="mb:block lg:mb-3">{category}</Category>
        </div>
      </div>
      {isFetchedData ? (
        <div className="mb:flex mb:flex-row mb:flex-wrap mb:justify-evenly lg:gap-x-0 lg:flex lg:flex-row lg:flex-wrap lg:justify-start lg:gap-y-5 2xl:place-items-center 2xl:gap-y-0">
          {data.length > 0 &&
            data.map((post) => {
              return (
                <PostItem
                  style="2xl:max-w-[334px] 2xl:min-w-[334px]"
                  styleImg="2xl:max-h-[180px]"
                  key={post.id}
                  data={post}
                ></PostItem>
              );
            })}
          <div className="mb:mb-5 mb:min-w-[185px]"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb:mt-[50px]">
          <div
            className="inline-block animate-spin mb:h-10 mb:w-10 lg:w-[50px] lg:h-[50px] text-blue-500 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
          <span className="mt-4">Loading</span>
        </div>
      )}
      {isFetchedData && data.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <img
            className="mb:w-[180px] mb:h-[180px]"
            src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
            alt="noPostImage"
          />
          <p className="text-lg">There are no posts</p>
        </div>
      )}
    </div>
  );
};

export default DiscoverPageContent;
