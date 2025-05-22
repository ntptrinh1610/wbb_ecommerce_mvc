import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

import { Button } from "@mui/material";
import CategoryPanel from "./CategoryPanel";

import "../Navigation/style.css";
import { fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";
import MobileNav from "./mobileNav";

const Navigation = (props) => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

  useEffect(() => {
    setIsOpenCatPanel(props.isOpenCatPanel);
  }, [props.isOpenCatPanel]);

  const openCatPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="navigation">
        <div className="container flex items-center justify-start lg:justify-end gap-8">
          {context?.windowWidth > 992 && (
            <div className="col_1 w-[20%]">
              <Button
                onClick={() => setIsOpenCatPanel(true)}
                className="!text-chocolate-martini gap-2 w-full"
              >
                <IoIosMenu className="text-[18px]" />
                Show By Categories
                <FaAngleDown className="text-[13px] ml-auto font-bold" />
              </Button>
            </div>
          )}

          <div className="col_2 w-full lg:w-[60%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.8)] !py-4">
                    Home
                  </Button>
                </Link>
              </li>
              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li key={index} className="list-none relative">
                      <Link className="link transition text-[14px] font-[500]">
                        <Button className="link transition !font-[400] !text-[rgba(0,0,0,0.8)] !py-4">
                          {cat?.name}
                        </Button>
                      </Link>
                      <div className="submenu absolute top-[100%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                        <ul>
                          {cat?.children?.length !== 0 &&
                            cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  key={index_}
                                  className="list-none w-full relative "
                                >
                                  <Link to={"/"} className="w-full">
                                    <Button className="w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>
                                  </Link>
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map((third, index__) => {
                                      return (
                                        <div
                                          key={index__}
                                          className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all"
                                        >
                                          <ul>
                                            <li className="list-none w-full">
                                              <Link to={"/"} className="w-full">
                                                <Button className="w-full !text-left !justify-start !rounded-none">
                                                  {third.name}
                                                </Button>
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      );
                                    })}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="col_3 w-[20%] hidden lg:block ">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <TbTruckDelivery className="text-[20px]" />
              No Delays, Just Transfers.
            </p>
          </div>
        </div>
      </nav>

      {catData?.length !== 0 && (
        <CategoryPanel
          setIsOpenCatPanel={setIsOpenCatPanel}
          isOpenCatPanel={isOpenCatPanel}
          propsSetIsOpenCatPanel={props.setIsOpenCatPanel}
          data={catData}
        />
      )}
      {context?.windowWidth < 992 && <MobileNav />}
    </>
  );
};

export default Navigation;
