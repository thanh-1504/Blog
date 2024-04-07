/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleDeletePost } from "../../redux-thunk/handler";
import { useDispatch } from "react-redux";
import { useFormatDate } from "../../hooks/useFormatDate";
const PostMainPageItem = ({ data }) => {
  const { imgURL, title, author, dateCreated, id, category } = data;
  const { day, month } = useFormatDate(dateCreated);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const postManagementRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClick(e) {
      if (
        !e.target.closest(".post--management") &&
        !e.target.closest(".management-iconPath") &&
        !e.target.closest(".management-iconSvg")
      ) {
        postManagementRef.current?.classList.remove("post--management");
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="w-full max-w-[930px] lg:h-full lg:max-h-[96px] lg:px-4 mb:py-7 mb:px-3 flex items-center border border-[#dbe2e5] mb-3 rounded-[4px] cursor-pointer hover:shadow-md transition-all justify-between">
      <div className="flex items-center">
        <img
          src={imgURL}
          alt="postImage"
          className="lg:w-[70px] lg:h-[70px] mb:w-24 mb:h-24 object-cover mr-4 rounded-sm"
        />
        <div>
          <div className="flex">
            <p className="mb-2 mb:line-clamp-2 lg:line-clamp-1 lg:max-w-96 mb:min-w-[172px]">
              {title}
            </p>
            {window.innerWidth <= 440 && (
              <div className="relative">
                <span
                  onClick={(e) =>
                    e.currentTarget.nextElementSibling.classList.toggle(
                      "post--management"
                    )
                  }
                >
                  <svg
                    className="w-5 h-5 ml-5 mr-2 management-iconSvg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 512"
                  >
                    <path
                      className="management-iconPath"
                      d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                    />
                  </svg>
                </span>
                <ul
                  ref={postManagementRef}
                  className="w-[168px] shadow-xl absolute right-[-0.8rem] bg-white opacity-0 invisible transition-all"
                >
                  <li onClick={() => navigate(`/${category}/${id}`)}>
                    <span className="block p-2 text-center hover:bg-gray-200">
                      <svg
                        className="inline w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                      </svg>
                      Xem
                    </span>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(
                        handleDeletePost({
                          idPost: id,
                          page: `user's post`,
                          samePage: category,
                        })
                      );
                    }}
                  >
                    <span className="block p-2 text-center hover:bg-gray-200">
                      <svg
                        className="inline w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                      Xóa
                    </span>
                  </li>
                  <li onClick={() => navigate(`/edit/${id}`)}>
                    <span className="block p-2 text-center hover:bg-gray-200">
                      <svg
                        className="inline w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                      </svg>
                      Chỉnh sửa
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <p>
            Đã xuất bản - {day} thg {month}
          </p>
        </div>
      </div>
      {window.innerWidth > 440 && (
        <div className="flex items-center">
          <span onClick={() => navigate(`/${category}/${id}`)} title="Xem">
            <svg
              fill="#546e7a "
              className="w-5 h-5 mr-4 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
            </svg>
          </span>
          <span onClick={() => navigate(`/edit/${id}`)} title="Chỉnh sửa">
            <svg
              fill="#546e7a"
              className="w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>
          </span>
          <span
            onClick={() => {
              dispatch(
                handleDeletePost({
                  idPost: id,
                  page: `user's post`,
                  samePage: category,
                })
              );
            }}
            title="Xóa"
          >
            <svg
              fill="#546e7a"
              className="w-5 h-5 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </span>
          <span title={author}>
            <img
              className="rounded-full w-7 h-7"
              src={`${
                userInfo?.photoURL ||
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709683200&semt=ais"
              }`}
              alt="userImage"
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default PostMainPageItem;
