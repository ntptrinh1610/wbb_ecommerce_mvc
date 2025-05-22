import React, { useContext, useEffect, useState } from "react";

import { MdCloudUpload, MdMoreVert } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

import {
  Button,
  CircularProgress,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

import AccountSidebar from "../../components/AccountSidebar";

import { MyContext } from "../../App";

import {
  updateDataFromApi,
  postData,
  fetchDataFromApi,
  deleteData,
} from "../../utils/api";

import { Collapse } from "react-collapse";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import AddressBox from "./AddressBox";

const Address = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [addressType, setAddressType] = useState("");
  const [openModifyAddress, setOpenModifyAddress] = useState(false);
  const [mode, setMode] = useState("add");
  const [addressId, setAddressId] = useState("");

  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
    userId: context?.userData?._id,
    landmark: "",
    addressType: "",
  });

  // useEffect(() => {
  //   if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
  //     fetchDataFromApi(`/api/address`).then(
  //       (res) => {
  //         setAddress(res.data);
  //         setFormFields({ ...formFields, userId: context?.userData?._id });
  //       }
  //     );
  //     // setAddress(context?.userData?.address_details);
  //   }
  // }, [context?.userData]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      context?.getAddressData();
    }
  }, [context?.userData]);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setFormFields({ ...formFields, status: e.target.value });
  };

  const onChangePhoneNumber = (value) => {
    setPhone(value);
    setFormFields({ ...formFields, mobile: value });
  };

  const handleChange = (e) => {
    console.log(selectedValue);
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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      if (!res?.error) {
        context?.openAlertBox("success", res.message);
        context?.getAddressData();
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlChangeAddressType = (e) => {
    setAddressType(e.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: e.target.value,
    }));
  };

  const editAddress = (e, id) => {
    e.preventDefault();
    context?.setMode("edit");
    setAddressId(id);
    setIsOpen(true);
    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      if (!res?.error) {
        setFormFields({
          address_line: res?.data?.address_line,
          city: res?.data?.city,
          state: res?.data?.state,
          pincode: res?.data?.pincode,
          country: res?.data?.country,
          mobile: res?.data?.mobile,
          status: res?.data?.status,
          userId: res?.data?.userId,
          landmark: res?.data?.landmark,
          addressType: res?.data?.addressType,
        });

        // const ph=`"${res?.data?.mobile}"`

        setPhone(res?.data?.mobile);
        setAddressType(res?.data?.addressType);
      }
    });
  };

  return (
    <>
      <section className="py-5 lg:py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-full md:lg-[30%] lg:w-[20%] ">
            <AccountSidebar />
          </div>

          <div className="col2 w-full md:w-[70%] lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Add Address</h2>
              </div>
              <hr className="text-[rgba(0,0,0,0.3)] " />
              <div
                className="mt-5 flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                // onClick={() => {
                //   setIsOpen(true);
                // }}
                onClick={() => {
                  context?.toggleAddressPanel(true);
                  context?.setAddressMode("add");
                }}
              >
                <span className="text-[14px] font-[500] ">Address</span>
              </div>
              <div className="flex gap-2 flex-col mt-4 ">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="address"
                  onChange={handleChange}
                >
                  {context?.addressData?.length > 0 &&
                    context?.addressData?.map((address, index) => {
                      return (
                        <AddressBox
                          removeAddress={removeAddress}
                          address={address}
                          key={index}
                          setMode={setMode}
                          editAddress={editAddress}
                        />
                      );
                    })}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Dialog onClose={handleClose} open={isOpen} onSubmit={handleSubmit}>
        <DialogTitle>{mode === "add" ? "Add" : "Edit"} Address</DialogTitle>
        <AddressBox />
      </Dialog> */}
    </>
  );
};

export default Address;
