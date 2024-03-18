/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import Header from "../Components/Header";
import parse from "html-react-parser";
import { db, handleSendImgToFirebase } from "../firebaseConfig";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const AddPostPage = () => {
  useShowScrollbar();
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();
  let [content, setContent] = useState("");
  let [img, setImg] = useState("");
  const category = watch("category");
  const handleSubmitForm = async (values) => {
    const date = new Date();
    if (!category) {
      toast("Please select an article category", {
        type: "error",
        pauseOnHover: false,
        autoClose: 1500,
      });
      return;
    }
    const imgPost = await handleSendImgToFirebase(img);
    switch (values.category) {
      case "Cuisine": {
        try {
          const userPost = await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await setDoc(doc(db, "Cuisine", userPost.id), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          toast("Post added successfully", {
            type: "success",
            pauseOnHover: false,
            autoClose: 1500,
          });
        } catch (error) {
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
          const userPost = await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await setDoc(doc(db, "Life", userPost.id), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
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
      case "Technology": {
        try {
          const userPost = await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await setDoc(doc(db, "Technology", userPost.id), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
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
          const userPost = await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            imgURL: imgPost,
            content: content,
            category: values.category,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await setDoc(doc(db, "Fashion", userPost.id), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
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
          const userPost = await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            imgURL: imgPost,
            category: values.category,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await setDoc(doc(db, "Game", userPost.id), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
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
  const handleSelectedImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImg(file);
  };

  return (
    <div className="w-full h-full">
      <Header hasSearchInput={false} hasSidebar={false}></Header>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="pt-[70px] fixed top-5 left-10 z-50 w-full"
      >
        <div className="flex items-center">
          <input
            {...register("title")}
            placeholder="Tiêu đề bài viết"
            type="text"
            className="w-[80%] outline-none  border-b-orange-300 border-b-2 focus:border-b-orange-400 transition-all dark:bg-themeDark"
          />
          <button
            type="submit"
            className="bg-[#f57c00] text-white px-2 flex items-center ml-10 py-2 rounded-sm"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
            </svg>
            Xuất bản
          </button>
        </div>
        <EditorToolbar toolbarId={"t1"} />
        <div className="dark:bg-themeDark h-full mt-[60px]  flex">
          <ReactQuill
            placeholder="Nội dung bài viết"
            onChange={setContent}
            value={content}
            theme="snow"
            modules={modules("t1")}
            formats={formats}
          ></ReactQuill>
          <div className=" bg-white shadow-2xl ml-10 w-[25%] pl-5 text-settingPostText">
            <span className="">Cài đặt bài đăng</span>
            <form>
              <label htmlFor="name-author" className="block mt-2 mb-1">
                Tên tác giả
              </label>
              <input
                {...register("author")}
                type="text"
                placeholder="Nhập tên tác giả"
                className="outline-none border-transparent border-b border-b-orange-500 mb-2 w-[80%]"
                id="name-author"
              />
              <label htmlFor="category" className="block mb-1">
                Thể loại bài viết
              </label>
              <div className="custom-select">
                <select className="select--category" {...register("category")}>
                  <option value="">Chọn thể loại</option>
                  <option value="Cuisine">Cuisine</option>
                  <option value="Life">Life</option>
                  <option value="Technology">Technology</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Game">Game</option>
                </select>
              </div>
              <label htmlFor="imgPost" className="block mt-2 mb-1">
                Ảnh bài viết
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
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddPostPage;
