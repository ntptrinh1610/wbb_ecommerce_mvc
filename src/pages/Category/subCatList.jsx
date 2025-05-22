import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import Badge from "../../Components/Badge";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

import {
  Button,
  Checkbox,
  Pagination,
  Tooltip as TooltipMUI,
  Select,
  MenuItem,
  Dialog,
  ListItemText,
  ListItemButton,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Chip,
} from "@mui/material";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import EditSubCatBox from "./EditSubCatBox";

const SubCatList = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(MyContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <>
      <div className="md:justify-between md:flex-row flex-col flex items-center justify-start px-2 py-0 mt-3 ">
        <h2 className="md:w-[50%] w-full md:mb-0 text-[18px] font-[600] mb-2 ">
          Category List
        </h2>
        <div className="col mr-auto md:mr-0 md:ml-auto items-center justify-end gap-3 flex">
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
            className="btn-sm !text-white !bg-blue-600 btn-sm"
          >
            Add Sub Category
          </Button>
        </div>
      </div>{" "}
      <div className="card my-4 p-5 shadow-md sm:rounded-lg bg-white ">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLvCat, index) => {
              return (
                <li className="w-full mb-1 " key={index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4 ">
                    <span className="font-[500] flex items-center gap-4 text-[14px] ">
                      {firstLvCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto "
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>
                  {isOpen === index && (
                    <>
                      {firstLvCat?.children?.length !== 0 && (
                        <ul className="w-full">
                          {firstLvCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full py-1 " key={index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  id={subCat?._id}
                                  catData={context?.catData}
                                  index={subCat?.index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatName={subCat?.parentCatName}
                                />
                                {subCat?.children?.length !== 0 && (
                                  <ul className="pl-4 ">
                                    {subCat?.children?.map(
                                      (thirdCatLv, index__) => {
                                        return (
                                          <li
                                            key={index__}
                                            className="w-full hover:bg-[#f1f1f1] "
                                          >
                                            <EditSubCatBox
                                              name={thirdCatLv?.name}
                                              id={thirdCatLv?._id}
                                              catData={firstLvCat?.children}
                                              index={thirdCatLv?.index_}
                                              selectedCat={thirdCatLv?.parentId}
                                              selectedCatName={
                                                thirdCatLv?.parentCatName
                                              }
                                            />
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCatList;
