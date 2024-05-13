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

export const AuthData = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [themeData, setThemeData] = useState(false);
  const [data, setData] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

  const url = "http://localhost:5000";

  // useEffect for Testimonial data
  useEffect(() => {
    axios.get(`${url}/testimonial`).then((res) => {
      setTestimonial(res.data);
    });
  }, []);

  useEffect(() => {
    setDataLoading(true);
    axios.get(`${url}/all-volunteer-post`).then((res) => {
      setData(res.data);
      setDataLoading(false);
    });
  }, []);

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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
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
    testimonial,
    url,
    user,
    loading,
    dataLoading,
    themeData,
    data,
    setThemeData,
    LoginByGoogle,
    LoginByGitHub,
    registerUser,
    loginUser,
    logOutUser,
    sweetAlert,
    sweetLoginAlert,
    updateUserProfile,
  };
  return <AuthData.Provider value={contextData}>{children}</AuthData.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
