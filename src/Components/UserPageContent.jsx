/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import PostItem from "./Post/PostItem";
import { useSidebarContext } from "../Contexts/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { handleShowPostSaved } from "../redux-thunk/Slices/userPageSlice";
import {
  handleGetViewedPost,
  handleGetSavedPosts,
  handleShowSidebar,
} from "../redux-thunk/handler";
const UserPageContent = () => {
  const ref = useRef([]);
  const dispatch = useDispatch();
  const pushRefs = (refElement) => ref.current.push(refElement);
  const [isDataFetched, setIsFetchedData] = useState(false);
  let { toggleSidebar, setToggleSidebar } = useSidebarContext();
  const { showPostSaved, dataViewedPost, dataSavedPosts } = useSelector(
    (state) => state.userPage
  );
  const nameUser =
    JSON.parse(localStorage.getItem("user"))?.displayName || "User";
  const userImg =
    JSON.parse(localStorage.getItem("user"))?.photoURL ||
    "https://www.blogger.com/img/logo_blogger_40px_2x.png";
  useEffect(() => {
    dispatch(handleGetViewedPost());
    dispatch(handleGetSavedPosts());
    setTimeout(() => {
      setIsFetchedData(true);
    }, 200);
  }, [dispatch]);
  useEffect(() => {
    function handleUI() {
      ref.current.forEach((item) => {
        item?.addEventListener("click", handleClick);
      });
    }
    function handleClick(e) {
      ref.current.forEach((item) => item?.classList.remove("blog-seen"));
      e.target?.classList.add("blog-seen");
    }
    handleUI();
    return () => {
      ref.current.forEach((item) => {
        item?.removeEventListener("click", handleClick);
      });
      setToggleSidebar(true);
    };
  }, [setToggleSidebar]);
  return (
    <div
      style={handleShowSidebar(toggleSidebar, "userPage")}
      onClick={(e) => {
        if (!e.currentTarget.matches("sidebar") && window.innerWidth <= 440)
          setToggleSidebar(true);
      }}
      className={`2xl:w-full w-full h-screen lg:pl-0 lg:ml-[260px] ${
        toggleSidebar ? "2xl:ml-[296px]" : "2xl:pl-0 w-full "
      }`}
    >
      <div className="flex items-center mt-8 mb-4 mb:ml-2 lg:ml-0 2xl:ml-0 ">
        <img
          src={`${userImg}`}
          alt="userImage"
          className="w-[120px] h-[120px] rounded-full object-cover inline-block mr-4"
        />
        <span className="text-4xl font-bold 2xl:ml-3">{nameUser}</span>
      </div>
      <div className="flex items-center mb-5">
        <div onClick={() => dispatch(handleShowPostSaved(false))}>
          <svg
            fill="#575757"
            className="inline-block w-6 h-6 ml-3 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
          </svg>
          <span
            ref={pushRefs}
            className="font-semibold cursor-pointer select-none lg:text-lg blog-seen"
          >
            Viewed posts
          </span>
        </div>
        <div className="ml-10">
          <svg
            className="inline-block w-5 h-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
          <span
            onClick={() => dispatch(handleShowPostSaved(true))}
            ref={pushRefs}
            className="font-semibold cursor-pointer select-none lg:text-lg"
          >
            Saved posts
          </span>
        </div>
      </div>
      {!showPostSaved && (
        <div className="mb:flex mb:flex-row mb:flex-wrap mb:justify-evenly lg:flex lg:flex-row lg:flex-wrap lg:gap-y-5 lg:justify-start 2xl:place-items-center 2xl:gap-y-0">
          {!isDataFetched ? (
            <div className="flex flex-col justify-center items-center mb:mt-[50px] w-full">
              <div
                className="inline-block animate-spin mb:h-10 mb:w-10 lg:w-[50px] lg:h-[50px] text-blue-500 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
              <span className="mt-4">Loading</span>
            </div>
          ) : (
            dataViewedPost.length > 0 &&
            dataViewedPost.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  data={post}
                  style="2xl:max-w-[334px] 2xl:min-w-[334px]"
                  styleImg="2xl:max-h-[180px]"
                ></PostItem>
              );
            })
          )}
          <div className="mb:mb-5 mb:min-w-[185px]"></div>
        </div>
      )}
      {showPostSaved && (
        <div className="mb:flex mb:flex-row mb:flex-wrap mb:justify-evenly lg:flex lg:flex-row lg:flex-wrap lg:gap-y-5 lg:justify-start 2xl:place-items-center 2xl:gap-y-0">
          {dataSavedPosts.length > 0 ? (
            dataSavedPosts.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  data={post}
                  style="2xl:max-w-[334px] 2xl:min-w-[334px]"
                  styleImg="2xl:max-h-[180px]"
                ></PostItem>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full mb:mt-10">
              <img
                className="mb:w-[150px] mb:h-[150px]"
                src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
                alt="image"
              />
              <p>There are no saved posts</p>
            </div>
          )}
          <div className="mb:mb-5 mb:min-w-[185px]"></div>
        </div>
      )}
    </div>
  );
};

export default UserPageContent;
