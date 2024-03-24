/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useDispatch } from "react-redux";
import { handleViewedPost } from "../../redux-thunk/handler";
const idPost = [];
const PostItem = ({ style = "max-w-[210px]", data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { day, month, year } = useFormatDate(data?.dateCreated);
  if (!data) return;
  const isExisted = idPost.includes(data.id);
  return (
    <div
      onClick={() => {
        !idPost.includes(data.id) && idPost.push(data.id);
        !isExisted &&
          dispatch(handleViewedPost({ data, page: window.location.href }));
        navigate(`/${data?.category}/${data?.id}`);
      }}
      className={`cursor-pointer mx-2 my-5  ${style}`}
    >
      <img
        className="w-full h-full object-cover max-h-[118px] rounded-lg hover:shadow-lg transition-all mb-3"
        src={`${data?.imgURL}`}
        alt="PostImage"
      />
      <div>
        <p className="mb-1 blog__title">{data?.title}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#7a7a7a] font-medium">{data?.author}</p>
          <span className="text-sm text-[#7a7a7a] ">
            {day} - {month} - {year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
