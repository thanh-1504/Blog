/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
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
      className={`w-[80%] max-w-[1108px] overflow-auto max-h-[500px] transition-all ease-linear duration-300 ${
        toggleSidebar ? "pl-[33px]" : "pl-2 w-full flex-shrink-0"
      }  `}
    >
      <div className="flex items-center mt-10 ml-1 justify-between max-w-[970px]">
        <Category style="">{category}</Category>
        <div className="mr-[80px] ">
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
        </div>
      </div>
      <div className="flex flex-wrap items-center">
        {data.length > 0 &&
          data.map((post) => {
            return <PostItem key={post.id} data={post}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default DiscoverPageContext;
