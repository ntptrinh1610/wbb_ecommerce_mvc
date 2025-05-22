import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import Badge from "../../Components/Badge";
import defaultAva from "../../assets/default-avatar.png";

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
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

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
import { deleteMultipleData, fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "userImg", label: "User Image", minWidth: 150 },
  { id: "userName", label: "User Name", minWidth: 100 },
  { id: "userEmail", label: "User Email", minWidth: 100 },
  {
    id: "userPhone",
    label: "User Phone Number",
    minWidth: 150,
  },
  {
    id: "verifyemail",
    label: "Email Verify",
    minWidth: 150,
  },
  {
    id: "createDate",
    label: "Create Date",
    minWidth: 150,
  },
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

const UserList = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUserData, setTotalUserData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);

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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserData = () => {
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      if (!res?.error) {
        setUserData(res?.data);
        setTotalUserData(res?.data);
        setIsLoading(false);
      } else {
        console.error(res?.message);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getUserData();
  }, []);

  useEffect(() => {
    // filter orders based on search query
    if (searchQuery !== "") {
      const filteredOrders = totalUserData?.filter((item) => {
        return (
          item?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.mobile?.includes(searchQuery) ||
          item?.createdAt?.includes(searchQuery)
        );
      });
      setUserData(filteredOrders);
    } else {
      getUserData();
    }
  }, [searchQuery]);
  const deleteMultipleUser = () => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete!");
      return;
    }
    try {
      deleteMultipleData(`/api/user/deleteMultiple`, {
        id: sortedIds,
        // data: { id: sortedIds },
      }).then((res) => {
        console.log(res);
        getUserData();
        context?.openAlertBox("success", "User selected deleted");
      });
    } catch (error) {
      context?.openAlertBox("error", "Failed to delete items");
    }
  };

  const handleSelecAll = (e) => {
    const isChecked = e.target.checked;

    // update all items checked status
    const updatedItems = userData?.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUserData(updatedItems);

    // Update the sorted IDs state
    if (isChecked) {
      const id = updatedItems.map((item) => item?._id).sort((a, b) => a - b);
      setSortedIds(id);
    } else {
      setSortedIds([]);
    }
  };

  const handleCheckBoxChange = (e, id, index) => {
    const updatedItems = userData?.map((item) =>
      item?._id === id ? { ...item, checked: !item?.checked } : item
    );
    setUserData(updatedItems);

    // update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 mt-3 "></div>{" "}
      <div className="card my-5 py-5 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center w-full p-5 justify-between ">
          <h2 className="text-[18px] font-[600] ">User List</h2>
          <div className="gap-2 flex col">
            {sortedIds?.length !== 0 && (
              <Button
                variant="contained"
                className="btn-sm "
                // size="small"
                color="error"
                onClick={deleteMultipleUser}
              >
                Delete
              </Button>
            )}
            <div>
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between p-5 ">
          <h2 className="text-[18px] font-[600] ">User List</h2>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox
                    color="primary"
                    size="small"
                    onChange={handleSelecAll}
                    checked={
                      userData?.length > 0
                        ? userData?.every((item) => item?.checked)
                        : false
                    }
                  />{" "}
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <span className="whitespace-nowrap ">{column.label}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                userData?.length !== 0 &&
                userData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.reverse()
                  ?.map((user, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            checked={user?.checked ? user?.checked : false}
                            onChange={(e) =>
                              handleCheckBoxChange(e, user._id, index)
                            }
                            color="primary"
                            size="small"
                          />{" "}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[70px] ">
                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                              <Link to={`/user/${user?._id}`}>
                                <img
                                  src={user?.avatar ? user?.avatar : defaultAva}
                                  className="w-full group-hover:scale-105 transition-all  "
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {user?.name}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <span className="flex items-center gap-2">
                            <MdEmail />
                            {user?.email}
                          </span>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <span className="flex items-center gap-2">
                            <FaPhoneAlt />
                            {user?.mobile ? user?.mobile : ""}
                          </span>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {!user?.verify_email ? (
                            <Badge status="verified" />
                          ) : (
                            <Badge status="unverified" />
                          )}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <span className="flex items-center gap-2">
                            <FaCalendarAlt />
                            {user?.createdAt.split("T")[0]}
                          </span>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-1">
                            <TooltipMUI title="Edit product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                style={{ minWidth: "35px" }}
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
                              >
                                <FaTrashAlt className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                              </Button>
                            </TooltipMUI>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default UserList;
