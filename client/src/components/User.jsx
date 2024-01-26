import React, { useEffect } from "react";
import axios from "axios";
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

const User = ({user}) => {
 
  const [display, setDisplay] = useState("none");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTab,setSelectedTab] =useState(3);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts,setUserPosts] = useState([]);
  const [homeItems,setHomeItems] =useState(null);
  console.log("this is user id ",user)
  useEffect(()=>{
    axios.get('http://localhost:5000/api/items')
    .then(response=> setHomeItems(response.data))
    .catch(error => console.log("Error fetching items",error));
  },[]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/User/${user}`);
        if (response.data.success) {
          setUserDetails(response.data.user);
          console.log(userDetails)
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log("Error fetching user details ", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getUserPosts/${user}`);
        if (response.data.success) {
          setUserPosts(response.data.post);
          console.log(userPosts)
        } else {
          console.log("User posts not found");
        }
      } catch (error) {
        console.log("Error fetching user posts ", error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
    console.log("This is after func call",userPosts)
  }, [user]);
  useEffect(() => {
    console.log("Updated UserPosts:", userPosts);
  }, [userPosts]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userid',user);

    axios.post('http://localhost:5000/api/uploadpostimg', formData)
      .then(response => {
        console.log(response.data);
        // Handle success or redirect to another page
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
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


  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="userDetails">
          <img className="userImg" src={carimg} alt="" />
          <h3 className="userTitle">{userDetails ? userDetails.name : 'Loading...'}</h3>

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
                    <td>{userDetails.name}</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{userDetails.email}</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>{userDetails.phone_number}</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>Account created on:</td>
                    <td>{userDetails.created_at}</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
                <tr>
                    <td>DOB:</td>
                    <td>{userDetails.dob}</td>
                    <td><button className="editUserBtn">Edit</button></td>
                </tr>
            </table>

        </div>

      </div>
      
      }

      {selectedTab === 2 &&
      <div className="createPostContainer">
        <form className="postUploadForm" action="/api/uploadpostimg" onSubmit={handleSubmit}>
        <fieldset className="fset fsetimg">
        <label className="uimglbl" htmlFor="postUploadImg">Image</label>
        <input className="formUploadBtn" type="file" name="" id="postUploadImg" onChange={handleFileChange} />
        </fieldset>
        <fieldset className="fset">
        <label htmlFor="postUploadTitle">Title</label>
        <input className="formUploadBtn" type="text" name="" id="postUploadTitle" onChange={(e)=> setTitle(e.target.value)}/>
        </fieldset>
        <fieldset className="fset">
        <label htmlFor="postUploadContent">Content</label>
        <input className="formUploadBtn" type="text" name="content" id="postUploadContent" onChange={(e)=> setContent(e.target.value)}/>
        </fieldset>
        <input type="hidden" value={user.user_id} name="userid"/>
        <fieldset className="fset">
        <button type="submit">submit</button>
        </fieldset>


        </form>

      </div>
      }
      
      {selectedTab === 3 &&
      <div className="userPostContainer">
        {userPosts?.map((data) => {
          return (
            <div className="blogContainer" key={data.post_id}>
              <div className="blogImageContainer">

                <img className="blogImage" src={`http://localhost:5000/uploads/${data.filename}`} alt="blogImage" />
                {console.log("jdfejfj",userPosts)}
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
                src={`http://localhost:5000/uploads/${selectedPostData.filename}`}
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
    {homeItems?.map((data) => {
      return (
        <div className="blogContainer" key={data.post_id}>
          <div className="blogImageContainer">
            <img className="blogImage" src={`http://localhost:5000/uploads/${data.filename}`}alt="blogImage" />
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
            src={`http://localhost:5000/uploads/${selectedPostData.filename}`}  
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
