import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { MyContext } from "../../App";

const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const context = useContext(MyContext);

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="flex gap-3 w-full lg:flex-row flex-col ">
        <div className="slider w-full lg:w-[20%]  order-2 lg:order-1 ">
          <Swiper
            ref={zoomSliderSml}
            direction={context?.windowWidth > 992 ? "vertical" : "horizontal"}
            // className="zoomProductSliderThumbs h-[500px] overflow-hidden"
            className={`zoomProductSliderThumbs lg:h-[500px] overflow-hidden ${
              props?.images?.length > 5 && "space"
            } `}
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
          >
            {props?.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => goto(index)}
                    className={`item rounded-md h-[100px] overflow-hidden cursor-pointer group ${
                      slideIndex !== index ? "opacity-30" : "opacity-100"
                    } `}
                  >
                    <img
                      src={item}
                      alt="Banner Slide "
                      className="w-full h-full object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="zoomContainer w-full lg:w-[80%] !h-[500px] overflow-hidden order-1 lg:order-2 ">
          <Swiper
            navigation={false}
            spaceBetween={1}
            slidesPerView={1}
            ref={zoomSliderBig}
            className="!h-full"
          >
            {props?.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <InnerImageZoom zoomType="hover" zoomScale={1} src={item} />
                  {/* {
                    <img
                      src={item}
                      alt="Banner Slide "
                      className="w-full h-[500px] object-contain transition-all group-hover:scale-105"
                    />
                  } */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
