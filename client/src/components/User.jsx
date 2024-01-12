import React from "react";
import "../css/index.css";
import "../css/style.css";
import "../css/User.css";
import carimg from "../images/car1.jpg";
import { useState } from "react";


const postdata = [
    {
      image:  "https://images.freeimages.com/images/large-previews/797/sata-1-1242366.jpg" ,
      title: "Mustang",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 1,
    },
    {
      image:  carimg ,
      title: "buggati",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 2,
    },
    {
      image:  carimg ,
      title: "chevrolet",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 3,
    },
    {
      image:  carimg ,
      title: "hyundai",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 4,
    },
    {
      image:  carimg ,
      title: "ford",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 5,
    },
    {
      image:  carimg ,
      title: "suzuki",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nonomnis autem ipsum ad nisi laudantium commodi placeatcorporis, vel tenetur.",
      id: 6,
    },
  ];

const User = () => {
    const [display, setDisplay] = useState("none");
  const [selectedPost ,setSelectedPost] = useState(null);
  function handleOpenPost(postid) {
    setDisplay("flex");
    setSelectedPost(postid);
  }
  function handleClosePost() {
    setSelectedPost(null);
    setDisplay("none");
   
  }
  const selectedPostData = selectedPost ? postdata.find(post => post.id === selectedPost) : null;
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="userDetails">
          <img className="userImg" src={carimg} alt="" />
          <h3 className="userTitle">Danish Bashir</h3>
        </div>
        <div className="userBtnContainer">
          <button className="userBtn">User Profile</button>
          <button className="userBtn">Create Post</button>
        </div>
      </div>
      <div className="userPostContainer">
     
            {postdata.map((data) => {
              return (
                <div className="blogContainer" key={data.id}>
                  <div className="blogImageContainer">
                    <img
                      className="blogImage"
                      src={data.image}
                      alt="blogImage"
                    />
                  </div>
                  <div className="blogContentContainer">
                    <div className="blogTitleContainer">
                      <h2 className="blogTitle">{data.title}</h2>
                    </div>
                    <div className="blogParaContainer">
                      <p className="blogPara">{data.para}</p>
                    </div>
                    <div className="blogOperationContainer">
                      {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
                      <button className="blogCommentBtn btnsecondary">
                        comment{" "}
                      </button>
                      <button
                        className="openPost btnsecondary"
                        onClick={()=>handleOpenPost(data.id)}
                      >
                        Show Post
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        {selectedPost&& 
      <div className="showPostContainer" style={{ display: display }}>
        <div className="scroller">
          <img className="openPostImg" src={selectedPostData.image} alt="" />
          <div className="openPostContent">
            <div className="openPostTitleContainer">
              <h1 className="openPostTitle">{selectedPostData.title}</h1>
            </div>
            <div className="openPostParaContainer">
              <p className="openPostPara">
                {selectedPostData.para}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleClosePost}
          className="btnprimary"
          style={{ position: "absolute", bottom: 0, backgroundColor: "red" }}
        >
          close
        </button>
      </div>
}
         



      </div>
    </div>
  );
};

export default User;