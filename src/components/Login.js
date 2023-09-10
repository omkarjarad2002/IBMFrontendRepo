import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addUser } from "../features/userSlice";
// import googleLogo from "../Images/google_logo.png";

function Login() {
  const userDispatch = useDispatch();
  const { User } = useSelector((state) => state.user);

  const google = () => {
    window.open("http://localhost:4000/google", "_self");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const PostData = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        userDispatch(addUser(res.data));
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    navigate("/");
  };
  return (
    <div className="loginOuterContainer">
      <div className="loginContainer shadow border rounded w-full  focus:outline-none focus:shadow-outline">
        <div className="loginanimationdiv"></div>
        <div className="logininputdiv shadow  rounded w-full   focus:outline-none focus:shadow-outline">
          {/* <BiArrowBack className="backarrow" onClick={handleClick} /> */}
          <h2 className="pt-0 pb-3">Login</h2>
          <form className="form" method="POST">
            <div className="singnupbox loginbox mb-3 pt-2 mx-4 text-align-center align-items-center">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                className="email_input_box shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                placeholder="Enter your Email..."
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" singnupbox loginbox mb-3 pt-2 mx-4 text-align-center align-items-center">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                className="password_input_box shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                id="password"
                name="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="singnupbuttonsbox loginbox pb-3  d-md-block">
              <button
                type="button"
                className="btn btn-primary py-2 mx-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
                onClick={PostData}
              >
                <Link
                  to=""
                  style={{ textDecoration: "none", color: "white" }}
                  className="py-3"
                >
                  e Login
                </Link>
              </button>
              {/* <p>or</p>p
              <div className="googleIconBox">
                <img onClick={google} src={googleLogo}></img>
              </div> */}
              <br></br>
              <hr></hr>
              <p className="forgot_pass">
                <Link to="/sendotp">Forgot Password ?</Link>
              </p>
              <br></br>
              <hr></hr>
              <p className="logincreateaccountp">
                <Link to="/register">New here? Create an account.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
