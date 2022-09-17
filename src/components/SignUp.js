import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const userDispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const PostData = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cpassword) {
      alert("Please fill all fields !");
      return;
    }

    axios
      .post("http://localhost:4000/register", {
        name,
        email,
        password,
        cpassword,
      })
      .then((res) => {
        console.log(res);
        userDispatch(addUser(res.data));
        navigate("/profile");
        alert("Registration Successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    navigate("/");
  };

  return (
    <section className="section__height d-flex" id="contact">
      <div className="container1 container">
        <div className="contact__container shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <BiArrowBack className="backarrow" onClick={handleClick} />
          <h2 className="pt-3 pb-3">Register :)</h2>
          <form className="form" method="POST">
            <div className="singnupbox  pt-2 mx-4 text-align-center align-items-center">
              <label htmlFor="validationDefault01">Name</label>
              <input
                type="text"
                className="nameInput shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                id="validationDefault01"
                name="name"
                placeholder="Enter Your Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="singnupbox mb-3 pt-2  mx-4  text-align-center align-items-center">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                className="emailInput shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                placeholder="Enter your Email..."
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="singnupbox mb-3 pt-2 mx-4  text-align-center align-items-center">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                className="passwordInput shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                id="password"
                name="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="singnupbox mb-3 pt-2  mx-4  text-align-center align-items-center">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="password"
                className="cpasswordInput shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                id="cpassword"
                name="cpassword"
                placeholder="Enter Confirm password..."
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <div className="singnupbuttonsbox pb-3  mx-4  d-md-block">
              <button
                className="btn btn-primary py-2 mx-3"
                id="signup"
                type="submit"
                value="Submit"
                role="button"
                onClick={PostData}
              >
                Register
              </button>
              or
              <button
                type="button"
                className="btn btn-primary py-2 mx-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                  className="py-3"
                >
                  Login
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
