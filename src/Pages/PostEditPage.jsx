/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../Components/EditorToolbar";
import { useShowScrollbar } from "../hooks/useShowScrollbar";
import Header from "../Components/Header";
import { db, handleSendImgToFirebase } from "../firebaseConfig";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleGetDataUserPost } from "../redux-thunk/handler";
import { useParams } from "react-router-dom";
import { handleGetDataEditPost } from "../redux-thunk/Slices/postEditSlice";
const PostEditPage = () => {
  useShowScrollbar();
  const { idPost } = useParams();
  const { handleSubmit, register, watch } = useForm();
  let [img, setImg] = useState("");
  const { dataPostEdit } = useSelector((state) => state.editPost);
  const dispatch = useDispatch();
  let [content, setContent] = useState();
  const category = watch("category");
  const handleEditPost = async (values) => {
    const date = new Date();
    const imgPost = await handleSendImgToFirebase(img);
    console.log(values.category);
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
          toast("Post added successfully", {
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
          await addDoc(collection(db, "Life"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await addDoc(collection(db, "user's post"), {
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
          console.log(error);
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
          await addDoc(collection(db, "Technology"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await addDoc(collection(db, "user's post"), {
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
          await addDoc(collection(db, "Fashion"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            imgURL: imgPost,
            content: content,
            category: values.category,
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
          await addDoc(collection(db, "Game"), {
            title: values.title,
            author: values.author,
            category: values.category,
            imgURL: imgPost,
            content: content,
            dateCreated: serverTimestamp(),
            dateCreatedInSeconds: date.getMilliseconds(),
          });
          await addDoc(collection(db, "user's post"), {
            title: values.title,
            author: values.author,
            imgURL: imgPost,
            category: values.category,
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
  useEffect(() => {
    dispatch(handleGetDataUserPost(idPost));
    return () => {
      dispatch(handleGetDataEditPost({}));
    };
  }, [dispatch, idPost]);
  const handleSelectedImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImg(file);
  };
  return (
    <div className="w-full h-full">
      <Header hasSearchInput={false} hasSidebar={false}></Header>
      <form
        onSubmit={handleSubmit(handleEditPost)}
        className="pt-[70px] fixed top-5 left-10 z-50 w-full"
      >
        <div className="flex items-center">
          <input
            {...register("title")}
            defaultValue={dataPostEdit.title}
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
            theme="snow"
            modules={modules("t1")}
            value={content || dataPostEdit.content}
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
                defaultValue={dataPostEdit.author}
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
                    img ? URL.createObjectURL(img) : `${dataPostEdit?.imgURL}`
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

export default PostEditPage;
