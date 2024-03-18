/* eslint-disable no-unused-vars */
import React from "react";
import FilterPageContext from "./FilterPageContext";
import HeaderWithNoSearch from "../Components/HeaderWithNoSearch";

const FilterPage = () => {
  return (
    <div className="bg-[#f1f1f1]">
      <HeaderWithNoSearch></HeaderWithNoSearch>
      <FilterPageContext></FilterPageContext>
    </div>
  );
};

export default FilterPage;
