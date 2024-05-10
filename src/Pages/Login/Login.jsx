import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthData } from "../../Context/AuthProvider";
import Lottie from "lottie-react";
import loginSVG from "/public/login.json";
const Login = () => {
  const {
    user,
    loading,
    loginUser,
    sweetAlert,
    sweetLoginAlert,
    LoginByGitHub,
    LoginByGoogle,
    themeData,
  } = useContext(AuthData);

  const location = useLocation();
  const navigator = useNavigate();
  const [pSH, setPSH] = useState(true);

  useEffect(() => {
    if (user) {
      if (location?.state) {
        navigator(location.state);
      } else {
        navigator("/");
      }
    }
  }, [user, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginWithGithubGoogle = (fnc) => {
    fnc()
      .then((currentUser) => {
        sweetLoginAlert(
          `Welcome "${currentUser?.user?.displayName?.toUpperCase()}"`,
          1500
        );
        setTimeout(() => {
          if (location?.state) {
            navigator(location.state);
          } else {
            navigator("/");
          }
        }, 1500);
      })
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          sweetAlert(
            false,
            "warning",
            "Network request failed! Please check network and try again!",
            true,
            false
          );
        } else {
          sweetAlert("Oops!", "warning", "Something went wrong", true, false);
          console.log(error);
        }
      });
  };

  const fromSubmit = (data) => {
    const { Email, password } = data;
    loginUser(Email, password)
      .then((currentUser) => {
        sweetLoginAlert(
          `Welcome Back "${currentUser?.user?.displayName?.toUpperCase()}"`,
          1500
        );
        setTimeout(() => {
          if (location?.state) {
            navigator(location.state);
          } else {
            navigator("/");
          }
        }, 1500);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          sweetAlert(
            "Oops!",
            "warning",
            "Invalid email or password!!",
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
        <div className="hidden bg-cover lg:block lg:w-1/2" style={{}}>
          <Lottie animationData={loginSVG} className="w-full h-full" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 flex flex-col justify-center lg:w-1/2">
          <h1 className="text-center text-2xl font-semibold mb-5">Login Now</h1>
          <button
            onClick={() => handleLoginWithGithubGoogle(LoginByGoogle)}
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transhtmlForm border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </button>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(fromSubmit)}>
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
              to={"/register"}
              className="text-base text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or Register
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
