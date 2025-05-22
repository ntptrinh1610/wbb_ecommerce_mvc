import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import { Button, Rating, Tooltip } from "@mui/material";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { MyContext } from "../../App";

const ProductItemListView = () => {
  const context = useContext(MyContext);

  return (
    <div className="flex items-center productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper relative overflow-hidden rounded-md">
        <Link to={"/"}>
          <div className="img h-[220px] overflow-hidden">
            <img
              src="https://m.media-amazon.com/images/I/612RHMFZnDL._AC_SX679_.jpg"
              className="w-full h-full object-contain"
            />
            <img
              src="https://m.media-amazon.com/images/I/41aPyIxoPKL._AC_.jpg"
              className="w-full h-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-red-400 text-white rounded-lg p-1 text-[12px] font-[500]">
          10%
        </span>
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] group-hover:top-[15px] transition-all duration-300 ">
          <Button
            onClick={() => context.setOpenProductDetailsModal(true)}
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)]"
          >
            <MdOutlineZoomOutMap className="text-[18px] text-black" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)]">
            <FaHeart className="text-[18px] text-black" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-sirocco !border !border-[rgba(0,0,0,0.3)]">
            <IoGitCompareSharp className="text-[18px] text-black" />
          </Button>
        </div>
      </div>
      <div className="info py-5 px-8 w-[75%]">
        <h6 className="text-[15px] !font-[400]">
          <Link to={"/"} className="link transition-all">
            Cute Bear Keychain, We Bare Bears (ICE BEAR)
          </Link>
        </h6>
        <h3 className="text-[18px] title mt-1 font-[500] mb-3 text-[rgba(0,0,0,0.9)]">
          <Link to={"/"} className="link transition-all">
            Cute Bear Keychain, We Bare Bears (ICE BEAR)
          </Link>
        </h3>
        <p className="text-[14px] mb-3">
          Adorable 3D We Bare Bears Keychain with Leather Strap from "The Three
          Bare Bears", “We Bare Bears” animated series. Perfect for any “We Bare
          Bears” fan! Lightweight and comfortable to carry. Collect and take
          them everywhere!
        </p>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $13.99
          </span>
          <span className="price text-red-400 text-[15px] font-[600]">
            $11.99
          </span>
        </div>

        <div className="mt-3">
          <Button className="btn-challe">
            <FaCartPlus className="text-[20px]" />
            &nbsp; Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
