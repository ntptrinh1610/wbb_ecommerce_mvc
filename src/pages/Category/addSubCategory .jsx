import React, { useContext, useState } from "react";

import {
  Select,
  MenuItem,
  Rating,
  Button,
  CircularProgress,
} from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const AddSubCategory = () => {
  const [productCat, setProductCat] = useState();
  const [productCat2, setProductCat2] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: "",
    parentId: "",
  });
  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: "",
    parentId: "",
  });

  const context = useContext(MyContext);

  const handleChangeProductCat = (e) => {
    setProductCat(e.target.value._id);
    formFields.parentId = e.target.value._id;
    formFields.parentCatName = e.target.value.name;
  };

  const handleChangeProductCat2 = (e) => {
    setProductCat2(e.target.value._id);
    formFields2.parentId = e.target.value._id;
    formFields2.parentCatName = e.target.value.name;
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
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }

    if (productCat === "") {
      context.openAlertBox("error", "Please select category parent");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res.message);
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      } else {
        context.openAlertBox("error", res.message);
        setIsLoading(false);
      }
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (formFields2.name === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading2(false);
      return false;
    }

    if (productCat2 === "") {
      context.openAlertBox("error", "Please select category parent");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res.message);
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      } else {
        context.openAlertBox("error", res.message);
        setIsLoading2(false);
      }
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50 md:grid-cols-2 grid grid-cols-1 gap-10 ">
        <form onSubmit={handleSubmit} className="form p-1 md:py-3 md:px-8 ">
          <h4 className="font-[600] ">Add Third Level Category </h4>

          <div className="scroll max-h-[72vh] overflow-y-scroll py-4 ">
            <div className="grid-cols-1 mb-3 gap-5 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Category Name
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  // value={productCat}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.length !== 0 &&
                    context?.catData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <div className="col">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  Sub Category Name
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  // value={formFields?.name}
                  name="name"
                  disabled={isLoading}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="w-[250px]">
            <Button
              type="submit"
              className="btn-blue btn-lg w-full flex gap-2 "
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <>
                  <FaFileUpload className="text-[25px] text-white " /> Save
                </>
              )}
            </Button>
          </div>
        </form>

        <form onSubmit={handleSubmit2} className="form p-1 md:py-1 md:px-8 ">
          <h4 className="font-[600] ">Add Third Level Category </h4>
          <div className="scroll max-h-[72vh] overflow-y-scroll py-4">
            <div className="grid grid-cols-1 mb-3 gap-5 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Sub Category Name
                </h3>
                <Select
                  labelId="demo-simple-select-label2"
                  // value={productCat}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductCat2}
                >
                  {context?.catData?.length !== 0 &&
                    context?.catData?.map((item) => {
                      return (
                        item?.children?.length !== 0 &&
                        item?.children?.map((item2, index) => {
                          console.log(item2);
                          return (
                            <MenuItem
                              key={index}
                              // value={item2?._id}
                              value={item2}
                            >
                              {item2?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })}
                </Select>
              </div>
              <div className="col">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  Third Level Category Name
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  // value={formFields?.name}
                  name="name"
                  disabled={isLoading2}
                  onChange={onChangeInput2}
                />
              </div>
            </div>
          </div>
          <div className="w-[250px]">
            <Button
              type="submit"
              className="btn-blue btn-lg w-full flex gap-2 "
            >
              {isLoading2 ? (
                <CircularProgress color="inherit" />
              ) : (
                <>
                  <FaFileUpload className="text-[25px] text-white " /> Save
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddSubCategory;
