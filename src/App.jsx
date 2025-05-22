import { createContext, useEffect, useState } from "react";
import "./App.css";
import "./responsive.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IoClose } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

import Header from "./components/Header";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import ProductZoom from "./components/ProductZoom";
import ProductInfo from "./components/ProductInfo";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPanel from "./components/CartPanel";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import { fetchDataFromApi, postData } from "./utils/api";
import Address from "./Pages/MyAccount/address";
import SearchPage from "./Pages/ProductListing";

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState("");
  const [catData, setCatData] = useState("");
  const [productData, setProductData] = useState("");
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [addressMode, setAddressMode] = useState("add");
  const [addressId, setAddressId] = useState();
  const [addressData, setAddressData] = useState();
  const [searchData, setSearchData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isOpenFilterBtn, setIsOpenFilterBtn] = useState(false);

  const [openCartPanel, setOpenCartPanel] = useState({
    open: false,
    item: {},
  });
  const [openAddressPanel, setOpenAddressPanel] = useState({
    open: false,
    item: {},
  });

  const getOrderData = (pageOrder) => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=1`).then(
      (res) => {
        if (!res?.error) {
          console.log(res);
          setOrderData(res);
        } else {
          console.log(res?.message);
        }
      }
    );
  };

  const getListData = () => {
    fetchDataFromApi(`/api/myList`).then((res) => {
      if (!res?.error) {
        setMyListData(res?.data);
      } else {
        console.log(res?.message);
      }
    });
  };

  const getCartData = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (!res?.error) {
        setCartData(res?.data);
      } else {
        console.log(res?.message);
      }
    });
  };

  const getAddressData = () => {
    fetchDataFromApi(`/api/address`).then((res) => {
      if (!res?.error) {
        setAddressData(res?.data);
      } else {
        console.log(res?.message);
      }
    });
  };
  const token = localStorage.getItem("accessToken");

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res) => {
      console.log(res);
      setUserData(res.data);

      if (res?.response?.data?.error) {
        if (res?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          openAlertBox("error", "The session has ended! Please login again");
          setIsLogin(false);
          window.location.href = "/login";
        }
      }
    });
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      getCartData();
      getListData();
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      if (!res?.error) {
        setCatData(res?.data);
      }
    });

    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      if (!res?.error) {
        setProductData(res?.products);
      }
    });

    window.addEventListener("resize", handleResize);
    return () => {
      // Prevent Memory Leaks
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCartPanel = (newOpen, item) => {
    setOpenCartPanel({ open: newOpen, item: item });
  };
  const toggleAddressPanel = (newOpen, item) => {
    if (!newOpen) {
      setAddressMode("add");
      setAddressId("");
    }
    setOpenAddressPanel({ open: newOpen, item: item });
  };

  const handleClickOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {},
    });
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const addToCart = async (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "You have to login to use this function!");
      return true;
    }

    const data = {
      productId: product?.productId,
      productTitle: product?.productTitle,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      brand: product?.brand,
      quantity: quantity ? quantity : product?.quantity,
      subTotal: parseFloat(product?.price * quantity),
      countInStock: product?.countInStock,
      userId: userId,
      size: product?.size,
      ram: product?.ram,
      weight: product?.weight,
    };

    const response = await postData(`/api/cart/create`, data).then((res) => {
      if (!res?.error) {
        openAlertBox("success", res?.message);
        getCartData();
      } else {
        openAlertBox("error", res?.message);
      }
      return res?.success;
    });
    return response;
  };

  const addToList = async (item, quantity) => {
    if (userData?._id === undefined) {
      openAlertBox("error", "You have to login to use this function!");
      return true;
    }

    const data = {
      productId: item?.productId,
      productTitle: item?.productTitle,
      image: item?.image,
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      discount: item?.discount,
      brand: item?.brand,
    };

    const response = await postData(`/api/myList/create`, data).then((res) => {
      if (!res?.error) {
        openAlertBox("success", res?.message);
      } else {
        openAlertBox("error", res?.message);
      }
      return res?.error;
    });
    return response;
  };

  const values = {
    setOpenProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    catData,
    setCatData,
    setProductData,
    productData,
    handleClickOpenProductDetailsModal,
    addToCart,
    cartData,
    setCartData,
    getCartData,
    handleCloseProductDetailsModal,
    openProductDetailsModal,
    myListData,
    setMyListData,
    addToList,
    getListData,
    toggleAddressPanel,
    setOpenAddressPanel,
    openAddressPanel,
    getUserDetails,
    setAddressMode,
    addressMode,
    setAddressId,
    addressId,
    getAddressData,
    setAddressData,
    addressData,
    setOrderData,
    orderData,
    getOrderData,
    searchData,
    setSearchData,
    windowWidth,
    setWindowWidth,
    openFilter,
    setOpenFilter,
    isOpenFilterBtn,
    setIsOpenFilterBtn,
    setOpenSearch,
    openSearch,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productListing" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/address" element={<Address />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;

export { MyContext };
