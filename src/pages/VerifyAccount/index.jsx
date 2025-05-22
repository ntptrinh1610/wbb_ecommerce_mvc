import React, { useContext, useState } from "react";

import logo from "../../assets/logo.png";
import wall from "../../assets/brick-wall.png";
import verified from "../../assets/verified.png";

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
import OtpBox from "../../Components/OtpBox";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const history = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    if (otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");
      if (actionType !== "forgot-password") {
        postData("/api/user/verifyEmail", {
          email: userEmail,
          otp: otp,
        }).then((res) => {
          if (!res?.error) {
            context.openAlertBox("success", res?.message);
            localStorage.removeItem("userEmail");
            history("/login");
            setIsLoading(false);
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: userEmail,
          otp: otp,
        }).then((res) => {
          if (!res?.error) {
            context.openAlertBox("success", res?.message);
            setIsLoading(false);
            history("/change-password");
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      }
    }else{
      context.openAlertBox("error","Please enter OTP")
    }
  };

  return (
    <section className=" w-full ">
      <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center sm:justify-between z-50">
        <Link to="/">
          <img src={logo} className="w-[200px] " />
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          <NavLink to={"/login"}>
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

      <div className="md:w-[600px] lg:pt-20 loginBox card h-[auto] pb-52 mx-auto mt-20 relative z-50 ">
        <div className="text-center mt-5 ">
          <img src={verified} className="m-auto w-[100px]" />
        </div>
        <h1 className="sm:text-[35px] text-center text-[18px] font-[800] mt-4 ">
          Welcome Back!
          <br />
          Enter OTP to complete the verification process.
        </h1>

        <p className="text-center text-[15px] ">
          OTP send to{" "}
          <span className="text-blue-400 font-bold text-[12px] sm:text-[14px] ">{userEmail}</span>
        </p>

        <br />
        <div className="text-center flex items-center justify-center flex-col ">
          <OtpBox length={6} onChange={handleOtpChange} />
        </div>
        <br />
        <div className="w-[300px] m-auto ">
          <Button className="btn-blue w-full" onClick={verifyOTP}>
            {isLoading ? <CircularProgress color="inherit" /> : "Verify OTP"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
