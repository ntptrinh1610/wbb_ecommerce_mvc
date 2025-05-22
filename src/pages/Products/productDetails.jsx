import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchDataFromApi } from "../../utils/api";

import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoHardwareChip } from "react-icons/io5";
import { TbDimensions } from "react-icons/tb";
import { FaWeightHanging } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { CircularProgress, Rating } from "@mui/material";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (!res?.error) {
        setProduct(res?.product);
        setIsLoading(false);
      } else {
        context?.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  }, []);

  console.log(isLoading)
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3 ">
        <h2 className="text-[18px] font-[600] ">Product Details</h2>
      </div>

      <br />

      {!isLoading ? (
        <>
          <div className="productDetails flex gap-5 ">
            <div className="w-[40%]">
              {product?.images?.length !== 0 && (
                <div className="flex gap-3 w-full justify-center">
                  <div className={`slider w-[15%]`}>
                    <Swiper
                      ref={zoomSliderSml}
                      direction={"vertical"}
                      className={`zoomProductSliderThumbs h-[500px]  overflow-hidden ${
                        product?.images?.length > 5 && "space"
                      }`}
                      navigation={true}
                      modules={[Navigation]}
                      spaceBetween={1}
                      slidesPerView={5}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() => goto(index)}
                              className={` item rounded-md overflow-hidden cursor-pointer group ${
                                slideIndex !== index
                                  ? "opacity-30"
                                  : "opacity-100"
                              } `}
                            >
                              <img
                                src={item}
                                alt="Banner Slide "
                                className="w-full h-full transition-all group-hover:scale-105"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                  <div className="zoomContainer  w-[80%] h-[500px] overflow-hidden">
                    {product?.images?.length !== 0 && (
                      <Swiper
                        navigation={false}
                        spaceBetween={1}
                        slidesPerView={1}
                        ref={zoomSliderBig}
                        className="w-full h-full"
                      >
                        {product?.images?.map((item, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src={item}
                                className="w-full h-full"
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[60%] ">
              <h1 className="text-[25px] font-[500] mb-4 ">{product?.name}</h1>
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                  <FaStoreAlt className="opacity-65" /> Brand:
                </span>
                <span className="text-[14px] ">{product?.brand}</span>
              </div>
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                  <MdCategory className="opacity-65" /> Category:
                </span>
                <span className="text-[14px] ">{product?.catName}</span>
              </div>

              {product?.productRam?.length !== 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                    <IoHardwareChip className="opacity-65" /> RAM:
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.productRam?.map((ram, index) => {
                      return (
                        <span
                          className=" inline-block p-1 shadow-sm bg-[#fff] text-[12px] font-[500] "
                          key={index}
                        >
                          {ram}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {product?.size?.length !== 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                    <TbDimensions className="opacity-65" /> Size:
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.size?.map((val, index) => {
                      return (
                        <span
                          className=" inline-block p-1 shadow-sm bg-[#fff] text-[12px] font-[500] "
                          key={index}
                        >
                          {val}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {product?.productWeight?.length !== 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                    <FaWeightHanging className="opacity-65" /> Weight:
                  </span>
                  <div className="flex items-center gap-2 ">
                    {product?.productWeight?.map((val, index) => {
                      return (
                        <span
                          className=" inline-block p-1 shadow-sm bg-[#fff] text-[12px] font-[500] "
                          key={index}
                        >
                          {val}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center py-1 ">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                  <MdRateReview className="opacity-65 " /> Review:
                </span>
                <span className="text-[14px] ">
                  ({product?.reviews?.length > 0 ? product?.reviews : 0} Review
                  )
                </span>
              </div>
              <div className="flex items-center py-1 ">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px] ">
                  <MdRateReview className="opacity-65 " /> Publish:
                </span>
                <span className="text-[14px] ">
                  {" " + product?.createdAt?.split("T")[0]}
                </span>
              </div>
              <br />
              <h2 className="text-[20px] font-[500] mb-3 ">
                Product Description
              </h2>
              {product?.description && (
                <p className="text-[14px] ">{product?.description}</p>
              )}
            </div>
          </div>
          <br />
          <h2 className="text-[18px] font-[500] ">Customer Reviews</h2>
          <div className="reviewsWrap mt-3">
            <div className="reviews w-full h-auto p-4 bg-white shadow-sm flex items-center justify-between ">
              <div className="flex items-center gap-8 ">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden ">
                  <img
                    className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkBZWtftM3FewKh5gkOL6r9buZxr9bKB5zcg&s"
                    alt=""
                  />
                </div>
                <div className="info">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500] pr-2">
                      Grizzly Bear
                    </h4>

                    <Rating name="read-only" value={5} readOnly size="small" />
                  </div>
                  <span className="text-[13px] ">2025-01-08</span>
                  <p className="text-[13px] ">daskdasdlahdj jdhasjdksahd</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
