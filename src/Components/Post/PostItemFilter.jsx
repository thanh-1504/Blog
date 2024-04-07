/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useNavigate } from "react-router-dom";
import { idPost } from "./PostItem";
import { useDispatch } from "react-redux";
import { handleViewedPost } from "../../redux-thunk/handler";

const PostItemFilter = ({ style = "", data }) => {
  const navite = useNavigate();
  const dispatch = useDispatch();
  const isExisted = idPost.includes(data.id);
  const { title, author, dateCreated, category, imgURL, id } = data;
  const { day, month, year } = useFormatDate(dateCreated);
  return (
    <div
      onClick={() => {
        !idPost.includes(data.id) && idPost.push(data.id);
        !isExisted &&
          dispatch(handleViewedPost({ data, page: window.location.href }));
        navite(`/${category}/${id}`);
      }}
      className={`cursor-pointer flex items-center lg:mx-2 lg:my-5 lg:flex-row mb:flex-col mb:min-w-[185px] mb:max-w-[185px] mb:my-3  ${style}`}
    >
      <img
        className="w-full h-full object-cover max-h-[158px] rounded-lg hover:shadow-lg transition-all mb-3 lg:max-w-[250px]"
        src={
          imgURL ||
          "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt="PostImage"
      />
      <div className="lg:ml-5 mb:w-[-webkit-fill-available]">
        <p className="lg:mb-3 text-xl font-bold">{title}</p>
        <div className="mb:flex mb:my-2 lg:block lg:my-0">
          <span className="text-sm text-[#7a7a7a] font-medium lg:mb-3">
            {author || "Anonymous"}
          </span>
          <span className="lg:mb-10 lg:ml-5 mb:mx-3 text-sm">{category}</span>
          <span className="text-sm text-[#7a7a7a] lg:ml-1 block lg:mt-4">
            {day}/{month}/{year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItemFilter;
