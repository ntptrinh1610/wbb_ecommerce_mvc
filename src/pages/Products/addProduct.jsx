import React, { useContext, useEffect, useState } from "react";

import {
  Select,
  MenuItem,
  Rating,
  Button,
  CircularProgress,
  Switch,
} from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImage, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    // category: "",
    subCatId: "",
    subCat: "",
    thirdSubCat: "",
    thirdSubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
    bannerTitleName: "",
    bannerImages: [],
    isDisplayOnHomeBanner: false,
  });
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdCat, setProductThirdCat] = useState("");
  const [productIsFeatured, setProductIsFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productRamData, setProductRamData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);
  const [checkedSwitch, setCheckedSwitch] = useState(false);

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi(`/api/product/getAllProductRams`).then((res) => {
      if (!res?.error) {
        setProductRamData(res?.data);
      }
    });
    fetchDataFromApi(`/api/product/getAllProductWeight`).then((res) => {
      if (!res?.error) {
        setProductWeightData(res?.data);
      }
    });
    fetchDataFromApi(`/api/product/getAllProductSize`).then((res) => {
      if (!res?.error) {
        setProductSizeData(res?.data);
      }
    });
  }, []);

  const setPreviewsFun = (previewsArr) => {
    // prevent mutation
    const newPreviews = [...previews, ...previewsArr];
    setPreviews(newPreviews);
    formFields.images = newPreviews;
  };

  // const setPreviewsFun = (previewsArr) => {
  //   const imgArr = previews;
  //   for (let i = 0; i < previewsArr.length; i++) {
  //     imgArr.push(previewsArr[i]);
  //   }
  //   setPreviews([]);
  //   setTimeout(()=>{
  //     setPreviews(imgArr);
  //     formFields.images=imgArr;
  //   },10)
  // };

  const setBannerImagesFun = (previewsArr) => {
    // prevent mutation
    const newPreviews = [...bannerPreviews, ...previewsArr];
    setBannerPreviews(newPreviews);
    formFields.bannerImages = newPreviews;
  };

  const handleChangeSwitch = (e) => {
    setCheckedSwitch(e.target.checked);
    formFields.isDisplayOnHomeBanner = e.target.checked;
  };

  const removeImg = (img, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImage(`/api/product/deleteImage?img=${img}`).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res?.message);
        const updateImgArr = imageArr.filter((_, i) => i !== index);
        setPreviews(updateImgArr);
        setFormFields(() => ({
          ...previews,
          images: updateImgArr,
        }));
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };
  const removeBannerImg = (img, index) => {
    var imageArr = [];
    imageArr = bannerPreviews;
    deleteImage(`/api/product/deleteImage?img=${img}`).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res?.message);
        const updateImgArr = imageArr.filter((_, i) => i !== index);
        setBannerPreviews(updateImgArr);
        setFormFields(() => ({
          ...previews,
          bannerImages: updateImgArr,
        }));
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  const handleChangeProductCat = (e) => {
    setProductCat(e.target.value);
    formFields.catId = e.target.value;

    // formFields.category=e.target.value._id;

    formFields.catName = context?.catData.find(
      (item) => item._id === e.target.value
    )?.name;
  };
  const handleChangeProductSubCat = (e) => {
    setProductSubCat(e.target.value);
    formFields.subCatId = e.target.value;

    // returns the first parent that contains the child.
    // context?.catData.find((cat) =>
    //   cat.children.some((child) => child._id === e.target.value))

    const selectedItem = context?.catData
      .flatMap((cat) => cat.children) // flatten all children into one array
      .find((item) => item._id === e.target.value);
    formFields.subCat = selectedItem.name;
  };
  const handleChangeProductThirdLvCat = (e) => {
    setProductThirdCat(e.target.value);
    formFields.thirdSubCatId = e.target.value;

    const selectedItem = context?.catData
      .flatMap((cat) => cat.children)
      .flatMap((thirdCat) => thirdCat.children)
      .find((item) => item._id === e.target.value);
    formFields.thirdSubCat = selectedItem.name;
  };

  const handleChangeProductIsFeatured = (event) => {
    setProductIsFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };
  const handleChangeProductRams = (event) => {
    // const value = event.target.value; is the same
    const {
      target: { value },
    } = event;

    setProductRams(
      // On autofill and get a stringified value
      typeof value === "string" && value !== "" ? value.split(",") : value
    );

    formFields.productRam = value.filter((val) => val !== "");
  };
  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;

    setProductWeight(
      // On autofill and get a stringified value
      typeof value === "string" ? value.split(",") : value
    );

    formFields.productWeight = value.filter((val) => val !== "");
  };
  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;

    setProductSize(
      // On autofill and get a stringified value
      typeof value === "string" ? value.split(",") : value
    );

    formFields.size = value.filter((val) => val !== "");
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    console.log(formFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formFields);

    if (formFields?.name === "") {
      context.openAlertBox("error", "Please enter product name");
      setIsLoading(false);
      return false;
    }

    if (formFields?.description === "") {
      context.openAlertBox("error", "Please enter product description");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      context.openAlertBox("error", "Please upload product image");
      setIsLoading(false);
      return false;
    }

    if (formFields?.brand === "") {
      context.openAlertBox("error", "Please enter product brand");
      setIsLoading(false);
      return false;
    }

    if (formFields?.price === "") {
      context.openAlertBox("error", "Please enter product price");
      setIsLoading(false);
      return false;
    }

    if (formFields?.oldPrice === "") {
      context.openAlertBox("error", "Please enter product oldPrice");
      setIsLoading(false);
      return false;
    }

    if (formFields?.catId === "") {
      context.openAlertBox("error", "Please select category (id) ");
      setIsLoading(false);
      return false;
    }

    if (formFields?.catName === "") {
      context.openAlertBox("error", "Please select category (name) ");
      setIsLoading(false);
      return false;
    }

    if (formFields?.countInStock === "") {
      context.openAlertBox("error", "Please enter product stock ");
      setIsLoading(false);
      return false;
    }
    if (formFields?.discount === "") {
      context.openAlertBox("error", "Please enter discount");
      setIsLoading(false);
      return false;
    }

    if (formFields?.rating === "") {
      context.openAlertBox("error", "Please rating");
      setIsLoading(false);
      return false;
    }

    postData("/api/product/create", formFields).then((res) => {
      if (!res?.error) {
        context.openAlertBox("success", res?.message);
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        history("/products");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form className="form py-3 px-8 " onSubmit={handleSubmit}>
          <div className="scroll max-h-[72vh] overflow-y-scroll ">
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Name
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="name"
                  value={formFields.name}
                  onChange={onChangeInput}
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
                  name="description"
                  value={formFields.description}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Category
                </h3>
                {context?.catData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productCat}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    onChange={handleChangeProductCat}
                  >
                    {context?.catData?.map((cat, index) => {
                      return (
                        <MenuItem key={index} value={cat?._id}>
                          {cat?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Sub Category
                </h3>
                {context?.catData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productSubCat}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    onChange={handleChangeProductSubCat}
                  >
                    {context?.catData?.map((cat) => {
                      return (
                        cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index) => {
                          return (
                            <MenuItem key={index} value={subCat._id}>
                              {subCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Third Level Category
                </h3>
                {context?.catData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productThirdCat}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    onChange={handleChangeProductThirdLvCat}
                  >
                    {context?.catData?.map((cat) => {
                      return (
                        cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat) => {
                          return (
                            subCat?.children?.length !== 0 &&
                            subCat?.children?.map((thirdCatlv, index) => {
                              return (
                                <MenuItem key={index} value={thirdCatlv._id}>
                                  {thirdCatlv?.name}
                                </MenuItem>
                              );
                            })
                          );
                        })
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Price
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="price"
                  value={formFields.price}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Old Price
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="oldPrice"
                  value={formFields.oldPrice}
                  onChange={onChangeInput}
                />
              </div>
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
                  name="countInStock"
                  value={formFields.countInStock}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Brand
                </h3>
                <input
                  type="text"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="brand"
                  value={formFields.brand}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-3 gap-4 ">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Discount
                </h3>
                <input
                  type="number"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="discount"
                  value={formFields.discount}
                  onChange={onChangeInput}
                />
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product RAMS
                </h3>
                {productRamData?.length !== 0 && (
                  <Select
                    multiple
                    labelId="demo-simple-select-label"
                    id="isfeaturedDrop"
                    value={productRams}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    // label="Category"
                    onChange={handleChangeProductRams}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {productRamData?.map((item, index) => {
                      return (
                        <MenuItem value={item?.name} key={index}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Weight
                </h3>
                {productWeightData?.length !== 0 && (
                  <Select
                    multiple
                    labelId="demo-simple-select-label"
                    id="isfeaturedDrop"
                    value={productWeight}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    // label="Category"
                    onChange={handleChangeProductWeight}
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    {productWeightData?.map((item, index) => {
                      return (
                        <MenuItem value={item?.name} key={index}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1 text-black ">
                  Product Size
                </h3>
                {productSizeData?.length !== 0 && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="isfeaturedDrop"
                    value={productSize}
                    size="small"
                    className="w-full bg-[#fafafa]"
                    // label="Category"
                    onChange={handleChangeProductSize}
                    multiple
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    {productSizeData?.map((item, index) => {
                      return (
                        <MenuItem value={item.name} key={index}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </div>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black ">
                Product Rating
              </h3>
              <Rating
                name="rating"
                value={formFields.rating}
                onChange={onChangeInput}
                precision={0.5}
              />
            </div>
            <div className="col w-full py-5 px-0 ">
              <h3 className="font-[700] text-[18px] mb-3 ">Media & Images</h3>
              <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 ">
                {previews?.length !== 0 &&
                  previews?.map((img, index) => {
                    return (
                      <div key={index} className="uploadBoxWrapper relative">
                        <span
                          onClick={() => removeImg(img, index)}
                          className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer "
                        >
                          <IoClose className="text-white text-[17px] " />
                        </span>
                        <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative ">
                          <LazyLoadImage
                            alt="image"
                            className="w-full h-full object-cover"
                            wrapperProps={{
                              style: { transitionDelay: "1s" },
                            }}
                            src={img}
                          />
                        </div>
                      </div>
                    );
                  })}
                <UploadBox
                  name="images"
                  url="/api/product/uploadImages"
                  multiple={true}
                  setPreviewsFun={setPreviewsFun}
                />
              </div>
            </div>
            <div className="col w-full py-5 px-0 ">
              <div className="shadow-md bg-white w-full">
                <div className="flex items-center gap-8 ">
                  <h3 className="font-[700] text-[18px] mb-3 ">
                    Banner Images
                  </h3>
                  <Switch
                    checked={checkedSwitch}
                    onChange={handleChangeSwitch}
                  />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 ">
                  {bannerPreviews?.length !== 0 &&
                    bannerPreviews?.map((img, index) => {
                      return (
                        <div key={index} className="uploadBoxWrapper relative">
                          <span
                            onClick={() => removeBannerImg(img, index)}
                            className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer "
                          >
                            <IoClose className="text-white text-[17px] " />
                          </span>
                          <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative ">
                            <LazyLoadImage
                              alt="image"
                              className="w-full h-full object-cover"
                              wrapperProps={{
                                style: { transitionDelay: "1s" },
                              }}
                              src={img}
                            />
                          </div>
                        </div>
                      );
                    })}
                  <UploadBox
                    name="bannerImages"
                    url="/api/product/uploadBannerImages"
                    multiple={true}
                    setPreviewsFun={setBannerImagesFun}
                  />
                </div>

                <h3 className="mt-8 text-[18px] font-[700] mb-1 text-black ">
                  Banner Title Name
                </h3>
                <input
                  type="text"
                  className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="bannerTitleName"
                  value={formFields.bannerTitleName}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <br />
          <hr />
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2 ">
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaFileUpload className="text-[25px] text-white " /> Save
              </>
            )}
          </Button>
        </form>
      </section>
    </>
  );
};

export default AddProduct;
