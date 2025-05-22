import React, { useContext, useState } from "react";

import logo from "../../assets/logo.png";
import wall from "../../assets/brick-wall.png";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ResetPassword = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const validValue = Object.values(formFields).every((el) => el);

  const forgotPassword = () => {
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    } else {
      context.openAlertBox("success", "OTP is sending to your email");
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");
      postData(`/api/user/forgot-password`, {
        email: formFields.email,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          history("/verify-account");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }
    postData("/api/user/login", formFields, { withCredentials: true }).then(
      (res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          setIsLoading(false);
          setFormFields({
            email: "",
            password: "",
          });
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);

          context.setIsLogin(true);
          history("/");
        } else {
          context.openAlertBox("error", res?.message);
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <section className=" w-full ">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src={logo} className="w-[200px] " />
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to={"/login"} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 ">
              Login
            </Button>
          </NavLink>
          <NavLink to={"/sign-up"}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 ">
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src={wall}
        className="h-full w-full fixed top-0 left-0 opacity-60 "
      />

      <div className="loginBox card w-[600px] h-[auto] pb-52 mx-auto mt-20 relative z-50 ">
        <div className="text-center mt-5 ">
          <img src={logo} className="m-auto w-[200px]" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4 ">
          Reset Password
          <br />
        </h1>
        <br />
        <form className="w-full px-8 " onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">New Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow ? "password" : "text"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
                name="password"
                value={formFields.password}
                onChange={onChangeInput}
                disabled={isLoading}
              />
              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600 "
              >
                {isPasswordShow ? (
                  <ImEye className="text-[18px] " />
                ) : (
                  <ImEyeBlocked className="text-[18px] " />
                )}
              </Button>
            </div>
          </div>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">
              Confirm New Password
            </h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow2 ? "password" : "text"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
                name="confirmPassword"
                value={formFields.password}
                onChange={onChangeInput}
                disabled={isLoading}
              />
              <Button
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600 "
              >
                {isPasswordShow2 ? (
                  <ImEye className="text-[18px] " />
                ) : (
                  <ImEyeBlocked className="text-[18px] " />
                )}
              </Button>
            </div>
          </div>
          <Button
            disabled={!validValue}
            type="submit"
            className="btn-blue btn-lg w-full"
          >
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
