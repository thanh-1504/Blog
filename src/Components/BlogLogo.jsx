/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogLogo = ({ style = "" }) => {
  const navigate = useNavigate();
  return (
    <img
      className={`w-full select-none cursor-pointer max-w-11 ${style}`}
      src="https://www.blogger.com/img/logo_blogger_40px_2x.png"
      alt="Blog Logo"
      onClick={() => {
        if (window.innerWidth < 480) {
          if (
            !window.location.href.includes("/sign-in") &&
            !window.location.href.includes("/sign-up")
          )
            navigate("/");
        } else navigate("/");
      }}
    />
  );
};

export default BlogLogo;
