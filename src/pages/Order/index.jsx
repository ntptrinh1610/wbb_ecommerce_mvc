import React, { useContext, useEffect, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import {
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Pagination,
} from "@mui/material";
import SearchBox from "../../Components/SearchBox";
import Badge from "../../Components/Badge";
import { MyContext } from "../../App";
import { updateDataFromApi } from "../../utils/api";

const OrderList = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState();
  const [order, setOrder] = useState();

  const context = useContext(MyContext);

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

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  const handleChangePage = (event, value) => {
    // context.setProgress(40);
    // context?.getOrderData(value);
    setPageOrder(value);
  };

  const handleChange = (e, id) => {
    setOrderStatus(e.target.value);
    const obj = {
      _id: id,
      order_status: e.target.value,
    };
    updateDataFromApi(`/api/order/order-status`, obj).then((res) => {
      if (!res?.error) {
        context?.openAlertBox("success", res?.message);
        context?.getOrderData();
      } else {
        context?.openAlertBox("error", res?.error);
      }
    });
  };

  return (
    <>
      <div className="card my-3 shadow-md sm:rounded-lg bg-white ">
        <div className="lg:grid-cols-2 sm:flex-row grid grid-cols-1 p-5 flex-col ">
          <h2 className="text-[18px] font-[600] text-left mb-2 lg:mb-0 ">Recent Orders</h2>
          <div className="ml-auto w-full md:w-[300px] ">
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
              onChange={handleChangePage}
              count={context?.orderData?.totalPages}
              color="primary"
              className="mb-5"
              showFirstButton
              showLastButton
            />
            <p>
              Showing <b>{pageOrder}</b> of{" "}
              <b>{context?.orderData?.totalPages}</b> results
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
