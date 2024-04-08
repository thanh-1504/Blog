/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useDispatch } from "react-redux";
import { handleViewedPost } from "../../redux-thunk/handler";
export const idPost = [];
const PostItem = ({ style = "", styleTextWrap = "",styleImg="", data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { day, month, year } = useFormatDate(data?.dateCreated);
  const isExisted = idPost.includes(data.id);
  if (!data) return;
  return (
    <div
      onClick={() => {
        !idPost.includes(data.id) && idPost.push(data.id);
        !isExisted &&
          dispatch(handleViewedPost({ data, page: window.location.href }));
        navigate(
          `${
            !window.location.href.includes("user")
              ? `/${data?.category}/${data.id}`
              : `/Viewed/${data.id}`
          }`
        );
      }}
      className={`cursor-pointer mb:mb-5 mb:min-w-[185px] mb:max-w-[185px] lg:mb-0 lg:max-w-[25%] lg:px-2 2xl:min-w-[400px] 2xl:min-h-[280px] 2xl:max-h-[300px]  ${style}`}
    >
      <img
        className={`w-full h-full object-cover lg:max-h-[150px] 2xl:max-h-[220px] mb:max-h-[150px] lg:rounded-lg hover:shadow-lg mb:rounded-md transition-all mb-3 ${styleImg}`}
        src={`${data?.imgURL}`}
        alt="PostImage"
      />
      <div className={`${styleTextWrap}`}>
        <p className={`mb-1 blog__title lg:min-w-[233px] lg:max-w-[233.5px] 2xl:text-xl 2xl:max-w-none`}>
          {data?.title}
        </p>
        <div className="flex items-center">
          <p className="text-sm text-[#7a7a7a] font-medium mr-5 dark:text-white">
            {data?.author || "Anonymous"}
          </p>
          <span className="text-sm text-[#7a7a7a] dark:text-white">
            {day}/{month}/{year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
