import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import { GiNotebook, GiWoodenClogs } from "react-icons/gi";
import { BiCircle, BiLogOut } from "react-icons/bi";
import { SiBloglovin, SiMarketo } from "react-icons/si";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const { User } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [value, setValue] = useState("");
  const [blogId, setBlogId] = useState("");
  const [bookMarkedUsers, setBookMarkedUser] = useState([]);
  const [specificBlogs, setSpecificBlogs] = useState([]);
  const [blogs, setBlog] = useState([]); //final
  const [tempororyBlog, setTemproryBlog] = useState([]);

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
    if (!value) {
      setBlog(tempororyBlog);
      return;
    }
    const filteredBlogs = blogs.filter((item) => {
      let blog = null;
      console.log(item.blogType);
      if (item.blogType.toLowerCase().includes(value)) return (blog = item);
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

  useEffect(() => {
    getBookMarkedUsers();
  }, [User]);

  const getBookMarkedUsers = async () => {
    if (!User?.user._id) {
      return;
    } else {
      try {
        const users = await axios.get(
          `http://localhost:4000/getAllBookMarkedUsers/${User?.user._id}`,
          {
            withCredentials: true,
          }
        );
        setIsFetched(true);

        setBookMarkedUser(users.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const bookmarkedblogspage = () => {
    navigate(`/bookmarkedblogs/${User?.user._id}`);
  };

  const bookMarkClick = async (blogId) => {
    try {
      const data = await axios.post("http://localhost:4000/bookMark", {
        blogId: blogId,
        userId: User?.user._id,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const findIsBookMarked = (blogId) => {
    return bookMarkedUsers?.find((marked) => marked.blogId === blogId);
  };

  useEffect(() => {
    getBlogs();
  }, [User]);

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
                setValue("sport");
                postSearch();
              }}
            >
              sport
            </button>
            <button
              name="buisness"
              placeholder="buisness"
              onClick={() => {
                setValue("buisness");
                postSearch();
              }}
            >
              buisness
            </button>
            <button
              name="story"
              placeholder="story"
              onClick={() => {
                setValue("story");
                postSearch();
              }}
            >
              history
            </button>
            <button
              name="advanture"
              placeholder="advanture"
              onClick={() => {
                setValue("advanture");
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
                      <div>
                        {isFetched && findIsBookMarked(blog._id) ? (
                          <BsBookmarksFill className="bookmark_filled_icon" />
                        ) : (
                          <BsBookmarks
                            className="bookmark_empty_icon"
                            onClick={() => {
                              bookMarkClick(blog._id);
                            }}
                          />
                        )}
                      </div>
                      {/* <BsBookmarks
                          className="bookmark_empty_icon"
                          onClick={() => {
                            bookMarkClick(blog._id);
                          }}
                        /> */}
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
            <BsFillBookmarksFill
              className="profile_page_icon"
              onClick={bookmarkedblogspage}
            />
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
