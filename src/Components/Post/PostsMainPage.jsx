/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PostMainPageItem from "./PostMainPageItem";
import { useSidebarContext } from "../../Contexts/SidebarContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { handleGetData } from "../../redux-thunk/Slices/postMainPageSlice";

const PostsMainPage = () => {
  const { data } = useSelector((state) => state.mainPage);
  const { toggleSidebar } = useSidebarContext();
  const dispatch = useDispatch();
  useEffect(() => {
    onSnapshot(collection(db, "user's post"), (snapshot) => {
      const dataPost = [];
      snapshot.forEach((doc) => {
        dataPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const filteredDataPost = dataPost.filter(
        (post) => post.idUser === JSON.parse(localStorage.getItem("user"))?.id
      );
      dispatch(handleGetData(filteredDataPost));
    });
  }, [dispatch]);
  return (
    <div
      className={`lg:w-[80%] lg:max-h-[500px] lg:overflow-auto lg:px-0 lg:max-w-[1108px] 2xl:w-full 2xl:max-w-none 2xl:flex 2xl:flex-col 2xl:items-center  mb:w-full mb:px-5 transition-all ease-in-out duration-500 ${
        toggleSidebar
          ? "lg:pl-[33px] 2xl:pl-0"
          : "lg:pl-0 lg:w-full lg:ml-[-50px] 2xl:pr-[10%]"
      }`}
    >
      <p className={`inline-block mt-8 mb-6 2xl:relative 2xl:right-[420px]`}>
        Tất cả ({data?.length})
      </p>
      {data &&
        data.map((dataItem) => {
          return (
            <PostMainPageItem
              key={dataItem.id}
              data={dataItem}
            ></PostMainPageItem>
          );
        })}
    </div>
  );
};

export default PostsMainPage;
