import React, { useContext } from "react";

import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { MyContext } from "../../App";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.webp";
import banner5 from "../../assets/banner5.jpg";
import banner6 from "../../assets/banner6.jpg";
import banner7 from "../../assets/banner7.jpg";
import banner8 from "../../assets/banner8.jpg";

import BannerBox from "../BannerBox";
import BannerBoxV2 from "../bannerBoxV2";

const AdsBannerSliderV2 = (props) => {
  const context = useContext(MyContext);

  return (
    <>
      <div className="py-5 w-full">
        <div className="container">
          <Swiper
            slidesPerView={props.items}
            className="smlBtn"
            navigation={context?.windowWidth < 992 ? false : true}
            modules={[Navigation, FreeMode]}
            spaceBetween={10}
            freeMode={true}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              450: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              750: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
            }}
          >
            {props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <BannerBoxV2 img={item?.images[0]} item={item} link={"/"} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AdsBannerSliderV2;
