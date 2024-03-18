/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const PostItemFilter = ({ style = "" }) => {
  return (
    <div className={`cursor-pointer mx-2 my-5 flex items-center  ${style}`}>
      <img
        className="w-full h-full object-cover max-h-[158px] rounded-lg hover:shadow-lg transition-all mb-3 max-w-[250px]"
        src="https://images.unsplash.com/photo-1594536717222-b26df7f2f23b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmwlMjBzZXh8ZW58MHx8MHx8fDA%3D"
        alt="PostImage"
      />
      <div className="ml-5">
        <p className="mb-3 text-xl font-bold">
          Chỉ cách giúp bạn nâng trình tiếng anh cực hiệu quả
        </p>
        <p className="text-sm text-[#7a7a7a] font-medium mb-3">Roseanee Le</p>
        <div className="flex items-center">
          <span className="text-sm text-[#7a7a7a]">1,3 N lượt xem - </span>
          <span className="text-sm text-[#7a7a7a] ml-1">2 ngày trước</span>
        </div>
      </div>
    </div>
  );
};

export default PostItemFilter;
