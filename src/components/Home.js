import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { User } = useSelector((state) => state.user);

  return (
    <div className="home">
      <div className="homediv1">
        <h2>Stay Updated...</h2>
        <h3>Think discuss and write.</h3>
        {/* <button className="startreadingbtn" onClick={google}> */}
        <button className="startreadingbtn">
          <Link to={`/login`}>Start reading</Link>
        </button>
      </div>
      <div className="homediv2"></div>
    </div>
  );
}

export default Home;
