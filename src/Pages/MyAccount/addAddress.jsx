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

const AddAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [addressType, setAddressType] = useState("");
  const [openModifyAddress, setOpenModifyAddress] = useState(false);
  // const [addressId, setAddressId] = useState("");

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

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(`/api/address`).then(
        (res) => {
          setAddress(res.data);
          setFormFields({ ...formFields, userId: context?.userData?._id });
        }
      );
    }
  }, [context?.userData]);

  useEffect(() => {
    if (context?.addressId) {
    // if (context?.addressMode === "edit") {
      fetchEditAddress(context?.addressId);
    }
  }, [context?.addressMode]);

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
      context.openAlertBox("success", res.message);
      fetchDataFromApi(`/api/address/?userId=${context?.userData?._id}`).then(
        (res) => {
          setAddress(res.data);
        }
      );
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(formFields);

    if (formFields.address_line === "") {
      context.openAlertBox("error", "Please enter Address Line 1");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter Email");
      setIsLoading(false);
      return false;
    }
    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter City");
      setIsLoading(false);
      return false;
    }
    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter State");
      setIsLoading(false);
      return false;
    }
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter pincode");
      setIsLoading(false);
      return false;
    }
    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter country");
      setIsLoading(false);
      return false;
    }
    if (phone === "") {
      context.openAlertBox("error", "Please enter phone number");
      setIsLoading(false);
      return false;
    }

    if (context?.addressMode === "add") {
      postData(`/api/address/add`, formFields, { withCredentials: true }).then(
        (res) => {
          if (!res?.error) {
            setIsLoading(false);
            context?.openAlertBox("success", res?.message);
            context?.toggleAddressPanel(false);
            context?.getUserDetails();
            context?.getAddressData();
            setFormFields({
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
            setAddressType("");
            setPhone("");
          } else {
            setIsLoading(false);
            context.openAlertBox("error", res?.message);
          }
        }
      );
    }
    if (context?.addressMode === "edit") {
      setIsLoading(true);
      updateDataFromApi(`/api/address/${context?.addressId}`, formFields).then(
        (res) => {
          if (!res?.error) {
            context?.getAddressData();

            context?.toggleAddressPanel(false);

            setFormFields({
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
            setAddressType("");
            setPhone("");
            context?.openAlertBox("success", res?.message);
          } else {
            context?.openAlertBox("error", res?.message);
          }
          setIsLoading(false);
        }
      );
    }
  };

  const fetchEditAddress = (id) => {
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
    <form
      className="px-8 pt-3 pb-8 gap-3 flex flex-col "
      onSubmit={handleSubmit}
    >
      <div className="col w-[100%] ">
        <TextField
          className="w-full"
          label="Address Line"
          variant="outlined"
          size="small"
          name="address_line"
          disabled={isLoading}
          value={formFields?.address_line}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <TextField
          className="w-full"
          label="City"
          size="small"
          name="city"
          disabled={isLoading}
          value={formFields?.city}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <TextField
          className="w-full"
          label="State"
          size="small"
          name="state"
          disabled={isLoading}
          value={formFields?.state}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <TextField
          className="w-full"
          label="Pincode"
          size="small"
          name="pincode"
          disabled={isLoading}
          value={formFields?.pincode}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <TextField
          className="w-full"
          label="Country"
          size="small"
          name="country"
          disabled={isLoading}
          value={formFields?.country}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <TextField
          className="w-full"
          label="Landmark"
          size="small"
          name="landmark"
          disabled={isLoading}
          value={formFields?.landmark}
          onChange={onChangeInput}
        />
      </div>
      <div className="col w-full ">
        <PhoneInput
          disabled={isLoading}
          defaultCountry="VN"
          placeholder="Enter phone number"
          value={phone}
          onChange={onChangePhoneNumber}
        />
      </div>

      <div className="col w-full">
        <FormControl>
          <FormLabel>Address Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="addressType"
            value={addressType}
            onChange={handlChangeAddressType}
            className="gap-5"
          >
            <FormControlLabel value={"Home"} control={<Radio />} label="Home" />
            <FormControlLabel
              value={"Office"}
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="col w-full ">
        {/* <Select
          value={status}
          onChange={handleChangeStatus}
          // displayEmpty
          // inputProps={{ "aria-label": "Without label" }}
          size="small"
          className="w-full "
          disabled={isLoading}
        > */}
        <TextField
          value={status}
          onChange={handleChangeStatus}
          select //tell textfields to render select
          label={"Status"}
          className="w-full "
          disabled={isLoading}
        >
          <MenuItem value={true}>
            <em>True</em>
          </MenuItem>
          <MenuItem value={false}>
            <em>False</em>
          </MenuItem>
        </TextField>

        {/* </Select> */}
      </div>
      <div className="flex items-center gap-5 ">
        <Button
          type="submit"
          className="btn-challe btn-lg w-full flex gap-2 items-center "
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress className="text-white " /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
