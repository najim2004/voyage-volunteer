import Lottie from "lottie-react";
import registerSVG from "/public/register.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthData } from "../../Context/AuthProvider";

const Register = () => {
  const { user, loading, registerUser, sweetAlert, themeData } =
    useContext(AuthData);
  const location = useLocation();
  const [pSH, setPSH] = useState(true);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      if (location?.state) {
        navigator(location.state);
      } else {
        navigator("/");
      }
    }
  }, [user, loading]);

  const fromSubmit = (data) => {
    const { Name, Photo, Email, password } = data;
    registerUser(Email, password)
      .then((userCredentials) => {
        updateProfile(userCredentials.user, {
          displayName: Name,
          photoURL: Photo ? Photo : "",
        })
          .then(() => {
            sweetAlert(
              "Successfully Registered",
              "success",
              false,
              false,
              3000
            );
            reset();
            setTimeout(() => {
              if (location?.state) {
                navigator(location.state);
              } else {
                navigator("/");
              }
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            sweetAlert("Oops!", "warning", "Something went wrong", true, false);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          sweetAlert(
            "Oops!",
            "warning",
            "Email already in Register",
            true,
            false
          );
        } else if (error.code === "auth/network-request-failed") {
          sweetAlert(
            false,
            "warning",
            "Network request failed! Please check network and try again!",
            true,
            false
          );
        } else {
          sweetAlert("Oops!", "warning", "Something went wrong", true, false);
        }
      });
  };
  return (
    <div className="max-w-[1450px] mx-auto min-h-[calc(100vh-72px)] flex items-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg  lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:flex items-center justify-center lg:w-1/2"
          style={{}}
        >
          <Lottie animationData={registerSVG} className="size-[80%]" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 flex flex-col justify-center lg:w-1/2">
          <h1 className="text-center text-2xl font-semibold mb-5">
            Register Now
          </h1>
          <form onSubmit={handleSubmit(fromSubmit)}>
            <div className="">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Full Name
              </label>
              <input
                {...register("Name", {
                  required: true,
                })}
                className={`block w-full px-4 py-2 text-gray-700  border rounded-lg  dark:text-gray-300 ${
                  themeData ? "bg-gray-800" : "bg-white"
                } dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300`}
              />
              {errors?.Name?.type === "required" && (
                <p className="text-red-500 dark:text-red-400">
                  This filed is required!
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Photo Url
              </label>
              <input
                {...register("Photo", {
                  required: true,
                })}
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg ${
                  themeData ? "bg-gray-800" : "bg-white"
                } dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300`}
              />
              {errors?.Photo?.type === "required" && (
                <p className="text-red-500 dark:text-red-400">
                  This filed is required!
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                {...register("Email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg ${
                  themeData ? "bg-gray-800" : "bg-white"
                } dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300`}
              />
              {errors?.Email?.type === "required" && (
                <p className="text-red-500 dark:text-red-400">
                  This filed is required!
                </p>
              )}
              {errors?.Email?.type === "pattern" && (
                <p className="text-red-500 ">Please enter a valid email!</p>
              )}
            </div>

            <div className="mt-4 relative">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              <input
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg ${
                  themeData ? "bg-gray-800" : "bg-white"
                } dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300`}
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
                type={pSH ? "password" : "text"}
              />
              <span
                onClick={() => setPSH(!pSH)}
                className="absolute right-3 top-[30px] size-[40px] flex items-center justify-center text-[24px]"
              >
                {pSH ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
              {errors?.password?.type === "required" && (
                <p className="text-red-500 dark:text-red-400">
                  This filed is required!
                </p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="text-red-500 dark:text-red-400">
                  Password must be at least 8 characters!
                </p>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to={"/login"}
              className="text-base text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or Login
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
