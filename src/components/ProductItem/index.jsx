import React, { useContext, useEffect, useState } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Rating, Tooltip } from "@mui/material";
import { MdClose, MdOutlineZoomOutMap } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { MyContext } from "../../App";

const ProductItem = (props) => {
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedMyList, setIsAddedMyList] = useState(false);

  const addToCart = async (product, userId, quantity) => {
    setIsLoading(true);

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

    if (isShowTabs) {
      setIsShowTabs(false);
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
    }

    if (
      product?.size?.length !== 0 ||
      product?.productWeight?.length !== 0 ||
      product?.productRam?.length !== 0
    ) {
      setIsShowTabs(true);
      setIsLoading(false);
    } else {
      await context?.addToCart(productItem, userId, quantity);
      setIsShowTabs(false);
    }

    if (activeTab !== null) {
      await context?.addToCart(productItem, userId, quantity);
      setIsShowTabs(false);
    }

    setIsLoading(false);
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedTabName(name);
  };

  const handleAddToMyList = async (product) => {
    let res;

    const productItem = {
      productId: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      brand: product?.brand,
    };

    // if (isShowTabs) {
    //   setIsShowTabs(false);
    //   if (props?.item?.size?.length !== 0 && !selectedTabName) {
    //     context?.openAlertBox("error", "Please select size!");
    //     setIsLoading(false);
    //     return;
    //   }
    //   if (props?.item?.productRam?.length !== 0 && !selectedTabName) {
    //     context?.openAlertBox("error", "Please select ram!");
    //     setIsLoading(false);
    //     return;
    //   }
    //   if (props?.item?.productWeight?.length !== 0 && !selectedTabName) {
    //     context?.openAlertBox("error", "Please select weight!");
    //     setIsLoading(false);
    //     return;
    //   }
    // }

    // if (
    //   product?.size?.length !== 0 ||
    //   product?.productWeight?.length !== 0 ||
    //   product?.productRam?.length !== 0
    // ) {
    //   setIsShowTabs(true);
    //   setIsLoading(false);
    // } else {
    res = await context?.addToList(productItem);
    setIsShowTabs(false);
    // }

    // if (activeTab !== null) {
    //   res = await context?.addToCart(productItem, userId, quantity);
    //   setIsShowTabs(false);
    // }
    if (!res) {
      setIsAddedMyList(true);
      context?.getListData();
    }
    setIsLoading(false);
  };

  return (
    <div className="productItem w-[280px] shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper relative overflow-hidden rounded-md rounded-bl-none rounded-br-none ">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[220px] overflow-hidden">
            <img
              src={props?.item?.images[0]}
              className="w-full h-full object-contain"
            />
            <img
              src={props?.item?.images[1]}
              className="w-full h-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>

        {isShowTabs && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-60 p-3 gap-2">
            <Button
              onClick={() => setIsShowTabs(false)}
              className="!absolute top-[10px] right-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !h-[30px] !rounded-full !bg-[rgba(255,255,255,1)] "
            >
              <MdClose className="text-black z-90 text-[25px]" />
            </Button>

            {props?.item?.size?.length !== 0 &&
              props?.item?.size?.map((item, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, item)}
                    key={index}
                    className={`flex items-center justify-center py-1 px-2 bg-[rgba(255,255,255,0.8)] max-w-[45px] h-[25px] rounded-sm cursor-pointer hover:bg-white ${
                      activeTab === index && "bg-mocha-mousse text-white "
                    } `}
                  >
                    {item}
                  </span>
                );
              })}
            {props?.item?.productRam?.length !== 0 &&
              props?.item?.productRam?.map((item, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, item)}
                    key={index}
                    className={`flex items-center justify-center py-1 px-2 bg-[rgba(255,255,255,0.8)] max-w-[45px] h-[25px] rounded-sm cursor-pointer hover:bg-white ${
                      activeTab === index && "bg-mocha-mousse text-white "
                    } `}
                  >
                    {item}
                  </span>
                );
              })}
            {props?.item?.productWeight?.length !== 0 &&
              props?.item?.productWeight?.map((item, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, item)}
                    key={index}
                    className={`flex items-center justify-center py-1 px-2 bg-[rgba(255,255,255,0.8)] max-w-[45px] h-[25px] rounded-sm cursor-pointer hover:bg-white ${
                      activeTab === index && "bg-mocha-mousse text-white "
                    } `}
                  >
                    {item}
                  </span>
                );
              })}
          </div>
        )}

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-red-400 text-white rounded-lg p-1 text-[12px] font-[500]">
          {props?.item?.discount}%
        </span>
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] group-hover:top-[15px] transition-all duration-300 ">
          <Button
            onClick={() => {
              context?.handleClickOpenProductDetailsModal(true, props?.item);
            }}
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)]"
          >
            <MdOutlineZoomOutMap className="text-[18px] text-black" />
          </Button>
          <Button
            onClick={() => handleAddToMyList(props?.item)}
            className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)] `}
          >
            <FaHeart
              className={`text-[18px]  ${
                isAddedMyList ? "text-mocha-mousse" : "text-black"
              } `}
            />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)]">
            <IoGitCompareSharp className="text-[18px] text-black" />
          </Button>
        </div>
      </div>
      <div className="info p-3">
        <h6 className="text-[11px] lg:text-[13px] !font-[400]">
          <span
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.brand}
          </span>
        </h6>
        <h3 className="text-[11px] lg:text-[13px]title mt-1 font-[500] mb-1 text-[rgba(0,0,0,0.9)]">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name?.substr(0, 40) + "..."}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
          precision={0.1}
        />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[15px] font-[500]">
            &#36;
            {props?.item?.oldPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          <span className="price text-red-400 text-[12px] lg:text-[15px] font-[600]">
            &#36;{props?.item?.price}
          </span>
        </div>
        <Button
          onClick={() => addToCart(props?.item, context?.userData?._id, 1)}
          className="addToCartBtn w-full mt-2"
          variant="outlined"
          color="error"
        >
          {isLoading ? (
            <CircularProgress className="!text-inherit " />
          ) : (
            <>
              <FaShoppingCart className="text-[22px]" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
