import React, { useContext, useState } from "react";

import logo from "../../assets/logo.png";
import wall from "../../assets/brick-wall.png";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { MyContext } from "../../App";

const ForgotPassword = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  function handleClickFacebook() {
    setLoadingFacebook(true);
  }

  return (
    <section className="h-[100vh] w-full ">
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
      <img src={wall} className=" w-full fixed top-0 left-0 opacity-60 " />

      <div className="loginBox card w-[600px] h-[auto] pb-52 mx-auto mt-20 relative z-50 ">
        <div className="text-center mt-5 ">
          <img src={logo} className="m-auto w-[200px]" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4 ">
          Forgot your password?
          <br />
          Don't worries! Enter your details below to regain access to your
          account.
        </h1>
        <br />
        <form className="w-full px-8 ">
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">Email</h4>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
            />
          </div>
          <div className="text-center flex items-center justify-center gap-4">
            <Link
              to={"/forgot-password"}
              className=" text-blue-500 font-[700] text-[15px] hover:underline hover:text-gray-700"
            >
              <span>Don't want to reset? </span>
              Sign In
            </Link>
          </div>
          <Button className="btn-blue btn-lg w-full">Reset Password</Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
