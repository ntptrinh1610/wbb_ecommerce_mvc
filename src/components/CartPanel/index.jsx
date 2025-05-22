import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { deleteData, deleteMultipleData } from "../../utils/api";

const CartPanel = (props) => {
  const context = useContext(MyContext);

  const removeItem = (item) => {
    deleteMultipleData(`/api/cart/delete-item`, {
      id: item?._id,
      productId: item?.productId,
    }).then((res) => {
      if (!res?.error) {
        context?.openAlertBox("success", res?.message);
        context?.getCartData();
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <div className="scroll w-full max-h-[500px] overflow-y-scroll overflow-x-hidden py-3 pz-4">
        {props?.data?.map((item, index) => {
          return (
            <div
              key={index}
              className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 "
            >
              <div className="img w-[25%] overflow-hidden h-[100px] rounded-md ">
                <Link to={`/product/${item?._id}`} className="block group">
                  <img
                    className="w-full group-hover:scale-105"
                    src={item?.image}
                  />
                </Link>
              </div>
              <div className="info w-[75%] pr-5 relative">
                <div className="w-[75%]">
                  <h4 className="text-[12px] lg:text-[14px] font-[500]">
                    <Link
                      to={`/product/${item?.productId}`}
                      className="link transition-all"
                      onClick={() => context?.toggleCartPanel(false)}
                    >
                      {item?.productTitle?.slice(0, 40) + "..."}
                    </Link>
                  </h4>
                  <p className="flex items-center gap-5 m-0 my-2">
                    <span className="text-[13px] sm:text-[14px] ">
                      Quantity: <span>{item?.quantity}</span>
                    </span>
                    <span className="text-mocha-mousse font-bold">
                      Price: &#36;{item?.price}
                    </span>
                  </p>
                </div>

                <FaTrashCan
                  onClick={() => removeItem(item)}
                  className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all"
                />
              </div>
            </div>
          );
        })}
      </div>

      <br />

      <div className="bottomSec absolute bottom-[10px]  w-full overflow-hidden pr-5">
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">
              {context?.cartData?.length !== 0 ? context?.cartData?.length : 0}{" "}
              item
            </span>
            <span className="text-mocha-mousse font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseFloat(item?.price * item?.quantity))
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          {/* <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Shipping</span>
            <span className="text-mocha-mousse font-bold">$8.00</span>
          </div> */}
        </div>

        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col ">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total (tax excl.)</span>
            <span className="text-mocha-mousse font-bold">
              {" "}
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseFloat(item?.price * item?.quantity))
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>

        <br />
        <div className="flex items-center justify-between w-full gap-5 p-4">
          <Link to={"/cart"} className="w-[50%] d-block">
            <Button className="btn-challe btn-lg w-full">View Cart</Button>
          </Link>
          <Link
            to={"/checkout"}
            className="w-[50%] d-block"
            onClick={() => context?.toggleCartPanel(false)}
          >
            <Button className="btn-challe btn-lg btn-border w-full">
              Check out
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
