/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useNavigate } from "react-router-dom";

const PostItemFilter = ({ style = "", data }) => {
  const { title, author, dateCreated, category, imgURL, id } = data;
  const { day, month, year } = useFormatDate(dateCreated);
  const navite = useNavigate();
  return (
    <div
      onClick={() => navite(`/${category}/${id}`)}
      className={`cursor-pointer mx-2 my-5 flex items-center  ${style}`}
    >
      <img
        className="w-full h-full object-cover max-h-[158px] rounded-lg hover:shadow-lg transition-all mb-3 max-w-[250px]"
        src={
          imgURL ||
          "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt="PostImage"
      />
      <div className="ml-5">
        <p className="mb-3 text-xl font-bold">{title}</p>
        <span className="text-sm text-[#7a7a7a] font-medium mb-3">
          {author || "Anonymous"}
        </span>
        <span className="mb-10 ml-5 text-sm">{category}</span>
        <span className="text-sm text-[#7a7a7a] ml-1 block mt-4">
          {day}/{month}/{year}
        </span>
      </div>
    </div>
  );
};

export default PostItemFilter;
