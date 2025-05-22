import React, { useState } from "react";

import { Select, MenuItem, Rating, Button } from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";


const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productIsFeatured, setProductIsFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductIsFeatured = (event) => {
    setProductIsFeatured(event.target.value);
  };
  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
  };
  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form className="form py-3 px-8 ">
          <div className="scroll max-h-[72vh] overflow-y-scroll ">
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Name
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Description
                </h3>
                <textarea
                  type="text"
                  className="bg-[#fafafa] w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Category
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productCat}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductCat}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value={10}>Fashion</MenuItem>
                  <MenuItem value={20}>PackBag</MenuItem>
                  <MenuItem value={30}>Keychain</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Sub Category
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={productSubCat}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value={10}>Fashion</MenuItem>
                  <MenuItem value={20}>PackBag</MenuItem>
                  <MenuItem value={30}>Keychain</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Price
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Old Price
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Is Featured
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="isfeaturedDrop"
                  value={productIsFeatured}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductIsFeatured}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Stock
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Brand
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Discount
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product RAMS
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="isfeaturedDrop"
                  value={productRams}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductRams}
                >
                  <MenuItem value={"4GB"}>4GB</MenuItem>
                  <MenuItem value={"6GB"}>6GB</MenuItem>
                  <MenuItem value={"8GB"}>8GB</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Weight
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="isfeaturedDrop"
                  value={productWeight}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductWeight}
                >
                  <MenuItem value={"4GB"}>None</MenuItem>
                  <MenuItem value={"4GB"}>2KG</MenuItem>
                  <MenuItem value={"6GB"}>4KG</MenuItem>
                  <MenuItem value={"8GB"}>5KG</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Size
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="isfeaturedDrop"
                  value={productSize}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  // label="Category"
                  onChange={handleChangeProductSize}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"S"}>S</MenuItem>
                  <MenuItem value={"M"}>M</MenuItem>
                  <MenuItem value={"L"}>L</MenuItem>
                </Select>
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Rating
                </h3>
                <Rating name="half-rating" defaultValue={5} precision={0.5} />
              </div>
            </div>
            <div className="col w-full py-5 px-0 ">
              <h3 className="font-[700] text-[18px] mb-3 ">Media & Images</h3>
              <div className="grid grid-cols-7 gap-2 ">
                <div className="uploadBoxWrapper relative">
                  <span className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer ">
                    <IoClose className="text-white text-[17px] " />
                  </span>
                  <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative ">
                    <LazyLoadImage
                      alt="image"
                      className="w-full h-full object-cover"
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                      src={
                        "data:image/jpeg;base64,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"
                      }
                    />
                  </div>
                </div>
                <UploadBox multiple={true} />
              </div>
            </div>
          </div>
          <br />
          <hr />
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2 ">
            <FaFileUpload className="text-[25px] text-white " /> Publish and View
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddProduct;
