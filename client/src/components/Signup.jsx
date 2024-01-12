import React from 'react';
import "../css/signin.css"
import "../css/style.css";
import "../css/index.css";
const Signin = () => {
  return (
    <div>
      <div class="signinContainer">
            <div class="signInform-container">
                <form action="/">
                    <button className='gotohome'>x</button>
                </form>
            <div class="heading-container"><h2 class="heading-text"> <span id="log">Sign Up</span></h2></div>
                <form action="/" method="post">
                    <input type="text" name="name" placeholder="Name" required/>
                    <input type="text" name="username" placeholder="UserName" required/>
                    <input type="password" name="studentPassword" placeholder="Password" autocomplete="off" required/>
                    <button type="submit">Signup</button>
                    
                    <form action="/signin">
                        <button>Login</button>
                    </form>
                </form>
                
                
            </div>
    </div>
    </div>
  );
}

export default Signin;
