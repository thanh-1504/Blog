/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PostItem from "./Post/PostItem";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetDataDiscover,
  handleSelectCategoryText,
} from "../redux-thunk/Slices/discoverSlice";
import { handleFetchDataDiscoverPage } from "../redux-thunk/handler";
const DiscoverPageContext = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { category, data } = useSelector((state) => state.discover);
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(handleFetchDataDiscoverPage(category));
      const data = response.payload;
      dispatch(handleGetDataDiscover(data));
    }
    fetchData();
  }, [dispatch, category]);
  useEffect(() => {
    return () => {
      dispatch(handleSelectCategoryText("Popular"));
    };
  }, [dispatch]);
  return (
    <div
      className={`w-full overflow-auto transition-all ease-linear duration-300 lg:ml-8 2xl:ml-6 ${
        toggleSidebar ? "" : " lg:w-full"
      }  `}
    >
      <div className="lg:flex lg:items-center mb:block lg:mt-10 mb:mt-5 ml-1 justify-between max-w-[970px]">
        <div className="lg:mr-[80px] mb:ml-5 lg:ml-0">
          <label className="mr-2 select-none" htmlFor="category">
            Phân loại bài viết:
          </label>
          <select
            onChange={(e) => dispatch(handleSelectCategoryText(e.target.value))}
            id="category"
            className="border border-gray-400 outline-none select-none"
          >
            <option value="Popular">Popular</option>
            <option value="Cuisine">Cuisine</option>
            <option value="Life">Life</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Game">Game</option>
          </select>
          <Category style="mb:block">{category}</Category>
        </div>
      </div>
      <div className="mb:flex mb:flex-col lg:grid lg:grid-cols-4 2xl:place-items-center 2xl:gap-y-0">
        {data.length > 0 &&
          data.map((post) => {
            return <PostItem key={post.id} data={post}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default DiscoverPageContext;
