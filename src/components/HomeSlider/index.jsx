import React, { useContext } from "react";

import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { MyContext } from "../../App";

const HomeSlider = (props) => {
  const context = useContext(MyContext);

  return (
    <>
      <div className="relative z-[99] pb-2 pt-3 lg:p-5 ">
        <div className="container">
          <Swiper
            loop={true}
            className="sliderHome"
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={10}
            freeMode={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            
          >
            {props?.data?.length !== 0 &&
              props?.data?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className=" item rounded-[20px] overflow-hidden">
                      <img src={item?.images[0]} alt="Banner Slide " />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
