/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { handleGetData, handleGetDataSamePost } from "./Slices/detailPage";
import { handleGetData as handleGetUserDataOnMainPage } from "./Slices/postMainPageSlice";
import {
  handleGetDataSavedPosts,
  handleGetDataViewedPosts,
} from "./Slices/userPageSlice";
import { requestDataFromUserPost } from "./request";
import { handleGetDataEditPost } from "./Slices/postEditSlice";
import { handleGetDataFilterInput } from "./Slices/filterPostsSlice";
import { handleGetDataDiscover } from "./Slices/discoverSlice";
export const handleDeletePost = createAsyncThunk(
  "deletePost",
  ({ idPost, page, samePage }) => {
    Swal.fire({
      title: "Do you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Post deleted successfully", "", "success");
        deleteDoc(doc(db, page, idPost));
        deleteDoc(doc(db, samePage, idPost));
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

export const handleGetDataDiscoverPage = createAsyncThunk(
  "getDataDiscoverPage",
  async ({ category, setIsFetchedData }, { dispatch }) => {
    const response = await dispatch(handleFetchDataDiscoverPage(category));
    const data = response.payload;
    dispatch(handleGetDataDiscover(data));
    setIsFetchedData(true);
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
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];
    const userIndex = viewed.findIndex((user) => user.userId === userId);
    if (userIndex === -1) viewed.push({ userId, idPosts: [data.id] });
    else {
      if (!viewed[userIndex].idPosts.includes(data.id))
        viewed[userIndex].idPosts.push(data.id);
    }
    if (!page.includes("/user")) {
      await setDoc(doc(db, "Viewed", data.id), data);
      localStorage.setItem("viewed", JSON.stringify(viewed));
    }
  }
);

export const handleSavedPost = createAsyncThunk(
  "handleSavedPost",
  ({ data }) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const savedPost = JSON.parse(localStorage.getItem("savedPost")) || [];
    const userIndex = savedPost.findIndex((user) => user.userId === userId);
    setDoc(doc(db, "SavedPosts", data.id), data);
    if (userIndex === -1) {
      savedPost.push({ userId, idPostsSaved: [data.id] });
    } else {
      if (!savedPost[userIndex].idPostsSaved.includes(data.id))
        savedPost[userIndex].idPostsSaved.push(data.id);
      else {
        savedPost[userIndex].idPostsSaved = savedPost[
          userIndex
        ].idPostsSaved.filter((id) => id !== data.id);
        deleteDoc(doc(db, "SavedPosts", data.id));
      }
    }
    localStorage.setItem("savedPost", JSON.stringify(savedPost));
  }
);

export const handleGetViewedPost = createAsyncThunk(
  "getViewedPost",
  async (_, { dispatch }) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];
    const dataViewedPost = [];
    onSnapshot(collection(db, "Viewed"), (snapshot) => {
      snapshot.forEach((post) => {
        dataViewedPost.push({
          ...post.data(),
        });
      });
      const listViewedPost = viewed.filter((user) => user.userId === userId)[0]
        ?.idPosts;
      dispatch(
        handleGetDataViewedPosts(
          dataViewedPost.filter((post) => listViewedPost.includes(post.id))
        )
      );
    });
  }
);

export const handleGetSavedPosts = createAsyncThunk(
  "getSavedPosts",
  async (_, { dispatch }) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const savedPosts = JSON.parse(localStorage.getItem("savedPost")) || [];
    const dataSavedPosts = [];
    onSnapshot(collection(db, "SavedPosts"), (snapshot) => {
      snapshot.forEach((post) => {
        dataSavedPosts.push({
          ...post.data(),
        });
      });
      const listSavedPosts = savedPosts.filter(
        (user) => user.userId === userId
      )[0].idPostsSaved;
      dispatch(
        handleGetDataSavedPosts(
          dataSavedPosts.filter((post) => listSavedPosts.includes(post.id))
        )
      );
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

export const handleShowSidebar = (toggleSidebar, page = "") => {
  if (window.innerWidth > 440) {
    if (!toggleSidebar) {
      if (page === "userPage" || page === "discoverPage")
        return { marginLeft: `${window.innerWidth * (1 - 89.32 / 100)}px` };
      if (page === "/") return { marginLeft: `${window.innerWidth * 0.129}px` };
    }
    if (toggleSidebar) {
      if (page === "/")
        return { marginLeft: `${window.innerWidth * 0.22656}px` };
    }
  }
};

export const handleGetUserData = createAsyncThunk(
  "getDataUserPost",
  (setIsDataFetched, { dispatch }) => {
    onSnapshot(collection(db, "user's post"), (snapshot) => {
      const dataPost = [];
      snapshot.forEach((doc) => {
        dataPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const filteredDataPost = dataPost.filter(
        (post) => post.idUser === JSON.parse(localStorage.getItem("user"))?.id
      );
      dispatch(handleGetUserDataOnMainPage(filteredDataPost));
      setIsDataFetched(true);
    });
  }
);
