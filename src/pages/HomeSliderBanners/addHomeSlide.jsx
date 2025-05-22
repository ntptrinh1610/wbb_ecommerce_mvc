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
import { deleteImage, postData } from "../../utils/api";

const AddHomeSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const setPreviewsFun = (previewsArr) => {
    const newPreviews = [...previews, ...previewsArr];
    setPreviews(newPreviews);
    formFields.images = newPreviews;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImage(`/api/homeSlider/deleteImage?img=${image}`).then((res) => {
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

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select image");
      setIsLoading(false);
      return false;
    }

    postData(`/api/homeSlider/create`, formFields).then((res) => {
      if (!res?.error) {
        setIsLoading(false);
        context?.setIsOpenFullScreenPanel({
          open: false,
        });
      }
    });
  };
  return (
    <>
      <section className="p-5 bg-gray-50 ">
        <form className="form p-1 md:py-3 md:px-8 " onSubmit={handleSubmit}>
          <div className="scroll max-h-[72vh] overflow-y-scroll p-4 ">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
              {previews?.length !== 0 &&
                previews.map((img, index) => {
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
                multiple={true}
                name="images"
                url="/api/homeSlider/uploadImages"
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

export default AddHomeSlide;
