import React, { useContext, useState } from "react";

import { FaImages } from "react-icons/fa";
import { MyContext } from "../../App";
import { updateImageFromApi, uploadImageFromApi } from "../../utils/api";
import { CircularProgress } from "@mui/material";

const UploadBox = (props) => {
  const [uploading, setUpLoading] = useState(false);

  let selectedImgs = [];

  const formdata = new FormData();
  const context = useContext(MyContext);

  const onChangeFile = async (e, apiEp) => {
    try {
      setUpLoading(true);
      props.setPreviewsFun([]);
      const files = e.target.files;
      setUpLoading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImgs.push(file);
          formdata.append(props.name, file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG or WEBP image file "
          );
          setUpLoading(false);
          return false;
        }
      }
      uploadImageFromApi(apiEp, formdata).then((res) => {
        setUpLoading(false);
        props.setPreviewsFun(res?.images);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative ">
        {uploading ? (
          <>
            Uploading...
            <br />
            <CircularProgress color="inherit" />
          </>
      ) : (
          <>
            <FaImages className="text-[40px] opacity-35 pointer-events-none " />
            <h4 className="text-[14px] pointer-events-none ">Image Upload</h4>

            <input
              type="file"
              multiple={props.multiple !== undefined ? props.multiple : false}
              className="absolute top-0 left-0 w-full h-full z-50 opacity-0 "
              onChange={(e) => {
                onChangeFile(e, props.url);
              }}
              name={props.name}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UploadBox;
