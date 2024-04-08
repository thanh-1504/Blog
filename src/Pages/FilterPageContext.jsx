/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PostItemFilter from "../Components/Post/PostItemFilter";
import PostItem from "../Components/Post/PostItem";
import { useDispatch } from "react-redux";
import { handleGetDataFilterPost } from "../redux-thunk/handler";
const FilterPageContent = ({ data, isFetchedData }) => {
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = useState("");
  return (
    <div className="w-full min-h-screen pt-[100px] flex justify-center overflow-hidden dark:bg-themeDark">
      <div className="w-full max-w-[1000px] bg-white rounded-md lg:pl-10 dark:bg-themeDark">
        <div className="lg:flex lg:items-center mb:px-5 lg:px-0">
          <div className="flex items-center rounded-xl bg-[#eceff1] py-3 justify-center lg:w-[50%] lg:mt-8 lg:ml-2 lg:mr-0 mb:mt-6 mb:w-full mb:mb-3">
            <svg
              className="w-full mx-5 max-w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setValueSearch(e.target.value);
                  dispatch(
                    handleGetDataFilterPost(e.target.value.trim().toLowerCase())
                  );
                }
              }}
              placeholder="Search posts"
              className="outline-none bg-[#eceff1] w-full text-black"
              type="text"
            />
          </div>
          {valueSearch && window.innerWidth < 480 && (
            <span className="lg:ml-10 translate-y-[55%]">
              Found {data.length || 0} results
            </span>
          )}
          {window.innerWidth > 480 && (
            <span className="lg:ml-10 translate-y-[55%]">
              Found {data.length || 0} results
            </span>
          )}
        </div>
        {!isFetchedData ? (
          <div className="flex flex-col justify-center items-center mb:mt-[50px]">
            <div
              className="inline-block animate-spin mb:h-10 mb:w-10 lg:w-[50px] lg:h-[50px] text-blue-500 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
            <span className="mt-4">Loading</span>
          </div>
        ) : (
          data.length > 0 && (
            <div className="mb:flex mb:flex-row mb:flex-wrap mb:justify-evenly mb:gap-y-3 mb:mt-3 lg:mt-5 lg:block ">
              {data.map((post) => {
                return (
                  <PostItem
                    style="lg:flex lg:items-center lg:min-w-[400px] lg:max-w-[550px] lg:mb-3 2xl:max-w-none 2xl:min-h-0"
                    styleImg="2xl:max-w-[350px] 2xl:min-h-[200px] 2xl:max-h-[200px]"
                    styleTextWrap="lg:ml-5 2xl:min-w-[480px] 2xl:max-w-[481px]"
                    data={post}
                    key={data.id}
                  ></PostItem>
                );
              })}
              <div className="mb:mb-5 mb:min-w-[185px]"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FilterPageContent;
