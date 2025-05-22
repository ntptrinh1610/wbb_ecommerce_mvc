import React, { useContext } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../pages/Dashboard";
import { MyContext } from "../App";

const Layout = ({ children }) => {
  const context = useContext(MyContext);

  return (
    <>
      <section className="main ">
        <Header />
        <div className="contentMain flex">
          <div
            className={`overflow-hidden sidebarWrapper ${
              context?.isSidebarOpen
                ? context?.windowWidth < 992
                  ? `w-[${context?.sidebarWidth / 1.5}]`
                  : `w-[${context?.sidebarWidth}%]`
                : `w-[0%] opacity-0`
            }  transition-all `}
          >
            <Sidebar />
          </div>
          <div
            className={` contentRight py-4 px-5 ${
              context.isSidebarOpen && context?.windowWidth < 992 && `opacity-0`
            }
              ${
                context?.isSidebarOpen
                  ? `w-[${100 - context?.sidebarWidth}%]`
                  : "w-full"
              }
             transition-all `}
          >
            <Dashboard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
