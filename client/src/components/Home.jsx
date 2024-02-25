import React, { useState , useEffect } from "react";
import axios from "axios";
import "../css/index.css";
import "../css/style.css";

const Home = () => {

  const [display, setDisplay] = useState("none");
  const [selectedPost ,setSelectedPost] = useState(null);
  const [items,setItems] = useState([]);
  const [searchQuery,setSearchQuery]= useState("");
  const [message,setMessage]=useState("")

  const fetchSearchResults = (query) => {
    
    axios.get(`https://nebula-30n8.onrender.com/api/search?q=${query}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.log("Error fetching search results", error));
  };
  

  useEffect(()=>{
    axios.get('https://nebula-30n8.onrender.com/api/items')
    .then(response=> setItems(response.data))
    .catch(error => setMessage(error));
    console.log(message)

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
          <h1 className="logo">Nebula</h1>
            <div className="formContainer"> 
              <div className="searchContainer" style={{marginRight:"20px"}}>
                <form className="searchform" action="" style={{display:"flex", flexDirection:"row"}} onSubmit={(e)=>{
                  e.preventDefault();
                  fetchSearchResults(searchQuery);
                }}>
                  <input className="search" type="text" placeholder="search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
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
            {
            
            items.map((data) => {
              return (
                
                
                <div className="blogContainer" key={data.post_id}>
                  
                  <div className="blogImageContainer">
                    <img
                      className="blogImage"
                      // src={data.image} 
                      src={`https://nebula-30n8.onrender.com/uploads/${data.filename}`}
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
                        Read
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
      <div className="showPostContainer" style={{ display: display ,position:"absolute"}}>
        <div className="scroller">
          <img className="openPostImg" src={`https://nebula-30n8.onrender.com/uploads/${selectedPostData.filename}`} alt="cant retrieve from database" />
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
          style={{ position: "absolute", top: 10,right:10, backgroundColor: "red",height:"20px",width:"20px",margin:0,borderRadius:"50%",position:"fixed", }}
        >
          x
        </button>
      </div>
}
    </div>
  );
};

export default Home;
