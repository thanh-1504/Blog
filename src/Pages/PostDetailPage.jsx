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
} from "../redux-thunk/handler";
import parse from "html-react-parser";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const PostDetail = () => {
  window.scrollTo(0, 0);
  const { idPost, page } = useParams();
  const { data, dataSamePost } = useSelector((state) => state.detailPage);
  const [savedPost, setSavedPost] = useState(false);
  const { day, month, year } = useFormatDate(data?.dateCreated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetDataDetailPage({ idPost, page }));
  }, [dispatch, idPost, page]);
  useEffect(() => {
    dispatch(handleGetSamePost({ page, idPost }));
  }, [dispatch, page, idPost]);
  if (!data) return;
  const handleSavedPost = async () => {
    let savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    if (savedPosts.includes(idPost)) {
      savedPosts = savedPosts.filter((postId) => postId !== idPost);
      deleteDoc(doc(db, "Saved", idPost));
    } else {
      savedPosts.push(idPost);
      const savedRef = doc(db, "Saved", idPost);
      setDoc(savedRef, data);
    }
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  };
  return (
    <div className="">
      <Header hasSearchInput={false} hasSidebar={false}></Header>
      <div className={`h-full w-full`}>
        <img
          className="absolute top-0 left-0 z-30 object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1616531980827-1f21b9d387a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background__image"
        />
        <div className="relative z-50 w-full h-auto px-16 top-40">
          <div className="w-full h-auto px-10 py-10 bg-white shadow-2xl rounded-xl dark:bg-themeDark">
            <h1 className="mb-3 text-4xl font-bold">{data?.title}</h1>
            <div className="flex items-center mb-10">
              <p className="mr-3 font-bold text-orange-500">
                {data.author || "Anonymous poster"}
              </p>
              <p className="mr-3">
                {day}-{month}-{year}
              </p>
              <p>{data.category && data.category}</p>
              <div
                onClick={handleSavedPost}
                className="flex items-center p-2 ml-auto mr-10 bg-gray-300 rounded-md cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  // fill="#fbd437"
                >
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
                <span>{savedPost ? "Đã lưu bài viết" : "Lưu bài viết"}</span>
              </div>
            </div>
            <p className="content">{data.content && parse(data.content)}</p>
          </div>
        </div>
        <div className="relative z-50 w-full h-auto bottom-[-300px] px-16 pb-[80px] dark:bg-themeDark">
          <div className="w-full h-auto px-10 py-10 bg-white shadow-2xl rounded-xl dark:bg-themeDark">
            <h2 className="mb-3 text-4xl font-bold">Bài viết liên quan</h2>
            <div className="flex items-center">
              {dataSamePost.length > 0 &&
                dataSamePost.map((post) => {
                  return <PostItem key={post.id} data={post}></PostItem>;
                })}
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center h-[100px] w-full bg-[#f57c00] relative z-50 bottom-[-300px] flex items-center justify-center">
        <p className="font-bold text-white">Được tạo bởi Nhật Thành</p>
      </footer>
    </div>
  );
};

export default PostDetail;
