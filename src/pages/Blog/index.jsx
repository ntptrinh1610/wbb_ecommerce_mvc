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
import {
  deleteDataFromApi,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

const columns = [
  { id: "image", label: "Image", minWidth: 250 },
  { id: "title", label: "Title", minWidth: 250 },
  { id: "description", label: "Description", minWidth: 250 },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

const BlogList = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [sortedId, setSortedId] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi(`/api/blog`).then((res) => {
      console.log(res?.data);
      let blogArr = [];
      if (!res?.error) {
        for (let i = 0; i < res?.data?.length; i++) {
          blogArr[i] = res?.data[i];
          blogArr[i].checked = false;
        }
        setBlogData(blogArr);
      }
    });
  };

  const handleSelecAll = (e) => {
    const isChecked = e.target.checked;

    const updateItems = blogData?.map((item, index) => ({
      ...item,
      checked: isChecked,
    }));

    setBlogData(updateItems);

    if (isChecked) {
      const id = updateItems?.map((item) => item?._id).sort((a, b) => a - b);
      setSortedId(id);
    } else {
      setSortedId([]);
    }
  };

  const handleCheckBoxChange = (e, id, index) => {
    const updatedItems = blogData?.map((item) =>
      item?._id === id ? { ...item, checked: !item?.checked } : item
    );
    setBlogData(updatedItems);

    const selectedId = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedId(selectedId);
  };

  const deleteMultipleHS = () => {
    if (sortedId.length === 0) {
      context?.openAlertBox("error", "Please select item to delete");
      return;
    }

    try {
      deleteMultipleData(`/api/blog/deleteMultiple`, {
        id: sortedId,
      }).then((res) => {
        getData();
        context?.openAlertBox("success", res?.message);
        setSortedId([]);
      });
    } catch (error) {
      context?.openAlertBox("error", "Failed to delete items");
    }
  };

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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteData = (id) => {
    deleteDataFromApi(`/api/blog/${id}`).then((res) => {
      if (!res?.error) {
        context?.openAlertBox("success", res?.message);
        getData();
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 mt-3 ">
        <h2 className="text-[18px] font-[600] ">Blog List</h2>
        <div className="col w-[30%] flex ">
          <div className="gap-3 flex ml-auto">
            {sortedId?.length !== 0 && (
              <Button
                variant="contained"
                className="!btn-sm"
                // size="small"
                color="error"
                onClick={deleteMultipleHS}
              >
                Delete
              </Button>
            )}
            <Button className="btn !text-white !bg-green-700 btn-sm ">
              Export
            </Button>
            <Button
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Blog",
                })
              }
              className="!text-white !bg-blue-600 btn-sm"
            >
              Add Blog
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
          <h2 className="text-[18px] font-[600] ">Banners</h2>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox
                    onChange={handleSelecAll}
                    checked={
                      blogData?.length > 0
                        ? blogData?.every((item) => item.checked)
                        : false
                    }
                    color="primary"
                    size="small"
                  />
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
              {blogData?.length !== 0 &&
                blogData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          size="small"
                          checked={item?.checked}
                          onChange={(e) =>
                            handleCheckBoxChange(e, item?._id, index)
                          }
                        />
                      </TableCell>
                      <TableCell width={300}>
                        <div className="flex items-center gap-4 w-[50px] ">
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
                      <TableCell width={200}>
                        <span className="text-[15px] font-[500] inline-block w-[200px] md:w-[300px] ">
                          {item?.title}
                        </span>
                      </TableCell>
                      <TableCell width={300}>
                        <div
                          className="w-[250px] sm:w-[200px] md:w-[300px] "
                          dangerouslySetInnerHTML={{
                            __html: item?.description?.substr(0, 150) + "...",
                          }}
                        ></div>
                      </TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-1">
                          <TooltipMUI title="Edit product" placement="top">
                            <Button
                              className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                              style={{ minWidth: "35px" }}
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Blog",
                                  id: item?._id,
                                })
                              }
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
                              onClick={() => deleteData(item?._id)}
                            >
                              <FaTrashAlt className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                            </Button>
                          </TooltipMUI>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {blogData?.totalPages > 1 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={blogData?.totalPages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    </>
  );
};

export default BlogList;
