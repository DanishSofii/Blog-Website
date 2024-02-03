import React, { useState } from 'react';
import axios from 'axios';
import "../css/signin.css"
import "../css/style.css";
import "../css/index.css";
const Signin = () => {
  const [name , setName] =useState(null);
  const [userName,setUserName]=useState(null);
  const [password,setPassword]=useState(null);
  const [email, setEmail] = useState(null);
  const [pnumber , setPnumner ]= useState(null);
  const [dob, setDob] = useState(null);
  const [message,setMessage] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://nebula-30n8.onrender.com/api/signup",{
        name,userName,password,email,pnumber,dob
      });
  
      if (response.data.success) {
        const message =setMessage("Registered sucessfully");
        
      } else {
        // Invalid login
        const message = setMessage("Username already exists")
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <div class="signinContainer ">
            <div class="signInform-container signout">
                <form action="/">
                    <button className='gotohome'>x</button>
                </form>
            <div class="heading-container"><h2 class="heading-text"> <span id="log">Sign Up</span></h2></div>
                <form action="/api/signup" method="post">
                    <input type="text" name="name" placeholder="Name" onChange={(e)=> setName(e.target.value)} required/>
                    <input type="text" name="uname" placeholder="UserName" onChange={(e)=> setUserName(e.target.value)} required/>
                    <input type="password" name="password" placeholder="Password" autocomplete="off" onChange={(e)=> setPassword(e.target.value)} required/>
                    <input type="text" name="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required/>
                    <input type="text" name="dob" placeholder="DOB" onChange={(e)=> setDob(e.target.value)} required/>
                    <input type="text" name="pnumber" placeholder="Phone number" onChange={(e)=> setPnumner(e.target.value)} required/>
                    <button type="submit" onClick={handleSignup}>Signup</button>
                    <h2>{message}</h2>
                    
                    <form action="/signin">
                        <button >Login</button>
                    </form>
                </form>
                
                
            </div>
    </div>
    </div>
  );
}

export default Signin;
