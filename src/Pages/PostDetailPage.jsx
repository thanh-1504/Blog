/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PostItem from "../Components/Post/PostItem";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useFormatDate } from "../hooks/useFormatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetDataDetailPage,
  handleGetSamePost,
  handleSavedPost,
} from "../redux-thunk/handler";
import parse from "html-react-parser";
const PostDetail = () => {
  const { idPost, page } = useParams();
  const { data, dataSamePost } = useSelector((state) => state.detailPage);
  const { day, month, year } = useFormatDate(data?.dateCreated);
  const [savedPost, setSavedPost] = useState(false);
  const isSavedPost = localStorage.getItem("savedPost")?.includes(idPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetDataDetailPage({ idPost, page }));
    return () => {
      window.scrollTo(0, 0);
    };
  }, [dispatch, idPost, page]);
  useEffect(() => {
    dispatch(handleGetSamePost({ page, idPost }));
  }, [dispatch, page, idPost]);
  useEffect(() => {
    function handleShowHeader(e) {
      if (e.deltaY > 0) {
        document.querySelector("header").classList.remove("show__header");
        document.querySelector("header").classList.add("hide__header");
      } else {
        document.querySelector("header").classList.remove("hide__header");
        document.querySelector("header").classList.add("show__header");
      }
    }
    window.addEventListener("mousewheel", handleShowHeader);
    return () => {
      window.removeEventListener("mousewheel", handleShowHeader);
    };
  }, []);
  if (!data) return;
  return (
    <div>
      <Header
        hasSearchInput={false}
        hasSidebar={false}
        userImgStyle="lg:mr-0"
      ></Header>
      <div className={`h-full w-full`}>
        <img
          className="absolute top-0 left-0 z-30 object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1616531980827-1f21b9d387a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background__image"
        />
        <div className="relative z-50 w-full h-auto lg:px-16 lg:top-40 mb:top-28 mb:px-2">
          <div className="w-full h-auto py-10 bg-white shadow-2xl lg:px-10 mb:px-3 rounded-xl dark:bg-themeDark">
            <h1 className="lg:mb-3 font-bold lg:text-4xl mb:text-[22px]">
              {data?.title}
            </h1>
            <div className="flex items-center lg:mb-8 mb:mb-5">
              <p className="mr-3 font-bold text-orange-500">
                {data.author || "Anonymous poster"}
              </p>
              <p className="mr-3">
                {day}-{month}-{year}
              </p>
              {window.innerWidth > 440 && (
                <p>{data.category && data.category}</p>
              )}
              <div
                onClick={() => {
                  setSavedPost(!savedPost);
                  dispatch(handleSavedPost({ data }));
                }}
                className="p-2 ml-auto bg-gray-300 rounded-md cursor-pointer select-none lg:items-center lg:flex lg:mr-10 mb:mr-2"
              >
                <svg
                  className="w-5 h-5 lg:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill={`${isSavedPost && "#fbd437"}`}
                >
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
                {window.innerWidth > 440 && (
                  <span>{isSavedPost ? "Post Saved" : "Save Post"}</span>
                )}
              </div>
            </div>
            <p className="content">{data.content && parse(data.content)}</p>
          </div>
        </div>
        <div className="relative z-50 w-full h-auto lg:bottom-[-300px] mb:bottom-[-180px] lg:px-16 mb:px-2 pb-[80px] dark:bg-themeDark">
          <div className="w-full h-auto py-10 bg-white shadow-2xl lg:px-10 mb:px-2 rounded-xl dark:bg-themeDark">
            <h2 className="mb-3 font-bold lg:text-4xl mb:text-2xl mb:ml-2 lg:ml-0">
              Bài viết liên quan
            </h2>
            <div className="lg:grid lg:grid-cols-4 mb:flex mb:flex-col">
              {dataSamePost.length > 0 &&
                dataSamePost.map((post) => {
                  return (
                    <PostItem style="" key={post.id} data={post}></PostItem>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center h-[100px] w-full bg-[#f57c00] relative z-50 lg:bottom-[-300px] mb:bottom-[-200px] flex items-center justify-center">
        <p className="font-bold text-white">Được tạo bởi Nhật Thành</p>
      </footer>
    </div>
  );
};

export default PostDetail;
