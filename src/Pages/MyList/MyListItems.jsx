import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Menu, MenuItem, Rating } from "@mui/material";

import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { MyContext } from "../../App";
import { FaShoppingCart } from "react-icons/fa";
import { deleteData } from "../../utils/api";

const MyListItems = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const removeItem = (id) => {
    deleteData(`/api/myList/${id}`).then((res) => {
      if (!res?.error) {
        context.openAlertBox("success", res?.message);
        context?.getListData();
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  const addToCart = async (product, quantity) => {
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

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)] ">
        <div className="img w-[30%] sm:w-[15%] rounded-md overflow-hidden ">
          <Link to={`/product/${props?.item?.productId}`} className="group">
            <img
              src={props?.item?.image}
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info w-full lg:w-[85%] relative">
          <IoClose
            onClick={() => removeItem(props?.item?._id)}
            className="cursor-pointer absolute top-0 right-0 text-[22px] link transition-all "
          />
          <span className=" text-[13px] ">{props?.item?.brand}</span>
          <h3 className="text-[15px] ">
            <Link to={`/product/${props?.item?.productId}`} className="link">
              {props?.item?.productTitle?.slice(0, 50) + "..."}
            </Link>
          </h3>
          <Rating
            name="sizw-small"
            defaultValue={props?.item?.rating}
            size="small"
            precision={0.1}
            readOnly
          />
          <div className="flex items-center gap-4 mt-2 mb-2">
            <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
              &#36; {props?.item?.oldPrice}
            </span>
            <span className="price text-gray-800 text-[15px] font-[500]">
              &#36; {props?.item?.price}
            </span>
            <span className="price text-red-400 text-[14px] font-[600]">
              {props?.item?.discount}% OFF
            </span>
          </div>

          <br />
          <Button
            // onClick={() => addToCart(props?.item, 1)}
            className="btn-challe btn-sm"
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
    </>
  );
};

export default MyListItems;
