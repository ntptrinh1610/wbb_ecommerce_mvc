import React, { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductItem from "../../components/ProductItem";

import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";

import QuantityBox from "../../components/QuantityBox";

import {
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  Pagination,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import { MyContext } from "../../App";

const ProductInfo = (props) => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const addToCart = async (product, userId) => {
    setIsLoading(true);

    if (props?.item?.size?.length !== 0 && !selectedTabName) {
      context?.openAlertBox("error", "Please select size!");
      setIsLoading(false);
      return;
    }
    if (props?.item?.productRam?.length !== 0 && !selectedTabName) {
      context?.openAlertBox("error", "Please select ram!");
      setIsLoading(false);
      return;
    }
    if (props?.item?.productWeight?.length !== 0 && !selectedTabName) {
      context?.openAlertBox("error", "Please select weight!");
      setIsLoading(false);
      return;
    }

    const productItem = {
      productId: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      brand: product?.brand,
      quantity: quantity,
      subTotal: parseFloat(product?.price * quantity),
      countInStock: product?.countInStock,
      userId: userId,
      size: props?.item?.size?.length !== 0 ? selectedTabName : "",
      ram: props?.item?.productRam?.length !== 0 ? selectedTabName : "",
      weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : "",
    };

    const res = await context?.addToCart(productItem, userId, quantity);
    setIsLoading(false);
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedTabName(name);
  };

  return (
    <>
      <div className="productContent flex flex-col w-full lg:px-10">
        <h1 className="text-[18px] sm:text-[25px] font-[600] mb-2">
          {props?.item?.name}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-3">
          <span className="text-gray-400 text-[13px]">
            Brands :{" "}
            <span className="font-[500] text-black opacity-75">
              {props?.item?.brand}
            </span>
          </span>
          <Rating
            name="size-small"
            defaultValue={props?.item?.rating}
            size="small"
            readOnly
          />
          <span
            className="text-[13px] cursor-pointer"
            onClick={props.gotoReviews}
          >
            Review ({props?.reviewsCount ? props?.reviewsCount : 0})
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4 mt-4">
          <div className="flex items-center gap-4">
            <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
              &#36; {props?.item?.oldPrice}
            </span>
            <span className="price text-red-400 text-[15px] font-[600]">
              &#36; {props?.item?.price}
            </span>
          </div>

          <span className="text-[14px]">
            Available In Stock:{" "}
            <span className="text-green-600 text-[14px] font-bold">
              {props?.item?.countInStock}
            </span>
          </span>
        </div>
        <p className="mt-3 mr-10 mb-5">{props?.item?.description}</p>
        {props?.item?.productRam?.length !== 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[16px]">RAM: </span>
            <div className="flex items-center gap-1 actions">
              {props?.item?.productRam?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className={`${
                      activeTab === index ? "!bg-mocha-mousse !text-white" : ""
                    }`}
                    onClick={() => handleClickActiveTab(index, item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {props?.item?.size?.length !== 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[16px]">Size: </span>
            <div className="flex items-center gap-1 actions">
              {props?.item?.size?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className={`${
                      activeTab === index ? "!bg-mocha-mousse !text-white" : ""
                    }`}
                    onClick={() => handleClickActiveTab(index, item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        {props?.item?.productWeight?.length !== 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[16px]">Weight: </span>
            <div className="flex items-center gap-1 actions">
              {props?.item?.weight?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className={`${
                      activeTab === index ? "!bg-mocha-mousse !text-white" : ""
                    }`}
                    onClick={() => handleClickActiveTab(index, item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        <p className="text-[14px] mt-5 mb-2 text-[#000]">
          Free Shipping (Est. Delivery Time 2-3 Days)
        </p>
        <div className="flex items-center gap-4 py-4">
          <div className="qtyBoxWrapper w-[70px]">
            <QuantityBox
              handleSelectQty={handleSelectQty}
              quantity={props?.item?.quantity}
            />
          </div>
          <Button
            onClick={() => addToCart(props?.item, context?.userData?._id)}
            className="btn-challe flex gap-2 w-[200px] h-[50px] "
          >
            {isLoading ? (
              <CircularProgress className="!text-white " />
            ) : (
              <>
                <FaShoppingCart className="text-[22px]" />
                Add to Cart
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <span className="text-[rgba(0,0,0,0.6)] flex items-center gap-2 text-[13px] lg:text-[15px] link cursor-pointer font-[500]">
            <FaHeart className="text-[18px] " /> Add to Wishlist
          </span>
          <span className="text-[rgba(0,0,0,0.6)] flex items-center gap-2 text-[13px] lg:text-[15px] link cursor-pointer font-[500]">
            <IoGitCompareSharp className="text-[18px]" /> Add to Compare
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
