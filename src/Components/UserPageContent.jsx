/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import PostItem from "./Post/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { handleShowPostSaved } from "../redux-thunk/Slices/userPageSlice";
import {
  handleGetViewedPost,
  handleGetSavedPosts,
} from "../redux-thunk/handler";
const UserPageContent = ({ toggleSidebar }) => {
  const ref = useRef([]);
  const dispatch = useDispatch();
  const pushRefs = (refElement) => ref.current.push(refElement);
  const { showPostSaved, dataViewedPost, dataSavedPosts } = useSelector(
    (state) => state.userPage
  );
  useEffect(() => {
    dispatch(handleGetViewedPost());
    dispatch(handleGetSavedPosts());
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
    };
  }, []);
  return (
    <div
      className={`lg:w-[80%] lg:pl-0 max-w-[1108px] transition-all ease-linear duration-300 max-h-[500px] overflow-auto ${
        toggleSidebar ? "lg:pl-5" : "lg:pl-2 w-full "
      }`}
    >
      <div className="mt-8 mb-10 lg:ml-8 mb:mx-2 lg:mx-0">
        <img
          src="https://images.unsplash.com/photo-1711843250811-a7d0bb485a42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="userImage"
          className="w-[120px] h-[120px] rounded-full object-cover inline-block mr-2"
        />
        <span className="text-4xl font-bold">Nhật Thành</span>
      </div>
      <div className="flex items-center">
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
            className="lg:text-lg font-semibold blog-seen cursor-pointer select-none"
          >
            Viewed posts
          </span>
        </div>
        <div className="ml-10">
          <svg
            className="w-5 h-5 inline-block mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
          <span
            onClick={() => dispatch(handleShowPostSaved(true))}
            ref={pushRefs}
            className="lg:text-lg font-semibold cursor-pointer select-none"
          >
            Saved posts
          </span>
        </div>
      </div>
      {!showPostSaved && (
        <div className="lg:flex lg:flex-wrap lg:items-center mb:grid mb:grid-cols-2">
          {dataViewedPost.length > 0 &&
            dataViewedPost.map((post) => {
              return <PostItem key={post.id} data={post}></PostItem>;
            })}
        </div>
      )}
      {showPostSaved && (
        <div className="lg:flex lg:flex-wrap lg:items-center mb:grid mb:grid-cols-2">
          {dataSavedPosts.length > 0 &&
            dataSavedPosts.map((post) => {
              return <PostItem key={post.id} data={post}></PostItem>;
            })}
        </div>
      )}
    </div>
  );
};

export default UserPageContent;
