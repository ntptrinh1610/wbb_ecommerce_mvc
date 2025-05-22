import React, { useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import { Button } from "@mui/material";

const QuantityBox = (props) => {
  const [qutyVal, setQtyVal] = useState(props?.quantity ? props?.quantity : 1);

  const plusQty = () => {
    setQtyVal(qutyVal + 1);
    props?.handleSelectQty(qutyVal + 1);
  };
  const minusQty = () => {
    if (qutyVal === 1) {
      setQtyVal(1);
      props?.handleSelectQty(1);
    } else {
      setQtyVal(qutyVal - 1);
      props?.handleSelectQty(qutyVal - 1);
    }
  };
  return (
    <>
      <div className="qtyBox flex items-center relative">
        <input
          type="number"
          className="w-full h-[45px] px-2 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md"
          value={qutyVal}
          name="quantity"
          onChange={() => {
            props?.handleChangeQuantity() &&
              props?.handleChangeQuantity(qutyVal);
          }}
        />

        <div className="flex items-center flex-col justify-between h-full absolute top-0 right-0 z-50">
          <Button
            onClick={plusQty}
            className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
          >
            <FaAngleUp className="text-[12px] opacity-55" />
          </Button>
          <Button
            onClick={minusQty}
            className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
          >
            <FaAngleDown className="text-[12px] opacity-55" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuantityBox;
