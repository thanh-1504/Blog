/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PostMainPageItem from "./PostMainPageItem";
import { useSidebarContext } from "../../Contexts/SidebarContext";
import { collection, doc, onSnapshot } from "firebase/firestore";
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
      dispatch(handleGetData(dataPost));
    });
  }, [dispatch]);
  return (
    <div
      className={`lg:w-[80%] lg:max-h-[500px] lg:overflow-auto mb:w-full mb:px-5 lg:px-0 transition-all ease-in-out max-w-[1108px] duration-500 ${
        toggleSidebar ? "lg:pl-[33px] " : "lg:pl-0 lg:w-full lg:ml-[-50px]"
      }`}
    >
      <p className="inline-block mt-8 mb-6">Tất cả ({data?.length})</p>
      {data &&
        data.map((dataItem) => {
          return (
            <>
              <PostMainPageItem data={dataItem}></PostMainPageItem>
            </>
          );
        })}
    </div>
  );
};

export default PostsMainPage;
