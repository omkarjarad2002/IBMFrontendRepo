import logo from "./logo.svg";
import "./App.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SocialLogin from "./components/SocialLogin";
import Login from "./components/Login";
import React, { useEffect } from "react";
import axios from "axios";
import { createContext, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../src/features/userSlice";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddPassword from "./components/AddPassword";
import UserProfile from "./components/UserProfile";
import ForgotPass from "./components/ForgotPass";
import SendOtp from "./components/SendOtp";
import AddBlog from "./components/AddBlog";
import EnterOtp from "./components/EnterOtp";
import DetailDescription from "./components/DetailDescription";
import BookMarkedBlogs from "./components/BookMarkedBlogs";

export const UserContext = createContext();

function App() {
  const userDispatch = useDispatch();
  const navigate = useNavigate();

  const checkGoogleLoginSuccess = () => {
    axios
      .get("http://localhost:4000/login/success", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        userDispatch(addUser(response.user));
      })
      .then((resObject) => {
        userDispatch(addUser(resObject.user));
      })
      .catch((error) => console.log(error));
  };

  const userExist = async () => {
    try {
      const res = await axios.get("http://localhost:4000/refreshtoken", {
        withCredentials: true,
      });
      console.log(res);
      userDispatch(addUser(res.data));
      // console.log(res.data.user._id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userExist();
    checkGoogleLoginSuccess();
  }, []);
  return (
    <>
      <UserContext.Provider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/addblog/:id"
            element={
              <>
                <Navbar />
                <AddBlog />
              </>
            }
          />
          <Route path="/googlelogin" element={<SocialLogin />} />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/addPassword/:id/:token" element={<AddPassword />} />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <Navbar />
                <Logout />
              </>
            }
          />
          <Route
            path="/userprofile/:id"
            element={
              <>
                <Navbar />
                <UserProfile />
              </>
            }
          />
          <Route
            path="/forgotpass/:id"
            element={
              <>
                <ForgotPass />
              </>
            }
          />
          <Route
            path="/sendotp"
            element={
              <>
                <SendOtp />
              </>
            }
          />
          <Route
            path="/verifyotp/:id"
            element={
              <>
                <EnterOtp />
              </>
            }
          />
          <Route
            path="/detailDescription/:id"
            element={
              <>
                <DetailDescription />
              </>
            }
          />
          <Route
            path="/bookmarkedblogs/:id"
            element={
              <>
                <Navbar />
                <BookMarkedBlogs />
              </>
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
