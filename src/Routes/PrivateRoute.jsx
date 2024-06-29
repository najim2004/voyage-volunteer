import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthData } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthData);
  if (loading) {
    return (
      <div className="fixed top-0 h-screen z-50 w-full bg-white bg-opacity-60 backdrop-blur-[5px] grid place-items-center">
        <span className="loading loading-dots loading-lg text-cRed"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
