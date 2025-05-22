import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IoClose } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import { MyContext } from "../../App";

const CategoryCollapse = (props) => {
  const [open, setOpen] = useState(false);
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnerSubMenuIndex] = useState(null);

  const context = useContext(MyContext);

  const openSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const openInnerSubMenu = (index) => {
    if (innerSubMenuIndex === index) {
      setInnerSubMenuIndex(null);
    } else {
      setInnerSubMenuIndex(index);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full h-auto">
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  key={index}
                  className="list-none flex items-center relative flex-col w-full"
                >
                  <Link className="w-full" to={"/"}>
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      {cat?.name}
                    </Button>
                  </Link>
                  <div
                    className="absolute w-[30px] h-[30px] flex items-center justify-center top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openSubMenu(index)}
                  >
                    {subMenuIndex === index ? (
                      <FaRegSquareMinus
                        onClick={() => {
                          openSubMenu(index);
                          openInnerSubMenu(null);
                        }}
                        className=""
                      />
                    ) : (
                      <FaRegSquarePlus
                        onClick={() => {
                          openSubMenu(index);
                        }}
                        // className="absolute top-[10px] right-[15px] cursor-pointer"
                      />
                    )}
                  </div>

                  {subMenuIndex === index && (
                    <ul className="submenu w-full pl-3">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li key={index_} className="list-none relative">
                              <Link className="w-full" to={"/"}>
                                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                  {subCat?.name}
                                </Button>
                              </Link>
                              <div
                                className="absolute w-[30px] h-[30px] flex items-center justify-center top-[10px] right-[15px] cursor-pointer"
                                onClick={() => openInnerSubMenu(index_)}
                              >
                                {innerSubMenuIndex === index_ ? (
                                  <FaRegSquareMinus />
                                ) : (
                                  <FaRegSquarePlus />
                                )}
                              </div>

                              {innerSubMenuIndex === index_ && (
                                <ul className="inner_submenu w-full pl-3">
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map((third, index__) => {
                                      return (
                                        <li
                                          key={index__}
                                          className="list-none relative"
                                        >
                                          <Link
                                            to={"/"}
                                            className="mb-1 w-full !text-left !justify-start !px-3 text-[14px]"
                                          >
                                            {third.name}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
