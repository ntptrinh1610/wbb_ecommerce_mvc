import React, { useContext, useEffect, useState } from "react";
import CategoryCollapse from "../CategoryCollapse";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Rating,
} from "@mui/material";
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
import { FaFilter } from "react-icons/fa";

const Sidebar = (props) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvaiFilter, setIsOpenAvaiFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 10,
  });
  const [price, setPrice] = useState([0, 100]);

  const context = useContext(MyContext);
  const location = useLocation();

  const filterData = () => {
    props?.setIsLoading(true);
    if (context?.searchData?.data?.length > 0) {
      props?.setProductData(context?.searchData);
      props?.setTotalPages(context?.searchData?.totalPages);
      props?.setIsLoading(false);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        props?.setProductData(res);
        props?.setIsLoading(false);
        props?.setTotalPages(res?.totalPages);
        // window.scrollTo(0, 0);
        console.log("haha");
      });
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      filters.catId = [...filters.catId, categoryId];
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }

    if (url.includes("subCatId")) {
      const subCategoryId = queryParameters.get("subCatId");
      filters.subCatId = [...filters.subCatId, subCategoryId];
      filters.catId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }

    if (url.includes("thirdSubCatId")) {
      const thirdSubCategoryId = queryParameters.get("thirdSubCatId");
      filters.thirdSubCatId = [...filters.thirdSubCatId, thirdSubCategoryId];
      filters.catId = [];
      filters.subCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }
    filters.page = 1;
    filterData();
  }, [location]);

  useEffect(() => {
    filters.page = props?.page;
    filterData();
    console.log(context?.searchData);
  }, [filters, props?.page, context?.searchData]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  const handleCheckBoxChange = (field, value) => {
    context?.setSearchData([]);
    const currentValues = filters[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));

    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdSubCatId: [],
      }));
    }
  };

  return (
    <aside className="sidebar py-3 lg:py-5 static lg:sticky top-[50px]">
      <div className="max-h-[60vh] lg:overflow-hidden overflow-auto w-full ">
        <div className="box">
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
            Select Category
            <Button
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
              onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
            >
              {isOpenCategoryFilter ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpenCategoryFilter}>
            <div className="scroll px-3 relative -left-[10]">
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label={item?.name}
                      className="w-full"
                      key={index}
                      value={item?._id}
                      checked={filters?.catId?.includes(item?._id)}
                      onChange={() => handleCheckBoxChange("catId", item?._id)}
                    />
                  );
                })}
            </div>
          </Collapse>
        </div>

        <div className="box">
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
            Availability
            <Button
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
              onClick={() => setIsOpenAvaiFilter(!isOpenAvaiFilter)}
            >
              {isOpenAvaiFilter ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpenAvaiFilter}>
            <div className="scroll px-3 relative -left-[10]">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Available"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="In stock"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Not available"
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        <div className="box">
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
            Size
            <Button
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
              onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
            >
              {isOpenSizeFilter ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpenSizeFilter}>
            <div className="scroll px-3 relative -left-[10]">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={"Small"}
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        <div className="box mt-4">
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
            Filter By Price
          </h3>

          <RangeSlider
            value={price}
            onInput={setPrice}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex py-2 priceRange">
            <span className="text-[13px]">
              From: <strong className="text-dark">$: {price[0]}</strong>
            </span>
            <span className="ml-auto text-[13px]">
              From: <strong className="text-dark">$: {price[1]}</strong>
            </span>
          </div>
        </div>

        <div className="box mt-4">
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
            Filter By Rating
          </h3>
          <div className="flex items-center pl-2 lg:pl-0 ">
            <FormControlLabel
              onChange={() => {
                handleCheckBoxChange("rating", 5);
              }}
              value={5}
              checked={filters?.rating?.includes(5)}
              control={<Checkbox size="small" />}
              className="w-full"
            />
            <Rating name="size-small" defaultValue={5} size="small" readOnly />
          </div>
          <div className="flex items-center pl-2 lg:pl-0">
            <FormControlLabel
              onChange={() => {
                handleCheckBoxChange("rating", 4);
              }}
              value={4}
              checked={filters?.rating?.includes(4)}
              control={<Checkbox size="small" />}
              className="w-full"
            />
            <Rating name="size-small" defaultValue={4} size="small" readOnly />
          </div>
          <div className="flex items-center pl-2 lg:pl-0">
            <FormControlLabel
              onChange={() => {
                handleCheckBoxChange("rating", 3);
              }}
              value={3}
              checked={filters?.rating?.includes(3)}
              control={<Checkbox size="small" />}
              className="w-full"
            />
            <Rating name="size-small" defaultValue={3} size="small" readOnly />
          </div>
          <div className="flex items-center pl-2 lg:pl-0">
            <FormControlLabel
              onChange={() => {
                handleCheckBoxChange("rating", 2);
              }}
              value={2}
              checked={filters?.rating?.includes(2)}
              control={<Checkbox size="small" />}
              className="w-full"
            />
            <Rating name="size-small" defaultValue={2} size="small" readOnly />
          </div>
          <div className="flex items-center pl-2 lg:pl-0">
            <FormControlLabel
              onChange={() => {
                handleCheckBoxChange("rating", 1);
              }}
              value={1}
              checked={filters?.rating?.includes(1)}
              control={<Checkbox size="small" />}
              className="w-full"
            />
            <Rating name="size-small" defaultValue={1} size="small" readOnly />
          </div>{" "}
        </div>
      </div>
      <br />
      <Button
        onClick={() => {
          context?.setOpenFilter(false);
        }}
        className="btn-challe w-full !flex lg:!hidden "
      >
        <FaFilter size={16} /> &nbsp; Filters
      </Button>
    </aside>
  );
};

export default Sidebar;
