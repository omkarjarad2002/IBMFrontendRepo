import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
  const { User } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const ChangePage = () => {
    navigate(`/userprofile/${User.user._id}`);
  };

  useEffect(() => {
    const smallscreennav = document.querySelector(".smallscreennav");
    const nav = document.querySelector(".nav-links");

    smallscreennav.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
    });
    return () => {
      smallscreennav.removeEventListener("click", () => {});
    };
  }, []);

  const RenderMenu = () => {
    if (User === null) {
      console.log(User);
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Write</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <button className="getstartedbtn">
            <Link to="/login">Get Started</Link>
          </button>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to={`/profile/${User?.user._id}`}>Home</Link>
          </li>
          <li>
            <Link to={`/addblog/${User?.user._id}`}>Write</Link>
          </li>
          <button className="getstartedbtn">
            <Link to="/logout">Log out</Link>
          </button>
          <button className="profilelogopic">
            <img
              src={`http://localhost:4000/uploads/${User?.user.file}`}
              onClick={ChangePage}
              className="profileimage"
            ></img>
            {/* <CgProfile className="profileimage" onClick={ChangePage} />
             */}
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="shadowX">
        <label className="logo fs-1" style={{ fontFamily: "serif" }}>
          Blog
        </label>
        <div className="smallscreennav">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul className="nav-links">
          <RenderMenu />
        </ul>
      </nav>
      <div></div>
    </div>
  );
}

export default Navbar;
