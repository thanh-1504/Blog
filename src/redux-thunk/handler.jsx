/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { handleGetData } from "./Slices/detailPage";
import {
  handleGetDataSavedPosts,
  handleGetDataViewedPosts,
} from "./Slices/userPageSlice";
import { requestDataFromUserPost } from "./request";
import { handleGetDataEditPost } from "./Slices/postEditSlice";
export const handleDeletePost = createAsyncThunk(
  "deletePost",
  ({ idPost, page, idSamePost, samePage }) => {
    Swal.fire({
      title: "Do you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Post deleted successfully", "", "success");
        deleteDoc(doc(db, page, idPost));
        deleteDoc(doc(db, samePage, idSamePost));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
);

export const handleFetchDataDiscoverPage = createAsyncThunk(
  "fetchDataDiscoverPage",
  async (category) => {
    if (!category) return;
    const dataPost = [];
    switch (category) {
      case "Popular": {
        onSnapshot(collection(db, category), (snapshot) => {
          snapshot.forEach((dataPostItem) => {
            dataPost.push({
              id: dataPostItem.id,
              ...dataPostItem.data(),
            });
          });
        });
        break;
      }
      case "Cuisine": {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          dataPost.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      }
      case "Life": {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          dataPost.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      }
      case "Technology": {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          dataPost.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      }
      case "Fashion": {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          dataPost.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      }
      case "Game": {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          dataPost.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        break;
      }

      default:
        break;
    }
    return dataPost;
  }
);

export const handleGetDataDetailPage = createAsyncThunk(
  "getData",
  async ({ idPost, page }, { dispatch }) => {
    const docRef = doc(db, page, idPost);
    const dataPost = await getDoc(docRef);
    dispatch(handleGetData(dataPost.data()));
    return dataPost.data();
  }
);

export const handleViewedPost = createAsyncThunk(
  "handleViewedPost",
  async ({ data, page = "" }) => {
    if (!page.includes("/user")) await addDoc(collection(db, "Viewed"), data);
  }
);

export const handleGetViewedPost = createAsyncThunk(
  "getViewedPost",
  async (_, { dispatch }) => {
    const dataViewedPost = [];
    onSnapshot(collection(db, "Viewed"), (snapshot) => {
      snapshot.forEach((post) => {
        dataViewedPost.push({
          ...post.data(),
        });
      });
      dispatch(handleGetDataViewedPosts(dataViewedPost));
    });
  }
);

export const handleGetSavedPosts = createAsyncThunk(
  "getSavedPosts",
  async (_, { dispatch }) => {
    const dataSavedPosts = [];
    onSnapshot(collection(db, "Saved"), (snapshot) => {
      snapshot.forEach((post) => {
        dataSavedPosts.push({
          ...post.data(),
        });
      });
      dispatch(handleGetDataSavedPosts(dataSavedPosts));
    });
  }
);

export const handleGetDataUserPost = createAsyncThunk(
  "getDataUserPost",
  async (idPost, { dispatch }) => {
    const data = await requestDataFromUserPost(idPost);
    dispatch(handleGetDataEditPost(data));
  }
);

