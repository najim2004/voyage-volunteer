import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import Swal from "sweetalert2";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthData = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [themeData, setThemeData] = useState(false);
  const [refetchData, setRefetchData] = useState({});
  const [reRender, setRender] = useState(false);
  const axiosPublic = useAxiosPublic();

  const url = "https://voyage-volunteer-server.vercel.app";
  const { data, isLoading } = useQuery({
    queryKey: ["allData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/all-volunteer-post`);
      return response.data;
    },
  });

  useEffect(() => {
    if (isLoading) {
      setDataLoading(true);
      return;
    }
    setDataLoading(false);
  }, [isLoading, setDataLoading]);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const LoginByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const LoginByGitHub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Monitor user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // get and set token
      setUser(currentUser);
      const loggedUser = { email: currentUser?.email };
      if (currentUser) {
        axios.post(`${url}/jwt`, loggedUser, {
          withCredentials: true,
        });
      } else {
        axios
          .post(`${url}/logout`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data) {
              // you can console.log to see res.data
            }
          });
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (Name, photo) => {
    return updateProfile(user, {
      displayName: Name,
      photoURL: photo ? photo : "",
    });
  };

  const sweetAlert = (title, icon, text, btn, time) => {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: btn,
      timer: time,
    });
  };
  const sweetLoginAlert = (title, time) => {
    return Swal.fire({
      // imageUrl: img,
      imageWidth: 120,
      title: title,
      timer: time,
      showConfirmButton: false,
    });
  };

  const contextData = {
    setDataLoading,
    url,
    user,
    loading,
    dataLoading,
    themeData,
    data,
    reRender,
    setRender,
    setThemeData,
    LoginByGoogle,
    LoginByGitHub,
    registerUser,
    loginUser,
    logOutUser,
    sweetAlert,
    sweetLoginAlert,
    updateUserProfile,
    refetchData,
    setRefetchData,
  };
  return <AuthData.Provider value={contextData}>{children}</AuthData.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
