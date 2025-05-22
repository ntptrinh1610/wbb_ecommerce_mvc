import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import empty_cart from "../../assets/empty-cart.png";

import { Button, Menu, MenuItem, Rating } from "@mui/material";

import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaMoneyCheckAlt } from "react-icons/fa";

import CartItem from "./CartItem";
import { MyContext } from "../../App";

const CartPage = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="section pb-10 pt-4 lg:pt-10 ">
        <div className="container flex-col lg:flex-row w-[80%] max-w-[80%] flex gap-5">
          <div className="leftPart w-full lg:w-[70%] ">
            <div className="shadow-md rounded-md p-5 bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)] ">
                <h2>Cart</h2>
                <p className="mt-0">
                  There are{" "}
                  <span className="font-bold text-mocha-mousse">
                    {context?.cartData?.length}
                  </span>{" "}
                  products in your cart
                </p>
              </div>
              {context?.cartData?.length !== 0 ? (
                context?.cartData?.map((item, index) => {
                  return (
                    <CartItem
                      key={index}
                      quantity={item?.quantity}
                      data={item}
                    />
                  );
                })
              ) : (
                <div className="flex items-center justify-center flex-col py-[100px] gap-5 ">
                  <img src={empty_cart} className="w-[150px] " />
                  <h4>There is nothing in your cart</h4>
                  <Link to={"/"}>
                    <Button
                      className="btn-sm btn-challe"
                      onClick={() => context?.toggleCartPanel(false, {})}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="rightPart w-full lg:w-[30%] ">
            <div className="shadow-md rounded-md bg-white p-5 sticky top-[75px] z-90 ">
              <h3 className="pb-3">Cart Totals</h3>
              <hr />

              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[500] ">Subtotal</span>
                <span className="text-mocha-mousse font-bold ">
                  {(context?.cartData?.length !== 0
                    ? context?.cartData
                        ?.map((item) =>
                          parseFloat(item?.price * item?.quantity)
                        )
                        .reduce((total, value) => total + value, 0)
                    : 0
                  )?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[500] ">Shipping</span>
                <span className="font-bold ">Free</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[500] ">Estimate for</span>
                <span className="font-bold ">United Kingdom</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[500] ">Total</span>
                <span className="text-mocha-mousse font-bold ">
                  {(context?.cartData?.length !== 0
                    ? context?.cartData
                        ?.map((item) =>
                          parseFloat(item?.price * item?.quantity)
                        )
                        .reduce((total, value) => total + value, 0)
                    : 0
                  )?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>

              <br />
              <Link to={`/checkout`}>
                <Button className="btn-challe btn-lg w-full flex gap-1">
                  <FaMoneyCheckAlt className="text-[25px] " />
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
