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
  CircularProgress,
  Rating,
} from "@mui/material";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import {
  deleteDataFromApi,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
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

const Products = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdCategoryFilterVal, setthirdCategoryFilterVal] = useState("");
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

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

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

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

  return (
    <>
      <div className="flex items-center justify-between p-5 mt-3 ">
        <h2 className="text-[18px] font-[600] ">Products</h2>
        <div className="col w-[30%] flex ">
          <div className="gap-3 flex ml-auto">
            {sortedIds?.length !== 0 && (
              <Button
                variant="contained"
                className="btn-sm"
                // size="small"
                color="error"
                onClick={deleteMultipleProduct}
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
                  model: "Add Product",
                })
              }
              className="!text-white !bg-blue-600 btn-sm"
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>{" "}
      <div className="card my-5 py-5 shadow-md sm:rounded-lg bg-white ">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 w-full p-5 justify-between">
          <div className="col">
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
          <div className="col">
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
          <div className="col">
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
          <div className="col w-full flex items-center ml-auto ">
            <div style={{ alignSelf: "end" }} className="w-full">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
      <br />
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
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            <span className="font-[600] ">{product?.sale}</span>
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
                            <TooltipMUI title="Remove product" placement="top">
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
    </>
  );
};

export default Products;
