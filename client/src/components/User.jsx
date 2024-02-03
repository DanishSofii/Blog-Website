import React, { useEffect } from "react";
import axios from "axios";
import "../css/index.css";
import "../css/style.css";
import "../css/User.css";
import carimg from "../images/car1.jpg";
import { useState } from "react";

const User = ({ user }) => {
  const [display, setDisplay] = useState("none");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTab, setSelectedTab] = useState(3);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [homeItems, setHomeItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const [scrollvisible, setScrollVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://nebula-30n8.onrender.com/api/items")
      .then((response) => setHomeItems(response.data))
      .catch((error) => console.log("Error fetching items", error));
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://nebula-30n8.onrender.com/User/${user}`);
        if (response.data.success) {
          setUserDetails(response.data.user);
          console.log(userDetails);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log("Error fetching user details ", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `https://nebula-30n8.onrender.com/getUserPosts/${user}`
        );
        if (response.data.success) {
          setUserPosts(response.data.post);
          console.log(userPosts);
        } else {
          console.log("User posts not found");
        }
      } catch (error) {
        console.log("Error fetching user posts ", error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
    console.log("This is after func call", userPosts);
  }, [user]);
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userid", user);

    axios
      .post("https://nebula-30n8.onrender.com/api/uploadpostimg", formData)
      .then((response) => {
        console.log(response.data);
        // Handle success or redirect to another page
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  function handleOpenPost(postid) {
    setDisplay("flex");
    setSelectedPost(postid);
  }
  function handleClosePost() {
    setSelectedPost(null);
    setDisplay("none");
  }
  const selectedPostData = selectedPost
    ? homeItems.find((post) => post.post_id === selectedPost)
    : null;
  const fetchSearchResults = (query) => {
    axios
      .get(`https://nebula-30n8.onrender.com/api/search?q=${query}`)
      .then((response) => {
        setHomeItems(response.data);
      })
      .catch((error) => console.log("Error fetching search results", error));
  };

  const handleDeletePost = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://nebula-30n8.onrender.com/api/deletepost/${postId}`)
        .then((response) => {
          if (response.data.success) {
        
            setUserPosts((prevPosts) =>
              prevPosts.filter((post) => post.post_id !== postId)
            );
            alert("Post deleted successfully!");
          } else {
            alert("Failed to delete post. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };
  const handlemenuchange = ()=>{
      setMenuOpen(!menuOpen);
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrollVisible(scrollTop > 100); // Change 100 to a different value if you want the button to appear at a different scroll position
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="userDetails">
          <img className="userImg" src={carimg} alt="" />
          
          <div className="usernamecont">
          <button  className="menu" onClick={handlemenuchange} >menu</button>
          <h3 className="userTitle">
            {userDetails ? userDetails.name : "Loading..."}
          </h3>
          </div>
        </div>
        <div className="userBtnContainer"  style={{display: menuOpen ? "block":"none"}}>
          <button className="userBtn" onClick={() => setSelectedTab(1)}>
            User Profile
          </button>
          <button className="userBtn" onClick={() => setSelectedTab(2)}>
            Create Post
          </button>
          <button className="userBtn" onClick={() => setSelectedTab(3)}>
            User Posts
          </button>
          <button className="userBtn" onClick={() => setSelectedTab(4)}>
            Home
          </button>
          {selectedTab === 4 && (
            <form
              className="searchform"
              action=""
              style={{ display: "flex", flexDirection: "row" }}
              onSubmit={(e) => {
                e.preventDefault();
                fetchSearchResults(searchQuery);
              }}
            >
              <input
                className="search usersearch usch"
                type="text"
                placeholder="search"
                style={{ color: "#000" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="searchBtn" type="submit">
                GO
              </button>
            </form>
          )}
          <form action="/">
            <button className="userBtn">Log out</button>
          </form>
        </div>
      </div>
      {selectedTab === 1 && (
        <div className="userProfileContainer">
          <div className="userProfileImageContainer">
            <img className="userProfileImage" src={carimg} alt="" />
           
          </div>
          <div className="userProfileDetailsContainer">
            <table className="detailsTable">
              <tr>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <td>name:</td>
                <td>{userDetails.name}</td>

              </tr>
              <tr>
                <td>Email:</td>
                <td>{userDetails.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{userDetails.phone_number}</td>

              </tr>
              <tr>
                <td>Account created on:</td>
                <td>{userDetails.created_at}</td>

              </tr>
              <tr>
                <td>DOB:</td>
                <td>{userDetails.dob}</td>

              </tr>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 2 && (
        <div className="createPostContainer">
          <form
            className="postUploadForm"
            action="/api/uploadpostimg"
            onSubmit={handleSubmit}
          >
            <fieldset className="fset fsetimg">
              <label className="uimglbl" htmlFor="postUploadImg">
                Image
              </label>
              <input
                className="formUploadBtn"
                type="file"
                name=""
                id="postUploadImg"
                onChange={handleFileChange}
              />
            </fieldset>
            <fieldset className="fset">
              <label htmlFor="postUploadTitle">Title</label>
              <input
                className="formUploadBtn"
                type="text"
                name=""
                id="postUploadTitle"
                onChange={(e) => setTitle(e.target.value)}
              />
            </fieldset>
            <fieldset className="fset">
              <label htmlFor="postUploadContent">Content</label>
              <input
                className="formUploadBtn"
                type="text"
                name="content"
                id="postUploadContent"
                onChange={(e) => setContent(e.target.value)}
              />
            </fieldset>
            <input type="hidden" value={user.user_id} name="userid" />
            <fieldset className="fset">
              <button type="submit">submit</button>
            </fieldset>
          </form>
        </div>
      )}

      {selectedTab === 3 && (
        <div className="userPostContainer">
          {userPosts?.map((data) => {
            return (
              <div className="blogContainer" key={data.post_id}>
                <div className="blogImageContainer">
                  <img
                    className="blogImage"
                    src={`https://nebula-30n8.onrender.com/uploads/${data.filename}`}
                    alt="blogImage"
                  />
                  {console.log("jdfejfj", userPosts)}
                </div>
                <div className="blogContentContainer">
                  <div className="blogTitleContainer">
                    <h2 className="blogTitle">{data.title}</h2>
                  </div>
                  <div className="blogParaContainer">
                    <p className="blogPara ">{data.content}</p>
                  </div>
                  <div className="blogOperationContainer">
                    {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
                    <button className="blogCommentBtn btnsecondary">
                      comment{" "}
                    </button>
                    <button
                      className="openPost btnsecondary"
                      onClick={() => handleOpenPost(data.post_id)}
                    >
                      Read
                    </button>
                    <button
                      className="blogDeleteBtn btnsecondary dangerbtn"
                      onClick={() => handleDeletePost(data.post_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {selectedPost && (
            <div className="showPostContainer" style={{ display: display }}>
              <div className="scroller">
                <img
                  className="openPostImg"
                  src={`https://nebula-30n8.onrender.com/uploads/${selectedPostData.filename}`}
                  alt="Can't retreive data from database"
                />
                <div className="openPostContent">
                  <div className="openPostTitleContainer">
                    <h1 className="openPostTitle">{selectedPostData.title}</h1>
                  </div>
                  <div className="openPostParaContainer">
                    <p className="openPostPara">{selectedPostData.content}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClosePost}
                className="btnprimary"
                style={{
                  position: "fixed",
                  top: "10px",
                  right: 70,
                  backgroundColor: "red",
                  borderRadius: "100%",
                  width: "30px",
                  height: "30px",

                }}
              >
                x
              </button>
            </div>
          )}
        </div>
      )}

      {selectedTab === 4 && (
        <div className="userPostContainer">
          {homeItems?.map((data) => {
            return (
              <div className="blogContainer" key={data.post_id}>
                <div className="blogImageContainer">
                  <img
                    className="blogImage"
                    src={`https://nebula-30n8.onrender.com/uploads/${data.filename}`}
                    alt="blogImage"
                  />
                </div>
                <div className="blogContentContainer">
                  <div className="blogTitleContainer">
                    <h2 className="blogTitle">{data.title}</h2>
                  </div>
                  <div className="blogParaContainer">
                    <p className="blogPara ">{data.content}</p>
                  </div>
                  <div className="blogOperationContainer">
                    {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
                    <button className="blogCommentBtn btnsecondary">
                      comment{" "}
                    </button>
                    <button
                      className="openPost btnsecondary"
                      onClick={() => handleOpenPost(data.post_id)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {selectedPost && (
            <div className="showPostContainer" style={{ display: display }}>
              <div className="scroller">
                <img
                  className="openPostImg"
                  src={`https://nebula-30n8.onrender.com/uploads/${selectedPostData.filename}`}
                  alt=""
                />
                <div className="openPostContent">
                  <div className="openPostTitleContainer">
                    <h1 className="openPostTitle">{selectedPostData.title}</h1>
                  </div>
                  <div className="openPostParaContainer">
                    <p className="openPostPara">{selectedPostData.content}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClosePost}
                className="btnprimary"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: 10,
                  backgroundColor: "red",
                  borderRadius: "100%",
                  width: "30px",
                  height: "30px",
                }}
              >
                x
              </button>
            </div>
          )}
        </div>
      )}
      <button
      className="scrollbtn"
      onClick={scrollToTop}
      style={{
        display: scrollvisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
    >Top
    </button>
    </div>
    
  );
};

export default User;
