import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 box w-full bg-white overflow-hidden rounded-md group relative">
      <img
        src={props.img}
        className="object-contain w-full h-full transition-all duration-150 group-hover:scale-105"
      />
      <div
        className={`info absolute p-5 top-0 ${
          props?.item?.alignInfo === "left" ? "left-0" : "right-0"
        } w-[70%] h-[100%] z-50 flex justify-center flex-col
        gap-2 ${props.info === "left" ? "" : "pl-12"}
        `}
      >
        <h2 className="text-[14px] md:text-[18px] font-[600]">{props?.item?.bannerTitle}</h2>
        <span className="text-[20px] text-red-400 font-[600] w-full">
          ${props?.item?.price}
        </span>
        <div className="w-full link text-[16px] font-[600]">
          <Link className="" to={"/"}>
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
