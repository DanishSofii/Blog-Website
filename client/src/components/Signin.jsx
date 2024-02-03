import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/signin.css"
import "../css/style.css";
import "../css/index.css";
const Signin = ({onLogin}) => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://nebula-30n8.onrender.com/api/checkvaliduser", {
        username,
        password,
      });
  
      if (response.data.success) {
        onLogin(response.data.user);
        console.log('Login successful');
        navigate("/User", { replace: true });
      } else {
        // Invalid login
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div>
      <div class="signinContainer">
            <div class="signInform-container">
                <form action="/">
                    <button className='gotohome'>x</button>
                </form>
            <div class="heading-container"><h2 class="heading-text"> <span id="log">LogIn</span></h2></div>
                <form action="https://nebula-30n8.onrender.com/api/checkvaliduser" method="post">
                    <input type="text" name="uname" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
                    <input type="password" name="upass" placeholder="Password" autocomplete="off" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button type="submit" onClick={handleLogin}>LogIn</button>
                    
                    <form action="/signup">
                        <button>Signup</button>
                    </form>
                </form>
                
                
            </div>
    </div>
    </div>
  );
}

export default Signin;
