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
  Menu,
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

const AddressBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);

  const handleModifyAddress = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseModifyAddress = () => {
    setAnchorEl(null);
  };

  const removeAddress = (id) => {
    setAnchorEl(null);
    props?.removeAddress(id);
  };

  const editAddress = (e, id) => {
    setAnchorEl(null);
    context?.toggleAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
    // props?.editAddress(e, id);
  };

  return (
    <div className="group relative border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full bg-[#fafafa] p-4 rounded-md cursor-pointer ">
      <span className="inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm ">
        {props?.address?.addressType}
      </span>
      <h4 className="pt-2 flex items-center gap-4 text-[14px]">
        {" "}
        <span>{context?.userData?.name}</span>
        <span>{props?.address?.mobile}</span>
      </h4>
      <span className="pt-0 text-[13px] block w-100 ">
        {props?.address?.address_line +
          ", " +
          props?.address?.city +
          ", " +
          props?.address?.country +
          ", " +
          props?.address?.state +
          ", "}
        {props?.address?.landmark && props?.address?.landmark + ", "}
        {props?.address?.pincode + ", " + props?.address?.mobile}
      </span>
      <div className="absolute top-[20px] right-[20px]">
        <IconButton
          aria-label="more"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleModifyAddress}
        >
          <MdMoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseModifyAddress}
          slotProps={{
            paper: {
              style: {
                maxHeight: `${48 * 4.5}`,
                width: "20ch",
              },
            },
          }}
        >
          <MenuItem onClick={(e) => editAddress(e, props?.address?._id)}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => removeAddress(props?.address?._id)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AddressBox;
