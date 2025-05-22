import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();
  const context = useContext(MyContext);

  const validValue = Object.values(formFields).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const authWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const fields = {
          name: user.providerData[0].displayName,
          email: user.providerData[0].email,
          password: "null",
          avatar: user.providerData[0].photoURL,
          phone: user.providerData[0].phoneNumber,
        };
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        postData(`/api/user/authWithGoogle`, fields).then((res) => {
          console.log(res);
          if (!res?.error) {
            setIsLoading(false);
            context.openAlertBox("success", res?.message);
            localStorage.setItem("userEmail", fields.email);
            localStorage.setItem("accessToken", res?.data?.accessToken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);
            setFormFields({
              name: "",
              email: "",
              password: "",
            });
            context.setIsLogin(true);
            history("/");
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email!");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password!");
      return false;
    }

    postData("/api/user/login", formFields).then((res) => {
      console.log(res);
      if (!res?.error) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          email: "",
          password: "",
        });
        localStorage.setItem("accessToken", res?.data?.accessToken);
        localStorage.setItem("refreshToken", res?.data?.refreshToken);
        context.setIsLogin(true);
        history("/");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const forgotPassword = () => {
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email!");
      return false;
    } else {
      context.openAlertBox("success", "OTP is sending to your email");
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((res) => {
        if (!res?.error) {
          context.openAlertBox("success", res?.message);
          history("/verify");
        } else {
          context.openAlertBox("error", res?.message);
          localStorage.removeItem("userEmail");
        }
      });
    }
  };

  return (
    <>
      <section className="section py-5 sm:py-10">
        <div className="container">
          <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-[18px] text-black">
              Login to your account
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  type="email"
                  id="email"
                  label="Email *"
                  variant="outlined"
                  className="w-full"
                  name="email"
                  value={formFields.email}
                  onChange={onChangeInput}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  //   type="password"
                  type={!isShowPassword ? "password" : "text"}
                  id="password"
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  name="password"
                  value={formFields.password}
                  onChange={onChangeInput}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {!isShowPassword ? (
                    <IoIosEye className="text-[20px] opacity-75" />
                  ) : (
                    <IoIosEyeOff className="text-[20px] opacity-75" />
                  )}
                </Button>
              </div>

              <a
                onClick={forgotPassword}
                className="link cursor-pointer text-[14px] font-[600]"
              >
                Forgot Password
              </a>
              <div className="flex items-center w-full my-3">
                <Button type="submit" className="btn-challe btn-lg w-full">
                  {isLoading ? <CircularProgress color="inherit" /> : "Login"}{" "}
                </Button>
              </div>

              <p className="text-center">
                Don't have an account yet?{" "}
                <Link
                  className="link text-[14px] font-[600] text-mocha-mousse"
                  to={"/register"}
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-center font-[500]">
                Or countinue with social account
              </p>
              <Button
                onClick={authWithGoogle}
                className="flex gap-3 w-full !bg-[#f1f1f1] !text-black "
              >
                <FcGoogle className=" text-[20px] " /> &nbsp; Login with Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
