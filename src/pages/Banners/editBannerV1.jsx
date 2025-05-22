import React, { useContext, useEffect, useState } from "react";

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
import {
  deleteDataFromApi,
  deleteImage,
  fetchDataFromApi,
  postData,
  updateDataFromApi,
} from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const EditBannerV1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    catId: "",
    subCatId: "",
    thirdSubCatId: "",
    bannerTitle: "",
    price: "",
    alignInfo: "",
    images: [],
  });
  const [productCat, setProductCat] = useState([]);
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdCat, setProductThirdCat] = useState("");
  const [alignInfor, setAlignInfor] = useState("");

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;
    console.log(id);
    fetchDataFromApi(`/api/bannerV1/${id}`).then((res) => {
      console.log(res);
      setFormFields({
        bannerTitle: res?.data?.bannerTitle,
        images: res?.data?.images,
        price: res?.data?.price,
        catId: res?.data?.catId,
        subCatId: res?.data?.subCatId,
        thirdSubCatId: res?.data?.thirdSubCatId,
        alignInfo: res?.data?.alignInfo,
      });
      setProductCat(res?.data?.catId);
      setProductSubCat(res?.data?.subCatId);
      setProductThirdCat(res?.data?.thirdSubCatId);
      setPreviews(res?.data?.images);
      setAlignInfor(res?.data?.alignInfo);
    });
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChangeCat = (e) => {
    setProductCat(e.target.value);
    formFields.catId = e.target.value;
  };

  const handleChangeSubCat = (e) => {
    setProductSubCat(e.target.value);
    formFields.subCatId = e.target.value;
  };
  const handleChangeThirdLvCat = (e) => {
    setProductThirdCat(e.target.value);
    formFields.thirdSubCatId = e.target.value;
  };

  const handleChangeAlignInfo = (e) => {
    setAlignInfor(e.target.value);
    formFields.alignInfo = e.target.value;
  };

  const setPreviewsFun = (previewsArr) => {
    const newPreviews = [...previews, ...previewsArr];
    setPreviews(newPreviews);
    formFields.images = newPreviews;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImage(`/api/bannerV1/deleteImage?img=${image}`).then((res) => {
      const updatedArr = imageArr.filter((_, i) => i !== index);
      setPreviews(updatedArr);
      setFormFields(() => ({
        ...previews,
        images: updatedArr,
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.bannerTitle === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }
    if (formFields.catId === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }
    if (formFields.price === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select category image");
      setIsLoading(false);
      return false;
    }

    console.log(formFields);

    updateDataFromApi(
      `/api/bannerV1/${context?.isOpenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res.message);
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        // history("/category/list");
      } else {
        context.openAlertBox("error", res.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50 ">
      <form className="form p-1 md:px-8 md:py-1 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 mb-3 gap-5 ">
            <div className="col">
              <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                Banner Title
              </h3>
              <input
                type="text"
                className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="bannerTitle"
                onChange={onChangeInput}
                disabled={isLoading}
                value={formFields.bannerTitle}
              />
            </div>
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
                  onChange={handleChangeCat}
                  name="catId"
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
              <h3 className="text-[14px] font-[500] mb-1 text-black ">Align</h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  value={alignInfor}
                  size="small"
                  className="w-full bg-[#fafafa]"
                  onChange={handleChangeAlignInfo}
                  name="catId"
                >
                  <MenuItem value={"left"}>Left</MenuItem>
                  <MenuItem value={"right"}>Right</MenuItem>
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
                  onChange={handleChangeSubCat}
                  name="subCatId"
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
                  onChange={handleChangeThirdLvCat}
                  name="thirdSubCatId"
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
              <h3 className="text-[14px] font-[500] mb-1 text-black ">Price</h3>
              <input
                type="number"
                className="bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <h3 className="text-[18px] font-[500] mb-1 text-black ">
            Banner Images
          </h3>
          <br />
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 ">
            {previews?.length !== 0 &&
              previews?.map((image, index) => {
                return (
                  <div key={index} className="uploadBoxWrapper relative">
                    <span
                      onClick={() => removeImg(image, index)}
                      className="absolute w-[25px] h-[25px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer "
                    >
                      <IoClose className="text-white text-[17px] " />
                    </span>
                    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative ">
                      {/* <LazyLoadImage
                          alt="image"
                          className="w-full h-full object-cover"
                          wrapperProps={{
                            style: { transitionDelay: "1s" },
                          }}
                          src={image}
                        /> */}
                      <img src={image} alt="image" />
                    </div>
                  </div>
                );
              })}
            <UploadBox
              multiple={true}
              name="images"
              url="/api/bannerV1/uploadImages"
              setPreviewsFun={setPreviewsFun}
            />
          </div>
        </div>
        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2 ">
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
    </section>
  );
};

export default EditBannerV1;
