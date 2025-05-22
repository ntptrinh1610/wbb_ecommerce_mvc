import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import { MyContext } from "../App";
import HomeSliderBanners from "../pages/HomeSliderBanners";
import { fetchDataFromApi } from "../utils/api";

const LayoutHomeSB = ({ children }) => {
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <section className="main">
        <Header />
        <div className="contentMain flex">
          <div
            className={`sidebarWrapper ${
              context.isSidebarOpen ? "w-[18%]" : "w-[0%] opacity-0"
            }  transition-all `}
          >
            <Sidebar />
          </div>
          <div
            className={` contentRight py-4 px-5 ${
              context.isSidebarOpen ? "w-[82%]" : "w-full"
            } transition-all `}
          >
            <HomeSliderBanners />
          </div>
        </div>
      </section>
    </>
  );
};

export default LayoutHomeSB;
