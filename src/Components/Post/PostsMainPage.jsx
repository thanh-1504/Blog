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
  let { toggleSidebar, setToggleSidebar } = useSidebarContext();
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
      onClick={(e) => {
        if (!e.currentTarget.matches("sidebar") && window.innerWidth <= 440)
          setToggleSidebar(true);
      }}
      className={` h-screen lg:overflow-auto lg:px-0 2xl:w-full 2xl:max-w-none 2xl:flex 2xl:flex-col 2xl:items-center mb:w-full mb:px-5 transition-all ease-in-out duration-500 flex flex-col  items-center `}
    >
      <p className={`inline-block mt-8 mb-6 2xl:relative 2xl:right-[420px]`}>
        Tất cả ({data?.length})
      </p>
      {data.length === 0 ? (
        <div className="flex flex-col items-center lg:mt-5 2xl:mt-10">
          <img
            className="w-[100px] h-[100px] "
            src="https://www.blogger.com/img/pencilpotscissorsdesk.png"
            alt="empty post"
          />
          <p>No posts</p>
          <p className="text-sm">Posts you create will appear here</p>
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
