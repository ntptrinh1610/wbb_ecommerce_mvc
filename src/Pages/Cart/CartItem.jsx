import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Menu, MenuItem, Rating } from "@mui/material";

import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { FaMoneyCheckAlt } from "react-icons/fa";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
  updateDataFromApi,
} from "../../utils/api";
import { MyContext } from "../../App";
import QuantityBox from "../../components/QuantityBox";

const CartItem = (props) => {
  const [sizeSelectAnchor, setSizeSelectAnchor] = useState(null);
  const [ramSelectAnchor, setRamSelectAnchor] = useState(null);
  const [weightSelectAnchor, setWeightSelectAnchor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(
    props?.data?.size?.length !== 0
      ? props?.data?.size
      : props?.data?.ram?.length !== 0
      ? props?.data?.ram
      : props?.data?.weight?.length !== 0
      ? props?.data?.weight
      : ""
  );
  const [selectedRam, setSelectedRam] = useState(props?.data?.ram);
  const [selectedWeight, setSelectedWeight] = useState(props?.data?.weight);
  const [productSizeData, setProductSizeData] = useState([]);
  const [productRamData, setProductRamData] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const openSizeSelect = Boolean(sizeSelectAnchor);
  const openRamSelect = Boolean(ramSelectAnchor);
  const openWeightSelect = Boolean(weightSelectAnchor);
  const [quantitySelectAnchor, setQuantitySelectAnchor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(props.quantity);
  const openQuantitySelect = Boolean(quantitySelectAnchor);
  const [quantity, setQuantity] = useState(1);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi(`/api/product/${props?.data?.productId}`).then((res) => {
      if (!res?.error) {
        setProductSizeData(res?.data?.size);
        setProductRamData(res?.data?.productRam);
        setProductWeightData(res?.data?.productWeight);
      } else {
        console.log(res?.message);
      }
    });
  }, []);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const handleClickSizeSelect = (event) => {
    setSizeSelectAnchor(event.currentTarget);
  };
  const handleCloseSizeSelect = (value) => {
    setSizeSelectAnchor(null);
    console.log(value);
    if (value !== null) {
      setSelectedSize(value);
    }
  };
  const handleClickRamSelect = (event) => {
    setRamSelectAnchor(event.currentTarget);
  };
  const handleCloseRamSelect = (value) => {
    setRamSelectAnchor(null);
    if (value !== null) {
      setSelectedRam(value);
    }
  };
  const handleClickWeightSelect = (event) => {
    setWeightSelectAnchor(event.currentTarget);
  };
  const handleCloseWeightSelect = (value) => {
    setWeightSelectAnchor(null);
    if (value !== null) {
      setSelectedWeight(value);
    }
  };

  const handleClickQuantitySelect = (event) => {
    setQuantitySelectAnchor(event.currentTarget);
  };
  const handleCloseQuantitySelect = (value) => {
    setQuantitySelectAnchor(null);
    if (value !== null) {
      setSelectedQuantity(value);
      const cartItem = {
        _id: props?.data?._id,
        quantity: value,
        subTotal: props?.data?.price * value,
      };

      updateDataFromApi(`/api/cart/update`, cartItem).then((res) => {
        if (!res?.error) {
          console.log(res?.message);
          context?.getCartData();
        } else {
          console.log(res?.message);
        }
      });
    }
  };
  const handleChangeQuantity = (value) => {
    if (value !== null) {
      setSelectedQuantity(value);
      const cartItem = {
        _id: props?.data?._id,
        quantity: value,
        subTotal: props?.data?.price * value,
      };

      updateDataFromApi(`/api/cart/update`, cartItem).then((res) => {
        if (!res?.error) {
          console.log(res?.message);
          context?.getCartData();
        } else {
          console.log(res?.message);
        }
      });
    }
  };

  const updateCart = (selectedVal, quantity, field) => {
    handleCloseSizeSelect(selectedVal);

    const cartItem = {
      _id: props?.data?._id,
      quantity: quantity,
      subTotal: props?.data?.price * quantity,
      size: props?.data?.size?.length !== 0 ? selectedVal : "",
      weight: props?.data?.weight?.length !== 0 ? selectedVal : "",
      ram: props?.data?.ram?.length !== 0 ? selectedVal : "",
    };

    // if size available
    if (field === "size") {
      const item = productSizeData?.filter((size) =>
        size.includes(selectedVal)
      );
      console.log(item);
      if (item?.length !== 0) {
        updateDataFromApi(`/api/cart/update`, cartItem).then((res) => {
          if (!res?.error) {
            context?.getCartData();
          } else {
            console.log(res?.message);
          }
        });
      } else {
        context.openAlertBox(
          "error",
          `Product not available with the size of ${selectedVal} `
        );
      }
    }
    if (field === "ram") {
      const item = productRamData?.filter((ram) => ram.includes(selectedVal));
      console.log(item);
      if (item?.length !== 0) {
        updateDataFromApi(`/api/cart/update`, cartItem).then((res) => {
          if (!res?.error) {
            context?.getCartData();
          } else {
            console.log(res?.message);
          }
        });
      } else {
        context.openAlertBox(
          "error",
          `Product not available with the ram of ${selectedVal} `
        );
      }
    }
    if (field === "weight") {
      const item = productWeightData?.filter((weight) =>
        weight.includes(selectedVal)
      );
      console.log(item);
      if (item?.length !== 0) {
        updateDataFromApi(`/api/cart/update`, cartItem).then((res) => {
          if (!res?.error) {
            context?.getCartData();
          } else {
            console.log(res?.message);
          }
        });
      } else {
        context.openAlertBox(
          "error",
          `Product not available with the weight of ${selectedVal} `
        );
      }
    }
  };

  const removeItem = (id) => {
    deleteMultipleData(`/api/cart/delete-item`, {
      id: id,
      productId: props?.data?.productId,
    }).then((res) => {
      if (!res?.error) {
        console.log(res?.message);
        context?.getCartData();
      } else {
        console.log(res?.message);
      }
    });
  };

  return (
    <>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)] ">
        <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden ">
          <Link to={`/product/${props?.data?.productId}`} className="group">
            <img
              src={props?.data?.image}
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info w-[70%] sm:w-[80%] lg:w-[85%] relative">
          <IoClose
            onClick={() => removeItem(props?.data?._id)}
            className="cursor-pointer absolute top-0 right-0 text-[22px] link transition-all "
          />
          <span className=" text-[13px] ">{props?.data?.brand}</span>
          <h3 className="text-[13px] lg:text-[15px] ">
            <Link to={`/product/${props?.data?.productId}`} className="link">
              {props?.data?.productTitle?.slice(
                0,
                context?.windowWidth < 992 ? 30 : 120
              ) + "..."}
            </Link>
          </h3>
          <Rating
            name="sizw-small"
            defaultValue={props?.data?.rating}
            size="small"
            readOnly
          />
          <div className="flex items-center gap-4 mt-2">
            {productSizeData?.length !== 0 && (
              <div className="relative">
                <span
                  onClick={handleClickSizeSelect}
                  className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer "
                >
                  Size: {selectedSize} <GoTriangleDown />
                </span>

                <Menu
                  id="basic-menu"
                  anchorEl={sizeSelectAnchor}
                  open={openSizeSelect}
                  onClose={() => handleCloseSizeSelect(null)}
                >
                  {productSizeData?.map((item, index) => {
                    return (
                      <MenuItem
                        className={`${item === selectedSize && "selected"}`}
                        key={index}
                        onClick={() =>
                          updateCart(item, props?.data?.quantity, "size")
                        }
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            )}
            {productRamData?.length !== 0 && (
              <div className="relative">
                <span
                  onClick={handleClickSizeSelect}
                  className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer "
                >
                  Ram: {selectedSize} <GoTriangleDown />
                </span>

                <Menu
                  id="basic-menu"
                  anchorEl={sizeSelectAnchor}
                  open={openSizeSelect}
                  onClose={() => handleCloseSizeSelect(null)}
                >
                  {productRamData?.map((item, index) => {
                    return (
                      <MenuItem
                        className={`${item === selectedSize && "selected"}`}
                        key={index}
                        onClick={() =>
                          updateCart(item, props?.data?.quantity, "ram")
                        }
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            )}
            {productWeightData?.length !== 0 && (
              <div className="relative">
                <span
                  onClick={handleClickSizeSelect}
                  className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer "
                >
                  Weight: {selectedSize} <GoTriangleDown />
                </span>

                <Menu
                  id="basic-menu"
                  anchorEl={sizeSelectAnchor}
                  open={openSizeSelect}
                  onClose={() => handleCloseSizeSelect(null)}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem
                        className={`${item === selectedSize && "selected"}`}
                        key={index}
                        onClick={() =>
                          updateCart(item, props?.data?.quantity, "weight")
                        }
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            )}

            {/* <div className="relative">
              <span
                onClick={handleClickQuantitySelect}
                className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer "
              >
                Quantity: {selectedQuantity} <GoTriangleDown />
              </span>
              <Menu
                id="basic-menu"
                anchorEl={quantitySelectAnchor}
                open={openQuantitySelect}
                onClose={() => handleCloseQuantitySelect(null)}
              >
                {Array.from({ length: 15 }).map((_, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleCloseQuantitySelect(index + 1)}
                    >
                      {index + 1}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div> */}
          </div>
          <div className="my-3 w-[70px] h-[50px] ">
            <QuantityBox
              handleSelectQty={handleSelectQty}
              quantity={props?.data?.quantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span className="price text-[14px] font-[600]">
              {" "}
              &#36; {props?.data?.price}
            </span>
            <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
              &#36; {props?.data?.oldPrice}
            </span>
            <span className="price text-red-400 text-[14px] font-[600]">
              {props?.data?.discount}% OFF
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
