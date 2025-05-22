import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Navigation, Pagination, FreeMode } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { MyContext } from "../../App";

const HomeCatSlider = (props) => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="homeCatSlider pt-0 py-4 lg:pt-4 lg:py-8">
        <div className="container">
          <Swiper
            className="mySwiper"
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[Navigation, FreeMode]}
            spaceBetween={10}
            slidesPerView={8}
            freeMode={true}
            breakpoints={{
              300: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              650: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 5,
              },
            }}
          >
            {props?.data?.map((cat, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to="/">
                    <div className="item rounded-sm py-7 px-3 bg-white flex items-center justify-center flex-col">
                      <img
                        src={cat?.images[0]}
                        alt="Banner Slide "
                        className="lg:w-[60px] w-[40px] transition-all"
                      />
                      <h3 className="text-[12px] lg:text-[15px] font-[500] mt-3">
                        {cat?.name}
                      </h3>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeCatSlider;
