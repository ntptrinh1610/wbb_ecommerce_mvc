import React, { useContext, useEffect, useState } from "react";

import { MdCloudUpload } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";

import { Button, CircularProgress, TextField } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import {
  fetchDataFromApi,
  updateDataFromApi,
  updateImageFromApi,
} from "../../utils/api";
import defaultAva from "../../assets/default-avatar.png";
import { getAuth, signOut } from "firebase/auth";

const AccountSidebar = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const formdata = new FormData();

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    } else {
    }
  }, [context?.userData]);

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const onChangeFile = async (e, apiEp) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG and WEBP file"
          );
          setUploading(false);
          return false;
        }
      }
      console.log(formdata.getAll("avatar"));
      updateImageFromApi(apiEp, formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      console.log(error);
    }
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
    <>
      <div className="card bg-white shadow-md rounded-md p-5 sticky top-[10px] ">
        <div className="w-full p-5 flex items-center justify-center flex-col ">
          <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center">
            {uploading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                {previews?.length !== 0 ? (
                  previews?.map((img, index) => {
                    return (
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <>
                    <img
                      src={defaultAva}
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </>
            )}

            <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all ">
              <MdCloudUpload className="text-[#fff] text-[25px] " />
              <input
                onChange={(e) => {
                  onChangeFile(e, "/api/user/user-avatar");
                }}
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 "
              />
            </div>
          </div>
          <h3>{context?.userData?.name}</h3>
          <h6 className="text-[13px] font-[500] ">
            {context?.userData?.email}
          </h6>
        </div>

        <ul className="list-none pb-5 myAccountTabs">
          <li className="w-full">
            <NavLink
              to={"/my-account"}
              // activeClassName="active"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <FaUser className="text-[15px] " /> My Profile
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to={"/address"}
              // activeClassName="active"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <FaMapMarkerAlt className="text-[15px] " /> Address
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to={"/my-list"}
              // activeClassName="active"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <FaHeart className="text-[15px] " /> My List
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"/order"}
              // activeClassName="active"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 ">
                <FaShoppingCart className="text-[15px] " /> My Orders
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <Button
              onClick={logout}
              className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 "
            >
              <IoMdLogOut className="text-[15px] " /> Logout
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountSidebar;
