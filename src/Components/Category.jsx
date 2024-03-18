/* eslint-disable no-unused-vars */
import React from "react";


const Category = ({ children = "", style = "" }) => {
  return (
    <span className={`text-4xl inline-block font-semibold ${style}`}>
      {children}
    </span>
  );
};

export default Category;
