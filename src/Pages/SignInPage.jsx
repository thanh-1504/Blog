/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import * as yup from "yup";
import BlogLogo from "../Components/BlogLogo";
import { auth } from "../firebaseConfig";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  handleChangeToInputText,
  handleShowPassWord,
} from "../redux-thunk/Slices/signInSlice";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
const schema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be maximum 20 characters"),
});
const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassWord, changeTypeInput } = useSelector(
    (state) => state.signIn
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const userInfo = await signInWithPopup(auth, provider);
      setTimeout(() => {
        toast("Logged in successfully", {
          pauseOnHover: false,
          autoClose: 1000,
          type: "success",
        });
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userInfo?.user.uid,
          email: userInfo?.user.email,
          displayName: userInfo?.user.displayName,
          photoURL: userInfo?.user.photoURL,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSignIn = (values) => {
    try {
      if (isValid) {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            setTimeout(() => {
              toast("Logged in successfully", {
                pauseOnHover: false,
                autoClose: 1000,
                type: "success",
              });
            }, 1000);
            setTimeout(() => {
              navigate("/");
            }, 3000);
            reset();
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: userCredential?.user.uid,
                email: userCredential?.user.email,
                displayName: "",
                photoURL: "",
              })
            );
          })
          .catch((error) => {
            toast("Your password or login account is incorrect", {
              type: "error",
              pauseOnHover: false,
              autoClose: 2500,
            });
          });

        dispatch(handleShowPassWord(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleSignInRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result.user) {
          // Handle successful sign-in
          const userInfo = {
            id: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));
          toast("Logged in successfully", {
            pauseOnHover: false,
            autoClose: 1000,
            type: "success",
          });
          navigate("/");
        }
      } catch (error) {
        console.error(error.message);
        // Handle sign-in error
        toast("Error occurred while signing in", {
          type: "error",
          pauseOnHover: false,
          autoClose: 2500,
        });
      }
    };

    handleSignInRedirect();
  }, [auth, navigate]);
  return (
    <div className="relative w-full h-screen bg-[#f7f7f7] dark:bg-themeDark">
      {window.innerWidth > 480 && <BlogLogo style="ml-10 pt-6"></BlogLogo>}
      <div
        className={`absolute lg:shadow-authenticationShadow left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-full max-w-[400px]  px-[30px]  dark:bg-[#f7f7f7] rounded dark:text-black ${
          !errors.email && !errors.password ? "min-h-[450px]" : "min-h-[490px]"
        }`}
      >
        {window.innerWidth < 480 && (
          <div className="absolute left-2/4 -translate-x-[66%] flex items-center">
            <BlogLogo style="mr-4 w-[60px] h-[60px] max-w-none"></BlogLogo>
            <span className="text-3xl font-bold min-w-[180px]">My Blogger</span>
          </div>
        )}
        <p className="font-bold lg:text-3xl mb:text-2xl mb-5 lg:mt-[52px] mb:mt-[100px] select-none text-black">
          Sign in
        </p>
        <form
          className="flex flex-col"
          autoComplete="off"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <input
            {...register("email")}
            name="email"
            type="text"
            placeholder="Email"
            className={`p-2 outline-none border-[1.5px] border-black ${
              !errors?.email && "mb-5"
            } rounded-md`}
          />
          {errors?.email && (
            <span className="text-red-500 my-2">{errors.email.message}</span>
          )}
          <div className="relative p-2 border-[1.5px] border-black rounded-md">
            <input
              name="password"
              {...register("password")}
              onChange={(e) =>
                e.target.value
                  ? dispatch(handleShowPassWord(true))
                  : dispatch(handleShowPassWord(false))
              }
              type={changeTypeInput ? "text" : "password"}
              placeholder="Password"
              className="outline-none w-[85%] "
            />
            {showPassWord && (
              <span
                onClick={() =>
                  dispatch(handleChangeToInputText(!changeTypeInput))
                }
                className="top-2/4 -translate-y-2/4 right-3 absolute text-[#2268b5] font-bold cursor-pointer select-none"
              >
                {showPassWord && !changeTypeInput ? "show" : "unshow"}
              </span>
            )}
          </div>
          {errors?.password && (
            <span className="text-red-500 mt-2">{errors.password.message}</span>
          )}
          <p
            onClick={() => navigate("/sign-up")}
            className="my-3 ml-auto cursor-pointer select-none"
          >
            Don't have an account?
          </p>
          <button
            type="submit"
            className=" text-white bg-[#0a66c2] py-2 rounded-lg"
          >
            Sign in
          </button>
          <div className="line ">
            <p className="line-text">or</p>
          </div>
        </form>
        <div className="flex items-center justify-center border-[1.5px] border-black py-2 rounded-lg ">
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
      <ToastContainer className="mobile-toast-container" />
    </div>
  );
};

export default SignInPage;
