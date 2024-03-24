/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { handleGetData, handleGetDataSamePost } from "./Slices/detailPage";
import {
  handleGetDataSavedPosts,
  handleGetDataViewedPosts,
} from "./Slices/userPageSlice";
import { requestDataFromUserPost } from "./request";
import { handleGetDataEditPost } from "./Slices/postEditSlice";
import { handleGetDataFilterInput } from "./Slices/filterPostsSlice";
import { useNavigate } from "react-router-dom";
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

export const handleGetDataFilterPost = createAsyncThunk(
  "getDataFilterInput",
  async (value, { dispatch }) => {
    console.log(value);
    const result = [];
    const cuisineSnapshot = await getDocs(collection(db, "Cuisine"));
    cuisineSnapshot.forEach((doc) => {
      if (doc.data().title.includes(value))
        result.push({ id: doc.id, ...doc.data() });
    });
    const lifeSnapshot = await getDocs(collection(db, "Life"));
    lifeSnapshot.forEach((doc) => {
      if (doc.data().title.includes(value))
        result.push({ id: doc.id, ...doc.data() });
    });
    const gameSnapshot = await getDocs(collection(db, "Game"));
    gameSnapshot.forEach((doc) => {
      if (doc.data().title.includes(value))
        result.push({ id: doc.id, ...doc.data() });
    });
    const fashionSnapshot = await getDocs(collection(db, "Fashion"));
    fashionSnapshot.forEach((doc) => {
      if (doc.data().title.includes(value))
        result.push({ id: doc.id, ...doc.data() });
    });
    const techSnapshot = await getDocs(collection(db, "Technology"));
    techSnapshot.forEach((doc) => {
      if (doc.data().title.includes(value))
        result.push({ id: doc.id, ...doc.data() });
    });
    dispatch(handleGetDataFilterInput(result));
  }
);

export const handleGetSamePost = createAsyncThunk(
  "getSamePost",
  async ({ page, idPost }, { dispatch }) => {
    const data = [];
    const q = query(
      collection(db, page),
      where("category", "==", page),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((post) => {
      data.push({
        id: post.id,
        ...post.data(),
      });
    });
    dispatch(handleGetDataSamePost(data.filter((post) => post.id !== idPost)));
  }
);
