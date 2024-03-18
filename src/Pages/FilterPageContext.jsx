/* eslint-disable no-unused-vars */
import React from "react";
import PostItemFilter from "../Components/Post/PostItemFilter";

const FilterPageContext = () => {
  return (
    <div className="w-full pt-[100px] flex justify-center ">
      <div className="w-full max-w-[1000px] bg-white pl-10 rounded-md">
        <div className="flex items-center">
          <div className="flex items-center w-[50%] rounded-xl bg-[#eceff1] py-3 justify-center mt-8 ml-2">
            <svg
              className="w-full mx-5 max-w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              placeholder="Tìm kiếm bài đăng"
              className="outline-none bg-[#eceff1] w-full"
              type="text"
            />
          </div>
          <span className="ml-10 translate-y-[55%]">Tìm thấy 1000 kết quả</span>
        </div>
        <div className="">
          {Array(6)
            .fill(null)
            .map((item) => {
              return (
                <>
                  <PostItemFilter></PostItemFilter>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FilterPageContext;
