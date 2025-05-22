import React, { useContext, useState } from "react";

import logo from "../../assets/logo.png";
import wall from "../../assets/brick-wall.png";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel } from "@mui/material";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ChangePassword = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

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

    if (formFields.newPassword === "") {
      context.openAlertBox("error", "Please enter new password!");
      return false;
    }
    if (formFields.confirmPassword === "") {
      context.openAlertBox("success", "Please enter confirm password!");
      return false;
    }

    if (formFields.confirmPassword !== formFields.newPassword) {
      context.openAlertBox(
        "error",
        "Password and confirm password are not match"
      );
      setIsLoading(false);
      return false;
    }
    console.log(formFields)
    postData(`/api/user/reset-password-forgot`, formFields).then((res) => {
      console.log(res);
      if (!res.error) {
        context.openAlertBox("success", res?.message);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        setIsLoading(false);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
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
      <img src={wall} className=" w-full fixed top-0 left-0 opacity-60 " />

      <div className="loginBox card w-[600px] h-[auto] pb-52 mx-auto mt-20 relative z-50 ">
        <div className="text-center mt-5 ">
          <img src={logo} className="m-auto w-[200px]" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4 ">
          Ready to update your password?
          <br />
          Enter your new password below to keep your account secure.
        </h1>

        <br />

        <form className="w-full px-8 " onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">Password</h4>
            <div className="relative w-full">
              <input
                type={!isPasswordShow ? "password" : "text"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
                name="newPassword"
                onChange={onChangeInput}
                value={formFields.newPassword}
                disabled={isLoading}
              />
              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600 "
              >
                {!isPasswordShow ? (
                  <ImEye className="text-[18px] " />
                ) : (
                  <ImEyeBlocked className="text-[18px] " />
                )}
              </Button>
            </div>
          </div>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 "> Confirm Password</h4>
            <div className="relative w-full">
              <input
                type={!isPasswordShow2 ? "password" : "text"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
                name="confirmPassword"
                onChange={onChangeInput}
                value={formFields.confirmPassword}
                disabled={isLoading}
              />
              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow2)}
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600 "
              >
                {!isPasswordShow2 ? (
                  <ImEye className="text-[18px] " />
                ) : (
                  <ImEyeBlocked className="text-[18px] " />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="btn-blue btn-lg w-full">
            {" "}
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
