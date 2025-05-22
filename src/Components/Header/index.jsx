import React, { forwardRef, useContext, useEffect, useState } from "react";

import { MdOutlineMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import {
  Button,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  Slide,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import AddProduct from "../../pages/Products/addProduct";
import AddHomeSlide from "../../pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "../../pages/Category/addCategory";
import AddSubCategory from "../../pages/Category/addSubCategory ";
import AddAddress from "../../pages/Address/addAddress";
import EditCategory from "../../pages/Category/editCategory";
import EditProduct from "../../pages/Products/editProduct";
import AddBannerV1 from "../../pages/Banners/addBannerV1";
import EditBannerV1 from "../../pages/Banners/editBannerV1";
import AddBlog from "../../pages/Blog/addBlog";
import EditBlog from "../../pages/Blog/editBlog";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = () => {
  const [anchorAccount, setAnchorAccount] = useState(null);
  const openAccount = Boolean(anchorAccount);
  const context = useContext(MyContext);

  useEffect(() => {
    console.log(context.userData);
  }, []);

  const handleClickAccount = (event) => {
    setAnchorAccount(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorAccount(null);
  };

  const logout = () => {
    setAnchorAccount(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      if (!res?.error) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.openAlertBox("success", res?.message);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <header
        className={`w-full h-auto z-50 ${
          context.isSidebarOpen ? "pl-64" : "pl-5"
        } ${
          context?.isSidebarOpen && context?.windowWidth < 992 ? "!pl-44" : ""
        } pr-7 shadow-md py-2 bg-[#f1f1f1] border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between transition-all `}
      >
        <div className="part1">
          <Button
            onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
            className="!w-[40px] !h-[40px] !rounded-full min-w-[40px] !text-[rgba(0,0,0,0.8)] "
          >
            {context.isSidebarOpen ? (
              <MdOutlineMenuOpen className="text-[18px] text-[rgba(0,0,0,0.8)] " />
            ) : (
              <MdOutlineMenu className="text-[18px] text-[rgba(0,0,0,0.8)] " />
            )}
          </Button>
        </div>
        {context.isLogin ? (
          <>
            <div className="part2 w-[40%] flex items-center justify-end gap-5">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4}>
                  <FaBell />
                </StyledBadge>
              </IconButton>
              <div className="relative">
                <div
                  onClick={handleClickAccount}
                  className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer "
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRounc2dBGEHu-OXzFIAnvyIXrc28i8iVKa8A&s"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <Menu
                  anchorEl={anchorAccount}
                  id="account-menu"
                  open={openAccount}
                  onClose={handleCloseAccount}
                  onClick={handleCloseAccount}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseAccount}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer ">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRounc2dBGEHu-OXzFIAnvyIXrc28i8iVKa8A&s"
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="info">
                        <h3 className="text-[15px] font-[500] leading-5 ">
                          {context?.userData?.name}
                        </h3>
                        <p className="text-[12px] font-[400] opacity-70 ">
                          {context?.userData?.email}
                        </p>
                      </div>
                    </div>
                  </MenuItem>
                  <Divider />
                  <Link to={"/profile"}>
                    {" "}
                    <MenuItem
                      onClick={handleCloseAccount}
                      className="flex items-center gap-3"
                    >
                      <FaUser /> <span className="text-[14px] ">Profile</span>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={logout}
                    className="flex items-center gap-3"
                  >
                    <IoLogOutOutline />{" "}
                    <span className="text-[14px] ">Logout</span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </>
        ) : (
          <Link to={"/login"}>
            <Button className="btn-blue btn-sm !rounded-full ">Sign In</Button>
          </Link>
        )}
      </header>
      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() => context?.setIsOpenFullScreenPanel({ open: false })}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => context.setIsOpenFullScreenPanel({ open: false })}
              aria-label="close"
            >
              <IoClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {context.isOpenFullScreenPanel?.model}
              </span>
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => context.setIsOpenFullScreenPanel({ open: false })}
            >
              <span className="text-gray-800">Save</span>{" "}
            </Button>
          </Toolbar>
        </AppBar>
        {context?.isOpenFullScreenPanel?.model === "Add Product" && (
          <AddProduct />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add Home Slide" && (
          <AddHomeSlide />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add New Category" && (
          <AddCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add New Sub Category" && (
          <AddSubCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add New Address" && (
          <AddAddress />
        )}
        {context?.isOpenFullScreenPanel?.model === "Edit Category" && (
          <EditCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "Edit Product" && (
          <EditProduct />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add Banner V1" && (
          <AddBannerV1 />
        )}
        {context?.isOpenFullScreenPanel?.model === "Edit Banner V1" && (
          <EditBannerV1 />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add Blog" && <AddBlog />}
        {context?.isOpenFullScreenPanel?.model === "Edit Blog" && <EditBlog />}
      </Dialog>
    </>
  );
};

export default Header;
