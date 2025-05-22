import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

import {
  Button,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IoClose } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";
import CategoryCollapse from "../../CategoryCollapse";
import { MyContext } from "../../../App";
import { getAuth, signOut } from "firebase/auth";
import { fetchDataFromApi } from "../../../utils/api";

const CategoryPanel = (props) => {
  const [open, setOpen] = useState(false);
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnerSubMenuIndex] = useState(null);
  const context = useContext(MyContext);
  const history = useNavigate();

  const openSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const openInnerSubMenu = (index) => {
    if (innerSubMenuIndex === index) {
      setInnerSubMenuIndex(null);
    } else {
      setInnerSubMenuIndex(index);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen);
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
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (!res?.error) {
        props.setIsOpenCatPanel(false);
        props.propsSetIsOpenCatPanel(false);
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

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      //   onClick={toggleDrawer(false)}
      className="categoryPanel"
    >
      <div className="p-3">
        <img className="w-[150px]" src={logo} alt="logo" />
      </div>
      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Show by categories
        <IoClose
          className="cursor-pointer text-[20px]"
          onClick={toggleDrawer(false)}
        />
      </h3>
      {props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />}
      {context?.windowWidth < 992 && !context?.isLogin && (
        <Link
          to={"login"}
          className="p-3 block "
          onClick={() => {
            props.setIsOpenCatPanel(false);
            props.propsSetIsOpenCatPanel(false);
          }}
        >
          <Button className="btn-challe w-full ">Login</Button>
        </Link>
      )}

      {context?.windowWidth < 992 && context?.isLogin && (
        <div
          className="p-3 block "
          onClick={logout}  
        >
          <Button className="btn-challe w-full ">Logout</Button>
        </div>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;
