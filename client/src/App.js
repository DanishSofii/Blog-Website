import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import User from "./components/User";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {loggedInUser ? (
            <Route path="/User"  element={<User user={loggedInUser}/>} />
          ) : (
            <Route path="/signin"  element={<Signin onLogin={handleLogin} />} />
          )}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
