import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";

function Logout() {
  const userDispatch = useDispatch();

  const navigate = useNavigate();

  const callLogoutPage = async () => {
    try {
      const res = await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });

      if (res) {
        userDispatch(addUser(null));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callLogoutPage();
  });

  return (
    <>
      <h1>Logout Page</h1>
    </>
  );
}

export default Logout;
