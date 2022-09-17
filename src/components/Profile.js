import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { BiCircle, BiLogOut } from "react-icons/bi";
import { SiBloglovin } from "react-icons/si";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

function Profile() {
  const { User } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [blogs, setBlog] = useState([]);
  const [tempororyBlog, setTemproryBlog] = useState([]);
  const [specificBlogs, setSpecificBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const data = await axios.get("http://localhost:4000/getallblogs", {
        withCredentials: true,
      });
      setBlog(data.data.data);
      setTemproryBlog(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutclick = () => {
    navigate("/logout");
  };

  const homeclick = () => {
    navigate("/profile");
  };

  const writeblogclick = () => {
    navigate(`/addblog/${User?.user._id}`);
  };

  const postSearch = () => {
    if (!query) {
      setBlog(tempororyBlog);
      return;
    }

    const filteredBlogs = blogs.filter((item) => {
      let blog = null;

      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
        return (blog = item);

      return blog;
    });
    setBlog(filteredBlogs);
  };

  useEffect(() => {
    if (!query) {
      setBlog(tempororyBlog);
      return;
    }

    const filteredBlogs = blogs.filter((item) => {
      let blog = null;

      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
        return (blog = item);

      return blog;
    });
    setBlog(filteredBlogs);
  }, [query]);

  const getBookMarkedUsers = async () => {
    try {
      const users = await axios.get(
        `http://localhost:4000/getAllBookMarkedUsers/${User?.user._id}`,
        {
          withCredentials: true,
        }
      );

      console.log(users.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookMarkClick = async (userId) => {
    // try {
    //   const data = await axios.post("http://localhost:4000/bookMark", {
    //     authorId: userId,
    //     userId: User?.user._id,
    //   });
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const unBookMarkClick = async () => {};

  useEffect(() => {
    getBlogs();
    getBookMarkedUsers();
  }, []);

  return (
    <div className="profile">
      <div className="profilecontainer">
        <div className="profilecontainer1">
          <div className="icon_input_box">
            <BsSearch className="bssearch_icon" />
            <input
              type="text"
              className="search_input"
              autoComplete="off"
              id="validationDefault01"
              name="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary btn-sm">Search</button>
          </div>
          <div className="blog_categories">
            <button
              name="sport"
              placeholder="sport"
              onClick={() => {
                setQuery("sport");
                postSearch();
              }}
            >
              sport
            </button>
            <button
              name="buisness"
              placeholder="buisness"
              onClick={() => {
                setQuery("buisness");
                postSearch();
              }}
            >
              buisness
            </button>
            <button
              name="story"
              placeholder="story"
              onClick={() => {
                setQuery("story");
                postSearch();
              }}
            >
              stroy
            </button>
            <button
              name="advanture"
              placeholder="advanture"
              onClick={() => {
                setQuery("advanture");
                postSearch();
              }}
            >
              advanture
            </button>
          </div>
        </div>

        <div className="profilecontainer2">
          {blogs?.map((blog) => (
            <div>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:4000/uploads/${blog.file}`}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{blog.title}</h5>
                      <p className="card-text">
                        {blog.description.slice(0, 100) + "..."}
                        <Link
                          className="more__button"
                          to={`/detailDescription/${blog._id}`}
                        >
                          more
                        </Link>
                      </p>
                    </div>
                    <div>
                      <button className="followBtn">Follow</button>
                      <button className="unfollowBtn">Unfollow</button>
                      <BsBookmarks
                        className="bookmark_empty_icon"
                        onClick={() => {
                          bookMarkClick(blog._id);
                        }}
                      />
                      <BsBookmarksFill
                        className="bookmark_filled_icon"
                        onClick={unBookMarkClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hr"></hr>
            </div>
          ))}
        </div>

        <hr></hr>
        <div className="profilecontainer3">
          <div className="profile_icons">
            <SiBloglovin className="profile_page_icon" />
            <AiFillHome className="profile_page_icon" onClick={homeclick} />
            <BsFillBookmarksFill className="profile_page_icon" />
            <GiNotebook
              className="profile_page_icon"
              onClick={writeblogclick}
            />
            <BiLogOut className="profile_page_icon" onClick={logoutclick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
