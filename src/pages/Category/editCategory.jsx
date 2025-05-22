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
  deleteImage,
  fetchDataFromApi,
  postData,
  updateDataFromApi,
} from "../../utils/api";
import { MyContext } from "../../App";

const EditCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const context = useContext(MyContext);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      formFields.name = res?.category?.name;
      setPreviews(res?.category?.images);
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
    formFields.images = previews;
  };

  const setPreviewsFun = (previewsArr) => {
    const newPreviews = [...previews, ...previewsArr];
    setPreviews(newPreviews);
    formFields.images = newPreviews;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImage(`/api/category/deleteImage?img=${image}`).then((res) => {
      // imageArr.splice(index,1);
      // setPreviews([]);
      // setTimeout(()=>{
      //   setPreviews(imageArr);
      // },100)
      const updatedArr = imageArr.filter((_, i) => i !== index);
      setPreviews(updatedArr);
      setFormFields(() => ({
        ...previews,
        images: updatedArr,
      }));
      console.log(previews);
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

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select category image");
      setIsLoading(false);
      return false;
    }

    updateDataFromApi(
      `/api/category/${context?.isOpenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
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

  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form onSubmit={handleSubmit} className="form p-1 md:py-3 md:px-8 ">
          <div className="scroll max-h-[72vh] overflow-y-scroll p-4 ">
            <div className="grid grid-cols-1 mb-3 ">
              <div className="col">
                <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                  Category Name
                </h3>
                <input
                  type="text"
                  className=" bg-[#fafafa] w-[300px] h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                  name="name"
                  onChange={onChangeInput}
                  disabled={isLoading}
                  value={formFields.name}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
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
                url="/api/category/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>
          <br />
          <br />
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
      </section>
    </>
  );
};

export default EditCategory;
