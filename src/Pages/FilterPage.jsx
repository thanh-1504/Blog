/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FilterPageContext from "./FilterPageContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleGetDataFilterPost } from "../redux-thunk/handler";
import Header from "../Components/Header";
const FilterPage = () => {
  const { titlePost } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.filterPosts);
  const [isFetchedData,setIsFetchedData] = useState(false)
  useEffect(() => {
    dispatch(handleGetDataFilterPost(titlePost));
    setIsFetchedData(true)
  }, [dispatch, titlePost]);
  return (
    <div className="bg-[#f1f1f1]">
      <Header
        hasHambugerIcon={false}
        hasSearchInput={false}
        userImgStyle="mr-0"
        style="lg:px-10"
      ></Header>
      <FilterPageContext data={data} isFetchedData={isFetchedData}></FilterPageContext>
    </div>
  );
};

export default FilterPage;
