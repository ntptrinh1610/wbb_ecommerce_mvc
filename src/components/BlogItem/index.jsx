import React from "react";
import { IoMdTime } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  return (
    <>
      <div className="blogItem group w-[300px] ">
        <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
          <img
            className="w-full transition-all group:hover:scale-105 group-hover:rotate-1"
            src={props?.item?.images[0]}
            alt="blog image"
          />
          <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-mocha-mousse rounded-md p-1 text-[11px] font-[500] gap-1">
            <IoMdTime className="text-[15px]" />{" "}
            {props?.item?.createdAt.split("T")[0]}
          </span>
        </div>

        <div className="info py-4">
          <h2 className="text-[16px] font-[600] text-black">
            <Link className="link" to={"/"}>
              {props?.item?.title}
            </Link>
          </h2>
          <div
            className="mb-3 text-[14px] lg:text-[16px] "
            dangerouslySetInnerHTML={{
              __html: props?.item?.description?.slice(0, 150) + "...",
            }}
          ></div>
          <Link className="link font-[500] text-[14px] flex items-center gap-1">
            Read more <FaArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
