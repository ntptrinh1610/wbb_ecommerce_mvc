import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Navigation, Pagination, FreeMode } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../ProductItem";
import { MyContext } from "../../App";

const ProductsSlider = (props) => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="productSlider py-4">
        <Swiper
          className="mySwiper"
          navigation={context?.windowWidth > 992 ? true : false}
          modules={[Navigation, FreeMode]}
          spaceBetween={20}
          slidesPerView={props.items}
          freeMode={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            650: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {props?.data?.map((item, index) => {
            return (
              <SwiperSlide
                className="!flex items-center justify-center "
                key={index}
              >
                <ProductItem item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductsSlider;
