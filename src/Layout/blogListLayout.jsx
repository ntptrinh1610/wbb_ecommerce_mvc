import React, { useContext } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Products from '../pages/Products';
import { MyContext } from "../App";
import Category from "../pages/Category";
import AddRams from "../pages/Products/addRams";
import BlogList from "../pages/Blog";

const LayoutBlogList = ({children}) => {
  const context = useContext(MyContext);

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
            <BlogList/>
          </div>
        </div>
      </section>
    </>
  );
};

export default LayoutBlogList;
