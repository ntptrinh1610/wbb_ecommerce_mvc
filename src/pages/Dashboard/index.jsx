import React, { useContext, useEffect, useState } from "react";
import groceries from "../../assets/shopping.png";

import DashboardBoxes from "../../Components/DashboardBoxes";
import Badge from "../../Components/Badge";

import {
  Button,
  Checkbox,
  Pagination,
  Tooltip as TooltipMUI,
  Select,
  MenuItem,
  CircularProgress,
  Rating,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as Tooltipgp,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { TiExport } from "react-icons/ti";

import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { MyContext } from "../../App";
import { deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import SearchBox from "../../Components/SearchBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

const columns = [
  { id: "product", label: "Product", minWidth: 150 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "subCat",
    label: "Sub Category",
    minWidth: 150,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "Sales",
    minWidth: 100,
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 100,
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

const Dashboard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdCategoryFilterVal, setthirdCategoryFilterVal] = useState("");
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageOrder, setPageOrder] = useState(1);
  const [orderData, setOrderData] = useState();
  const [order, setOrder] = useState();
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const context = useContext(MyContext);

  const data = [
    {
      name: "JAN",
      TotalUsers: 4000,
      TotalSales: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      TotalUsers: 3000,
      TotalSales: 1398,
      amt: 2210,
    },
    {
      name: "MARCH",
      TotalUsers: 2000,
      TotalSales: 9800,
      amt: 2290,
    },
    {
      name: "APRIL",
      TotalUsers: 2780,
      TotalSales: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      TotalUsers: 1890,
      TotalSales: 4800,
      amt: 2181,
    },
    {
      name: "JUNE",
      TotalUsers: 2390,
      TotalSales: 3800,
      amt: 2500,
    },
    {
      name: "JULY",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "SEP",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "OCT",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "NOV",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "DEC",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    context?.getAllUsers();
    context?.getAllReviews();
    context?.getAllProductsCount();
    getTotalSalesByYear();
  }, []);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  useEffect(() => {
    context?.getOrderData(pageOrder);
    context?.getOrderCount();
  }, [pageOrder]);

  useEffect(() => {
    if (context?.orderData?.data) {
      setOrderData(context?.orderData?.data);
      setOrder(context?.orderData);
    }
  }, [context?.orderData]);

  useEffect(() => {
    // filter orders based on search query
    if (searchQuery !== "") {
      const filteredOrders = context?.orderCount?.data?.filter((order) => {
        return (
          order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order?.userId?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.userId?.email
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.createdAt?.includes(searchQuery)
        );
      });
      setOrderData(filteredOrders);
    } else {
      context?.getOrderData(pageOrder);
    }

    console.log(context?.orderData);
  }, [searchQuery]);

  const handleCatFilterChange = (e) => {
    setCategoryFilterVal(e.target.value);
    setSubCategoryFilterVal("");
    setthirdCategoryFilterVal("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${e.target.value}`
    ).then((res) => {
      if (!res?.error) {
        setProductData(res?.products);
        setIsLoading(false);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const handleSubCatFilterChange = (e) => {
    setSubCategoryFilterVal(e.target.value);
    setCategoryFilterVal("");
    setthirdCategoryFilterVal("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${e.target.value}`
    ).then((res) => {
      if (!res?.error) {
        setProductData(res?.products);
        setIsLoading(false);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const handleThirdCatFilterChange = (e) => {
    setthirdCategoryFilterVal(e.target.value);
    setCategoryFilterVal("");
    setSubCategoryFilterVal("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdCatId/${e.target.value}`
    ).then((res) => {
      if (!res?.error) {
        setProductData(res?.products);
        setIsLoading(false);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      let productArr = [];
      console.log(res?.products);
      if (!res?.error) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setProductData(productArr);
        setIsLoading(false);
      }
    });
  };

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  const handleChangePageOrder = (event, value) => {
    // context.setProgress(40);
    // context?.getOrderData(value);
    setPageOrder(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteDataFromApi(`/api/product/${id}`).then((res) => {
      if (!res?.error) {
        getProducts();
        context?.openAlertBox("success", res?.message);
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };

  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select items to delete!");
      return;
    }

    console.log(sortedIds);
    try {
      deleteMultipleData(`/api/product/deleteMultiple`, {
        id: sortedIds,
        // data: { id: sortedIds },
      }).then((res) => {
        console.log(res);
        getProducts();
        context?.openAlertBox("success", "Product deleted");
      });
    } catch (error) {
      context?.openAlertBox("error", "Fail to deleting items");
    }
  };

  const handleSelecAll = (e) => {
    const isChecked = e.target.checked;

    // update all items checked status
    const updatedItems = productData?.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    // Update the sorted IDs state
    if (isChecked) {
      const id = updatedItems.map((item) => item?._id).sort((a, b) => a - b);
      console.log(id);
      setSortedIds(id);
    } else {
      setSortedIds([]);
    }
  };

  const handleCheckBoxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item?._id === id ? { ...item, checked: !item?.checked } : item
    );

    setProductData(updatedItems);

    // update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
    console.log(selectedIds);
  };

  const getTotalUsersByYear = () => {
    fetchDataFromApi(`/api/order/users`).then((res) => {
      const users = [];
      if (!res?.error) {
        res?.totalUsers?.length !== 0 &&
          res?.totalUsers?.map((item) => {
            users.push({
              name: item?.name,
              TotalUsers: parseInt(item?.TotalUsers),
            });
          });
      } else {
        console.error(res?.message);
      }

      const uniqueArr = users?.filter(
        (obj, index, self) =>
          // self.findIndex(...) finds the first occurrence of an object with the same name.
          // self is the array being filtered (users in this case).
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };

  const getTotalSalesByYear = () => {
    fetchDataFromApi(`/api/order/sales`).then((res) => {
      const sales = [];
      if (!res?.error) {
        res?.monthlySales?.length !== 0 &&
          res?.monthlySales?.map((item) => {
            sales.push({
              name: item?.name,
              TotalSales: parseInt(item?.TotalSales),
            });
          });
      } else {
        console.error(res?.message);
      }

      const uniqueArr = sales?.filter(
        (obj, index, self) =>
          // self.findIndex(...) finds the first occurrence of an object with the same name.
          // self is the array being filtered (users in this case).
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };

  console.log(chartData);

  return (
    <>
      <div className="w-full py-2 bg-white px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="sm:text-[35px] text-[28px] font-bold leading-10 mb-3 ">
            Good Morning, <br /> Admin
          </h1>
          <p>
            Manage your dashboard efficiently and keep everything running
            smoothly.
          </p>
          <br />
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
            className="btn-blue !captilize"
          >
            <FaPlus /> &nbsp; Add Product
          </Button>
        </div>

        <img src={groceries} className={"hidden lg:block w-[250px] "} alt="" />
      </div>
      {context?.productCount !== 0 &&
        context?.users?.length !== 0 &&
        context?.allReviews?.length !== 0 && (
          <DashboardBoxes
            orders={context?.orderCount?.data?.length}
            products={context?.productCount}
            users={context?.users?.length}
            reviews={context?.allReviews?.length}
            category={context?.catData?.length}
          />
        )}
      <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between p-5 ">
          <h2 className="text-[18px] font-[600] ">Products</h2>
        </div>
        <div className="flex gap-4 dashboardFilters items-center w-full p-5 justify-between">
          <div className="col w-[15%]  ">
            <h4 className="font-[600] text-[13px] mb-3 ">Category By </h4>
            {context?.catData?.length !== 0 && (
              <Select
                className="w-full "
                style={{ zoom: "80%" }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryFilterVal}
                // label="Age"
                onChange={handleCatFilterChange}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    <MenuItem key={index} value={cat._id}>
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-3 ">Sub Category By </h4>
            {context?.catData?.length !== 0 && (
              <Select
                className="w-full "
                style={{ zoom: "80%" }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryFilterVal}
                // label="Age"
                onChange={handleSubCatFilterChange}
              >
                {context?.catData?.map((cat) => {
                  return cat?.children.map((sub, index) => {
                    return (
                      <MenuItem value={sub._id} key={index}>
                        {sub.name}
                      </MenuItem>
                    );
                  });
                })}
              </Select>
            )}
          </div>
          <div className="col w-[18%]">
            <h4 className="font-[600] text-[13px] mb-3 ">
              Third Level Category By{" "}
            </h4>
            {context?.catData?.length !== 0 && (
              <Select
                className="w-full "
                style={{ zoom: "80%" }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={thirdCategoryFilterVal}
                // label="Age"
                onChange={handleThirdCatFilterChange}
              >
                {context?.catData?.map((cat) => {
                  return cat?.children?.map((sub) => {
                    return sub?.children?.map((third, index) => {
                      return (
                        <MenuItem value={third._id} key={index}>
                          {third.name}
                        </MenuItem>
                      );
                    });
                  });
                })}
              </Select>
            )}
          </div>
          <div className="col w-[20%] ml-auto search_box ">
            <SearchBox />
          </div>
        </div>
        <br />
        {/* Tailwind table */}
        {/* <div className="relative overflow-x-auto mt-5 pb-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3" width={"10%"}>
                  <div className="w-[60px] ">
                    <Checkbox size="small" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-6 pr-0 pl-3">
                  <div className="w-[60px]">
                    <Checkbox size="small" />
                  </div>
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/product/1"}>
                        <img
                          src="https://m.media-amazon.com/images/I/612RHMFZnDL._AC_SX679_.jpg"
                          className="w-full group-hover:scale-105 transition-all  "
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%] ">
                      <Link to={"/product/1"}>
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-mocha-mousse ">
                          Keychain ....
                        </h3>
                      </Link>
                      <span className="text-[12px] ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium ipsum at voluptatibus officia illo impedit
                        in quo fuga dolorum dolores aspernatur ut qui esse,
                        consectetur quisquam voluptas necessitatibus!
                        Repellendus, ex?
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Fashion</td>
                <td className="px-6 py-2">Women</td>
                <td className="px-6 py-2">Were bare bears</td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4 flex-col ">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] ">
                      $58.00
                    </span>
                    <span className="price text-mocha-mousse text-[14px] font-[600] ">
                      $58.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px] ">
                    <span className="font-[600] ">234</span>
                    &nbsp; sale
                  </p>
                  <Progress value={50} type="error" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <TooltipMUI title="Edit product" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                        style={{ minWidth: "35px" }}
                      >
                        <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="View product details" placement="top">
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
                </td>
              </tr>

              {isOpenOrderedProduct === 0 && (
                <tr>
                  <td className="pl-20 " colSpan={"6"}>
                    <div className="relative overflow-x-auto my-5 ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">123872183hdjasdhjada</td>
                            <td className="px-6 py-4">Keychain ....</td>
                            <td className="px-6 py-4">
                              <img
                                src="https://m.media-amazon.com/images/I/612RHMFZnDL._AC_SX679_.jpg"
                                className="w-[80px] h-[80px] object-cover rounded-md "
                              />
                            </td>
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">1200</td>
                            <td className="px-6 py-4">1300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pt-5 pb-5 px-4 ">
          <Pagination count={10} color="primary" />
        </div> */}
        {/* MUI table */}
        <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
          <div className="flex items-center justify-between p-5 ">
            <h2 className="text-[18px] font-[600] ">Products</h2>
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
                        productData?.length > 0
                          ? productData?.every((item) => item?.checked)
                          : false
                      }
                    />
                  </TableCell>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading && productData?.length !== 0 ? (
                  productData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((product, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <Checkbox
                              checked={product?.checked}
                              onChange={(e) =>
                                handleCheckBoxChange(e, product._id, index)
                              }
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[300px] ">
                              <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                <Link to={`/product/${product._id}`}>
                                  <LazyLoadImage
                                    alt="img"
                                    className="w-full"
                                    src={product?.images[0]}
                                  />
                                </Link>
                              </div>
                              <div className="info w-[75%] ">
                                <Link to={`/product/${product._id}`}>
                                  <h3 className="font-[600] text-[12px] leading-4 hover:text-mocha-mousse ">
                                    {product?.name}
                                  </h3>
                                </Link>
                                <span className="text-[12px] ">
                                  {product?.description}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {product?.catName}
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {product?.subCat}
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex gap-4 flex-col ">
                              <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] ">
                                &#36;{product.oldPrice}
                              </span>
                              <span className="price text-mocha-mousse text-[14px] font-[600] ">
                                &#36;{product.price}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <p className="text-[14px] w-[100px] ">
                              <span className="font-[600] ">
                                {product?.sale}
                              </span>
                              &nbsp; sale
                            </p>
                            <Progress value={product?.sale} type="error" />
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <p className="text-[14px] w-[100px] ">
                              <Rating
                                name="half-rating"
                                defaultValue={product.rating}
                                readOnly
                                size="small"
                              />
                            </p>
                            <Progress value={product?.sale} type="error" />
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-1">
                              <TooltipMUI title="Edit product" placement="top">
                                <Button
                                  className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                  style={{ minWidth: "35px" }}
                                  onClick={() =>
                                    context?.setIsOpenFullScreenPanel({
                                      open: true,
                                      model: "Edit Product",
                                      id: product._id,
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
                                <Link to={`/product/${product?._id}`}>
                                  <Button
                                    className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                    style={{ minWidth: "35px" }}
                                  >
                                    <FaEye className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                                  </Button>
                                </Link>
                              </TooltipMUI>
                              <TooltipMUI
                                title="Remove product"
                                placement="top"
                              >
                                <Button
                                  className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                                  style={{ minWidth: "35px" }}
                                  onClick={() => deleteProduct(product?._id)}
                                >
                                  <FaTrashAlt className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                                </Button>
                              </TooltipMUI>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : productData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>No data match</TableCell>
                  </TableRow>
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={8}>
                        <div className="flex items-center justify-center w-full min-h-[400px] ">
                          <CircularProgress color="inherit" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>

      <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-col sm:flex-row p-5 ">
          <h2 className="lg:mb-0 mb-2 text-[18px] font-[600] ">
            Recent Orders
          </h2>
          <div className="ml-auto w-full ">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrder={setPageOrder}
            />
          </div>
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {" "}
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.length !== 0 ? (
                orderData?.map((order, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => isShowOrderedProduct(index)}
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1] "
                          >
                            {isOpenOrderedProduct !== index ? (
                              <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)] " />
                            ) : (
                              <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)] " />
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-mocha-mousse">
                            {order?._id}
                          </span>{" "}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-mocha-mousse">
                            {order?.paymentId
                              ? order?.paymentId
                              : "CASH ON DELIVERY"}
                          </span>{" "}
                        </td>
                        <td className="px-6 py-4">{order?.userId?.name}</td>
                        <td className="px-6 py-4"> {order?.userId?.mobile}</td>
                        <td className="px-6 py-4">
                          <span className="block w-[300px]">
                            {order?.delivery_address?.address_line +
                              " " +
                              order?.delivery_address?.city +
                              " " +
                              order?.delivery_address?.landmark +
                              " " +
                              order?.delivery_address?.state +
                              " " +
                              order?.delivery_address?.country +
                              " " +
                              order?.delivery_address?.mobile +
                              " "}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order?.delivery_address?.pincode}
                        </td>
                        <td className="px-6 py-4">&#36;{order?.totalAmt}</td>
                        <td className="px-6 py-4">{order?.userId?.email}</td>
                        <td className="px-6 py-4">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={
                              order?.order_status !== null
                                ? order?.order_status
                                : orderStatus
                            }
                            label="Status"
                            size="small"
                            className="w-full"
                            onChange={(e) => handleChange(e, order?._id)}
                          >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"confirm"}>Confirm</MenuItem>
                            <MenuItem value={"delivered"}>Delivered</MenuItem>
                          </Select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.createdAt?.split("T")[0]}
                        </td>
                      </tr>

                      {isOpenOrderedProduct === index && (
                        <>
                          <tr>
                            <td className="pl-20 " colSpan={"6"}>
                              <div className="relative overflow-x-auto my-5 ">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Id
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Title
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Image
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Price
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Subtotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {console.log(context?.orderData)}
                                    {order?.products?.length !== 0 ? (
                                      order?.products?.map((product, index) => {
                                        return (
                                          <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                          >
                                            <td className="px-6 py-4">
                                              {product?.productId}
                                            </td>
                                            <td className="px-6 py-4">
                                              {product?.productTitle?.slice(
                                                0,
                                                30
                                              ) + "..."}
                                            </td>
                                            <td className="px-6 py-4">
                                              <img
                                                src={product?.image}
                                                className="w-[80px] h-[80px] object-cover rounded-md "
                                              />
                                            </td>
                                            <td className="px-6 py-4">
                                              {product?.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                              {product?.price.toLocaleString(
                                                "en-US",
                                                {
                                                  style: "currency",
                                                  currency: "USD",
                                                }
                                              )}
                                            </td>
                                            <td className="px-6 py-4">
                                              {(
                                                product?.price *
                                                product?.quantity
                                              ).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                              })}
                                            </td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="100%"
                                          className="text-center py-4 text-gray-500"
                                        >
                                          Something wrong with server
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="100%" className="text-center py-4 text-gray-500">
                    There are no orders at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="sticky left-0 my-5 flex flex-col justify-center items-center ">
            <Pagination
              onChange={handleChangePageOrder}
              count={order?.totalPages}
              color="primary"
              className="mb-5"
              showFirstButton
              showLastButton
            />
            <p>
              Showing <b>{pageOrder}</b> of <b>{order?.totalPages}</b> results
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}

      <div className="card my-4 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between p-5 ">
          <h2 className="text-[18px] font-[600] ">Total Users & Total Sales</h2>
        </div>

        <div className="flex items-center gap-5 p-5 ">
          <span
            className="flex items-center gap-1 tetx-[15px] cursor-pointer "
            onClick={getTotalUsersByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600 "></span>
            Total Users
          </span>
          <span
            className="flex items-center gap-1 tetx-[15px] cursor-pointer "
            onClick={getTotalSalesByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-[#8884d8] "></span>
            Total Sales
          </span>
        </div>
        {chartData?.length !== 0 && (
          <LineChart
            width={
              context?.windowWidth > 920
                ? context?.windowWidth - 300
                : context?.windowWidth - 50
            }
            height={500}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="none" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltipgp />
            <Legend />
            <Line
              type="monotone"
              dataKey="TotalSales"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="TotalUsers"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        )}
      </div>
    </>
  );
};

export default Dashboard;
