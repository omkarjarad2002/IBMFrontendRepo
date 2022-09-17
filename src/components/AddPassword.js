import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addUser } from "../features/userSlice";
import googleLogo from "../Images/google_logo.png";

function AddPassword() {
  const userDispatch = useDispatch();
  const { User } = useSelector((state) => state.user);
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const checkGoogleLoginSuccess = async () => {
    try {
      const data = await axios.get("http://localhost:4000/login/success", {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const PostData = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:4000/changePassword/${id}/${token}`,
        {
          password,
          cpassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
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

  useEffect(() => {
    checkGoogleLoginSuccess();
  }, []);
  return (
    <div>
      <div>
        <div className="addpasswordcontainer">
          <div className=" addpasswordcontainerinputdiv shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <BiArrowBack className="backarrow" onClick={handleClick} />
            <h2 className="pt-3 pb-3">Create Password</h2>
            <form className="form" method="POST">
              <div className=" passwordbox mb-3 pt-2  text-align-center align-items-center">
                <label htmlFor="name">Password</label>
                <input
                  type="text"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=" cpasswordbox mb-3 pt-2 text-align-center align-items-center">
                <label htmlFor="name">Confirm Password</label>
                <input
                  type="text"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  autoComplete="off"
                  id="password"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
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
                    Save
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPassword;
