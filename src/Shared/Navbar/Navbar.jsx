import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { AuthData } from "../../Context/AuthProvider";
import { getTheme, setTheme } from "../../Utilities/localstorage";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const { user, logOutUser, sweetAlert, loading, setThemeData } =
    useContext(AuthData);
  const [isChecked, setChecked] = useState(false);
  const menu = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/need_volunteer"}>Need Volunteer</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/add-volunteer-post"}>Add Volunteer Post</NavLink>
          </li>

          <li>
            <NavLink to={"/add_craft_item"}>My Profile</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to={"/contact"}>Contact us</NavLink>
      </li>
    </>
  );

  const theme = getTheme();
  useEffect(() => {
    setThemeData(getTheme);
    const html = document.querySelector("html");
    if (theme) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
  }, [getTheme, isChecked]);

  const handleTheme = (e) => {
    setTheme(e.target.checked);
    setChecked(!isChecked);
  };

  const handleLogOut = () => {
    logOutUser()
      .then(() => {})
      .catch(() => {
        sweetAlert("Oops!", "warning", "Something went wrong", true, false);
      });
  };
  // scroll check
  const [bgColor, setBgColor] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 30) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`! !z-50 !sticky top-0 ${
        bgColor ? "bg-black bg-opacity-60 text-white backdrop-blur-[8px]" : ""
      } `}
    >
      <div className="max-w-[1450px] min-h-[72px] flex justify-between items-center mx-auto">
        <div className="">
          <Link
            to={"/"}
            className="text-xl flex items-center font-bold md:text-2xl lg:text-2xl"
          >
            <div className="flex gap-2">
              <img className="h-[64px]" src={logo} alt="" />
              <h3>
                Voyage
                <br />
                <span className="text-red-400">Volunteer</span>
              </h3>
            </div>
          </Link>
        </div>
        <div className=" hidden h-full lg:flex">
          <ul className="gap-10 n-menu flex font-medium items-center h-full menu-horizontal px-1">
            {menu}
          </ul>
        </div>
        <div className="flex items-center">
          <div className="flex justify-end items-center gap-3">
            {loading ? (
              <span className="loading text-cmnBG loading-ring loading-lg"></span>
            ) : (
              <>
                {user ? (
                  <div className="flex z-20 gap-3 items-center">
                    <div
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.displayName?.toUpperCase()}
                      data-tooltip-place="left"
                      className=" dropdown dropdown-end"
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 bg-gray-300 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src={
                              user?.photoURL ? (
                                user.photoURL
                              ) : (
                                <FaRegCircleUser />
                              )
                            }
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                      >
                        {user && (
                          <li onClick={handleLogOut}>
                            <a>Logout</a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to={"/login"}>
                    <button className="btn text-cmnBG bg-cRed text-white h-10 btn-sm border-[2px] border-cRed rounded-full">
                      Login
                    </button>
                  </Link>
                )}
              </>
            )}
            <div className="hidden mr-3 overflow-hidden lg:flex">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={getTheme()}
                  onChange={handleTheme}
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
          <div className="dropdown lg:hidden  !z-20">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm right-0 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
              {user ? (
                <li onClick={handleLogOut}>
                  <a>Logout</a>
                </li>
              ) : (
                <>
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>Register</Link>
                  </li>
                </>
              )}
              <li>
                <label className="swap swap-rotate">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    checked={getTheme()}
                    onChange={handleTheme}
                    className="theme-controller"
                    value="synthwave"
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;
