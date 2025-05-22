import React, { useContext, useState } from "react";
import verify from "../../assets/verified.png";
import OtpBox from "../../components/OtpBox";
import { Button, CircularProgress } from "@mui/material";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useNavigate();
  const context = useContext(MyContext);

  const email = localStorage.getItem("userEmail");
    
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const actionType = localStorage.getItem("actionType");
    
    setIsLoading(true);
    if (actionType !== "forgot-password") {
      postData("/api/user/verifyEmail", {
        email: email,
        otp: otp,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          localStorage.removeItem("userEmail");
          history("/login");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
      setIsLoading(false);
    } else {
      postData("/api/user/verify-forgot-password-otp", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          history("/forgot-password");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white py-5 px-10 ">
            <div className="text-center flex items-center justify-center">
              <img src={verify} width={"80px"} />
            </div>
            <h3 className="text-center text-[18px] text-black mt-4 mb-1">
              Verify OTP
            </h3>
            <p className="text-center mt-0">
              OTP send to{" "}
              <span className="text-mocha-mousse font-bold">{email}</span>
            </p>
            <form onSubmit={verifyOTP}>
              <OtpBox length={6} onChange={handleOtpChange} isLoading={isLoading} />
              <div className="flex items-center justify-center mt-5 px-3">
                <Button type="submit" className="w-full btn-challe btn-lg">
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;
