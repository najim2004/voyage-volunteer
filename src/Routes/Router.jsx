import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error404 from "../Pages/404/Error404";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PrivateRoute from "./PrivateRoute";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import NeedVolunteerPage from "../Pages/NeedVolunteerPage/NeedVolunteerPage";
import MyPosts from "../Pages/MyPosts/MyPosts";
import RequestedPost from "../Pages/RequestedPost/RequestedPost";
import Dashboard from "../Layout/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/need_volunteer",
        element: <NeedVolunteerPage />,
      },
      {
        path: "/add-volunteer-post",
        element: (
          <PrivateRoute>
            <AddVolunteer />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requested-post",
        element: (
          <PrivateRoute>
            <RequestedPost />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyPosts />,
      },
      {
        path: "my-requested-post",
        element: <RequestedPost />,
      },
    ],
  },
]);

export default router;
