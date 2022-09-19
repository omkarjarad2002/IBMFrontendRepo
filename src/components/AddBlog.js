import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBackArrowClicked = (e) => {
    e.preventDefault();
    navigate(`/profile/${id}`);
  };

  const { User } = useSelector((state) => state.user);

  const forgotPassClick = (e) => {
    navigate(`/sendotp/${id}`);
  };
  const [file, setFile] = useState();

  const changeImage = (e) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const file = files[0];
    setFile(file);
  };
  const [data, setData] = useState({
    title: "",
    description: "",
    blogType: "",
    userID: id,
    file: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(value);

    setData({ ...data, [name]: value });
  };

  const uploadImage = async () => {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await axios.post("http://localhost:4000/uploadfile", formdata);
    console.log(res);
    return res;
  };

  const PostData = async (e) => {
    e.preventDefault();
    const file = await uploadImage();

    const { title, description, blogType, userID } = data;
    console.log(data);

    try {
      const res = await axios.post("http://localhost:4000/addblog", {
        title,
        description,
        blogType,
        userID,
        file: file.data.file.filename,
      });

      if (res) {
        navigate(`/profile/${id}`);
      }

      alert(
        `blog of name ${title} of category ${blogType} published successfully`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section__height d-flex" id="contact">
      <div className="addblog__outer__container container">
        <div className="addblog__container ">
          <form method="POST" className="form" id="form">
            <div className="blog__title__div">
              <input
                placeholder="Title"
                type="text"
                autoComplete="off"
                id="validationDefault01"
                name="title"
                onChange={handleInputs}
                required
              />
            </div>
            <div className="blog__description__div">
              <textarea
                className="description"
                placeholder="Tell your story..."
                type="text"
                autoComplete="off"
                id="validationDefault01"
                name="description"
                onChange={handleInputs}
              />
            </div>

            <div className="blog_image_div 3 pt-2  text-align-center align-items-center">
              <label htmlFor="file">Attach Image : </label>
              <input
                type="file"
                autoComplete="off"
                name="file"
                className="form-control"
                id="file"
                onChange={changeImage}
              />
            </div>
            <div className="blog_type_div 3 pt-2  text-align-center align-items-center">
              <label htmlFor="validationDefault01">Blog Type : </label>

              <input
                type="text"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                id="validationDefault01"
                name="blogType"
                placeholder="sport/buisness/history/advanture"
                onChange={handleInputs}
              />
            </div>
            <div className="contactbuttonbox publishBtn pb-3  d-md-block">
              <button
                className="btn btn-outline-success  p-2 mx-3  rounded"
                id="signup"
                type="submit"
                value="Submit"
                role="button"
                onClick={PostData}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddBlog;
