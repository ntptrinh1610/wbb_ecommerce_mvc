import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData, updateDataFromApi } from "../../utils/api";

const ForgotPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
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
      return false
    }

    postData(`/api/user/reset-password-forgot`, formFields).then((res) => {
      console.log(res);
      if (!res.error) {
        context.openAlertBox("success", res?.message);
        // localStorage.removeItem("userEmail");
        // localStorage.removeItem("actionType");
        setIsLoading(false);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="section py-5 lg:py-10">
        <div className="container">
          <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-[18px] text-black">
              Forgot Password
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit} >
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  //   type="password"
                  type={!isShowPassword ? "password" : "text"}
                  id="newPassword"
                  label="New Password"
                  variant="outlined"
                  className="w-full"
                  name="newPassword"
                  onChange={onChangeInput}
                  value={formFields.newPassword}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {!isShowPassword ? (
                    <IoIosEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoIosEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  //   type="password"
                  type={!isShowPassword2 ? "password" : "text"}
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  className="w-full"
                  name="confirmPassword"
                  onChange={onChangeInput}
                  value={formFields.confirmPassword}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword2(!isShowPassword2)}
                >
                  {!isShowPassword2 ? (
                    <IoIosEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoIosEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>
              <div className="flex items-center w-full my-3">
                <Button type="submit" className="btn-challe btn-lg w-full">
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
