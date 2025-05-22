import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/banner4.webp";
import Search from "../Search";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";

import { styled } from "@mui/material/styles";
import {
  Button,
  IconButton,
  Badge,
  Tooltip,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";

import Navigation from "./Navigation/index";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { getAuth, signOut } from "firebase/auth";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const Header = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    const auth = getAuth();
    if (auth) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          context.openAlertBox("error", res?.message);
        });
    }
    setAnchorEl(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (!res?.error) {
        console.log(res);
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.openAlertBox("success", res?.message);
        context?.setCartData([]);
        context?.setMyListData([]);
        history("/");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <header className=" !bg-white sticky -top-[140px] z-100 ">
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%] hidden lg:block ">
              <p className="text-[14px] font-[500]">
                Hope you have a nice day!
              </p>
            </div>

            <div className="w-full lg:w-[50%] lg:justify-end col2 flex items-center justify-between ">
              <ul className="lg:w-[200px] w-full justify-between flex items-center gap-1">
                <li className="list-none">
                  <Link
                    to={"help-center"}
                    className="lg:text-[14px] text-[11px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/order-tracking"}
                    className="lg:text-[14px] text-[11px] link font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-3 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container flex items-center justify-between">
          {context?.windowWidth < 992 && (
            <Button
              onClick={() => setIsOpenCatPanel(true)}
              className="!w-[35px] !min-w-[35px] !h-[35px] !rounded-full !text-gray-800 "
            >
              <IoIosMenu size={22} />
            </Button>
          )}
          <div className="col1 w-[40%] lg:w-[25%]">
            <Link to={"/"}>
              <img
                src={logo}
                className="h-[40px] max-w-[140px] lg:max-w-[200px]"
              />
            </Link>
          </div>
          <div
            className={`col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 ${
              context?.windowWidth > 992 && "!block"
            } ${context?.openSearch ? "block" : "hidden"} `}
          >
            <Search />
          </div>
          <div className="col3 w-[35%] flex items-center pl-5!">
            <ul className="flex items-center gap-0 lg:gap-3 w-full justify-end">
              {!context.isLogin && context?.windowWidth > 992 ? (
                <li className="list-none">
                  <Link
                    to={"/login"}
                    className="link transition text-[15px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to={"/register"}
                    className="link transition text-[15px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  {context?.windowWidth > 922 && (
                    <li>
                      <Button
                        onClick={handleClick}
                        className="myAccountWrap flex items-center gap-3 cursor-pointer"
                      >
                        <div className="!w-[40px] flex items-center justify-center !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] ">
                          <FaUser className="text-[16px] text-[rgba(0,0,0,0.7)] " />
                        </div>
                        {context?.windowWidth > 992 && (
                          <div className="info flex flex-col">
                            <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start ">
                              {context?.userData?.name}
                            </h4>
                            <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-[400] mb-0 capitalize text-left justify-start ">
                              {context?.userData?.email}
                            </span>
                          </div>
                        )}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <Link to={"/my-account"} className="w-full block">
                          <MenuItem
                            onClick={handleClose}
                            className="flex gap-2 !py-3 "
                          >
                            <FaUser className="text-[18px] " />{" "}
                            <span className="text-[14px] ">My account</span>
                          </MenuItem>
                        </Link>
                        <Link to={"/order"} className="w-full block">
                          <MenuItem
                            onClick={handleClose}
                            className="flex gap-2 !py-3"
                          >
                            <FaShoppingCart className="text-[18px] " />{" "}
                            <span className="text-[14px] ">Orders</span>
                          </MenuItem>
                        </Link>
                        <Link to={"/my-list"} className="w-full block">
                          <MenuItem
                            onClick={handleClose}
                            className="flex gap-2 !py-3"
                          >
                            <FaHeart className="text-[18px] " />{" "}
                            <span className="text-[14px] ">My List</span>
                          </MenuItem>
                        </Link>
                        <Link to={"/logout"} className="w-full block">
                          <MenuItem
                            // onClick={handleClose}
                            onClick={logout}
                            className="flex gap-2 !py-3"
                          >
                            <IoMdLogOut className="text-[18px] " />{" "}
                            <span className="text-[14px] ">Logout</span>
                          </MenuItem>
                        </Link>
                      </Menu>
                    </li>
                  )}
                </>
              )}

              <li>
                <Tooltip title={"Cart"}>
                  <IconButton
                    aria-label="cart"
                    onClick={() => context?.toggleCartPanel(true, {})}
                  >
                    <StyledBadge
                      badgeContent={
                        context?.cartData?.length !== 0
                          ? context?.cartData?.length
                          : "0"
                      }
                    >
                      <FaShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              {context?.windowWidth > 992 && (
                <li>
                  <NavLink
                    to={"/my-list"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {" "}
                    <Tooltip title={"Wishlist"}>
                      <IconButton aria-label="wishlist">
                        <StyledBadge
                          badgeContent={
                            context?.myListData?.length !== 0
                              ? context?.myListData?.length
                              : "0"
                          }
                        >
                          <FaHeart />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </li>
              )}

              <li>
                <Tooltip title={"Compare"}>
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4}>
                      <IoGitCompareSharp />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </header>
  );
};

export default Header;
