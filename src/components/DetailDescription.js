import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DetailDescription() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState("");
  const { id } = useParams();

  const getBlogDetail = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/getblogDetail/${id}`,
        {
          withCredentials: true,
        }
      );
      setBlog(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const backClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  return (
    <div className="detail__description__outer__div">
      <button className="btn btn-dark" onClick={backClick}>
        back
      </button>
      <div className="detail__description__inner__div">
        <div className="detail__description__image__div">
          <h3>{blog.title}</h3>
          <img
            className="detail__description__image"
            src={`http://localhost:4000/uploads/${blog.file}`}
          />
        </div>
        <div className="detail__title__description__div">
          <p>{".........................." + blog.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailDescription;
