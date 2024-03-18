import React from "react";
import BlogLogo from "./BlogLogo";
import { useNavigate } from "react-router-dom";

const HeaderWithNoSearch = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-full max-h-[70px] bg-white fixed top-0 left-0 z-[999] border-b border-b-[#ccc]">
      <div className="flex items-center justify-between h-full px-10 ">
        <BlogLogo></BlogLogo>
        <div className="flex items-center select-none">
          <span
            onClick={() => navigate("/sign-up")}
            className="ml-8 cursor-pointer hover:text-[#f57c00] text-lg"
          >
            Sign up{" "}
          </span>
          <span className="mx-2">|</span>
          <span
            onClick={() => navigate("/sign-in")}
            className=" cursor-pointer hover:text-[#f57c00] text-lg"
          >
            Sign in
          </span>
        </div>
      </div>
    </header>
  );
};

export default HeaderWithNoSearch;
