/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import BlogLogo from "./BlogLogo";
import { useSidebarContext } from "../Contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckedInputDarkMode } from "../redux-thunk/Slices/darkModeSlice";
import { handleShowUserSetting } from "../redux-thunk/Slices/userSettingSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
const Header = ({ hasSearchInput = true, hasSidebar = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const html = document.documentElement;
  const { handleToggleSidebar } = useSidebarContext();
  const { switchToSunIcon } = useSelector((state) => state.darkMode);
  const { showUserSetting } = useSelector((state) => state.userSetting);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <header
      className={`w-full h-full max-h-[70px] fixed top-0 left-0 z-[999] border-b border-b-[#ccc] bg-white dark:bg-themeDark ${
        !hasSearchInput && !hasSidebar && "px-10"
      }`}
    >
      <div
        className={`flex items-center h-full ${
          !hasSearchInput && !hasSidebar ? "justify-between" : "justify-around"
        }`}
      >
        <div className="flex items-center ">
          {hasSidebar && (
            <div
              onClick={() => handleToggleSidebar()}
              className="p-4 mr-2 rounded-full cursor-pointer hambuger hover:bg-hamburgerHover "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className=" w-full max-w-[18px] "
                fill={`${localStorage.getItem("theme") === "dark" && "#fff"}`}
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
          )}
          <BlogLogo></BlogLogo>
        </div>
        {hasSearchInput && window.innerWidth > 440 && (
          <div className="flex items-center w-full max-w-[700px] rounded-xl bg-[#eceff1] py-3">
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
                  navigate(`/filter/${e.target.value.trim()}`);
                }
              }}
              placeholder="Tìm kiếm bài đăng"
              className="outline-none bg-[#eceff1] w-full"
              type="text"
            />
          </div>
        )}
        {window.innerWidth < 440 && hasSearchInput && (
          <div className="flex items-center">
            <svg
              className="w-full mx-5 max-w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            {/* <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/filter/${e.target.value.trim()}`);
                }
              }}
              placeholder="Tìm kiếm bài đăng"
              className="outline-none bg-[#eceff1] w-full"
              type="text"
            /> */}
          </div>
        )}
        <div className="flex items-center select-none">
          {!localStorage.getItem("user") && (
            <>
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
            </>
          )}
          {localStorage.getItem("user") && (
            <div className="relative">
              <img
                onClick={() =>
                  dispatch(handleShowUserSetting(!showUserSetting))
                }
                className="ml-5 rounded-full cursor-pointer w-9 h-9"
                src={`${
                  userInfo?.photoURL ||
                  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709683200&semt=ais"
                }`}
                alt="userImage"
              />
              {showUserSetting && (
                <div className="absolute user__info  w-[412px] h-[280px] bg-[#e9eef6] right-0 top-[3.3rem] rounded-3xl shadow-userInfoShadow">
                  <div
                    onClick={() => dispatch(handleShowUserSetting(false))}
                    className="p-2 rounded-full hover:bg-[rgba(60,64,67,.1)] inline absolute right-4 top-2 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </div>
                  <span className="block mt-3 font-semibold text-center text-black">
                    {userInfo?.email || "abc@gmail.com"}
                  </span>
                  <div className="flex flex-col items-center mt-6">
                    <img
                      className="h-[70px] w-[70px] rounded-full"
                      src={`${
                        userInfo?.photoURL ||
                        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709683200&semt=ais"
                      }`}
                      alt="userImage"
                    />
                    <span className="mt-2 text-[1.4rem] text-black">
                      Chào {userInfo?.displayName || "Cậu"}
                    </span>
                  </div>
                  <div className="flex items-center w-full h-10 px-4 mt-10 ">
                    <div
                      onClick={() => {
                        html.classList.toggle("dark");
                        localStorage.setItem("theme", html.className);
                        dispatch(handleCheckedInputDarkMode(!switchToSunIcon));
                      }}
                      className="bg-white p-4 rounded-l-3xl w-2/4 rounded-r-md mr-1 hover:bg-[rgba(60,64,67,.1)] cursor-pointer"
                    >
                      {!switchToSunIcon && (
                        <svg
                          className="inline w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                        </svg>
                      )}
                      {switchToSunIcon && (
                        <svg
                          className="inline w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                        </svg>
                      )}
                      <span className="text-black">
                        {!switchToSunIcon ? "Chế độ tối" : "Chế độ sáng"}
                      </span>
                    </div>
                    <div
                      onClick={handleSignOut}
                      className="bg-white p-4 rounded-r-3xl w-2/4 rounded-l-md hover:bg-[rgba(60,64,67,.1)] cursor-pointer"
                    >
                      <svg
                        className="inline w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                      <span className="text-black">Đăng xuất</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
