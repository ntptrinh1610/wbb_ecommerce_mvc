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
import {
  deleteDataFromApi,
  deleteImage,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";

const AddBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    description: "",
    title: "",
    images: [],
  });
  const [html, setHtml] = useState("");

  function onChange(e) {
    setHtml(e.target.value);
  }

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeDescription=(e)=>{
    setHtml(e.target.value);
    formFields.description=e.target.value
  }

  const setPreviewsFun = (previewsArr) => {
    const newPreviews = [...previews, ...previewsArr];
    setPreviews(newPreviews);
    formFields.images = newPreviews;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImage(`/api/blog/deleteImage?img=${image}`).then((res) => {
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

    if (formFields.title === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter category name!");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select category image");
      setIsLoading(false);
      return false;
    }

    postData("/api/blog/create", formFields).then((res) => {
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
                Blog Title
              </h3>
              <input
                type="text"
                className=" bg-[#fafafa] w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="title"
                onChange={onChangeInput}
                disabled={isLoading}
                value={formFields.title}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3 gap-5 ">
            <div className="col">
              <h3 className=" text-[14px] font-[500] mb-1 text-black ">
                Description
              </h3>
              <Editor
                containerProps={{ style: { resize: "vertical" } }}
                value={html}
                onChange={onChangeDescription}
              />
            </div>
          </div>
          <h3 className="text-[18px] font-[500] mb-1 text-black ">
            Blog Images
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
              url="/api/blog/uploadImages"
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

export default AddBlog;
