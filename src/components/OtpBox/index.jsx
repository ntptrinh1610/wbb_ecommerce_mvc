import React, { useState } from "react";

const OtpBox = ({ length, onChange, isLoading }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const handleChange = (element, index) => {
    console.log(element);
    const value = element.value;
    // Only number allowed
    if (isNaN(value)) return;

    // update OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // focus on next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  return (
    <div
      style={{ display: "flex", gap: "5px", justifyContent: "center" }}
      className="otpBox"
    >
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          disabled={isLoading}
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] text-center text-[17px] "
        />
      ))}
    </div>
  );
};

export default OtpBox;
