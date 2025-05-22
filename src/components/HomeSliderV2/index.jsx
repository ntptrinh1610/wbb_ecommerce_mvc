import React, { useContext, useRef, useState } from "react";
import shopnowTshirt from "../../assets/shopnow_t-shirt.jpg";
import shopnowSAnimal from "../../assets/shopnow_stuffed-animal.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";
import { MyContext } from "../../App";

const HomeSliderV2 = (props) => {
  const context = useContext(MyContext);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={context?.windowWidth > 992 ? true : false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2"
      >
        {props?.data?.map((item, index) => {
          if (item?.isDisplayOnHomeBanner) {
            return (
              <SwiperSlide key={index}>
                <div className="item lg:h-[490px] w-full rounded-md overflow-hidden relative">
                  <img src={item?.bannerImages[0]} className="w-full" />
                  <div className="info absolute top-0 opacity-100 -right-[100%] w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700">
                    <h4 className="text-[12px] lg:text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                      {item?.bannerTitleName}
                    </h4>
                    <h2 className="text-[15px] lg:text-[35px] font-[700] w-full relative -right-[100%] opacity-0">
                      {item?.name?.length > 70
                        ? item?.name?.substr(0, 70) + "..."
                        : item?.name}
                    </h2>
                    <h3 className="flex items-center gap-3  text-[12px] lg:text-[18px] font-[500] w-full text-left my-3 relative -right-[100%] opacity-0">
                      Starting At Only
                      <span className="text-red-400 text-[15px] lg:text-[30px] font-[700] ">
                        &#36;{item?.price}
                      </span>
                    </h3>
                    <div className="w-full relative -right-[100%] opacity-0 btn_">
                      <Button className="btn-challe">SHOP NOW</Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </>
  );
};

export default HomeSliderV2;
