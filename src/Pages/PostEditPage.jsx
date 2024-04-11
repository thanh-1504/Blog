/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { handleShowSettingPost } from "../redux-thunk/Slices/generalSlice";
import { handleGetDataUserPost } from "../redux-thunk/handler";
import { handleGetDataEditPost } from "../redux-thunk/Slices/postEditSlice";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, handleSendImgToFirebase } from "../firebaseConfig";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
const PostEditPage = () => {
  useShowScrollbar();
  const { idPost } = useParams();
  const dispatch = useDispatch();
  let [img, setImg] = useState("");
  let [content, setContent] = useState();
  const { handleSubmit, register } = useForm();
  const { dataPostEdit } = useSelector((state) => state.editPost);
  const { showSettingPost } = useSelector((state) => state.general);
  const handleSelectedImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImg(file);
  };
  const handleEditPost = async (values) => {
    const date = new Date();
    const imgPost = await handleSendImgToFirebase(img);
    switch (values.category) {
      case "Cuisine": {
        try {
          await updateDoc(doc(db, "Cuisine", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await updateDoc(doc(db, "user's post", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post edited successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
          console.log(error);
          toast(error, {
            type: "error",
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
        break;
      }
      case "Life": {
        try {
          await updateDoc(doc(db, "Life", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await updateDoc(doc(db, "user's post", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post edited successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
          toast("Add post failed please try again!", {
            type: "error",
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
        break;
      }
      case "Technology": {
        try {
          await updateDoc(doc(db, "Technology", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await updateDoc(doc(db, "user's post", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post added successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
          toast("Add post failed please try again!", {
            type: "error",
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
        break;
      }
      case "Fashion": {
        try {
          await updateDoc(doc(db, "Fashion", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await updateDoc(doc(db, "user's post", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post added successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
          toast("Add post failed please try again!", {
            type: "error",
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
        break;
      }
      case "Game": {
        try {
          await updateDoc(doc(db, "Game", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await updateDoc(doc(db, "user's post", idPost), {
            title: values.title || dataPostEdit.title,
            author: values.author || dataPostEdit.author,
            category: values.category,
            imgURL: imgPost || dataPostEdit.imgURL,
            content: content || dataPostEdit.content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post added successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
          toast("Add post failed please try again!", {
            type: "error",
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    dispatch(handleGetDataUserPost(idPost));
    return () => {
      dispatch(handleGetDataEditPost({}));
    };
  }, [dispatch, idPost]);
  return (
    <div className="w-full h-full">
      <Header hasSearchInput={false} hasSidebar={false}></Header>
      <form
        onSubmit={handleSubmit(handleEditPost)}
        className="pt-[70px] fixed top-5 lg:left-10 z-50 w-full h-full"
      >
        <div className="flex items-center mb:px-3 lg:px-0">
          <input
            {...register("title")}
            defaultValue={dataPostEdit.title}
            placeholder="Post title"
            type="text"
            className="w-[80%] outline-none  border-b-orange-300 border-b-2 focus:border-b-orange-400 transition-all dark:bg-themeDark"
          />
          <button
            type="submit"
            className="bg-[#f57c00] text-white lg:px-2 mb:p-[13px] flex items-center lg:ml-10 mb:ml-2 py-2 rounded-sm"
          >
            <svg
              className="w-5 h-5 lg:mr-2"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
            </svg>
            {window.innerWidth > 440 && "Publish"}
          </button>
          {window.innerWidth <= 480 && (
            <div className="relative p-3 ml-3 border border-gray-300 dark:bg-gray-100">
              <svg
                onClick={() => {
                  dispatch(handleShowSettingPost(!showSettingPost));
                }}
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
              <div
                className={`setting__post absolute dark:bg-themeDark  -right-5 top-12 z-50 bg-white h-screen w-[200px] pl-5 pt-3 shadow-2xl transition-transform duration-700  ${
                  showSettingPost ? "translate-x-0" : "translate-x-[130%]"
                }`}
              >
                <span>Post settings</span>
                <svg
                  onClick={() => dispatch(handleShowSettingPost(false))}
                  className="inline-block float-right w-5 h-5 mr-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
                <form>
                  <label htmlFor="name-author" className="block mt-2 mb-1">
                    Author's name
                  </label>
                  <input
                    {...register("author")}
                    type="text"
                    placeholder=" Author's name"
                    className="outline-none border-transparent border-b border-b-orange-500 mb-2 w-[80%] dark:bg-themeDark"
                    id="name-author"
                  />
                  <label htmlFor="category" className="block mb-1">
                    Post category
                  </label>
                  <div className="custom-select">
                    <select
                      className="select--category"
                      {...register("category")}
                    >
                      <option value={dataPostEdit?.category}>
                        {dataPostEdit?.category}
                      </option>
                    </select>
                  </div>
                  <label htmlFor="imgPost" className="block mt-2 mb-1">
                    Post photo
                  </label>
                  <div className="file-upload w-[80%]">
                    <img
                      src={`${
                        img
                          ? URL.createObjectURL(img)
                          : "https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      } `}
                      className="w-full h-[100px] object-cover"
                      alt="upload"
                    />
                    <h3>Click box to upload</h3>
                    <p>Maximun file size 10mb</p>
                    <input onChange={handleSelectedImg} type="file" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={(e) =>
            !e.target.matches("setting__post") &&
            dispatch(handleShowSettingPost(false))
          }
          className="relative h-full"
        >
          <div
            className={`overlay absolute inset-0 z-40 transition-all duration-200 ${
              showSettingPost
                ? "visible opacity-100 bg-[rgba(0,0,0,.12)]"
                : "invisible opacity-0"
            } `}
          ></div>
          <div className="overflow-auto mb:mt-1 lg:mt-0">
            <EditorToolbar toolbarId={"t1"} />
          </div>
          <div className="dark:bg-themeDark h-full lg:mt-[20px] mb:mt-2 flex">
            <ReactQuill
              placeholder="Content"
              onChange={setContent}
              theme="snow"
              modules={modules("t1")}
              value={content || dataPostEdit.content}
              formats={formats}
            ></ReactQuill>
            {window.innerWidth > 440 && (
              <div className=" bg-white shadow-2xl ml-10 w-[25%] pl-5 text-settingPostText 2xl:pt-5 dark:bg-themeDark dark:border-l dark:border-l-[#aaaaaa]">
                <span className="lg:text-xl">Post settings</span>
                <form>
                  <label htmlFor="name-author" className="block mt-2 mb-1">
                    Author's name
                  </label>
                  <input
                    {...register("author")}
                    type="text"
                    placeholder=" Author's name"
                    className="outline-none border-transparent border-b border-b-orange-500 mb-2 w-[80%] dark:bg-themeDark dark:text-white placeholder:text-sm"
                    id="name-author"
                  />
                  <label htmlFor="category" className="block mb-1">
                    Post category
                  </label>
                  <div className="custom-select">
                    <select
                      className="select--category"
                      {...register("category")}
                    >
                      <option value={dataPostEdit?.category}>
                        {dataPostEdit?.category}
                      </option>
                    </select>
                  </div>
                  <label htmlFor="imgPost" className="block mt-2 mb-1">
                    Post photo
                  </label>
                  <div className="file-upload w-[80%]">
                    <img
                      src={`${
                        img
                          ? URL.createObjectURL(img)
                          : "https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      } `}
                      className="w-full h-[100px] object-cover"
                      alt="upload"
                    />
                    <h3>Click box to upload</h3>
                    <p>Maximun file size 10mb</p>
                    <input onChange={handleSelectedImg} type="file" />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </form>
      <ToastContainer className="mobile-toast-container" />
    </div>
  );
};

export default PostEditPage;
