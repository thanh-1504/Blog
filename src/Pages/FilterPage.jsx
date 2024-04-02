/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import FilterPageContext from "./FilterPageContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleGetDataFilterPost } from "../redux-thunk/handler";
import Header from "../Components/Header";
const FilterPage = () => {
  const { titlePost } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.filterPosts);
  useEffect(() => {
    dispatch(handleGetDataFilterPost(titlePost));
  }, [dispatch, titlePost]);
  return (
    <div className="bg-[#f1f1f1]">
      <Header hasHambugerIcon={false} hasSearchInput={false} userImgStyle="mr-0"></Header>
      <FilterPageContext data={data}></FilterPageContext>
    </div>
  );
};

export default FilterPage;
