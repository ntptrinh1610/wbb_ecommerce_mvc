import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { RiDashboardFill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaImages } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

import { Button } from "@mui/material";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const logout = () => {
    context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
  };
  const context = useContext(MyContext);

  return (
    <>
      <div
        className={`z-52 sidebar fixed top-0 left-0 bg-[#fff] ${
          context.isSidebarOpen
            ? `w-[${context?.sidebarWidth / 1.5}%]`
            : "w-[0px]"
        } h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 `}
      >
        <div
          className="py-2 w-full"
          onClick={() => {
            context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
          }}
        >
          <Link to={"/"}>
            <img src={logo} className="w-[120px] " />
          </Link>
        </div>

        <ul className="mt-4 overflow-y-scroll max-h-[85vh] ">
          <li>
            <Link
              to={"/"}
              onClick={() => {
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
              }}
            >
              <Button className="!py-2 w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center hover:!bg-[#f1f1f1] ">
                <RiDashboardFill className="text-[18px] " />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubmenu(1)}
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center !py-2 hover:!bg-[#f1f1f1] "
            >
              <FaImages className="text-[18px] " />
              <span>Home Slides</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    submenuIndex === 1 ? "rotate-180" : ""
                  } `}
                />
              </span>
            </Button>
          </li>

          <Collapse isOpened={submenuIndex === 1}>
            <ul className="w-full">
              <li className="w-full">
                <Link
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                  to={"/homeSlider/list"}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Home Banner List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() => {
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Home Slide",
                    });
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                  Add Home Banner Slide
                </Button>
              </li>
            </ul>
          </Collapse>

          <li>
            <Link
              to={"/users"}
              onClick={() => {
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
              }}
            >
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center !py-2 hover:!bg-[#f1f1f1] ">
                <ImUsers className="text-[18px] " />
                <span>Users</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              onClick={() => {
                isOpenSubmenu(2);
              }}
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center !py-2 hover:!bg-[#f1f1f1] "
            >
              <FaProductHunt className="text-[18px] " />
              <span>Products</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    submenuIndex === 2 ? "rotate-180" : ""
                  } `}
                />
              </span>
            </Button>
          </li>

          <Collapse isOpened={submenuIndex === 2}>
            <ul className="w-full">
              <li className="w-full">
                <Link
                  to={"/products"}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Product List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                {/* <Link to={"/products/upload"}> */}
                <Button
                  onClick={() => {
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Product",
                    });
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                  Product Upload
                </Button>
                {/* </Link> */}
              </li>
              <li className="w-full">
                <Link
                  to={`/product/addRams`}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    Add Product Ram
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={`/product/addWeight`}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    Add Product Weight
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={`/product/addSize`}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    Add Product Size
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>

          <li>
            <Button
              onClick={() => isOpenSubmenu(3)}
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center !py-2 hover:!bg-[#f1f1f1] "
            >
              <MdCategory className="text-[18px] " />
              <span>Category</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    submenuIndex === 3 ? "rotate-180" : ""
                  } `}
                />
              </span>
            </Button>
          </li>

          <Collapse isOpened={submenuIndex === 3}>
            <ul className="w-full">
              <li className="w-full">
                <Link
                  to={"/category/list"}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() => {
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add New Category",
                    });
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                  Add New Category
                </Button>
              </li>
              <li className="w-full">
                <Link
                  to={"/subCat/list"}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Sub Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() => {
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add New Sub Category",
                    });
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                  Add New Sub Category
                </Button>
              </li>
            </ul>
          </Collapse>

          <li>
            <Button
              onClick={() => isOpenSubmenu(5)}
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center !py-2 hover:!bg-[#f1f1f1] "
            >
              <MdCategory className="text-[18px] " />
              <span>Banners</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    submenuIndex === 5 ? "rotate-180" : ""
                  } `}
                />
              </span>
            </Button>
          </li>

          <Collapse isOpened={submenuIndex === 5}>
            <ul className="w-full">
              <li className="w-full">
                <Link
                  to={"/bannerV1List"}
                  onClick={() => {
                    context?.windowWidth < 992 &&
                      context?.setIsSidebarOpen(false);
                  }}
                >
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Banner V1 List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() => {
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Banner V1",
                    });
                  }}
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                  Add Banner V1
                </Button>
              </li>
            </ul>
          </Collapse>

          <li>
            <Link
              to={"/orders"}
              onClick={() => {
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
              }}
            >
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center ">
                <FaFileInvoice className="text-[18px] " />
                <span>Order</span>
              </Button>
            </Link>
          </li>

          <li>
            <Link
              to={"/blog/list"}
              onClick={() => {
                context?.windowWidth < 992 && context?.setIsSidebarOpen(false);
              }}
            >
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center ">
                <FaFileInvoice className="text-[18px] " />
                <span>Blog</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              onClick={logout}
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] font-[500] items-center "
            >
              <IoLogOutOutline className="text-[18px] " />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </div>
      {context?.isSidebarOpen && context?.windowWidth < 992 ? (
        <div
          onClick={() => {
            context?.setIsSidebarOpen(false);
          }}
          className={`sidebarOverlay w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-49 fixed `}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
