import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function UserProfile() {
  const { id } = useParams();
  const [blogs, setBlog] = useState([]);

  const { User } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const forgotPassClick = (e) => {
    navigate(`/sendotp`);
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
    name: "",
    email: "",
    file: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

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

    const { name, email } = data;

    try {
      const res = await axios.post(
        `http://localhost:4000/editprofileinfo/${id}`,
        {
          name,
          email,
          file: file.data.file.filename,
        }
      );
      if (res) {
        alert("Profile edited successfully !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlogs = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/getUserAllblogs/${User?.user._id}`,
        {
          withCredentials: true,
        }
      );
      setBlog(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let userId = "";

  const handleClick = async (userId) => {
    console.log(userId);
    try {
      const res = await axios.delete(`http://localhost:/4000/deleteblog`, {
        userId,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="userprofile">
      <div className="editprofile">
        <div className="editprofile_inner_div">
          <div className="image_info_div">
            <div className="image_div">
              {/* <CgProfile className="image_icon" /> */}
              <img
                src={`http://localhost:4000/uploads/${User?.user.file}`}
                className="image_icon"
              />
            </div>

            <div className="profile_info">
              <div className="name_div">
                <label htmlFor="name">Name : </label>
                <input value={User?.user.name}></input>
              </div>
              <div className="email_div">
                <label htmlFor="email">Email : </label>
                <input value={User?.user.email}></input>
              </div>
              <div className="followers_div">
                <label htmlFor="followers">Followers : </label>
                <input value="200"></input>
              </div>
              <div className="following_div">
                <label htmlFor="following">Following : </label>
                <input value="500"></input>
              </div>
              <div
                className="user_profile_forgot_pass_div"
                onClick={forgotPassClick}
              >
                <p>Forgot Paasword ?</p>
              </div>
            </div>
          </div>
          <div className="edit_info_div">
            <section className="section__height d-flex" id="contact">
              <div className="edit_info_outer_div container">
                <div className="edit_profile_input_label_outer-div ">
                  <form className="form" method="POST">
                    <div className="edit_profile_input_label_div 3 pt-2  text-align-center align-items-center">
                      <label htmlFor="validationDefault01">Name</label>
                      <input
                        type="text"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        autoComplete="off"
                        id="validationDefault01"
                        name="name"
                        placeholder="Enter Your Name..."
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="edit_profile_input_label_div mb-3 pt-2  text-align-center align-items-center">
                      <label htmlFor="name">Email</label>
                      <input
                        type="text"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        placeholder="Enter your Email..."
                        autoComplete="off"
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="edit_profile_input_label_div mb-3 pt-2  text-align-center align-items-center">
                      <label
                        htmlFor="file"
                        className="col-sm-1 col-form-label  pt-4"
                      >
                        Image
                      </label>
                      <div className="col-sm-3 pt-4">
                        <input
                          type="file"
                          autoComplete="off"
                          name="file"
                          className="form-control"
                          id="file"
                          onChange={changeImage}
                        />
                      </div>
                    </div>

                    <div className="save_btn_box pb-3  d-md-block">
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
                          save
                        </Link>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="editprofile">
        <h3 class="editprofile_h3">Blog's</h3>
        {blogs?.map((blog) => (
          <div class="card">
            <div className="col-md-2">
              <img
                src={`http://localhost:4000/uploads/${blog.file}`}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title blog_title_userprofile">{blog.title}</h5>
              <p class="card-text">{blog.description}</p>
              <div class="edit_delete_btn">
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    handleClick(blog._id);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
