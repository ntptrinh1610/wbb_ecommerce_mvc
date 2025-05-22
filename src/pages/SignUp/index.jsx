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

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const history = useNavigate();
  const context = useContext(MyContext);

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
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full name!");
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }
    postData("/api/user/register", formFields).then((res) => {
      if (!res?.error) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });
        history("/verify-account");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const validValue = Object.values(formFields).every((el) => el);

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  function handleClickFacebook() {
    setLoadingFacebook(true);
  }

  return (
    <section className=" w-full h-dvh ">
      <header className="w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src={logo} className="w-[200px] " />
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          <NavLink
            to={"/login"}
            // className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 ">
              Login
          </Button>
          </NavLink>
          <NavLink
            to={"/sign-up"}
            // className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 ">
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src={wall}
        className=" w-full h-dvh fixed top-0 left-0 opacity-60 "
      />

      <div className="md:w-[600px] lg:pt-20 loginBox card h-[auto] pb-52 mx-auto mt-20 relative z-50 ">
        <div className="text-center mt-5 ">
          <img src={logo} className="m-auto w-[200px]" />
        </div>
        <h1 className="sm:text-[35px] text-center text-[18px] font-[800] mt-4 ">
          Welcome!
          <br />
          <span className="text-blue-500 ">Sign Up with social account</span>
        </h1>
        <div className="flex items-center justify-center w-full mt-5 gap-2 ">
          <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[16px] !capitalize !px-5 !text-[rgba(0,0,0,0.8)] "
          >
            Sign up with Google
          </Button>
          <Button
            size="small"
            onClick={handleClickFacebook}
            endIcon={<FaFacebook />}
            loading={loadingFacebook}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[16px] !capitalize !px-5 !text-[rgba(0,0,0,0.8)] "
          >
            Sign up with Facebook
          </Button>
        </div>

        <br />

        <div className="w-full flex items-center justify-center gap-3 ">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] "></span>
          <span className=" lg:text-[15px] text-[10px] font-[500] ">
            Or sign up with your email
          </span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)] "></span>
        </div>
        <br />
        <form className="w-full px-8 " onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">Full Name</h4>
            <input
              type="fullname"
              className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
              name="name"
              value={formFields.name}
              disabled={isLoading}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">Email</h4>
            <input
              type="email"
              className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
              name="email"
              value={formFields.email}
              disabled={isLoading}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group mb-4 w-full ">
            <h4 className="text-[14px] font-[500] mb-1 ">Password</h4>
            <div className="relative w-full">
              <input
                type={!isPasswordShow ? "password" : "text"}
                className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3  "
                name="password"
                value={formFields.password}
                disabled={isLoading}
                onChange={onChangeInput}
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

          <div className="form-group mb-4 w-full flex items-center justify-between ">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember Me"
            />

            <Link
              to={"/forgot-password"}
              className="text-blue-500 font-[700] text-[15px] hover:underline hover:text-gray-700 "
            >
              Forgot Password?
            </Link>
          </div>
          <div className="form-group mb-4 w-full flex items-center justify-between ">
            <span className="text-[14px] ">Already have an account?</span>
            <Link
              to={`/login`}
              className="cursor-pointer text-blue-500 font-[700] text-[15px] hover:underline hover:text-gray-700 "
            >
              Login
            </Link>
          </div>
          <Button
            disabled={!validValue}
            type="submit"
            className="btn-blue btn-lg w-full"
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
