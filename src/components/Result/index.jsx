import React, { useContext } from "react";

import successImg from "../../assets/success.png";
import failImg from "../../assets/fail.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { MyContext } from "../../App";

const Result = (props) => {
  const context = useContext(MyContext);

  return (
    <div className="items-center flex justify-center ">
      <div className="bg-white w-full lg:w-[80%] h-[500px] flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center p-5 ">
          <img src={ props.status ? successImg : failImg } alt="image" className="w-[100px] lg:w-[200px] " />
          <h3 className="m-5 text-[20px] text-center lg:text-[30px] ">
            {/* {props?.message} */}
            You have paid successfully!
          </h3>
          <Link to={"/"}>
            <Button
              className="btn-lg btn-challe"
              onClick={() => context?.toggleCartPanel(false, {})}
            >
              Go Back Home
            </Button>
          </Link>
        </div>
        {props.status ? <div></div> : <div></div>}
      </div>
    </div>
  );
};

export default Result;
