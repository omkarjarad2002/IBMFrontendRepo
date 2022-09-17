import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function EnterOtp() {
  const { User } = useSelector((state) => state.user);
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const PostData = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/verifyotp",
        {
          email: User?.user.email,
          otp,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate(`/forgotpass/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = (e) => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="addpasswordcontainer">
          <div className=" addpasswordcontainerinputdiv shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <BiArrowBack className="backarrow" onClick={handleClick} />
            <h2 className="pt-3 pb-3">Enter a valid otp !</h2>
            <form className="form" method="POST">
              <div className=" passwordbox mb-3 pt-2  text-align-center align-items-center">
                <label htmlFor="email">Otp</label>
                <input
                  type="text"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                    Verify
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

export default EnterOtp;
