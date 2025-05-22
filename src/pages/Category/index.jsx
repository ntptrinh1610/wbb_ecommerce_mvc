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
} from "@mui/material";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import { deleteDataFromApi, fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "image", label: "Category Image", minWidth: 250 },
  { id: "catName", label: "Category Name", minWidth: 250 },
  {
    id: "action",
    label: "Action",
    minWidth: 120,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const Category = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const context = useContext(MyContext);

  const handleCatFilterChange = () => {};

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const deleteCat = (id) => {
    console.log(id);
    deleteDataFromApi(`/api/category/delete/${id}`).then((res) => {
      console.log(res);
      if (!res.error) {
        context.openAlertBox("success", res.message);
        fetchDataFromApi("/api/category").then((res) => {
          context.setCatData(res?.data);
        });
      } else {
        context.openAlertBox("error", res.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 mt-3 ">
        <h2 className="text-[18px] font-[600] ">Category List</h2>
        <div className="col w-[25%] flex ">
          <div className="gap-3 flex ml-auto">
            <Button className="btn !text-white !bg-green-700 btn-sm ">
              Export
            </Button>
            <Button
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add New Category",
                })
              }
              className="!text-white btn !bg-blue-600 btn-sm"
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>{" "}
      <div className="card my-5 py-5 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center w-full p-5 justify-between">
          <div className="col w-[25%]">
            <h4 className="font-[600] text-[13px] mb-3 ">Category By </h4>
            <Select
              className="w-full "
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryFilterVal}
              // label="Age"
              onChange={handleCatFilterChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col w-[20%] ml-auto ">
            <SearchBox />
          </div>
        </div>
      </div>
      <br />
      <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between p-5 ">
          <h2 className="text-[18px] font-[600] ">Category</h2>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox color="primary" size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {context.catData?.length !== 0
                ? context.catData?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox color="primary" size="small" />
                        </TableCell>
                        <TableCell width={300}>
                          <div className="flex items-center gap-4 w-[80px] ">
                            <div className="img w-full rounded-md overflow-hidden group">
                              <Link to={"/product/1"}>
                                <img
                                  src={item.images[0]}
                                  className="w-full group-hover:scale-105 transition-all  "
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell width={100}>
                          <div className="flex items-center gap-1">
                            <TooltipMUI title="Edit product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                style={{ minWidth: "35px" }}
                                onClick={() => {
                                  context.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Category",
                                    id: item?._id,
                                  });
                                }}
                              >
                                <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                              </Button>
                            </TooltipMUI>
                            <TooltipMUI
                              title="View product details"
                              placement="top"
                            >
                              <Button
                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                style={{ minWidth: "35px" }}
                              >
                                <FaEye className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                              </Button>
                            </TooltipMUI>
                            <TooltipMUI title="Remove product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                style={{ minWidth: "35px" }}
                                onClick={() => deleteCat(item._id)}
                              >
                                <FaTrashAlt className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                              </Button>
                            </TooltipMUI>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Category;
