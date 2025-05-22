import React, { useContext, useState } from "react";
import "../Search/style.css";
// import style from ''

import { IoSearch } from "react-icons/io5";

import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const history = useNavigate();

  const onChangeInput = (e) => {
    if (e.target.value !== "") {
      setSearchQuery(e.target.value);
    }
  };

  const search = (e) => {
    setIsLoading(true);
    let obj = {
      query: searchQuery,
      page: 1,
      limit: 3,
    };
    if (searchQuery !== "") {
      postData(`/api/product/search`, obj).then((res) => {
        context?.setSearchData(res);
        setIsLoading(false);
        context?.setOpenSearch(false);
        history("/search");
      });
    }
  };

  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2! flex items-center">
      <input
        type="text"
        placeholder="Search for products"
        className="w-full h-[35px] focus:outline-none bg-inherit p-2! text-[15px]"
        onChange={onChangeInput}
      />
      <Button
        onClick={search}
        className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black"
      >
        {isLoading ? (
          <div className="flex items-center justify-center ">
            <CircularProgress />
          </div>
        ) : (
          <IoSearch className="text-black text-[22px]" />
        )}
      </Button>
    </div>
  );
};

export default Search;
