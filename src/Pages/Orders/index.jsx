import React, { useContext, useEffect, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import AccountSidebar from "../../components/AccountSidebar";
import { Button, Pagination, TablePagination } from "@mui/material";
import Badge from "../../components/Badge";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [pageOrder, setPageOrder] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  useEffect(() => {
    context?.getOrderData(pageOrder);
  }, [pageOrder]);

  console.log(context?.orderData?.totalPages);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  const handleChange = (event, value) => {
    // context.setProgress(40);
    // context?.getOrderData(value);
    setPageOrder(value);
  };

  return (
    <>
      <section className="py-5 lg:py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 w-[20%] hidden lg:block ">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[70%]">
            <div className="shadow-md rounded-md p-5 bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)] ">
                <h2>My Orders</h2>
                <p className="mt-0">
                  There are{" "}
                  <span className="font-bold text-mocha-mousse">
                    {" "}
                    {context?.orderData?.data?.length !== 0
                      ? context?.orderData?.data?.length
                      : 0}
                  </span>{" "}
                  orders
                </p>
                <div className="relative overflow-x-auto">
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
                      {context?.orderData?.data?.length !== 0 ? (
                        context?.orderData?.data?.map((order, index) => {
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
                                <td className="px-6 py-4">
                                  {order?.userId?.name}
                                </td>
                                <td className="px-6 py-4">
                                  {order?.userId?.mobile}
                                </td>
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
                                <td className="px-6 py-4">
                                  &#36;{order?.totalAmt}
                                </td>
                                <td className="px-6 py-4">
                                  {order?.userId?.email}
                                </td>
                                <td className="px-6 py-4">
                                  <Badge status={order?.order_status} />
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
                                              order?.products?.map(
                                                (product, index) => {
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
                                                        ).toLocaleString(
                                                          "en-US",
                                                          {
                                                            style: "currency",
                                                            currency: "USD",
                                                          }
                                                        )}
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )
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
                          <td
                            colSpan="100%"
                            className="text-center py-4 text-gray-500"
                          >
                            There are no orders at the moment.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  
                  <div className="sticky left-0  my-5 flex flex-col justify-center items-center ">
                    <Pagination
                      onChange={handleChange}
                      count={context?.orderData?.totalPages}
                      color="primary"
                      className=""
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
