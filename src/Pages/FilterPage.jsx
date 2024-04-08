/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import FilterPageContent from "./FilterPageContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleGetDataFilterPost } from "../redux-thunk/handler";
const FilterPage = () => {
  const dispatch = useDispatch();
  const { titlePost } = useParams();
  const [isFetchedData, setIsFetchedData] = useState(false);
  const { data } = useSelector((state) => state.filterPosts);
  useEffect(() => {
    dispatch(handleGetDataFilterPost(titlePost));
    setIsFetchedData(true);
    return () => {
      setIsFetchedData(false);
    };
  }, [dispatch, titlePost]);
  return (
    <div className="bg-[#f1f1f1]">
      <Header
        hasHambugerIcon={false}
        hasSearchInput={false}
        userImgStyle="mr-0"
        style="lg:px-10"
      ></Header>
      <FilterPageContent
        data={data}
        isFetchedData={isFetchedData}
      ></FilterPageContent>
    </div>
  );
};

export default FilterPage;
