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
      className={`w-[80%] max-h-[500px] overflow-auto transition-all ease-in-out max-w-[1108px] duration-500 ${
        toggleSidebar ? "pl-[33px] " : "pl-0 w-full ml-[-50px]"
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
