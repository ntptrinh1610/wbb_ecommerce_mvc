import React, { useContext, useEffect, useState } from "react";

import { MdCloudUpload } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import { Button, CircularProgress, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { postData, updateDataFromApi } from "../../utils/api";
import { Collapse } from "react-collapse";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
  const [phone, setPhone] = useState("");

  const [isShowChangePassword, setIsShowChangePassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
    }
    setFormFields({
      name: context?.userData?.name,
      email: context?.userData?.email,
      mobile: context?.userData?.mobile,
    });

    setPhone(context?.userData?.mobile);

    setChangePassword({
      email: context?.userData?.email,
    });
  }, [context?.userData]);

  const onChangePhoneNumber = (value) => {
    setPhone(value);
    setFormFields({ ...formFields, mobile: value });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });

    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter name");
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter phone number");
      return false;
    }

    updateDataFromApi(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.data?.error) {
        setIsLoading(false);
        context.openAlertBox("success", res?.data?.message);
        setFormFields({
          name: res?.data?.user?.name,
          email: res?.data?.user?.email,
          mobile: res?.data?.user?.mobile,
        });
        setPhone(res?.user?.mobile);

        setIsLoading(false);
      } else {
        context.openAlertBox("error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    console.log(changePassword);
    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new password");
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm new password");
      return false;
    }
    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlertBox(
        "error",
        "New password and confirm new password are not macth"
      );
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (!res?.error) {
        setIsLoading2(false);
        context.openAlertBox("success", res?.message);
        setChangePassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  return (
    <>
      <section className="lg:py-10 py-3 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="col1 lg:w-[20%] w-full ">
            <AccountSidebar />
          </div>

          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">My Profile</h2>
                <Button
                  onClick={() => setIsShowChangePassword(!isShowChangePassword)}
                  className="!ml-auto"
                >
                  Change password
                </Button>
              </div>
              <hr className="text-[rgba(0,0,0,0.3)] " />
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div className="col">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="name"
                      value={formFields?.name}
                      disabled={isLoading}
                      onChange={onChangeInput}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="email"
                      value={formFields?.email}
                      disabled={true}
                      onChange={onChangeInput}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </div>
                  <div className="col w-[100%] ">
                    <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                      Phone Number
                    </h3>
                    <PhoneInput
                      disabled={isLoading}
                      defaultCountry="VN"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={onChangePhoneNumber}
                    />
                  </div>
                </div>
                <br />
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    className="btn-challe btn-lg w-[200px] "
                  >
                    {isLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {isShowChangePassword && (
              <>
                <Collapse isOpened={isShowChangePassword}>
                  <div className="mt-8 card bg-white p-5 shadow-md rounded-md">
                    <div className="flex items-center pb-3">
                      <h2 className="pb-0">Change Password</h2>
                      {/* <Button className="!ml-auto">Change password</Button> */}
                    </div>
                    <hr className="text-[rgba(0,0,0,0.3)] " />
                    <form
                      className="mt-5"
                      onSubmit={handleSubmitChangePassword}
                    >
                      <div className="grid lg:grid-cols-2 gap-3 lg:gap-5">
                        {/* <div className="w-[50%]"> */}

                        {!context?.userData?.signUpWithGoogle && (
                          <div className="form-group lg:mb-5 relative col">
                            <TextField
                              type={!isShowPassword ? "password" : "text"}
                              label="Password"
                              variant="outlined"
                              size="small"
                              className="w-full "
                              name="oldPassword"
                              value={changePassword?.oldPassword}
                              disabled={isLoading2}
                              onChange={onChangeInput}
                            />
                            <Button
                              type="button"
                              className="!absolute top-[3px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                              {!isShowPassword ? (
                                <IoIosEye className="text-[20px] opacity-75" />
                              ) : (
                                <IoIosEyeOff className="text-[20px] opacity-75" />
                              )}
                            </Button>
                          </div>
                        )}

                        {/* <div className="w-[50%]"> */}
                        <div className="form-group lg:mb-5 relative col">
                          <TextField
                            type={!isShowPassword2 ? "password" : "text"}
                            label="New Password"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            name="newPassword"
                            value={changePassword?.newPassword}
                            disabled={isLoading2}
                            onChange={onChangeInput}
                          />
                          <Button
                            type="button"
                            className="!absolute top-[3px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                            onClick={() => setIsShowPassword2(!isShowPassword2)}
                          >
                            {!isShowPassword2 ? (
                              <IoIosEye className="text-[20px] opacity-75" />
                            ) : (
                              <IoIosEyeOff className="text-[20px] opacity-75" />
                            )}
                          </Button>
                          {/* </div> */}
                        </div>
                        {/* </div> */}
                        <div className="col">
                          <div className="form-group lg:mb-5 relative ">
                            <TextField
                              type={!isShowPassword3 ? "password" : "text"}
                              label="Confirm New Password"
                              variant="outlined"
                              size="small"
                              className="w-full"
                              name="confirmPassword"
                              value={changePassword?.confirmPassword}
                              disabled={isLoading2}
                              onChange={onChangeInput}
                            />
                            <Button
                              type="button"
                              className="!absolute top-[3px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                              onClick={() =>
                                setIsShowPassword3(!isShowPassword3)
                              }
                            >
                              {!isShowPassword3 ? (
                                <IoIosEye className="text-[20px] opacity-75" />
                              ) : (
                                <IoIosEyeOff className="text-[20px] opacity-75" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className="flex items-center gap-4">
                        <Button
                          type="submit"
                          className="btn-challe w-[200px] "
                        >
                          {isLoading2 ? (
                            <CircularProgress color="inherit" />
                          ) : (
                            "Change Password"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </Collapse>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
