import React from "react";
import "../css/index.css";
import "../css/style.css";
import "../css/User.css";
import carimg from "../images/car1.jpg";
import { useState } from "react";

const postdata = [
  {
    image:
      "https://images.freeimages.com/images/large-previews/797/sata-1-1242366.jpg",
    title: "Mustang",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur. ",
    id: 1,
  },
  {
    image: carimg,
    title: "buggati",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
    id: 2,
  },
  {
    image: carimg,
    title: "chevrolet",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
    id: 3,
  },
  {
    image: carimg,
    title: "hyundai",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
    id: 4,
  },
  {
    image: carimg,
    title: "ford",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
    id: 5,
  },
  {
    image: carimg,
    title: "suzuki",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
    id: 6,
  },
];

const User = () => {
  const [display, setDisplay] = useState("none");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTab,setSelectedTab] =useState(3);
  function handleOpenPost(postid) {
    setDisplay("flex");
    setSelectedPost(postid);
  }
  function handleClosePost() {
    setSelectedPost(null);
    setDisplay("none");
  }
  const selectedPostData = selectedPost
    ? postdata.find((post) => post.id === selectedPost)
    : null;
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="userDetails">
          <img className="userImg" src={carimg} alt="" />
          <h3 className="userTitle">Danish Bashir</h3>
        </div>
        <div className="userBtnContainer">
        
          <button className="userBtn" onClick={()=> setSelectedTab(1)}>User Profile</button>
          <button className="userBtn" onClick={()=> setSelectedTab(2)}>Create Post</button>
          <button className="userBtn" onClick={()=> setSelectedTab(3)}>User Posts</button>
          <button className="userBtn" onClick={()=> setSelectedTab(4)}>Home</button>
          {selectedTab === 4 &&
          
          <form className="searchform" action="" style={{display:"flex", flexDirection:"row",alignItems:"center",justifyContent:"center",}}>
                  <input className="search" type="text" placeholder="search" style={{color:"#000", width:"60%"}}/>
                  <button  className="searchBtn" type="submit">GO</button>
                </form>}
          <form action="/"><button className="userBtn">Log out</button></form>
        </div>
      </div>
      {selectedTab === 1 &&
      <div className="userProfileContainer">
        <div className="userProfileImageContainer">
            <img className="userProfileImage" src={carimg} alt="" />
            <button className="editPicBtn">Edit</button>
        </div>
        <div className="userProfileDetailsContainer">
            <table  className="detailsTable">
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>name:</td>
                    <td>danish</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>danish</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>danish</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td>danish</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>DOB:</td>
                    <td>danish</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
            </table>

        </div>

      </div>
      
      }

      {selectedTab === 2 &&
      <div className="createPostContainer">
        <form className="postUploadForm" action="">
        <fieldset className="fset fsetimg">
        <label className="uimglbl" htmlFor="postUploadImg">Image</label>
        <input className="formUploadBtn" type="file" name="" id="postUploadImg" />
        </fieldset>
        <fieldset className="fset">
        <label htmlFor="postUploadTitle">Title</label>
        <input className="formUploadBtn" type="text" name="" id="postUploadTitle" />
        </fieldset>
        <fieldset className="fset">
        <label htmlFor="postUploadContent">Content</label>
        <input className="formUploadBtn" type="text" name="" id="postUploadContent" />
        </fieldset>
        <fieldset className="fset">
        <button>submit</button>
        </fieldset>


        </form>

      </div>
      }
      
      {selectedTab === 3 &&
      <div className="userPostContainer">
        {postdata.map((data) => {
          return (
            <div className="blogContainer" key={data.id}>
              <div className="blogImageContainer">
                <img className="blogImage" src={data.image} alt="blogImage" />
              </div>
              <div className="blogContentContainer">
                <div className="blogTitleContainer">
                  <h2 className="blogTitle">{data.title}</h2>
                </div>
                <div className="blogParaContainer">
                  <p className="blogPara ">{data.para}</p>
                </div>
                <div className="blogOperationContainer">
                  {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
                  <button className="blogCommentBtn btnsecondary">
                    comment{" "}
                  </button>
                  <button
                    className="openPost btnsecondary"
                    onClick={() => handleOpenPost(data.id)}
                  >
                    Show Post
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
                src={selectedPostData.image}
                alt=""
              />
              <div className="openPostContent">
                <div className="openPostTitleContainer">
                  <h1 className="openPostTitle">{selectedPostData.title}</h1>
                </div>
                <div className="openPostParaContainer">
                  <p className="openPostPara">{selectedPostData.para}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleClosePost}
              className="btnprimary"
              style={{
                position: "absolute",
                top: "10px",
                right: "5px",
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
}


    {selectedTab === 4 &&
    <div className="userPostContainer">
    {postdata.map((data) => {
      return (
        <div className="blogContainer" key={data.id}>
          <div className="blogImageContainer">
            <img className="blogImage" src={data.image} alt="blogImage" />
          </div>
          <div className="blogContentContainer">
            <div className="blogTitleContainer">
              <h2 className="blogTitle">{data.title}</h2>
            </div>
            <div className="blogParaContainer">
              <p className="blogPara ">{data.para}</p>
            </div>
            <div className="blogOperationContainer">
              {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
              <button className="blogCommentBtn btnsecondary">
                comment{" "}
              </button>
              <button
                className="openPost btnsecondary"
                onClick={() => handleOpenPost(data.id)}
              >
                Show Post
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
            src={selectedPostData.image}
            alt=""
          />
          <div className="openPostContent">
            <div className="openPostTitleContainer">
              <h1 className="openPostTitle">{selectedPostData.title}</h1>
            </div>
            <div className="openPostParaContainer">
              <p className="openPostPara">{selectedPostData.para}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleClosePost}
          className="btnprimary"
          style={{
            position: "absolute",
            top: "10px",
            right: "5px",
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
    
    }
    </div>
  );
};

export default User;
