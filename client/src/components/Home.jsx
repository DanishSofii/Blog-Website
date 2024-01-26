import React, { useState , useEffect } from "react";
import axios from "axios";
import "../css/index.css";
import "../css/style.css";
import carimg from "../images/car1.jpg";



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

const Home = () => {
  const imgPath = `../uploads/`;
  const [display, setDisplay] = useState("none");
  const [selectedPost ,setSelectedPost] = useState(null);
  const [items,setItems] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/items')
    .then(response=> setItems(response.data))
    .catch(error => console.log("Error fetching items",error));
  },[]);
  
  function handleOpenPost(postid) {
    setDisplay("flex");
    setSelectedPost(postid);
  }
  function handleClosePost() {
    setSelectedPost(null);
    setDisplay("none");
   
  }
  const selectedPostData = selectedPost ? items.find(post => post.post_id === selectedPost) : null;
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div className="navbar">

            <div className="formContainer">
              <div className="searchContainer" style={{marginRight:"20px"}}>
                <form className="searchform" action="" style={{display:"flex", flexDirection:"row"}}>
                  <input className="search" type="text" placeholder="search" style={{color:"#000"}}/>
                  <button  className="searchBtn" type="submit">GO</button>
                </form>
              </div>
            <form action="/Signin">
              <button type="submit" className="btnsecondary">
                Sign in
              </button>
            </form>
            <form action="/signup">
              <button type="submit" className="btnsecondary" s>
                Sign up
              </button>
            </form>
            </div>
          </div>
          <div className="blogsWrapper">
            {items.map((data) => {
              return (
                
                <div className="blogContainer" key={data.post_id}>
                  
                  <div className="blogImageContainer">
                    <img
                      className="blogImage"
                      // src={data.image} 
                      src={`http://localhost:5000/uploads/${data.filename}`}
                      alt="blogImage"
                    />
                  </div>
                  <div className="blogContentContainer">
                    <div className="blogTitleContainer">
                      <h2 className="blogTitle">{data.title}</h2>
                    </div>
                    <div className="blogParaContainer">
                      <p className="blogPara">{data.content}</p>
                    </div>
                    <div className="blogOperationContainer">
                      {/* <button className="blogLikeBtn btnsecondary">like 0</button> */}
                      <button className="blogCommentBtn btnsecondary">
                        comment{" "}
                      </button>
                      <button
                        className="openPost btnsecondary"
                        onClick={()=>handleOpenPost(data.post_id)}
                      >
                        Show Post
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
      {selectedPost&& 
      <div className="showPostContainer" style={{ display: display }}>
        <div className="scroller">
          <img className="openPostImg" src={`http://localhost:5000/uploads/${selectedPostData.filename}`} alt="cant retrieve from database" />
          <div className="openPostContent">
            <div className="openPostTitleContainer">
              <h1 className="openPostTitle">{selectedPostData.title}</h1>
            </div>
            <div className="openPostParaContainer">
              <p className="openPostPara">
                {selectedPostData.content}
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
  );
};

export default Home;
