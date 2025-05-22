import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Pagination,
  Tooltip as TooltipMUI,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { MyContext } from "../../App";
import {
  deleteDataFromApi,
  fetchDataFromApi,
  postData,
  updateDataFromApi,
} from "../../utils/api";

const label = { inputProps: { "aria-label": "Check demo" } };

const AddRams = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
  });

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductRams`).then((res) => {
      console.log(res);
      if (!res?.error) {
        setData(res?.data);
        setIsLoading(false);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "") {
      context.openAlertBox("error", "Please enter product ram name!");
      return false;
    }

    if (editId === "") {
      postData(`/api/product/productRams/create`, {
        name: name,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          setIsLoading(false);
          getData();
          setName("");
        } else {
          setIsLoading(false);
          context.openAlertBox("error", res?.message);
        }
      });
    } else {
      updateDataFromApi(`/api/product/productRams/${editId}`, {
        name: name,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          setIsLoading(false);
          getData();
          setName("");
          setEditId("");
        } else {
          setIsLoading(false);
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };

  const updateData = (id) => {
    fetchDataFromApi(`/api/product/productRams/${id}`).then((res) => {
      if (!res?.error) {
        context.openAlertBox("success", res?.message);
        console.log(res?.data);
        setName(res?.data?.name);
        setEditId(res?.data?._id);
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  const deleteData = (id) => {
    deleteDataFromApi(`/api/product/productRams/${id}`).then((res) => {
      if (!res?.error) {
        getData();
        context.openAlertBox("success", "Product Ram Deleted");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 mt-3 ">
        <h2 className="text-[18px] font-[600] ">Add Product Rams</h2>
        <span className="font-[400px] text-[14px] "></span>
      </div>{" "}
      <div className="w-full lg:w-[65%] card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white ">
        <form className="form py-3 px-6 " onSubmit={handleSubmit}>
          <div className="col mb-4 ">
            <h3 className="text-[14px] font-[500] mb-1 text-black ">
              PRODUCT RAM
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm "
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2 ">
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white " />
                Save
              </>
            )}
          </Button>
        </form>
      </div>
      <div className=" w-full lg:w-[65%] card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white ">
        <div className="relative overflow-x-auto mt-5 pb-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3" width={"10%"}>
                  <div className="w-[60px] ">
                    <Checkbox size="small" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap"
                  width="60%"
                >
                  Product Ram
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap"
                  width="30%"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td className="px-6 pr-0 pl-3">
                      <div className="w-[60px]">
                        <Checkbox size="small" />
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <span className="font-[600] ">{item?.name}</span>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit product" placement="top">
                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                            style={{ minWidth: "35px" }}
                            onClick={() => updateData(item?._id)}
                          >
                            <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                          </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove product" placement="top">
                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.2)] !rounded-full hover:!bg-[#ccc]"
                            style={{ minWidth: "35px" }}
                            onClick={() => deleteData(item?._id)}
                          >
                            <FaTrashAlt className="text-[rgba(0,0,0,0.7)] text-[20px] " />
                          </Button>
                        </TooltipMUI>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddRams;
