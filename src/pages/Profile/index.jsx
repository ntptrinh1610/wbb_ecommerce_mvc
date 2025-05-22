import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import {
  fetchDataFromApi,
  postData,
  updateDataFromApi,
  updateImageFromApi,
} from "../../utils/api";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import defaultAva from "../../assets/default-avatar.png";
import { useNavigate } from "react-router-dom";

import { MdCloudUpload } from "react-icons/md";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Collapse } from "react-collapse";

const Profile = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
  const [userId, setUserId] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [phone, setPhone] = useState("");
  // const [phone, setPhone] = useState("+84123456789");
  const [address, setAddress] = useState([]);
  const handleChange = (e) => {
    // setSelectedValue(e.target.value);
    if (e.target.checked) {
      updateDataFromApi(`/api/address/select/${e.target.value}`, {
        selected: true,
      });
    } else {
      updateDataFromApi(`/api/address/select/${e.target.value}`, {
        selected: false,
      });
    }
  };

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
  let selectedImages = [];
  const formdata = new FormData();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    // update info
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
        // phone:context?.userData?.mobile
      });
      setPhone(context?.userData?.mobile);

      // setPhone(String(context?.userData?.mobile));
      // setPhone(`"${context?.userData?.mobile}"`);

      setChangePassword({
        email: context?.userData?.email,
      });
    }

    // upload img
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please rnter name");
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
      if (!res?.error) {
        setIsLoading(false);
        console.log(res);
        context.openAlertBox("success", res?.message);
        setFormFields({
          name: res?.user?.name,
          email: res?.user?.email,
          mobile: res?.user?.mobile,
        });
        setPhone(res?.user?.mobile);
        setIsLoading(false);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm new password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.openAlertBox(
        "error",
        "New password and confirm new password are not match "
      );
      setIsLoading2(false);

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

  const onChangeFile = async (e) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/png" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append("avatar", file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG or WEBP image file"
          );
          setUploading(false);
          return false;
        }
      }
      updateImageFromApi("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const onChangePhoneNumber = (value) => {
    // const regex = /^\+84(3|5|7|8|9)[0-9]{8}\b/;
    // if (regex.test(value)) {
    //   setPhone(phone);
    //   setFormFields({ ...formFields, mobile: phone });
    // } else {
    //   context.openAlertBox(
    //     "error",
    //     "Invalid phone number. Use format like +84912345678"
    //   );
    // }

    setPhone(phone);
    setFormFields({ ...formFields, mobile: phone });
  };

  return (
    <>
      <div className="card  my-4 pt-5 w-full lg:w-[65%] shadow-md sm:rounded-lg !bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600] ">User Profile</h2>

          <Button
            className="!ml-auto"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </Button>
        </div>
        <div className=" w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
          {uploading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={index}
                      className="w-full h-full object-cover "
                    />
                  );
                })
              ) : (
                <img src={defaultAva} className="w-full h-full object-cover " />
              )}
            </>
          )}

          <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all ">
            <MdCloudUpload className="text-[#fff] text-[25px] " />
            <input
              onChange={(e) => {
                onChangeFile(e);
              }}
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 "
            />
          </div>
        </div>
        <hr className="text-[rgba(0,0,0,0.3)] " />
        <form className="form p-1 md:px-8 md:py-1 " onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
            <div className="col ">
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="name"
                value={formFields.name}
                disabled={isLoading}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
              <input
                type="email"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="email"
                value={formFields.email}
                disabled={true}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="flex items-center mt-4 gap-5">
            <div className="sm:w-[50%] w-full">
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

          <div
            className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
            onClick={() => {
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              });
            }}
          >
            <span className="text-[14px] font-[500] ">Add Address</span>
          </div>

          <div className="flex gap-2 flex-col mt-4 ">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="address"
              onChange={handleChange}
            >
              {context.address?.length > 0 &&
                context?.address?.map((address, index) => {
                  return (
                    <label
                      key={index}
                      className="border mb-5 border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer "
                    >
                      <FormControlLabel
                        checked={address?.selected}
                        value={address._id}
                        control={<Radio />}
                        label={
                          address?.address_line +
                          ", " +
                          address?.city +
                          ", " +
                          address?.country +
                          ", " +
                          address?.state +
                          ", " +
                          address?.pincode
                        }
                      />
                    </label>
                  );
                })}
            </RadioGroup>
          </div>

          <div className="flex items-center gap-4 mt-5 ">
            <Button type="submit" className="btn-blue btn-lg w-[200px] ">
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
        <br />
      </div>
      {showChangePassword && (
        <>
          <Collapse isOpened={showChangePassword}>
            <div className="w-full lg:w-[65%] mt-8 card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Change Password</h2>
                {/* <Button className="!ml-auto">Change password</Button> */}
              </div>
              <hr className="text-[rgba(0,0,0,0.3)] " />
              <form className="mt-5" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
                  {/* <div className="w-[50%]"> */}
                  <div className="form-group col mb-5 relative ">
                    <TextField
                      type={!isShowPassword ? "password" : "text"}
                      label="Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="oldPassword"
                      value={changePassword.oldPassword}
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

                  {/* <div className="w-[50%]"> */}
                  <div className="form-group col mb-5 relative ">
                    <TextField
                      type={!isShowPassword2 ? "password" : "text"}
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
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
                </div>

                <div className=" flex items-center mt-4 gap-5">
                  <div className="form-group sm:w-[50%] w-full mb-5 relative ">
                    <TextField
                      type={!isShowPassword3 ? "password" : "text"}
                      label="Confirm New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      disabled={isLoading2}
                      onChange={onChangeInput}
                    />
                    <Button
                      type="button"
                      className="!absolute top-[3px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                      onClick={() => setIsShowPassword3(!isShowPassword3)}
                    >
                      {!isShowPassword3 ? (
                        <IoIosEye className="text-[20px] opacity-75" />
                      ) : (
                        <IoIosEyeOff className="text-[20px] opacity-75" />
                      )}
                    </Button>
                  </div>
                </div>
                <br />
                <div className="flex items-center gap-4">
                  <Button type="submit" className="btn-blue btn-lg w-[200px] ">
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
    </>
  );
};

export default Profile;
