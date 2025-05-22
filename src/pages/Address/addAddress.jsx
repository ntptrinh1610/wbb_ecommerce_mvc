import React, { useContext, useEffect, useState } from "react";

import { Select, MenuItem, Rating, Button } from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const AddAddress = () => {
  const context = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    formFields.userId = context?.userData?._id;
  }, [context?.userData]);

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
    userId: context?.userData?._id,
    selected:false
  });

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setFormFields({ ...formFields, status: e.target.value });
  };

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

    postData(`/api/address/add`, formFields, { withCredentials: true }).then(
      (res) => {
        if (!res?.error) {
          setIsLoading(false);
          context.openAlertBox("success", res?.message);
          context?.setIsOpenFullScreenPanel({
            open: false,
          });

          fetchDataFromApi(
            `/api/address/?userId=${context?.userData?._id}`
          ).then((res) => {
            context?.setAddress(res.data);
          });
        } else {
          setIsLoading(false);
          context.openAlertBox("error", res?.message);
        }
      }
    );
  };

  return (
    <>
      <section className="p-5 bg-gray-50">
        <form className="form py-3 p-8" onSubmit={handleSubmit}>
          <div className="scroll max-h-[72vh] overflow-y-scroll p-4 ">
            <div className="grid grid-cols-2 mb-3 gap-4 ">
              <div className="col w-full ">
                <h3 className=" w-full text-[14px] font-[500] mb-1 text-black ">
                  Address Line
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="address_line"
                  disabled={isLoading}
                  value={formFields.address_line}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col w-[100%] ">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  City
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="city"
                  disabled={isLoading}
                  value={formFields.city}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 mb-3 gap-4 ">
              <div className="col w-[100%] ">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  State
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="state"
                  disabled={isLoading}
                  value={formFields.state}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col w-[100%] ">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  Pincode
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="pincode"
                  disabled={isLoading}
                  value={formFields.pincode}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col w-[100%] ">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  Country
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="country"
                  disabled={isLoading}
                  value={formFields.country}
                  onChange={onChangeInput}
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

              <div className="col w-full ">
                <h3 className="text-[14px] font-[500] mb-1 color-black ">
                  Status
                </h3>
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  className="w-full "
                  disabled={isLoading}
                >
                  <MenuItem value={true}>
                    <em>True</em>
                  </MenuItem>
                  <MenuItem value={false}>
                    <em>False</em>
                  </MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-[250px]">
            <Button
              type="submit"
              className="btn-blue btn-lg w-full flex gap-2 "
            >
              <FaFileUpload className="text-[25px] text-white " /> Publish and
              View
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAddress;
