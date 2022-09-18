import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function BookMarkedBlogs() {
  const [blogs, setBlog] = useState([]);
  const { User } = useSelector((state) => state.user);

  const getBookMarkedBlogs = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/getbookmarkedblogs/${User?.user._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(data.data.data);
      setBlog(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/removebookmarkedblog/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookMarkedBlogs();
  }, []);

  return (
    <div className="userprofile">
      <div className="editprofile">
        <h3 class="editprofile_h3">Book Marked Blog's</h3>
        {blogs?.map((blog) => (
          <div class="card">
            <div className="col-md-2">
              <img
                src={`http://localhost:4000/uploads/${blog.blogId.file}`}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title blog_title_userprofile">
                {blog.blogId.title}
              </h5>
              <p className="card-text">
                {blog.blogId.description.slice(0, 100) + "..."}
                <Link
                  className="more__button"
                  to={`/detailDescription/${blog._id}`}
                >
                  more
                </Link>
              </p>
              <div class="edit_delete_btn">
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    handleClick(blog._id);
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookMarkedBlogs;
