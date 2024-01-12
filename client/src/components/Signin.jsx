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
            <div class="heading-container"><h2 class="heading-text"> <span id="log">LogIn</span></h2></div>
                <form action="/" method="post">
                    <input type="text" name="studentEmail" placeholder="USN" required/>
                    <input type="password" name="studentPassword" placeholder="Password" autocomplete="off" required/>
                    <button type="submit">LogIn</button>
                    
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
