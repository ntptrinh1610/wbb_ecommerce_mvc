import { createContext, useEffect, useState } from "react";
import "./App.css";
import "./responsive.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import LayoutProduct from "./Layout/products";
import AddProduct from "./pages/Products/addProduct";

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
import LayoutHomeSB from "./Layout/homeSliderBanner";
import AddHomeSlide from "./pages/HomeSliderBanners/addHomeSlide";
import Category from "./pages/Category";
import AddCategory from "./pages/Category/addCategory";
import LayoutCategory from "./Layout/categoryLayout";
import AddSubCategory from "./pages/Category/addSubCategory ";
import SubLayoutCategory from "./Layout/subCategoryLayout ";
import UserCategory from "./Layout/userLayout";
import OrderCategory from "./Layout/orderLayout";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyAccount from "./pages/VerifyAccount";
import ChangePassword from "./pages/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AddAddress from "./pages/Address/addAddress";
import EditCategory from "./pages/Category/editCategory";
import LayoutProductDetails from "./Layout/productDetailsLayout";
import LayoutAddProductRams from "./Layout/addProductRams";
import LayoutAddProductWeight from "./Layout/addProductWeight";
import LayoutAddProductSize from "./Layout/addProductSize";
import LayoutBannerV1 from "./Layout/bannerV1";
import LayoutBlogList from "./Layout/blogListLayout";

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState();
  const [orderData, setOrderData] = useState([]);
  const [orderCount, setOrderCount] = useState([]);
  const [users, setUsers] = useState();
  const [productCount, setProductCount] = useState();
  const [allReviews, setAllReviews] = useState();
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(18);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res) => {
        console.log(res);
        setUserData(res.data);
        setAddress(res?.data?.address_details);
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
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();
  }, [isOpenFullScreenPanel]);

  useEffect(() => {
    if (windowWidth < 992) {
      setIsSidebarOpen(false);
      setSidebarWidth(100);
    } else {
      setIsSidebarOpen(true);
      setSidebarWidth(18);
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const getAllUsers = () => {
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      if (!res?.error) {
        setUsers(res?.data);
      } else {
        console.error(res?.message);
      }
    });
  };
  const getAllReviews = () => {
    fetchDataFromApi(`/api/user/getAllReviews`).then((res) => {
      if (!res?.error) {
        setAllReviews(res?.data);
      } else {
        console.error(res?.message);
      }
    });
  };

  const getAllProductsCount = () => {
    fetchDataFromApi(`/api/product/getAllProductsCount`).then((res) => {
      if (!res?.error) {
        setProductCount(res?.data);
      } else {
        console.error(res?.message);
      }
    });
  };

  const getOrderData = (pageOrder) => {
    fetchDataFromApi(
      `/api/order/all-order-list?page=${pageOrder}&limit=${2}`
    ).then((res) => {
      if (!res?.error) {
        setOrderData(res);
      } else {
        console.log(res?.message);
      }
    });
  };

  const getOrderCount = () => {
    fetchDataFromApi(`/api/order/all-order-list`).then((res) => {
      if (!res?.error) {
        setOrderCount(res);
      } else {
        console.error(res?.message);
      }
    });
  };

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
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

  const openAlertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    openAlertBox,
    userData,
    setUserData,
    address,
    setAddress,
    catData,
    setCatData,
    getCat,
    setOrderData,
    orderData,
    getOrderData,
    setOrderCount,
    orderCount,
    getOrderCount,
    setAllReviews,
    allReviews,
    setUsers,
    users,
    getAllUsers,
    getAllReviews,
    productCount,
    getAllProductsCount,
    windowWidth,
    setWindowWidth,
    sidebarWidth,
    setSidebarWidth,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <LayoutProduct />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/change-password",
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Profile />
        </>
      ),
    },
    // {
    //   path: "/product/upload",
    //   element: (
    //     <>
    //       <AddProduct />
    //     </>
    //   ),
    // },
    {
      path: "/homeSlider/list",
      element: (
        <>
          <LayoutHomeSB />
        </>
      ),
    },
    {
      path: "/category/list",
      element: (
        <>
          <LayoutCategory />
        </>
      ),
    },
    {
      path: "/subCat/list",
      element: (
        <>
          <SubLayoutCategory />
        </>
      ),
    },
    {
      path: "/users",
      element: (
        <>
          <UserCategory />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <OrderCategory />
        </>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <>
          <LayoutProductDetails />
        </>
      ),
    },
    {
      path: "/product/addRams",
      element: (
        <>
          <LayoutAddProductRams />
        </>
      ),
    },
    {
      path: "/product/addWeight",
      element: (
        <>
          <LayoutAddProductWeight />
        </>
      ),
    },
    {
      path: "/product/addSize",
      element: (
        <>
          <LayoutAddProductSize />
        </>
      ),
    },
    {
      path: "/bannerV1List",
      element: (
        <>
          <LayoutBannerV1 />
        </>
      ),
    },
    {
      path: "/blog/list",
      element: (
        <>
          <LayoutBlogList />
        </>
      ),
    },
  ]);
  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;

export { MyContext };
