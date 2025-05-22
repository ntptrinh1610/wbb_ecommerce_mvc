import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, FreeMode } from "swiper/modules";

import { FaGift } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";
import { GiPieChart } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { MyContext } from "../../App";

const DashboardBoxes = (props) => {
  const context=useContext(MyContext);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation, FreeMode]}
        navigation={context?.windowWidth < 992 ? false : true}
        className="dashboardBoxesSlider"
        freeMode={false}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <FaGift className="text-[40px] text-[#3872fa] " />
            <div className="info w-[70%] ">
              <h3>Total Orders</h3>
              <b>{props?.orders}</b>
            </div>
            <IoStatsChart className="text-[30px] text-[#3872fa] " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <GiPieChart className="text-[40px] text-[#10b981] " />
            <div className="info w-[70%] ">
              <h3>Total User</h3>
              <b>{props?.users}</b>
            </div>
            <IoStatsChart className="text-[30px] text-[#10b981] " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <BsBank2 className="text-[40px] text-[#7928ca]  " />
            <div className="info w-[70%] ">
              <h3>Total Category</h3>
              <b>{props?.category}</b>
            </div>
            <IoStatsChart className="text-[30px] text-[#7928ca] " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <FaProductHunt className="text-[40px] text-[#a3099e] " />
            <div className="info w-[70%] ">
              <h3>Total Products</h3>
              <b>{props?.products}</b>
            </div>
            <IoStatsChart className="text-[30px] text-[#a3099e] " />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
