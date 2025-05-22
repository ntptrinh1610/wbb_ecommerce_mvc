import { TextField, Button, Radio, colors } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaMoneyCheckAlt, FaPlus } from "react-icons/fa";
import { MyContext } from "../../App";
import no_address from "../../assets/no-address.png";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import Result from "../../components/Result";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_VNP_TMN_CODE = import.meta.env.VITE_VNP_TMN_CODE;
const VITE_VNP_HASH_SECRET = import.meta.env.VITE_VNP_HASH_SECRET;
const VITE_VNP_URL = import.meta.env.VITE_VNP_URL;
const VITE_VNP_API = import.meta.env.VITE_VNP_API;
const VITE_APP_PAYPAL_CLIENT_SECRET = import.meta.env
  .VITE_APP_PAYPAL_CLIENT_SECRET;
const VITE_APP_PAYPAL_CLIENT_ID = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;

const Checkout = () => {
  const context = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [isCheckOut, setIsCheckOut] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [pageOrder, setPageOrder] = useState(1);

  const onApprovePayment = async (data) => {
    const user = context?.userData;
    if (user?.address_details?.length !== 0) {
      const info = {
        userId: user?._id,
        products: context?.cartData,
        payment_status: "COMPLETED",
        delivery_address: selectedAddress,
        totalAmount: parseFloat(totalAmount),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")} `,
        "Content-Type": "application/json", //adjust the content type as needed
      };

      await axios
        .post(
          VITE_API_URL + "/api/order/capture-order-paypal",
          {
            ...info,
            paymentId: data.orderID,
          },
          { headers }
        )
        .then((response) => {
          setIsCheckOut(true);
          if (response.data.success) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
              context?.getCartData();
            });
            setIsSuccess(true);
            setMessage("You have paid successfully!");
          } else {
            setIsSuccess(false);
            if (response?.data?.message) {
              setMessage(response?.data?.message);
            } else {
              setMessage(
                "Something went wrong when trying to finish this process. Please try again!"
              );
            }
          }
        });
    } else {
      context?.openAlertBox("error", "Please select address before paid!");
    }
  };

  useEffect(() => {
    setIsCheckOut(false);
  }, []);

  useEffect(() => {
    // Load the PayPal JS SDK
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_APP_PAYPAL_CLIENT_ID}&disable-funding=card`;
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: async () => {
            // Create order on the server
            const resp = await fetch(
              "https://v6.exchangerate-api.com/v6/45ed45f48309aeca35267f21/latest/USD"
            );

            const respData = await resp.json();
            var convertedAmount = 0;

            if (respData.result === "success") {
              const usdToVndRate = respData.conversion_rates.USD;
              convertedAmount = (
                parseFloat(totalAmount) * usdToVndRate
              ).toFixed(2);
            }

            const headers = {
              Authorization: `Bearer ${localStorage.getItem("accessToken")} `,
              "Content-Type": "application/json", //adjust the content type as needed
            };
            const data = {
              userId: context?.userData?._id,
              totalAmount: convertedAmount,
            };

            // const response = await axios.post(
            //   VITE_API_URL + `/api/order/create-order-paypal`,
            //   {
            //     userId: user?._id,
            //     totalAmount: totalAmount,
            //   },
            //   { headers }
            // );

            const response = await axios.get(
              VITE_API_URL +
                `/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`,
              {
                headers,
              }
            );
            // return order id to paypal
            return response?.data?.id;
          },
          onApprove: async (data) => {
            onApprovePayment(data);
          },
          onError: (err) => {
            console.error("PayPal Checkout onError: ", err);
          },
        })
        .render("#paypal-button-container");
    };

    document.body.appendChild(script);
  }, [context?.cartData, context?.userData, selectedAddress, totalAmount]);

  useEffect(() => {
    if (context?.userData?.address_details) {
      setSelectedAddress(context?.userData?.address_details[0]?._id);
    }
  }, [context?.userData]);

  useEffect(() => {
    if (selectedAddress) {
      if (window.location.href.split("?")[1]) {
        fetchDataFromApi(
          `/api/order/vnpay-ipn?` + window.location.href.split("?")[1]
        ).then((res) => {
          if (res?.RspCode === "00") {
            const payload = {
              userId: context?.userData?._id,
              products: context?.cartData,
              paymentId: res?.paymentId,
              payment_status: "COMPLETED",
              delivery_address: selectedAddress,
              totalAmt: parseFloat(totalAmount),
              date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
            };

            postData(`/api/order/create`, payload).then((res) => {
              if (!res?.error) {
                context?.openAlertBox("success", res?.message);

                deleteData(
                  `/api/cart/emptyCart/${context?.userData?._id}`
                ).then((res) => {
                  context?.getCartData();
                });
                // history("/");
              } else {
                context?.openAlertBox("error", res?.message);
                console.error(res?.message);
              }
            });
            setIsCheckOut(true);
            setIsSuccess(true);
            setMessage("You have paid successfully!");
          } else {
            setIsSuccess(false);
            if (res?.Message) {
              setMessage(res?.Message);
            } else {
              setMessage(
                "Something went wrong when trying to finish this process. Please try again!"
              );
            }
          }
        });
      } else {
        setIsCheckOut(false);
      }
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      context?.getUserDetails();
    }
  }, [context?.addressId]);

  useEffect(() => {
    setTotalAmount(
      context?.cartData?.length !== 0
        ? context?.cartData
            ?.map((item) => parseFloat(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
            // ?.toLocaleString("en-US", { style: "currency", currency: "USD" })
            ?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        : 0
    );

    localStorage
      .setItem(
        "totalAmount",
        context?.cartData?.length !== 0
          ? context?.cartData
              ?.map((item) => parseFloat(item?.price) * item?.quantity)
              .reduce((total, value) => total + value, 0)
          : 0
      )
      ?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
  }, [context?.cartData]);

  const editAddress = (e, id) => {
    context?.toggleAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
    // props?.editAddress(e, id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  const checkout = async (e) => {
    e.preventDefault();

    const user = context?.userData;

    if (user?.address_details?.length !== 0) {
      const payload = {
        amount: parseFloat(totalAmount) * 100,
      };

      postData(`/api/order/create_payment_url`, payload).then((res) => {
        // context?.openAlertBox("success", res?.message);
        // const { vnpUrl } = res;

        if (res) {
          window.location.href = VITE_VNP_URL + "?" + res; // Redirect in browser
        }
      });
    } else {
      context?.openAlertBox("error", "Please select address before paid!");
    }
  };

  const cashOnDelivery = () => {
    const user = context?.userData;

    console.log(user);

    if (user?.address_details?.length !== 0) {
      const payload = {
        userId: user?._id,
        products: context?.cartData,
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: selectedAddress,
        totalAmt: parseFloat(totalAmount),
        data: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      postData(`/api/order/create`, payload).then((res) => {
        if (!res?.error) {
          context?.openAlertBox("success", res?.message);

          deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then(
            (res) => {
              context?.getCartData();
            }
          );
          setIsCheckOut(true);
          setIsSuccess(true);
          setMessage("You have paid successfully!");
          // history("/");
        } else {
          context?.openAlertBox("error", res?.message);
          console.error(res?.message);
        }
      });
    } else {
      context?.openAlertBox("error", "Please select address before paid!");
    }
  };

  return (
    <section className="lg:py-10 p-3">
      {!isCheckOut ? (
        <Result status={isSuccess} message={message} />
      ) : (
        <form onSubmit={checkout}>
          <div className="container flex gap-5 flex-col md:flex-row">
            <div className="leftCol w-full md:w-[70%]">
              <div className="card bg-white shadow-md p-5 rounded-md w-full">
                <div className="flex items-center justify-between">
                  <h2>Select Delivery Address</h2>
                  <Button
                    variant="outlined"
                    onClick={() => context?.toggleAddressPanel(true)}
                    className="btn-challe"
                  >
                    <FaPlus /> ADD{" "}
                    {context?.windowWidth < 767 ? "" : "NEW ADDRESS"}
                  </Button>
                </div>
                <br />
                <div className="flex flex-col gap-4">
                  {context?.userData?.address_details?.length !== 0 ? (
                    context?.userData?.address_details?.map(
                      (address, index) => {
                        return (
                          <label
                            key={index}
                            className={`!flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${
                              isChecked === index && "!bg-cream-tan "
                            } `}
                          >
                            <Radio
                              size="small"
                              onChange={(e) => handleChange(e, index)}
                              checked={isChecked === index}
                              value={address?._id}
                            />
                            <div className="info">
                              <span className="my-1 inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md ">
                                {address?.addressType}
                              </span>
                              <h3>{context?.userData?.name}</h3>
                              <p className="my-0  ">
                                {" "}
                                {address?.address_line +
                                  ", " +
                                  address?.city +
                                  ", " +
                                  address?.country +
                                  ", " +
                                  address?.state +
                                  ", "}
                                {address?.landmark && address?.landmark + ", "}
                                {address?.pincode}
                              </p>
                              <p className="my-0 font-[500] ">
                                {context?.userData?.mobile}
                              </p>
                              <Button
                                variant="text"
                                className="!absolute top-[15px] right-[15px] "
                                size="small"
                                onClick={(e) => editAddress(e, address?._id)}
                              >
                                EDIT
                              </Button>
                            </div>
                          </label>
                        );
                      }
                    )
                  ) : (
                    <>
                      <div className="flex items-center mt-5 justify-between flex-col p-5 ">
                        <img src={no_address} width={`100`} />
                        <h2 className="text-center ">
                          No address found in your details!
                        </h2>
                        <p className="mt-0">Add a delivery address</p>
                        <Button
                          onClick={() => context?.toggleAddressPanel(true)}
                          className="btn-challe"
                        >
                          ADD ADDRESS
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="rightCol w-full md:w-[30%] ">
              <div className="card shadow-md bg-white p-5 rounded-md">
                <h2 className="mb-4">Your Order</h2>
                <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)] ">
                  <span className="text-[14px] font-[600] ">Product</span>
                  <span className="text-[14px] font-[600] ">Subtotal</span>
                </div>

                <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
                  {context?.cartData?.length !== 0 &&
                    context?.cartData?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="part1 flex items-center gap-3">
                            <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                              <img
                                src={item?.image}
                                className="w-full transition-all group-hover:scale-105"
                              />
                            </div>
                            <div className="info">
                              <h4 className="text-[14px] ">
                                {item?.productTitle?.substr(0, 40) + "..."}
                              </h4>

                              <span className="text-[13px] ">
                                Quantity:{item?.quantity}
                              </span>
                              <span className="text-[13px] ml-[20px] ">
                                Price: &#36;{item?.price}
                              </span>
                            </div>

                            <span className="text-mocha-mousse font-bold">
                              {(item?.quantity * item?.price)?.toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="flex flex-col items-center gap-3 mb-2 ">
                  <Button
                    type="submit"
                    className="btn-challe btn-lg w-full flex gap-2 items-center"
                  >
                    <FaMoneyCheckAlt className="text-[22px] " />
                    Checkout
                  </Button>
                  <div
                    id="paypal-button-container"
                    className={` ${
                      context?.userData?.address_details?.length === 0
                        ? "pointer-events-none"
                        : ""
                    }`}
                  ></div>
                  <Button
                    type="button"
                    className="btn-dark btn-lg w-full flex gap-2 items-center "
                    onClick={cashOnDelivery}
                  >
                    <FaMoneyCheckAlt className="text-[22px] " />
                    Cash on Delivery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default Checkout;
