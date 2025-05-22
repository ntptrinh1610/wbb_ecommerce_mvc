import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { deleteDataFromApi, updateDataFromApi } from "../../utils/api";

const EditSubCatBox = (props) => {
  const [selectVal, setSelectVal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState();
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: "",
    parentId: "",
  });

  const context = useContext(MyContext);

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentCatName = props?.parentCatName;
    formFields.parentId = props?.parentId;
    setSelectVal(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectVal;
    setSelectVal(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChange = (e) => {
    setSelectVal(e.target.value);
    formFields.parentId = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter category name");
      setIsLoading(false);
      return false;
    }

    updateDataFromApi(`/api/category/${props?.id}`, formFields).then((res) => {
      if (!res.error) {
        console.log(res);

        context.openAlertBox("success", res?.message);
        setIsLoading(false);
        context?.getCat();
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const deleteCat = (id) => {
    deleteDataFromApi(`/api/category/delete/${id}`).then((res) => {
      if (!res.error) {
        context.openAlertBox("success", res?.message);
        context?.getCat();
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <form
        className="w-full flex items-center gap-3 p-0 px-4"
        onSubmit={handleSubmit}
      >
        {!editMode ? (
          <>
            <span className="font-[500] text-[14px] ">{props?.name}</span>
            <div className="flex items-center gap-4 ml-auto">
              <Button
                onClick={() => {
                  setEditMode(true);
                }}
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black "
              >
                <FaEdit />
              </Button>
              <Button
                onClick={() => deleteCat(props.id)}
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black "
              >
                <FaTrashAlt />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 justify-between py-2  whitespace-nowrap overflow-x-scroll ">
              <div className="w-[180px] md:w-[150px] ">
                <Select
                  style={{ zoom: "75%" }}
                  className="w-full"
                  size="small"
                  value={selectVal}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {props?.catData?.length !== 0 &&
                    props?.catData?.map((item, index) => {
                      return (
                        <MenuItem
                          value={item?._id}
                          key={index}
                          onClick={() => {
                            formFields.parentCatName = item?.name;
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <input
                type="text"
                className="md:w-full w-[150px] h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
                name="name"
                value={formFields?.name}
                onChange={onChangeInput}
              />
              <div className="flex items-center gap-2 ">
                <Button
                  size="small"
                  className="btn-sml"
                  type="submit"
                  variant="contained"
                >
                  {isLoading ? <CircularProgress color="inherit" /> : <>Edit</>}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EditSubCatBox;
