import React, { useContext, useEffect } from "react";

import { IoHomeOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

import { IoGitCompareSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import { Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { MyContext } from "../../../App";

const MobileNav = () => {
  const context = useContext(MyContext);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/productListing") {
      context?.setIsOpenFilterBtn(true);
    } else {
      context?.setIsOpenFilterBtn(false);
    }
  }, [location]);

  const openFilter = () => {
    if (context?.openSearch) {
      context?.setOpenSearch(false);
    }
    context?.setOpenFilter(true);
  };

  return (
    <div
      className={`z-51 mobileNav bg-white py-1 px-3 w-full grid ${
        context?.isOpenFilterBtn ? "grid-cols-6" : "grid-cols-5"
      }  fixed bottom-0 place-items-center `}
    >
      <NavLink
        onClick={() => {
          if (context.openSearch) {
            context?.setOpenSearch(false);
          }
        }}
        to={"/"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 ">
          <IoHomeOutline size={18} />
          <span className="text-[12px] ">Home</span>
        </Button>
      </NavLink>
      {context?.isOpenFilterBtn && (
        <Button
          onClick={openFilter}
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 ${
            context?.openFilter ? "text-mocha-mousse" : " "
          } `}
        >
          <FaFilter size={18} />
          <span className="text-[12px] ">Filter</span>
        </Button>
      )}

      <Button
        onClick={() => {
          context?.setOpenSearch(true);
        }}
        className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 "
      >
        <IoSearch size={18} />
        <span className="text-[12px] ">Search</span>
      </Button>
      <NavLink
        onClick={() => {
          if (context.openSearch) {
            context?.setOpenSearch(false);
          }
        }}
        to={"/my-list"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 ">
          <FaHeart size={18} />
          <span className="text-[12px] ">Wishlist</span>
        </Button>
      </NavLink>
      <NavLink
        onClick={() => {
          if (context.openSearch) {
            context?.setOpenSearch(false);
          }
        }}
        to={"/order"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 ">
          <FaShoppingCart size={18} />
          <span className="text-[12px] ">Order</span>
        </Button>
      </NavLink>
      <NavLink
        onClick={() => {
          if (context.openSearch) {
            context?.setOpenSearch(false);
          }
        }}
        to={"/my-account"}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700 ">
          <FaUser size={18} />
          <span className="text-[12px] ">Account</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
