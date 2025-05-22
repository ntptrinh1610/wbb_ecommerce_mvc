import React, { useContext, useState } from "react";
import empty_list from "../../assets/no-task.png";

import { Link } from "react-router-dom";

import { Button, Menu, MenuItem, Rating } from "@mui/material";

import { IoClose } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaDAndD, FaMoneyCheckAlt } from "react-icons/fa";

import CartItem from "./MyListItems";
import MyListItems from "./MyListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";

const MyList = () => {
  const context = useContext(MyContext);
  return (
    <>
      <section className="py-4 lg:py-10 w-full">
        <div className="container flex flex-col md:flex-row gap-5">
          <div className="col1 w-full lg:w-[20%] hidden lg:block ">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[70%]">
            <div className="shadow-md rounded-md p-5 bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)] ">
                <h2>My List</h2>
                <p className="mt-0">
                  There are{" "}
                  <span className="font-bold text-mocha-mousse">
                    {context?.myListData?.length}
                  </span>{" "}
                  products in your cart
                </p>
              </div>

              {context?.myListData?.length !== 0 ? (
                context?.myListData?.map((item, index) => {
                  return <MyListItems item={item} key={index} />;
                })
              ) : (
                <div className="gap-5 flex items-center justify-center flex-col py-10 px-3 ">
                  <img src={empty_list} className="w-[100px] " />

                  <h3>My List currently empty</h3>
                  <Link to={"/"}>
                    <Button className="btn-challe btn-sm ">
                      Countinue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyList;
