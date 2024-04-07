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
  window.scrollTo(0, 0);
  const { idPost, page } = useParams();
  const { data, dataSamePost } = useSelector((state) => state.detailPage);
  const { day, month, year } = useFormatDate(data?.dateCreated);
  const [savedPost, setSavedPost] = useState(false);
  const isSavedPost =
    JSON.parse(localStorage.getItem("savedPost"))
      ?.find(
        (item) =>
          item?.userId === JSON.parse(localStorage.getItem("user"))?.id || null
      )
      ?.idPostsSaved.includes(idPost) || false;
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
    <div className="overflow-hidden">
      <Header
        hasSearchInput={false}
        hasSidebar={false}
        userImgStyle="lg:mr-0"
      ></Header>
      <div className="w-full mb:min-h-[90vh] lg:min-h-0">
        <img
          className="absolute top-0 left-0 z-30 object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1616531980827-1f21b9d387a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background__image"
        />
        <div className="relative z-50 w-full h-auto lg:px-16 lg:top-40 mb:top-28 ">
          <div className="w-full h-auto bg-white shadow-2xl lg:px-10 mb:px-3 mb:py-3 lg:py-5 rounded-xl dark:bg-themeDark">
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
              <button
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
                  <span className="dark:text-black">{isSavedPost ? "Post Saved" : "Save Post"}</span>
                )}
              </button>
            </div>
            <p className="content">{data.content && parse(data.content)}</p>
          </div>
        </div>
        <div className="relative mb:pb-[250px] lg:pb-[150px] z-50 w-full h-full lg:px-16 lg:bottom-0 lg:mt-[280px] mb:bottom-[-180px] ">
          <div className="w-full h-auto bg-white shadow-2xl lg:px-10 rounded-xl dark:bg-black py-6">
            <h2 className="mb-3 font-bold lg:text-4xl mb:text-2xl mb:ml-2 lg:ml-0 dark:text-white">
           
              Bài viết liên quan

            </h2>
            <>
              {dataSamePost.length > 0 ? (
                <div
                  className={`2xl:flex 2xl:flex-row lg:flex lg:flex-row lg:flex-wrap ${
                    dataSamePost.length < 4
                      ? "lg:justify-start"
                      : "lg:justify-evenly"
                  }  mb:flex mb:flex-row mb:flex-wrap mb:justify-evenly`}
                >
                  {dataSamePost.map((post) => (
                    <PostItem key={post.id} data={post}></PostItem>
                  ))}
                  <div className="mb:mb-5 mb:min-w-[185px]"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <img
                    className="mb:w-[120px] mb:h-[120px] lg:w-[150px] lg:h-[150px]"
                    src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
                    alt="noPostImage"
                  />
                  <p>No posts here</p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
      <footer className="text-center h-[100px] w-full bg-[#f57c00] relative z-50 bottom-[0px] flex items-center justify-center">
        <p className="font-bold text-white">Được tạo bởi Nhật Thành</p>
      </footer>
    </div>
  );
};

export default PostDetail;
