import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  // checks if all values in the data object are truthy (not false, 0, "", null, undefined, or NaN)
  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full name!");
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email!");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password!");
      return false;
    }

    postData("/api/user/register", formFields).then((res) => {
      if (!res?.error) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        history("/verify");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="section py-5 sm:py-10">
        <div className="container">
          <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
            <h3 className="text-center text-[18px] text-black">
              Register Account
            </h3>

            <form className="w-full mt-5" onSubmit={handleSubmit}>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                  value={formFields.name}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                  value={formFields.email}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group w-full mb-5 relative ">
                <TextField
                  //   type="password"
                  type={!isShowPassword ? "password" : "text"}
                  id="password"
                  label="Password "
                  name="password"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                  value={formFields.password}
                  disabled={isLoading}
                />
                <Button
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

              <div className="flex items-center w-full my-3">
                <Button
                  type="submit"
                  disabled={!validValue}
                  className="btn-challe btn-lg w-full flex gap-3"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>

              <p className="text-center">
                Already have an account?{" "}
                <Link
                  className="link text-[14px] font-[600] text-mocha-mousse"
                  to={"/login"}
                >
                  Sign In
                </Link>
              </p>
              <p className="text-center font-[500]">
                Or countinue with social account
              </p>
              <Button
                type="button"
                className="flex gap-3 w-full !bg-[#f1f1f1] !text-black "
                onClick={authWithGoogle}
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

export default Register;
